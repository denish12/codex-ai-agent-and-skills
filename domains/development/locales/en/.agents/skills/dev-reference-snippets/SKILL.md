---
name: dev-reference-snippets
description: Reference snippets and DO/DON'T for Senior Full Stack: TDD (Vitest), Express API (Route→Controller→Service→Repo), validation (Zod), centralized errors, structured logging, React + TanStack Query, Zustand, RTK (EntityAdapter), server-side authorization, legacy React 15.3 (Wix). Use this skill when writing any production code in Node.js/TypeScript/React — as a source for copy-paste references and a checklist for code review. Also use it for questions "how to properly do X" for any of the listed patterns.
---

# Skill: Dev Reference Snippets (Do/Don't)

Copy-paste references and anti-patterns for consistent, testable, secure code.

**Sections:**
1. [TDD: RED → GREEN → REFACTOR](#1-tdd)
2. [API: Route → Controller → Service → Repo](#2-api-layers)
3. [Validation at the boundary (Zod)](#3-validation)
4. [Centralized error handler](#4-error-handler)
5. [Logging: request_id + structure](#5-logging)
6. [React: loading/empty/error/success](#6-react-request-states)
7. [Zustand: domain stores](#7-zustand)
8. [RTK: slices + EntityAdapter](#8-rtk)
9. [Server-side authorization](#9-authorization)
10. [Legacy React 15.3 (Wix)](#10-legacy-react-153-wix)
11. [DoD Scripts](#11-dod-scripts)

---

## 1. TDD

### ✅ DO: test first (Vitest)
```ts
// src/lib/slugify.test.ts
import { describe, it, expect } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
  it("removes non-alphanumeric characters", () => {
    expect(slugify("Hi, John!")).toBe("hi-john");
  });
  it("collapses multiple spaces", () => {
    expect(slugify("  Hello   World  ")).toBe("hello-world");
  });
});
```

### ✅ GREEN: minimal implementation
```ts
// src/lib/slugify.ts
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}
```

### ❌ DON'T: test implementation details
```ts
// Bad: the test checks internal variables, not behavior.
// Will break during refactoring without behavior change — brittle tests.
```

**Rule**: test *what it does*, not *how it works inside*.

---

## 2. API layers

### ✅ DO: project structure
```
src/
  http/
    routes/       ← routing only
    controllers/  ← I/O: parse input, call service, format response
    middleware/   ← auth, errors, request-context
  domain/
    services/     ← business logic
    models/       ← domain types
  data/
    repos/        ← SQL/ORM, no business logic
  lib/            ← dependencies-free utilities
```

### ✅ DO: thin route
```ts
// src/http/routes/users.routes.ts
import { Router } from "express";
import { createUser, getUser } from "../controllers/users.controller";
import { requireAuth } from "../middleware/requireAuth";

export const usersRouter = Router();
usersRouter.post("/", requireAuth, createUser);
usersRouter.get("/:id", requireAuth, getUser);
```

### ✅ DO: controller — I/O only
```ts
// src/http/controllers/users.controller.ts
import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { usersService } from "../../domain/services/users.service";
import { AppError } from "../middleware/errors";

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const input = CreateUserSchema.parse(req.body);
    const user = await usersService.create(input);
    res.status(201).json({ id: user.id });
  } catch (err) {
    next(err instanceof z.ZodError ? AppError.validation(err.flatten()) : err);
  }
}
```

### ✅ DO: service — business logic only, no HTTP
```ts
// src/domain/services/users.service.ts
import { usersRepo } from "../../data/repos/users.repo";
import { AppError } from "../../http/middleware/errors";

export const usersService = {
  async create(input: { email: string; name: string }) {
    const existing = await usersRepo.findByEmail(input.email);
    if (existing) throw new AppError(409, "CONFLICT", "Email already in use");
    return usersRepo.insert(input);
  },
};
```

### ❌ DON'T: everything in one file
```ts
// Bad: routes, validation, business logic, and SQL in one file.
// Cannot test the service without HTTP, cannot reuse logic.
```

---

## 3. Validation

### ✅ DO: Zod at the boundary + parse (throws on invalid data)
```ts
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["admin", "user"]).default("user"),
});

// In controller:
const input = CreateUserSchema.parse(req.body); // ✅ valid type guaranteed further down
```

### ✅ DO: safeParse for non-throwing handling
```ts
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return next(AppError.validation(result.error.flatten()));
}
const input = result.data; // type inferred automatically
```

### ❌ DON'T: trust req.body without validation
```ts
// Bad: any garbage, injection of extra fields, 500 in runtime — all this awaits ahead.
export async function createUser(req: any, res: any) {
  const user = await usersService.create(req.body);
  res.json(user);
}
```

---

## 4. Error Handler

### ✅ DO: AppError + unified response format
```ts
// src/http/middleware/errors.ts
import type { ErrorRequestHandler } from "express";

export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }

  static validation(details: unknown) {
    return new AppError(422, "VALIDATION_ERROR", "Invalid input", details);
  }

  static notFound(resource = "Resource") {
    return new AppError(404, "NOT_FOUND", `${resource} not found`);
  }

  static forbidden() {
    return new AppError(403, "FORBIDDEN", "Not enough permissions");
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isApp = err instanceof AppError;
  const status = isApp ? err.status : 500;
  const code   = isApp ? err.code  : "INTERNAL_ERROR";
  // ❗ For 500 — neutral message, stack does not leak to client
  const message = status === 500 ? "Unexpected error" : err.message;

  res.status(status).json({
    error_code: code,
    message,
    ...(isApp && err.details ? { details: err.details } : {}),
  });
};
```

### ✅ DO: connect as the last middleware
```ts
// src/app.ts
app.use(requestContext);
app.use("/api/users", usersRouter);
app.use(errorHandler); // ← last
```

### ❌ DON'T: return err entirely
```ts
// Bad: leakage of stack, SQL errors, environment variables — straight in response to client.
res.status(500).json({ err });
```

---

## 5. Logging

### ✅ DO: request_id + structured logs
```ts
// src/http/middleware/requestContext.ts
import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

export const requestContext: RequestHandler = (req, res, next) => {
  const id = req.header("x-request-id") ?? randomUUID();
  res.setHeader("x-request-id", id);
  (req as any).requestId = id;
  next();
};
```

```ts
// Usage in service/controller
logger.info(
  { request_id: (req as any).requestId, user_id: ctx.user?.id, action: "user_created" },
  "User created successfully"
);

// For errors — warn/error with context
logger.error(
  { request_id: id, error_code: err.code },
  "Request failed"
);
```

### ❌ DON'T: log body entirely
```ts
// Bad: passwords, tokens, PII — all go straight into logs.
logger.info({ body: req.body }, "incoming_request");

// ❌ Also bad:
logger.info({ user }); // may contain password_hash, secrets, etc.
```

**Rule**: log only IDs, codes, statuses. Never — raw request bodies.

---

## 6. React: Request states

### ✅ DO: TanStack Query — explicit loading/empty/error/success
```tsx
import { useQuery } from "@tanstack/react-query";

type User = { id: string; name: string };

async function fetchUsers(): Promise<User[]> {
  const r = await fetch("/api/users");
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

export function UsersList() {
  const q = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  if (q.isLoading) return <div aria-busy="true" role="status">Loading…</div>;
  if (q.isError)   return <div role="alert">Error: {String(q.error)}</div>;
  if (!q.data?.length) return <div>No users yet</div>;

  return (
    <ul>
      {q.data.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

### ✅ DO: mutation with optimistic update
```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/users/${id}`, { method: "DELETE" }).then(r => {
        if (!r.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}
```

### ❌ DON'T: fetch inside component without state handling
```tsx
// Bad: race conditions, flickering, no loading/error, request leak on unmount.
function UsersList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, []);
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

## 7. Zustand

### ✅ DO: domain store + selectors
```ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthState = {
  token: string | null;
  userId: string | null;
  setAuth: (token: string, userId: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      token: null,
      userId: null,
      setAuth: (token, userId) => set({ token, userId }, false, "setAuth"),
      clearAuth: () => set({ token: null, userId: null }, false, "clearAuth"),
    }),
    { name: "AuthStore" }
  )
);

// ✅ Selector — subscribing only to the needed field (no extra re-renders)
const token = useAuthStore(s => s.token);
const isAuthed = useAuthStore(s => s.token !== null);
```

### ❌ DON'T: one "god-store" for everything
```ts
// Bad: auth + cart + ui + settings in one store.
// Result: any change = re-render of all subscribers.
// Rule: one store = one domain.
```

---

## 8. RTK

### ✅ DO: slice + createAsyncThunk + EntityAdapter
```ts
// src/state/usersSlice.ts
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type User = { id: string; name: string };

const usersAdapter = createEntityAdapter<User>();

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const r = await fetch("/api/users");
  if (!r.ok) throw new Error("Failed to load users");
  return (await r.json()) as User[];
});

const slice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    status: "idle" as "idle" | "loading" | "failed",
  }),
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchUsers.pending,   s => { s.status = "loading"; });
    b.addCase(fetchUsers.fulfilled, (s, a) => {
      s.status = "idle";
      usersAdapter.setAll(s, a.payload);
    });
    b.addCase(fetchUsers.rejected,  s => { s.status = "failed"; });
  },
});

export const usersReducer = slice.reducer;
export const usersSelectors = usersAdapter.getSelectors<RootState>(st => st.users);
```

### ✅ DO: connect reducer to store
```ts
// src/state/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./usersSlice";

export const store = configureStore({
  reducer: { users: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### ❌ DON'T: side effects in component + manual reducers
```ts
// Bad: fetch in component, manual switch/case, manual normalization.
// Result: duplication, unpredictability, tests require real HTTP.
```

---

## 9. Authorization

### ✅ DO: check permissions on the server
```ts
// src/lib/authz.ts
import { AppError } from "../http/middleware/errors";

type Principal = { id: string; role: "admin" | "user" } | null;

export function requireRole(principal: Principal, role: "admin" | "user") {
  if (!principal) throw new AppError(401, "UNAUTHORIZED", "Authentication required");
  if (principal.role !== role) throw AppError.forbidden();
}

// Usage in service:
export const postsService = {
  async delete(id: string, actor: Principal) {
    requireRole(actor, "admin"); // ✅ server always checks
    return postsRepo.delete(id);
  },
};
```

### ✅ DO: requireAuth middleware
```ts
// src/http/middleware/requireAuth.ts
import type { RequestHandler } from "express";
import { verifyToken } from "../../lib/jwt";
import { AppError } from "./errors";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.header("Authorization");
  if (!header?.startsWith("Bearer ")) return next(new AppError(401, "UNAUTHORIZED", "Missing token"));
  try {
    (req as any).principal = verifyToken(header.slice(7));
    next();
  } catch {
    next(new AppError(401, "UNAUTHORIZED", "Invalid token"));
  }
};
```

### ❌ DON'T: security only on UI
```ts
// Bad: hide the "Delete" button for non-admins and consider it protection.
// Any fetch("/api/posts/1", { method: "DELETE" }) will bypass this.
// The server MUST check permissions independently of the UI.
```

---

## 10. Legacy React 15.3 (Wix)

### ✅ DO: class component + lifecycle
```jsx
// ❗ Only ES5/ES6 classes, no hooks
class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null, error: null };
    this.handleRetry = this.handleRetry.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    this._unmounted = true; // prevent setState after unmount
  }

  load() {
    apiFetch()
      .then(data => {
        if (!this._unmounted) this.setState({ loading: false, data });
      })
      .catch(() => {
        if (!this._unmounted) this.setState({ loading: false, error: "Failed to load" });
      });
  }

  handleRetry() {
    this.setState({ loading: true, error: null }, () => this.load());
  }

  render() {
    const { loading, data, error } = this.state;
    if (loading) return React.createElement("div", null, "Loading…");
    if (error)   return React.createElement("div", { role: "alert" },
      error,
      React.createElement("button", { onClick: this.handleRetry }, "Retry")
    );
    return React.createElement("div", null, JSON.stringify(data));
  }
}
```

### ❌ DON'T: hooks and modern APIs in React 15.3
```tsx
// ❌ Not allowed — hooks appeared in React 16.8
function Widget() { const [x, setX] = useState(0); }
// ❌ Not allowed — React.memo appeared in React 16.6
export default React.memo(Widget);
// ❌ Not allowed — fragments <>...</> appeared in React 16.2
```

---

## 11. DoD Scripts

### ✅ DO: standard package.json
```json
{
  "scripts": {
    "dev":           "tsx watch ./src/index.ts",
    "build":         "tsc -p tsconfig.build.json",
    "test":          "vitest run",
    "test:watch":    "vitest",
    "test:coverage": "vitest run --coverage",
    "lint":          "biome lint .",
    "lint:fix":      "biome lint . --apply",
    "format":        "biome format . --write",
    "typecheck":     "tsc --noEmit",
    "check":         "npm run typecheck && npm run lint && npm run test"
  }
}
```

### ✅ DO: pre-commit hook (husky + lint-staged)
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["biome lint --apply", "biome format --write"]
  }
}
```

### ❌ DON'T: mix eslint + prettier + biome
```
// Bad: three tools with conflicting rules → eternal noise in PRs, 
// different results for different developers.
// Choose one: Biome (fast, all-in-one) or ESLint + Prettier.
```
