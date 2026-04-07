---
name: tests-quality-review
description: Quality review of unit/integration tests — scenario coverage, boundaries, resilience, absence of flakes and test "magic". Prioritized checklist, good/bad test examples, output report template. Activate when reviewing existing tests, stabilizing flaky tests, or auditing test suite quality.
---

# Skill: Tests Quality Review

Structured quality review of tests: checklist, priorities, examples of bad → good, report template.

**Sections:**
1. [When to activate](#1-when-to-activate)
2. [Review Checklist](#2-review-checklist)
3. [Examples: bad → good](#3-examples-bad--good)
4. [Flaky tests: diagnosis](#4-flaky-tests-diagnosis)
5. [Output report template](#5-output-report-template)

---

## 1. When to activate

- REV gate — review tests as part of code review
- After TDD iteration — check the quality of newly written tests
- When stabilizing a flaky CI — find and fix fragile tests
- During a coverage audit — focus on *what* is covered, not just the percentage

---

## 2. Review Checklist

### A. Scenario Coverage (P0)

| # | Check | Verdict |
|---|---------|---------|
| A1 | Tests verify **behavior**, not implementation details | ✅/❌ |
| A2 | There is a **happy path** for every public method/component | ✅/❌ |
| A3 | There are **error paths** (invalid input, network error, empty data) | ✅/❌ |
| A4 | There are **edge cases** / boundaries (0, null, undefined, empty string, max) | ✅/❌ |
| A5 | Async logic is tested (timeouts, rejects, race conditions) | ✅/❌ |

### B. Resilience (P0)

| # | Check | Verdict |
|---|---------|---------|
| B1 | Tests are **independent** (no hidden execution order) | ✅/❌ |
| B2 | No **shared mutable state** between tests | ✅/❌ |
| B3 | Each `beforeEach` / `afterEach` correctly cleans up state | ✅/❌ |
| B4 | No dependency on **real time** (Date.now, setTimeout) | ✅/❌ |
| B5 | No dependency on **network / file system** (everything is mocked) | ✅/❌ |

### C. Test Code Quality (P1)

| # | Check | Verdict |
|---|---------|---------|
| C1 | Test names are readable: `should [verb] when [condition]` | ✅/❌ |
| C2 | AAA pattern (Arrange → Act → Assert) is clearly followed | ✅/❌ |
| C3 | No **magic numbers/strings** without explanations | ✅/❌ |
| C4 | No **duplication** (factories, helpers, shared fixtures are used) | ✅/❌ |
| C5 | Assertions are **specific** (not `toBeTruthy()`, but `toBe(true)` / `toEqual(...)`) | ✅/❌ |

### D. Integration Tests (P1)

| # | Check | Verdict |
|---|---------|---------|
| D1 | **Actually** test integration (API/DB/contracts) | ✅/❌ |
| D2 | Not "over-mocked" (mocks only on external boundaries) | ✅/❌ |
| D3 | Contract tests verify **response shape**, not business logic | ✅/❌ |
| D4 | Test data is **isolated** (no garbage from previous runs) | ✅/❌ |

### E. Snapshot Tests (P2)

| # | Check | Verdict |
|---|---------|---------|
| E1 | Snapshot is used **consciously** (for stable output) | ✅/❌ |
| E2 | Snapshot is **compact** (not 500 lines) — inline preferred | ✅/❌ |
| E3 | Snapshot update is not "auto-accept" (diff is reviewed) | ✅/❌ |

---

## 3. Examples: bad → good

### A1. Behavior vs Implementation

```js
// ❌ Tests implementation: checks that internal method is called
it('should call _processInternal', () => {
  const spy = vi.spyOn(service, '_processInternal');
  service.process(data);
  expect(spy).toHaveBeenCalled();
});

// ✅ Tests behavior: checks result
it('should return processed data with status "done"', () => {
  const result = service.process({ items: [1, 2, 3] });
  expect(result.status).toBe('done');
  expect(result.processedCount).toBe(3);
});
```

### B1. Test Independence

```js
// ❌ Test depends on previous — if first fails, second fails too
let createdId;
it('should create', () => { createdId = create(); });
it('should read', () => { read(createdId); }); // dependency!

// ✅ Each test is self-contained
it('should read created item', () => {
  const id = create({ name: 'test' });
  const item = read(id);
  expect(item.name).toBe('test');
});
```

### B4. Time Dependency

```js
// ❌ Flaky — depends on execution speed
it('should be within 1 second', () => {
  const start = Date.now();
  doWork();
  expect(Date.now() - start).toBeLessThan(1000);
});

// ✅ Mock time
it('should expire after timeout', () => {
  vi.useFakeTimers();
  const onExpire = vi.fn();

  startTimer(onExpire, 5000);
  vi.advanceTimersByTime(5000);

  expect(onExpire).toHaveBeenCalledOnce();
  vi.useRealTimers();
});
```

### C3. Magic Values

```js
// ❌ What is 42?
expect(calc(x)).toBe(42);

// ✅ Value explained
const BASE = 100;
const TAX_RATE = 0.12;
const DISCOUNT = 50;
const EXPECTED = (BASE - DISCOUNT) * (1 + TAX_RATE); // 56
expect(calcTotal(BASE, TAX_RATE, DISCOUNT)).toBe(EXPECTED);
```

### C5. Specific Assertions

```js
// ❌ toBeTruthy — undefined, 0, "" are also falsy → false negative test
expect(result).toBeTruthy();
expect(array.length).toBeTruthy(); // 0 is falsy, test will fail

// ✅ Specific assertion
expect(result).toBe(true);
expect(array).toHaveLength(3);
expect(obj).toMatchObject({ name: 'test', active: true });
```

### D2. Over-mocked integration tests

```js
// ❌ Mocked everything — this is no longer an integration test
vi.mock('../db.js');
vi.mock('../validator.js');
vi.mock('../queue.js');

it('should process order', async () => {
  db.save.mockResolvedValue({ id: 1 });
  validator.check.mockReturnValue(true);
  queue.push.mockResolvedValue(undefined);

  await processOrder({ item: 'X' });
  expect(db.save).toHaveBeenCalled(); // testing mock, not logic
});

// ✅ Mock only external boundary (HTTP), rest is real
vi.mock('../services/payment-gateway.js'); // only mock

it('should process order and save to DB', async () => {
  paymentGateway.charge.mockResolvedValue({ txnId: 'TX123' });

  const result = await processOrder({ item: 'X', amount: 100 });

  expect(result.status).toBe('completed');
  const stored = await db.orders.findById(result.id);
  expect(stored.paymentTxnId).toBe('TX123');
});
```

---

## 4. Flaky tests: diagnosis

### Common Causes

| Cause | Symptom | Fix |
|---------|--------|-------------|
| **Time dependency** | Passes/fails randomly | `vi.useFakeTimers()` |
| **Shared state** | Fails with `--shuffle` or parallel run | Isolate state in `beforeEach` |
| **External services** | Fails on slow network / offline run | Mock all HTTP |
| **Race conditions** | Occasional timeouts | `await` / `waitFor` instead of `sleep` |
| **Random data** | `Math.random()` in tests gives different results | Seed or mock random |
| **Order dependency** | Passes solo, fails in suite | Remove shared state |
| **Timer leaks** | `setTimeout` not cleared, affects next test | `afterEach(() => vi.clearAllTimers())` |

### Flaky Check

```bash
# Run test 10 times — if at least 1 failure → flaky
for i in $(seq 1 10); do npx vitest run --reporter=dot; done

# Or via Vitest repeat
npx vitest run --repeat=10
```

---

## 5. Output report template

```markdown
# Tests Quality Review Report

## Summary
- **Module/Feature:** [name]
- **Total tests:** [N]
- **Coverage:** [X]% statements, [Y]% branches
- **Verdict:** PASS ✅ / PASS with findings ⚠️ / FAIL ❌

## Findings

### P0 — Blockers
| # | Checklist item | Problem | Recommendation |
|---|----------------|---------|-------------|
| 1 | A3 (error paths) | No tests for network errors in fetchItems | Add test with reject mock |

### P1 — Important
| # | Checklist item | Problem | Recommendation |
|---|----------------|---------|-------------|
| 1 | C3 (magic) | `expect(result).toBe(42)` without explanation | Extract to const with name |

### P2 — Improvements
| # | Checklist item | Problem | Recommendation |
|---|----------------|---------|-------------|
| 1 | E2 (snapshot size) | 200 line snapshot in ProductForm.test | Switch to inline snapshot or RTL assertion |

## Missing Test Cases
- [ ] `fetchItems` — error path (network failure)
- [ ] `updateRecord` — edge case (empty name)
- [ ] `CountdownTimer` — boundary (0 seconds remaining)

## Fragile Tests
| Test | Fragility cause | Recommendation |
|------|-------------------|-------------|
| `pricing.test.js:42` | Depends on Date.now | vi.useFakeTimers |
```

---

## Verdict Criteria

| Verdict | Conditions |
|---------|---------|
| **PASS ✅** | All P0 ✅, P1 ≤ 2 findings, no flaky |
| **PASS with findings ⚠️** | All P0 ✅, but has P1 findings or missing cases | 
| **FAIL ❌** | Any P0 ❌ (no error paths, tests dependent, flaky) |

---

## See also
- `$testing-strategy-js` — strategy and patterns for writing tests
- `$code-review-checklist` — general code review checklist
- `$qa-e2e-playwright` — E2E via Playwright
- `$dev-reference-snippets` — code examples
