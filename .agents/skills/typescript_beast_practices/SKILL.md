---
name: typescript_beast_practices
description: TypeScript практики Senior-уровня: strict-режим, utility types, discriminated unions, type guards, branded types, типобезопасные API-контракты с Zod, безопасные DTO, минимизация any/as. Используй этот скилл при написании или ревью любого TypeScript кода — особенно при типизации API-ответов, моделировании доменных состояний, работе с generics и при вопросах «как правильно типизировать X».
---

# Skill: TypeScript Beast Practices

Конкретные DO/DON'T паттерны для типобезопасного, рефакторинг-дружелюбного кода.

**Разделы:**
1. [Конфигурация: strict и почему](#1-конфигурация)
2. [Utility Types: встроенные инструменты](#2-utility-types)
3. [Discriminated Unions: моделирование состояний](#3-discriminated-unions)
4. [Type Guards и Narrowing](#4-type-guards)
5. [Branded Types: семантическая безопасность](#5-branded-types)
6. [Generics: когда и как](#6-generics)
7. [Zod: типобезопасные границы](#7-zod)
8. [Запреты: any, as, !](#8-запреты)

---

## 1. Конфигурация

### ✅ DO: минимальный strict tsconfig
```json
{
  "compilerOptions": {
    "strict": true,               // включает все флаги ниже разом
    "noUncheckedIndexedAccess": true, // arr[i] → T | undefined, не T
    "noImplicitReturns": true,    // все ветки должны вернуть значение
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true, // { a?: string } ≠ { a: string | undefined }
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM"]
  }
}
```

### Что включает `strict: true`
| Флаг | Что ловит |
|---|---|
| `strictNullChecks` | `null`/`undefined` не присваиваются любому типу |
| `strictFunctionTypes` | Небезопасная ковариантность параметров функций |
| `strictPropertyInitialization` | Поля класса обязаны быть инициализированы |
| `noImplicitAny` | Запрет неявного `any` |
| `noImplicitThis` | `this` должен быть типизирован |

---

## 2. Utility Types

### ✅ DO: использовать встроенные вместо ручного дублирования
```ts
type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

// ✅ Убираем чувствительные поля для API-ответа
type PublicUser = Omit<User, "passwordHash">;

// ✅ Все поля опциональны — для PATCH-запросов
type UpdateUserDto = Partial<Omit<User, "id" | "createdAt">>;

// ✅ Только нужные поля — для формы
type LoginForm = Pick<User, "email"> & { password: string };

// ✅ Поля только для чтения — для иммутабельных объектов
type FrozenUser = Readonly<User>;

// ✅ Словарь по id
type UserMap = Record<string, User>;
```

### ✅ DO: ReturnType / Parameters для вывода типов
```ts
// ✅ Тип берётся из реализации — не расходится при рефакторинге
async function fetchUser(id: string) {
  return db.users.findUnique({ where: { id } });
}

type UserFromDB = Awaited<ReturnType<typeof fetchUser>>; // User | null

// ✅ Тип параметров функции
type FetchUserArgs = Parameters<typeof fetchUser>; // [string]
```

### ✅ DO: Mapped Types для трансформаций
```ts
// ✅ Все поля становятся nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// ✅ Все поля становятся промисами
type Promised<T> = { [K in keyof T]: Promise<T[K]> };

// ✅ Только числовые поля
type NumericFields<T> = {
  [K in keyof T as T[K] extends number ? K : never]: T[K];
};

type Stats = { clicks: number; views: number; label: string };
type NumericStats = NumericFields<Stats>; // { clicks: number; views: number }
```

---

## 3. Discriminated Unions

### ✅ DO: моделировать состояния явно — не булевыми флагами
```ts
// ❌ Плохо: флаги могут быть в невалидных комбинациях
type RequestBad = {
  isLoading: boolean;
  data: User | null;
  error: string | null;
  // Что значит isLoading=true AND data!=null? Неопределено.
};

// ✅ Хорошо: каждое состояние — отдельный тип, невалидные комбинации невозможны
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// ✅ TypeScript сужает тип в каждой ветке
function renderUser(state: RequestState<User>) {
  switch (state.status) {
    case "loading": return <Spinner />;
    case "error":   return <Alert>{state.error}</Alert>;  // state.error доступен
    case "success": return <Profile user={state.data} />; // state.data доступен
    case "idle":    return null;
  }
}
```

### ✅ DO: exhaustive check — TS ругается если забыл ветку
```ts
function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}

function renderState(state: RequestState<User>) {
  switch (state.status) {
    case "idle":    return null;
    case "loading": return <Spinner />;
    case "success": return <Profile user={state.data} />;
    case "error":   return <Alert>{state.error}</Alert>;
    default:        return assertNever(state); // ❌ ошибка компиляции если ветка забыта
  }
}
```

### ✅ DO: Result type вместо throw
```ts
type Result<T, E = string> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

async function parseConfig(raw: string): Promise<Result<Config>> {
  try {
    return { ok: true, value: JSON.parse(raw) as Config };
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
}

// Использование — явная обработка обоих случаев
const result = await parseConfig(input);
if (!result.ok) {
  console.error(result.error);
  return;
}
console.log(result.value); // Config — сужен автоматически
```

---

## 4. Type Guards

### ✅ DO: user-defined type guard вместо as
```ts
// ❌ Плохо: as — принудительное приведение, обходит type checker
function processResponse(data: unknown) {
  const user = data as User; // TS доверяет тебе — может взорваться в runtime
  console.log(user.name);
}

// ✅ Хорошо: guard проверяет структуру в runtime
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id"    in value && typeof (value as any).id    === "string" &&
    "name"  in value && typeof (value as any).name  === "string" &&
    "email" in value && typeof (value as any).email === "string"
  );
}

function processResponse(data: unknown) {
  if (!isUser(data)) throw new Error("Invalid user shape");
  console.log(data.name); // ✅ тип User гарантирован
}
```

### ✅ DO: Zod как type guard на стероидах (см. раздел 7)
```ts
// ✅ Zod генерирует и тип, и runtime-валидацию из одного источника
const UserSchema = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof UserSchema>; // тип выводится автоматически

const result = UserSchema.safeParse(data);
if (!result.success) throw new Error("Invalid");
const user = result.data; // User — проверено в runtime
```

### ✅ DO: narrowing через `in` и `instanceof`
```ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow(); // Cat
  } else {
    animal.bark(); // Dog
  }
}

function handleError(err: unknown) {
  if (err instanceof Error) {
    console.error(err.message); // Error — сужен
  } else {
    console.error("Unknown error", err);
  }
}
```

---

## 5. Branded Types

### ✅ DO: branded types для семантически разных строк/чисел
```ts
// ❌ Плохо: UserId и OrderId — оба string, легко перепутать
function getOrder(userId: string, orderId: string) { /* ... */ }
getOrder(orderId, userId); // TS промолчит, runtime сломается

// ✅ Хорошо: branded type делает типы несовместимыми
type Brand<T, B> = T & { readonly __brand: B };

type UserId  = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getOrder(userId: UserId, orderId: OrderId) { /* ... */ }

// Создание через конструктор/парсер
function toUserId(raw: string): UserId {
  if (!raw.startsWith("usr_")) throw new Error("Invalid UserId");
  return raw as UserId; // единственное легитимное место для as
}

const uid = toUserId("usr_123");
const oid = "ord_456" as OrderId;

getOrder(uid, oid);   // ✅
getOrder(oid, uid);   // ❌ ошибка компиляции — перепутали местами
```

---

## 6. Generics

### ✅ DO: generics с constraints — не просто `<T>`
```ts
// ✅ T ограничен — не принимает что попало
function getField<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const name = getField({ name: "Alice", age: 30 }, "name"); // string
// getField({ name: "Alice" }, "missing"); // ❌ ошибка компиляции

// ✅ Generic с дефолтом
type ApiResponse<T = unknown> = {
  data: T;
  meta: { page: number; total: number };
};
```

### ✅ DO: conditional types для умных утилит
```ts
// ✅ Тип зависит от значения другого типа
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>;          // number

// ✅ Flatten array
type Flatten<T> = T extends Array<infer U> ? U : T;

type C = Flatten<string[]>; // string
type D = Flatten<number>;   // number
```

### ❌ DON'T: over-engineering generics
```ts
// ❌ Плохо: generic ради generic — усложняет, не добавляет безопасности
function identity<T>(x: T): T { return x; } // если используется один раз — просто напиши тип

// ✅ Generics нужны когда тип используется в >1 месте в сигнатуре
function first<T>(arr: T[]): T | undefined { return arr[0]; }
```

---

## 7. Zod

### ✅ DO: единый источник правды для типа и валидации
```ts
import { z } from "zod";

// ✅ Схема = тип + runtime-валидация из одного места
const CreateUserSchema = z.object({
  email:    z.string().email(),
  name:     z.string().min(1).max(100),
  role:     z.enum(["admin", "user"]).default("user"),
  age:      z.number().int().min(18).optional(),
});

type CreateUserDto = z.infer<typeof CreateUserSchema>; // тип автоматически

// ✅ Валидация на границе (HTTP-контроллер)
export async function createUser(req: Request, res: Response, next: NextFunction) {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return next(AppError.validation(result.error.flatten()));
  }
  const dto = result.data; // CreateUserDto — типобезопасно
  const user = await usersService.create(dto);
  res.status(201).json({ id: user.id });
}
```

### ✅ DO: трансформации и рефайны в схеме
```ts
const DateRangeSchema = z.object({
  from: z.string().datetime(),
  to:   z.string().datetime(),
}).refine(
  data => new Date(data.from) <= new Date(data.to),
  { message: "from must be before to", path: ["from"] }
);

// ✅ transform — парсинг прямо в нужный тип
const NumericIdSchema = z.string().regex(/^\d+$/).transform(Number);
type NumericId = z.infer<typeof NumericIdSchema>; // number
```

### ✅ DO: переиспользование схем через extend/merge/pick
```ts
const UserBaseSchema = z.object({
  name:  z.string(),
  email: z.string().email(),
});

const CreateUserSchema = UserBaseSchema.extend({
  password: z.string().min(8),
});

const UpdateUserSchema = UserBaseSchema.partial(); // все поля опциональны

const PublicUserSchema = UserBaseSchema.pick({ name: true }); // только name
```

---

## 8. Запреты

### ❌ DON'T: `any` — полное отключение type checker
```ts
// ❌ any заражает весь граф типов вокруг себя
function process(data: any) {
  data.foo.bar.baz; // TS молчит, runtime взрывается
}

// ✅ unknown — безопасная альтернатива: требует сужения перед использованием
function process(data: unknown) {
  if (typeof data !== "object" || data === null) throw new Error("Expected object");
  // теперь data: object — можно сужать дальше
}
```

### ❌ DON'T: `as` для "заглушения" ошибок
```ts
// ❌ as — молчаливое обещание компилятору которое ты можешь не выполнить
const user = response.data as User; // а вдруг там null? или другой тип?

// ✅ Проверяй через Zod или type guard
const result = UserSchema.safeParse(response.data);
if (!result.success) throw new Error("Unexpected API shape");
const user = result.data; // User — реально проверено
```

### ❌ DON'T: `!` non-null assertion без гарантии
```ts
// ❌ ! говорит TS "доверяй мне, там не null" — опасно
const el = document.getElementById("app")!;
el.innerHTML = "Hello"; // если нет элемента — взрыв

// ✅ Явная проверка
const el = document.getElementById("app");
if (!el) throw new Error("#app element not found");
el.innerHTML = "Hello";
```

### Когда `as` и `!` допустимы
```ts
// ✅ as — только в конструкторах branded types (единственное легитимное место)
return raw as UserId;

// ✅ ! — только когда ты 100% контролируешь наличие элемента (тесты, seeding)
const btn = screen.getByRole("button")!; // testing-library гарантирует наличие
```

---

## См. также
- `dev_reference_snippets` → раздел 3 (Zod-валидация в контроллере)
- `es2025_beast_practices` → деструктуризация, nullish coalescing
