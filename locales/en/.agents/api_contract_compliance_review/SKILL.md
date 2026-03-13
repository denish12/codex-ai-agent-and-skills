---
name: api_contract_compliance_review
description: Check compliance implementation API contracts — schemas, codes errors, validation, authorization, idempotency, pagination.
---

# Skill: API Contract Compliance Review

Review: implementation API matches the declared contracts.

**Sections:**
1. [Workflow](#1-workflow)
2. [Checklist](#2-checklist)
3. [Verification Methods](#3-methods)
4. [Common Mismatches](#4-mismatches)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Load API Contracts (from $api_contracts)
   └── List endpoints, schemas, error codes

2. For each endpoint:
   a. Find file implementation (route → controller → service)
   b. Compare: method, path, request schema, response schema
   c. Check: error format, status codes, auth, validation

3. Check cross-cutting concerns:
   └── Error format, pagination, auth, rate limiting

4. Form a compliance report
```

---

## 2. Checklist

### 2.1 Endpoint Compliance

| # | Check | Severity | Status |
|---|-------|----------|--------|
| API-01 | Every documented endpoint exists in code | 🔴 P0 | ☐ |
| API-02 | HTTP method matches contract (POST, not PUT for create) | 🔴 P0 | ☐ |
| API-03 | URL path matches contract (naming, params) | 🔴 P0 | ☐ |
| API-04 | Request body schema validates with Zod (matches contract fields) | 🔴 P0 | ☐ |
| API-05 | Response body matches contract shape | 🔴 P0 | ☐ |
| API-06 | No undocumented endpoints exist | 🟠 P1 | ☐ |

### 2.2 Error Format

| # | Check | Severity | Status |
|---|-------|----------|--------|
| API-07 | Error responses use unified format `{ error: { code, message } }` | 🔴 P0 | ☐ |
| API-08 | Error codes match registry (VALIDATION_ERROR, NOT_FOUND, etc.) | 🟠 P1 | ☐ |
| API-09 | No stack traces in error responses | 🔴 P0 | ☐ |
| API-10 | Validation errors include `details` with field names | 🟠 P1 | ☐ |

### 2.3 Status Codes

| # | Check | Severity | Status |
|---|-------|----------|--------|
| API-11 | 200 for successful GET/PUT | 🟠 P1 | ☐ |
| API-12 | 201 for successful POST (create) | 🟠 P1 | ☐ |
| API-13 | 204 for successful DELETE | 🟠 P1 | ☐ |
| API-14 | 400 for validation errors | 🟠 P1 | ☐ |
| API-15 | 401 for missing auth, 403 for insufficient permissions | 🔴 P0 | ☐ |
| API-16 | 404 for not found | 🟠 P1 | ☐ |
| API-17 | 409 for conflict/duplicate | 🟠 P1 | ☐ |
| API-18 | 500 only for unexpected errors (not for validation/auth!) | 🟠 P1 | ☐ |

### 2.4 Auth & AuthZ

| # | Check | Severity | Status |
|---|-------|----------|--------|
| API-19 | Protected endpoints have auth middleware | 🔴 P0 | ☐ |
| API-20 | Public endpoints are intentionally public (documented) | 🟠 P1 | ☐ |
| API-21 | IDOR protection: ownership check on data access | 🔴 P0 | ☐ |

### 2.5 Pagination & Filtering

| # | Check | Severity | Status |
|---|-------|----------|--------|
| API-22 | List endpoints have pagination (cursor or offset) | 🔴 P0 | ☐ |
| API-23 | Pagination params match contract (limit, cursor/page) | 🟠 P1 | ☐ |
| API-24 | Response includes pagination metadata (totalCount, hasMore) | 🟠 P1 | ☐ |
| API-25 | Filter params documented and validated | 🟡 P2 | ☐ |

### 2.6 Idempotency

| # | Check | Severity | Status |
|---|-------|----------|--------|
| API-26 | Safe methods (GET) are idempotent | 🟠 P1 | ☐ |
| API-27 | Risky create/charge operations support Idempotency-Key (if contract requires) | 🟡 P2 | ☐ |

---

## 3. Verification Methods

### Endpoint comparison table

For each documented endpoint, fill in:

```markdown
| Contract | Implementation | Match? |
|----------|---------------|:------:|
| POST /api/v1/coupons | routes/coupons.js:12 → couponController.create | ✅ |
| GET /api/v1/coupons | routes/coupons.js:8 → couponController.list | ✅ |
| PUT /api/v1/settings/:id | routes/settings.js:15 → settingsController.update | ⚠️ PATCH vs PUT |
| DELETE /api/v1/coupons/:id | — | ❌ NOT IMPLEMENTED |
```

### Schema comparison

```javascript
// Contract says:
// POST /coupons → { code: string, discount: number, expiresAt: string(ISO) }

// Check Zod schema in middleware:
const createCouponSchema = z.object({
  code: z.string().min(1).max(50),      // ✅ matches
  discount: z.number().min(0).max(100),  // ✅ matches
  expiresAt: z.string().datetime(),      // ✅ matches
  // ❌ Missing: 'description' field from contract
});
```

### Error format validation

```javascript
// Contract says: { error: { code: string, message: string, details?: object } }

// Check actual error handler:
grep_search: Query="res.status(4" Includes=["*/controllers/*"]
grep_search: Query="res.status(5" Includes=["*/controllers/*"]
// For each: does response match { error: { code, message } } format?
```

### Grep patterns

```bash
# Find all route definitions
grep_search: Query="router\.(get|post|put|patch|delete)" Includes=["*/routes/*"] IsRegex=true

# Find status codes used
grep_search: Query="res.status(" Includes=["*.js"]

# Find error responses
grep_search: Query="error.*code" Includes=["*/controllers/*","*/middleware/*"]

# Find auth middleware usage
grep_search: Query="auth" Includes=["*/routes/*"]
```

---

## 4. Common Mismatches

| Mismatch | Example | Severity | Fix |
|----------|---------|----------|-----|
| **Wrong status code** | POST returns 200 instead of 201 | 🟠 P1 | `res.status(201)` |
| **Wrong method** | PUT for partial update (should be PATCH) | 🟠 P1 | Change to PATCH or justify in ADR |
| **Error format inconsistent** | Some endpoints return `{ message }`, others `{ error: { code } }` | 🔴 P0 | Unify via error handler middleware |
| **Missing validation** | Endpoint accepts any body shape | 🔴 P0 | Add Zod middleware |
| **Missing fields in response** | Contract says `{ data, meta }` but returns only `{ data }` | 🟠 P1 | Add `meta` to response |
| **Undocumented endpoint** | New endpoint exists without contract update | 🟠 P1 | Update API contracts doc |
| **Auth on public endpoint** | Widget endpoint requires auth (should be public) | 🔴 P0 | Remove auth, verify contract |
| **No pagination** | List returns all records | 🔴 P0 | Add pagination params |
| **Mixed error details** | Some 400 include field errors, some don't | 🟠 P1 | Standardize `details` shape |

---

## 5. Output Template

```markdown
# API Contract Compliance Review

**Scope:** <module/PR>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD
**Contract reference:** docs/api-contracts.md

## Endpoint Compliance

| # | Contract Endpoint | Implementation | Method | Path | Schema | Auth | Status |
|---|------------------|---------------|:------:|:----:|:------:|:----:|:------:|
| 1 | POST /api/v1/coupons | couponController.create | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | GET /api/v1/coupons | couponController.list | ✅ | ✅ | ⚠️ | ✅ | ⚠️ |
| 3 | PUT /api/v1/settings/:id | settingsController.update | ⚠️ | ✅ | ✅ | ✅ | ⚠️ |
| 4 | DELETE /api/v1/coupons/:id | — | — | — | — | — | ❌ |

## Findings

| # | Severity | Check | File:Line | Mismatch | Fix |
|---|----------|-------|-----------|----------|-----|
| 1 | 🔴 P0 | API-01 | — | DELETE /coupons/:id not implemented | Implement or remove from contract |
| 2 | 🟠 P1 | API-12 | `controllers/coupon.js:35` | POST returns 200 instead of 201 | Change to `res.status(201)` |
| 3 | 🟠 P1 | API-02 | `routes/settings.js:15` | PUT used for partial update | Change to PATCH or update contract |

## Error Format Compliance
| Endpoint | Expected Format | Actual Format | Status |
|----------|----------------|--------------|:------:|
| POST /coupons (400) | `{ error: { code, message, details } }` | ✅ | Pass |
| GET /coupons (500) | `{ error: { code, message } }` | `{ message: err.message }` | ❌ Fail |

## Summary
- Endpoints: X/Y compliant (Z% coverage)
- P0 mismatches: N
- P1 mismatches: M

## Verdict
- ✅ COMPLIANT — all endpoints match contract
- ⚠️ DEVIATIONS — minor mismatches to fix
- ❌ NON-COMPLIANT — critical contract violations
```

---

## See also
- `$api_contracts` — API contract definitions (source of truth)
- `$code_review_checklist` — general review (API section)
- `$security_review` — auth/validation depth (SEC-06..SEC-17)
- `$review_reference_snippets` — DO/DON'T snippets (section M)
