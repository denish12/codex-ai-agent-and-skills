---
name: mongodb_mongoose_best_practices
description: Best practices for MongoDB + Mongoose — schemas, indexes, validation, transactions, migrations, performance, security, testing, anti-patterns and examples.
---

#Skill: MongoDB + Mongoose Best Practices

Concrete DO/DON'T patterns for MongoDB + Mongoose: from schema design to testing.

**Sections:**
1. [Schema Design](#1-schema-design)
2. [Mongoose Model Setup](#2-mongoose-model-setup)
3. [Indexes](#3-indexes)
4. [Query Patterns](#4-query-patterns)
5. [Connection and Config](#5-connection)
6. [Security](#6-security)
7. [Transactions](#7-transactions)
8. [Migrations](#8-migrations)
9. [Handling errors](#9-error handling)
10. [Testing](#10-testing)
11. [Anti-patterns](#11-anti-patterns)

---

## 1. Schema Design

### Embedded vs Referenced

| Criterion | Embed ✅ | Reference ✅ |
|---------|---------|-------------|
| Are read together | Yes | No |
| Child lives separately | No | Yes |
| Child size | Small, bounded | Large or growing |
| Atomic updates child | Needed | Not critical |
| Many children | < 50 | Unbounded |

> [!WARNING]
> Document MongoDB ≤ 16MB. Never not embed unbounded arrays (logs, events, comment).

### ✅ DO: embed — bounded subdocuments

```js
// ✅ Embed: settings — always are read together with installation, bounded
const installationSchema = new Schema({
  appInstanceId: { type: String, required: true, unique: true },
  settings: {
    overlay: {
      title: { type: String, default: 'Special Offer!' },
      text: { type: String, default: 'Get your discount' },
      backgroundColor: { type: String, default: '#1a1a2e' },
    },
    cta: {
      text: { type: String, default: 'Get Coupon' },
      action: { type: String, enum: ['copy', 'redirect', 'link'], default: 'copy' },
    },
    timer: {
      enabled: { type: Boolean, default: true },
      minutes: { type: Number, min: 0, max: 60, default: 10 },
      seconds: { type: Number, min: 0, max: 59, default: 0 },
    },
  },
});
```

### ✅ DO: reference — independent lifecycle, unbounded

```js
// ✅ Reference: coupons — independent lifecycle, many per installation
const couponSchema = new Schema({
  appInstanceId: { type: String, required: true, index: true },
  code: { type: String, required: true, uppercase: true, trim: true },
  discount: { type: Number, required: true, min: 1, max: 100 },
  type: { type: String, enum: ['percent', 'fixed'], default: 'percent' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

// Compound index for main query pattern
couponSchema.index({ appInstanceId: 1, active: 1, createdAt: -1 });
```

---

## 2. Mongoose Model Setup

### ✅ DO: strict schema with validators

```js
// models/Coupon.js
import { Schema, model } from 'mongoose';

const couponSchema = new Schema(
  {
    appInstanceId: {
      type: String,
      required: [true, 'appInstanceId is required'],
      index: true,
    },
    code: {
      type: String,
      required: [true, 'Coupon code is required'],
      minlength: [3, 'Code must be at least 3 characters'],
      maxlength: [20, 'Code must be at most 20 characters'],
      uppercase: true,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      min: [1, 'Discount must be at least 1'],
      max: [100, 'Discount cannot exceed 100'],
    },
    type: {
      type: String,
      enum: {
        values: ['percent', 'fixed'],
        message: '{VALUE} is not a valid discount type',
      },
      default: 'percent',
    },
    active: {
      type: Boolean,
      default: true,
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,        // ✅ Automatic createdAt, updatedAt
    strict: 'throw',         // ✅ Throw an error on unknown fields
    strictQuery: true,       // ✅ Not accept unknown query params
    versionKey: '__v',       // Optimistic concurrency
  }
);

// ✅ Compound unique index
couponSchema.index({ appInstanceId: 1, code: 1 }, { unique: true });

// ✅ Index for main query: active coupons sorted by date
couponSchema.index({ appInstanceId: 1, active: 1, createdAt: -1 });

export const Coupon = model('Coupon', couponSchema);
```

### ✅ DO: toJSON transform (hide internal fields)

```js
couponSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
```

### ❌ DON'T: schema how `Schema.Types.Mixed`

```js
// ❌ Mixed = no validation, no autocomplete, data chaos
const badSchema = new Schema({
  settings: Schema.Types.Mixed,  // ❌ any data
  data: {},                       // ❌ also Mixed
});

// ✅ Explicit typing
const goodSchema = new Schema({
  settings: {
    title: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
  },
});
```

---

## 3. Indexes

### ✅ DO: indexes under real query patterns

```js
// Typical indexes for Smart Cart Rescue:

// 1. Unique lookup
couponSchema.index({ appInstanceId: 1, code: 1 }, { unique: true });

// 2. List + filter + sort
couponSchema.index({ appInstanceId: 1, active: 1, createdAt: -1 });

// 3. TTL — auto-deletion (for temporary tokens)
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// 4. Partial index — index only active coupons
couponSchema.index(
  { appInstanceId: 1, createdAt: -1 },
  { partialFilterExpression: { active: true } }
);

// 5. Text search
couponSchema.index({ code: 'text', 'metadata.description': 'text' });
```

### Rules indexes

| Rule | Explanation |
|---------|-----------|
| **ESR** | Equality → Sort → Range (order fields in compound index) |
| Not more 5-7 indexes | Each index = overhead on write |
| `explain()` for checks | `Model.find().explain('executionStats')` |
| Unique for business keys | `{ appInstanceId, code }` unique |
| TTL for expirable data | Tokens, sessions, temp files |

### ✅ DO: check query plan

```js
// Check what index is used
const explanation = await Coupon.find({ appInstanceId: 'abc', active: true })
  .sort({ createdAt: -1 })
  .explain('executionStats');

console.log(explanation.executionStats.executionStages);
// Should be IXSCAN, not COLLSCAN
```

---

## 4. Query Patterns

### ✅ DO: lean() for read-only

```js
// ✅ lean() — returns plain JS objects, not Mongoose documents
// ~5x faster, less memory, ideal for API responses
const coupons = await Coupon
  .find({ appInstanceId, active: true })
  .sort({ createdAt: -1 })
  .limit(20)
  .select('code discount type active createdAt')  // ✅ only needed fields
  .lean();                                         // ✅ plain objects
```

### ✅ DO: cursor pagination (for large collections)

```js
/**
 * Cursor-based pagination (instead of skip/limit on large collections).
 * @param {string} appInstanceId
 * @param {{ cursor?: string, limit?: number }} opts
 * @returns {Promise<{ data: Coupon[], nextCursor: string | null }>}
 */
async function listCoupons(appInstanceId, { cursor, limit = 20 }) {
  const query = { appInstanceId, active: true };

  // Cursor = ID last element previous page
  if (cursor) {
    query._id = { $lt: cursor };
  }

  const data = await Coupon
    .find(query)
    .sort({ _id: -1 })
    .limit(limit + 1)  // +1 so that understand is there nextPage
    .lean();

  const hasMore = data.length > limit;
  if (hasMore) data.pop();

  return {
    data,
    nextCursor: hasMore ? data[data.length - 1]._id.toString() : null,
  };
}
```

### ✅ DO: safe filter builder (NoSQL injection prevention)

```js
/**
 * Builds a secure MongoDB filter from query params.
 * Whitelist-approach: only allowed fields and operators.
 * @param {string} appInstanceId
 * @param {{ status?: string, q?: string, from?: string, to?: string }} query
 * @returns {object} MongoDB filter.
 */
function buildCouponFilter(appInstanceId, query) {
  const filter = { appInstanceId };

  // Status (whitelist enum)
  if (query.status === 'active') filter.active = true;
  if (query.status === 'inactive') filter.active = false;

  // Search (safe: escape regex special chars)
  if (query.q) {
    filter.code = { $regex: escapeRegex(query.q), $options: 'i' };
  }

  // Date range
  if (query.from || query.to) {
    filter.createdAt = {};
    if (query.from) filter.createdAt.$gte = new Date(query.from);
    if (query.to) filter.createdAt.$lte = new Date(query.to);
  }

  return filter;
}

/**
 * Escapes regex special characters for safe use in MongoDB $regex.
 * @param {string} str
 * @returns {string}
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

### ❌ DON'T: direct find by req.body/query

```js
// ❌ NoSQL injection — user can pass { $ne: "" }
const results = await Coupon.find(req.query);              // ❌
const results = await Coupon.find(req.body.filter);         // ❌
const user = await User.findOne({ email: req.body.email }); // ❌ if email = { $gt: "" }

// ✅ Explicit casting types
const user = await User.findOne({ email: String(req.body.email) });
```

---

## 5. Connection

### ✅ DO: connection with retry and pooling

```js
// db/connection.js
import mongoose from 'mongoose';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * Connects to MongoDB with retry and configures the pool.
 * @returns {Promise<mongoose.Connection>}
 */
export async function connectDb() {
  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 3000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(config.DATABASE_URL, {
        maxPoolSize: 10,          // ✅ Connection pooling
        minPoolSize: 2,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        heartbeatFrequencyMS: 10000,
      });

      logger.info('MongoDB connected');

      // ✅ Connection event handlers
      mongoose.connection.on('error', (err) => {
        logger.error({ err }, 'MongoDB connection error');
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });

      return mongoose.connection;

    } catch (err) {
      logger.warn({ attempt, maxRetries: MAX_RETRIES, err: err.message },
        'MongoDB connection failed, retrying...');

      if (attempt === MAX_RETRIES) {
        logger.fatal({ err }, 'MongoDB connection failed after all retries');
        throw err;
      }

      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
    }
  }
}

/**
 * Graceful disconnect.
 */
export async function disconnectDb() {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected gracefully');
}
```

---

## 6. Security

### Checklist

| Rule | How |
|---------|-----|
| **NoSQL injection** | Safe filter builder (whitelist fields + types) |
| **Least privilege** | Separate DB user with readWrite on the required DB |
| **Secrets** | Connection string via env, not in code |
| **strict: "throw"** | Catches unexpected fields in documents |
| **strictQuery: true** | Catches unknown query params |
| **Not log connection string** | pino redact for `*.DATABASE_URL` |

---

## 7. Transactions

### ✅ DO: withTransaction for multi-doc operations

```js
/**
 * Applies coupon to request atomically (deduction + usage record).
 * Requires replica set.
 */
async function applyCoupon(orderId, couponId) {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      // 1. Check coupon
      const coupon = await Coupon.findById(couponId).session(session);
      if (!coupon || !coupon.active) {
        throw new AppError('Coupon not available', 400);
      }

      // 2. Apply to the request
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { couponId, discount: coupon.discount },
          $inc: { total: -coupon.discount },
        },
        { session, new: true }
      );

      // 3. Increase usage count
      await Coupon.findByIdAndUpdate(
        couponId,
        { $inc: { usageCount: 1 } },
        { session }
      );

      return order;
    });

    return result;
  } finally {
    await session.endSession();
  }
}
```

> [!TIP]
> MongoDB any modeling, where transactions needed rarely. If transaction needed often — revisit schema design (can is worth embed).

---

## 8. Migrations

### ✅ DO: migrate-mongo

```bash
npm install --save-dev migrate-mongo
npx migrate-mongo init
```

```js
// migrations/20260313_add_template_field.js

/**
 * Adds field templateId to all settings.
 */
module.exports = {
  async up(db) {
    await db.collection('settings').updateMany(
      { templateId: { $exists: false } },
      { $set: { templateId: 'glassmorphism' } }
    );
  },

  async down(db) {
    await db.collection('settings').updateMany(
      {},
      { $unset: { templateId: '' } }
    );
  },
};
```

### Backfill strategy (for large collections)

```js
/**
 * Batch backfill — handles documents in batches.
 * @param {Collection} collection
 * @param {object} filter
 * @param {object} update
 * @param {number} batchSize
 */
async function batchBackfill(collection, filter, update, batchSize = 500) {
  let processed = 0;
  let cursor = null;

  while (true) {
    const query = { ...filter };
    if (cursor) query._id = { $gt: cursor };

    const docs = await collection
      .find(query)
      .sort({ _id: 1 })
      .limit(batchSize)
      .toArray();

    if (docs.length === 0) break;

    const ids = docs.map((d) => d._id);
    await collection.updateMany({ _id: { $in: ids } }, update);

    cursor = ids[ids.length - 1];
    processed += docs.length;

    logger.info({ processed }, 'Backfill progress');
  }

  logger.info({ total: processed }, 'Backfill complete');
}
```

---

## 9. Handling errors

### ✅ DO: mapping Mongoose errors → HTTP

```js
/**
 * Maps Mongoose errors to AppError for the centralized error handler.
 * @param {Error} err
 * @returns {AppError}
 */
function mapMongooseError(err) {
  // Duplicate key (unique constraint violation)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return new AppError(`Duplicate value for ${field}`, 409);
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return new AppError('Validation failed', 400, details);
  }

  // CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // VersionError (optimistic concurrency)
  if (err.name === 'VersionError') {
    return new AppError('Document was modified by another request', 409);
  }

  // Unknown → 500 (log full error, return generic message)
  return new AppError('Internal server error', 500);
}
```

### Error mapping table

| Mongoose Error | HTTP Code | AppError |
|----------------|-----------|---------|
| `code: 11000` (duplicate) | 409 | ConflictError |
| `ValidationError` | 400 | ValidationError |
| `CastError` (bad ObjectId) | 400 | ValidationError |
| `VersionError` | 409 | ConflictError |
| Document not found | 404 | NotFoundError |
| Connection timeout | 503 | AppError |

---

## 10. Testing

### ✅ DO: MongoMemoryServer for integration tests

```js
// tests/setup.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

/**
 * Runs in-memory MongoDB before tests.
 */
export async function setupTestDb() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

/**
 * Cleans all collections between tests.
 */
export async function clearTestDb() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

/**
 * Stops the in-memory MongoDB after tests.
 */
export async function teardownTestDb() {
  await mongoose.disconnect();
  await mongoServer.stop();
}
```

```js
// tests/coupon.repo.test.js
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupTestDb, clearTestDb, teardownTestDb } from './setup.js';
import { Coupon } from '../models/Coupon.js';

describe('Coupon Model', () => {
  beforeAll(setupTestDb);
  afterEach(clearTestDb);
  afterAll(teardownTestDb);

  it('should create a coupon with defaults', async () => {
    const coupon = await Coupon.create({
      appInstanceId: 'test-app',
      code: 'save20',
      discount: 20,
    });

    expect(coupon.code).toBe('SAVE20');      // uppercase transform
    expect(coupon.active).toBe(true);        // default
    expect(coupon.type).toBe('percent');      // default
    expect(coupon.createdAt).toBeDefined();   // timestamps
  });

  it('should enforce unique (appInstanceId, code)', async () => {
    await Coupon.create({ appInstanceId: 'app1', code: 'TEST', discount: 10 });

    await expect(
      Coupon.create({ appInstanceId: 'app1', code: 'TEST', discount: 20 })
    ).rejects.toThrow(/duplicate key/i);
  });

  it('should validate discount range', async () => {
    await expect(
      Coupon.create({ appInstanceId: 'app1', code: 'BAD', discount: 150 })
    ).rejects.toThrow(/cannot exceed 100/i);
  });

  it('should query active coupons sorted by date', async () => {
    await Coupon.create({ appInstanceId: 'app1', code: 'OLD', discount: 5 });
    await Coupon.create({ appInstanceId: 'app1', code: 'NEW', discount: 10 });
    await Coupon.create({ appInstanceId: 'app1', code: 'OFF', discount: 15, active: false });

    const active = await Coupon
      .find({ appInstanceId: 'app1', active: true })
      .sort({ createdAt: -1 })
      .lean();

    expect(active).toHaveLength(2);
    expect(active[0].code).toBe('NEW');
  });
});
```

---

## 11. Anti-patterns

| ❌ Anti-pattern | ✅ Decision |
|----------------|-----------|
| `Schema.Types.Mixed` | Explicit typing fields |
| `Model.find(req.query)` | Safe filter builder (whitelist) |
| `skip()` on large collections | Cursor pagination (`_id` / `createdAt`) |
| No `.lean()` for API responses | `.lean()` + `.select()` for read-only |
| `.populate()` in cycles (N+1) | Batch query by IDs / embed |
| Business logic in Mongoose hooks | Hooks are only for technical concerns (timestamps, normalization) |
| Unbounded embed arrays | Reference + separate collection |
| No indexes under query patterns | `explain()` → IXSCAN, not COLLSCAN |
| `strict: false` | `strict: 'throw'` + `strictQuery: true` |
| Connection string in code | Env vars + Zod validation |

---

## Checklist

- [ ] Schemas with required/enum/min/max/defaults/timestamps
- [ ] Embed vs reference — intentional choice, documented
- [ ] Indexes under key query patterns
- [ ] Pagination: cursor for large collections
- [ ] Safe filter builder (no raw user input in find)
- [ ] Connection with retry and pooling
- [ ] Mongoose errors → HTTP codes mapping
- [ ] Integration tests (MongoMemoryServer)
- [ ] Migrations for schema changes

---

## See also
- `$node_express_beast_practices` — Express architecture and service layer
- `$security_baseline_dev` — NoSQL injection prevention
- `$testing_strategy_js` — testing strategy
- `$observability_logging` — structured logging
