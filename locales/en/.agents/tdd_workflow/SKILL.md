---
name: tdd_workflow
description: Development strictly by TDD (RED→GREEN→REFACTOR): wording test cases via user journey, unit + integration tests with Vitest and Testing Library, e2e with Playwright for critical flows. Use this skill Always when needed write tests, develop a feature via TDD, review tests or explain why a test is fragile. Activate with questions «how test X», «why test breaks with refactoring», «what a good test is».
---

# Skill: TDD Workflow

Algorithm, examples and anti-patterns for reliable testing.

**Sections:**
1. [Algorithm RED→GREEN→REFACTOR](#1-algorithm)
2. [Wording test cases](#2-wording)
3. [Unit tests: behavior, not implementation](#3-unit)
4. [Integration tests: HTTP + DB](#4-integration)
5. [React components: Testing Library](#5-react)
6. [E2E: Playwright for critical flows](#6-e2e)
7. [Anti-patterns](#7-anti-patterns)

---

## 1. Algorithm

```
RED:      Write a test → make sure it fails (and for the right reason)
GREEN:    Minimum code so that test Passed (not more)
REFACTOR: Improve the code without changing behavior → tests remain green
```

### ✅ Checklist before write code
- [ ] User journey is formulated (role ? action ? value)
- [ ] Covered: happy path, edge cases, error paths
- [ ] Test fails by the expected reason (not by syntax error)
- [ ] Test checks *behavior*, not *details implementation*
- [ ] After GREEN: refactoring not breaks tests

### ✅ Checklist after writing tests
- [ ] No dependencies between tests (each isolated)
- [ ] No fragile selectors (`#btn-submit-1` instead of `role="button"`)
- [ ] Error paths covered (not only happy path)
- [ ] Coverage ≥ the project threshold (`vitest --coverage`)
- [ ] No flake (test stably passes 10 times in a row)

---

## 2. Wording test cases

### ✅ DO: template user journey → test case
```
User Journey: "Manager creates a new user in the system"

Happy path:
  - creates user with valid data → returns id and status 201

Edge cases:
  - email already already taken → returns 409 CONFLICT
  - name empty → returns 422 VALIDATION_ERROR
  - email without @ → returns 422 VALIDATION_ERROR
  - role not from enum → returns 422 VALIDATION_ERROR

Error paths:
  - DB is unavailable → returns 500, does not leak error details
  - unauthorized request → returns 401
  - authorized but not admin → returns 403
```

### ✅ DO: named tests — "what it does under which condition"
```ts
// ✅ Well: test case reads like a specification
describe("usersService.create", () => {
  it("returns new user id when input is valid", ...);
  it("throws CONFLICT when email already exists", ...);
  it("throws VALIDATION_ERROR when email is malformed", ...);
  it("throws UNAUTHORIZED when actor is not authenticated", ...);
});

// ❌ Bad: uninformative names
describe("usersService", () => {
  it("works", ...);
  it("test1", ...);
  it("should do stuff", ...);
});
```

---

## 3. Unit tests

### ✅ DO: test behavior, not details implementation
```ts
// ─── Function under test ───────────────────────────────────────────
// src/lib/pricing.ts
export function calculateDiscount(price: number, userType: "regular" | "premium"): number {
  if (price <= 0) throw new Error("Price must be positive");
  const rate = userType === "premium" ? 0.2 : 0.05;
  return Math.round(price * rate * 100) / 100;
}

// ─── Tests ────────────────────────────────────────────────────────
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

### ✅ DO: mock dependencies, not details
```ts
// src/domain/services/users.service.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usersService } from "./users.service";
import { usersRepo } from "../../data/repos/users.repo";

// ✅ Mock the repository (external dependency), not ORM or SQL
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

    expect(mockRepo.insert).not.toHaveBeenCalled(); // ✅ does not create a duplicate
  });
});
```

---

## 4. Integration tests

### ✅ DO: test the HTTP layer from route to response
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

  // ✅ Happy path: verify status and response shape
  it("returns 201 and user id when input is valid", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", "Bearer test-admin-token")
      .send({ email: "new@example.com", name: "Alice" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: expect.stringMatching(/^usr_/) });
  });

  // ? Validation: verify error_code, not text messages (they may change)
  it("returns 422 when email is malformed", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", "Bearer test-admin-token")
      .send({ email: "not-an-email", name: "Alice" });

    expect(res.status).toBe(422);
    expect(res.body.error_code).toBe("VALIDATION_ERROR");
    expect(res.body.details).toBeDefined();
  });

  // ✅ Conflict
  it("returns 409 when email already exists", async () => {
    await seedTestUser({ email: "existing@example.com" });

    const res = await request(app)
      .post("/api/users")
      .set("Authorization", "Bearer test-admin-token")
      .send({ email: "existing@example.com", name: "Bob" });

    expect(res.status).toBe(409);
    expect(res.body.error_code).toBe("CONFLICT");
  });

  // ✅ Authentication
  it("returns 401 without auth token", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "a@b.com", name: "Alice" });

    expect(res.status).toBe(401);
  });
});
```

---

## 5. React components

### ✅ DO: Testing Library — roles and text, not classes and id
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

    // ✅ Search by roles and label — how user
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

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

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    // ✅ Search by alert role — not by the .error-message class
    expect(screen.getByRole("alert")).toHaveTextContent(/email/i);
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();
    // Simulate a long request
    const onSubmit = vi.fn().mockImplementation(() => new Promise(() => {}));
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByRole("button", { name: /Signing in/i })).toBeDisabled();
  });
});
```

### ✅ DO: test custom hooks via renderHook
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
    expect(result.current).toBe("a"); // not updated

    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(result.current).toBe("b"); // updated

    vi.useRealTimers();
  });
});
```

