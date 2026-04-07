---
name: tdd-workflow
description: Разработка строго по TDD (RED→GREEN→REFACTOR): формулировка тест-кейсов через user journey, unit + integration тесты с Vitest и Testing Library, e2e с Playwright для критичных потоков. Используй этот скилл ВСЕГДА когда нужно написать тесты, разработать фичу через TDD, провести ревью тестов или объяснить почему тест хрупкий. Активируй при вопросах «как тестировать X», «почему тест ломается при рефакторинге», «что такое хороший тест».
---

# Skill: TDD Workflow

Алгоритм, примеры и антипаттерны для надёжного тестирования.

**Разделы:**
1. [Алгоритм RED→GREEN→REFACTOR](#1-алгоритм)
2. [Формулировка тест-кейсов](#2-формулировка)
3. [Unit тесты: поведение, не реализация](#3-unit)
4. [Integration тесты: HTTP + DB](#4-integration)
5. [React компоненты: Testing Library](#5-react)
6. [E2E: Playwright для критичных потоков](#6-e2e)
7. [Антипаттерны](#7-антипаттерны)

---

## 1. Алгоритм

```
RED:      Напиши тест → убедись что ПАДАЕТ (и по правильной причине)
GREEN:    Минимальный код чтобы тест ПРОШЁЛ (не больше)
REFACTOR: Улучши код не меняя поведения → тесты остаются зелёными
```

### ✅ Чеклист перед написанием кода
- [ ] Сформулирована user journey (роль → действие → ценность)
- [ ] Покрыты: happy path, edge cases, error paths
- [ ] Тест падает по ожидаемой причине (не по синтаксической ошибке)
- [ ] Тест проверяет *поведение*, не *детали реализации*
- [ ] После GREEN: рефакторинг не ломает тесты

### ✅ Чеклист после написания тестов
- [ ] Нет зависимостей между тестами (каждый изолирован)
- [ ] Нет хрупких селекторов (`#btn-submit-1` вместо `role="button"`)
- [ ] Error paths покрыты (не только happy path)
- [ ] Покрытие ≥ порогу проекта (`vitest --coverage`)
- [ ] Нет флейков (тест стабильно проходит 10 раз подряд)

---

## 2. Формулировка тест-кейсов

### ✅ DO: шаблон user journey → тест-кейсы
```
User Journey: "Менеджер создаёт нового пользователя в системе"

Happy path:
  - создаёт пользователя с валидными данными → возвращает id и статус 201

Edge cases:
  - email уже занят → возвращает 409 CONFLICT
  - имя пустое → возвращает 422 VALIDATION_ERROR
  - email без @ → возвращает 422 VALIDATION_ERROR
  - role не из enum → возвращает 422 VALIDATION_ERROR

Error paths:
  - БД недоступна → возвращает 500, не утекает детали ошибки
  - неавторизованный запрос → возвращает 401
  - авторизован но не admin → возвращает 403
```

### ✅ DO: именование тестов — "что делает при каком условии"
```ts
// ✅ Хорошо: тест-кейс читается как спецификация
describe("usersService.create", () => {
  it("returns new user id when input is valid", ...);
  it("throws CONFLICT when email already exists", ...);
  it("throws VALIDATION_ERROR when email is malformed", ...);
  it("throws UNAUTHORIZED when actor is not authenticated", ...);
});

// ❌ Плохо: неинформативные названия
describe("usersService", () => {
  it("works", ...);
  it("test1", ...);
  it("should do stuff", ...);
});
```

---

## 3. Unit тесты

### ✅ DO: тестировать поведение, не детали реализации
```ts
// ─── Тестируемая функция ───────────────────────────────────────────
// src/lib/pricing.ts
export function calculateDiscount(price: number, userType: "regular" | "premium"): number {
  if (price <= 0) throw new Error("Price must be positive");
  const rate = userType === "premium" ? 0.2 : 0.05;
  return Math.round(price * rate * 100) / 100;
}

// ─── Тесты ────────────────────────────────────────────────────────
// src/lib/pricing.test.ts
import { describe, it, expect } from "vitest";
import { calculateDiscount } from "./pricing";

describe("calculateDiscount", () => {
  // ✅ Happy path
  it("applies 5% discount for regular users", () => {
    expect(calculateDiscount(100, "regular")).toBe(5);
  });

  it("applies 20% discount for premium users", () => {
    expect(calculateDiscount(100, "premium")).toBe(20);
  });

  // ✅ Edge cases
  it("rounds to 2 decimal places", () => {
    expect(calculateDiscount(99.99, "regular")).toBe(5); // 4.9995 → 5
  });

  // ✅ Error paths
  it("throws when price is zero", () => {
    expect(() => calculateDiscount(0, "regular")).toThrow("Price must be positive");
  });

  it("throws when price is negative", () => {
    expect(() => calculateDiscount(-10, "regular")).toThrow("Price must be positive");
  });
});
```

### ✅ DO: мокировать зависимости, не детали
```ts
// src/domain/services/users.service.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usersService } from "./users.service";
import { usersRepo } from "../../data/repos/users.repo";

// ✅ Мокируем репозиторий (внешняя зависимость), не ORM или SQL
vi.mock("../../data/repos/users.repo");

const mockRepo = vi.mocked(usersRepo);

describe("usersService.create", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns created user when email is not taken", async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.insert.mockResolvedValue({ id: "usr_1", email: "a@b.com", name: "Alice" });

    const user = await usersService.create({ email: "a@b.com", name: "Alice" });

    expect(user.id).toBe("usr_1");
    expect(mockRepo.insert).toHaveBeenCalledWith({ email: "a@b.com", name: "Alice" });
  });

  it("throws CONFLICT when email is already taken", async () => {
    mockRepo.findByEmail.mockResolvedValue({ id: "existing", email: "a@b.com", name: "Bob" });

    await expect(usersService.create({ email: "a@b.com", name: "Alice" }))
      .rejects.toMatchObject({ code: "CONFLICT" });

    expect(mockRepo.insert).not.toHaveBeenCalled(); // ✅ не создали дубль
  });
});
```

---

## 4. Integration тесты

### ✅ DO: тестировать HTTP-слой от роута до ответа
```ts
// src/http/routes/users.routes.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../../app";
import { db } from "../../lib/db";
import { seedTestUser, cleanupTestData } from "../../test/helpers";

describe("POST /api/users", () => {
  beforeAll(() => db.connect());
  afterAll(async () => {
    await cleanupTestData();
    await db.disconnect();
  });

  // ✅ Happy path: проверяем статус и форму ответа
  it("returns 201 and user id when input is valid", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", "Bearer test-admin-token")
      .send({ email: "new@example.com", name: "Alice" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: expect.stringMatching(/^usr_/) });
  });

  // ✅ Валидация: проверяем error_code, не текст сообщения (он может меняться)
  it("returns 422 when email is malformed", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", "Bearer test-admin-token")
      .send({ email: "not-an-email", name: "Alice" });

    expect(res.status).toBe(422);
    expect(res.body.error_code).toBe("VALIDATION_ERROR");
    expect(res.body.details).toBeDefined();
  });

  // ✅ Конфликт
  it("returns 409 when email already exists", async () => {
    await seedTestUser({ email: "existing@example.com" });

    const res = await request(app)
      .post("/api/users")
      .set("Authorization", "Bearer test-admin-token")
      .send({ email: "existing@example.com", name: "Bob" });

    expect(res.status).toBe(409);
    expect(res.body.error_code).toBe("CONFLICT");
  });

  // ✅ Аутентификация
  it("returns 401 without auth token", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "a@b.com", name: "Alice" });

    expect(res.status).toBe(401);
  });
});
```

---

## 5. React компоненты

### ✅ DO: Testing Library — роли и текст, не классы и id
```tsx
// src/components/LoginForm.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("calls onSubmit with email and password on valid submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm onSubmit={onSubmit} />);

    // ✅ Ищем по роли и label — как пользователь
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Пароль"), "password123");
    await user.click(screen.getByRole("button", { name: "Войти" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "alice@example.com",
        password: "password123",
      });
    });
  });

  it("shows validation error when email is empty", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Войти" }));

    // ✅ Ищем по роли alert — не по классу .error-message
    expect(screen.getByRole("alert")).toHaveTextContent(/email/i);
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();
    // Имитируем долгий запрос
    const onSubmit = vi.fn().mockImplementation(() => new Promise(() => {}));
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Пароль"), "password123");
    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(screen.getByRole("button", { name: /входим/i })).toBeDisabled();
  });
});
```

### ✅ DO: тестировать custom hooks через renderHook
```ts
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 300));
    expect(result.current).toBe("initial");
  });

  it("debounces value update", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
      initialProps: { v: "a" },
    });

    rerender({ v: "b" });
    expect(result.current).toBe("a"); // не обновилось

    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(result.current).toBe("b"); // обновилось

    vi.useRealTimers();
  });
});
```

---

## 6. E2E (Playwright)

### ✅ DO: только для критичных user flows
```ts
// e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

// ✅ E2E покрывает полный поток, который нельзя адекватно unit-протестировать
test("user can log in and see dashboard", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("alice@example.com");
  await page.getByLabel("Пароль").fill("password123");
  await page.getByRole("button", { name: "Войти" }).click();

  // ✅ Ждём навигацию, не просто наличие элемента
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("unauthenticated user is redirected to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL("/login");
});
```

### Правило: что тестировать на каком уровне
| Уровень | Скорость | Что покрывает | Когда |
|---|---|---|---|
| Unit | ~1ms | Чистая логика, утилиты, хуки | Всегда |
| Integration | ~100ms | HTTP + DB, сервисы с зависимостями | Всегда |
| Component | ~50ms | React-компоненты, формы, UX | Всегда |
| E2E | ~5s | Критичные user flows end-to-end | Только ключевые потоки |

---

## 7. Антипаттерны

### ❌ Тест проверяет реализацию, не поведение
```ts
// ❌ Плохо: тест знает о внутренней переменной
it("sets isLoading to true", () => {
  const service = new UserService();
  service.fetchUser("1");
  expect(service._isLoading).toBe(true); // внутренняя деталь
});

// ✅ Хорошо: тест проверяет что видит пользователь/вызывающий код
it("shows loading state while fetching", async () => {
  render(<UserProfile userId="1" />);
  expect(screen.getByRole("status")).toBeInTheDocument(); // spinner
});
```

### ❌ Хрупкие селекторы
```ts
// ❌ Плохо: сломается при рефакторинге CSS или изменении структуры DOM
screen.getByTestId("submit-btn-v2");       // testId — деталь реализации
container.querySelector(".btn-primary");   // CSS-класс
document.getElementById("form-submit");    // id

// ✅ Хорошо: семантические селекторы — как пользователь взаимодействует
screen.getByRole("button", { name: "Войти" });
screen.getByLabelText("Email");
screen.getByText("Сохранить");
```

### ❌ Зависимость тестов друг от друга
```ts
// ❌ Плохо: тест 2 ломается если тест 1 не запустился
let createdUserId: string;

it("creates user", async () => {
  const user = await usersService.create(...);
  createdUserId = user.id; // глобальная переменная
});

it("deletes user", async () => {
  await usersService.delete(createdUserId); // зависит от теста выше
});

// ✅ Хорошо: каждый тест изолирован через beforeEach / фикстуры
describe("usersService.delete", () => {
  let userId: string;
  beforeEach(async () => {
    const user = await usersService.create(...); // своя фикстура
    userId = user.id;
  });

  it("removes user from DB", async () => {
    await usersService.delete(userId);
    const found = await usersRepo.findById(userId);
    expect(found).toBeNull();
  });
});
```

### ❌ Пропущенные error paths
```ts
// ❌ Плохо: только happy path — самое важное не покрыто
describe("payment.process", () => {
  it("processes valid payment", ...);
  // Нет тестов на: недостаток средств, сеть упала, невалидная карта
});

// ✅ Хорошо: error paths обязательны для критичной логики
describe("payment.process", () => {
  it("processes valid payment and returns transaction id", ...);
  it("throws INSUFFICIENT_FUNDS when balance is too low", ...);
  it("throws NETWORK_ERROR and does not charge when gateway fails", ...);
  it("throws INVALID_CARD when card number is malformed", ...);
});
```

### ❌ Тест без assert (вечно зелёный)
```ts
// ❌ Плохо: тест всегда зелёный независимо от поведения
it("sends email", async () => {
  await emailService.send({ to: "a@b.com", subject: "Hi" });
  // нет expect — тест ни о чём не говорит
});

// ✅ Хорошо: явный assert
it("sends email to correct recipient", async () => {
  const spy = vi.spyOn(mailTransport, "send");
  await emailService.send({ to: "a@b.com", subject: "Hi" });
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ to: "a@b.com" }));
});
```

---

## См. также
- `dev-reference-snippets` → раздел 1 (TDD пример с slugify)
- `react-beast-practices` → тестирование компонентов (Testing Library)
- `typescript-beast-practices` → типизация моков и фикстур
