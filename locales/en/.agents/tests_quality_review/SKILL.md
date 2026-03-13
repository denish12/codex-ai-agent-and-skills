---
name: tests_quality_review
description: Review the quality of unit/integration tests ? scenario coverage, boundaries, stability, absence of flaky behavior and test "magic". Checklist with priorities, good/bad test examples, output report template. Activate when reviewing existing tests, stabilizing flaky tests, or auditing test suite quality.
---

# Skill: Tests Quality Review

Structured review of test quality: checklist, priorities, bad ? good examples, report template.

**Sections:**
1. [When to activate](#1-when-to-activate)
2. [Review checklist](#2-review-checklist)
3. [Examples: bad ? good](#3-examples-bad--good)
4. [Flaky tests: diagnostics](#4-flaky-tests-diagnostics)
5. [Output report template](#5-output-report-template)

---

## 1. When to activate

- REV gate ? review tests as part of code review
- After TDD-iterations — check quality write tests
- When stabilizing flaky CI ? find and fix fragile tests
- During coverage audit ? do not chase %, check *what* is covered

---

## 2. Checklist review

### A. Coverage scenarios (P0)

| # | Check | Verdict |
|---|---------|---------|
| A1 | Tests check **behavior**, not details implementation | ✅/❌ |
| A2 | There is a **happy path** for each public method/component | ?/? |
| A3 | There is **error paths** (invalid input, network error, empty data) | ✅/❌ |
| A4 | There are **edge cases** / boundaries (0, null, undefined, empty string, max) | ?/? |
| A5 | Async logic is tested (timeouts, reject, race conditions) | ?/? |

### B. Stability (P0)

| # | Check | Verdict |
|---|---------|---------|
| B1 | Tests are **independent** (no hidden execution order) | ?/? |
| B2 | No **shared mutable state** between tests | ✅/❌ |
| B3 | Each `beforeEach` / `afterEach` correctly clean state | ✅/❌ |
| B4 | No dependencies from **real time** (Date.now, setTimeout) | ✅/❌ |
| B5 | No dependencies on **network / file systems** (everything mocked) | ?/? |

### C. Quality code tests (P1)

| # | Check | Verdict |
|---|---------|---------|
| C1 | Test names are readable: `should [verb] when [condition]` | ?/? |
| C2 | AAA pattern (Arrange ? Act ? Assert) is explicitly visible | ?/? |
| C3 | No **magic numbers/strings** without explanations | ✅/❌ |
| C4 | No **duplication** (use factories, helpers, shared fixtures) | ✅/❌ |
| C5 | Assertions **concrete** (not `toBeTruthy()`, and `toBe(true)` / `toEqual(...)`) | ✅/❌ |

### D. Integration tests (P1)

| # | Check | Verdict |
|---|---------|---------|
| D1 | **Really** check integration (API/DB/contracts) | ✅/❌ |
| D2 | Not **over-mocked** (mocks only at external boundaries) | ?/? |
| D3 | Contract tests check **response shape**, not business logic | ?/? |
| D4 | Test data is **isolated** (no garbage from previous runs) | ?/? |

### E. Snapshot-tests (P2)

| # | Check | Verdict |
|---|---------|---------|
| E1 | Snapshots are used **intentionally** (for stable output) | ?/? |
| E2 | Snapshot is **compact** (not 500 lines) ? inline preferred | ?/? |
| E3 | Snapshot updates are not **auto-accepted** (diff is reviewed) | ?/? |

---

## 3. Examples: bad → well

### A1. Behavior vs implementation

```js
// ? Tests the implementation: checks what caused the internal method call
it('should call _processInternal', () => {
  const spy = vi.spyOn(service, '_processInternal');
  service.process(data);
  expect(spy).toHaveBeenCalled();
});

// ? Tests behavior: checks the result
it('should return processed data with status "done"', () => {
  const result = service.process({ items: [1, 2, 3] });
  expect(result.status).toBe('done');
  expect(result.processedCount).toBe(3);
});
```

### B1. Test independence

```js
// ? Test depends on the previous one ? if the first fails, the second also fails
let createdId;
it('should create', () => { createdId = create(); });
it('should read', () => { read(createdId); }); // dependency!

// ? Each test is self-contained
it('should read created item', () => {
  const id = create({ name: 'test' });
  const item = read(id);
  expect(item.name).toBe('test');
});
```

### B4. Dependency from time

```js
// ? Flaky ? depends on execution speed
it('should be within 1 second', () => {
  const start = Date.now();
  doWork();
  expect(Date.now() - start).toBeLessThan(1000);
});

// ✅ We mock time
it('should expire after timeout', () => {
  vi.useFakeTimers();
  const onExpire = vi.fn();

  startTimer(onExpire, 5000);
  vi.advanceTimersByTime(5000);

  expect(onExpire).toHaveBeenCalledOnce();
  vi.useRealTimers();
});
```

### C3. Magic values

```js
// ❌ What for 42?
expect(calc(x)).toBe(42);

// ? Meaning is explained
const BASE = 100;
const TAX_RATE = 0.12;
const DISCOUNT = 50;
const EXPECTED = (BASE - DISCOUNT) * (1 + TAX_RATE); // 56
expect(calcTotal(BASE, TAX_RATE, DISCOUNT)).toBe(EXPECTED);
```

### C5. Concrete assertions

```js
// ? toBeTruthy ? undefined, 0, "" are also falsy ? false-positive test
expect(result).toBeTruthy();
expect(array.length).toBeTruthy(); // 0 is falsy, the test fails

// ✅ Specific assertion
expect(result).toBe(true);
expect(array).toHaveLength(3);
expect(obj).toMatchObject({ name: 'test', active: true });
```

### D2. Over-mocked integration tests

```js
// ? Everything is mocked ? this is no longer an integration test
vi.mock('../db.js');
vi.mock('../validator.js');
vi.mock('../queue.js');

it('should process order', async () => {
  db.save.mockResolvedValue({ id: 1 });
  validator.check.mockReturnValue(true);
  queue.push.mockResolvedValue(undefined);

  await processOrder({ item: 'X' });
  expect(db.save).toHaveBeenCalled(); // verify mock, not logic
});

// ? We mock only the external boundary (HTTP), the rest is real
vi.mock('../services/payment-gateway.js'); // single mock

it('should process order and save to DB', async () => {
  paymentGateway.charge.mockResolvedValue({ txnId: 'TX123' });

  const result = await processOrder({ item: 'X', amount: 100 });

  expect(result.status).toBe('completed');
  const stored = await db.orders.findById(result.id);
  expect(stored.paymentTxnId).toBe('TX123');
});
```

---

## 4. Flaky-tests: diagnostics

### Common reasons

| Cause | symptom | Fix |
|---------|--------|-------------|
| **Dependency on time** | Passes/fails randomly | `vi.useFakeTimers()` |
| **Shared state** | Fails with `--shuffle` or parallel startup | Isolated state in `beforeEach` |
| **External services** | Fails with slow network / offline startup | Mock all HTTP |
| **Race conditions** | Periodic timeouts | `await` / `waitFor` instead of `sleep` |
| **Random data** | `Math.random()` in tests gives different results | Seed or mock random |
| **Dependency from order** | Passes solo, fails in suite | Remove shared state |
| **Timer leaks** | `setTimeout` is not cleared, affects the next test | `afterEach(() => vi.clearAllTimers())` |

### Check on flaky

```bash
# Run the test 10 times ? if there is even 1 failure ? flaky
for i in $(seq 1 10); do npx vitest run --reporter=dot; done

# Or via Vitest repeat
npx vitest run --repeat=10
```

---

## 5. Template output report

```markdown
# Tests Quality Review Report

## Summary
- **Module/Feature:** [title]
- **Total tests:** [N]
- **Coverage:** [X]% statements, [Y]% branches
- **Verdict:** PASS ✅ / PASS with findings ⚠️ / FAIL ❌

## Findings

### P0 — Blockers
| # | Item checklist | Problem | Recommendation |
|---|----------------|---------|-------------|
| 1 | A3 (error paths) | No tests on network errors in fetchCoupons | Add test with reject mock |

### P1 — Important
| # | Item checklist | Problem | Recommendation |
|---|----------------|---------|-------------|
| 1 | C3 (magic) | `expect(result).toBe(42)` without explanation | Extract into a named constant |

### P2 — Improvements
| # | Item checklist | Problem | Recommendation |
|---|----------------|---------|-------------|
| 1 | E2 (snapshot size) | 200-line snapshot in CouponForm.test | Switch to inline snapshot or RTL assertion |

## Missing Test Cases
- [ ] `fetchCoupons` — error path (network failure)
- [ ] `updateTemplate` — edge case (empty name)
- [ ] `TimerDisplay` — boundary (0 seconds remaining)

## Fragile Tests
| Test | Cause fragile | Recommendation |
|------|-------------------|-------------|
| `pricing.test.js:42` | Dependency from Date.now | vi.useFakeTimers |
```

---

## Verdict criteria

| Verdict | Conditions |
|---------|---------|
| **PASS ✅** | All P0 ✅, P1 ≤ 2 findings, no flaky |
| **PASS with findings ⚠️** | All P0 ✅, but there is P1 findings or missing cases | 
| **FAIL ?** | Any P0 ? (no error paths, tests are dependent, flaky) |

---

## See also
- `$testing_strategy_js` — strategy and patterns writing tests
- `$code_review_checklist` ? general code review checklist
- `$qa_e2e_playwright` — E2E via Playwright
- `$dev_reference_snippets` — examples code
