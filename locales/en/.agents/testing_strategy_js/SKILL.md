---
name: testing_strategy_js
description: Strategy testing for JS/TS projects — unit (Vitest), integration (API/DB), e2e (Playwright). AAA-pattern, Vitest config, React Testing Library, mocks external services, coverage thresholds, naming conventions, CI pipeline. Activate with writing new tests, refactoring existing, or with questions «how correctly test X».
---

# Skill: Testing Strategy (JS/TS)

Concrete patterns, templates and DO/DON'T for writing reliable tests.

**Sections:**
1. [Test pyramid and boundaries](#1-test-pyramid-and-boundaries)
2. [Unit-tests](#2-unit-tests)
3. [React components (RTL)](#3-react-components-rtl)
4. [Integration-tests](#4-integration-tests)
5. [Mocks and Test Doubles](#5-mocks-and-test-doubles)
6. [Naming and structure](#6-naming-and-structure)
7. [Coverage and CI](#7-coverage-and-ci)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Test pyramid

```
         ┌─────────┐
         │  E2E    │  ~5%  Playwright — critical flows
         ├─────────┤
         │ Integr. │  ~15% API routes, DB, contracts
         ├─────────┤
         │  Unit   │  ~80% Functions, hooks, components, utilities
         └─────────┘
```

| Level | What test | Tool | Speed |
|---------|----------------|-----------|---------|
| **Unit** | Clean functions, utilities, hooks, React-components | Vitest + RTL | < 5ms/test |
| **Integration** | API routes, DB-requests, contracts between module | Vitest + supertest | < 500ms/test |
| **E2E** | Login, key CRUD, payment, critical flows | Playwright | < 30s/test |

> [!IMPORTANT]
> E2E → only for critical flows. Catch everything else in unit/integration tests.
> More on E2E → `$qa_e2e_playwright`.

---

## 2. Unit-tests

### ✅ DO: AAA-pattern (Arrange → Act → Assert)

```js
import { describe, it, expect } from 'vitest';
import { calculateDiscount } from './pricing.js';

describe('calculateDiscount', () => {
  it('should apply percentage discount to base price', () => {
    // Arrange
    const basePrice = 100;
    const discountPercent = 20;

    // Act
    const result = calculateDiscount(basePrice, discountPercent);

    // Assert
    expect(result).toBe(80);
  });

  it('should clamp discount at 0 (never negative price)', () => {
    const result = calculateDiscount(50, 120);
    expect(result).toBe(0);
  });

  it('should return original price when discount is 0', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  it('should throw on negative base price', () => {
    expect(() => calculateDiscount(-10, 5)).toThrow('Price must be non-negative');
  });
});
```

### ✅ DO: test edge cases explicitly

```js
describe('parseTimerValue', () => {
  // Happy path
  it('should parse "05:30" into { minutes: 5, seconds: 30 }', () => {
    expect(parseTimerValue('05:30')).toEqual({ minutes: 5, seconds: 30 });
  });

  // Boundaries
  it('should handle "00:00" as zero timer', () => {
    expect(parseTimerValue('00:00')).toEqual({ minutes: 0, seconds: 0 });
  });

  it('should handle "99:59" as max timer', () => {
    expect(parseTimerValue('99:59')).toEqual({ minutes: 99, seconds: 59 });
  });

  // Error paths
  it('should throw on invalid format "abc"', () => {
    expect(() => parseTimerValue('abc')).toThrow();
  });

  it('should throw on seconds > 59', () => {
    expect(() => parseTimerValue('01:60')).toThrow();
  });

  // Null / undefined
  it('should throw on null input', () => {
    expect(() => parseTimerValue(null)).toThrow();
  });
});
```

### ✅ DO: test custom hooks via renderHook

```js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter.js';

describe('useCounter', () => {
  it('should initialize with default value 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  it('should not go below 0', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });
});
```

---

## 3. React-components (RTL)

### ✅ DO: test behavior, and not implementation

```js
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CouponInput } from './CouponInput.jsx';

describe('CouponInput', () => {
  it('should call onApply with coupon code when button clicked', async () => {
    const user = userEvent.setup();
    const onApply = vi.fn();

    render(<CouponInput onApply={onApply} />);

    await user.type(screen.getByRole('textbox', { name: /coupon/i }), 'SAVE20');
    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(onApply).toHaveBeenCalledWith('SAVE20');
    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('should show error message for invalid coupon', async () => {
    const user = userEvent.setup();
    render(<CouponInput onApply={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/enter a coupon/i);
  });

  it('should disable button while loading', () => {
    render(<CouponInput onApply={vi.fn()} isLoading />);

    expect(screen.getByRole('button', { name: /apply/i })).toBeDisabled();
  });
});
```

### ❌ DON'T: test details implementation

```js
// ❌ Bad: dependency from internal state
it('should set state to true', () => {
  const { result } = renderHook(() => useToggle());
  act(() => result.current[1]());
  // Verify internal state — fragile
  expect(result.current[0]).toBe(true);
});

// ✅ Well: verify behavior via DOM
it('should show content after toggle click', async () => {
  const user = userEvent.setup();
  render(<Accordion title="Details">Content</Accordion>);

  expect(screen.queryByText('Content')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /details/i }));
  expect(screen.getByText('Content')).toBeVisible();
});
```

### ✅ DO: RTL queries by priority

```js
// Priority requests (from best to worst):
// 1. getByRole     — semantic roles (better all)
// 2. getByLabelText — forms
// 3. getByText     — static text
// 4. getByTestId   — last resort

// ✅ By roles — stable against layout changes
screen.getByRole('button', { name: /save/i });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('heading', { level: 2 });

// ✅ By label — forms
screen.getByLabelText(/password/i);

// ?? By text ? less stable against i18n
screen.getByText(/no templates found/i);

// 🔧 By testid — when there is no semantics
screen.getByTestId('popup-container');
```

---

## 4. Integration-tests

### ✅ DO: API handler tests with supertest

```js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';

describe('POST /api/coupons', () => {
  let app;

  beforeAll(() => {
    app = createApp({ db: testDb });
  });

  afterAll(async () => {
    await testDb.cleanup();
  });

  it('should create coupon and return 201', async () => {
    const res = await request(app)
      .post('/api/coupons')
      .send({ code: 'SUMMER25', discount: 25, type: 'percent' })
      .expect(201);

    expect(res.body).toMatchObject({
      code: 'SUMMER25',
      discount: 25,
      type: 'percent',
    });
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('createdAt');
  });

  it('should reject duplicate coupon code with 409', async () => {
    await request(app)
      .post('/api/coupons')
      .send({ code: 'UNIQUE1', discount: 10, type: 'percent' });

    await request(app)
      .post('/api/coupons')
      .send({ code: 'UNIQUE1', discount: 20, type: 'percent' })
      .expect(409);
  });

  it('should reject invalid discount with 400 and error details', async () => {
    const res = await request(app)
      .post('/api/coupons')
      .send({ code: 'BAD', discount: -5, type: 'percent' })
      .expect(400);

    expect(res.body.error).toMatch(/discount/i);
  });
});
```

### ✅ DO: contract tests (verify response shape, not business logic)

```js
describe('GET /api/templates', () => {
  it('should match API contract shape', async () => {
    const res = await request(app)
      .get('/api/templates')
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          category: expect.any(String),
          thumbnail: expect.stringMatching(/^https?:\/\//),
        }),
      ])
    );
  });
});
```

---

## 5. Mocks and Test Doubles

### ✅ DO: mock external boundaries, not internal logic

```js
// ✅ We mock external HTTP API
vi.mock('../services/openai.js', () => ({
  generateText: vi.fn().mockResolvedValue('Mocked AI response'),
}));

// ✅ We mock timers
import { vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it('should expire coupon after timeout', () => {
  const onExpire = vi.fn();
  startCouponTimer(onExpire, 5000);

  vi.advanceTimersByTime(5000);

  expect(onExpire).toHaveBeenCalledOnce();
});
```

### ✅ DO: test data factories instead of hardcode

```js
// test-utils/factories.js

/**
 * Creates a test coupon object with override capability.
 * @param {Partial<Coupon>} overrides - fields for overrides.
 * @returns {Coupon} test coupon.
 */
function createCoupon(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    code: 'TEST10',
    discount: 10,
    type: 'percent',
    active: true,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

// Usage in tests:
it('should deactivate expired coupon', () => {
  const coupon = createCoupon({ active: true, expiresAt: '2024-01-01' });
  const result = deactivateExpired(coupon);
  expect(result.active).toBe(false);
});
```

### ❌ DON'T: excessive mocks

```js
// ❌ Mocked everything — test nothing not checks
vi.mock('../db.js');
vi.mock('../validator.js');
vi.mock('../logger.js');
vi.mock('../event-bus.js');

it('should save coupon', async () => {
  db.save.mockResolvedValue({ id: 1 });
  validator.validate.mockReturnValue(true);

  await saveCoupon({ code: 'X' });

  expect(db.save).toHaveBeenCalled(); // we verify mocks, not logic
});

// ✅ Integration test checks real flow
it('should save valid coupon to DB', async () => {
  const result = await saveCoupon({ code: 'REAL', discount: 10, type: 'percent' });
  expect(result.id).toBeDefined();

  const stored = await db.findById(result.id);
  expect(stored.code).toBe('REAL');
});
```

### What mock, and what no

| Mock ✅ | Not mock ❌ |
|----------|-------------|
| HTTP API (fetch, axios) | Own utilities |
| External services (OpenAI, Stripe, Redis) | Simple data transformations |
| timers (setTimeout, setInterval) | Router / navigation (if not E2E) |
| File system (fs) | Internal module (integration meaning is lost) |
| crypto.randomUUID (determinism) | — |

---

## 6. Naming and structure

### Organization files

```
src/
├── utils/
│   ├── pricing.js
│   └── pricing.test.js          # Unit — near with code
├── hooks/
│   ├── useTimer.js
│   └── useTimer.test.js         # Unit — near with code
├── components/
│   ├── CouponInput.jsx
│   └── CouponInput.test.jsx     # RTL — near the component
├── api/
│   ├── coupons.handler.js
│   └── coupons.integration.test.js  # Integration — near the route
└── e2e/                          # E2E — separate folder
    └── specs/
```

### ✅ DO: describe/it naming convention

```js
// Format: describe('[Unit/Module]') → it('should [ACTION] when [CONDITION]')
describe('CouponValidator', () => {
  describe('validate', () => {
    it('should return valid for correct coupon code', () => { /* ... */ });
    it('should return invalid when code is empty', () => { /* ... */ });
    it('should return invalid when discount exceeds 100%', () => { /* ... */ });
  });

  describe('isExpired', () => {
    it('should return true when expiresAt is in the past', () => { /* ... */ });
    it('should return false when expiresAt is in the future', () => { /* ... */ });
    it('should return false when expiresAt is null (never expires)', () => { /* ... */ });
  });
});
```

### Checklist for each tested module

- [ ] Happy path (main scenario)
- [ ] Edge cases (0, null, undefined, empty string, empty array)
- [ ] Boundaries (min/max values)
- [ ] Error paths (invalid input, network errors)
- [ ] Async (timeouts, race conditions — if applicable)

---

## 7. Coverage and CI

### Vitest config

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.*',
        'src/**/*.spec.*',
        'src/**/index.{js,ts}',     // barrel files
        'src/test-utils/**',
        'src/**/*.d.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
  },
});
```

### Setup file

```js
// src/test-setup.js
import '@testing-library/jest-dom/vitest';

// Global cleanup (RTL >= v14 does this automatically)
// import { cleanup } from '@testing-library/react';
// afterEach(cleanup);
```

### Coverage thresholds

| Metric | Minimum | Comfortable | excellent |
|---------|---------|---------|---------|
| Statements | 70% | 80% | 90%+ |
| Branches | 65% | 75% | 85%+ |
| Functions | 70% | 80% | 90%+ |
| Lines | 70% | 80% | 90%+ |

### Scripts in package.json

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## 8. Anti-patterns

### ❌ DON'T: tests depend from order execution

```js
// ❌ Bad: second test depends from first
let sharedState;

it('should create item', () => {
  sharedState = createItem({ name: 'test' });
  expect(sharedState.id).toBeDefined();
});

it('should update item', () => {
  updateItem(sharedState.id, { name: 'updated' }); // sharedState from previous test
});

// ✅ Well: each test creates own data
it('should update item', () => {
  const item = createItem({ name: 'test' });
  const updated = updateItem(item.id, { name: 'updated' });
  expect(updated.name).toBe('updated');
});
```

### ❌ DON'T: snapshot-tests without intentional thinking

```js
// ? Meaningless snapshot ? any change breaks the test
it('renders correctly', () => {
  const { container } = render(<ComplexForm />);
  expect(container).toMatchSnapshot(); // 500-line snapshot, nobody reviews it
});

// ✅ Snapshot only for stable output
it('should render error boundary fallback', () => {
  const { container } = render(<ErrorFallback error={new Error('Oops')} />);
  expect(container).toMatchInlineSnapshot(`
    <div class="error-fallback">
      <p>Something went wrong: Oops</p>
    </div>
  `);
});
```

### ❌ DON'T: «magic» values without explanations

```js
// ❌ What for 42? Why 3?
expect(result).toBe(42);
expect(items).toHaveLength(3);

// ? Values are clear from context
const BASE_PRICE = 100;
const DISCOUNT = 58;  // 58% discount
const EXPECTED_PRICE = 42; // 100 - 58

expect(calculatePrice(BASE_PRICE, DISCOUNT)).toBe(EXPECTED_PRICE);
```

### ❌ DON'T: async without await

```js
// ❌ Test passes always — assertion not execution
it('should fetch data', () => {
  fetchData().then(data => {
    expect(data).toBeDefined(); // never not execution how assertion
  });
});

// ✅ Correctly: await + async
it('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

---

## Definition of Done (tests for module)

- [ ] Happy path coverage
- [ ] ≥ 2 edge case / boundary
- [ ] ≥ 1 error path
- [ ] Names `should [verb] when [condition]`
- [ ] No dependencies between tests
- [ ] Factories for test data (if repeat)
- [ ] Coverage ≥ 80% statements
- [ ] No `any`, no `// @ts-ignore` in tests

---

## See also
- `$tests_quality_review` — review quality tests
- `$qa_e2e_playwright` — E2E via Playwright
- `$qa_browser_testing` — visual testing in Antigravity
- `$es2025_beast_practices` — modern JS for writing clean code
- `$dev_reference_snippets` — TDD, React, API examples
