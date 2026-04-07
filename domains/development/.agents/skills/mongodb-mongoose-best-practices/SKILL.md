---
name: mongodb-mongoose-best-practices
description: Best practices для MongoDB + Mongoose — схемы, индексы, валидация, транзакции, миграции, производительность, безопасность, тестирование, anti-patterns и примеры.
---

# Skill: MongoDB + Mongoose Best Practices

Конкретные DO/DON'T паттерны для MongoDB + Mongoose: от schema design до тестирования.

**Разделы:**
1. [Schema Design](#1-schema-design)
2. [Mongoose Model Setup](#2-mongoose-model-setup)
3. [Индексы](#3-индексы)
4. [Query Patterns](#4-query-patterns)
5. [Connection и Config](#5-connection)
6. [Безопасность](#6-безопасность)
7. [Транзакции](#7-транзакции)
8. [Миграции](#8-миграции)
9. [Обработка ошибок](#9-обработка-ошибок)
10. [Тестирование](#10-тестирование)
11. [Anti-patterns](#11-anti-patterns)

---

## 1. Schema Design

### Embedded vs Referenced

| Критерий | Embed ✅ | Reference ✅ |
|---------|---------|-------------|
| Читаются вместе | Да | Нет |
| Child живёт отдельно | Нет | Да |
| Размер child | Маленький, bounded | Большой или растущий |
| Атомарные обновления child | Нужны | Не критично |
| Много children | < 50 | Unbounded |

> [!WARNING]
> Документ MongoDB ≤ 16MB. Никогда не embed unbounded массивы (логи, события, комментарии).

### ✅ DO: embed — bounded subdocuments

```js
// ✅ Embed: settings — всегда читаются вместе с tenant, bounded
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

// Compound index для основного query pattern
productSchema.index({ tenantId: 1, active: 1, createdAt: -1 });
```

---

## 2. Mongoose Model Setup

### ✅ DO: strict schema с validators

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
    timestamps: true,        // ✅ Автоматические createdAt, updatedAt
    strict: 'throw',         // ✅ Кидать ошибку на неизвестные поля
    strictQuery: true,       // ✅ Не принимать неизвестные query params
    versionKey: '__v',       // Optimistic concurrency
  }
);

// ✅ Compound unique index
productSchema.index({ tenantId: 1, name: 1 }, { unique: true });

// ✅ Index для основного query: active products sorted by date
productSchema.index({ tenantId: 1, active: 1, createdAt: -1 });

export const Product = model('Product', productSchema);
```

### ✅ DO: toJSON transform (скрывать internal fields)

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

### ❌ DON'T: schema как `Schema.Types.Mixed`

```js
// ❌ Mixed = no validation, no autocomplete, data chaos
const badSchema = new Schema({
  settings: Schema.Types.Mixed,  // ❌ любые данные
  data: {},                       // ❌ тоже Mixed
});

// ✅ Явная типизация
const goodSchema = new Schema({
  settings: {
    title: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
  },
});
```

---

## 3. Индексы

### ✅ DO: индексы под реальные query patterns

```js
// Типичные индексы для SaaS-приложения:

// 1. Unique lookup
productSchema.index({ tenantId: 1, name: 1 }, { unique: true });

// 2. List + filter + sort
productSchema.index({ tenantId: 1, active: 1, createdAt: -1 });

// 3. TTL — автоудаление (для temporary tokens)
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// 4. Partial index — индексировать только active products
productSchema.index(
  { tenantId: 1, createdAt: -1 },
  { partialFilterExpression: { active: true } }
);

// 5. Text search
productSchema.index({ name: 'text', 'metadata.description': 'text' });
```

### Правила индексов

| Правило | Объяснение |
|---------|-----------|
| **ESR** | Equality → Sort → Range (порядок полей в compound index) |
| Не больше 5-7 индексов | Каждый индекс = overhead на write |
| `explain()` для проверки | `Model.find().explain('executionStats')` |
| Unique для бизнес-ключей | `{ tenantId, name }` unique |
| TTL для expirable data | Tokens, sessions, temp files |

### ✅ DO: проверять query plan

```js
// Проверить что индекс используется
const explanation = await Product.find({ tenantId: 'abc', active: true })
  .sort({ createdAt: -1 })
  .explain('executionStats');

console.log(explanation.executionStats.executionStages);
// Должно быть IXSCAN, не COLLSCAN
```

---

## 4. Query Patterns

### ✅ DO: lean() для read-only

```js
// ✅ lean() — возвращает plain JS objects, не Mongoose documents
// ~5x быстрее, меньше памяти, идеально для API responses
const products = await Product
  .find({ tenantId, active: true })
  .sort({ createdAt: -1 })
  .limit(20)
  .select('name price category active createdAt')  // ✅ только нужные поля
  .lean();                                         // ✅ plain objects
```

### ✅ DO: cursor pagination (для больших коллекций)

```js
/**
 * Cursor-based пагинация (вместо skip/limit на больших коллекциях).
 * @param {string} tenantId
 * @param {{ cursor?: string, limit?: number }} opts
 * @returns {Promise<{ data: Product[], nextCursor: string | null }>}
 */
async function listProducts(tenantId, { cursor, limit = 20 }) {
  const query = { tenantId, active: true };

  // Cursor = ID последнего элемента предыдущей страницы
  if (cursor) {
    query._id = { $lt: cursor };
  }

  const data = await Product
    .find(query)
    .sort({ _id: -1 })
    .limit(limit + 1)  // +1 чтобы понять есть ли nextPage
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
 * Строит безопасный MongoDB фильтр из query params.
 * Whitelist-подход: только разрешённые поля и операторы.
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
 * Экранирует спецсимволы regex для безопасного использования в MongoDB $regex.
 * @param {string} str
 * @returns {string}
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

### ❌ DON'T: прямой find по req.body/query

```js
// ❌ NoSQL injection — пользователь может передать { $ne: "" }
const results = await Product.find(req.query);              // ❌
const results = await Product.find(req.body.filter);         // ❌
const user = await User.findOne({ email: req.body.email }); // ❌ если email = { $gt: "" }

// ✅ Явное приведение типов
const user = await User.findOne({ email: String(req.body.email) });
```

---

## 5. Connection

### ✅ DO: connection с retry и pooling

```js
// db/connection.js
import mongoose from 'mongoose';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

/**
 * Подключается к MongoDB с retry и конфигурацией pool.
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

## 6. Безопасность

### Чеклист

| Правило | Как |
|---------|-----|
| **NoSQL injection** | Safe filter builder (whitelist полей + типов) |
| **Least privilege** | Отдельный DB user с readWrite на нужную DB |
| **Secrets** | Connection string через env, не в коде |
| **strict: "throw"** | Ловит неожиданные поля в documents |
| **strictQuery: true** | Ловит неизвестные query params |
| **Не логировать connection string** | pino redact для `*.DATABASE_URL` |

---

## 7. Транзакции

### ✅ DO: withTransaction для multi-doc операций

```js
/**
 * Применяет скидку к заказу атомарно (списание + запись использования).
 * Требует replica set.
 */
async function applyPromotion(orderId, productId) {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      // 1. Проверить продукт
      const product = await Product.findById(productId).session(session);
      if (!product || !product.active) {
        throw new AppError('Product not available', 400);
      }

      // 2. Применить к заказу
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { productId, unitPrice: product.price },
          $inc: { total: product.price },
        },
        { session, new: true }
      );

      // 3. Увеличить view count
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
> MongoDB любит моделирование, где транзакции нужны редко. Если транзакция нужна часто — пересмотри schema design (может стоит embed).

---

## 8. Миграции

### ✅ DO: migrate-mongo

```bash
npm install --save-dev migrate-mongo
npx migrate-mongo init
```

```js
// migrations/20260313_add_template_field.js

/**
 * Добавляет поле templateId ко всем settings.
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

### Backfill стратегия (для больших коллекций)

```js
/**
 * Batch backfill — обрабатывает документы порциями.
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

## 9. Обработка ошибок

### ✅ DO: маппинг Mongoose ошибок → HTTP

```js
/**
 * Маппит Mongoose ошибки в AppError для централизованного error handler.
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

## 10. Тестирование

### ✅ DO: MongoMemoryServer для integration tests

```js
// tests/setup.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

/**
 * Запускает in-memory MongoDB перед тестами.
 */
export async function setupTestDb() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

/**
 * Очищает все коллекции между тестами.
 */
export async function clearTestDb() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

/**
 * Останавливает in-memory MongoDB после тестов.
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

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| `Schema.Types.Mixed` | Явная типизация полей |
| `Model.find(req.query)` | Safe filter builder (whitelist) |
| `skip()` на больших коллекциях | Cursor pagination (`_id` / `createdAt`) |
| Нет `.lean()` для API responses | `.lean()` + `.select()` для read-only |
| `.populate()` в циклах (N+1) | Batch query по IDs / embed |
| Бизнес-логика в Mongoose hooks | Hooks = только техническое (timestamps, normalization) |
| Unbounded embed arrays | Reference + separate collection |
| Нет индексов под query patterns | `explain()` → IXSCAN, не COLLSCAN |
| `strict: false` | `strict: 'throw'` + `strictQuery: true` |
| Connection string в коде | Env vars + Zod validation |

---

## Чеклист

- [ ] Schemas с required/enum/min/max/defaults/timestamps
- [ ] Embed vs reference — осознанный выбор, задокументирован
- [ ] Индексы под ключевые query patterns
- [ ] Пагинация: cursor для больших коллекций
- [ ] Safe filter builder (нет raw user input в find)
- [ ] Connection с retry и pooling
- [ ] Mongoose errors → HTTP codes mapping
- [ ] Integration tests (MongoMemoryServer)
- [ ] Миграции для schema changes

---

## См. также
- `$node-express-beast-practices` — Express архитектура и service layer
- `$security-baseline-dev` — NoSQL injection prevention
- `$testing-strategy-js` — testing strategy
- `$observability-logging` — structured logging
