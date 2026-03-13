---
name: testing_strategy_js
description: Стратегия тестирования для JS/TS проектов — unit (Vitest), integration (API/DB), e2e (Playwright). AAA-паттерн, Vitest конфиг, React Testing Library, моки внешних сервисов, coverage thresholds, naming conventions, CI pipeline. Активируй при написании новых тестов, рефакторинге существующих, или при вопросах «как правильно тестировать X».
---

# Skill: Testing Strategy (JS/TS)

Конкретные паттерны, шаблоны и DO/DON'T для написания надёжных тестов.

**Разделы:**
1. [Пирамида тестов и границы](#1-пирамида-тестов)
2. [Unit-тесты](#2-unit-тесты)
3. [React-компоненты (RTL)](#3-react-компоненты-rtl)
4. [Integration-тесты](#4-integration-тесты)
5. [Моки и Test Doubles](#5-моки-и-test-doubles)
6. [Naming и структура](#6-naming-и-структура)
7. [Coverage и CI](#7-coverage-и-ci)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Пирамида тестов

```
         ┌─────────┐
         │  E2E    │  ~5%  Playwright — критичные потоки
         ├─────────┤
         │ Integr. │  ~15% API routes, DB, контракты
         ├─────────┤
         │  Unit   │  ~80% Функции, хуки, компоненты, утилиты
         └─────────┘
```

| Уровень | Что тестировать | Инструмент | Скорость |
|---------|----------------|-----------|---------|
| **Unit** | Чистые функции, утилиты, хуки, React-компоненты | Vitest + RTL | < 5ms/тест |
| **Integration** | API routes, DB-запросы, контракты между модулями | Vitest + supertest | < 500ms/тест |
| **E2E** | Логин, ключевые CRUD, оплата, критичные потоки | Playwright | < 30s/тест |

> [!IMPORTANT]
> E2E → только для критичных потоков. Всё остальное ловить на unit/integration.
> Подробнее по E2E → `$qa_e2e_playwright`.

---

## 2. Unit-тесты

### ✅ DO: AAA-паттерн (Arrange → Act → Assert)

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

### ✅ DO: тестировать edge cases явно

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

### ✅ DO: тестировать custom hooks через renderHook

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

## 3. React-компоненты (RTL)

### ✅ DO: тестировать поведение, а не реализацию

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

### ❌ DON'T: тестировать детали реализации

```js
// ❌ Плохо: зависимость от внутреннего state
it('should set state to true', () => {
  const { result } = renderHook(() => useToggle());
  act(() => result.current[1]());
  // Проверяем internal state — хрупко
  expect(result.current[0]).toBe(true);
});

// ✅ Хорошо: проверяем поведение через DOM
it('should show content after toggle click', async () => {
  const user = userEvent.setup();
  render(<Accordion title="Details">Content</Accordion>);

  expect(screen.queryByText('Content')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /details/i }));
  expect(screen.getByText('Content')).toBeVisible();
});
```

### ✅ DO: RTL queries по приоритету

```js
// Приоритет запросов (от лучшего к худшему):
// 1. getByRole     — семантические роли (лучше всего)
// 2. getByLabelText — формы
// 3. getByText     — статический текст
// 4. getByTestId   — последний resort

// ✅ По роли — устойчиво к изменению вёрстки
screen.getByRole('button', { name: /save/i });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('heading', { level: 2 });

// ✅ По label — формы
screen.getByLabelText(/password/i);

// ⚠️ По тексту — менее устойчиво к i18n
screen.getByText(/no templates found/i);

// 🔧 По testid — когда нет семантики
screen.getByTestId('popup-container');
```

---

## 4. Integration-тесты

### ✅ DO: API handler тесты с supertest

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

### ✅ DO: тесты контрактов (проверяем форму ответа, не бизнес-логику)

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

## 5. Моки и Test Doubles

### ✅ DO: мокать внешние границы, не внутреннюю логику

```js
// ✅ Мокаем внешний HTTP API
vi.mock('../services/openai.js', () => ({
  generateText: vi.fn().mockResolvedValue('Mocked AI response'),
}));

// ✅ Мокаем таймеры
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

### ✅ DO: фабрики тестовых данных вместо хардкода

```js
// test-utils/factories.js

/**
 * Создаёт тестовый объект купона с возможностью override.
 * @param {Partial<Coupon>} overrides - поля для переопределения.
 * @returns {Coupon} тестовый купон.
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

// Использование в тестах:
it('should deactivate expired coupon', () => {
  const coupon = createCoupon({ active: true, expiresAt: '2024-01-01' });
  const result = deactivateExpired(coupon);
  expect(result.active).toBe(false);
});
```

### ❌ DON'T: чрезмерные моки

```js
// ❌ Замокали всё — тест ничего не проверяет
vi.mock('../db.js');
vi.mock('../validator.js');
vi.mock('../logger.js');
vi.mock('../event-bus.js');

it('should save coupon', async () => {
  db.save.mockResolvedValue({ id: 1 });
  validator.validate.mockReturnValue(true);

  await saveCoupon({ code: 'X' });

  expect(db.save).toHaveBeenCalled(); // мы проверяем моки, не логику
});

// ✅ Интеграционный тест проверяет реальный flow
it('should save valid coupon to DB', async () => {
  const result = await saveCoupon({ code: 'REAL', discount: 10, type: 'percent' });
  expect(result.id).toBeDefined();

  const stored = await db.findById(result.id);
  expect(stored.code).toBe('REAL');
});
```

### Что мокать, а что нет

| Мокать ✅ | НЕ мокать ❌ |
|----------|-------------|
| HTTP API (fetch, axios) | Собственные утилиты |
| Внешние сервисы (OpenAI, Stripe, Redis) | Простые трансформации данных |
| Таймеры (setTimeout, setInterval) | Router / навигация (если не E2E) |
| File system (fs) | Внутренние модули (теряется смысл integration) |
| crypto.randomUUID (детерминизм) | — |

---

## 6. Naming и структура

### Организация файлов

```
src/
├── utils/
│   ├── pricing.js
│   └── pricing.test.js          # Unit — рядом с кодом
├── hooks/
│   ├── useTimer.js
│   └── useTimer.test.js         # Unit — рядом с кодом
├── components/
│   ├── CouponInput.jsx
│   └── CouponInput.test.jsx     # RTL — рядом с компонентом
├── api/
│   ├── coupons.handler.js
│   └── coupons.integration.test.js  # Integration — рядом с маршрутом
└── e2e/                          # E2E — отдельная папка
    └── specs/
```

### ✅ DO: describe/it naming convention

```js
// Формат: describe('[Unit/Module]') → it('should [ACTION] when [CONDITION]')
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

### Чеклист для каждого тестируемого модуля

- [ ] Happy path (основной сценарий)
- [ ] Edge cases (0, null, undefined, пустая строка, пустой массив)
- [ ] Boundaries (min/max значения)
- [ ] Error paths (невалидный ввод, сетевые ошибки)
- [ ] Async (таймауты, race conditions — если применимо)

---

## 7. Coverage и CI

### Vitest конфиг

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

### Setup файл

```js
// src/test-setup.js
import '@testing-library/jest-dom/vitest';

// Глобальный cleanup (RTL >= v14 делает это автоматически)
// import { cleanup } from '@testing-library/react';
// afterEach(cleanup);
```

### Coverage thresholds

| Метрика | Минимум | Комфорт | Отлично |
|---------|---------|---------|---------|
| Statements | 70% | 80% | 90%+ |
| Branches | 65% | 75% | 85%+ |
| Functions | 70% | 80% | 90%+ |
| Lines | 70% | 80% | 90%+ |

### Scripts в package.json

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

### ❌ DON'T: тесты зависят от порядка выполнения

```js
// ❌ Плохо: второй тест зависит от первого
let sharedState;

it('should create item', () => {
  sharedState = createItem({ name: 'test' });
  expect(sharedState.id).toBeDefined();
});

it('should update item', () => {
  updateItem(sharedState.id, { name: 'updated' }); // sharedState из предыдущего теста
});

// ✅ Хорошо: каждый тест создаёт свои данные
it('should update item', () => {
  const item = createItem({ name: 'test' });
  const updated = updateItem(item.id, { name: 'updated' });
  expect(updated.name).toBe('updated');
});
```

### ❌ DON'T: snapshot-тесты без осмысления

```js
// ❌ Бессмысленный snapshot — любое изменение ломает тест
it('renders correctly', () => {
  const { container } = render(<ComplexForm />);
  expect(container).toMatchSnapshot(); // 500 строк snapshot, никто не ревьюит
});

// ✅ Snapshot только для стабильного output
it('should render error boundary fallback', () => {
  const { container } = render(<ErrorFallback error={new Error('Oops')} />);
  expect(container).toMatchInlineSnapshot(`
    <div class="error-fallback">
      <p>Something went wrong: Oops</p>
    </div>
  `);
});
```

### ❌ DON'T: «магические» значения без пояснений

```js
// ❌ Что за 42? Почему 3?
expect(result).toBe(42);
expect(items).toHaveLength(3);

// ✅ Значения понятны из контекста
const BASE_PRICE = 100;
const DISCOUNT = 58;  // 58% discount
const EXPECTED_PRICE = 42; // 100 - 58

expect(calculatePrice(BASE_PRICE, DISCOUNT)).toBe(EXPECTED_PRICE);
```

### ❌ DON'T: async без await

```js
// ❌ Тест проходит всегда — assertion не выполняется
it('should fetch data', () => {
  fetchData().then(data => {
    expect(data).toBeDefined(); // никогда не выполнится как assertion
  });
});

// ✅ Правильно: await + async
it('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

---

## Definition of Done (тесты для модуля)

- [ ] Happy path покрыт
- [ ] ≥ 2 edge case / boundary
- [ ] ≥ 1 error path
- [ ] Названия `should [verb] when [condition]`
- [ ] Нет зависимости между тестами
- [ ] Фабрики для тестовых данных (если повторяются)
- [ ] Coverage ≥ 80% statements
- [ ] Нет `any`, нет `// @ts-ignore` в тестах

---

## См. также
- `$tests_quality_review` — ревью качества тестов
- `$qa_e2e_playwright` — E2E через Playwright
- `$qa_browser_testing` — визуальное тестирование в Antigravity
- `$es2025_beast_practices` — современный JS для написания чистого кода
- `$dev_reference_snippets` — TDD, React, API примеры