---
name: observability-logging
description: Реализация наблюдаемости на уровне кода — структурированные логи (pino), request_id/trace_id корреляция, уровни логов, запрет утечки PII/секретов, базовые метрики, health checks. DO/DON'T примеры. Активируй при настройке логирования, добавлении метрик, или при вопросах «как правильно логировать».
---

# Skill: Observability (Implementation)

Конкретные DO/DON'T паттерны для логирования, метрик и трейсинга на уровне кода.

**Разделы:**
1. [Logger Setup (pino)](#1-logger-setup)
2. [Уровни логов](#2-уровни-логов)
3. [Request Correlation](#3-request-correlation)
4. [Структурированные логи](#4-структурированные-логи)
5. [PII/Secrets Redaction](#5-redaction)
6. [Метрики](#6-метрики)
7. [Health Checks](#7-health-checks)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Logger Setup

### ✅ DO: pino — быстрый structured JSON logger

```js
// utils/logger.js
import pino from 'pino';
import { config } from '../config/env.js';

/**
 * Создаёт структурированный JSON logger.
 * Production: JSON output (для LogDNA/Datadog/ELK).
 * Development: pretty-print для консоли.
 */
export const logger = pino({
  level: config.LOG_LEVEL || 'info',

  // ✅ Автоматическая фильтрация чувствительных данных
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

  // ✅ Стандартные поля
  base: {
    service: config.SERVICE_NAME || 'smart-cart-rescue',
    env: config.NODE_ENV,
  },

  // ✅ ISO timestamp вместо epoch
  timestamp: pino.stdTimeFunctions.isoTime,

  // Pretty print в dev (через transport, не в production)
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

### Зачем pino, а не winston/console.log?

| Критерий | pino | winston | console.log |
|---------|------|---------|------------|
| **Скорость** | ~5x faster | Стандарт | N/A |
| **JSON output** | Нативный | Через transport | Нет |
| **Redaction** | Встроенный | Плагин | Нет |
| **Child loggers** | ✅ | ✅ | Нет |
| **Async** | ✅ (не блокирует event loop) | ⚠️ | Блокирует |
| **Production** | ✅ | ✅ | ❌ |

---

## 2. Уровни логов

### Когда какой уровень

| Уровень | Когда | Пример |
|---------|-------|--------|
| **fatal** | Приложение не может продолжить работу | DB connection failed, port occupied |
| **error** | Операция провалилась, нужна реакция | Payment failed, external API 500 |
| **warn** | Что-то неожиданное, но recoverable | Rate limit approaching, deprecated API used |
| **info** | Важные бизнес-события | User created, order completed, server started |
| **debug** | Детали для отладки | SQL query, cache hit/miss, request payload |
| **trace** | Максимальная детализация | Function entry/exit, intermediate values |

### ✅ DO: правильный выбор уровня

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

### ❌ DON'T: неправильные уровни

```js
// ❌ error для ожидаемых ситуаций
logger.error('User not found'); // это 404, не error — используй warn или info

// ❌ info для каждого debug
logger.info({ fullPayload: req.body }); // шум в production

// ❌ console.log в production
console.log('processing order...'); // не structured, блокирует, нет уровня
```

### Log levels по средам

| Среда | Уровень | Причина |
|-------|---------|---------|
| **Production** | `info` | Бизнес-события + ошибки |
| **Staging** | `debug` | Отладка без перегрузки |
| **Development** | `debug` или `trace` | Всё видно |
| **Test** | `silent` или `warn` | Не засорять test output |

---

## 3. Request Correlation

### ✅ DO: request ID middleware + child logger

```js
// middleware/requestId.js
import { randomUUID } from 'node:crypto';

/**
 * Добавляет request ID и child logger к каждому запросу.
 * @param {pino.Logger} logger - root logger.
 */
export function requestIdMiddleware(logger) {
  return (req, _res, next) => {
    req.id = req.headers['x-request-id'] || randomUUID();

    // ✅ Child logger с request context — все логи автоматически включают requestId
    req.log = logger.child({ requestId: req.id });

    next();
  };
}

// Использование в controller:
async function createCoupon(req, res) {
  req.log.info({ code: req.body.code }, 'Creating coupon');

  const coupon = await couponService.create(req.body);

  req.log.info({ couponId: coupon.id }, 'Coupon created');
  res.status(201).json(coupon);
}

// Output:
// {"level":"info","time":"...","requestId":"abc-123","code":"SAVE20","msg":"Creating coupon"}
// {"level":"info","time":"...","requestId":"abc-123","couponId":"c-1","msg":"Coupon created"}
// ← requestId автоматически во всех логах запроса!
```

### ✅ DO: correlation across services (distributed tracing)

```js
// ✅ Пробрасывать trace_id при вызове внешних сервисов
async function callPaymentService(orderId, requestId) {
  return fetch('https://payments.example.com/charge', {
    headers: {
      'X-Request-ID': requestId,          // ✅ тот же ID
      'X-Trace-ID': requestId,            // ✅ для distributed tracing
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId }),
  });
}
```

---

## 4. Структурированные логи

### ✅ DO: JSON формат с контекстными полями

```js
// ✅ Structured — легко парсить, фильтровать, строить дашборды
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

### ❌ DON'T: строковые логи

```js
// ❌ Невозможно парсить, фильтровать, строить метрики
logger.info(`Coupon ${couponId} applied to order ${orderId} with ${discount}% discount`);

// ❌ Конкатенация — если couponId содержит спецсимволы → ломается
console.log('Processing order: ' + JSON.stringify(order)); // ❌
```

### ✅ DO: стандартные поля для логов

```js
// Рекомендуемые поля для единообразия:
{
  // Автоматические (pino)
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

### ✅ DO: автоматическая фильтрация PII/secrets

```js
// Через pino redact (настройка в section 1)
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

// Примеры:
logger.info({ user: { email: 'a@b.com', password: '123' } });
// Output: { user: { email: 'a@b.com', password: '[REDACTED]' } }
```

### ✅ DO: ручной sanitizer для сложных случаев

```js
/**
 * Маскирует email для логов: a****@example.com
 * @param {string} email
 * @returns {string}
 */
function maskEmail(email) {
  const [local, domain] = email.split('@');
  return `${local[0]}${'*'.repeat(Math.min(local.length - 1, 4))}@${domain}`;
}

/**
 * Маскирует номер карты: **** **** **** 1234
 * @param {string} cardNumber
 * @returns {string}
 */
function maskCard(cardNumber) {
  return `**** **** **** ${cardNumber.slice(-4)}`;
}

// Использование:
logger.info({ email: maskEmail(user.email) }, 'User logged in');
```

---

## 6. Метрики

### ✅ DO: базовые метрики для API

```js
// middleware/metrics.js

/**
 * Middleware для измерения latency и error rate.
 * @param {pino.Logger} logger
 */
export function metricsMiddleware(logger) {
  return (req, res, next) => {
    const start = performance.now();

    res.on('finish', () => {
      const durationMs = Math.round(performance.now() - start);

      // ✅ Structured log с метриками — можно строить дашборды
      logger.info({
        event: 'http_request',
        method: req.method,
        url: req.route?.path ?? req.originalUrl,
        status: res.statusCode,
        durationMs,
        requestId: req.id,
      });

      // ✅ Warn для медленных запросов
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

### ✅ DO: prom-client для Prometheus (если нужно)

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

### Ключевые метрики

| Метрика | Тип | Зачем |
|---------|-----|-------|
| **Request rate** | Counter | Нагрузка |
| **Error rate** | Counter (status >= 400) | Здоровье |
| **Latency (p50, p95, p99)** | Histogram | Производительность |
| **Active connections** | Gauge | Капасити |
| **DB query duration** | Histogram | Bottlenecks |
| **Cache hit ratio** | Counter (hit/miss) | Эффективность кэша |

---

## 7. Health Checks

### ✅ DO: liveness + readiness endpoints

```js
// ✅ Liveness — приложение живо?
app.get('/health/live', (_req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Readiness — готово обрабатывать запросы? (DB connected, cache warm)
app.get('/health/ready', async (_req, res) => {
  try {
    // Проверяем все зависимости
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

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| `console.log` в production | pino structured logger |
| String interpolation в логах | JSON structured fields |
| PII/secrets в логах | pino `redact` + manual masking |
| `logger.error` для 404 | info/warn для ожидаемых событий |
| Нет request ID | requestId middleware + child logger |
| `logger.info(JSON.stringify(obj))` | `logger.info(obj, 'message')` |
| Log level `debug` в production | `info` в prod, `debug` в staging |
| Нет health check | `/health/live` + `/health/ready` |
| Метрики через логи-парсинг | Prometheus counters/histograms |
| Логирование всего payload | Логировать ID + event, не весь payload |

---

## Краткая шпаргалка

| Задача | Решение |
|--------|---------|
| Setup logger | `pino` + redact + pino-pretty (dev) |
| Request correlation | `req.id` + `logger.child({ requestId })` |
| Log format | JSON structured (fields + msg) |
| Redact PII | `pino.redact.paths` |
| Log levels | fatal > error > warn > info > debug > trace |
| Metrics | prom-client или structured logs |
| Health | `/health/live` + `/health/ready` |
| Slow requests | Warn if durationMs > threshold |

---

## См. также
- `$security-baseline-dev` — PII/secrets в логах
- `$node-express-beast-practices` — middleware pipeline, request logging
- `$observability-plan` — архитектурный план наблюдаемости
- `$observability-review` — ревью observability реализации
