---
name: dev-reference-snippets
description: Эталонные сниппеты и DO/DON'T для Senior Full Stack: TDD (Vitest), Express API (Route→Controller→Service→Repo), валидация (Zod), централизованные ошибки, структурированное логирование, React + TanStack Query, Zustand, RTK (EntityAdapter), авторизация на сервере, legacy React 15.3 (Wix). Используй этот скилл при написании любого production-кода на Node.js/TypeScript/React — как источник копипаст-эталонов и чеклист для код-ревью. Также используй при вопросах «как правильно сделать X» для любого из перечисленных паттернов.
---

# Skill: Dev Reference Snippets (Do/Don't)

Копипаст-эталоны и анти-паттерны для консистентного, тестируемого, безопасного кода.

**Разделы:**
1. [TDD: RED → GREEN → REFACTOR](#1-tdd)
2. [API: Route → Controller → Service → Repo](#2-api-слои)
3. [Валидация на границе (Zod)](#3-валидация)
4. [Централизованный error handler](#4-error-handler)
5. [Логирование: request_id + структура](#5-логирование)
6. [React: loading/empty/error/success](#6-react-состояния)
7. [Zustand: доменные сторы](#7-zustand)
8. [RTK: slices + EntityAdapter](#8-rtk)
9. [Авторизация на сервере](#9-авторизация)
10. [Legacy React 15.3 (Wix)](#10-legacy-react-153)
11. [DoD Scripts](#11-dod-scripts)

---

## 1. TDD

### ✅ DO: тест сначала (Vitest)
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

### ❌ DON'T: тестировать детали реализации
```ts
// Плохо: тест проверяет внутренние переменные, а не поведение.
// Сломается при рефакторинге без изменения поведения — хрупкие тесты.
```

**Правило**: тестируй *что делает*, не *как устроено внутри*.

---

## 2. API-слои

### ✅ DO: структура проекта
```
src/
  http/
    routes/       ← только маршрутизация
    controllers/  ← I/O: parse input, вызов service, format response
    middleware/   ← auth, errors, request-context
  domain/
    services/     ← бизнес-логика
    models/       ← типы домена
  data/
    repos/        ← SQL/ORM, никакой бизнес-логики
  lib/            ← утилиты без зависимостей
```

### ✅ DO: тонкий роут
```ts
// src/http/routes/users.routes.ts
import { Router } from "express";
import { createUser, getUser } from "../controllers/users.controller";
import { requireAuth } from "../middleware/requireAuth";

export const usersRouter = Router();
usersRouter.post("/", requireAuth, createUser);
usersRouter.get("/:id", requireAuth, getUser);
```

### ✅ DO: контроллер — только I/O
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

### ✅ DO: сервис — только бизнес-логика, без HTTP
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

### ❌ DON'T: всё в одном файле
```ts
// Плохо: маршруты, валидация, бизнес-логика и SQL в одном файле.
// Нельзя тестировать сервис без HTTP, нельзя переиспользовать логику.
```

---

## 3. Валидация

### ✅ DO: Zod на границе + parse (бросает при невалидных данных)
```ts
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["admin", "user"]).default("user"),
});

// В контроллере:
const input = CreateUserSchema.parse(req.body); // ✅ валидный тип гарантирован дальше
```

### ✅ DO: safeParse для необрасывающей обработки
```ts
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return next(AppError.validation(result.error.flatten()));
}
const input = result.data; // тип выведен автоматически
```

### ❌ DON'T: доверять req.body без валидации
```ts
// Плохо: любой мусор, инъекция лишних полей, 500 в runtime — всё это ждёт впереди.
export async function createUser(req: any, res: any) {
  const user = await usersService.create(req.body);
  res.json(user);
}
```

---

## 4. Error Handler

### ✅ DO: AppError + единый формат ответа
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
  // ❗ Для 500 — нейтральное сообщение, стек не утекает клиенту
  const message = status === 500 ? "Unexpected error" : err.message;

  res.status(status).json({
    error_code: code,
    message,
    ...(isApp && err.details ? { details: err.details } : {}),
  });
};
```

### ✅ DO: подключить последним middleware
```ts
// src/app.ts
app.use(requestContext);
app.use("/api/users", usersRouter);
app.use(errorHandler); // ← последним
```

### ❌ DON'T: отдавать err целиком
```ts
// Плохо: утечка стека, SQL-ошибок, переменных окружения — прямо в ответ клиенту.
res.status(500).json({ err });
```

---

## 5. Логирование

### ✅ DO: request_id + структурированные логи
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
// Использование в сервисе/контроллере
logger.info(
  { request_id: (req as any).requestId, user_id: ctx.user?.id, action: "user_created" },
  "User created successfully"
);

// Для ошибок — warn/error с контекстом
logger.error(
  { request_id: id, error_code: err.code },
  "Request failed"
);
```

### ❌ DON'T: логировать body целиком
```ts
// Плохо: пароли, токены, PII — всё прямо в логи.
logger.info({ body: req.body }, "incoming_request");

// ❌ Также плохо:
logger.info({ user }); // может содержать password_hash, secrets и т.д.
```

**Правило**: логируй только ID, коды, статусы. Никогда — сырые тела запросов.

---

## 6. React: Состояния запроса

### ✅ DO: TanStack Query — явные loading/empty/error/success
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

  if (q.isLoading) return <div aria-busy="true" role="status">Загрузка…</div>;
  if (q.isError)   return <div role="alert">Ошибка: {String(q.error)}</div>;
  if (!q.data?.length) return <div>Пользователей пока нет</div>;

  return (
    <ul>
      {q.data.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

### ✅ DO: мутация с оптимистичным обновлением
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

### ❌ DON'T: fetch внутри компонента без обработки состояний
```tsx
// Плохо: гонки, мерцания, нет loading/error, утечка запроса при анмаунте.
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

### ✅ DO: доменный стор + селекторы
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

// ✅ Селектор — подписка только на нужное поле (нет лишних ре-рендеров)
const token = useAuthStore(s => s.token);
const isAuthed = useAuthStore(s => s.token !== null);
```

### ❌ DON'T: один "бог-стор" на всё
```ts
// Плохо: auth + cart + ui + settings в одном сторе.
// Итог: любое изменение = ре-рендер всех подписчиков.
// Правило: один стор = один домен.
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

### ✅ DO: подключить reducer в store
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

### ❌ DON'T: side effects в компоненте + ручные редьюсеры
```ts
// Плохо: fetch в компоненте, switch/case вручную, нормализация руками.
// Итог: дублирование, непредсказуемость, тесты требуют реального HTTP.
```

---

## 9. Авторизация

### ✅ DO: проверка прав на сервере
```ts
// src/lib/authz.ts
import { AppError } from "../http/middleware/errors";

type Principal = { id: string; role: "admin" | "user" } | null;

export function requireRole(principal: Principal, role: "admin" | "user") {
  if (!principal) throw new AppError(401, "UNAUTHORIZED", "Authentication required");
  if (principal.role !== role) throw AppError.forbidden();
}

// Использование в сервисе:
export const postsService = {
  async delete(id: string, actor: Principal) {
    requireRole(actor, "admin"); // ✅ сервер всегда проверяет
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

### ❌ DON'T: безопасность только на UI
```ts
// Плохо: скрыть кнопку "Удалить" для не-админов и считать это защитой.
// Любой fetch("/api/posts/1", { method: "DELETE" }) обойдёт это.
// Сервер ОБЯЗАН проверять права независимо от UI.
```

---

## 10. Legacy React 15.3 (Wix)

### ✅ DO: class component + lifecycle
```jsx
// ❗ Только ES5/ES6 классы, никаких хуков
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
    this._unmounted = true; // предотвращаем setState после анмаунта
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

### ❌ DON'T: хуки и современные API в React 15.3
```tsx
// ❌ Нельзя — hooks появились в React 16.8
function Widget() { const [x, setX] = useState(0); }
// ❌ Нельзя — React.memo появился в React 16.6
export default React.memo(Widget);
// ❌ Нельзя — фрагменты <>...</> появились в React 16.2
```

---

## 11. DoD Scripts

### ✅ DO: стандартный package.json
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

### ❌ DON'T: смешивать eslint + prettier + biome
```
// Плохо: три инструмента с конфликтующими правилами → вечный шум в PR, 
// разные результаты у разных разработчиков.
// Выбери один: Biome (быстрый, всё-в-одном) или ESLint + Prettier.
```
