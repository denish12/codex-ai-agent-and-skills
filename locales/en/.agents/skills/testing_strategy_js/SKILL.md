---
name: testing_strategy_js
description: Testing strategy for JS/TS projects — unit (Vitest), integration (API/DB), e2e (Playwright). AAA pattern, Vitest config, React Testing Library, mocks of external services, coverage thresholds, naming conventions, CI pipeline. Activate when writing new tests, refactoring existing ones, or for questions "how to properly test X".
---

# Skill: Testing Strategy (JS/TS)

Specific patterns, templates and DO/DON'T for writing reliable tests.

**Sections:**
1. [Test Pyramid and Boundaries](#1-test-pyramid)
2. [Unit Tests](#2-unit-tests)
3. [React Components (RTL)](#3-react-components-rtl)
4. [Integration Tests](#4-integration-tests)
5. [Mocks and Test Doubles](#5-mocks-and-test-doubles)
6. [Naming and Structure](#6-naming-and-structure)
7. [Coverage and CI](#7-coverage-and-ci)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Test Pyramid

```
         ┌─────────┐
         │  E2E    │  ~5%  Playwright — critical flows
         ├─────────┤
         │ Integr. │  ~15% API routes, DB, contracts
         ├─────────┤
         │  Unit   │  ~80% Functions, hooks, components, utilities
         └─────────┘
```

| Level | What to test | Tool | Speed |
|---------|----------------|-----------|---------|
| **Unit** | Pure functions, utilities, hooks, React components | Vitest + RTL | < 5ms/test |
| **Integration** | API routes, DB queries, contracts between modules | Vitest + supertest | < 500ms/test |
| **E2E** | Login, core CRUD, payment, critical flows | Playwright | < 30s/test |

> [!IMPORTANT]
> E2E → only for critical flows. Catch everything else on unit/integration.
> More details on E2E → `$qa_e2e_playwright`.

---

## 2. Unit Tests

### ✅ DO: AAA pattern (Arrange → Act → Assert)

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

## 3. React Components (RTL)

### ✅ DO: test behavior, not implementation

```js
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput.jsx';

describe('SearchInput', () => {
  it('should call onSearch with query when button clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchInput onSearch={onSearch} />);

    await user.type(screen.getByRole('textbox', { name: /search/i }), 'laptop');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith('laptop');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('should show error message for empty query', async () => {
    const user = userEvent.setup();
    render(<SearchInput onSearch={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/enter a query/i);
  });

  it('should disable button while loading', () => {
    render(<SearchInput onSearch={vi.fn()} isLoading />);

    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });
});
```

### ❌ DON'T: test implementation details

```js
// ❌ Bad: dependence on internal state
it('should set state to true', () => {
  const { result } = renderHook(() => useToggle());
  act(() => result.current[1]());
  // Checking internal state — fragile
  expect(result.current[0]).toBe(true);
});

// ✅ Good: verifying behavior via DOM
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
// Query priority (from best to worst):
// 1. getByRole     — semantic roles (best of all)
// 2. getByLabelText — forms
// 3. getByText     — static text
// 4. getByTestId   — last resort

// ✅ By role — resilient to layout changes
screen.getByRole('button', { name: /save/i });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('heading', { level: 2 });

// ✅ By label — forms
screen.getByLabelText(/password/i);

// ⚠️ By text — less resilient to i18n
screen.getByText(/no templates found/i);

// 🔧 By testid — when there is no semantics
screen.getByTestId('popup-container');
```

---

## 4. Integration Tests

### ✅ DO: API handler tests with supertest

```js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';

describe('POST /api/products', () => {
  let app;

  beforeAll(() => {
    app = createApp({ db: testDb });
  });

  afterAll(async () => {
    await testDb.cleanup();
  });

  it('should create product and return 201', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Summer Hat', price: 25, category: 'accessories' })
      .expect(201);

    expect(res.body).toMatchObject({
      name: 'Summer Hat',
      price: 25,
      category: 'accessories',
    });
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('createdAt');
  });

  it('should reject duplicate product name with 409', async () => {
    await request(app)
      .post('/api/products')
      .send({ name: 'Unique Widget', price: 10, category: 'tools' });

    await request(app)
      .post('/api/products')
      .send({ name: 'Unique Widget', price: 20, category: 'tools' })
      .expect(409);
  });

  it('should reject invalid price with 400 and error details', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Bad Item', price: -5, category: 'tools' })
      .expect(400);

    expect(res.body.error).toMatch(/price/i);
  });
});
```

### ✅ DO: tests for contracts (verify response shape, not business logic)

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
// ✅ Mocking external HTTP API
vi.mock('../services/openai.js', () => ({
  generateText: vi.fn().mockResolvedValue('Mocked AI response'),
}));

// ✅ Mocking timers
import { vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it('should expire item after timeout', () => {
  const onExpire = vi.fn();
  startTimer(onExpire, 5000);

  vi.advanceTimersByTime(5000);

  expect(onExpire).toHaveBeenCalledOnce();
});
```

### ✅ DO: test data factories instead of hardcode

```js
// test-utils/factories.js

/**
 * Creates a test product object with override capability.
 * @param {Partial<Product>} overrides - fields to override.
 * @returns {Product} test product.
 */
function createProduct(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    name: 'Test Product',
    price: 29.99,
    category: 'widgets',
    active: true,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

// Usage in tests:
it('should deactivate expired product', () => {
  const product = createProduct({ active: true, expiresAt: '2024-01-01' });
  const result = deactivateExpired(product);
  expect(result.active).toBe(false);
});
```

### ❌ DON'T: excessive mocks

```js
// ❌ Mocked everything — the test verifies nothing
vi.mock('../db.js');
vi.mock('../validator.js');
vi.mock('../logger.js');
vi.mock('../event-bus.js');

it('should save product', async () => {
  db.save.mockResolvedValue({ id: 1 });
  validator.validate.mockReturnValue(true);

  await saveProduct({ name: 'Widget' });

  expect(db.save).toHaveBeenCalled(); // we are testing mocks, not logic
});

// ✅ Integration test verifies the real flow
it('should save valid product to DB', async () => {
  const result = await saveProduct({ name: 'Premium Widget', price: 29.99, category: 'digital' });
  expect(result.id).toBeDefined();

  const stored = await db.findById(result.id);
  expect(stored.name).toBe('Premium Widget');
});
```

### What to mock, and what not to

| Mock ✅ | DO NOT mock ❌ |
|----------|-------------|
| HTTP API (fetch, axios) | Own utilities |
| External services (OpenAI, Stripe, Redis) | Simple data transformations |
| Timers (setTimeout, setInterval) | Router / navigation (if not E2E) |
| File system (fs) | Internal modules (meaning of integration is lost) |
| crypto.randomUUID (determinism) | — |

---

## 6. Naming and Structure

### File organization

```
src/
├── utils/
│   ├── pricing.js
│   └── pricing.test.js          # Unit — next to code
├── hooks/
│   ├── useTimer.js
│   └── useTimer.test.js         # Unit — next to code
├── components/
│   ├── SearchInput.jsx
│   └── SearchInput.test.jsx     # RTL — next to component
├── api/
│   ├── products.handler.js
│   └── products.integration.test.js  # Integration — next to route
└── e2e/                          # E2E — separate folder
    └── specs/
```

### ✅ DO: describe/it naming convention

```js
// Format: describe('[Unit/Module]') → it('should [ACTION] when [CONDITION]')
describe('InputValidator', () => {
  describe('validate', () => {
    it('should return valid for correct input value', () => { /* ... */ });
    it('should return invalid when value is empty', () => { /* ... */ });
    it('should return invalid when value exceeds max length', () => { /* ... */ });
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

| Metric | Minimum | Comfortable | Excellent |
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

### ❌ DON'T: tests depend on execution order

```js
// ❌ Bad: second test depends on the first one
let sharedState;

it('should create item', () => {
  sharedState = createItem({ name: 'test' });
  expect(sharedState.id).toBeDefined();
});

it('should update item', () => {
  updateItem(sharedState.id, { name: 'updated' }); // sharedState from previous test
});

// ✅ Good: each test creates its own data
it('should update item', () => {
  const item = createItem({ name: 'test' });
  const updated = updateItem(item.id, { name: 'updated' });
  expect(updated.name).toBe('updated');
});
```

### ❌ DON'T: snapshot tests without thinking

```js
// ❌ Meaningless snapshot — any change breaks the test
it('renders correctly', () => {
  const { container } = render(<ComplexForm />);
  expect(container).toMatchSnapshot(); // 500 lines snapshot, nobody reviews
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

### ❌ DON'T: "magic" values without explanations

```js
// ❌ What is 42? Why 3?
expect(result).toBe(42);
expect(items).toHaveLength(3);

// ✅ Values are clear from context
const BASE_PRICE = 100;
const DISCOUNT = 58;  // 58% discount
const EXPECTED_PRICE = 42; // 100 - 58

expect(calculatePrice(BASE_PRICE, DISCOUNT)).toBe(EXPECTED_PRICE);
```

### ❌ DON'T: async without await

```js
// ❌ Test always passes — assertion does not execute
it('should fetch data', () => {
  fetchData().then(data => {
    expect(data).toBeDefined(); // will never execute as an assertion
  });
});

// ✅ Correct: await + async
it('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

---

## Definition of Done (tests for a module)

- [ ] Happy path is covered
- [ ] ≥ 2 edge case / boundary
- [ ] ≥ 1 error path
- [ ] Names are `should [verb] when [condition]`
- [ ] No dependency between tests
- [ ] Factories for test data (if repeated)
- [ ] Coverage ≥ 80% statements
- [ ] No `any`, no `// @ts-ignore` in tests

---

## See also
- `$tests_quality_review` — review of tests quality
- `$qa_e2e_playwright` — E2E via Playwright
- `$qa_browser_testing` — visual testing in Antigravity
- `$es2025_beast_practices` — modern JS for writing clean code
- `$dev_reference_snippets` — TDD, React, API examples
