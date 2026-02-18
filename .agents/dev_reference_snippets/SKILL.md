---
name: dev_reference_snippets
description: Единый файл со сниппетами и анти-примерами (do/don’t) для Senior Full Stack: TDD, API, валидация, ошибки, логирование, React, state (Zustand/RTK), безопасность, legacy React 15.3 (Wix), DoD-скрипты.
---

# Skill: Dev Reference Snippets (Do/Don't)

## Цель
Дать копипаст-эталоны и анти-паттерны, чтобы код был консистентным, тестируемым (TDD), безопасным и удобным в поддержке.

---

## 1) TDD: RED → GREEN → REFACTOR (пример)

### ✅ DO: тест сначала (Vitest)
```ts
// src/lib/slugify.test.ts
import { describe, it, expect } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("makes lowercase and replaces spaces with hyphens", () => {
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

### ✅ GREEN: минимальная реализация
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

### ❌ DON'T: “сначала код, потом тесты” + тестирование деталей
```ts
// Плохо: тест проверяет внутренние переменные/шаги реализации, а не поведение.
// Итог: тесты ломаются при рефакторинге без изменения поведения.
```

---

## 2) API: слои Route → Controller → Service → Repo (Express)

### ✅ DO: структура проекта (пример)
```txt
src/
  http/
    routes/
    controllers/
    middleware/
  domain/
    services/
    models/
  data/
    repos/
  lib/
```

### ✅ DO: Routes тонкие, логика в controller/service
```ts
// src/http/routes/users.routes.ts
import { Router } from "express";
import { createUser } from "../controllers/users.create";
import { requireAuth } from "../middleware/requireAuth";

export const usersRouter = Router();

usersRouter.post("/", requireAuth, createUser);
```

### ❌ DON'T: всё в одном файле роутов
```ts
// Плохо: в routes файл запихана валидация, бизнес-логика и доступ к БД.
// Тестирование и переиспользование становится болью.
```

---

## 3) Валидация на границе + безопасные ошибки (Zod)

### ✅ DO: parse на входе, безопасная обработка ошибок
```ts
// src/http/controllers/users.create.ts
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
    const input = CreateUserSchema.parse(req.body); // ✅ boundary validation
    const user = await usersService.create(input);
    res.status(201).json({ id: user.id });
  } catch (err) {
    // zod errors -> 422
    next(err instanceof z.ZodError ? AppError.validation(err.flatten()) : err);
  }
}
```

### ❌ DON'T: доверять req.body
```ts
// Плохо: нет валидации, можно словить мусор/инъекции/500
export async function createUser(req: any, res: any) {
  const user = await usersService.create(req.body);
  res.json(user);
}
```

---

## 4) Централизованный error handler (единый формат ошибок)

### ✅ DO: AppError + единый формат { error_code, message, details? }
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
  }

  static validation(details: unknown) {
    return new AppError(422, "VALIDATION_ERROR", "Invalid input", details);
  }

  static forbidden() {
    return new AppError(403, "FORBIDDEN", "Not enough permissions");
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isApp = err instanceof AppError;
  const status = isApp ? err.status : 500;
  const code = isApp ? err.code : "INTERNAL_ERROR";

  // Без утечек: для 500 — нейтральное сообщение
  const message = status === 500 ? "Unexpected error" : err.message;

  res.status(status).json({
    error_code: code,
    message,
    ...(isApp && err.details ? { details: err.details } : {}),
  });
};
```

### ❌ DON'T: отдавать “err” целиком (утечка стека/SQL/секретов)
```ts
// Плохо: утечка внутренностей и нестабильный контракт
res.status(500).json({ err });
```

---

## 5) Логирование: request_id, структурированные логи, запрет PII/секретов

### ✅ DO: request_id middleware + структурированные логи
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
// usage example
logger.info(
  { request_id: (req as any).requestId, user_id: ctx.user?.id },
  "user_created"
);
```

### ❌ DON'T: логировать body целиком (там пароли/токены/PII)
```ts
// Плохо: утечка секретов в логи
logger.info({ body: req.body }, "incoming_request");
```

---

## 6) React: loading/empty/error/success (TanStack Query)

### ✅ DO: явные состояния
```tsx
import { useQuery } from "@tanstack/react-query";

