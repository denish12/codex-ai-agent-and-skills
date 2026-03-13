---
name: typescript_beast_practices
description: Senior-level TypeScript practices: strict mode, utility types, discriminated unions, type guards, branded types, typed API contracts with Zod, safe DTOs, minimizing any/as. Use this skill when writing or reviewing any TypeScript code ? especially typing API responses, modeling domain states, working with generics, and questions like "how to type X correctly".
---

# Skill: TypeScript Beast Practices

Concrete DO/DON'T patterns for type, refactoring code.

**Sections:**
1. [Configuration: strict and why](#1-configuration)
2. [Utility Types: embedded tools](#2-utility-types)
3. [Discriminated Unions: modeling states](#3-discriminated-unions)
4. [Type Guards and Narrowing](#4-type-guards)
5. [Branded Types: semantic security](#5-branded-types)
6. [Generics: when and how](#6-generics)
7. [Zod: type boundaries](#7-zod)
8. [Bans: any, as, !](#8-bans)

---

## 1. Configuration

### ✅ DO: minimum strict tsconfig
```json
{
  "compilerOptions": {
    "strict": true,               // includes all flags below at once
    "noUncheckedIndexedAccess": true, // arr[i] → T | undefined, not T
    "noImplicitReturns": true,    // all branches must return a value
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true, // { a?: string } ≠ { a: string | undefined }
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM"]
  }
}
```

### What includes `strict: true`
| Flag | What it catches |
|---|---|
| `strictNullChecks` | `null`/`undefined` are not assignable to any type |
| `strictFunctionTypes` | Unsafe covariance of function parameters |
| `strictPropertyInitialization` | Class fields must be initialized |
| `noImplicitAny` | Ban implicit `any` |
| `noImplicitThis` | `this` must be type |

---

## 2. Utility Types

### ✅ DO: use embedded instead of manual duplication
```ts
type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

// ? Remove sensitive fields for API responses
type PublicUser = Omit<User, "passwordHash">;

// ? All fields are optional ? for PATCH requests
type UpdateUserDto = Partial<Omit<User, "id" | "createdAt">>;

// ✅ Only needed fields — forms
type LoginForm = Pick<User, "email"> & { password: string };

// ? Readonly fields ? for object immutability
type FrozenUser = Readonly<User>;

// ? Dictionary by id
type UserMap = Record<string, User>;
```

### ? DO: ReturnType / Parameters for derived types
```ts
// ? Type comes from the implementation ? does not diverge with refactoring
async function fetchUser(id: string) {
  return db.users.findUnique({ where: { id } });
}

type UserFromDB = Awaited<ReturnType<typeof fetchUser>>; // User | null

// ✅ Type parameters functions
type FetchUserArgs = Parameters<typeof fetchUser>; // [string]
```

### ✅ DO: Mapped Types for transformations
```ts
// ? All fields become nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

// ? All fields become promises
type Promised<T> = { [K in keyof T]: Promise<T[K]> };

// ? Only numeric fields
type NumericFields<T> = {
  [K in keyof T as T[K] extends number ? K : never]: T[K];
};

type Stats = { clicks: number; views: number; label: string };
type NumericStats = NumericFields<Stats>; // { clicks: number; views: number }
```

---

## 3. Discriminated Unions

### ? DO: model states explicitly ? not with boolean flags
```ts
// ? Bad: flags can be in invalid combinations
type RequestBad = {
  isLoading: boolean;
  data: User | null;
  error: string | null;
  // What means isLoading=true AND data!=null? Undefined.
};

// ? Good: each state is a separate type, invalid combinations are impossible
type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// ? TypeScript narrows the type in each branch
function renderUser(state: RequestState<User>) {
  switch (state.status) {
    case "loading": return <Spinner />;
    case "error":   return <Alert>{state.error}</Alert>;  // state.error available
    case "success": return <Profile user={state.data} />; // state.data available
    case "idle":    return null;
  }
}
```

### ? DO: exhaustive checks ? TS complains if you forgot a branch
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
    default:        return assertNever(state); // ? compilation error if a branch is forgotten
  }
}
```

### ✅ DO: Result type instead of throw
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

// Usage ? explicit handling of both cases
const result = await parseConfig(input);
if (!result.ok) {
  console.error(result.error);
  return;
}
console.log(result.value); // Config ? narrowed automatically
```

---

## 4. Type Guards

### ✅ DO: user-defined type guard instead of as
```ts
// ? Bad: as ? forced casting, bypasses the type checker
function processResponse(data: unknown) {
  const user = data as User; // TS trusts you ? may explode at runtime
  console.log(user.name);
}

// ✅ Well: guard checks structured in runtime
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
  console.log(data.name); // ✅ type User guaranteed
}
```

### ? DO: Zod as a type guard on steroids (see section 7)
```ts
// ? Zod generates both the type and runtime validation from one source
const UserSchema = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof UserSchema>; // type is inferred automatically

const result = UserSchema.safeParse(data);
if (!result.success) throw new Error("Invalid");
const user = result.data; // User — verified in runtime
```

### ✅ DO: narrowing via `in` and `instanceof`
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
    console.error(err.message); // Error ? narrowed
  } else {
    console.error("Unknown error", err);
  }
}
```

---

## 5. Branded Types

### ? DO: branded types for semantically different strings/numbers
```ts
// ? Bad: UserId and OrderId ? both string, easy to mix up
function getOrder(userId: string, orderId: string) { /* ... */ }
getOrder(orderId, userId); // TS stays silent, runtime will break

// ? Good: branded types make the types incompatible
type Brand<T, B> = T & { readonly __brand: B };

type UserId  = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function getOrder(userId: UserId, orderId: OrderId) { /* ... */ }

// Creation via constructor/parser
function toUserId(raw: string): UserId {
  if (!raw.startsWith("usr_")) throw new Error("Invalid UserId");
  return raw as UserId; // only legitimate place for as
}

const uid = toUserId("usr_123");
const oid = "ord_456" as OrderId;

getOrder(uid, oid);   // ✅
getOrder(oid, uid);   // ? compilation error ? arguments were swapped
```

---

## 6. Generics

### ✅ DO: generics with constraints — not simply `<T>`
```ts
// ? T is constrained ? does not accept arbitrary input
function getField<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const name = getField({ name: "Alice", age: 30 }, "name"); // string
// getField({ name: "Alice" }, "missing"); // ❌ error compilation

// ? Generic with a default
type ApiResponse<T = unknown> = {
  data: T;
  meta: { page: number; total: number };
};
```

### ? DO: conditional types for smart utilities
```ts
// ? Type depends on values from another type
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
// ? Bad: generic for the sake of a generic ? adds complexity, no safety
function identity<T>(x: T): T { return x; } // if is used one times — simply write type

// ? Generics are needed when the type is used in >1 place in the signature
function first<T>(arr: T[]): T | undefined { return arr[0]; }
```

---

## 7. Zod

### ✅ DO: unified source truth for type and validation
```ts
import { z } from "zod";

// ✅ Schema = type + runtime-validation from one places
const CreateUserSchema = z.object({
  email:    z.string().email(),
  name:     z.string().min(1).max(100),
  role:     z.enum(["admin", "user"]).default("user"),
  age:      z.number().int().min(18).optional(),
});

type CreateUserDto = z.infer<typeof CreateUserSchema>; // type automatically

// ✅ Validation on boundary (HTTP-controller)
export async function createUser(req: Request, res: Response, next: NextFunction) {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return next(AppError.validation(result.error.flatten()));
  }
  const dto = result.data; // CreateUserDto — type
  const user = await usersService.create(dto);
  res.status(201).json({ id: user.id });
}
```

### ? DO: transformations and refinements in the schema
```ts
const DateRangeSchema = z.object({
  from: z.string().datetime(),
  to:   z.string().datetime(),
}).refine(
  data => new Date(data.from) <= new Date(data.to),
  { message: "from must be before to", path: ["from"] }
);

// ? transform ? parse directly into the needed type
const NumericIdSchema = z.string().regex(/^\d+$/).transform(Number);
type NumericId = z.infer<typeof NumericIdSchema>; // number
```

### ? DO: reuse schemas via extend/merge/pick
```ts
const UserBaseSchema = z.object({
  name:  z.string(),
  email: z.string().email(),
});

const CreateUserSchema = UserBaseSchema.extend({
  password: z.string().min(8),
});

const UpdateUserSchema = UserBaseSchema.partial(); // all fields optional

const PublicUserSchema = UserBaseSchema.pick({ name: true }); // only name
```

---

## 8. Bans

### ? DON'T: `any` ? full disabling of the type checker
```ts
// ? any infects the entire graph of types around it
function process(data: any) {
  data.foo.bar.baz; // TS stays silent, runtime explodes
}

// ? unknown ? safe alternative: requires narrowing before use
function process(data: unknown) {
  if (typeof data !== "object" || data === null) throw new Error("Expected object");
  // now data: object ? can be narrowed further
}
```

### ? DON'T: `as` to "silence" errors
```ts
// ? as ? a silent promise to the compiler that you may not fulfill at runtime
const user = response.data as User; // and what if it is null? or another type?

// ✅ Check via Zod or type guard
const result = UserSchema.safeParse(response.data);
if (!result.success) throw new Error("Unexpected API shape");
const user = result.data; // User — really verified
```

### ? DON'T: `!` non-null assertion without a guarantee
```ts
// ? ! tells TS "trust me, it is not null" ? dangerous
const el = document.getElementById("app")!;
el.innerHTML = "Hello"; // if there is no element ? crash

// ✅ Explicit check
const el = document.getElementById("app");
if (!el) throw new Error("#app element not found");
el.innerHTML = "Hello";
```

### When `as` and `!` are acceptable
```ts
// ✅ as — only in constructor branded types (only legitimate place)
return raw as UserId;

// ? ! ? only when you 100% control the presence of the element (tests, seeding)
const btn = screen.getByRole("button")!; // testing-library guarantee presence
```

---

## See also
- `dev_reference_snippets` → section 3 (Zod-validation in controller)
- `es2025_beast_practices` → destructuring, nullish coalescing
