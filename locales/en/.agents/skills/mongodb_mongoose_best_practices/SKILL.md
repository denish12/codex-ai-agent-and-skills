---
name: mongodb_mongoose_best_practices
description: Best practices for MongoDB + Mongoose — schemas, indexes, validation, transactions, migrations, performance, security, testing, anti-patterns, and examples.
---

# Skill: MongoDB + Mongoose Best Practices

Concrete DO/DON'T patterns for MongoDB + Mongoose: from schema design to testing.

**Sections:**
1. [Schema Design](#1-schema-design)
2. [Mongoose Model Setup](#2-mongoose-model-setup)
3. [Indexes](#3-indexes)
4. [Query Patterns](#4-query-patterns)
5. [Connection and Config](#5-connection-and-config)
6. [Security](#6-security)
7. [Transactions](#7-transactions)
8. [Migrations](#8-migrations)
9. [Error Handling](#9-error-handling)
10. [Testing](#10-testing)
11. [Anti-patterns](#11-anti-patterns)

---

## 1. Schema Design

### Embedded vs Referenced

| Criterion | Embed ✅ | Reference ✅ |
|---------|---------|-------------|
| Read together | Yes | No |
| Child lives separately | No | Yes |
| Child size | Small, bounded | Large or growing |
| Atomic updates of child | Needed | Not critical |
| Many children | < 50 | Unbounded |

> [!WARNING]
> MongoDB document ≤ 16MB. Never embed unbounded arrays (logs, events, comments).

### ✅ DO: embed — bounded subdocuments

```js
// ✅ Embed: settings — always read together with tenant, bounded
const tenantSchema = new Schema({
  tenantId: { type: String, required: true, unique: true },
  settings: {
    display: {
      title: { type: String, default: 'Welcome!' },
      description: { type: String, default: 'Explore our products' },
      backgroundColor: { type: String, default: '#1a1a2e' },
    },
    notifications: {
      enabled: { type: Boolean, default: true },
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'weekly' },
    },
    limits: {
      maxItems: { type: Number, min: 1, max: 1000, default: 100 },
    },
  },
});
```

### ✅ DO: reference — independent lifecycle, unbounded

```js
// ✅ Reference: products — independent lifecycle, many per tenant
const productSchema = new Schema({
  tenantId: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0.01, max: 99999 },
  category: { type: String, enum: ['digital', 'physical', 'subscription'], default: 'digital' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

// Compound index for main query pattern
productSchema.index({ tenantId: 1, active: 1, createdAt: -1 });
```

---

## 2. Mongoose Model Setup

### ✅ DO: strict schema with validators

```js
// models/Product.js
import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: [true, 'tenantId is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [100, 'Name must be at most 100 characters'],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0.01, 'Price must be at least 0.01'],
      max: [99999, 'Price cannot exceed 99999'],
    },
    category: {
      type: String,
      enum: {
        values: ['digital', 'physical', 'subscription'],
        message: '{VALUE} is not a valid category',
      },
      default: 'digital',
    },
    active: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,        // ✅ Automatic createdAt, updatedAt
    strict: 'throw',         // ✅ Throw an error on unknown fields
    strictQuery: true,       // ✅ Do not accept unknown query params
    versionKey: '__v',       // Optimistic concurrency
  }
);

// ✅ Compound unique index
productSchema.index({ tenantId: 1, name: 1 }, { unique: true });

// ✅ Index for main query: active products sorted by date
productSchema.index({ tenantId: 1, active: 1, createdAt: -1 });

export const Product = model('Product', productSchema);
```

### ✅ DO: toJSON transform (hide internal fields)

```js
productSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
```

### ❌ DON'T: schema as `Schema.Types.Mixed`

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

### ✅ DO: indexes for real query patterns

```js
// Typical indexes for a SaaS application:

// 1. Unique lookup
productSchema.index({ tenantId: 1, name: 1 }, { unique: true });

// 2. List + filter + sort
productSchema.index({ tenantId: 1, active: 1, createdAt: -1 });

// 3. TTL — auto-delete (for temporary tokens)
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// 4. Partial index — index only active products
productSchema.index(
  { tenantId: 1, createdAt: -1 },
  { partialFilterExpression: { active: true } }
);

// 5. Text search
productSchema.index({ name: 'text', 'metadata.description': 'text' });
```

### Index Rules

| Rule | Explanation |
|---------|-----------|
| **ESR** | Equality → Sort → Range (field order in compound index) |
| No more than 5-7 indexes | Every index = overhead on write |
| `explain()` for checking | `Model.find().explain('executionStats')` |
| Unique for business keys | `{ tenantId, name }` unique |
| TTL for expirable data | Tokens, sessions, temp files |

### ✅ DO: check query plan

```js
// Check that the index is used
const explanation = await Product.find({ tenantId: 'abc', active: true })
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
const products = await Product
  .find({ tenantId, active: true })
  .sort({ createdAt: -1 })
  .limit(20)
  .select('name price category active createdAt')  // ✅ only needed fields
  .lean();                                         // ✅ plain objects
```

### ✅ DO: cursor pagination (for large collections)

```js
/**
 * Cursor-based pagination (instead of skip/limit on large collections).
 * @param {string} tenantId
 * @param {{ cursor?: string, limit?: number }} opts
 * @returns {Promise<{ data: Product[], nextCursor: string | null }>}
 */
async function listProducts(tenantId, { cursor, limit = 20 }) {
  const query = { tenantId, active: true };

  // Cursor = ID of the last element of the previous page
  if (cursor) {
    query._id = { $lt: cursor };
  }

  const data = await Product
    .find(query)
    .sort({ _id: -1 })
    .limit(limit + 1)  // +1 to understand if there is nextPage
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
 * Builds a safe MongoDB filter from query params.
 * Whitelist approach: only allowed fields and operators.
 * @param {string} tenantId
 * @param {{ status?: string, q?: string, from?: string, to?: string }} query
 * @returns {object} MongoDB filter.
 */
function buildProductFilter(tenantId, query) {
  const filter = { tenantId };

  // Status (whitelist enum)
  if (query.status === 'active') filter.active = true;
  if (query.status === 'inactive') filter.active = false;

  // Search (safe: escape regex special chars)
  if (query.q) {
    filter.name = { $regex: escapeRegex(query.q), $options: 'i' };
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
const results = await Product.find(req.query);              // ❌
const results = await Product.find(req.body.filter);         // ❌
const user = await User.findOne({ email: req.body.email }); // ❌ if email = { $gt: "" }

// ✅ Explicit type casting
const user = await User.findOne({ email: String(req.body.email) });
```

---

## 5. Connection and Config

### ✅ DO: connection with retry and pooling

```js
// db/connection.js
import mongoose from 'mongoose';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * Connects to MongoDB with retry and pool configuration.
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
| **Least privilege** | Separate DB user with readWrite to the target DB |
| **Secrets** | Connection string via env, not in code |
| **strict: "throw"** | Catches unexpected fields in documents |
| **strictQuery: true** | Catches unknown query params |
| **Do not log connection string** | pino redact for `*.DATABASE_URL` |

---

## 7. Transactions

### ✅ DO: withTransaction for multi-doc operations

```js
/**
 * Applies a discount to an order atomically (deduction + usage record).
 * Requires replica set.
 */
async function applyPromotion(orderId, productId) {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      // 1. Check product
      const product = await Product.findById(productId).session(session);
      if (!product || !product.active) {
        throw new AppError('Product not available', 400);
      }

      // 2. Apply to order
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { productId, unitPrice: product.price },
          $inc: { total: product.price },
        },
        { session, new: true }
      );

      // 3. Increment view count
      await Product.findByIdAndUpdate(
        productId,
        { $inc: { viewCount: 1 } },
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
> MongoDB favors modeling where transactions are rarely needed. If a transaction is needed often — rethink schema design (maybe embed makes sense).

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
 * Adds templateId field to all settings.
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
 * Batch backfill — processes documents in chunks.
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

## 9. Error Handling

### ✅ DO: map Mongoose errors → HTTP

```js
/**
 * Maps Mongoose errors to AppError for centralized error handler.
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
 * Starts in-memory MongoDB before tests.
 */
export async function setupTestDb() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

/**
 * Clears all collections between tests.
 */
export async function clearTestDb() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

/**
 * Stops in-memory MongoDB after tests.
 */
export async function teardownTestDb() {
  await mongoose.disconnect();
  await mongoServer.stop();
}
```

```js
// tests/product.repo.test.js
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupTestDb, clearTestDb, teardownTestDb } from './setup.js';
import { Product } from '../models/Product.js';

describe('Product Model', () => {
  beforeAll(setupTestDb);
  afterEach(clearTestDb);
  afterAll(teardownTestDb);

  it('should create a product with defaults', async () => {
    const product = await Product.create({
      tenantId: 'test-tenant',
      name: 'Premium Widget',
      price: 29.99,
    });

    expect(product.name).toBe('Premium Widget');
    expect(product.active).toBe(true);            // default
    expect(product.category).toBe('digital');      // default
    expect(product.createdAt).toBeDefined();       // timestamps
  });

  it('should enforce unique (tenantId, name)', async () => {
    await Product.create({ tenantId: 'tenant1', name: 'Widget', price: 10 });

    await expect(
      Product.create({ tenantId: 'tenant1', name: 'Widget', price: 20 })
    ).rejects.toThrow(/duplicate key/i);
  });

  it('should validate price range', async () => {
    await expect(
      Product.create({ tenantId: 'tenant1', name: 'Bad', price: 100000 })
    ).rejects.toThrow(/cannot exceed 99999/i);
  });

  it('should query active products sorted by date', async () => {
    await Product.create({ tenantId: 'tenant1', name: 'Old', price: 5 });
    await Product.create({ tenantId: 'tenant1', name: 'New', price: 10 });
    await Product.create({ tenantId: 'tenant1', name: 'Archived', price: 15, active: false });

    const active = await Product
      .find({ tenantId: 'tenant1', active: true })
      .sort({ createdAt: -1 })
      .lean();

    expect(active).toHaveLength(2);
    expect(active[0].name).toBe('New');
  });
});
```

---

## 11. Anti-patterns

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| `Schema.Types.Mixed` | Explicit field typing |
| `Model.find(req.query)` | Safe filter builder (whitelist) |
| `skip()` on large collections | Cursor pagination (`_id` / `createdAt`) |
| No `.lean()` for API responses | `.lean()` + `.select()` for read-only |
| `.populate()` in loops (N+1) | Batch query by IDs / embed |
| Business logic in Mongoose hooks | Hooks = technical only (timestamps, normalization) |
| Unbounded embed arrays | Reference + separate collection |
| No indexes for query patterns | `explain()` → IXSCAN, not COLLSCAN |
| `strict: false` | `strict: 'throw'` + `strictQuery: true` |
| Connection string in code | Env vars + Zod validation |

---

## Checklist

- [ ] Schemas with required/enum/min/max/defaults/timestamps
- [ ] Embed vs reference — deliberate choice, documented
- [ ] Indexes for key query patterns
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
