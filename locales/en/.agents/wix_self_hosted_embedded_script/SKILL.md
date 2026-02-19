---
name: wix_self_hosted_embedded_script
description: Practical runbook for Wix Self-Hosted Embedded Script: HTTPS locally, install webhook, embed script, resolve appInstanceId, DB-driven widget config, common errors and DEMO-ready check.
---

# Skill: Wix Self-Hosted Embedded Script

## When to activate
- You need to implement or repair the Embedded Script extension in the Wix Self-Hosted app.
- It is necessary for the widget on the published site to take settings from the database via the backend.
- There are problems with install webhook, appInstanceId, HTTPS/certificate, blank screen in Wix.

## Mandatory rules
- Only `https://` URL for Wix extension and local development.
- No mock data in working flows.
- The Widget is rendered from the real backend payload (`/api/v1/widget/:appInstanceId`).
- All functions with JSDoc.

## Basic architecture
- Dashboard: manages settings and coupons.
- API: stores settings/coupons, processes OAuth/webhooks, makes embed script.
- Embedded script: loaded on the user's website, requests widget config from the API, shows popup/launcher.
- Gateway (Caddy): single HTTPS point (`https://localhost:5173`).

## Contract embedded script flow
1. Wix uploads:
   - `<script id="smart-cart-rescue-embedded-script" src="https://<host>/widget/embedded-script.js?appInstanceId=<id>" async="true"></script>`
2. The script defines `apiOrigin` and `appInstanceId`:
- from query `appInstanceId`, or
- via `GET /api/v1/widget/resolve-instance?siteOrigin=<window.location.origin>`.
3. Script reads payload:
   - `GET /api/v1/widget/:appInstanceId`
4. Script renders UI only from payload:
   - overlay title/text/bg
   - CTA text
   - tab emoji/text
   - timer settings
- latest coupon (if available)

## What should be in the API
- `GET /api/v1/widget/:appInstanceId`
- `GET /api/v1/widget/resolve-instance?siteOrigin=...`
- `POST /api/v1/embedded-script/embed/:appInstanceId`
- `POST /api/webhooks/v1/install`
- `POST /api/webhooks/v1/uninstall`
- `GET/PUT /api/v1/settings/:appInstanceId`

## Install webhook and embed
- On `install`:
- extract `appInstanceId` from webhook JWT,
- upsert installation + default settings,
- call embed script API,
- record audit event.
- For manual recovery:
  - `POST /api/v1/embedded-script/embed/:appInstanceId`

## HTTPS and local development
- Local entry point: `https://localhost:5173`.
- The certificate must be trusted in the OS (not just browser bypass).
- If the iframe in `manage.wix.com` is empty:
- check trusted cert,
- disable adblock/shields for `manage.wix.com` and `localhost`,
- hard refresh and/or clean profile.

## Frequent errors and diagnostics
- `NET::ERR_CERT_AUTHORITY_INVALID`:
- the certificate is not trusted by the system.
- White screen in Wix iframe:
- extension URL is not HTTPS or is blocked by extensions.
- `App not found for script` / `404`:
- `appInstanceId` not found, `resolve-instance` path broken.
- Script loaded, but no UI:
- script runtime error or invalid widget payload.
- API 403/permission:
- there are not enough Wix scopes/token for the required API.

## Minimum smoke-checklist (DEMO-ready)
1. Dashboard saves settings in the database.
2. `GET /api/v1/widget/:appInstanceId` returns the current DB values.
3. Embedded script is actually embedded in the site (visible in the DOM).
4. Popup/launcher works on a published site.
5. The timer behaves according to the requirements (without mock behavior).
6. The CTA performs the expected action (for example, copying the coupon code).

## Done criteria for a task
- End-to-end flow works in Wix (dashboard -> API -> embedded script -> storefront UI).
- No hardcoded/mock payload for production-like scenarios.
- There are verification instructions in the README/DEMO report.