type User = { id: string; name: string };

async function fetchUsers(): Promise<User[]> {
  const r = await fetch("/api/users");
  if (!r.ok) throw new Error("Failed to load users");
  return r.json();
}

export function UsersList() {
  const q = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  if (q.isLoading) return <div aria-busy="true">Loading…</div>;
  if (q.isError) return <div role="alert">Error: {String(q.error)}</div>;
  if (!q.data || q.data.length === 0) return <div>No users yet</div>;

  return (
    <ul>
      {q.data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

### ❌ DON'T: fetch внутри render / без error/empty
```tsx
// Плохо: нет обработки ошибок/пустоты, легко словить гонки и “мерцания”.
```

---

## 7) Zustand: маленькие стооры по доменам + селекторы

### ✅ DO: доменный стор + селектор
```ts
import { create } from "zustand";

type AuthState = {
  token: string | null;
  setToken: (t: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (t) => set({ token: t }),
}));

// usage: подписываемся только на нужное
const token = useAuthStore((s) => s.token);
```

### ❌ DON'T: “бог-стор” на всё приложение
```ts
// Плохо: один огромный store с десятками полей и действий → лишние ререндеры и каша доменов.
```

---

## 8) RTK: slices по доменам + нормализация (EntityAdapter)

### ✅ DO: entityAdapter для списка пользователей
```ts
// src/state/usersSlice.ts
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "./store";

type User = { id: string; name: string };

export const usersAdapter = createEntityAdapter<User>();

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const r = await fetch("/api/users");
  if (!r.ok) throw new Error("Failed to load users");
  return (await r.json()) as User[];
});

const slice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({ status: "idle" as "idle" | "loading" | "failed" }),
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s) => {
      s.status = "loading";
    });
    b.addCase(fetchUsers.fulfilled, (s, a) => {
      s.status = "idle";
      usersAdapter.setAll(s, a.payload);
    });
    b.addCase(fetchUsers.rejected, (s) => {
      s.status = "failed";
    });
  },
});

export const usersReducer = slice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>((st) => st.users);
```

### ❌ DON'T: side effects в компонентах + ручные “простыни” редьюсеров
```ts
// Плохо: компонент сам дергает fetch, сам хранит кэш, сам нормализует.
// Итог: непредсказуемость и дублирование.
```

---

## 9) Безопасность: authz на сервере (не доверять клиенту)

### ✅ DO: проверка прав на сервере
```ts
import { AppError } from "../http/middleware/errors";

export function requireRole(user: { role: string } | null, role: string) {
  if (!user) throw new AppError(401, "UNAUTHORIZED", "Authentication required");
  if (user.role !== role) throw AppError.forbidden();
}
```

### ❌ DON'T: “если кнопку спрятали — значит безопасно”
```ts
// Плохо: безопасность только на UI.
// Сервер обязан проверять авторизацию/права.
```

---

## 10) Legacy: React 15.3 (Wix iFrame) + DoD scripts

### ✅ DO: React 15.3 class component + lifecycle
```jsx
class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, data: null, error: null };
  }

  componentDidMount() {
    this.load();
  }

  load() {
    apiFetch()
      .then((data) => this.setState({ loading: false, data: data }))
      .catch(() => this.setState({ loading: false, error: "Failed" }));
  }

  render() {
    if (this.state.loading) return React.createElement("div", null, "Loading…");
    if (this.state.error) return React.createElement("div", { role: "alert" }, this.state.error);
    return React.createElement("div", null, "OK");
  }
}
```

### ❌ DON'T: hooks/современные API (в React 15.3 нельзя)
```tsx
// Нельзя в React 15.3
// function Widget(){ const [x,setX]=useState(...) }
```

### ✅ DO: DoD scripts (package.json)
```json
{
  "scripts": {
    "dev": "node ./src/index.js",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint": "biome lint .",
    "format": "biome format . --write"
  }
}
```

### ❌ DON'T: смешивать форматтеры/линтеры без причины
```txt
// Плохо: eslint + prettier + biome одновременно без согласованных правил → вечные конфликты и шум в PR.
```