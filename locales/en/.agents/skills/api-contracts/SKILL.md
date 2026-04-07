---
name: api-contracts
description: API contracts for UX flows — endpoints, schemas, errors, validation, authorization, perf/scalability considerations, idempotency, and integration patterns.
---

# Skill: API Contracts

Complete API description: from endpoint definition to error format.

**Sections:**
1. [General rules](#1-general-rules)
2. [Endpoint Definition Template](#2-endpoint-template)
3. [Error Format](#3-error-format)
4. [Pagination & Filtering](#4-pagination)
5. [Auth Convention](#5-auth)
6. [Integration Contracts](#6-integrations)
7. [Example: complete contract](#7-example)
8. [Output Template](#8-output)

---

## 1. General rules

| Rule | Convention |
|---------|-----------|
| **Base path** | `/api/v1/<resource>` |
| **Naming** | kebab-case, plural nouns: `/api/v1/products` |
| **Methods** | GET (read), POST (create), PUT (full update), PATCH (partial), DELETE |
| **Status codes** | 200 (OK), 201 (Created), 204 (No Content), 400, 401, 403, 404, 409, 422, 500 |
| **Content-Type** | `application/json` (request & response) |
| **Error format** | Unified (see section 3) |
| **Validation** | Zod schemas for each endpoint, at the boundary (middleware) |
| **Auth** | Token in header or httpOnly cookie. Check on every protected endpoint |
| **Idempotency** | PUT = idempotent. POST create = idempotent key (if needed) |
| **Versioning** | URL prefix: `/api/v1/`, `/api/v2/` (for breaking changes) |

---

## 2. Endpoint Definition Template

For each endpoint, fill in:

```markdown
### POST /api/v1/products

**Summary:** Create a new product for the tenant.

**Auth:** Required (tenantId in path or JWT)

**Request:**
| Field | Type | Required | Constraints | Example |
|-------|------|----------|------------|---------|
| name | string | ✅ | 3-100 chars | "Premium Widget" |
| price | number | ✅ | 0.01-99999 | 29.99 |
| category | string | ✅ | enum: digital, physical, subscription | "digital" |
| active | boolean | ⬜ | default: true | true |

**Request example:**
\`\`\`json
{
  "name": "Premium Widget",
  "price": 29.99,
  "category": "digital"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "data": {
    "id": "p-abc123",
    "name": "Premium Widget",
    "price": 29.99,
    "category": "digital",
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
| 409 | DUPLICATE | Product name already exists for this tenant |
| 401 | UNAUTHORIZED | Missing or invalid auth |

**Perf notes:**
- Unique index on (tenantId, name) — O(log n) lookup
- No pagination needed (single resource create)
```

### Zod Schema (for validation)

```js
import { z } from 'zod';

/**
 * Schema for creating a product.
 */
export const createProductSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be at most 100 characters')
    .trim(),
  price: z.number()
    .min(0.01, 'Price must be at least 0.01')
    .max(99999, 'Price cannot exceed 99999'),
  category: z.enum(['digital', 'physical', 'subscription']),
  active: z.boolean().optional().default(true),
});
```

---

## 3. Error Format

### Unified format (all endpoints)

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
| 422 | `UNPROCESSABLE` | Business rule violation | Item expired, limit reached |
| 429 | `RATE_LIMITED` | Too many requests | Rate limit exceeded |
| 500 | `INTERNAL_ERROR` | Unexpected server error | Bug, DB down |

### Rules

- **Never** return stack trace, DB error, internal path
- `code` = machine-readable (for the client)
- `message` = human-readable (for toast/UI)
- `details` = field-level errors (for form validation)

---

## 4. Pagination & Filtering

### Cursor pagination (default for lists)

```markdown
### GET /api/v1/products

**Query params:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | number | 20 | Max items per page (1-100) |
| cursor | string | — | Cursor from previous response |
| status | string | — | Filter: "active" or "inactive" |
| q | string | — | Search by name (case-insensitive) |
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

| Pattern | When | Example |
|---------|-------|--------|
| **Cursor** | Large collections (> 1K), real-time data | Products list, activity log |
| **Offset** | Small collections, admin UI | Settings list (< 100 items) |
| **No pagination** | Single resource, bounded data | Config, user profile |

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
3. Attach user/tenantId to req
4. Check required role/scope (if endpoint needs it)

**Protected endpoints:** All /api/v1/* except:
- GET /health/live
- GET /health/ready
- POST /api/webhooks/* (verified by webhook signature)
```

### Auth table (per endpoint)

| Endpoint | Auth | Role | Notes |
|----------|------|------|-------|
| `GET /api/v1/content/:id` | ⬜ Public | — | Public content endpoint |
| `GET /api/v1/settings/:id` | ✅ Required | owner | Dashboard only |
| `PUT /api/v1/settings/:id` | ✅ Required | owner | Dashboard only |
| `POST /api/v1/products` | ✅ Required | owner | Dashboard only |
| `POST /api/webhooks/install` | 🔑 Webhook sig | — | Platform signs with JWT |

---

## 6. Integration Contracts

### Webhook contract

```markdown
### POST /api/webhooks/v1/install

**Source:** External Platform
**Auth:** JWT signature verification (not Bearer token)
**Content-Type:** text/plain (JWT string)

**Processing:**
1. Decode JWT (verify signature in production)
2. Extract tenantId from payload
3. Upsert tenant + default settings
4. Call Platform registration API
5. Return 200 { success: true }

**Idempotent:** Yes (upsert)
**Retry:** Platform retries on timeout/5xx
**Timeout:** Must respond within 10s
```

### External API call contract

```markdown
### External Platform API

**Endpoint:** POST https://api.example.com/v1/register
**Auth:** OAuth access token
**Timeout:** 5s
**Retry:** 2x with exponential backoff (1s, 3s)
**Idempotent:** Yes (same registration = no-op)
**Failure handling:** Log error, don't fail webhook (retry manually)
```

---

## 7. Example: complete contract

```markdown
# API Contracts: SaaS Admin Panel

## Endpoints

| Method | Path | Auth | Summary |
|--------|------|------|---------|
| GET | /api/v1/content/:tenantId | Public | Public content payload |
| GET | /api/v1/content/resolve-tenant | Public | Resolve tenantId from origin |
| GET | /api/v1/settings/:tenantId | Owner | Get settings |
| PUT | /api/v1/settings/:tenantId | Owner | Update settings |
| GET | /api/v1/products | Owner | List products (paginated) |
| POST | /api/v1/products | Owner | Create product |
| PUT | /api/v1/products/:id | Owner | Update product |
| DELETE | /api/v1/products/:id | Owner | Delete product |
| POST | /api/webhooks/v1/install | Webhook | Platform install webhook |
| POST | /api/webhooks/v1/uninstall | Webhook | Platform uninstall webhook |
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

## See also
- `$architecture-doc` — Architecture Document (references API contracts)
- `$data-model` — Data model (entities match request/response schemas)
- `$security-baseline-dev` — Zod validation, auth patterns
- `$node-express-beast-practices` — Express implementation patterns
