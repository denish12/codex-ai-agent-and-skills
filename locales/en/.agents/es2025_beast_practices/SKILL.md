---
name: es2025_beast_practices
description: Modern JavaScript (ES2025) with an emphasis on readability, predictability, and security. Use this skill when writing or reviewing any JS/TS code ? especially async/await, error handling, destructuring, immutability, new APIs (Promise.withResolvers, Iterator helpers, Object.groupBy, using/Symbol.dispose), and performance optimization. Activate with questions like "how to write X correctly in modern JS" or "what is wrong with this code".
---

#Skill: ES2025 Beast Practices

Concrete DO/DON'T patterns for modern JavaScript without magic and surprises.

**Sections:**
1. [Async/Await and handling errors](#1-asyncawait)
2. [New API ES2022?ES2025](#2-new-api)
3. [Destructuring and immutability](#3-destructuring-and-immutability)
4. [Safe work with data](#4-secure)
5. [Performance and hygiene](#5-performance)
6. [Patterns modules](#6-pattern)

---

## 1. Async/Await

### ? DO: early return + contextual errors
```js
// Each layer adds context to the error ? easy to trace
async function loadUserProfile(userId) {
  const user = await fetchUser(userId).catch(err => {
    throw new Error(`Failed to fetch user ${userId}: ${err.message}`);
  });

  const profile = await fetchProfile(user.profileId).catch(err => {
    throw new Error(`Failed to fetch profile for user ${userId}: ${err.message}`);
  });

  return { user, profile };
}
```

### ? DO: parallel requests via Promise.all
```js
// ? In parallel ? both requests start simultaneously
async function getDashboardData(userId) {
  const [user, stats] = await Promise.all([
    fetchUser(userId),
    fetchStats(userId),
  ]);
  return { user, stats };
}

// ? Sequentially ? stats wait for user without reason (extra ~200ms)
async function getDashboardDataSlow(userId) {
  const user  = await fetchUser(userId);
  const stats = await fetchStats(userId);
  return { user, stats };
}
```

### ? DO: Promise.allSettled when a partial result is acceptable
```js
async function loadWidgets(ids) {
  const results = await Promise.allSettled(ids.map(fetchWidget));

  const widgets = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  const failed = results
    .filter(r => r.status === "rejected")
    .map((r, i) => ({ id: ids[i], reason: r.reason.message }));

  if (failed.length) console.warn("Some widgets failed:", failed);
  return widgets;
}
```

### ✅ DO: Promise.withResolvers (ES2024) instead of manual new Promise
```js
// ? Pure: resolve/reject moved outward without wrappers
function makeDeferred() {
  const { promise, resolve, reject } = Promise.withResolvers();
  return { promise, resolve, reject };
}

// Usage: waiting for external events
const { promise, resolve } = Promise.withResolvers();
someEmitter.once("ready", resolve);
await promise;

// ? Old method: nested constructor, resolve/reject "leak" into closure
function makeDeferredOld() {
  let resolve, reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
```

### ? DO: AbortController for cancelable requests
```js
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
```

### ❌ DON'T: ignore errors / floating promises
```js
// ❌ Bad: error silently is swallowed
async function saveData(data) {
  db.save(data); // no await, no catch
}

// ❌ Bad: catch without actions
fetchUser(id).catch(() => {}); // error disappears into nowhere

// ? Bad: async in forEach ? does not wait for completion
items.forEach(async item => {
  await process(item); // forEach not waits for promise
});

// ✅ Correctly:
await Promise.all(items.map(item => process(item)));
```

---

## 2. New API

### ✅ DO: Object.groupBy (ES2024)
```js
const orders = [
  { id: 1, status: "pending", amount: 100 },
  { id: 2, status: "done",    amount: 200 },
  { id: 3, status: "pending", amount: 50  },
];

// ✅ Purely and readably
const byStatus = Object.groupBy(orders, o => o.status);
// { pending: [{...}, {...}], done: [{...}] }

// ? Earlier this had to be done manually:
const byStatusOld = orders.reduce((acc, o) => {
  (acc[o.status] ??= []).push(o);
  return acc;
}, {});
```

### ✅ DO: Iterator helpers (ES2025)
```js
// ? Lazy chain without intermediate arrays
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .values()
  .filter(n => n % 2 === 0)  // lazy filter
  .map(n => n * n)            // lazy map
  .take(3)                    // first 3
  .toArray();                 // [4, 16, 36]

// ? Earlier: create intermediate arrays at each step
const resultOld = [1,2,3,4,5,6,7,8,9,10]
  .filter(n => n % 2 === 0)  // new array
  .map(n => n * n)            // still new array
  .slice(0, 3);               // still one
```

### ? DO: using / Symbol.dispose (ES2024) for resources
```js
// ? Guaranteed cleanup of the resource when leaving the block
function getDbConnection() {
  const conn = db.connect();
  return {
    query: (sql) => conn.query(sql),
    [Symbol.dispose]: () => conn.close(), // will be called automatically
  };
}

async function processData() {
  using conn = getDbConnection(); // will be closed when leaving the block
  const rows = await conn.query("SELECT * FROM users");
  return rows;
} // conn[Symbol.dispose]() caused here automatically

// ✅ Async dispose
function getFileHandle(path) {
  const fh = await fs.open(path);
  return {
    read: () => fh.read(),
    [Symbol.asyncDispose]: () => fh.close(),
  };
}
```

### ✅ DO: Array.at() for access with end
```js
const items = [1, 2, 3, 4, 5];

// ✅ Readably
const last    = items.at(-1);  // 5
const preLast = items.at(-2);  // 4

// ? Old method ? noisy
const lastOld = items[items.length - 1];
```

### ✅ DO: structuredClone for deep copy
```js
// ✅ Embedded deep clone — secure, handles Date, Map, Set
const original = { user: { name: "Alice", tags: ["admin"] }, createdAt: new Date() };
const clone = structuredClone(original);

// ❌ JSON.parse(JSON.stringify(...)) — loses Date, undefined, Map, Set, functions
const badClone = JSON.parse(JSON.stringify(original)); // createdAt will turn into in string
```

---

## 3. Destructuring and immutability

### ? DO: destructuring with defaults and renaming
```js
// ? Renaming + default
function createUser({ name, role = "user", email: userEmail }) {
  return { name, role, email: userEmail };
}

// ✅ Nested destructuring
const { address: { city, zip = "000000" } = {} } = user;

// ? Rest in the object (spread of the remainder)
const { password, ...safeUser } = user; // remove sensitive field
```

### ✅ DO: immutability updates
```js
// ✅ Update nested fields without mutations
const updatedUser = {
  ...user,
  address: { ...user.address, city: "Moscow" },
};

// ✅ Immutability update array
const withNewItem   = [...items, newItem];
const withoutItem   = items.filter(i => i.id !== targetId);
const withUpdated   = items.map(i => i.id === targetId ? { ...i, done: true } : i);

// ? Mutation ? creates bugs in React/Redux and implicit dependencies
user.address.city = "Moscow";     // mutation
items.push(newItem);              // mutation
```

### ✅ DO: nullish coalescing and optional chaining
```js
// ✅ ?? — only null/undefined, not 0 and ""
const port    = config.port ?? 3000;       // 0 stays 0
const timeout = options.timeout ?? 5000;

// ? || ? overrides falsy values (0, "")
const portBad = config.port || 3000;       // 0 will turn into in 3000

// ? ?. ? safe access to the chain
const city = user?.address?.city ?? "Unknown";
const len  = data?.items?.length ?? 0;
```

---

## 4. Safe work with data

### ? DO: explicit checks before operations
```js
// ? Guard clauses ? early returns instead of deep ifs
async function processOrder(order) {
  if (!order)               throw new Error("Order is required");
  if (!order.items?.length) throw new Error("Order has no items");
  if (order.status !== "pending") return { skipped: true, reason: "Not pending" };

  const result = await fulfillOrder(order);
  return { success: true, result };
}
```

### ✅ DO: secure JSON.parse
```js
// ✅ Never not trust external data
function safeParse(raw) {
  try {
    return { ok: true,  value: JSON.parse(raw) };
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
}

const { ok, value, error } = safeParse(rawInput);
if (!ok) return handleError(error);
```

### ✅ DO: Map instead of object for dynamic keys
```js
// ✅ Map — correct type for dynamic keys
const cache = new Map();
cache.set(userId, userData);
cache.has(userId);
cache.delete(userId);

// ? Object as a hash map ? issues with __proto__, toString, etc.
const cacheBad = {};
cacheBad[userId] = userData; // userId can be "__proto__"
```

### ? DO: Set for unique values
```js
// ? Unique id without manual checks
const seen = new Set();
const unique = items.filter(item => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});

// Or simply:
const uniqueIds = [...new Set(ids)];
```

---

## 5. Performance and hygiene

### ✅ DO: lazy initialization heavy objects
```js
// ? Create only on first access
class ReportService {
  #formatter = null;

  get formatter() {
    this.#formatter ??= new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" });
    return this.#formatter;
  }

  format(n) { return this.formatter.format(n); }
}
```

### ✅ DO: WeakRef / WeakMap for cache without leaks memory
```js
// ✅ GC can collect object — no leaks memory
const cache = new WeakMap();

function getMetadata(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, computeExpensiveMetadata(obj));
  }
  return cache.get(obj);
}
```

### ✅ DO: private fields classes (#)
```js
class Counter {
  #count = 0;         // ? real private field ? unavailable outside
  #step;

  constructor(step = 1) { this.#step = step; }

  increment() { this.#count += this.#step; }
  get value()  { return this.#count; }
}

// ❌ _ — only convention, not protection
class CounterBad {
  _count = 0; // available outside how obj._count
}
```

### ❌ DON'T: common anti-patterns performance
```js
// ? Creating functions inside a loop
for (const item of items) {
  item.handler = () => process(item); // new function on each iterations
}
// ✅ Extract handler outward or use closure via bind

// ? Synchronous code in hot paths without cache
function getLocale() {
  return new Intl.Locale(navigator.language); // heavy object every time
}
// ✅ Cache one times

// ❌ Deep copy via JSON there where not needed
const copy = JSON.parse(JSON.stringify(bigObject)); // slow + loses types
// ✅ structuredClone or immutability updates via spread
```

---

## 6. Patterns modules

### ? DO: named exports for utilities, default export for the main entity
```js
// ✅ Utilities — named (tree-shaking works better)
export function slugify(s)   { /* ... */ }
export function capitalize(s){ /* ... */ }

// ✅ Class/component — default
export default class UserService { /* ... */ }
```

### ? DO: use barrel files carefully (only public API)
```js
// src/domain/users/index.js — public API module
export { UserService }   from "./users.service.js";
export { UserSchema }    from "./users.schema.js";
// Do not export internal helpers
```

### ? DON'T: cyclic dependencies
```js
// ❌ a.js imports b.js, b.js imports a.js
// Result: undefined at runtime, hard to debug
// ? Extract shared logic into a third module c.js
```

### ✅ DO: dynamic import for code splitting
```js
// ✅ Loads only with need
async function generateReport(type) {
  const { render } = await import(`./reports/${type}.js`);
  return render();
}
```

---

## See also
- `dev_reference_snippets` — TDD, Express API, Zod, React, RTK, Zustand, security
- `react_beast_practices` — React-specific patterns
