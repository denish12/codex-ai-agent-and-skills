---
name: observability-review
description: Ревью наблюдаемости — структурированные логи, request_id/trace_id, уровни логов, запрет утечек PII/секретов, соответствие Observability Plan.
---

# Skill: Observability Review

Ревью реализации наблюдаемости: логи, метрики, корреляция, соответствие плану.

**Разделы:**
1. [Checklist](#1-checklist)
2. [DO / DON'T Examples](#2-examples)
3. [Automated Detection](#3-detection)
4. [Pino Config Review](#4-pino)
5. [Output Template](#5-output)

---

## 1. Checklist

### 1.1 Structured Logging

| # | Check | Severity | Status |
|---|-------|----------|--------|
| OBS-01 | All logs are structured JSON (pino), no `console.log` | 🟠 P1 | ☐ |
| OBS-02 | Log messages are constants (event names), not concatenated strings | 🟠 P1 | ☐ |
| OBS-03 | Context fields as object properties, not in message string | 🟠 P1 | ☐ |
| OBS-04 | Child loggers used for request scope (`req.log`) | 🟠 P1 | ☐ |

### 1.2 Correlation

| # | Check | Severity | Status |
|---|-------|----------|--------|
| OBS-05 | `requestId` present on all request-scoped logs | 🟠 P1 | ☐ |
| OBS-06 | `requestId` generated from `X-Request-ID` header or UUID | 🟡 P2 | ☐ |
| OBS-07 | `requestId` propagated to external API calls | 🟡 P2 | ☐ |

### 1.3 Log Levels

| # | Check | Severity | Status |
|---|-------|----------|--------|
| OBS-08 | `error` only for real errors (not validation failures, not 404) | 🟠 P1 | ☐ |
| OBS-09 | `warn` for expected but noteworthy (rate limit, deprecated usage) | 🟡 P2 | ☐ |
| OBS-10 | `info` for business events (create, update, delete, auth) | 🟠 P1 | ☐ |
| OBS-11 | `debug` only in development (not in production log level) | 🟠 P1 | ☐ |

### 1.4 PII & Secrets

| # | Check | Severity | Status |
|---|-------|----------|--------|
| OBS-12 | No passwords, tokens, API keys in logs | 🔴 P0 | ☐ |
| OBS-13 | No email/phone without masking | 🔴 P0 | ☐ |
| OBS-14 | No `req.headers` or `req.body` logged without filtering | 🔴 P0 | ☐ |
| OBS-15 | pino `redact` configured for sensitive paths | 🟠 P1 | ☐ |

### 1.5 Business Events

| # | Check | Severity | Status |
|---|-------|----------|--------|
| OBS-16 | Critical operations have audit logs (install, settings change, coupon CRUD) | 🟠 P1 | ☐ |
| OBS-17 | Health endpoints exist (`/health/live`, `/health/ready`) | 🟠 P1 | ☐ |
| OBS-18 | Error responses logged with context (but not PII) | 🟠 P1 | ☐ |

---

## 2. DO / DON'T Examples

### Structured vs Unstructured

```javascript
// ❌ DON'T: Unstructured string logging
console.log('User ' + userId + ' created coupon ' + couponId + ' at ' + new Date());
console.log(`Error: ${err.message}`);

// ✅ DO: Structured JSON logging
logger.info({ userId, couponId }, 'coupon_created');
logger.error({ err, requestId: req.id }, 'coupon_create_failed');
```

### Context in Fields vs Message

```javascript
// ❌ DON'T: Context baked into message string
logger.info(`Processing webhook for appInstanceId=${appId} from ${siteUrl}`);

// ✅ DO: Context as object properties (searchable, filterable)
logger.info({ appInstanceId: appId, siteUrl }, 'webhook_processing');
```

### Correct Log Levels

```javascript
// ❌ DON'T: Error level for non-errors
logger.error('Coupon not found');        // 404 is not an error
logger.error('Validation failed');       // 400 is not an error

// ✅ DO: Correct levels
logger.warn({ code: couponCode }, 'coupon_not_found');     // Expected case
logger.warn({ fields: errors }, 'validation_failed');      // Expected case
logger.error({ err, requestId }, 'unhandled_error');       // Real error
```

### PII in Logs

```javascript
// ❌ DON'T: Log full request
logger.info({ headers: req.headers, body: req.body }, 'request_received');
//           ^^^ authorization header!   ^^^ passwords/tokens!

// ✅ DO: Allowlist safe fields
logger.info({
  requestId: req.id,
  method: req.method,
  url: req.url,
  status: res.statusCode,
  durationMs: Date.now() - start
}, 'http_request');
```

### Child Logger

```javascript
// ❌ DON'T: Pass requestId manually everywhere
logger.info({ requestId: req.id, userId }, 'settings_updated');
logger.info({ requestId: req.id, couponId }, 'coupon_created');

// ✅ DO: Create child logger once, use everywhere in request
// In middleware:
req.log = logger.child({ requestId: req.id });
// In handler:
req.log.info({ userId }, 'settings_updated');
req.log.info({ couponId }, 'coupon_created');
// requestId is automatically included!
```

---

## 3. Automated Detection

### Grep patterns

```bash
# 🟠 P1: Unstructured logging
grep_search: Query="console.log"     → Replace with pino logger
grep_search: Query="console.error"   → Replace with logger.error
grep_search: Query="console.warn"    → Replace with logger.warn
grep_search: Query="console.info"    → Replace with logger.info

# 🔴 P0: PII/secrets in logs
grep_search: Query="req.headers" Includes=["*.js"]    → Check: not logging auth header?
grep_search: Query="req.body" Includes=["*.js"]       → Check: not logging passwords?
grep_search: Query="password" Includes=["*.js"]       → Check: not in log context
grep_search: Query="token" Includes=["*.js"]          → Check: not in log context

# 🟠 P1: Wrong log level
grep_search: Query="logger.error.*not.found"         → Should be warn
grep_search: Query="logger.error.*validat"           → Should be warn
grep_search: Query="logger.error.*404"               → Should be warn

# 🟠 P1: Missing correlation
grep_search: Query="logger.info" Includes=["*/routes/*","*/controllers/*"]  → Check: has requestId?
```

---

## 4. Pino Config Review

### Expected pino configuration

```javascript
// ✅ Correct pino setup
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: [
      'password',
      'token',
      'authorization',
      'cookie',
      'req.headers.authorization',
      'req.headers.cookie',
      '*.password',
      '*.token',
      '*.secret',
      '*.apiKey',
      '*.refreshToken'
    ],
    censor: '[REDACTED]'
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res
  }
});
```

### Config checks

| Check | Expected | grep pattern |
|-------|----------|-------------|
| Level from env | `process.env.LOG_LEVEL` | `grep "LOG_LEVEL"` |
| Redact configured | `redact: { paths: [...] }` | `grep "redact"` |
| password redacted | `'password'` in paths | `grep "password.*redact"` |
| authorization redacted | `'authorization'` in paths | `grep "authorization.*redact"` |
| Serializers set | `pino.stdSerializers` | `grep "stdSerializers"` |

---

## 5. Output Template

```markdown
# Observability Review Report

**Scope:** <PR/module>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD

## Findings

| # | Severity | Check | File:Line | Finding | Fix |
|---|----------|-------|-----------|---------|-----|
| 1 | 🔴 P0 | OBS-12 | `routes/webhook.js:15` | `req.body` logged with tokens | Use allowlist fields |
| 2 | 🟠 P1 | OBS-01 | `services/coupon.js:42` | `console.log()` used | Replace with `req.log.info()` |
| 3 | 🟠 P1 | OBS-08 | `controllers/settings.js:60` | `logger.error('Not found')` | Change to `logger.warn()` |

## Pino Config
| Check | Status |
|-------|--------|
| Level from env | ✅ |
| Redact: password | ✅ |
| Redact: authorization | ⚠️ Missing |
| Serializers | ✅ |

## Compliance with Observability Plan
| Event | Expected | Implemented | Status |
|-------|----------|-------------|--------|
| server_started | info | ✅ | Pass |
| http_request | info + requestId | ⚠️ no requestId | Fix |
| coupon_created | info + couponId | ✅ | Pass |

## Verdict
- ✅ COMPLIANT — observability plan fully implemented
- ⚠️ GAPS — partial implementation, P1 items to fix
- ❌ NON-COMPLIANT — critical gaps (PII exposure, no correlation)
```

---

## См. также
- `$observability-plan` — what to log/measure/alert
- `$observability-logging` — implementation patterns (pino setup, middleware)
- `$review-reference-snippets` — DO/DON'T snippets (section N, O)
- `$code-review-checklist` — general review (observability section)