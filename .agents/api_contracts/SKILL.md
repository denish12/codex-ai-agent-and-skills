---
name: api_contracts
description: API контракты по UX flows — эндпоинты, схемы, ошибки, валидация, авторизация, perf/scalability соображения, идемпотентность и интеграционные паттерны.
---

# Skill: API Contracts

Полное описание API: от endpoint definition до error format.

**Разделы:**
1. [Общие правила](#1-общие-правила)
2. [Endpoint Definition Template](#2-endpoint-template)
3. [Error Format](#3-error-format)
4. [Pagination & Filtering](#4-pagination)
5. [Auth Convention](#5-auth)
6. [Integration Contracts](#6-integrations)
7. [Пример: полный контракт](#7-пример)
8. [Output Template](#8-output)

---

## 1. Общие правила

| Правило | Convention |
|---------|-----------|
| **Base path** | `/api/v1/<resource>` |
| **Naming** | kebab-case, plural nouns: `/api/v1/coupons` |
| **Methods** | GET (read), POST (create), PUT (full update), PATCH (partial), DELETE |
| **Status codes** | 200 (OK), 201 (Created), 204 (No Content), 400, 401, 403, 404, 409, 422, 500 |
| **Content-Type** | `application/json` (request & response) |
| **Error format** | Единый (см. section 3) |
| **Validation** | Zod schemas на каждый endpoint, на границе (middleware) |
| **Auth** | Token в header или httpOnly cookie. Проверка на каждом protected endpoint |
| **Idempotency** | PUT = idempotent. POST create = idempotent key (если нужно) |
| **Versioning** | URL prefix: `/api/v1/`, `/api/v2/` (при breaking changes) |

---

## 2. Endpoint Definition Template

Для каждого endpoint заполни:

```markdown
### POST /api/v1/coupons

**Summary:** Create a new coupon for the installation.

**Auth:** Required (appInstanceId in path or JWT)

**Request:**
| Field | Type | Required | Constraints | Example |
|-------|------|----------|------------|---------|
| code | string | ✅ | 3-20 chars, alphanumeric | "SAVE20" |
| discount | number | ✅ | 1-100 | 20 |
| type | string | ✅ | enum: percent, fixed | "percent" |
| active | boolean | ⬜ | default: true | true |

**Request example:**
\`\`\`json
{
  "code": "SAVE20",
  "discount": 20,
  "type": "percent"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "data": {
    "id": "c-abc123",
    "code": "SAVE20",
    "discount": 20,
    "type": "percent",
    "active": true,
    "createdAt": "2026-03-13T03:00:00Z",
    "updatedAt": "2026-03-13T03:00:00Z"
  }
}
\`\`\`

**Errors:**
| Status | Code | When |
|--------|------|------|
| 400 | VALIDATION_ERROR | Invalid input (see details) |
| 409 | DUPLICATE | Coupon code already exists for this app |
| 401 | UNAUTHORIZED | Missing or invalid auth |

**Perf notes:**
- Unique index on (appInstanceId, code) — O(log n) lookup
- No pagination needed (single resource create)
```

### Zod Schema (для валидации)

```js
import { z } from 'zod';

/**
 * Schema для создания купона.
 */
export const createCouponSchema = z.object({
  code: z.string()
    .min(3, 'Code must be at least 3 characters')
    .max(20, 'Code must be at most 20 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Code must be alphanumeric')
    .transform((v) => v.toUpperCase()),
  discount: z.number()
    .min(1, 'Discount must be at least 1')
    .max(100, 'Discount cannot exceed 100'),
  type: z.enum(['percent', 'fixed']),
  active: z.boolean().optional().default(true),
});
```

---

## 3. Error Format

### Единый формат (все endpoints)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "code", "message": "Must be at least 3 characters" },
      { "field": "discount", "message": "Must be at least 1" }
    ]
  }
}
```

### Error codes (registry)

| HTTP | Code | Description | When |
|------|------|-------------|------|
| 400 | `VALIDATION_ERROR` | Input validation failed | Zod parse error |
| 400 | `BAD_REQUEST` | Malformed request | Missing body, bad JSON |
| 401 | `UNAUTHORIZED` | No auth or expired token | Missing/invalid JWT |
| 403 | `FORBIDDEN` | Authenticated but not allowed | Wrong role/scope |
| 404 | `NOT_FOUND` | Resource doesn't exist | ID not in DB |
| 409 | `DUPLICATE` | Unique constraint violation | Duplicate key |
| 409 | `CONFLICT` | Optimistic concurrency | Version mismatch |
| 422 | `UNPROCESSABLE` | Business rule violation | Coupon expired, limit reached |
| 429 | `RATE_LIMITED` | Too many requests | Rate limit exceeded |
| 500 | `INTERNAL_ERROR` | Unexpected server error | Bug, DB down |

### Правила

- **Никогда** не возвращать stack trace, DB error, internal path
- `code` = machine-readable (для клиента)
- `message` = human-readable (для toast/UI)
- `details` = field-level errors (для form validation)

---

## 4. Pagination & Filtering

### Cursor pagination (default для списков)

```markdown
### GET /api/v1/coupons

**Query params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | number | 20 | Max items per page (1-100) |
| cursor | string | — | Cursor from previous response |
| status | string | — | Filter: "active" or "inactive" |
| q | string | — | Search by code (case-insensitive) |
| sort | string | -createdAt | Sort field with direction prefix |

**Response (200):**
\`\`\`json
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6ImMtYWJjMTIzIn0=",
    "hasMore": true,
    "total": 42
  }
}
\`\`\`
```

### Convention

| Pattern | Когда | Пример |
|---------|-------|--------|
| **Cursor** | Большие коллекции (> 1K), real-time data | Coupons list, activity log |
| **Offset** | Маленькие коллекции, admin UI | Settings list (< 100 items) |
| **No pagination** | Single resource, bounded data | Widget config, user profile |

---

## 5. Auth

### Convention

```markdown
**Auth header:**
Authorization: Bearer <jwt_token>

**Or httpOnly cookie:**
Cookie: token=<jwt_token>

**Auth check middleware:**
1. Extract token (header → cookie fallback)
2. Verify JWT signature + expiration
3. Attach user/appInstanceId to req
4. Check required role/scope (if endpoint needs it)

**Protected endpoints:** All /api/v1/* except:
- GET /health/live
- GET /health/ready
- POST /api/webhooks/* (verified by webhook signature)
```

### Auth table (per endpoint)

| Endpoint | Auth | Role | Notes |
|----------|------|------|-------|
| `GET /api/v1/widget/:id` | ⬜ Public | — | Embedded script reads this |
| `GET /api/v1/settings/:id` | ✅ Required | owner | Dashboard only |
| `PUT /api/v1/settings/:id` | ✅ Required | owner | Dashboard only |
| `POST /api/v1/coupons` | ✅ Required | owner | Dashboard only |
| `POST /api/webhooks/install` | 🔑 Webhook sig | — | Wix signs with JWT |

---

## 6. Integration Contracts

### Webhook contract

```markdown
### POST /api/webhooks/v1/install

**Source:** Wix Platform
**Auth:** JWT signature verification (not Bearer token)
**Content-Type:** text/plain (JWT string)

**Processing:**
1. Decode JWT (no verify — Wix dev environment)
2. Extract appInstanceId from payload
3. Upsert installation + default settings
4. Call Embed Script API
5. Return 200 { success: true }

**Idempotent:** Yes (upsert)
**Retry:** Wix retries on timeout/5xx
**Timeout:** Must respond within 10s
```

### External API call contract

```markdown
### Wix Embed Script API

**Endpoint:** POST https://www.wixapis.com/apps/v1/scripts
**Auth:** OAuth access token
**Timeout:** 5s
**Retry:** 2x with exponential backoff (1s, 3s)
**Idempotent:** Yes (same script URL = no-op)
**Failure handling:** Log error, don't fail webhook (re-embed manually)
```

---

## 7. Пример: полный контракт (Smart Cart Rescue)

```markdown
# API Contracts: Smart Cart Rescue

## Endpoints

| Method | Path | Auth | Summary |
|--------|------|------|---------|
| GET | /api/v1/widget/:appInstanceId | Public | Widget payload for embedded script |
| GET | /api/v1/widget/resolve-instance | Public | Resolve appInstanceId from site origin |
| GET | /api/v1/settings/:appInstanceId | Owner | Get settings |
| PUT | /api/v1/settings/:appInstanceId | Owner | Update settings |
| GET | /api/v1/coupons | Owner | List coupons (paginated) |
| POST | /api/v1/coupons | Owner | Create coupon |
| PUT | /api/v1/coupons/:id | Owner | Update coupon |
| DELETE | /api/v1/coupons/:id | Owner | Delete coupon |
| POST | /api/webhooks/v1/install | Webhook | Wix install webhook |
| POST | /api/webhooks/v1/uninstall | Webhook | Wix uninstall webhook |
| GET | /health/live | Public | Liveness probe |
| GET | /health/ready | Public | Readiness probe |
```

---

## 8. Output Template

```markdown
# API Contracts: <project-name>

**Date:** YYYY-MM-DD
**Version:** v1
**Base URL:** https://<host>/api/v1

## General Rules
- Error format: { error: { code, message, details } }
- Auth: Bearer JWT or httpOnly cookie
- Pagination: cursor-based (limit, cursor, hasMore)

## Endpoints
<for each endpoint: section 2 template>

## Error Codes
<section 3 registry table>

## Auth Table
<section 5 per-endpoint table>

## Integration Contracts
<section 6 for each external integration>
```

---

## См. также
- `$architecture_doc` — Architecture Document (references API contracts)
- `$data_model` — Data model (entities match request/response schemas)
- `$security_baseline_dev` — Zod validation, auth patterns
- `$node_express_beast_practices` — Express implementation patterns
