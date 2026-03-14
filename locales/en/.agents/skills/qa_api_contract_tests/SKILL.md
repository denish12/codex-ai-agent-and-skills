---
name: qa_api_contract_tests
description: Test API compliance against contracts — schemas, codes, errors, validation, pagination; perform smoke testing via curl/scripts.
---

# Skill: QA API Contract Tests

Run API smoke tests: endpoints, status codes, error format, validation.

**Sections:**
1. [Workflow](#1-workflow)
2. [Test Case Table](#2-test-cases)
3. [Curl Examples](#3-curl)
4. [Automation Script](#4-script)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Load API Contracts (from $api_contracts)
2. For each endpoint:
   a. Happy path → correct request → expected status + response shape
   b. Validation → invalid request → 400 + error format
   c. Auth → no token → 401
   d. Not found → wrong ID → 404
3. Fill results table
4. For each FAIL → bug report
```

---

## 2. Test Case Table

### Template per endpoint

| TC-ID | Endpoint | Scenario | Request | Expected Status | Expected Body | Priority |
|-------|----------|----------|---------|:---------------:|--------------|:--------:|
| API-TC-01 | POST /api/v1/coupons | Happy: create coupon | `{ code, discount }` | 201 | `{ data: { id, code, discount } }` | P0 |
| API-TC-02 | POST /api/v1/coupons | Error: missing code | `{ discount: 10 }` | 400 | `{ error: { code: "VALIDATION_ERROR" } }` | P0 |
| API-TC-03 | POST /api/v1/coupons | Error: duplicate code | `{ code: "EXISTING" }` | 409 | `{ error: { code: "ALREADY_EXISTS" } }` | P1 |
| API-TC-04 | POST /api/v1/coupons | Auth: no token | `{ code, discount }` | 401 | `{ error: { code: "UNAUTHORIZED" } }` | P0 |
| API-TC-05 | GET /api/v1/coupons | Happy: list | — | 200 | `{ data: [...], meta: { total } }` | P0 |
| API-TC-06 | GET /api/v1/coupons | Empty: no data | — | 200 | `{ data: [], meta: { total: 0 } }` | P1 |
| API-TC-07 | PUT /api/v1/settings/:id | Happy: update | `{ title, colors }` | 200 | `{ data: { ... } }` | P0 |
| API-TC-08 | PUT /api/v1/settings/:id | Error: invalid color | `{ colors: { bg: "not-a-color" } }` | 400 | `{ error: { ... } }` | P1 |
| API-TC-09 | PUT /api/v1/settings/:id | Error: wrong owner | Valid body, wrong appInstanceId | 403/404 | Error response | P0 |
| API-TC-10 | DELETE /api/v1/coupons/:id | Happy: delete | — | 204 | — | P0 |
| API-TC-11 | DELETE /api/v1/coupons/:id | Error: not found | Non-existent ID | 404 | `{ error: { code: "NOT_FOUND" } }` | P1 |
| API-TC-12 | GET /api/v1/widget/:id | Happy: public | — | 200 | Widget config | P0 |
| API-TC-13 | GET /api/v1/widget/:id | Error: not found | Wrong ID | 404 | Error | P1 |

---

## 3. Curl Examples

### Happy path: Create coupon

```bash
curl -X POST https://localhost:5173/api/v1/coupons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"code": "SAVE20", "discount": 20, "type": "percentage"}'

# Expected: 201 Created
# { "data": { "id": "...", "code": "SAVE20", "discount": 20 } }
```

### Validation error: Missing field

```bash
curl -X POST https://localhost:5173/api/v1/coupons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"discount": 10}'

# Expected: 400 Bad Request
# { "error": { "code": "VALIDATION_ERROR", "message": "...", "details": { "code": "Required" } } }
```

### Auth error: No token

```bash
curl -X POST https://localhost:5173/api/v1/coupons \
  -H "Content-Type: application/json" \
  -d '{"code": "SAVE20", "discount": 20}'

# Expected: 401 Unauthorized
# { "error": { "code": "UNAUTHORIZED", "message": "Authentication required" } }
```

### Not found

```bash
curl -X GET https://localhost:5173/api/v1/widget/nonexistent-id

# Expected: 404 Not Found
# { "error": { "code": "NOT_FOUND", "message": "App not found" } }
```

### Delete

```bash
curl -X DELETE https://localhost:5173/api/v1/coupons/<id> \
  -H "Authorization: Bearer <token>"

# Expected: 204 No Content (empty body)
```

---

## 4. Automation Script

### Vitest integration test pattern

```javascript
import { describe, it, expect } from 'vitest';

describe('POST /api/v1/coupons', () => {
  it('TC-01: creates coupon with valid data', async () => {
    const res = await fetch(`${API_URL}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ code: 'TEST20', discount: 20, type: 'percentage' }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.data).toHaveProperty('id');
    expect(body.data.code).toBe('TEST20');
  });

  it('TC-02: returns 400 for missing code', async () => {
    const res = await fetch(`${API_URL}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ discount: 10 }),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });

  it('TC-04: returns 401 without auth', async () => {
    const res = await fetch(`${API_URL}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'TEST', discount: 10 }),
    });
    expect(res.status).toBe(401);
  });
});
```

---

## 5. Output Template

```markdown
# API Contract Test Report

**Date:** YYYY-MM-DD
**Tester:** Tester Agent
**Base URL:** <API URL>
**Contract reference:** <api-contracts.md>

## Results

| TC-ID | Endpoint | Scenario | Expected | Actual | Status |
|-------|----------|----------|:--------:|:------:|:------:|
| API-TC-01 | POST /coupons | Happy | 201 | 201 | ✅ |
| API-TC-02 | POST /coupons | Validation | 400 | 400 | ✅ |
| API-TC-04 | POST /coupons | No auth | 401 | 401 | ✅ |
| API-TC-07 | PUT /settings/:id | Happy | 200 | 200 | ✅ |
| API-TC-08 | PUT /settings/:id | Invalid | 400 | 500 | ❌ |

## Error Format Check
| Endpoint | Status Code | Has `error.code`? | Has `error.message`? | Status |
|----------|:-----------:|:-----------------:|:--------------------:|:------:|
| POST /coupons | 400 | ✅ | ✅ | Pass |
| PUT /settings | 500 | ❌ | ❌ (raw stack) | ❌ Fail |

## Summary
| Status | Count |
|--------|:-----:|
| ✅ PASS | X |
| ❌ FAIL | Y |
| Total | Z |

## Bugs Found
| Bug ID | TC | Finding | Severity |
|--------|-----|---------|----------|
| BUG-XXX | API-TC-08 | PUT /settings returns 500 + stack for invalid input | 🔴 P0 |

## Verdict
- ✅ COMPLIANT — all endpoint tests pass
- ⚠️ DEVIATIONS — minor contract mismatches
- ❌ NON-COMPLIANT — critical contract violations
```

---

## See also
- `$api_contracts` — contract definitions (source of truth)
- `$api_contract_compliance_review` — code review of implementation
- `$qa_test_plan` — test plan (references this skill)
- `$qa_security_smoke_tests` — security-focused API tests
