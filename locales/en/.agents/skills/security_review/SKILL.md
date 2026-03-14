---
name: security_review
description: AppSec review for endpoints/authorization/input/secrets/sensitive features. Checklist + patterns (OWASP baseline).
---

# Skill: Security Review (AppSec)

Deep code security review: from secrets to injection.

**Sections:**
1. [When to activate](#1-when)
2. [Checklist](#2-checklist)
3. [DO / DON'T Examples](#3-examples)
4. [Automated Scans](#4-automated)
5. [Output Template](#5-output)

---

## 1. When to activate

| Trigger | Depth |
|---------|-------|
| New API endpoint | Full review |
| AuthN/AuthZ changes | Focus: auth section |
| User input / file uploads | Focus: injection, XSS |
| Secrets/credentials touched | Focus: secrets |
| Payments / PII / sensitive data | Full review + GDPR check |
| Third-party integration | Focus: SSRF, secrets, injection |
| Webhook handler | Focus: auth, injection, idempotency |

---

## 2. Checklist

### 2.1 Secrets Management

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-01 | No hardcoded secrets (passwords, API keys, tokens) | 🔴 P0 | ☐ |
| SEC-02 | Secrets in env vars only, `.env.example` committed (no values) | 🔴 P0 | ☐ |
| SEC-03 | pino redact configured for `password`, `token`, `authorization`, `cookie` | 🟠 P1 | ☐ |
| SEC-04 | `.gitignore` includes `.env`, `*.pem`, `*.key` | 🔴 P0 | ☐ |
| SEC-05 | Secrets validated at startup (fail fast if missing) | 🟠 P1 | ☐ |

### 2.2 Input Validation

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-06 | Zod schema on every endpoint (whitelist approach) | 🔴 P0 | ☐ |
| SEC-07 | Validation in middleware, before business logic | 🟠 P1 | ☐ |
| SEC-08 | Error response doesn't expose internals (no Mongoose, no stack) | 🔴 P0 | ☐ |
| SEC-09 | Numeric/string limits enforced (max length, min/max value) | 🟠 P1 | ☐ |

### 2.3 Injection

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-10 | No string concatenation for queries (`Model.find(req.query)` = P0) | 🔴 P0 | ☐ |
| SEC-11 | Safe filter builder for MongoDB (no `$where`, no user `$` operators) | 🔴 P0 | ☐ |
| SEC-12 | No `eval()`, `Function()`, `child_process.exec(userInput)` | 🔴 P0 | ☐ |
| SEC-13 | Mongoose `strictQuery: true` | 🟠 P1 | ☐ |

### 2.4 Auth & AuthZ

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-14 | Auth check on every protected endpoint | 🔴 P0 | ☐ |
| SEC-15 | IDOR prevention: verify ownership before data access | 🔴 P0 | ☐ |
| SEC-16 | Tokens not in localStorage (prefer httpOnly cookies or server-side) | 🟠 P1 | ☐ |
| SEC-17 | JWT expiration enforced, refresh flow defined | 🟠 P1 | ☐ |

### 2.5 XSS & CSP

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-18 | No `dangerouslySetInnerHTML` without DOMPurify | 🔴 P0 | ☐ |
| SEC-19 | User-generated content sanitized before rendering | 🔴 P0 | ☐ |
| SEC-20 | Helmet configured with CSP (if applicable) | 🟠 P1 | ☐ |

### 2.6 CSRF

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-21 | Cookie-based auth: `SameSite=Strict/Lax` | 🟠 P1 | ☐ |
| SEC-22 | CSRF token for state-changing operations (if cookie auth) | 🟠 P1 | ☐ |

### 2.7 Rate Limiting

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-23 | Rate limiting on public endpoints | 🟠 P1 | ☐ |
| SEC-24 | Stricter limits on auth endpoints (login, register) | 🟠 P1 | ☐ |
| SEC-25 | Rate limiting on expensive operations (file upload, search) | 🟡 P2 | ☐ |

### 2.8 Data Exposure

| # | Check | Severity | Status |
|---|-------|----------|--------|
| SEC-26 | No stack trace in production error responses | 🔴 P0 | ☐ |
| SEC-27 | No PII/secrets in logs | 🔴 P0 | ☐ |
| SEC-28 | `.select()` on queries — don't return unnecessary fields | 🟠 P1 | ☐ |
| SEC-29 | Response doesn't include internal IDs unnecessarily | 🟡 P2 | ☐ |

---

## 3. DO / DON'T Examples

### Input Validation

```javascript
// ❌ DON'T: No validation, raw body to DB
router.post('/coupons', async (req, res) => {
  const coupon = await Coupon.create(req.body); // NoSQL injection risk!
  res.json(coupon);
});

// ✅ DO: Zod validation middleware, safe create
router.post('/coupons', validate(createCouponSchema), async (req, res) => {
  const coupon = await couponService.create(req.validated);
  res.status(201).json({ data: coupon });
});
```

### NoSQL Injection

```javascript
// ❌ DON'T: User input directly in query
const user = await User.findOne({ email: req.query.email }); // $gt injection
// Attack: ?email[$gt]= → matches ALL documents

// ✅ DO: Safe filter builder
const email = String(req.query.email); // Force string, strip operators
const user = await User.findOne({ email });
```

### IDOR (Insecure Direct Object Reference)

```javascript
// ❌ DON'T: No ownership check
router.get('/settings/:id', async (req, res) => {
  const settings = await Settings.findById(req.params.id);
  res.json(settings); // Any user can read ANY settings!
});

// ✅ DO: Verify ownership
router.get('/settings/:id', auth, async (req, res) => {
  const settings = await Settings.findOne({
    _id: req.params.id,
    appInstanceId: req.appInstanceId  // Only own data
  });
  if (!settings) return res.status(404).json({ error: { code: 'NOT_FOUND' } });
  res.json({ data: settings });
});
```

### Error Exposure

```javascript
// ❌ DON'T: Expose internals
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,    // Mongoose error with field names
    stack: err.stack,      // Full stack trace!
    query: err.query       // DB query details!
  });
});

// ✅ DO: Safe error handler
app.use((err, req, res, next) => {
  req.log.error({ err, requestId: req.id }, 'Unhandled error');
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' }
  });
});
```

### Secrets in Code

```javascript
// ❌ DON'T
const API_KEY = 'sk-live-abc123xyz';  // Hardcoded!
console.log('Token:', user.refreshToken); // PII in logs!

// ✅ DO
const API_KEY = process.env.WIX_APP_SECRET;
if (!API_KEY) throw new Error('WIX_APP_SECRET is required');
logger.info({ userId: user.id }, 'User authenticated'); // No token
```

---

## 4. Automated Scans

### Grep patterns

```bash
# 🔴 P0 — Immediate action
grep_search: Query="eval("                         → Code injection
grep_search: Query="dangerouslySetInnerHTML"        → XSS risk
grep_search: Query="password.*=.*['\"]"             → Hardcoded secret
grep_search: Query="apiKey.*=.*['\"]"               → Hardcoded secret
grep_search: Query="Model.find(req."               → NoSQL injection
grep_search: Query="child_process"                  → Command injection risk
grep_search: Query="\\$where"                       → MongoDB $where injection

# 🟠 P1 — Review needed
grep_search: Query="console.log"                    → Replace with pino
grep_search: Query="localStorage.setItem.*token"    → Token in storage
grep_search: Query="res.status(500).json.*err"      → Error exposure
grep_search: Query="cors({ origin: '*'"             → Open CORS
```

### CLI commands

```bash
# Dependency audit
npm audit --audit-level=high

# Secret scanning
npx secretlint "**/*"

# Outdated packages
npm outdated
```

---

## 5. Output Template

```markdown
# Security Review Report

**Scope:** <PR/feature/module>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD
**OWASP categories checked:** 8/10

## Findings

| # | Severity | Category | File:Line | Finding | Fix |
|---|----------|----------|-----------|---------|-----|
| 1 | 🔴 P0 | Injection | `routes/settings.js:32` | Raw `req.body` passed to `Model.create()` | Add Zod validation middleware |
| 2 | 🔴 P0 | IDOR | `controllers/coupon.js:18` | No ownership check on DELETE | Verify `appInstanceId` match |
| 3 | 🟠 P1 | Headers | `server.js` | No Helmet middleware | Add `app.use(helmet())` |

## Automated Scan Results
| Scan | Result |
|------|--------|
| npm audit | ✅ No high/critical |
| secretlint | ✅ Clean |
| grep: eval/exec | ✅ Clean |
| grep: hardcoded secrets | ⚠️ 1 finding (SEC-01) |

## Checklist Summary
- P0: X findings (must fix)
- P1: Y findings (should fix)
- P2: Z findings (optional)

## Security Test Recommendations
- [ ] Test: invalid input → 400 (not 500)
- [ ] Test: wrong appInstanceId → 403
- [ ] Test: duplicate create → 409
- [ ] Test: missing auth → 401

## Verdict
- ✅ SECURE — no P0/P1
- ⚠️ CONDITIONAL — fix P0 before merge
- ❌ BLOCKED — critical vulnerabilities found
```

---

## See also
- `$security_baseline_dev` — implementation patterns (Zod, Helmet, safe filter)
- `$threat_model_baseline` — architecture-level threat model
- `$code_review_checklist` — general code review
- `$review_reference_snippets` — more DO/DON'T examples