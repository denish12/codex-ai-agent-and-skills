---
name: node_express_beast_practices
description: Node.js + Express — REST API, middleware pipeline, сервисный слой, репозитории, централизованная обработка ошибок, валидация (Zod), graceful shutdown, health checks, security headers. Активируй при написании API, рефакторинге Express-приложений, или при вопросах «как правильно организовать backend на Express».
---

# Skill: Node/Express Beast Practices

Конкретные DO/DON'T паттерны для Express API — от архитектуры до graceful shutdown.

**Разделы:**
1. [Архитектура: слои](#1-архитектура)
2. [App Factory](#2-app-factory)
3. [Router + Controller](#3-router--controller)
4. [Middleware Pipeline](#4-middleware-pipeline)
5. [Централизованная обработка ошибок](#5-обработка-ошибок)
6. [Валидация (Zod)](#6-валидация)
7. [Service + Repository](#7-service--repository)
8. [Graceful Shutdown и Health Checks](#8-graceful-shutdown)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. Архитектура

```
src/
├── app.js                  # Express app factory (no listen)
├── server.js               # HTTP server + graceful shutdown
├── config/
│   └── env.js              # Env validation + export
├── middleware/
│   ├── errorHandler.js     # Centralized error handler
│   ├── requestId.js        # x-request-id injection
│   ├── validate.js         # Zod validation middleware
│   └── auth.js             # Auth middleware
├── routes/
│   ├── index.js            # Router aggregation
│   ├── coupons.router.js
│   └── templates.router.js
├── controllers/
│   ├── coupons.controller.js
│   └── templates.controller.js
├── services/
│   ├── coupon.service.js   # Business logic
│   └── template.service.js
├── repositories/
│   ├── coupon.repo.js      # Data access
│   └── template.repo.js
├── errors/
│   └── AppError.js         # Custom error classes
└── utils/
    └── asyncHandler.js     # Async wrapper
```

### Слои и ответственность

| Слой | Отвечает за | НЕ делает |
|------|-----------|----------|
| **Router** | URL → Controller mapping | Бизнес-логику |
| **Controller** | Парсинг req → вызов service → формирование res | SQL/DB, валидацию |
| **Middleware** | Кросс-сечения (auth, logging, rate limit) | Бизнес-логику |
| **Service** | Бизнес-логика, оркестрация | Работу с req/res |
| **Repository** | Доступ к данным (DB, API) | Бизнес-логику |

---

## 2. App Factory

### ✅ DO: app отдельно от server (тестируемость)

```js
// app.js — чистый Express app, без listen()
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler } from './middleware/errorHandler.js';
import { routes } from './routes/index.js';

/**
 * Создаёт и конфигурирует Express приложение.
 * @param {{ db: object, logger: object }} deps - зависимости.
 * @returns {express.Express} сконфигурированное приложение.
 */
export function createApp(deps) {
  const app = express();

  // ── Security ──
  app.use(helmet());
  app.use(cors({ origin: deps.config?.corsOrigin ?? '*' }));

  // ── Parsing ──
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false }));

  // ── Compression ──
  app.use(compression());

  // ── Request ID ──
  app.use(requestIdMiddleware);

  // ── Routes ──
  app.use('/api', routes(deps));

  // ── Health ──
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // ── 404 ──
  app.use((_req, _res, next) => {
    next(new AppError('Route not found', 404));
  });

  // ── Error Handler (MUST be last) ──
  app.use(errorHandler(deps.logger));

  return app;
}
```

```js
// server.js — HTTP сервер + graceful shutdown
import { createApp } from './app.js';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';
import { connectDb } from './db/connection.js';

async function main() {
  const db = await connectDb(config.databaseUrl);
  const app = createApp({ db, logger, config });

  const server = app.listen(config.port, () => {
    logger.info({ port: config.port }, 'Server started');
  });

  // Graceful shutdown (see section 8)
  setupGracefulShutdown(server, db);
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
```

---

## 3. Router + Controller

### ✅ DO: тонкие контроллеры, бизнес-логика в service

```js
// routes/coupons.router.js
import { Router } from 'express';
import { CouponController } from '../controllers/coupons.controller.js';
import { validate } from '../middleware/validate.js';
import { createCouponSchema, updateCouponSchema } from '../schemas/coupon.schema.js';

/**
 * Роутер для купонов.
 * @param {{ db: object }} deps - зависимости.
 * @returns {Router} Express router.
 */
export function couponRouter(deps) {
  const router = Router();
  const ctrl = new CouponController(deps);

  router.get('/',        ctrl.list);
  router.get('/:id',     ctrl.getById);
  router.post('/',       validate(createCouponSchema), ctrl.create);
  router.patch('/:id',   validate(updateCouponSchema), ctrl.update);
  router.delete('/:id',  ctrl.remove);

  return router;
}
```

```js
// controllers/coupons.controller.js
import { asyncHandler } from '../utils/asyncHandler.js';
import { CouponService } from '../services/coupon.service.js';

export class CouponController {
  #service;

  /**
   * @param {{ db: object }} deps - зависимости.
   */
  constructor(deps) {
    this.#service = new CouponService(deps);
  }

  /**
   * Возвращает список купонов.
   * GET /api/coupons
   */
  list = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const result = await this.#service.list({ page: +page, limit: +limit });
    res.json(result);
  });

  /**
   * Возвращает купон по ID.
   * GET /api/coupons/:id
   */
  getById = asyncHandler(async (req, res) => {
    const coupon = await this.#service.getById(req.params.id);
    res.json(coupon);
  });

  /**
   * Создаёт новый купон.
   * POST /api/coupons
   */
  create = asyncHandler(async (req, res) => {
    const coupon = await this.#service.create(req.body);
    res.status(201).json(coupon);
  });

  /**
   * Обновляет купон.
   * PATCH /api/coupons/:id
   */
  update = asyncHandler(async (req, res) => {
    const coupon = await this.#service.update(req.params.id, req.body);
    res.json(coupon);
  });

  /**
   * Удаляет купон.
   * DELETE /api/coupons/:id
   */
  remove = asyncHandler(async (req, res) => {
    await this.#service.remove(req.params.id);
    res.status(204).end();
  });
}
```

### ✅ DO: asyncHandler для автоматического перехвата ошибок

```js
// utils/asyncHandler.js

/**
 * Оборачивает async controller в try/catch, передавая ошибку в next().
 * @param {Function} fn - async route handler.
 * @returns {Function} Express middleware.
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
```

---

## 4. Middleware Pipeline

### Порядок middleware (критически важен)

```
1. helmet()              — Security headers
2. cors()                — CORS
3. express.json()        — Body parsing
4. compression()         — Response compression
5. requestIdMiddleware   — x-request-id
6. requestLogMiddleware  — Access logging
7. rateLimiter           — Rate limiting
8. authMiddleware        — Authentication (route-level)
9. validate(schema)      — Input validation (route-level)
10. controller           — Business logic
11. 404 handler          — Not found
12. errorHandler         — Centralized error (MUST BE LAST)
```

### ✅ DO: request ID middleware

```js
// middleware/requestId.js
import { randomUUID } from 'node:crypto';

/**
 * Добавляет request ID к каждому запросу для корреляции логов.
 */
export function requestIdMiddleware(req, _res, next) {
  req.id = req.headers['x-request-id'] || randomUUID();
  next();
}
```

### ✅ DO: request logging middleware

```js
// middleware/requestLog.js

/**
 * Логирует HTTP запросы с длительностью.
 * @param {object} logger - структурированный логгер (pino).
 */
export function requestLogMiddleware(logger) {
  return (req, res, next) => {
    const start = performance.now();

    res.on('finish', () => {
      const duration = Math.round(performance.now() - start);
      logger.info({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs: duration,
        requestId: req.id,
      });
    });

    next();
  };
}
```

---

## 5. Обработка ошибок

### ✅ DO: кастомный AppError

```js
// errors/AppError.js

/**
 * Базовый класс ошибки приложения с HTTP-кодом.
 */
export class AppError extends Error {
  /**
   * @param {string} message - сообщение для клиента.
   * @param {number} statusCode - HTTP статус.
   * @param {object} [details] - дополнительные данные.
   */
  constructor(message, statusCode = 500, details = undefined) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // отличает от programmer errors
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(details) {
    super('Validation failed', 400, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403);
  }
}
```

### ✅ DO: централизованный error handler

```js
// middleware/errorHandler.js

/**
 * Централизованный обработчик ошибок Express.
 * MUST be the last middleware in the pipeline.
 * @param {object} logger - структурированный логгер.
 */
export function errorHandler(logger) {
  // eslint-disable-next-line no-unused-vars -- Express requires 4 params for error middleware
  return (err, req, res, _next) => {
    // Operational errors (expected)
    if (err.isOperational) {
      logger.warn({
        err: { message: err.message, statusCode: err.statusCode },
        requestId: req.id,
      });

      return res.status(err.statusCode).json({
        error: err.message,
        ...(err.details && { details: err.details }),
      });
    }

    // Programmer errors (unexpected) — log full stack, return generic message
    logger.error({
      err,
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
    });

    res.status(500).json({
      error: 'Internal server error',
      // ❌ NEVER expose stack trace or internal details
    });
  };
}
```

### HTTP Status Codes по контракту

| Код | Когда | Класс |
|-----|-------|-------|
| 200 | Успех (GET, PATCH, PUT) | — |
| 201 | Ресурс создан (POST) | — |
| 204 | Успех без тела (DELETE) | — |
| 400 | Невалидные данные | `ValidationError` |
| 401 | Не аутентифицирован | `UnauthorizedError` |
| 403 | Нет прав | `ForbiddenError` |
| 404 | Не найден | `NotFoundError` |
| 409 | Конфликт (дубликат) | `ConflictError` |
| 422 | Семантическая ошибка | `AppError(msg, 422)` |
| 429 | Rate limit exceeded | rate limiter middleware |
| 500 | Внутренняя ошибка | Programmer error |

---

## 6. Валидация

### ✅ DO: Zod schema + validation middleware

```js
// schemas/coupon.schema.js
import { z } from 'zod';

export const createCouponSchema = z.object({
  body: z.object({
    code: z.string().min(3).max(20).toUpperCase(),
    discount: z.number().min(1).max(100),
    type: z.enum(['percent', 'fixed']),
    expiresAt: z.string().datetime().optional(),
  }),
});

export const updateCouponSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    code: z.string().min(3).max(20).toUpperCase().optional(),
    discount: z.number().min(1).max(100).optional(),
    active: z.boolean().optional(),
  }),
});
```

```js
// middleware/validate.js
import { AppError } from '../errors/AppError.js';

/**
 * Middleware для валидации req через Zod schema.
 * @param {import('zod').ZodSchema} schema - Zod schema.
 */
export function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));
      return next(new AppError('Validation failed', 400, errors));
    }

    // ✅ Заменяем req данные на parsed (coerced, defaults applied)
    req.body = result.data.body ?? req.body;
    req.query = result.data.query ?? req.query;
    req.params = result.data.params ?? req.params;

    next();
  };
}
```

---

## 7. Service + Repository

### ✅ DO: service layer для бизнес-логики

```js
// services/coupon.service.js
import { CouponRepo } from '../repositories/coupon.repo.js';
import { NotFoundError, ConflictError } from '../errors/AppError.js';

export class CouponService {
  #repo;

  constructor({ db }) {
    this.#repo = new CouponRepo(db);
  }

  /**
   * Возвращает список купонов с пагинацией.
   * @param {{ page: number, limit: number }} params
   * @returns {Promise<{ data: Coupon[], total: number }>}
   */
  async list({ page, limit }) {
    const offset = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.#repo.findAll({ offset, limit }),
      this.#repo.count(),
    ]);
    return { data, total, page, limit };
  }

  /**
   * Возвращает купон по ID или выбрасывает NotFoundError.
   * @param {string} id - ID купона.
   * @returns {Promise<Coupon>}
   */
  async getById(id) {
    const coupon = await this.#repo.findById(id);
    if (!coupon) throw new NotFoundError('Coupon');
    return coupon;
  }

  /**
   * Создаёт купон, проверяя уникальность кода.
   * @param {object} data - данные купона.
   * @returns {Promise<Coupon>}
   */
  async create(data) {
    const existing = await this.#repo.findByCode(data.code);
    if (existing) throw new ConflictError(`Coupon code "${data.code}" already exists`);
    return this.#repo.create(data);
  }

  async update(id, data) {
    await this.getById(id); // throws NotFoundError
    return this.#repo.update(id, data);
  }

  async remove(id) {
    await this.getById(id);
    return this.#repo.remove(id);
  }
}
```

### ✅ DO: repository для доступа к данным

```js
// repositories/coupon.repo.js

export class CouponRepo {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async findAll({ offset, limit }) {
    return this.#db.collection('coupons')
      .find({})
      .skip(offset)
      .limit(limit)
      .toArray();
  }

  async findById(id) {
    return this.#db.collection('coupons').findOne({ _id: id });
  }

  async findByCode(code) {
    return this.#db.collection('coupons').findOne({ code });
  }

  async count() {
    return this.#db.collection('coupons').countDocuments();
  }

  async create(data) {
    const result = await this.#db.collection('coupons').insertOne({
      ...data,
      active: true,
      createdAt: new Date(),
    });
    return { _id: result.insertedId, ...data };
  }

  async update(id, data) {
    const result = await this.#db.collection('coupons').findOneAndUpdate(
      { _id: id },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result;
  }

  async remove(id) {
    await this.#db.collection('coupons').deleteOne({ _id: id });
  }
}
```

---

## 8. Graceful Shutdown

### ✅ DO: graceful shutdown + health check

```js
// server.js (фрагмент)

/**
 * Настраивает graceful shutdown.
 * @param {import('http').Server} server
 * @param {object} db - database connection.
 */
function setupGracefulShutdown(server, db) {
  let isShuttingDown = false;

  async function shutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.info({ signal }, 'Graceful shutdown started');

    // 1. Stop accepting new connections
    server.close(async () => {
      try {
        // 2. Close DB connections
        await db.close();
        logger.info('Graceful shutdown complete');
        process.exit(0);
      } catch (err) {
        logger.error({ err }, 'Error during shutdown');
        process.exit(1);
      }
    });

    // 3. Force kill after timeout
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10_000);
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Unhandled errors — log and exit
  process.on('unhandledRejection', (reason) => {
    logger.fatal({ reason }, 'Unhandled rejection');
    process.exit(1);
  });
}
```

### ✅ DO: env validation

```js
// config/env.js
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  CORS_ORIGIN: z.string().default('*'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
```

---

## 9. Anti-patterns

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| Бизнес-логика в controller | Service layer |
| SQL/DB в controller | Repository layer |
| `try/catch` в каждом handler | `asyncHandler` wrapper |
| `app.listen()` в app.js | Отдельный server.js (тестируемость) |
| `res.status(500).json({ error: err.message })` | Централизованный error handler |
| `req.body.email` без валидации | Zod schema + validate middleware |
| `console.log` для логов | Структурированный logger (pino) |
| Секреты в коде | Env config + validation |
| `process.exit()` без cleanup | Graceful shutdown |
| N+1 запросы в циклах | Batch / aggregate queries |
| Отсутствие CORS / Helmet | Всегда в middleware pipeline |

---

## См. также
- `$security_baseline_dev` — безопасность в реализации
- `$observability_logging` — структурированные логи и метрики
- `$es2025_beast_practices` — современный JavaScript
- `$testing_strategy_js` — тестирование API (integration tests)
- `$mongodb_mongoose_best_practices` — MongoDB/Mongoose