---

## 6. E2E (Playwright)

### ✅ DO: only for critical user flows
```ts
// e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

// ✅ E2E covers full flow, which cannot be adequately unit-tested
test("user can log in and see dashboard", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("alice@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();

  // ✅ Wait for navigation, not simply presence element
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("unauthenticated user is redirected to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL("/login");
});
```

### Rule: what test on which level
| Level | Speed | What covers | When |
|---|---|---|---|
| Unit | ~1ms | Clean logic, utilities, hooks | Always |
| Integration | ~100ms | HTTP + DB, services with dependencies | Always |
| Component | ~50ms | React-components, forms, UX | Always |
| E2E | ~5s | Critical user flows end-to-end | Only key flows |

---

## 7. Anti-patterns

### ❌ Test checks implementation, not behavior
```ts
// ❌ Bad: the test knows about an internal variable
it("sets isLoading to true", () => {
  const service = new UserService();
  service.fetchUser("1");
  expect(service._isLoading).toBe(true); // internal detail
});

// ✅ Well: test checks what the user/calling code sees
it("shows loading state while fetching", async () => {
  render(<UserProfile userId="1" />);
  expect(screen.getByRole("status")).toBeInTheDocument(); // spinner
});
```

### ❌ Fragile selectors
```ts
// ❌ Bad: will break with refactoring CSS or change structure DOM
screen.getByTestId("submit-btn-v2");       // testId — detail implementation
container.querySelector(".btn-primary");   // CSS-class
document.getElementById("form-submit");    // id

// ✅ Well: semantic selectors — how the user interacts
screen.getByRole("button", { name: "Sign in" });
screen.getByLabelText("Email");
screen.getByText("Save");
```

### ❌ Dependency tests each from other
```ts
// ❌ Bad: test 2 breaks if test 1 did not run
let createdUserId: string;

it("creates user", async () => {
  const user = await usersService.create(...);
  createdUserId = user.id; // global variable
});

it("deletes user", async () => {
  await usersService.delete(createdUserId); // depends from test above
});

// ? Good: each test is isolated via beforeEach / fixtures
describe("usersService.delete", () => {
  let userId: string;
  beforeEach(async () => {
    const user = await usersService.create(...); // its own fixture
    userId = user.id;
  });

  it("removes user from DB", async () => {
    await usersService.delete(userId);
    const found = await usersRepo.findById(userId);
    expect(found).toBeNull();
  });
});
```

### ? Missing error paths
```ts
// ? Bad: only happy path ? the most important thing is not covered
describe("payment.process", () => {
  it("processes valid payment", ...);
  // No tests for: insufficient funds, network down, invalid card
});

// ? Good: error paths are required for critical logic
describe("payment.process", () => {
  it("processes valid payment and returns transaction id", ...);
  it("throws INSUFFICIENT_FUNDS when balance is too low", ...);
  it("throws NETWORK_ERROR and does not charge when gateway fails", ...);
  it("throws INVALID_CARD when card number is malformed", ...);
});
```

### ? Test without assertion (forever green)
```ts
// ❌ Bad: test always green independently from behavior
it("sends email", async () => {
  await emailService.send({ to: "a@b.com", subject: "Hi" });
  // no expect ? the test says nothing
});

// ? Good: explicit assertion
it("sends email to correct recipient", async () => {
  const spy = vi.spyOn(mailTransport, "send");
  await emailService.send({ to: "a@b.com", subject: "Hi" });
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ to: "a@b.com" }));
});
```

---

## See also
- `dev_reference_snippets` → section 1 (TDD example with slugify)
- `react_beast_practices` → testing components (Testing Library)
- `typescript_beast_practices` ? typing mocks and fixtures
