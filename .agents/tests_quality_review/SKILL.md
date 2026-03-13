---
name: tests_quality_review
description: Ревью качества unit/integration тестов — покрытие сценариев, границы, устойчивость, отсутствие флейков и тестовой "магии". Чеклист с приоритетами, примеры хорошего/плохого теста, шаблон выходного отчёта. Активируй при ревью существующих тестов, при стабилизации flaky тестов, или при аудите test suite quality.
---

# Skill: Tests Quality Review

Структурированное ревью качества тестов: чеклист, приоритеты, примеры плохого → хорошего, шаблон отчёта.

**Разделы:**
1. [Когда активировать](#1-когда-активировать)
2. [Чеклист ревью](#2-чеклист-ревью)
3. [Примеры: плохо → хорошо](#3-примеры-плохо--хорошо)
4. [Flaky-тесты: диагностика](#4-flaky-тесты-диагностика)
5. [Шаблон выходного отчёта](#5-шаблон-выходного-отчёта)

---

## 1. Когда активировать

- REV gate — ревью тестов как часть code review
- После TDD-итерации — проверить качество написанных тестов
- При стабилизации flaky-CI — найти и починить хрупкие тесты
- При аудите coverage — не гнаться за %, а проверить *что* покрыто

---

## 2. Чеклист ревью

### A. Покрытие сценариев (P0)

| # | Проверка | Вердикт |
|---|---------|---------|
| A1 | Тесты проверяют **поведение**, не детали реализации | ✅/❌ |
| A2 | Есть **happy path** для каждого публичного метода/компонента | ✅/❌ |
| A3 | Есть **error paths** (невалидный ввод, сетевая ошибка, пустые данные) | ✅/❌ |
| A4 | Есть **edge cases** / boundaries (0, null, undefined, пустая строка, max) | ✅/❌ |
| A5 | Async-логика протестирована (таймауты, reject, race conditions) | ✅/❌ |

### B. Устойчивость (P0)

| # | Проверка | Вердикт |
|---|---------|---------|
| B1 | Тесты **независимы** (нет скрытого порядка выполнения) | ✅/❌ |
| B2 | Нет **shared mutable state** между тестами | ✅/❌ |
| B3 | Каждый `beforeEach` / `afterEach` правильно чистит состояние | ✅/❌ |
| B4 | Нет зависимости от **реального времени** (Date.now, setTimeout) | ✅/❌ |
| B5 | Нет зависимости от **сети / файловой системы** (всё замокано) | ✅/❌ |

### C. Качество кода тестов (P1)

| # | Проверка | Вердикт |
|---|---------|---------|
| C1 | Названия тестов читаемые: `should [verb] when [condition]` | ✅/❌ |
| C2 | AAA-паттерн (Arrange → Act → Assert) явно прослеживается | ✅/❌ |
| C3 | Нет **magic numbers/strings** без пояснений | ✅/❌ |
| C4 | Нет **дублирования** (используются фабрики, хелперы, shared fixtures) | ✅/❌ |
| C5 | Assertions **конкретные** (не `toBeTruthy()`, а `toBe(true)` / `toEqual(...)`) | ✅/❌ |

### D. Интеграционные тесты (P1)

| # | Проверка | Вердикт |
|---|---------|---------|
| D1 | **Реально** проверяют интеграцию (API/DB/контракты) | ✅/❌ |
| D2 | Не «пере-моканы» (моки только на внешних границах) | ✅/❌ |
| D3 | Контрактные тесты проверяют **форму ответа**, не бизнес-логику | ✅/❌ |
| D4 | Данные тестов **изолированы** (нет мусора от предыдущих прогонов) | ✅/❌ |

### E. Snapshot-тесты (P2)

| # | Проверка | Вердикт |
|---|---------|---------|
| E1 | Snapshot используется **осознанно** (для стабильного output) | ✅/❌ |
| E2 | Snapshot **компактный** (не 500 строк) — inline preferred | ✅/❌ |
| E3 | Обновление snapshot не «авто-accept» (diff ревьюится) | ✅/❌ |

---

## 3. Примеры: плохо → хорошо

### A1. Поведение vs реализация

```js
// ❌ Тестирует реализацию: проверяет что вызван внутренний метод
it('should call _processInternal', () => {
  const spy = vi.spyOn(service, '_processInternal');
  service.process(data);
  expect(spy).toHaveBeenCalled();
});

// ✅ Тестирует поведение: проверяет результат
it('should return processed data with status "done"', () => {
  const result = service.process({ items: [1, 2, 3] });
  expect(result.status).toBe('done');
  expect(result.processedCount).toBe(3);
});
```

### B1. Независимость тестов

```js
// ❌ Тест зависит от предыдущего — если первый упадёт, второй тоже
let createdId;
it('should create', () => { createdId = create(); });
it('should read', () => { read(createdId); }); // зависимость!

// ✅ Каждый тест самодостаточен
it('should read created item', () => {
  const id = create({ name: 'test' });
  const item = read(id);
  expect(item.name).toBe('test');
});
```

### B4. Зависимость от времени

```js
// ❌ Flaky — зависит от скорости выполнения
it('should be within 1 second', () => {
  const start = Date.now();
  doWork();
  expect(Date.now() - start).toBeLessThan(1000);
});

// ✅ Мокаем время
it('should expire after timeout', () => {
  vi.useFakeTimers();
  const onExpire = vi.fn();

  startTimer(onExpire, 5000);
  vi.advanceTimersByTime(5000);

  expect(onExpire).toHaveBeenCalledOnce();
  vi.useRealTimers();
});
```

### C3. Магические значения

```js
// ❌ Что за 42?
expect(calc(x)).toBe(42);

// ✅ Значение объяснено
const BASE = 100;
const TAX_RATE = 0.12;
const DISCOUNT = 50;
const EXPECTED = (BASE - DISCOUNT) * (1 + TAX_RATE); // 56
expect(calcTotal(BASE, TAX_RATE, DISCOUNT)).toBe(EXPECTED);
```

### C5. Конкретные assertions

```js
// ❌ toBeTruthy — undefined, 0, "" тоже falsy → ложно-позитивный тест
expect(result).toBeTruthy();
expect(array.length).toBeTruthy(); // 0 — falsy, тест упадёт

// ✅ Конкретный assertion
expect(result).toBe(true);
expect(array).toHaveLength(3);
expect(obj).toMatchObject({ name: 'test', active: true });
```

### D2. Пере-моканые интеграционные тесты

```js
// ❌ Замокано всё — это уже не интеграционный тест
vi.mock('../db.js');
vi.mock('../validator.js');
vi.mock('../queue.js');

it('should process order', async () => {
  db.save.mockResolvedValue({ id: 1 });
  validator.check.mockReturnValue(true);
  queue.push.mockResolvedValue(undefined);

  await processOrder({ item: 'X' });
  expect(db.save).toHaveBeenCalled(); // проверяем мок, не логику
});

// ✅ Мокаем только внешнюю границу (HTTP), остальное — реальное
vi.mock('../services/payment-gateway.js'); // единственный мок

it('should process order and save to DB', async () => {
  paymentGateway.charge.mockResolvedValue({ txnId: 'TX123' });

  const result = await processOrder({ item: 'X', amount: 100 });

  expect(result.status).toBe('completed');
  const stored = await db.orders.findById(result.id);
  expect(stored.paymentTxnId).toBe('TX123');
});
```

---

## 4. Flaky-тесты: диагностика

### Частые причины

| Причина | Симптом | Исправление |
|---------|--------|-------------|
| **Зависимость от времени** | Проходит/падает рандомно | `vi.useFakeTimers()` |
| **Shared state** | Падает при `--shuffle` или параллельном запуске | Изолировать state в `beforeEach` |
| **Внешние сервисы** | Падает при медленной сети / запуске offline | Мокать все HTTP |
| **Race conditions** | Периодические таймауты | `await` / `waitFor` вместо `sleep` |
| **Рандомные данные** | `Math.random()` в тестах даёт разные результаты | Seed или мокать random |
| **Зависимость от порядка** | Проходит solo, падает в suite | Убрать shared state |
| **Утечки таймеров** | `setTimeout` не очищен, влияет на следующий тест | `afterEach(() => vi.clearAllTimers())` |

### Проверка на flaky

```bash
# Запустить тест 10 раз — если хотя бы 1 падение → flaky
for i in $(seq 1 10); do npx vitest run --reporter=dot; done

# Или через Vitest repeat
npx vitest run --repeat=10
```

---

## 5. Шаблон выходного отчёта

```markdown
# Tests Quality Review Report

## Summary
- **Module/Feature:** [название]
- **Total tests:** [N]
- **Coverage:** [X]% statements, [Y]% branches
- **Verdict:** PASS ✅ / PASS with findings ⚠️ / FAIL ❌

## Findings

### P0 — Блокеры
| # | Пункт чеклиста | Проблема | Рекомендация |
|---|----------------|---------|-------------|
| 1 | A3 (error paths) | Нет тестов на сетевые ошибки в fetchCoupons | Добавить тест с reject mock |

### P1 — Важные
| # | Пункт чеклиста | Проблема | Рекомендация |
|---|----------------|---------|-------------|
| 1 | C3 (magic) | `expect(result).toBe(42)` без пояснений | Вынести в const с именем |

### P2 — Улучшения
| # | Пункт чеклиста | Проблема | Рекомендация |
|---|----------------|---------|-------------|
| 1 | E2 (snapshot size) | Snapshot на 200 строк в CouponForm.test | Перейти на inline snapshot или RTL assertion |

## Missing Test Cases
- [ ] `fetchCoupons` — error path (network failure)
- [ ] `updateTemplate` — edge case (empty name)
- [ ] `TimerDisplay` — boundary (0 seconds remaining)

## Fragile Tests
| Тест | Причина хрупкости | Рекомендация |
|------|-------------------|-------------|
| `pricing.test.js:42` | Зависимость от Date.now | vi.useFakeTimers |
```

---

## Критерии вердикта

| Вердикт | Условия |
|---------|---------|
| **PASS ✅** | Все P0 ✅, P1 ≤ 2 findings, нет flaky |
| **PASS with findings ⚠️** | Все P0 ✅, но есть P1 findings или missing cases | 
| **FAIL ❌** | Любой P0 ❌ (нет error paths, тесты зависимы, flaky) |

---

## См. также
- `$testing_strategy_js` — стратегия и паттерны написания тестов
- `$code_review_checklist` — общий чеклист code review
- `$qa_e2e_playwright` — E2E через Playwright
- `$dev_reference_snippets` — примеры кода
