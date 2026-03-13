---
name: performance_review_baseline
description: Базовый perf-ревью — N+1, пагинация, батчи, лишние запросы, кеш по архитектуре, тяжелые операции в request-path.
---

# Skill: Performance Review Baseline

Ревью производительности без premature optimization — фокус на реальных bottlenecks.

**Разделы:**
1. [Checklist](#1-checklist)
2. [DO / DON'T Examples](#2-examples)
3. [Latency Targets](#3-latency)
4. [Automated Detection](#4-detection)
5. [Output Template](#5-output)

---

## 1. Checklist

### 1.1 Database Queries

| # | Check | Severity | Status |
|---|-------|----------|--------|
| PERF-01 | No N+1 queries (loop of individual DB calls) | 🔴 P0 | ☐ |
| PERF-02 | Indexes exist for all query patterns | 🟠 P1 | ☐ |
| PERF-03 | `.select()` used — don't fetch unnecessary fields | 🟠 P1 | ☐ |
| PERF-04 | `.lean()` used for read-only queries (Mongoose) | 🟡 P2 | ☐ |
| PERF-05 | No unbounded queries (always limit/paginate) | 🔴 P0 | ☐ |
| PERF-06 | Aggregation pipelines optimized (`$match` before `$lookup`) | 🟠 P1 | ☐ |

### 1.2 API & Network

| # | Check | Severity | Status |
|---|-------|----------|--------|
| PERF-07 | No redundant round-trips (batch where possible) | 🟠 P1 | ☐ |
| PERF-08 | Pagination on list endpoints | 🔴 P0 | ☐ |
| PERF-09 | Response payload minimal (no over-fetching) | 🟠 P1 | ☐ |
| PERF-10 | Heavy operations offloaded to async (queue/worker) | 🟠 P1 | ☐ |
| PERF-11 | Compression enabled (gzip/brotli) for API responses | 🟡 P2 | ☐ |

### 1.3 Frontend

| # | Check | Severity | Status |
|---|-------|----------|--------|
| PERF-12 | No unnecessary re-renders (React.memo, useMemo, useCallback where appropriate) | 🟠 P1 | ☐ |
| PERF-13 | Images optimized (WebP, lazy loading, proper dimensions) | 🟠 P1 | ☐ |
| PERF-14 | Bundle size reasonable (no giant imports like full lodash) | 🟠 P1 | ☐ |
| PERF-15 | Code splitting / lazy routes for large apps | 🟡 P2 | ☐ |

### 1.4 Caching

| # | Check | Severity | Status |
|---|-------|----------|--------|
| PERF-16 | Cache applied where architecture allows (read-heavy, rarely changing) | 🟡 P2 | ☐ |
| PERF-17 | Cache invalidation strategy defined | 🟠 P1 | ☐ |
| PERF-18 | HTTP cache headers for static assets (Cache-Control, ETag) | 🟡 P2 | ☐ |

---

## 2. DO / DON'T Examples

### N+1 Query Problem

```javascript
// ❌ DON'T: N+1 — one query per item in loop
const coupons = await Coupon.find({ appInstanceId });
for (const coupon of coupons) {
  coupon.settings = await Settings.findOne({ couponId: coupon._id }); // N queries!
}

// ✅ DO: Single query with $in or $lookup
const coupons = await Coupon.find({ appInstanceId });
const couponIds = coupons.map(c => c._id);
const settings = await Settings.find({ couponId: { $in: couponIds } }); // 1 query
// Map settings to coupons in memory
```

### Unbounded Query

```javascript
// ❌ DON'T: Fetch ALL records
const allCoupons = await Coupon.find({}); // Could be 100K records!

// ✅ DO: Paginate
const coupons = await Coupon.find({})
  .sort({ createdAt: -1 })
  .skip(page * limit)
  .limit(limit)
  .lean();
```

### Over-fetching

```javascript
// ❌ DON'T: Return entire document
const settings = await Settings.findOne({ appInstanceId });
res.json(settings); // Includes all internal fields

// ✅ DO: Select only needed fields
const settings = await Settings.findOne({ appInstanceId })
  .select('templateId colors fonts timer coupon')
  .lean();
res.json({ data: settings });
```

### Sync Heavy Operation

```javascript
// ❌ DON'T: Heavy operation in request path
router.post('/export', async (req, res) => {
  const report = await generatePDFReport(allData); // 30 seconds!
  res.json({ report });
});

// ✅ DO: Offload to async
router.post('/export', async (req, res) => {
  const jobId = await queue.add('generate-report', { userId: req.userId });
  res.status(202).json({ jobId, status: 'processing' }); // Return immediately
});
```

### React Re-renders

```jsx
// ❌ DON'T: New object/function on every render
function ParentComponent() {
  return <Child style={{ color: 'red' }} onClick={() => doSomething()} />;
  //            ^^ new object every render  ^^ new function every render
}

// ✅ DO: Stable references
const style = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback(() => doSomething(), []);
return <Child style={style} onClick={handleClick} />;
```

---

## 3. Latency Targets

### API endpoints

| Endpoint Type | p50 | p95 | p99 | Alert threshold (p95) |
|--------------|-----|-----|-----|-----------------------|
| Widget (public, read) | 10ms | 50ms | 100ms | > 200ms |
| Dashboard (CRUD) | 20ms | 100ms | 500ms | > 1000ms |
| List with pagination | 30ms | 150ms | 500ms | > 1000ms |
| Webhooks (async OK) | 50ms | 500ms | 2000ms | > 5000ms |
| File/image upload | 100ms | 1000ms | 5000ms | > 10000ms |

### Frontend

| Metric | Target | P0 if exceeds |
|--------|--------|:---:|
| FCP (First Contentful Paint) | < 1.5s | > 3s |
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| TTI (Time to Interactive) | < 3.5s | > 7s |
| JS Bundle (gzipped) | < 200KB | > 500KB |

---

## 4. Automated Detection

### Grep patterns

```bash
# N+1 indicators
grep_search: Query="await.*find"  Includes=["*.js"]  → check if inside loop (for/forEach/map)
grep_search: Query="for.*await"   Includes=["*.js"]  → sequential async in loop

# Unbounded queries
grep_search: Query=".find({" Includes=["*.js"]  → check: has .limit() ?
grep_search: Query=".find()" Includes=["*.js"]  → no filter at all

# Over-fetching
grep_search: Query=".findOne(" Includes=["*.js"]  → check: has .select() ?

# Heavy sync operations
grep_search: Query="readFileSync"  → P1: blocking I/O
grep_search: Query="JSON.parse"    → check: large payloads?

# React performance
grep_search: Query="style={{" Includes=["*.jsx","*.tsx"]  → inline object → re-render
grep_search: Query="() =>" Includes=["*.jsx","*.tsx"]     → inline function in JSX props
```

### Mongoose explain

```javascript
// Check query plan for slow queries
const explain = await Model.find(query).explain('executionStats');
// Look for: COLLSCAN (no index), nReturned vs totalDocsExamined
```

---

## 5. Output Template

```markdown
# Performance Review Report

**Scope:** <PR/module>
**Reviewer:** Reviewer Agent
**Date:** YYYY-MM-DD

## Findings

| # | Severity | Category | File:Line | Finding | Impact | Fix |
|---|----------|----------|-----------|---------|--------|-----|
| 1 | 🔴 P0 | N+1 | `services/coupon.js:45` | DB query inside for loop | 100 coupons = 100 queries | Use `$in` batch query |
| 2 | 🔴 P0 | Unbounded | `routes/coupons.js:12` | `Coupon.find({})` without limit | Memory spike on large datasets | Add pagination |
| 3 | 🟠 P1 | Over-fetch | `controllers/settings.js:8` | No `.select()` | 40 fields returned, 5 needed | Add `.select().lean()` |

## Latency Check
| Endpoint | Current p95 | Target p95 | Status |
|----------|:-----------:|:----------:|:------:|
| GET /widget/:id | ~30ms | 50ms | ✅ |
| GET /coupons | ~800ms | 100ms | ❌ PERF-01 |

## Checklist Summary
- P0: X findings (blocking SLA/UX)
- P1: Y findings (should fix)
- P2: Z findings (optimization opportunities)

## Verdict
- ✅ PASS — no bottlenecks
- ⚠️ OPTIMIZATION NEEDED — P0/P1 findings
- ❌ BLOCKED — critical performance issue breaking SLA
```

---

## См. также
- `$observability_plan` — latency targets, metrics
- `$observability_review` — logging/metrics compliance
- `$data_model` — index strategy
- `$review_reference_snippets` — general DO/DON'T examples
