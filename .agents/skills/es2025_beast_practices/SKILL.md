---
name: es2025_beast_practices
description: Современный JavaScript (ES2025) с упором на читаемость, предсказуемость и безопасность. Используй этот скилл при написании или ревью любого JS/TS кода — особенно при работе с async/await, обработкой ошибок, деструктуризацией, иммутабельностью, новыми API (Promise.withResolvers, Iterator helpers, Object.groupBy, using/Symbol.dispose) и оптимизацией производительности. Активируй при вопросах «как правильно написать X на современном JS» или «что не так с этим кодом».
---

# Skill: ES2025 Beast Practices

Конкретные DO/DON'T паттерны для современного JavaScript без магии и сюрпризов.

**Разделы:**
1. [Async/Await и обработка ошибок](#1-asyncawait)
2. [Новые API ES2022–ES2025](#2-новые-api)
3. [Деструктуризация и иммутабельность](#3-деструктуризация-и-иммутабельность)
4. [Безопасная работа с данными](#4-безопасная-работа-с-данными)
5. [Производительность и гигиена](#5-производительность-и-гигиена)
6. [Паттерны модулей](#6-паттерны-модулей)

---

## 1. Async/Await

### ✅ DO: ранний возврат + контекстные ошибки
```js
// Каждый слой добавляет контекст к ошибке — легко трассировать
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

### ✅ DO: параллельные запросы через Promise.all
```js
// ✅ Параллельно — оба запроса стартуют одновременно
async function getDashboardData(userId) {
  const [user, stats] = await Promise.all([
    fetchUser(userId),
    fetchStats(userId),
  ]);
  return { user, stats };
}

// ❌ Последовательно — stats ждёт user без причины (лишние ~200ms)
async function getDashboardDataSlow(userId) {
  const user  = await fetchUser(userId);
  const stats = await fetchStats(userId);
  return { user, stats };
}
```

### ✅ DO: Promise.allSettled когда частичный результат приемлем
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

### ✅ DO: Promise.withResolvers (ES2024) вместо ручного new Promise
```js
// ✅ Чисто: resolve/reject вынесены наружу без обёртки
function makeDeferred() {
  const { promise, resolve, reject } = Promise.withResolvers();
  return { promise, resolve, reject };
}

// Использование: ожидание внешнего события
const { promise, resolve } = Promise.withResolvers();
someEmitter.once("ready", resolve);
await promise;

// ❌ Старый способ: вложенный конструктор, resolve/reject "утекают" в замыкание
function makeDeferredOld() {
  let resolve, reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
```

### ✅ DO: AbortController для отменяемых запросов
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

### ❌ DON'T: игнорировать ошибки / floating promises
```js
// ❌ Плохо: ошибка молча проглатывается
async function saveData(data) {
  db.save(data); // нет await, нет catch
}

// ❌ Плохо: catch без действия
fetchUser(id).catch(() => {}); // ошибка исчезает в никуда

// ❌ Плохо: async в forEach — не ждёт завершения
items.forEach(async item => {
  await process(item); // forEach не ждёт promise
});

// ✅ Правильно:
await Promise.all(items.map(item => process(item)));
```

---

## 2. Новые API

### ✅ DO: Object.groupBy (ES2024)
```js
const orders = [
  { id: 1, status: "pending", amount: 100 },
  { id: 2, status: "done",    amount: 200 },
  { id: 3, status: "pending", amount: 50  },
];

// ✅ Чисто и читаемо
const byStatus = Object.groupBy(orders, o => o.status);
// { pending: [{...}, {...}], done: [{...}] }

// ❌ Раньше приходилось вручную:
const byStatusOld = orders.reduce((acc, o) => {
  (acc[o.status] ??= []).push(o);
  return acc;
}, {});
```

### ✅ DO: Iterator helpers (ES2025)
```js
// ✅ Ленивая цепочка без промежуточных массивов
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .values()
  .filter(n => n % 2 === 0)  // ленивый filter
  .map(n => n * n)            // ленивый map
  .take(3)                    // первые 3
  .toArray();                 // [4, 16, 36]

// ❌ Раньше: создавались промежуточные массивы на каждом шаге
const resultOld = [1,2,3,4,5,6,7,8,9,10]
  .filter(n => n % 2 === 0)  // новый массив
  .map(n => n * n)            // ещё новый массив
  .slice(0, 3);               // ещё один
```

### ✅ DO: using / Symbol.dispose (ES2024) для ресурсов
```js
// ✅ Гарантированная очистка ресурса при выходе из блока
function getDbConnection() {
  const conn = db.connect();
  return {
    query: (sql) => conn.query(sql),
    [Symbol.dispose]: () => conn.close(), // вызовется автоматически
  };
}

async function processData() {
  using conn = getDbConnection(); // закроется при выходе из блока
  const rows = await conn.query("SELECT * FROM users");
  return rows;
} // conn[Symbol.dispose]() вызван здесь автоматически

// ✅ Async dispose
function getFileHandle(path) {
  const fh = await fs.open(path);
  return {
    read: () => fh.read(),
    [Symbol.asyncDispose]: () => fh.close(),
  };
}
```

### ✅ DO: Array.at() для доступа с конца
```js
const items = [1, 2, 3, 4, 5];

// ✅ Читаемо
const last    = items.at(-1);  // 5
const preLast = items.at(-2);  // 4

// ❌ Старый способ — шумно
const lastOld = items[items.length - 1];
```

### ✅ DO: structuredClone для глубокого копирования
```js
// ✅ Встроенный deep clone — безопасен, обрабатывает Date, Map, Set
const original = { user: { name: "Alice", tags: ["admin"] }, createdAt: new Date() };
const clone = structuredClone(original);

// ❌ JSON.parse(JSON.stringify(...)) — теряет Date, undefined, Map, Set, функции
const badClone = JSON.parse(JSON.stringify(original)); // createdAt превратится в string
```

---

## 3. Деструктуризация и иммутабельность

### ✅ DO: деструктуризация с дефолтами и переименованием
```js
// ✅ Переименование + дефолт
function createUser({ name, role = "user", email: userEmail }) {
  return { name, role, email: userEmail };
}

// ✅ Вложенная деструктуризация
const { address: { city, zip = "000000" } = {} } = user;

// ✅ Rest в объектах (spread остатка)
const { password, ...safeUser } = user; // убрать чувствительное поле
```

### ✅ DO: иммутабельные обновления
```js
// ✅ Обновление вложенного поля без мутации
const updatedUser = {
  ...user,
  address: { ...user.address, city: "Moscow" },
};

// ✅ Иммутабельное обновление массива
const withNewItem   = [...items, newItem];
const withoutItem   = items.filter(i => i.id !== targetId);
const withUpdated   = items.map(i => i.id === targetId ? { ...i, done: true } : i);

// ❌ Мутация — порождает баги в React/Redux и неявные зависимости
user.address.city = "Moscow";     // мутация
items.push(newItem);              // мутация
```

### ✅ DO: nullish coalescing и optional chaining
```js
// ✅ ?? — только null/undefined, не 0 и ""
const port    = config.port ?? 3000;       // 0 останется 0
const timeout = options.timeout ?? 5000;

// ❌ || — перекрывает falsy значения (0, "")
const portBad = config.port || 3000;       // 0 превратится в 3000

// ✅ ?. — безопасный доступ к цепочке
const city = user?.address?.city ?? "Unknown";
const len  = data?.items?.length ?? 0;
```

---

## 4. Безопасная работа с данными

### ✅ DO: явные проверки перед операциями
```js
// ✅ Guard clauses — ранние возвраты вместо глубоких if
async function processOrder(order) {
  if (!order)               throw new Error("Order is required");
  if (!order.items?.length) throw new Error("Order has no items");
  if (order.status !== "pending") return { skipped: true, reason: "Not pending" };

  const result = await fulfillOrder(order);
  return { success: true, result };
}
```

### ✅ DO: безопасный JSON.parse
```js
// ✅ Никогда не доверять внешним данным
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

### ✅ DO: Map вместо объекта для динамических ключей
```js
// ✅ Map — правильный тип для динамических ключей
const cache = new Map();
cache.set(userId, userData);
cache.has(userId);
cache.delete(userId);

// ❌ Объект как хэш-мап — проблемы с __proto__, toString и т.д.
const cacheBad = {};
cacheBad[userId] = userData; // userId может быть "__proto__"
```

### ✅ DO: Set для уникальных значений
```js
// ✅ Уникальные id без ручных проверок
const seen = new Set();
const unique = items.filter(item => {
  if (seen.has(item.id)) return false;
  seen.add(item.id);
  return true;
});

// Или просто:
const uniqueIds = [...new Set(ids)];
```

---

## 5. Производительность и гигиена

### ✅ DO: ленивая инициализация тяжёлых объектов
```js
// ✅ Создаётся только при первом обращении
class ReportService {
  #formatter = null;

  get formatter() {
    this.#formatter ??= new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" });
    return this.#formatter;
  }

  format(n) { return this.formatter.format(n); }
}
```

### ✅ DO: WeakRef / WeakMap для кэша без утечек памяти
```js
// ✅ GC может собрать объект — нет утечки памяти
const cache = new WeakMap();

function getMetadata(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, computeExpensiveMetadata(obj));
  }
  return cache.get(obj);
}
```

### ✅ DO: private поля классов (#)
```js
class Counter {
  #count = 0;         // ✅ настоящий private — недоступен снаружи
  #step;

  constructor(step = 1) { this.#step = step; }

  increment() { this.#count += this.#step; }
  get value()  { return this.#count; }
}

// ❌ _ — только конвенция, не защита
class CounterBad {
  _count = 0; // доступен снаружи как obj._count
}
```

### ❌ DON'T: частые антипаттерны производительности
```js
// ❌ Создание функции внутри цикла
for (const item of items) {
  item.handler = () => process(item); // новая функция на каждой итерации
}
// ✅ Вынести handler наружу или использовать замыкание через bind

// ❌ Синхронный код в горячем пути без кэширования
function getLocale() {
  return new Intl.Locale(navigator.language); // тяжёлый объект каждый раз
}
// ✅ Кэшировать один раз

// ❌ Глубокое копирование через JSON там где не нужно
const copy = JSON.parse(JSON.stringify(bigObject)); // медленно + теряет типы
// ✅ structuredClone или иммутабельные обновления через spread
```

---

## 6. Паттерны модулей

### ✅ DO: именованные экспорты для утилит, default для главной сущности
```js
// ✅ Утилиты — именованные (tree-shaking работает лучше)
export function slugify(s)   { /* ... */ }
export function capitalize(s){ /* ... */ }

// ✅ Класс/компонент — default
export default class UserService { /* ... */ }
```

### ✅ DO: barrel-файлы с умом (только публичное API)
```js
// src/domain/users/index.js — публичное API модуля
export { UserService }   from "./users.service.js";
export { UserSchema }    from "./users.schema.js";
// НЕ экспортируем внутренние хелперы
```

### ❌ DON'T: циклические зависимости
```js
// ❌ a.js импортирует b.js, b.js импортирует a.js
// Итог: undefined в рантайме, трудно отлаживать
// ✅ Вынести общую логику в третий модуль c.js
```

### ✅ DO: динамический import для code splitting
```js
// ✅ Загружается только при необходимости
async function generateReport(type) {
  const { render } = await import(`./reports/${type}.js`);
  return render();
}
```

---

## См. также
- `dev_reference_snippets` — TDD, Express API, Zod, React, RTK, Zustand, безопасность
- `react_beast_practices` — React-специфичные паттерны
