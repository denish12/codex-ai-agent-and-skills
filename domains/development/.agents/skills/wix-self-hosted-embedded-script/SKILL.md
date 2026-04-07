---
name: wix-self-hosted-embedded-script
description: Практический runbook для Wix Self-Hosted Embedded Script — HTTPS локально, install webhook, embed script, resolve appInstanceId, DB-driven widget config, частые ошибки и проверка DEMO-ready.
---

# Skill: Wix Self-Hosted Embedded Script

Конкретный runbook с code snippets для реализации Wix Embedded Script extension.

**Разделы:**
1. [Архитектура](#1-архитектура)
2. [Контракт Embedded Script Flow](#2-контракт)
3. [Install Webhook](#3-install-webhook)
4. [Embed Script API](#4-embed-script-api)
5. [Widget Endpoint](#5-widget-endpoint)
6. [Embedded Script (client)](#6-embedded-script-client)
7. [HTTPS и локальная разработка](#7-https)
8. [Диагностика ошибок](#8-диагностика)
9. [Smoke Checklist](#9-smoke-checklist)
10. [Anti-patterns](#10-anti-patterns)

---

## 1. Архитектура

```
┌─────────────────────────────────────────────────────┐
│                    Wix Site                          │
│  <script src="https://host/widget/embedded-script.js│
│    ?appInstanceId=abc123" async></script>            │
└─────────────┬───────────────────────────────────────┘
              │ GET /api/v1/widget/:appInstanceId
              ▼
┌─────────────────────────────┐
│     Gateway (Caddy)         │ ◄── HTTPS termination
│  https://localhost:5173     │
└─────────────┬───────────────┘
              │
    ┌─────────┼──────────┐
    ▼         ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│Frontend│ │  API   │ │ Widget │
│Dashboard│ │Server │ │ Script │
│ :3001  │ │ :3000  │ │(static)│
└────────┘ └───┬────┘ └────────┘
               │
               ▼
          ┌─────────┐
          │ MongoDB  │
          └─────────┘
```

### Компоненты

| Компонент | Роль | URL |
|-----------|------|-----|
| **Dashboard** | Управление настройками и контентом | `/dashboard` |
| **API Server** | REST API, OAuth, webhooks, embed script | `/api/v1/*` |
| **Embedded Script** | JS на сайте клиента → popup/launcher | `/widget/embedded-script.js` |
| **Gateway (Caddy)** | HTTPS termination, routing | `https://localhost:5173` |
| **MongoDB** | Settings, installations, content | `mongodb://...` |

### API Endpoints

```
GET  /api/v1/widget/:appInstanceId           # Widget payload (config + content)
GET  /api/v1/widget/resolve-instance          # ?siteOrigin= → appInstanceId
POST /api/v1/embedded-script/embed/:appId     # Register embed script in Wix
POST /api/webhooks/v1/install                 # Wix install webhook
POST /api/webhooks/v1/uninstall               # Wix uninstall webhook
GET  /api/v1/settings/:appInstanceId          # Dashboard settings read
PUT  /api/v1/settings/:appInstanceId          # Dashboard settings update
```

---

## 2. Контракт

### Embedded Script Flow (step by step)

```
1. Wix загружает на site:
   <script id="wix-app-embedded-script"
     src="https://<host>/widget/embedded-script.js?appInstanceId=<id>"
     async="true"></script>

2. embedded-script.js:
   a) Извлекает appInstanceId из script src query param
   b) Если нет — fallback через resolve-instance:
      GET /api/v1/widget/resolve-instance?siteOrigin=<window.location.origin>
   c) Запрашивает config:
      GET /api/v1/widget/<appInstanceId>
   d) Рендерит popup/launcher из payload (НЕ из hardcoded values)

3. Payload содержит:
   - overlay: title, text, backgroundColor, designStyle
   - cta: text, url, action
   - tab: emoji, text
   - timer: enabled, minutes, seconds
   - content: dynamic data from DB (latest active entry)
   - template: templateId, templateSettings
```

---

## 3. Install Webhook

### ✅ DO: webhook handler с JWT decode и upsert

```js
// routes/webhooks.router.js
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Обрабатывает Wix install webhook.
 * Извлекает appInstanceId из JWT, создаёт installation и default settings.
 * @param {{ db: object, logger: object, embedService: object }} deps
 */
export function webhookRouter(deps) {
  const router = Router();

  router.post('/install', asyncHandler(async (req, res) => {
    const { logger, db, embedService } = deps;

    // 1. Decode JWT from Wix (webhook body is JWT string)
    const token = req.body;
    const decoded = jwt.decode(token);

    if (!decoded?.data?.appInstanceId) {
      logger.warn({ decoded }, 'Install webhook: missing appInstanceId');
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    const { appInstanceId, instanceId, siteUrl } = decoded.data;
    logger.info({ appInstanceId, siteUrl }, 'Processing install webhook');

    // 2. Upsert installation record
    await db.collection('installations').updateOne(
      { appInstanceId },
      {
        $set: {
          appInstanceId,
          instanceId,
          siteUrl,
          installedAt: new Date(),
          status: 'active',
        },
      },
      { upsert: true }
    );

    // 3. Create default settings (if not exist)
    await db.collection('settings').updateOne(
      { appInstanceId },
      {
        $setOnInsert: {
          appInstanceId,
          overlay: {
            title: 'Special Offer!',
            text: 'Get your discount now',
            backgroundColor: '#1a1a2e',
          },
          cta: { text: 'Get Started', action: 'redirect' },
          tab: { emoji: '🎁', text: 'Deal' },
          timer: { enabled: true, minutes: 10, seconds: 0 },
          designStyle: 'glassmorphism',
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    // 4. Register embed script in Wix
    try {
      await embedService.embedScript(appInstanceId);
      logger.info({ appInstanceId }, 'Embed script registered');
    } catch (err) {
      logger.error({ err, appInstanceId }, 'Failed to embed script');
      // Не ронять webhook — можно re-embed вручную
    }

    res.json({ success: true });
  }));

  router.post('/uninstall', asyncHandler(async (req, res) => {
    const decoded = jwt.decode(req.body);
    const appInstanceId = decoded?.data?.appInstanceId;

    if (appInstanceId) {
      await db.collection('installations').updateOne(
        { appInstanceId },
        { $set: { status: 'uninstalled', uninstalledAt: new Date() } }
      );
      deps.logger.info({ appInstanceId }, 'App uninstalled');
    }

    res.json({ success: true });
  }));

  return router;
}
```

---

## 4. Embed Script API

### ✅ DO: embed script через Wix REST API

```js
// services/embed.service.js

/**
 * Регистрирует embedded script в Wix через REST API.
 * @param {string} appInstanceId
 */
export class EmbedService {
  #config;
  #logger;

  constructor({ config, logger }) {
    this.#config = config;
    this.#logger = logger;
  }

  /**
   * Вызывает Wix Embedded Scripts API для регистрации скрипта на сайте.
   * @param {string} appInstanceId
   * @returns {Promise<object>} Wix response.
   */
  async embedScript(appInstanceId) {
    const scriptUrl = `${this.#config.PUBLIC_URL}/widget/embedded-script.js?appInstanceId=${appInstanceId}`;

    const response = await fetch(
      'https://www.wixapis.com/apps/v1/scripts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await this.#getAccessToken(appInstanceId),
        },
        body: JSON.stringify({
          script: {
            parameters: { appInstanceId },
            properties: {
              location: { tag: 'BODY_END' },
              source: { url: scriptUrl },
              disabled: false,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Embed script failed: ${response.status} ${error}`);
    }

    return response.json();
  }

  /**
   * Ручной re-embed (если webhook не сработал).
   * POST /api/v1/embedded-script/embed/:appInstanceId
   */
  async reEmbed(appInstanceId) {
    this.#logger.info({ appInstanceId }, 'Re-embedding script manually');
    return this.embedScript(appInstanceId);
  }
}
```

---

## 5. Widget Endpoint

### ✅ DO: widget payload из DB (не mock)

```js
// controllers/widget.controller.js

/**
 * GET /api/v1/widget/:appInstanceId
 * Возвращает полный payload для embedded script из DB.
 */
export const getWidgetPayload = asyncHandler(async (req, res) => {
  const { appInstanceId } = req.params;
  const { db } = req;

  // 1. Загрузить settings
  const settings = await db.collection('settings').findOne({ appInstanceId });
  if (!settings) {
    return res.status(404).json({ error: 'App not found for script' });
  }

  // 2. Загрузить latest active content entry
  const contentEntry = await db.collection('content').findOne(
    { appInstanceId, active: true },
    { sort: { createdAt: -1 } }
  );

  // 3. Сформировать payload
  const payload = {
    overlay: {
      title: settings.overlay?.title ?? 'Welcome!',
      text: settings.overlay?.text ?? 'Check out our latest offer',
      backgroundColor: settings.overlay?.backgroundColor ?? '#1a1a2e',
      designStyle: settings.designStyle ?? 'glassmorphism',
    },
    cta: {
      text: settings.cta?.text ?? 'Get Started',
      action: settings.cta?.action ?? 'redirect',
    },
    tab: {
      emoji: settings.tab?.emoji ?? '🎁',
      text: settings.tab?.text ?? 'Deal',
    },
    timer: {
      enabled: settings.timer?.enabled ?? true,
      minutes: settings.timer?.minutes ?? 10,
      seconds: settings.timer?.seconds ?? 0,
    },
    template: {
      templateId: settings.templateId ?? 'glassmorphism',
      templateSettings: settings.templateSettings ?? {},
    },
    content: contentEntry
      ? { headline: contentEntry.headline, value: contentEntry.value, type: contentEntry.type }
      : null,
  };

  res.json(payload);
});

/**
 * GET /api/v1/widget/resolve-instance?siteOrigin=https://example.com
 * Resolves appInstanceId from site origin (fallback for script).
 */
export const resolveInstance = asyncHandler(async (req, res) => {
  const { siteOrigin } = req.query;
  if (!siteOrigin) {
    return res.status(400).json({ error: 'siteOrigin is required' });
  }

  const installation = await req.db.collection('installations').findOne({
    siteUrl: { $regex: new RegExp(`^${escapeRegex(siteOrigin)}`, 'i') },
    status: 'active',
  });

  if (!installation) {
    return res.status(404).json({ error: 'Installation not found' });
  }

  res.json({ appInstanceId: installation.appInstanceId });
});
```

---

## 6. Embedded Script (client)

### ✅ DO: bootstrap script с auto-detect

```js
// widget/embedded-script.js

/**
 * Wix Self-Hosted App — Embedded Script.
 * Загружается на сайте клиента, запрашивает config из backend,
 * рендерит popup/launcher.
 */
(function () {
  'use strict';

  // 1. Определить API origin и appInstanceId
  const scriptTag = document.getElementById('wix-app-embedded-script')
    || document.currentScript;

  if (!scriptTag) {
    console.error('[Widget] Script tag not found');
    return;
  }

  const scriptUrl = new URL(scriptTag.src);
  const apiOrigin = scriptUrl.origin;
  let appInstanceId = scriptUrl.searchParams.get('appInstanceId');

  // 2. Init
  async function init() {
    try {
      // Fallback: resolve instance by site origin
      if (!appInstanceId) {
        const resolveRes = await fetch(
          `${apiOrigin}/api/v1/widget/resolve-instance?siteOrigin=${encodeURIComponent(window.location.origin)}`
        );
        if (!resolveRes.ok) {
          console.error('[Widget] Failed to resolve instance:', resolveRes.status);
          return;
        }
        const data = await resolveRes.json();
        appInstanceId = data.appInstanceId;
      }

      // 3. Fetch widget payload
      const payloadRes = await fetch(`${apiOrigin}/api/v1/widget/${appInstanceId}`);
      if (!payloadRes.ok) {
        console.error('[Widget] Failed to load widget config:', payloadRes.status);
        return;
      }
      const config = await payloadRes.json();

      // 4. Render UI from payload
      renderWidget(config);

    } catch (err) {
      console.error('[Widget] Init error:', err);
    }
  }

  /**
   * Рендерит popup/launcher из серверного payload.
   * @param {object} config - widget payload from API.
   */
  function renderWidget(config) {
    // Container
    const container = document.createElement('div');
    container.id = 'wix-app-widget-root';
    container.setAttribute('data-app-instance', appInstanceId);

    // Inject styles
    const style = document.createElement('style');
    style.textContent = getWidgetStyles(config);
    document.head.appendChild(style);

    // Build UI from config (NOT hardcoded values)
    container.innerHTML = buildWidgetHTML(config);
    document.body.appendChild(container);

    // Attach event listeners
    attachEventListeners(container, config);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

---

## 7. HTTPS

### ✅ DO: Caddy для автоматического HTTPS локально

```caddyfile
# Caddyfile — единая HTTPS точка входа
{
  auto_https disable_redirects
}

https://localhost:5173 {
  # Frontend dashboard
  handle /dashboard* {
    reverse_proxy localhost:3001
  }

  # API
  handle /api/* {
    reverse_proxy localhost:3000
  }

  # Widget static files
  handle /widget/* {
    reverse_proxy localhost:3000
  }

  # Health
  handle /health {
    reverse_proxy localhost:3000
  }

  # TLS — self-signed cert (trusted by OS)
  tls internal
}
```

### ✅ DO: trust сертификат в ОС

```bash
# macOS
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain \
  /path/to/caddy/root.crt

# Windows (PowerShell as Admin)
Import-Certificate -FilePath ".\caddy-root.crt" -CertStoreLocation Cert:\LocalMachine\Root

# Linux
sudo cp caddy-root.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

### Docker Compose фрагмент

```yaml
# docker-compose.yml (фрагмент)
services:
  gateway:
    image: caddy:2-alpine
    ports:
      - "5173:5173"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - api
      - dashboard

  api:
    build: ./api
    environment:
      - DATABASE_URL=mongodb://mongo:27017/wixapp
      - PUBLIC_URL=https://localhost:5173
    depends_on:
      - mongo

  dashboard:
    build: ./dashboard
    environment:
      - VITE_API_URL=https://localhost:5173/api

  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

volumes:
  caddy_data:
  caddy_config:
  mongo_data:
```

---

## 8. Диагностика

| Симптом | Причина | Решение |
|---------|---------|---------|
| `NET::ERR_CERT_AUTHORITY_INVALID` | Сертификат не доверен ОС | Trust cert (section 7) |
| Белый экран в Wix iframe | Extension URL не HTTPS или блокируется | Проверить HTTPS, отключить adblock для `manage.wix.com` |
| `App not found for script` / 404 | Нет installation в DB | Проверить install webhook, запустить re-embed |
| Script загрузился, UI нет | JS runtime error или пустой payload | Browser console → `[Widget]` messages |
| API 403/permission | Не хватает Wix scopes/токена | Проверить app permissions в Wix Dev Center |
| Popup не обновляется | Dashboard не сохраняет в DB | Проверить PUT `/api/v1/settings/:appInstanceId` |
| Timer не работает | Mock значения вместо DB | Убедиться что `timer.minutes/seconds` из payload |
| Content не показывается | Нет active content в DB | Проверить `content` коллекцию, `active: true` |

---

## 9. Smoke Checklist

### DEMO-ready checklist

```markdown
- [ ] Dashboard сохраняет настройки → API → DB
- [ ] GET /api/v1/widget/:appInstanceId возвращает АКТУАЛЬНЫЕ DB values
- [ ] Embedded script реально внедрён в сайт (виден в DOM: #wix-app-widget-root)
- [ ] Popup/launcher рендерится на опубликованном Wix сайте
- [ ] Изменения в dashboard отражаются на storefront (после refresh)
- [ ] Timer работает по DB значениям (не hardcoded)
- [ ] CTA выполняет action (redirect / copy / link)
- [ ] Dynamic content показывается из DB (latest active)
- [ ] HTTPS без browser warnings
- [ ] Install webhook создаёт installation + settings + embed
```

### Done-критерии

- End-to-end: Dashboard → API → DB → Embedded Script → Storefront UI
- Нет hardcoded/mock payload в production-like flow
- README содержит setup instructions
- Health check endpoint отвечает 200

---

## 10. Anti-patterns

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| Mock/hardcoded widget config | Всегда из DB через API |
| HTTP вместо HTTPS для Wix | Caddy + trusted cert |
| Игнорировать ошибку embed | Логировать + ручной re-embed endpoint |
| `document.write` в embedded script | `createElement` + `appendChild` |
| Не проверять `appInstanceId` | Validate, fallback через resolve-instance |
| Секреты Wix в коде | Env vars, validated через Zod |
| Один endpoint для всего | Раздельные: widget, settings, webhooks, embed |

---

## См. также
- `$node-express-beast-practices` — Express архитектура
- `$security-baseline-dev` — безопасная обработка webhooks
- `$observability-logging` — structured logs для debugging
- `$docker-kubernetes-architecture` — Docker Compose setup
