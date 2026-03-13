---
name: observability_logging
description: Implementation observability on levelnot code — structured logs (pino), request_id/trace_id correlation, levels logs, ban leaks PII/secrets, basic metrics, health checks. DO/DON'T examples. Activate with setup logging, add metrics, or with questions «how correctly log».
---

#Skill: Observability (Implementation)

Concrete DO/DON'T patterns for logging, metrics, and tracing at the code level.

**Sections:**
1. [Logger Setup (pino)](#1-logger-setup)
2. [Levels logs](#2-level)
3. [Request Correlation](#3-request-correlation)
4. [Structured logs](#4-structured)
5. [PII/Secrets Redaction](#5-redaction)
6. [Metrics](#6-metrics)
7. [Health Checks](#7-health-checks)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Logger Setup

### ✅ DO: pino — quick structured JSON logger

```js
// utils/logger.js
import pino from 'pino';
import { config } from '../config/env.js';

/**
 * Creates structured JSON logger.
 * Production: JSON output (for LogDNA/Datadog/ELK).
 * Development: pretty-print for the console.
 */
export const logger = pino({
  level: config.LOG_LEVEL || 'info',

  // ? Automatic filtering of sensitive data
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      '*.password',
      '*.token',
      '*.secret',
      '*.apiKey',
      '*.creditCard',
    ],
    censor: '[REDACTED]',
  },

  // ✅ Standard fields
  base: {
    service: config.SERVICE_NAME || 'smart-cart-rescue',
    env: config.NODE_ENV,
  },

  // ✅ ISO timestamp instead of epoch
  timestamp: pino.stdTimeFunctions.isoTime,

  // Pretty print in dev (via transport, not in productionuction)
  ...(config.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname',
      },
    },
  }),
});
```

### Why pino, and not winston/console.log?

| Criterion | pino | winston | console.log |
|---------|------|---------|------------|
| **Speed** | ~5x faster | Standard | N/A |
| **JSON output** | Native | Via transport | No |
| **Redaction** | Embedded | Plugin | No |
| **Child loggers** | ✅ | ✅ | No |
| **Async** | ✅ (not blocks event loop) | ⚠️ | Blocks |
| **Production** | ✅ | ✅ | ❌ |

---

## 2. Levels logs

### When which level

| Level | When | Example |
|---------|-------|--------|
| **fatal** | Application cannot continue working | DB connection failed, port occupied |
| **error** | Operation failed, reaction needed | Payment failed, external API 500 |
| **warn** | Something unexpected, but recoverable | Rate limit approaching, deprecated API used |
| **info** | Important business events | User created, order completed, server started |
| **debug** | Details for debugging | SQL query, cache hit/miss, request payload |
| **trace** | Maximum detail | Function entry/exit, intermediate values |

### ✅ DO: correct choice level

```js
// ✅ fatal — app cannot continue
logger.fatal({ err }, 'Database connection failed, shutting down');
process.exit(1);

// ✅ error — operation failed
logger.error({ err, orderId }, 'Payment processing failed');

// ✅ warn — unexpected but handled
logger.warn({ userId, attempts }, 'Login rate limit approaching');

// ✅ info — business event
logger.info({ couponId, code }, 'Coupon created');
logger.info({ port }, 'Server started');

// ✅ debug — developer detail
logger.debug({ query, params, durationMs }, 'DB query executed');
logger.debug({ cacheKey, hit: true }, 'Cache hit');
```

### ? DON'T: wrong levels

```js
// ? error for expected situations
logger.error('User not found'); // this 404, not error — use warn or info

// ❌ info for each debug
logger.info({ fullPayload: req.body }); // noise in productionuction

// ❌ console.log in production
console.log('processing order...'); // not structured, blocks, no level
```

### Log levels by environment

| Environment | Level | Reason |
|-------|---------|---------|
| **Production** | `info` | Business events + errors |
| **Staging** | `debug` | Debugging without overload |
| **Development** | `debug` or `trace` | Everything visible |
| **Test** | `silent` or `warn` | Do not pollute test output |

---

## 3. Request Correlation

### ✅ DO: request ID middleware + child logger

```js
// middleware/requestId.js
import { randomUUID } from 'node:crypto';

/**
 * Adds request ID and child logger to each request.
 * @param {pino.Logger} logger - root logger.
 */
export function requestIdMiddleware(logger) {
  return (req, _res, next) => {
    req.id = req.headers['x-request-id'] || randomUUID();

    // ✅ Child logger with request context — all logs automatically include requestId
    req.log = logger.child({ requestId: req.id });

    next();
  };
}

// Usage in controller:
async function createCoupon(req, res) {
  req.log.info({ code: req.body.code }, 'Creating coupon');

  const coupon = await couponService.create(req.body);

  req.log.info({ couponId: coupon.id }, 'Coupon created');
  res.status(201).json(coupon);
}

// Output:
// {"level":"info","time":"...","requestId":"abc-123","code":"SAVE20","msg":"Creating coupon"}
// {"level":"info","time":"...","requestId":"abc-123","couponId":"c-1","msg":"Coupon created"}
// ← requestId automatically in all logs request!
```

### ✅ DO: correlation across services (distributed tracing)

```js
// ? Pass trace_id through when calling external services
async function callPaymentService(orderId, requestId) {
  return fetch('https://payments.example.com/charge', {
    headers: {
      'X-Request-ID': requestId,          // ✅ that same ID
      'X-Trace-ID': requestId,            // ✅ for distributed tracing
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId }),
  });
}
```

---

## 4. Structured logs

### ? DO: JSON format with context fields

```js
// ✅ Structured — easily parse, filter, build dashboards
logger.info({
  event: 'coupon_applied',
  couponId: 'c-123',
  orderId: 'o-456',
  discount: 20,
  type: 'percent',
  durationMs: 45,
}, 'Coupon applied to order');

// Output (JSON):
// {
//   "level": "info",
//   "time": "2026-03-13T03:00:00.000Z",
//   "service": "smart-cart-rescue",
//   "event": "coupon_applied",
//   "couponId": "c-123",
//   "orderId": "o-456",
//   "discount": 20,
//   "type": "percent",
//   "durationMs": 45,
//   "msg": "Coupon applied to order"
// }
```

### ? DON'T: string logs

```js
// ❌ Impossible parse, filter, build metrics
logger.info(`Coupon ${couponId} applied to order ${orderId} with ${discount}% discount`);

// ❌ Concatenation — if couponId contains special characters → breaks
console.log('Processing order: ' + JSON.stringify(order)); // ❌
```

### ✅ DO: standard fields for logs

```js
// Recommended fields for consistency:
{
  // Automatic (pino)
  "level": "info",
  "time": "...",
  "service": "smart-cart-rescue",
  "env": "production",

  // Request context
  "requestId": "abc-123",
  "method": "POST",
  "url": "/api/coupons",
  "status": 201,
  "durationMs": 45,

  // Business context
  "event": "coupon_created",     // machine-readable event name
  "userId": "u-789",
  "couponId": "c-123",

  // Error context (only for errors)
  "err": {
    "message": "...",
    "stack": "...",
    "type": "ValidationError"
  },

  // Message (human-readable)
  "msg": "Coupon created successfully"
}
```

---

## 5. Redaction

### ✅ DO: automatic filtering PII/secrets

```js
// Via pino redact (setup in section 1)
const logger = pino({
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      '*.password',
      '*.token',
      '*.secret',
      '*.apiKey',
      '*.ssn',
      '*.creditCard',
      '*.cardNumber',
      '*.cvv',
    ],
    censor: '[REDACTED]',
  },
});

// Examples:
logger.info({ user: { email: 'a@b.com', password: '123' } });
// Output: { user: { email: 'a@b.com', password: '[REDACTED]' } }
```

### ✅ DO: manual sanitizer for complex cases

```js
/**
 * Masks email for logs: a****@example.com
 * @param {string} email
 * @returns {string}
 */
function maskEmail(email) {
  const [local, domain] = email.split('@');
  return `${local[0]}${'*'.repeat(Math.min(local.length - 1, 4))}@${domain}`;
}

/**
 * Masks a card number: **** **** **** 1234
 * @param {string} cardNumber
 * @returns {string}
 */
function maskCard(cardNumber) {
  return `**** **** **** ${cardNumber.slice(-4)}`;
}

// Usage:
logger.info({ email: maskEmail(user.email) }, 'User logged in');
```

---

## 6. Metrics

### ✅ DO: basic metrics for API

```js
// middleware/metrics.js

/**
 * Middleware for measuring latency and error rate.
 * @param {pino.Logger} logger
 */
export function metricsMiddleware(logger) {
  return (req, res, next) => {
    const start = performance.now();

    res.on('finish', () => {
      const durationMs = Math.round(performance.now() - start);

      // ? Structured log with metrics ? dashboards can be built
      logger.info({
        event: 'http_request',
        method: req.method,
        url: req.route?.path ?? req.originalUrl,
        status: res.statusCode,
        durationMs,
        requestId: req.id,
      });

      // ? Warn on slow requests
      if (durationMs > 2000) {
        logger.warn({
          event: 'slow_request',
          method: req.method,
          url: req.originalUrl,
          durationMs,
        }, 'Slow request detected');
      }
    });

    next();
  };
}
```

### ✅ DO: prom-client for Prometheus (if needed)

```js
import { Registry, Counter, Histogram, collectDefaultMetrics } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

// HTTP request counter
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// HTTP request duration
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register],
});

// Metrics endpoint
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### Key metrics

| Metric | Type | Why |
|---------|-----|-------|
| **Request rate** | Counter | Load |
| **Error rate** | Counter (status >= 400) | Health |
| **Latency (p50, p95, p99)** | Histogram | Performance |
| **Active connections** | Gauge | Capacity |
| **DB query duration** | Histogram | Bottlenecks |
| **Cache hit ratio** | Counter (hit/miss) | Cache efficiency |

---

## 7. Health Checks

### ✅ DO: liveness + readiness endpoints

```js
// ? Liveness ? application is alive?
app.get('/health/live', (_req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Readiness — ready handle requests? (DB connected, cache warm)
app.get('/health/ready', async (_req, res) => {
  try {
    // Verify all dependencies
    await db.command({ ping: 1 });

    res.json({
      status: 'ok',
      checks: {
        database: 'connected',
        uptime: process.uptime(),
      },
    });
  } catch (err) {
    logger.error({ err }, 'Readiness check failed');
    res.status(503).json({
      status: 'unhealthy',
      checks: { database: 'disconnected' },
    });
  }
});
```

---

## 8. Anti-patterns

| ❌ Anti-pattern | ✅ Decision |
|----------------|-----------|
| `console.log` in production | pino structured logger |
| String interpolation in logs | JSON structured fields |
| PII/secrets in logs | pino `redact` + manual masking |
| `logger.error` for 404 | info/warn for expected events |
| No request ID | requestId middleware + child logger |
| `logger.info(JSON.stringify(obj))` | `logger.info(obj, 'message')` |
| Log level `debug` in production | `info` in prod, `debug` in staging |
| No health check | `/health/live` + `/health/ready` |
| Metrics via log parsing | Prometheus counters/histograms |
| Logging all payload | Log ID + event, not entire payload |

---

## Short cheat sheet

| Task | Decision |
|--------|---------|
| Setup logger | `pino` + redact + pino-pretty (dev) |
| Request correlation | `req.id` + `logger.child({ requestId })` |
| Log format | JSON structured (fields + msg) |
| Redact PII | `pino.redact.paths` |
| Log levels | fatal > error > warn > info > debug > trace |
| Metrics | prom-client or structured logs |
| Health | `/health/live` + `/health/ready` |
| Slow requests | Warn if durationMs > threshold |

---

## See also
- `$security_baseline_dev` — PII/secrets in logs
- `$node_express_beast_practices` — middleware pipeline, request logging
- `$observability_plan` — architectural plan observability
- `$observability_review` — review observability implementation
