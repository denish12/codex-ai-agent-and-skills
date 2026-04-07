---
name: react-beast-practices
description: React best practices для Senior-уровня: composition, container/presenter, custom hooks, context, производительность (memo/useMemo/useCallback), code splitting, error boundaries, a11y. Используй этот скилл всегда, когда задача касается архитектуры React-компонентов, оптимизации ре-рендеров, работы с формами, тестирования компонентов или выбора паттерна для переиспользуемой логики.
---

# Skill: React Beast Practices

> Живые примеры и DO/DON'T — в `dev-reference-snippets`. Этот файл — архитектурный компас.

---

## 1. Компонентные паттерны

### Composition over inheritance
Собирай сложное поведение из простых кирпичей через `children` и render-props, а не через наследование.

```tsx
// ✅ Composition
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

function UserCard({ user }: { user: User }) {
  return (
    <Card>
      <Avatar src={user.avatar} />
      <h2>{user.name}</h2>
    </Card>
  );
}
```

### Container / Presenter
Разделяй *откуда данные* и *как они выглядят*. Presenter — чистая функция от props, тестируется без моков.

```tsx
// ✅ Presenter — только UI, никакой логики
function UserListView({ users, isLoading, error }: UserListViewProps) {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner message={error} />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// ✅ Container — данные и состояние
function UserListContainer() {
  const { data, isLoading, error } = useUsers(); // custom hook
  return <UserListView users={data ?? []} isLoading={isLoading} error={error?.message} />;
}
```

### Compound Components
Используй когда компоненты логически связаны и должны делить состояние, но оставаться гибкими в разметке.

```tsx
// ✅ Compound: Tabs
const TabsContext = createContext<TabsContextValue | null>(null);

function Tabs({ defaultTab, children }: TabsProps) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.List = function TabList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ value, children }: TabProps) {
  const ctx = useContext(TabsContext)!;
  return (
    <button role="tab" aria-selected={ctx.active === value} onClick={() => ctx.setActive(value)}>
      {children}
    </button>
  );
};

// Usage:
// <Tabs defaultTab="profile">
//   <Tabs.List><Tabs.Tab value="profile">Profile</Tabs.Tab></Tabs.List>
// </Tabs>
```

---

## 2. Custom Hooks — переиспользуемая stateful-логика

Выноси в хук всё, что сложнее одного `useState`. Хук тестируется через `renderHook`.

```tsx
// ✅ Custom hook: useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// Тест (Vitest + @testing-library/react)
it("debounces value", async () => {
  const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
    initialProps: { v: "a" },
  });
  rerender({ v: "b" });
  expect(result.current).toBe("a"); // ещё не обновилось
  await act(() => new Promise(r => setTimeout(r, 200)));
  expect(result.current).toBe("b"); // теперь обновилось
});
```

---

## 3. Производительность

### Когда использовать memo / useMemo / useCallback

| Инструмент | Когда применять | Когда НЕ применять |
|---|---|---|
| `React.memo` | Presenter с дорогим рендером, получает стабильные props | Компоненты с часто меняющимися props |
| `useMemo` | Дорогие вычисления (>1ms), зависящие от props/state | Примитивные вычисления |
| `useCallback` | Колбэки, передаваемые в `memo`-компоненты или хуки | Колбэки, не передаваемые вниз |

```tsx
// ✅ Реальный кейс для useMemo
function DataTable({ rows, filter }: DataTableProps) {
  const filtered = useMemo(
    () => rows.filter(r => r.name.includes(filter)),
    [rows, filter] // не пересчитываем при других ре-рендерах
  );
  return <Table rows={filtered} />;
}
```

### Code Splitting
```tsx
// ✅ Lazy + Suspense для тяжёлых страниц/модалей
const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Виртуализация длинных списков
```tsx
// ✅ TanStack Virtual (не грузим DOM тысячами нод)
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });
  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(vRow => (
          <div key={vRow.index} style={{ position: "absolute", top: vRow.start }}>
            {items[vRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. Надёжность

### Error Boundary
```tsx
// ✅ Class-based Error Boundary (обязательно class, хуков нет)
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Сюда — отправка в Sentry/LogRocket
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// Usage: оборачивай секции, не весь app
// <ErrorBoundary fallback={<p>Что-то пошло не так</p>}>
//   <UserProfile />
// </ErrorBoundary>
```

### Тестирование компонента (Testing Library)
```tsx
// ✅ Тест Presenter-компонента
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("UserListView", () => {
  it("shows spinner while loading", () => {
    render(<UserListView users={[]} isLoading={true} error={undefined} />);
    expect(screen.getByRole("status")).toBeInTheDocument(); // spinner
  });

  it("shows error message", () => {
    render(<UserListView users={[]} isLoading={false} error="Network error" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Network error");
  });

  it("renders user list", () => {
    const users = [{ id: "1", name: "Alice" }];
    render(<UserListView users={users} isLoading={false} error={undefined} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});
```

---

## 5. Формы

```tsx
// ✅ Controlled + валидация + явные состояния ошибок
function LoginForm({ onSubmit }: { onSubmit: (d: LoginData) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!email.includes("@")) e.email = "Некорректный email";
    if (password.length < 8) e.password = "Минимум 8 символов";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    try { await onSubmit({ email, password }); }
    finally { setSubmitting(false); }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
        aria-describedby={errors.email ? "email-error" : undefined} />
      {errors.email && <span id="email-error" role="alert">{errors.email}</span>}

      <label htmlFor="password">Пароль</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
        aria-describedby={errors.password ? "pw-error" : undefined} />
      {errors.password && <span id="pw-error" role="alert">{errors.password}</span>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Входим…" : "Войти"}
      </button>
    </form>
  );
}
```

---

## 6. Доступность (a11y baseline)

| Правило | Пример |
|---|---|
| Интерактивные элементы — семантические теги | `<button>`, `<a>`, `<input>` вместо `<div onClick>` |
| Все изображения — `alt` | `<img alt="Avatar of Alice">` |
| Ошибки форм — `role="alert"` | `<span role="alert">Поле обязательно</span>` |
| Загрузка — `aria-busy` | `<div aria-busy="true">Загрузка…</div>` |
| Focus management в модалах | `autoFocus` на первый элемент, `focus-trap` при закрытии |
| Цвет — не единственный индикатор | Иконка + цвет, а не только цвет |

---

## См. также
- `dev-reference-snippets` — TDD, API-слои, Zustand, RTK, безопасность, legacy React 15.3
