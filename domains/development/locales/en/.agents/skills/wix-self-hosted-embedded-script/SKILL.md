---
name: wix-self-hosted-embedded-script
description: Practical runbook for Wix Self-Hosted Embedded Script — HTTPS locally, install webhook, embed script, resolve appInstanceId, DB-driven widget config, common errors, and DEMO-ready checklist.
---

# Skill: Wix Self-Hosted Embedded Script

A specific runbook with code snippets for implementing the Wix Embedded Script extension.

**Sections:**
1. [Architecture](#1-architecture)
2. [Embedded Script Flow Contract](#2-contract)
3. [Install Webhook](#3-install-webhook)
4. [Embed Script API](#4-embed-script-api)
5. [Widget Endpoint](#5-widget-endpoint)
6. [Embedded Script (client)](#6-embedded-script-client)
7. [HTTPS and local development](#7-https)
8. [Error diagnostics](#8-diagnostics)
9. [Smoke Checklist](#9-smoke-checklist)
10. [Anti-patterns](#10-anti-patterns)

---

## 1. Architecture

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

### Components

| Component | Role | URL |
|-----------|------|-----|
| **Dashboard** | Managing settings and content | `/dashboard` |
| **API Server** | REST API, OAuth, webhooks, embed script | `/api/v1/*` |
| **Embedded Script** | JS on client site → popup/launcher | `/widget/embedded-script.js` |
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

## 2. Contract

### Embedded Script Flow (step by step)

```
1. Wix loads on site:
   <script id="wix-app-embedded-script"
     src="https://<host>/widget/embedded-script.js?appInstanceId=<id>"
     async="true"></script>

2. embedded-script.js:
   a) Extracts appInstanceId from script src query param
   b) If missing — fallback via resolve-instance:
      GET /api/v1/widget/resolve-instance?siteOrigin=<window.location.origin>
   c) Requests config:
      GET /api/v1/widget/<appInstanceId>
   d) Renders popup/launcher from payload (NOT from hardcoded values)

3. Payload contains:
   - overlay: title, text, backgroundColor, designStyle
   - cta: text, url, action
   - tab: emoji, text
   - timer: enabled, minutes, seconds
   - content: dynamic data from DB (latest active entry)
   - template: templateId, templateSettings
```

---

## 3. Install Webhook

### ✅ DO: webhook handler with JWT decode and upsert

```js
// routes/webhooks.router.js
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Handles Wix install webhook.
 * Extracts appInstanceId from JWT, creates installation and default settings.
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
      // Do not crash webhook — manual re-embed is possible
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

### ✅ DO: embed script via Wix REST API

```js
// services/embed.service.js

/**
 * Registers embedded script in Wix via REST API.
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
   * Calls Wix Embedded Scripts API to register script on the site.
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
   * Manual re-embed (if webhook failed).
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

### ✅ DO: widget payload from DB (not mock)

```js
// controllers/widget.controller.js

/**
 * GET /api/v1/widget/:appInstanceId
 * Returns full payload for embedded script from DB.
 */
export const getWidgetPayload = asyncHandler(async (req, res) => {
  const { appInstanceId } = req.params;
  const { db } = req;

  // 1. Load settings
  const settings = await db.collection('settings').findOne({ appInstanceId });
  if (!settings) {
    return res.status(404).json({ error: 'App not found for script' });
  }

  // 2. Load latest active content entry
  const contentEntry = await db.collection('content').findOne(
    { appInstanceId, active: true },
    { sort: { createdAt: -1 } }
  );

  // 3. Form payload
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

### ✅ DO: bootstrap script with auto-detect

```js
// widget/embedded-script.js

/**
 * Wix Self-Hosted App — Embedded Script.
 * Loads on the client site, requests config from backend,
 * renders popup/launcher.
 */
(function () {
  'use strict';

  // 1. Determine API origin and appInstanceId
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
   * Renders popup/launcher from server payload.
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

### ✅ DO: Caddy for automatic local HTTPS

```caddyfile
# Caddyfile — single HTTPS entry point
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

### ✅ DO: trust certificate in OS

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

### Docker Compose snippet

```yaml
# docker-compose.yml (snippet)
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

## 8. Error Diagnostics

| Symptom | Cause | Solution |
|---------|---------|---------|
| `NET::ERR_CERT_AUTHORITY_INVALID` | Certificate not trusted by OS | Trust cert (section 7) |
| White screen in Wix iframe | Extension URL is not HTTPS or blocked | Check HTTPS, disable adblock for `manage.wix.com` |
| `App not found for script` / 404 | No installation in DB | Check install webhook, run re-embed |
| Script loaded, UI is absent | JS runtime error or empty payload | Browser console → `[Widget]` messages |
| API 403/permission | Missing Wix scopes/token | Check app permissions in Wix Dev Center |
| Popup does not update | Dashboard does not save to DB | Check PUT `/api/v1/settings/:appInstanceId` |
| Timer does not work | Mock values instead of DB | Verify that `timer.minutes/seconds` are from payload |
| Content not showing | No active content in DB | Check `content` collection, `active: true` |

---

## 9. Smoke Checklist

### DEMO-ready checklist

```markdown
- [ ] Dashboard saves settings → API → DB
- [ ] GET /api/v1/widget/:appInstanceId returns ACTUAL DB values
- [ ] Embedded script is actually injected into the site (visible in DOM: #wix-app-widget-root)
- [ ] Popup/launcher renders on published Wix site
- [ ] Dashboard changes reflect on storefront (after refresh)
- [ ] Timer works using DB values (not hardcoded)
- [ ] CTA performs action (redirect / copy / link)
- [ ] Dynamic content showing from DB (latest active)
- [ ] HTTPS without browser warnings
- [ ] Install webhook creates installation + settings + embed
```

### Done criteria

- End-to-end: Dashboard → API → DB → Embedded Script → Storefront UI
- No hardcoded/mock payload in production-like flow
- README contains setup instructions
- Health check endpoint responds with 200

---

## 10. Anti-patterns

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| Mock/hardcoded widget config | Always from DB via API |
| HTTP instead of HTTPS for Wix | Caddy + trusted cert |
| Ignoring embed error | Log + manual re-embed endpoint |
| `document.write` in embedded script | `createElement` + `appendChild` |
| Not validating `appInstanceId` | Validate, fallback via resolve-instance |
| Wix secrets in code | Env vars, validated via Zod |
| One endpoint for everything | Separate: widget, settings, webhooks, embed |

---

## See also
- `$node-express-beast-practices` — Express architecture
- `$security-baseline-dev` — secure webhook handling
- `$observability-logging` — structured logs for debugging
- `$docker-kubernetes-architecture` — Docker Compose setup
