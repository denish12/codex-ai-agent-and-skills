---
name: react_beast_practices
description: React best practices for Senior-level: composition, container/presenter, custom hooks, context, performance (memo/useMemo/useCallback), code splitting, error boundaries, a11y. Use this skill always, when task concerns architecture React-components, optimizations re-renders, work with form, testing components or choosing a pattern for reusable logic.
---

#Skill: React Beast Practices

> Live examples and DO/DON'T — in `dev_reference_snippets`. This file — architectural compass.

---

## 1. component patterns

### Composition over inheritance
Build complex behavior from simple building blocks via `children` and render-props, and not through inheritance.

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
Separate *where the data comes from* and *how it looks*. A presenter is a pure function of props and is tested without mocks.

```tsx
// ✅ Presenter — only UI, no logic
function UserListView({ users, isLoading, error }: UserListViewProps) {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner message={error} />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// ✅ Container — data and state
function UserListContainer() {
  const { data, isLoading, error } = useUsers(); // custom hook
  return <UserListView users={data ?? []} isLoading={isLoading} error={error?.message} />;
}
```

### Compound Components
Use when components are logically connected and must share state, but remain flexible in markup.

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

## 2. Custom Hooks — reusable stateful-logic

Move into a hook everything that is more complex than a single `useState`. Test the hook via `renderHook`.

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

// Test (Vitest + @testing-library/react)
it("debounces value", async () => {
  const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
    initialProps: { v: "a" },
  });
  rerender({ v: "b" });
  expect(result.current).toBe("a"); // still not updated
  await act(() => new Promise(r => setTimeout(r, 200)));
  expect(result.current).toBe("b"); // now updated
});
```

---

## 3. Performance

### When use memo / useMemo / useCallback

| Tool | When apply | When Not apply |
|---|---|---|
| `React.memo` | Presenter with an expensive render, receives stable props | Components with often-changing props |
| `useMemo` | Expensive computations (>1ms) that depend on props/state | Primitive computations |
| `useCallback` | callbacks passed into `memo` components or hooks | callbacks not passed downward |

```tsx
// ✅ a real use case for useMemo
function DataTable({ rows, filter }: DataTableProps) {
  const filtered = useMemo(
    () => rows.filter(r => r.name.includes(filter)),
    [rows, filter] // not recompute on other re-renders
  );
  return <Table rows={filtered} />;
}
```

### Code Splitting
```tsx
// ✅ Lazy + Suspense for heavy pages/modals
const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Virtualization long lists
```tsx
// ✅ TanStack Virtual (not loading the DOM with thousands of nodes)
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

## 4. Reliability

### Error Boundary
```tsx
// ✅ Class-based Error Boundary (mandatory class, hooks no)
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Send to Sentry/LogRocket here
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// Usage: wrap sections, not the entire app
// <ErrorBoundary fallback={<p>Something went wrong</p>}>
//   <UserProfile />
// </ErrorBoundary>
```

### Testing component (Testing Library)
```tsx
// ✅ Test Presenter-component
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

## 5. Forms

```tsx
// ✅ Controlled + validation + explicit states errors
function LoginForm({ onSubmit }: { onSubmit: (d: LoginData) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!email.includes("@")) e.email = "Invalid email";
    if (password.length < 8) e.password = "Minimum 8 characters";
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

      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
        aria-describedby={errors.password ? "pw-error" : undefined} />
      {errors.password && <span id="pw-error" role="alert">{errors.password}</span>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
```

---

## 6. Access (a11y baseline)

| Rule | Example |
|---|---|
| interactive elements — semantic tags | `<button>`, `<a>`, `<input>` instead of `<div onClick>` |
| All images — `alt` | `<img alt="Avatar of Alice">` |
| Errors forms — `role="alert"` | `<span role="alert">Field required</span>` |
| Loading — `aria-busy` | `<div aria-busy="true">Loading…</div>` |
| Focus management in modals | `autoFocus` on first element, `focus-trap` on close |
| Color must not be the only indicator | Icon + color, not color alone |

---

## See also
- `dev_reference_snippets` — TDD, API-layers, Zustand, RTK, security, legacy React 15.3
