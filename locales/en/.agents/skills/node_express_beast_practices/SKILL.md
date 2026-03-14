---
name: node_express_beast_practices
description: Node.js + Express — REST API, middleware pipeline, service layer, repositories, centralized error handling, validation (Zod), graceful shutdown, health checks, security headers. Activate when writing an API, refactoring Express applications, or for questions on "how to properly organize a backend on Express".
---

# Skill: Node/Express Beast Practices

Specific DO/DON'T patterns for Express API — from architecture to graceful shutdown.

**Sections:**
1. [Architecture: layers](#1-architecture)
2. [App Factory](#2-app-factory)
3. [Router + Controller](#3-router--controller)
4. [Middleware Pipeline](#4-middleware-pipeline)
5. [Centralized error handling](#5-error-handling)
6. [Validation (Zod)](#6-validation)
7. [Service + Repository](#7-service--repository)
8. [Graceful Shutdown and Health Checks](#8-graceful-shutdown)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. Architecture

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

### Layers and Responsibilities

| Layer | Responsible for | DOES NOT do |
|------|-----------|----------|
| **Router** | URL → Controller mapping | Business logic |
| **Controller** | Parsing req → calling service → formatting res | SQL/DB, validation |
| **Middleware** | Cross-cutting concerns (auth, logging, rate limit) | Business logic |
| **Service** | Business logic, orchestration | Work with req/res |
| **Repository** | Data access (DB, API) | Business logic |

---

## 2. App Factory

### ✅ DO: app separate from server (testability)

```js
// app.js — clean Express app, without listen()
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { requestIdMiddleware } from './middleware/requestId.js';
import { errorHandler } from './middleware/errorHandler.js';
import { routes } from './routes/index.js';

/**
 * Creates and configures the Express application.
 * @param {{ db: object, logger: object }} deps - dependencies.
 * @returns {express.Express} configured application.
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
// server.js — HTTP server + graceful shutdown
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

### ✅ DO: thin controllers, business logic in service

```js
// routes/coupons.router.js
import { Router } from 'express';
import { CouponController } from '../controllers/coupons.controller.js';
import { validate } from '../middleware/validate.js';
import { createCouponSchema, updateCouponSchema } from '../schemas/coupon.schema.js';

/**
 * Router for coupons.
 * @param {{ db: object }} deps - dependencies.
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
   * @param {{ db: object }} deps - dependencies.
   */
  constructor(deps) {
    this.#service = new CouponService(deps);
  }

  /**
   * Returns a list of coupons.
   * GET /api/coupons
   */
  list = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const result = await this.#service.list({ page: +page, limit: +limit });
    res.json(result);
  });

  /**
   * Returns a coupon by ID.
   * GET /api/coupons/:id
   */
  getById = asyncHandler(async (req, res) => {
    const coupon = await this.#service.getById(req.params.id);
    res.json(coupon);
  });

  /**
   * Creates a new coupon.
   * POST /api/coupons
   */
  create = asyncHandler(async (req, res) => {
    const coupon = await this.#service.create(req.body);
    res.status(201).json(coupon);
  });

  /**
   * Updates a coupon.
   * PATCH /api/coupons/:id
   */
  update = asyncHandler(async (req, res) => {
    const coupon = await this.#service.update(req.params.id, req.body);
    res.json(coupon);
  });

  /**
   * Deletes a coupon.
   * DELETE /api/coupons/:id
   */
  remove = asyncHandler(async (req, res) => {
    await this.#service.remove(req.params.id);
    res.status(204).end();
  });
}
```

### ✅ DO: asyncHandler for automatic error catching

```js
// utils/asyncHandler.js

/**
 * Wraps an async controller in try/catch, passing the error to next().
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

### Middleware order (critically important)

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
 * Adds a request ID to each request for log correlation.
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
 * Logs HTTP requests with duration.
 * @param {object} logger - structured logger (pino).
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

## 5. Error handling

### ✅ DO: custom AppError

```js
// errors/AppError.js

/**
 * Base application error class with HTTP code.
 */
export class AppError extends Error {
  /**
   * @param {string} message - message for the client.
   * @param {number} statusCode - HTTP status.
   * @param {object} [details] - additional data.
   */
  constructor(message, statusCode = 500, details = undefined) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // distinguishes from programmer errors
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

### ✅ DO: centralized error handler

```js
// middleware/errorHandler.js

/**
 * Centralized Express error handler.
 * MUST be the last middleware in the pipeline.
 * @param {object} logger - structured logger.
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

### HTTP Status Codes by contract

| Code | When | Class |
|-----|-------|-------|
| 200 | Success (GET, PATCH, PUT) | — |
| 201 | Resource created (POST) | — |
| 204 | Success without body (DELETE) | — |
| 400 | Invalid data | `ValidationError` |
| 401 | Not authenticated | `UnauthorizedError` |
| 403 | No permissions | `ForbiddenError` |
| 404 | Not found | `NotFoundError` |
| 409 | Conflict (duplicate) | `ConflictError` |
| 422 | Semantic error | `AppError(msg, 422)` |
| 429 | Rate limit exceeded | rate limiter middleware |
| 500 | Internal error | Programmer error |

---

## 6. Validation

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
 * Middleware for validating req through Zod schema.
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

    // ✅ Replace req data with parsed (coerced, defaults applied)
    req.body = result.data.body ?? req.body;
    req.query = result.data.query ?? req.query;
    req.params = result.data.params ?? req.params;

    next();
  };
}
```

---

## 7. Service + Repository

### ✅ DO: service layer for business logic

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
   * Returns a list of coupons with pagination.
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
   * Returns a coupon by ID or throws NotFoundError.
   * @param {string} id - Coupon ID.
   * @returns {Promise<Coupon>}
   */
  async getById(id) {
    const coupon = await this.#repo.findById(id);
    if (!coupon) throw new NotFoundError('Coupon');
    return coupon;
  }

  /**
   * Creates a coupon, verifying code uniqueness.
   * @param {object} data - coupon data.
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

### ✅ DO: repository for data access

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
// server.js (fragment)

/**
 * Configures graceful shutdown.
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

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| Business logic in controller | Service layer |
| SQL/DB in controller | Repository layer |
| `try/catch` in every handler | `asyncHandler` wrapper |
| `app.listen()` in app.js | Separate server.js (testability) |
| `res.status(500).json({ error: err.message })` | Centralized error handler |
| `req.body.email` without validation | Zod schema + validate middleware |
| `console.log` for logs | Structured logger (pino) |
| Secrets in code | Env config + validation |
| `process.exit()` without cleanup | Graceful shutdown |
| N+1 queries in loops | Batch / aggregate queries |
| Missing CORS / Helmet | Always in the middleware pipeline |

---

## See also
- `$security_baseline_dev` — security in implementation
- `$observability_logging` — structured logs and metrics
- `$es2025_beast_practices` — modern JavaScript
- `$testing_strategy_js` — API testing (integration tests)
- `$mongodb_mongoose_best_practices` — MongoDB/Mongoose