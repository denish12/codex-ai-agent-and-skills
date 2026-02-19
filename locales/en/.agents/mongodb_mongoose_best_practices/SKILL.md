---
name: mongodb_mongoose_best_practices
description: Best practices for MongoDB + Mongoose: schemas, indexes, validation, transactions, migrations, performance, security, testing, anti-patterns and examples.
---

#Skill: MongoDB + Mongoose Best Practices

## Goal
Help design and implement the data layer on MongoDB + Mongoose so that it is:
- predictable (schemes/contracts),
- productive (indexes/queries),
- safe (validation/sanitizing/least privilege),
- supported (patterns, migrations, tests),
- ready for growth (sharding/operations).

## When to use
- Backend on Node.js and the project uses MongoDB.
- Selected ORM/ODM: Mongoose.
- We need CRUD, search, aggregations, connections, transactions.

## Inputs
- PRD + acceptance criteria
- API Contracts (payload/filters/sort)
- Data model/Architecture Doc
- NFR: latency/throughput, volumes, retention, security/compliance

## Exit (Deliverables)
- List of collections and key documents (schemes)
- Indexes (and why they are)
- Validation/sanitization rules at the border
- Strategy for migrations and versioning of schemas
- Query patterns and performance notes
- Test plan (unit/integration) for data layer
- List of anti-patterns + “dos and don’ts”

---

#1) Schema Design

## 1.1 Embedded vs Referenced
Make your choice consciously and fix the trade-off:
- **Embed** (embed) if:
  - data is small, often read together,
  - atomic updates of subdocuments are needed,
  - “child” does not live separately.
- **Reference** (ObjectId of the reference) if:
  - the child object is large/growing,
  - need an independent lifecycle,
  - there is sharding/different access patterns.

⚠️ Limit: document up to 16MB. Investing “eternal” arrays (log, events) is a risk.

## 1.2 Define invariants in the schema
- required, enum, min/max, custom validators
- default values
- timestamps (createdAt/updatedAt) - almost always

## 1.3 Versioning schemes
- Add the `schemaVersion` field (if the schema is actively evolving)
- New code must be able to read the old version (transition period)

---

#2) Indexes and performance

## 2.1 Rule No. 1: Indexes for real queries
An index is a contract with an access pattern.
For each key endpoint/UX flow:
- filter/search,
- sorting,
- pagination.

## 2.2 Typical indexes
- **compound index** for (filter + sort)
- **unique** for logins/keys/slugs
- **TTL** for one-time tokens/sessions (if applicable)
- **partial index** if the index is not needed for all documents
- **text index** - be careful, a separate search (or Atlas Search) is often better

## 2.3 Pagination
- Offset (`skip`) degrades on large volumes.
- For large collections use **cursor pagination**:
  - by `_id` or `createdAt` (and the index for it).

## 2.4 “Lean reads” and field selection
- `.lean()` for read-only (speeds up, less memory)
- `.select()` - do not drag unnecessary fields (especially large blobs)

## 2.5 Avoid N+1
- Either **embed** or batch query by ids,
- `.populate()` should be used carefully, understand the cost.

---

#3) Security

## 3.1 NoSQL injection (must)
It is dangerous to accept filters directly from the user.
- Disable the “raw” filter object from body/query.
- Use allowlist fields and operators.

### Okay ✅
- mapping query params → safe filter
- explicit Zod/Joi validation + query assembly

### Bad ❌
- `Model.find(req.query)` / `Model.find(req.body.filter)` without filtering## 3.2 Least privilege
- a separate database user for the application,
- minimal rights (readWrite to the desired database),
- different creds for env.

## 3.3 Secrets
- creds only through env/secret manager
- do not log connection string

---

#4) Mongoose: patterns and conventions

## 4.1 Schema: strict mode
Recommended:
- `strict: "throw"` for critical models (catches unexpected fields)
- `strictQuery: true` (so that queries do not accept “garbage”)

## 4.2 Validation: where is what
- API Edge: Zod/Joi (mandatory)
- In Mongoose schema: model invariants (second milestone)
Don't rely solely on Mongoose validation for user input.

## 4.3 Middleware/hooks: be careful
- pre/post hooks = “Magic” if there are many of them and they hide the logic.
- Any hook must be documented.
- Do not put business logic in hooks, only technical things (timestamps, normalization).

## 4.4 Plugins
- `mongoose-lean-virtuals`, `mongoose-delete`, etc. - use consciously
- Monitor the supply-chain (reputation/support)

## 4.5 Transactions
Transactions are available in the replica set.
Use `session` and `withTransaction` for multi-doc operations.
But remember: MongoDB loves modeling where transactions are rarely needed.

---

#5) Data migrations and evolution

## 5.1 Migrations are required when changing the model
Options:
- `migrate-mongo`
- your own migration runner (the `migrations` table in Mongo)

## 5.2 Backfill strategy
- small batches
- id-range/cursor
- retries
- observability (how much is left)

---

#6) Error handling

## 6.1 Common errors
- duplicate key → code 409 (if this is a business conflict)
- validation error → 400
- not found → 404
- cast error (ObjectId) → 400
- connection/timeouts → 503/500 (depending on policy)

## 6.2 Do not leak entrails
- do not return stack
- do not return raw error from Mongo

---

#7) Testing (TDD-friendly)

## 7.1 Unit tests
- validators/mappers/filter builders
- service layer (with mock repo)

## 7.2 Integration tests
- real Mongo (Testcontainers/Docker) or MongoMemoryServer (faster, but not 100% like prod)
- index tests (unique, TTL logic)
- transactions (if you use)

---

#8) Anti-patterns (like P0 risks)

🔴P0:
- Accept user input as a “raw” Mongo filter (NoSQL injection)
- Lack of indexes for key queries (latency degrades)
- Too many Mongoose hooks (Magic)
- Huge documents/growing arrays (16MB risk)
- An attempt to replace the scheme with “dynamics” without strict rules (Big Ball of Mud in the data)

🟠P1:
- `.populate()` in loops / N+1
- `skip` pagination on large volumes
- `select *` without `.select()`

---

# 9) Examples (what to do / what not to do)

## 9.1 Safe filter builder (example)
### ✅ Good: allowlist + explicit operators
- accept query params: `status`, `q`, `from`, `to`
- build the filter ourselves
- prohibit `$where`, `$expr`, `$regex` without restrictions

### ❌ Bad: direct find by req.query
- `Model.find(req.query)`

## 9.2 Filter index + grade
### ✅ Ok
- endpoint: list orders by userId sorted by createdAt desc
- index: `{ userId: 1, createdAt: -1 }`

### ❌ Bad
- sorting by non-indexed field on a large collection

---

# 10) Checklist before transferring to development/review
- [ ] Schemes defined (required/enums/defaults/timestamps)
- [ ] Embed vs reference solutions are documented
- [ ] Indexes are defined for key endpoints
- [ ] Pagination selected (cursor for large collections)- [ ] No raw user-provided filter (NoSQL injection)
- [ ] There is a migration/backfill plan
- [ ] Integration tests available (DB queries/unique/transactions)
- [ ] Errors are mapped safely (400/404/409/5xx)