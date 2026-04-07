---
name: tdd-workflow
description: Development strictly according to TDD (RED→GREEN→REFACTOR): formulating test cases via user journey, unit + integration tests with Vitest and Testing Library, e2e with Playwright for critical flows. Use this skill ALWAYS when you need to write tests, develop a feature via TDD, conduct a review of tests, or explain why a test is fragile. Activate upon questions "how to test X", "why the test breaks during refactoring", "what is a good test".
---

# Skill: TDD Workflow

Algorithm, examples, and antipatterns for reliable testing.

**Sections:**
1. [Algorithm RED→GREEN→REFACTOR](#1-algorithm)
2. [Formulation of test cases](#2-formulation)
3. [Unit tests: behavior, not implementation](#3-unit)
4. [Integration tests: HTTP + DB](#4-integration)
5. [React components: Testing Library](#5-react)
6. [E2E: Playwright for critical flows](#6-e2e)
7. [Antipatterns](#7-antipatterns)

---

## 1. Algorithm

```
RED:      Write a test → make sure it FAILS (and for the right reason)
GREEN:    Minimal code for the test to PASS (no more)
REFACTOR: Improve code without changing behavior → tests remain green
```

### ✅ Checklist before writing code
- [ ] User journey is formulated (role → action → value)
- [ ] Covered: happy path, edge cases, error paths
- [ ] The test fails for the expected reason (not due to a syntax error)
- [ ] The test checks *behavior*, not *implementation details*
- [ ] After GREEN: refactoring does not break tests

### ✅ Checklist after writing tests
- [ ] No dependencies between tests (each is isolated)
- [ ] No fragile selectors (`#btn-submit-1` instead of `role="button"`)
- [ ] Error paths are covered (not only happy path)
- [ ] Coverage ≥ project threshold (`vitest --coverage`)
- [ ] No flakes (the test consistently passes 10 times in a row)

---

## 2. Formulation of test cases

### ✅ DO: user journey template → test cases
```
User Journey: "A manager creates a new user in the system"

Happy path:
  - creates a user with valid data → returns id and status 201

Edge cases:
  - email is already taken → returns 409 CONFLICT
  - name is empty → returns 422 VALIDATION_ERROR
  - email without @ → returns 422 VALIDATION_ERROR
  - role is not from enum → returns 422 VALIDATION_ERROR

Error paths:
  - DB is unavailable → returns 500, does not leak error details
  - unauthorized request → returns 401
  - authorized but not admin → returns 403
```

### ✅ DO: naming tests — "what it does under what condition"
```ts
// ✅ Good: the test case reads like a specification
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

### ✅ DO: test behavior, not implementation details
```ts
// ─── Tested function ───────────────────────────────────────────
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

    expect(mockRepo.insert).not.toHaveBeenCalled(); // ✅ did not create a duplicate
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

  // ✅ Happy path: check status and response shape
  it("returns 201 and user id when input is valid", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", "Bearer test-admin-token")
      .send({ email: "new@example.com", name: "Alice" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: expect.stringMatching(/^usr_/) });
  });

  // ✅ Validation: check error_code, not the message text (it can change)
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

    // ✅ Search by role and label — like a user
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

    // ✅ Search by role alert — not by class .error-message
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

    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
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
    expect(result.current).toBe("a"); // has not updated

    await act(() => vi.advanceTimersByTimeAsync(300));
    expect(result.current).toBe("b"); // has updated

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

// ✅ E2E covers the full flow that cannot be adequately unit-tested
test("user can log in and see dashboard", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill("alice@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();

  // ✅ Wait for navigation, not just the presence of an element
  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("unauthenticated user is redirected to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL("/login");
});
```

### Rule: what to test at what level
| Level | Speed | What it covers | When |
|---|---|---|---|
| Unit | ~1ms | Pure logic, utilities, hooks | Always |
| Integration | ~100ms | HTTP + DB, services with dependencies | Always |
| Component | ~50ms | React components, forms, UX | Always |
| E2E | ~5s | Critical end-to-end user flows | Only key flows |

---

## 7. Antipatterns

### ❌ Test checks implementation, not behavior
```ts
// ❌ Bad: test knows about an internal variable
it("sets isLoading to true", () => {
  const service = new UserService();
  service.fetchUser("1");
  expect(service._isLoading).toBe(true); // internal detail
});

// ✅ Good: test checks what the user/calling code sees
it("shows loading state while fetching", async () => {
  render(<UserProfile userId="1" />);
  expect(screen.getByRole("status")).toBeInTheDocument(); // spinner
});
```

### ❌ Fragile selectors
```ts
// ❌ Bad: will break upon CSS refactoring or DOM structure change
screen.getByTestId("submit-btn-v2");       // testId is an implementation detail
container.querySelector(".btn-primary");   // CSS class
document.getElementById("form-submit");    // id

// ✅ Good: semantic selectors — how the user interacts
screen.getByRole("button", { name: "Sign in" });
screen.getByLabelText("Email");
screen.getByText("Save");
```

### ❌ Dependency of tests on each other
```ts
// ❌ Bad: test 2 breaks if test 1 did not run
let createdUserId: string;

it("creates user", async () => {
  const user = await usersService.create(...);
  createdUserId = user.id; // global variable
});

it("deletes user", async () => {
  await usersService.delete(createdUserId); // depends on the test above
});

// ✅ Good: each test is isolated via beforeEach / fixtures
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

### ❌ Ignored error paths
```ts
// ❌ Bad: only happy path — the most important thing is not covered
describe("payment.process", () => {
  it("processes valid payment", ...);
  // No tests for: insufficient funds, network failed, invalid card
});

// ✅ Good: error paths are mandatory for critical logic
describe("payment.process", () => {
  it("processes valid payment and returns transaction id", ...);
  it("throws INSUFFICIENT_FUNDS when balance is too low", ...);
  it("throws NETWORK_ERROR and does not charge when gateway fails", ...);
  it("throws INVALID_CARD when card number is malformed", ...);
});
```

### ❌ Test without assert (forever green)
```ts
// ❌ Bad: test is always green regardless of behavior
it("sends email", async () => {
  await emailService.send({ to: "a@b.com", subject: "Hi" });
  // no expect — test says nothing
});

// ✅ Good: explicit assert
it("sends email to correct recipient", async () => {
  const spy = vi.spyOn(mailTransport, "send");
  await emailService.send({ to: "a@b.com", subject: "Hi" });
  expect(spy).toHaveBeenCalledWith(expect.objectContaining({ to: "a@b.com" }));
});
```

---

## See also
- `dev-reference-snippets` → section 1 (TDD example with slugify)
- `react-beast-practices` → component testing (Testing Library)
- `typescript-beast-practices` → typing mocks and fixtures
