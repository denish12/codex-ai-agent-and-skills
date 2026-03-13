---
name: state_zustand_beast_practices
description: Zustand — simple global state without prop drilling, module store, selectors, avoiding extra rerenders. Patterns creation slice-stores, middleware (immer, persist, devtools), TypeScript typing, testing. Activate with creation new store, refactoring state management, or with questions «how correctly organize Zustand».
---

# Skill: Zustand Beast Practices

Concrete DO/DON'T patterns for Zustand — from architecture store to testing.

**Sections:**
1. [Architecture: slice stores](#1-architecture-slice-stores)
2. [Actions and logic](#2-actions-and-logic)
3. [Selectors and performance](#3-selectors-and-performance)
4. [Middleware: immer, persist, devtools](#4-middleware)
5. [TypeScript typing](#5-typescript-typing)
6. [Testing stores](#6-testing-stores)
7. [React integration](#7-react-integration)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Architecture: slice-stores

### ✅ DO: one store on domain (bounded context)

```js
// ✅ stores/coupon-store.js — responds only for coupons
import { create } from 'zustand';

export const useCouponStore = create((set, get) => ({
  // State
  coupons: [],
  selectedCouponId: null,
  isLoading: false,
  error: null,

  // Actions
  fetchCoupons: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/coupons');
      const coupons = await res.json();
      set({ coupons, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  selectCoupon: (id) => set({ selectedCouponId: id }),

  getSelectedCoupon: () => {
    const { coupons, selectedCouponId } = get();
    return coupons.find((c) => c.id === selectedCouponId) ?? null;
  },
}));
```

### ❌ DON'T: one «god store» on everything application

```js
// ? One store = everything in one place = unmanageable
const useStore = create((set) => ({
  // User
  user: null,
  isLoggedIn: false,
  loginUser: () => { /* ... */ },

  // Coupons
  coupons: [],
  fetchCoupons: () => { /* ... */ },

  // Templates
  templates: [],
  selectedTemplate: null,
  fetchTemplates: () => { /* ... */ },

  // UI
  isSidebarOpen: false,
  theme: 'light',
  
  // ... still 50 fields
}));
```

### ? DO: slice pattern for composite stores

```js
// slices/coupon-slice.js
export const createCouponSlice = (set, get) => ({
  coupons: [],
  isLoadingCoupons: false,

  fetchCoupons: async () => {
    set({ isLoadingCoupons: true });
    const coupons = await api.getCoupons();
    set({ coupons, isLoadingCoupons: false });
  },
});

// slices/template-slice.js
export const createTemplateSlice = (set, get) => ({
  templates: [],
  selectedTemplateId: null,

  selectTemplate: (id) => set({ selectedTemplateId: id }),

  getActiveTemplate: () => {
    const { templates, selectedTemplateId } = get();
    return templates.find((t) => t.id === selectedTemplateId);
  },
});

// stores/dashboard-store.js — composition
import { create } from 'zustand';
import { createCouponSlice } from '../slices/coupon-slice.js';
import { createTemplateSlice } from '../slices/template-slice.js';

export const useDashboardStore = create((...args) => ({
  ...createCouponSlice(...args),
  ...createTemplateSlice(...args),
}));
```

### Structure directories

```
src/
├── stores/
│   ├── coupon-store.js         # Domain store (small)
│   ├── template-store.js       # Domain store
│   └── dashboard-store.js      # Composition from slices (if needed)
├── slices/                      # With slice pattern
│   ├── coupon-slice.js
│   └── template-slice.js
└── test-utils/
    └── store-helpers.js         # Helpers for tests
```

---

## 2. Actions and logic

### ✅ DO: business logic in actions, UI-logic in components

```js
// ? Action encapsulates business logic
const useCouponStore = create((set, get) => ({
  coupons: [],

  /**
   * Applies coupon to request and update it status.
   * @param {string} couponId - ID coupon.
   * @param {string} orderId - order ID.
   */
  applyCoupon: async (couponId, orderId) => {
    const coupon = get().coupons.find((c) => c.id === couponId);
    if (!coupon) throw new Error(`Coupon ${couponId} not found`);
    if (!coupon.active) throw new Error(`Coupon ${couponId} is inactive`);

    await api.applyCoupon(orderId, couponId);

    set((state) => ({
      coupons: state.coupons.map((c) =>
        c.id === couponId ? { ...c, usageCount: c.usageCount + 1 } : c
      ),
    }));
  },
}));
```

### ✅ DO: set with updater function for complex update

```js
// ✅ Updater function — safely, not depends from closure
set((state) => ({
  coupons: state.coupons.map((c) =>
    c.id === id ? { ...c, active: false } : c
  ),
}));

// ? Reading state from a closure ? race condition
const coupons = get().coupons;
set({ coupons: coupons.map(/* ... */) }); // stale if another action updated coupons
```

### ✅ DO: reset action for return to initial state

```js
const INITIAL_STATE = {
  coupons: [],
  selectedCouponId: null,
  isLoading: false,
  error: null,
};

const useCouponStore = create((set) => ({
  ...INITIAL_STATE,

  // Actions...

  /** resets store to initial state. */
  reset: () => set(INITIAL_STATE),
}));
```

---

## 3. Selectors and performance

### ? DO: atomic selectors to prevent extra rerenders

```js
// ✅ Each component subscription only on needed field
function CouponList() {
  const coupons = useCouponStore((state) => state.coupons);
  return coupons.map((c) => <CouponCard key={c.id} coupon={c} />);
}

function LoadingSpinner() {
  const isLoading = useCouponStore((state) => state.isLoading);
  if (!isLoading) return null;
  return <Spinner />;
}

// ? Take the entire store ? rerender on any change
function CouponList() {
  const store = useCouponStore(); // subscription on Everything
  return store.coupons.map(/* ... */);
}
```

### ✅ DO: useShallow for objects/arrays from several fields

```js
import { useShallow } from 'zustand/react/shallow';

// ? shallow comparison ? rerender only on a real change
function CouponHeader() {
  const { coupons, isLoading } = useCouponStore(
    useShallow((state) => ({
      coupons: state.coupons,
      isLoading: state.isLoading,
    }))
  );

  return <h2>Coupons ({coupons.length}) {isLoading && '...'}</h2>;
}

// ? Without useShallow ? each set() creates a new object ? rerender
function CouponHeader() {
  const { coupons, isLoading } = useCouponStore((state) => ({
    coupons: state.coupons,
    isLoading: state.isLoading,
  })); // ❌ new object each times
}
```

### ✅ DO: derived (computed) values via selectors

```js
// ✅ selector function outside store — reusable
const selectActiveCoupons = (state) =>
  state.coupons.filter((c) => c.active);

const selectCouponById = (id) => (state) =>
  state.coupons.find((c) => c.id === id);

// Usage:
function ActiveCoupons() {
  const active = useCouponStore(selectActiveCoupons);
  // ...
}

function CouponDetail({ id }) {
  const coupon = useCouponStore(selectCouponById(id));
  // ...
}
```

### ⚠️ memoization heavy compute

```js
import { useMemo } from 'react';

function CouponStats() {
  const coupons = useCouponStore((state) => state.coupons);

  // ? Memoize heavy computation
  const stats = useMemo(() => ({
    total: coupons.length,
    active: coupons.filter((c) => c.active).length,
    totalDiscount: coupons.reduce((sum, c) => sum + c.discount, 0),
  }), [coupons]);

  return <StatsPanel stats={stats} />;
}
```

---

## 4. Middleware

### ✅ DO: immer for complex nested update

```js
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useTemplateStore = create(
  immer((set) => ({
    templates: [],

    // ✅ Mutations inside immer — immutability outside
    updateTemplateField: (templateId, field, value) =>
      set((state) => {
        const template = state.templates.find((t) => t.id === templateId);
        if (template) {
          template.config[field] = value; // direct mutation OK inside immer
        }
      }),

    addTemplateTag: (templateId, tag) =>
      set((state) => {
        const template = state.templates.find((t) => t.id === templateId);
        if (template) {
          template.tags.push(tag); // push OK inside immer
        }
      }),
  }))
);
```

> [!TIP]
> Use `immer` when state has nested > 2 level.
> For flat state ? regular spread is enough and faster.

### ? DO: persist for data that survives reloads

```js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'system',
      locale: 'ru',
      sidebarOpen: true,

      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    {
      name: 'app-settings',                     // key in storage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({                  // ✅ Save only needed
        theme: state.theme,
        locale: state.locale,
        // sidebarOpen — not save (UI-only)
      }),
      version: 1,                                // ? Versioning for migrations
      migrate: (persisted, version) => {
        if (version === 0) {
          persisted.theme = persisted.theme ?? 'system';
        }
        return persisted;
      },
    }
  )
);
```

### ✅ DO: devtools for debugging

```js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useCouponStore = create(
  devtools(
    (set) => ({
      coupons: [],
      fetchCoupons: async () => {
        set({ isLoading: true }, false, 'fetchCoupons/start');
        const coupons = await api.getCoupons();
        set({ coupons, isLoading: false }, false, 'fetchCoupons/success');
      },
    }),
    { name: 'CouponStore' } // ✅ Name in Redux DevTools
  )
);
```

### ? DO: combine middleware

```js
// Order: devtools → persist → immer (from external to internal)
const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        // ...state and actions
      })),
      { name: 'my-store' }
    ),
    { name: 'MyStore' }
  )
);
```

---

## 5. TypeScript typing

### ✅ DO: typing interface store

```ts
interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  active: boolean;
}

interface CouponState {
  // State
  coupons: Coupon[];
  selectedCouponId: string | null;
  isLoading: boolean;
  error: string | null;
}

interface CouponActions {
  fetchCoupons: () => Promise<void>;
  selectCoupon: (id: string) => void;
  getSelectedCoupon: () => Coupon | null;
  reset: () => void;
}

type CouponStore = CouponState & CouponActions;

const INITIAL_STATE: CouponState = {
  coupons: [],
  selectedCouponId: null,
  isLoading: false,
  error: null,
};

export const useCouponStore = create<CouponStore>()((set, get) => ({
  ...INITIAL_STATE,

  fetchCoupons: async () => {
    set({ isLoading: true, error: null });
    try {
      const coupons = await api.getCoupons();
      set({ coupons, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  selectCoupon: (id) => set({ selectedCouponId: id }),

  getSelectedCoupon: () => {
    const { coupons, selectedCouponId } = get();
    return coupons.find((c) => c.id === selectedCouponId) ?? null;
  },

  reset: () => set(INITIAL_STATE),
}));
```

### ✅ DO: type slice

```ts
import { StateCreator } from 'zustand';

interface CouponSlice {
  coupons: Coupon[];
  fetchCoupons: () => Promise<void>;
}

interface TemplateSlice {
  templates: Template[];
  selectTemplate: (id: string) => void;
}

type CompositeStore = CouponSlice & TemplateSlice;

const createCouponSlice: StateCreator<CompositeStore, [], [], CouponSlice> =
  (set) => ({
    coupons: [],
    fetchCoupons: async () => {
      const coupons = await api.getCoupons();
      set({ coupons });
    },
  });

const createTemplateSlice: StateCreator<CompositeStore, [], [], TemplateSlice> =
  (set) => ({
    templates: [],
    selectTemplate: (id) => set({ selectedTemplateId: id }),
  });
```

---

## 6. Testing stores

### ✅ DO: test store directly (without React)

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCouponStore } from './coupon-store.js';

describe('CouponStore', () => {
  beforeEach(() => {
    // ? Reset store before each test
    useCouponStore.setState({
      coupons: [],
      selectedCouponId: null,
      isLoading: false,
      error: null,
    });
  });

  it('should select coupon by id', () => {
    useCouponStore.setState({
      coupons: [
        { id: '1', code: 'A', active: true },
        { id: '2', code: 'B', active: false },
      ],
    });

    useCouponStore.getState().selectCoupon('2');

    expect(useCouponStore.getState().selectedCouponId).toBe('2');
  });

  it('should return selected coupon via getSelectedCoupon', () => {
    useCouponStore.setState({
      coupons: [{ id: '1', code: 'SAVE10', active: true }],
      selectedCouponId: '1',
    });

    const coupon = useCouponStore.getState().getSelectedCoupon();

    expect(coupon).toEqual({ id: '1', code: 'SAVE10', active: true });
  });

  it('should return null when no coupon selected', () => {
    const coupon = useCouponStore.getState().getSelectedCoupon();
    expect(coupon).toBeNull();
  });
});
```

### ? DO: test async actions with mocks

```js
import { vi } from 'vitest';

// We mock API
vi.mock('../api/coupons.js', () => ({
  getCoupons: vi.fn(),
}));

import { getCoupons } from '../api/coupons.js';

describe('CouponStore async', () => {
  beforeEach(() => {
    useCouponStore.getState().reset();
    vi.clearAllMocks();
  });

  it('should fetch coupons and update state', async () => {
    const mockCoupons = [{ id: '1', code: 'X', active: true }];
    getCoupons.mockResolvedValue(mockCoupons);

    await useCouponStore.getState().fetchCoupons();

    const state = useCouponStore.getState();
    expect(state.coupons).toEqual(mockCoupons);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error on fetch failure', async () => {
    getCoupons.mockRejectedValue(new Error('Network error'));

    await useCouponStore.getState().fetchCoupons();

    const state = useCouponStore.getState();
    expect(state.error).toBe('Network error');
    expect(state.isLoading).toBe(false);
    expect(state.coupons).toEqual([]);
  });

  it('should set isLoading during fetch', async () => {
    let resolvePromise;
    getCoupons.mockReturnValue(new Promise((res) => { resolvePromise = res; }));

    const fetchPromise = useCouponStore.getState().fetchCoupons();

    // In time loading
    expect(useCouponStore.getState().isLoading).toBe(true);

    resolvePromise([]);
    await fetchPromise;

    // After loading
    expect(useCouponStore.getState().isLoading).toBe(false);
  });
});
```

### ✅ DO: test subscribe (subscription)

```js
it('should notify subscribers on state change', () => {
  const listener = vi.fn();
  const unsub = useCouponStore.subscribe(listener);

  useCouponStore.getState().selectCoupon('1');

  expect(listener).toHaveBeenCalledOnce();
  unsub();
});
```

---

## 7. React integration

### ✅ DO: subscription on store innot React (subscribe)

```js
// ? For side effects, logging, analytics
const unsubscribe = useCouponStore.subscribe(
  (state) => state.selectedCouponId,
  (selectedId, prevSelectedId) => {
    if (selectedId !== prevSelectedId) {
      analytics.track('coupon_selected', { couponId: selectedId });
    }
  }
);
```

### ? DO: transient updates for frequent changes

```js
// ✅ For animations, drag, cursor position — not via React state
const useMouseStore = create((set) => ({
  x: 0,
  y: 0,
  setPosition: (x, y) => set({ x, y }),
}));

// Subscription directly via ref — without rerenders
function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    return useMouseStore.subscribe((state) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${state.x}px, ${state.y}px)`;
      }
    });
  }, []);

  return <div ref={ref} className="cursor" />;
}
```

### ? DON'T: call actions in render

```js
// ❌ Call action with each rendering — infinite cycle
function CouponList() {
  const fetchCoupons = useCouponStore((s) => s.fetchCoupons);
  fetchCoupons(); // ❌ Is called with each rendering!

  // ✅ Correctly:
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);
}
```

---

## 8. Anti-patterns

### ❌ DON'T: duplicate server state in Zustand

```js
// ❌ Zustand how cache for server state — better TanStack Query / SWR
const useStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    const users = await fetch('/api/users').then(r => r.json());
    set({ users }); // manual cache, no invalidation, stale data
  },
}));

// ✅ Zustand — for client state (UI, selections, drafts)
// ✅ TanStack Query — for server state (fetching, caching, sync)
```

> [!IMPORTANT]
> **Zustand = client state** (selections, form drafts, UI toggles).
> **TanStack Query / SWR = server state** (API data, caching, revalidation).
> If you fetch data from an API ? prefer TanStack Query.
> Zustand for server state is acceptable in simple projects without complex cache.

### ❌ DON'T: nested object without immer

```js
// ? Manual deep spread ? error-prone and unreadable
set((state) => ({
  settings: {
    ...state.settings,
    display: {
      ...state.settings.display,
      colors: {
        ...state.settings.display.colors,
        primary: '#ff0000',
      },
    },
  },
}));

// ✅ With immer — readably and safely
set((state) => {
  state.settings.display.colors.primary = '#ff0000';
});
```

### ❌ DON'T: store derived state

```js
// ? activeCoupons ? derived from coupons, responsible for synchronization
const useStore = create((set) => ({
  coupons: [],
  activeCoupons: [],  // ❌ duplicate!

  addCoupon: (c) => set((s) => ({
    coupons: [...s.coupons, c],
    activeCoupons: c.active
      ? [...s.activeCoupons, c]
      : s.activeCoupons, // easily forget update
  })),
}));

// ✅ Compute via selector
const selectActiveCoupons = (state) => state.coupons.filter((c) => c.active);
```

### ❌ DON'T: actions depend from React lifecycle

```js
// ❌ Action uses React-specific things
const useStore = create((set) => ({
  // ❌ router — this React hook, cannot use in store
  navigate: (path) => {
    window.location.href = path; // side-effect in store
  },
}));

// ✅ Side-effects — in component, store only update state
function SaveButton() {
  const navigate = useNavigate();
  const save = useStore((s) => s.save);

  const handleClick = async () => {
    await save();
    navigate('/success');  // ✅ Navigation in component
  };
}
```

---

## Short cheat sheet

| Question | Response |
|--------|-------|
| one field | `useStore((s) => s.field)` |
| Several fields | `useStore(useShallow((s) => ({ a: s.a, b: s.b })))` |
| Computed/derived | selector function: `(s) => s.items.filter(...)` |
| heavy compute | `useMemo` in the component over data from the selector |
| Nested updates | `immer` middleware |
| Save in localStorage | `persist` middleware |
| Debug | `devtools` middleware + Redux DevTools |
| Common updates (60fps) | `subscribe` + ref, not React state |
| Server data | TanStack Query (or Zustand in simple projects) |
| Client state | Zustand ✅ |
| Reset store | `reset` action with `INITIAL_STATE` |

---

## See also
- `$react_beast_practices` — React-specific patterns
- `$es2025_beast_practices` — modern JavaScript
- `$testing_strategy_js` — strategy testing (including tests stores)
- `$dev_reference_snippets` — Zustand, React, API examples
