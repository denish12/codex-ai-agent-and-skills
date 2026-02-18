---
name: wix_self_hosted_embedded_script
description: Практический runbook для Wix Self-Hosted Embedded Script: HTTPS локально, install webhook, embed script, resolve appInstanceId, DB-driven widget config, частые ошибки и проверка DEMO-ready.
---

# Skill: Wix Self-Hosted Embedded Script

## Когда активировать
- Нужно реализовать или чинить Embedded Script extension в Wix Self-Hosted app.
- Нужно, чтобы виджет на опубликованном сайте брал настройки из БД через backend.
- Есть проблемы с install webhook, appInstanceId, HTTPS/certificate, пустым экраном в Wix.

## Обязательные правила
- Только `https://` URL для Wix extension и локальной разработки.
- Никаких mock данных в рабочих flow.
- Widget рендерится из реального backend payload (`/api/v1/widget/:appInstanceId`).
- Все функции с JSDoc.

## Базовая архитектура
- Dashboard: управляет настройками и купонами.
- API: хранит настройки/купоны, обрабатывает OAuth/webhooks, делает embed script.
- Embedded script: грузится на сайте пользователя, запрашивает widget config из API, показывает popup/launcher.
- Gateway (Caddy): единая HTTPS точка (`https://localhost:5173`).

## Контракт embedded script flow
1. Wix загружает:
   - `<script id="smart-cart-rescue-embedded-script" src="https://<host>/widget/embedded-script.js?appInstanceId=<id>" async="true"></script>`
2. Script определяет `apiOrigin` и `appInstanceId`:
   - из query `appInstanceId`, либо
   - через `GET /api/v1/widget/resolve-instance?siteOrigin=<window.location.origin>`.
3. Script читает payload:
   - `GET /api/v1/widget/:appInstanceId`
4. Script рендерит UI только из payload:
   - overlay title/text/bg
   - CTA text
   - tab emoji/text
   - timer settings
   - latest coupon (если есть)

## Что должно быть в API
- `GET /api/v1/widget/:appInstanceId`
- `GET /api/v1/widget/resolve-instance?siteOrigin=...`
- `POST /api/v1/embedded-script/embed/:appInstanceId`
- `POST /api/webhooks/v1/install`
- `POST /api/webhooks/v1/uninstall`
- `GET/PUT /api/v1/settings/:appInstanceId`

## Install webhook и embed
- На `install`:
  - извлечь `appInstanceId` из webhook JWT,
  - upsert installation + дефолтные settings,
  - вызвать embed script API,
  - записать audit event.
- Для ручного восстановления:
  - `POST /api/v1/embedded-script/embed/:appInstanceId`

## HTTPS и локальная разработка
- Локальная точка входа: `https://localhost:5173`.
- Сертификат должен быть доверен в ОС (не только browser bypass).
- Если iframe в `manage.wix.com` пустой:
  - проверить trusted cert,
  - выключить adblock/shields для `manage.wix.com` и `localhost`,
  - hard refresh и/или clean profile.

## Частые ошибки и диагностика
- `NET::ERR_CERT_AUTHORITY_INVALID`:
  - сертификат не доверен системой.
- Белый экран в Wix iframe:
  - extension URL не HTTPS или блокируется расширениями.
- `App not found for script` / `404`:
  - не найден `appInstanceId`, сломан `resolve-instance` путь.
- Script загрузился, но UI нет:
  - script runtime error или невалидный widget payload.
- API 403/permission:
  - не хватает Wix scopes/токена для нужного API.

## Минимальный smoke-checklist (DEMO-ready)
1. Dashboard сохраняет настройки в БД.
2. `GET /api/v1/widget/:appInstanceId` возвращает актуальные DB values.
3. Embedded script реально внедрен в сайт (виден в DOM).
4. Popup/launcher работает на опубликованном сайте.
5. Таймер ведет себя по требованиям (без mock поведения).
6. CTA выполняет ожидаемое действие (например, копирует coupon code).

## Done-критерии для задачи
- End-to-end flow работает в Wix (dashboard -> API -> embedded script -> storefront UI).
- Нет hardcoded/mock payload для production-like сценариев.
- Есть инструкции проверки в README/DEMO report.
