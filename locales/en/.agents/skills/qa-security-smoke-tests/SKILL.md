---
name: qa-security-smoke-tests
description: Basic security smoke tests — auth/authz, validation, leaks in errors/logs, rate limiting (if enabled), SSRF/XSS where relevant.
---

# Skill: QA Security Smoke Tests

Run security smoke: auth, validation, error exposure, rate limiting.

**Sections:**
1. [Workflow](#1-workflow)
2. [Test Cases](#2-test-cases)
3. [Curl Commands](#3-curl)
4. [Log Inspection](#4-logs)
5. [Output Template](#5-output)

---

## 1. Workflow

```
1. Identify protected endpoints (from $api-contracts)
2. For each protected endpoint:
   a. Request without auth → expect 401
   b. Request with someone else's auth → expect 403/404
   c. Invalid input → expect 400 (not 500!)
   d. Check error response: no stack/DB/PII
3. For public endpoints:
   a. Check rate limiting (if enabled)
4. Check logs: no PII/secrets
5. Fill results table
```

---

## 2. Test Cases

| TC-ID | Category | Test | Request | Expected | Priority |
|-------|----------|------|---------|----------|:--------:|
| SEC-TC-01 | **Auth** | No token on protected endpoint | POST /coupons (no Authorization) | 401 | P0 |
| SEC-TC-02 | **Auth** | Invalid token | POST /coupons (garbage token) | 401 | P0 |
| SEC-TC-03 | **Auth** | Expired token | POST /coupons (expired JWT) | 401 | P1 |
| SEC-TC-04 | **IDOR** | Access other user's data | GET /settings/other-app-id | 403 or 404 | P0 |
| SEC-TC-05 | **IDOR** | Modify other user's data | PUT /settings/other-app-id | 403 or 404 | P0 |
| SEC-TC-06 | **IDOR** | Delete other user's data | DELETE /coupons/other-user-coupon | 403 or 404 | P0 |
| SEC-TC-07 | **Validation** | Empty body | POST /coupons `{}` | 400 (not 500!) | P0 |
| SEC-TC-08 | **Validation** | Malicious field types | POST /coupons `{"code": 12345}` | 400 | P0 |
| SEC-TC-09 | **Validation** | Oversized input | POST /coupons `{"code": "A".repeat(10000)}` | 400 | P1 |
| SEC-TC-10 | **NoSQL** | Operator injection | GET /coupons?code[$gt]= | 400 (not data leak!) | P0 |
| SEC-TC-11 | **Error leak** | Trigger 500 | Cause server error | No stack/DB in response | P0 |
| SEC-TC-12 | **Error leak** | Check error format | Any 4xx/5xx | `{ error: { code, message } }` only | P0 |
| SEC-TC-13 | **Rate limit** | Flood endpoint | 100+ requests/min | 429 (if enabled) | P1 |
| SEC-TC-14 | **Headers** | Check security headers | Any response | X-Content-Type-Options, etc. | P1 |
| SEC-TC-15 | **XSS** | Script in input | POST /settings `{"title": "<script>alert(1)</script>"}` | Stored sanitized or rejected | P0 |

---

## 3. Curl Commands

### No auth (SEC-TC-01)

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -X POST https://localhost:5173/api/v1/coupons \
  -H "Content-Type: application/json" \
  -d '{"code":"TEST","discount":10}'
# Expected: 401
```

### IDOR check (SEC-TC-04)

```bash
curl -s -w "\n%{http_code}" \
  -X GET https://localhost:5173/api/v1/settings/OTHER_APP_INSTANCE_ID \
  -H "Authorization: Bearer <my_token>"
# Expected: 403 or 404 (NOT 200 with other user's data!)
```

### NoSQL injection (SEC-TC-10)

```bash
curl -s -w "\n%{http_code}" \
  "https://localhost:5173/api/v1/coupons?code[\$gt]="
# Expected: 400 (NOT 200 with all coupons!)
```

### Error exposure check (SEC-TC-11)

```bash
curl -s -X POST https://localhost:5173/api/v1/coupons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"code": null}' | python3 -m json.tool
# Check: no "stack", no "MongoError", no file paths in response
```

### XSS in input (SEC-TC-15)

```bash
curl -s -X PUT https://localhost:5173/api/v1/settings/MY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "<script>alert(1)</script>"}'
# Check: title should be sanitized/escaped, NOT stored as raw HTML
```

### Security headers (SEC-TC-14)

```bash
curl -sI https://localhost:5173/api/v1/health/live | grep -iE "x-content-type|x-frame|strict-transport|referrer-policy"
# Expected: security headers present
```

---

## 4. Log Inspection

### After running tests, check logs for PII/secrets

```bash
# Check application logs (Docker)
docker compose logs api --tail 100 | grep -iE "password|token|secret|apiKey|authorization"
# Expected: ZERO matches (all should be [REDACTED])

# Check for stack traces in response bodies
docker compose logs api --tail 100 | grep -i "stack"
# Expected: internal logs only, never in HTTP responses

# Check for PII
docker compose logs api --tail 100 | grep -iE "email.*@|phone.*\d{7}"
# Expected: masked or absent
```

---

## 5. Output Template

```markdown
# Security Smoke Test Report

**Date:** YYYY-MM-DD
**Tester:** Tester Agent
**Environment:** <URL>

## Results

| TC-ID | Category | Test | Expected | Actual | Status |
|-------|----------|------|:--------:|:------:|:------:|
| SEC-TC-01 | Auth | No token | 401 | 401 | ✅ |
| SEC-TC-04 | IDOR | Other user's data | 403/404 | 200 😱 | ❌ |
| SEC-TC-07 | Validation | Empty body | 400 | 500 | ❌ |
| SEC-TC-10 | NoSQL | Operator injection | 400 | 200 | ❌ |
| SEC-TC-11 | Error leak | Trigger 500 | No stack | Has stack | ❌ |
| SEC-TC-14 | Headers | Security headers | Present | Missing | ⚠️ |

## Log Inspection
| Check | Result |
|-------|--------|
| Secrets in logs | ✅ Clean |
| Stack traces in logs | ✅ Internal only |
| PII in logs | ⚠️ Email unmasked |

## Summary
| Status | Count |
|--------|:-----:|
| ✅ PASS | X |
| ❌ FAIL | Y |
| ⚠️ WARN | Z |

## Critical Findings
| # | Severity | Finding | Impact | Fix |
|---|----------|---------|--------|-----|
| 1 | 🔴 P0 | IDOR: other user's settings accessible | Data breach | Add ownership check |
| 2 | 🔴 P0 | NoSQL injection: $gt operator not filtered | Data leak | Add input sanitization |

## Verdict
- ✅ SECURE — all security smoke tests pass
- ⚠️ ISSUES — P1 findings to address
- ❌ VULNERABLE — P0 security findings, block release
```

---

## See also
- `$security-review` — deep AppSec review (code level)
- `$security-review-baseline` — quick security checklist
- `$qa-api-contract-tests` — functional API tests
- `$qa-test-plan` — test plan (references this skill)
