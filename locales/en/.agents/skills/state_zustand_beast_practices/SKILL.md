---
name: state_zustand_beast_practices
description: Zustand — simple global state without prop drilling, store modularity, selectors, avoiding unnecessary re-renders. Patterns for slice-stores creation, middleware (immer, persist, devtools), TypeScript typing, testing. Activate when creating a new store, refactoring state management, or for questions "how to properly organize Zustand".
---

# Skill: Zustand Beast Practices

Specific DO/DON'T patterns for Zustand — from store architecture to testing.

**Sections:**
1. [Architecture: slice-stores](#1-architecture-slice-stores)
2. [Actions and logic](#2-actions-and-logic)
3. [Selectors and performance](#3-selectors-and-performance)
4. [Middleware: immer, persist, devtools](#4-middleware)
5. [TypeScript typing](#5-typescript-typing)
6. [Testing stores](#6-testing-stores)
7. [React integration](#7-react-integration)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Architecture: slice-stores

### ✅ DO: one store per domain (bounded context)

```js
// ✅ stores/product-store.js — responsible only for products
import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
  // State
  products: [],
  selectedProductId: null,
  isLoading: false,
  error: null,

  // Actions
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/products');
      const products = await res.json();
      set({ products, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  selectProduct: (id) => set({ selectedProductId: id }),

  getSelectedProduct: () => {
    const { products, selectedProductId } = get();
    return products.find((c) => c.id === selectedProductId) ?? null;
  },
}));
```

### ❌ DON'T: one "god-store" for the whole application

```js
// ❌ One store = everything in one place = unmanageable
const useStore = create((set) => ({
  // User
  user: null,
  isLoggedIn: false,
  loginUser: () => { /* ... */ },

  // Products
  products: [],
  fetchProducts: () => { /* ... */ },

  // Templates
  templates: [],
  selectedTemplate: null,
  fetchTemplates: () => { /* ... */ },

  // UI
  isSidebarOpen: false,
  theme: 'light',
  
  // ... 50 more fields
}));
```

### ✅ DO: slice pattern for composite stores

```js
// slices/product-slice.js
export const createProductSlice = (set, get) => ({
  products: [],
  isLoadingProducts: false,

  fetchProducts: async () => {
    set({ isLoadingProducts: true });
    const products = await api.getProducts();
    set({ products, isLoadingProducts: false });
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

### Directory structure

```
src/
├── stores/
│   ├── coupon-store.js         # Domain store (small)
│   ├── template-store.js       # Domain store
│   └── dashboard-store.js      # Composition from slices (if needed)
├── slices/                      # For slice pattern
│   ├── coupon-slice.js
│   └── template-slice.js
└── test-utils/
    └── store-helpers.js         # Helpers for tests
```

---

## 2. Actions and logic

### ✅ DO: business logic in actions, UI logic in components

```js
// ✅ Action encapsulates business logic
const useProductStore = create((set, get) => ({
  products: [],

  /**
   * Adds a product to the order and updates its status.
   * @param {string} productId - Product ID.
   * @param {string} orderId - Order ID.
   */
  addToOrder: async (productId, orderId) => {
    const product = get().products.find((c) => c.id === productId);
    if (!product) throw new Error(`Product ${productId} not found`);
    if (!product.active) throw new Error(`Product ${productId} is inactive`);

    await api.addToOrder(orderId, productId);

    set((state) => ({
      products: state.products.map((c) =>
        c.id === productId ? { ...c, usageCount: c.usageCount + 1 } : c
      ),
    }));
  },
}));
```

### ✅ DO: set with updater function for complex updates

```js
// ✅ Updater function — safe, does not depend on closure
set((state) => ({
  products: state.products.map((c) =>
    c.id === id ? { ...c, active: false } : c
  ),
}));

// ❌ Reading state from closure — race condition
const products = get().products;
set({ products: products.map(/* ... */) }); // stale if another action updated products
```

### ✅ DO: reset action to return to initial state

```js
const INITIAL_STATE = {
  products: [],
  selectedProductId: null,
  isLoading: false,
  error: null,
};

const useProductStore = create((set) => ({
  ...INITIAL_STATE,

  // Actions...

  /** Resets the store to the initial state. */
  reset: () => set(INITIAL_STATE),
}));
```

---

## 3. Selectors and performance

### ✅ DO: atomic selectors to prevent unnecessary re-renders

```js
// ✅ Each component is subscribed only to the needed field
function ProductList() {
  const products = useProductStore((state) => state.products);
  return products.map((c) => <ProductCard key={c.id} product={c} />);
}

function LoadingSpinner() {
  const isLoading = useProductStore((state) => state.isLoading);
  if (!isLoading) return null;
  return <Spinner />;
}

// ❌ Taking the whole store — re-render on ANY change
function ProductList() {
  const store = useProductStore(); // subscription to EVERYTHING
  return store.products.map(/* ... */);
}
```

### ✅ DO: useShallow for objects/arrays of multiple fields

```js
import { useShallow } from 'zustand/react/shallow';

// ✅ shallow comparison — re-render only on real change
function ProductHeader() {
  const { products, isLoading } = useProductStore(
    useShallow((state) => ({
      products: state.products,
      isLoading: state.isLoading,
    }))
  );

  return <h2>Products ({products.length}) {isLoading && '...'}</h2>;
}

// ❌ Without useShallow — every set() creates a new object → repaint
function ProductHeader() {
  const { products, isLoading } = useProductStore((state) => ({
    products: state.products,
    isLoading: state.isLoading,
  })); // ❌ new object every time
}
```

### ✅ DO: derived (computed) values via selectors

```js
// ✅ Selector function outside the store — reusable
const selectActiveProducts = (state) =>
  state.products.filter((c) => c.active);

const selectProductById = (id) => (state) =>
  state.products.find((c) => c.id === id);

// Usage:
function ActiveProducts() {
  const active = useProductStore(selectActiveProducts);
  // ...
}

function ProductDetail({ id }) {
  const product = useProductStore(selectProductById(id));
  // ...
}
```

### ⚠️ Memoization of heavy computations

```js
import { useMemo } from 'react';

function ProductStats() {
  const products = useProductStore((state) => state.products);

  // ✅ Memoize heavy computation
  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter((c) => c.active).length,
    totalPrice: products.reduce((sum, c) => sum + c.price, 0),
  }), [products]);

  return <StatsPanel stats={stats} />;
}
```

---

## 4. Middleware

### ✅ DO: immer for complex nested updates

```js
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useTemplateStore = create(
  immer((set) => ({
    templates: [],

    // ✅ Mutations inside immer — immutable outside
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
> Use `immer` when state has a nesting > 2 levels.
> For flat state, a normal spread is sufficient and faster.

### ✅ DO: persist for data surviving a reload

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
      partialize: (state) => ({                  // ✅ Save only what's needed
        theme: state.theme,
        locale: state.locale,
        // sidebarOpen — do not save (UI-only)
      }),
      version: 1,                                // ✅ Versioning for migrations
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

const useProductStore = create(
  devtools(
    (set) => ({
      products: [],
      fetchProducts: async () => {
        set({ isLoading: true }, false, 'fetchProducts/start');
        const products = await api.getProducts();
        set({ products, isLoading: false }, false, 'fetchProducts/success');
      },
    }),
    { name: 'ProductStore' } // ✅ Name in Redux DevTools
  )
);
```

### ✅ DO: combining middleware

```js
// Order: devtools → persist → immer (from outer to inner)
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

### ✅ DO: typing the store interface

```ts
interface Product {
  id: string;
  name: string;
  price: number;
  category: 'digital' | 'physical';
  active: boolean;
}

interface ProductState {
  // State
  products: Product[];
  selectedProductId: string | null;
  isLoading: boolean;
  error: string | null;
}

interface ProductActions {
  fetchProducts: () => Promise<void>;
  selectProduct: (id: string) => void;
  getSelectedProduct: () => Product | null;
  reset: () => void;
}

type ProductStore = ProductState & ProductActions;

const INITIAL_STATE: ProductState = {
  products: [],
  selectedProductId: null,
  isLoading: false,
  error: null,
};

export const useProductStore = create<ProductStore>()((set, get) => ({
  ...INITIAL_STATE,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await api.getProducts();
      set({ products, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  selectProduct: (id) => set({ selectedProductId: id }),

  getSelectedProduct: () => {
    const { products, selectedProductId } = get();
    return products.find((c) => c.id === selectedProductId) ?? null;
  },

  reset: () => set(INITIAL_STATE),
}));
```

### ✅ DO: typed slice

```ts
import { StateCreator } from 'zustand';

interface ProductSlice {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

interface TemplateSlice {
  templates: Template[];
  selectTemplate: (id: string) => void;
}

type CompositeStore = ProductSlice & TemplateSlice;

const createProductSlice: StateCreator<CompositeStore, [], [], ProductSlice> =
  (set) => ({
    products: [],
    fetchProducts: async () => {
      const products = await api.getProducts();
      set({ products });
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

### ✅ DO: test the store directly (without React)

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProductStore } from './product-store.js';

describe('ProductStore', () => {
  beforeEach(() => {
    // ✅ Reset store before each test
    useProductStore.setState({
      products: [],
      selectedProductId: null,
      isLoading: false,
      error: null,
    });
  });

  it('should select product by id', () => {
    useProductStore.setState({
      products: [
        { id: '1', name: 'Widget A', active: true },
        { id: '2', name: 'Widget B', active: false },
      ],
    });

    useProductStore.getState().selectProduct('2');

    expect(useProductStore.getState().selectedProductId).toBe('2');
  });

  it('should return selected product via getSelectedProduct', () => {
    useProductStore.setState({
      products: [{ id: '1', name: 'Premium Widget', active: true }],
      selectedProductId: '1',
    });

    const product = useProductStore.getState().getSelectedProduct();

    expect(product).toEqual({ id: '1', name: 'Premium Widget', active: true });
  });

  it('should return null when no product selected', () => {
    const product = useProductStore.getState().getSelectedProduct();
    expect(product).toBeNull();
  });
});
```

### ✅ DO: test async actions with mocks

```js
import { vi } from 'vitest';

// Mock API
vi.mock('../api/products.js', () => ({
  getProducts: vi.fn(),
}));

import { getProducts } from '../api/products.js';

describe('ProductStore async', () => {
  beforeEach(() => {
    useProductStore.getState().reset();
    vi.clearAllMocks();
  });

  it('should fetch products and update state', async () => {
    const mockProducts = [{ id: '1', name: 'Widget', active: true }];
    getProducts.mockResolvedValue(mockProducts);

    await useProductStore.getState().fetchProducts();

    const state = useProductStore.getState();
    expect(state.products).toEqual(mockProducts);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error on fetch failure', async () => {
    getProducts.mockRejectedValue(new Error('Network error'));

    await useProductStore.getState().fetchProducts();

    const state = useProductStore.getState();
    expect(state.error).toBe('Network error');
    expect(state.isLoading).toBe(false);
    expect(state.products).toEqual([]);
  });

  it('should set isLoading during fetch', async () => {
    let resolvePromise;
    getProducts.mockReturnValue(new Promise((res) => { resolvePromise = res; }));

    const fetchPromise = useProductStore.getState().fetchProducts();

    // During fetch
    expect(useProductStore.getState().isLoading).toBe(true);

    resolvePromise([]);
    await fetchPromise;

    // After fetch
    expect(useProductStore.getState().isLoading).toBe(false);
  });
});
```

### ✅ DO: test subscribe (subscriptions)

```js
it('should notify subscribers on state change', () => {
  const listener = vi.fn();
  const unsub = useProductStore.subscribe(listener);

  useProductStore.getState().selectProduct('1');

  expect(listener).toHaveBeenCalledOnce();
  unsub();
});
```

---

## 7. React integration

### ✅ DO: subscribe to store outside React (subscribe)

```js
// ✅ For side-effects, logging, analytics
const unsubscribe = useProductStore.subscribe(
  (state) => state.selectedProductId,
  (selectedId, prevSelectedId) => {
    if (selectedId !== prevSelectedId) {
      analytics.track('product_selected', { productId: selectedId });
    }
  }
);
```

### ✅ DO: transient updates for frequent changes

```js
// ✅ For animations, drag, cursor position — not via React state
const useMouseStore = create((set) => ({
  x: 0,
  y: 0,
  setPosition: (x, y) => set({ x, y }),
}));

// Direct subscription via ref — without re-renders
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

### ❌ DON'T: call actions in render

```js
// ❌ Action call on every render — infinite loop
function ProductList() {
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  fetchProducts(); // ❌ Called on every render!

  // ✅ Correct:
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
}
```

---

## 8. Anti-patterns

### ❌ DON'T: duplicate server state in Zustand

```js
// ❌ Zustand as a cache for server state — TanStack Query / SWR is better
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
> If you fetch data from an API — prefer TanStack Query.
> Zustand for server state is acceptable in simple projects without complex caching.

### ❌ DON'T: nested objects without immer

```js
// ❌ Manual deep spread — error-prone and unreadable
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

// ✅ With immer — readable and safe
set((state) => {
  state.settings.display.colors.primary = '#ff0000';
});
```

### ❌ DON'T: store derived state

```js
// ❌ activeProducts — derived from products, responsible for sync
const useStore = create((set) => ({
  products: [],
  activeProducts: [],  // ❌ duplicate!

  addProduct: (c) => set((s) => ({
    products: [...s.products, c],
    activeProducts: c.active
      ? [...s.activeProducts, c]
      : s.activeProducts, // easy to forget to update
  })),
}));

// ✅ Calculate via selector
const selectActiveProducts = (state) => state.products.filter((c) => c.active);
```

### ❌ DON'T: actions depend on React lifecycle

```js
// ❌ Action uses React-specific things
const useStore = create((set) => ({
  // ❌ router — is a React hook, cannot be used in store
  navigate: (path) => {
    window.location.href = path; // side-effect in store
  },
}));

// ✅ Side-effects — in the component, the store only updates state
function SaveButton() {
  const navigate = useNavigate();
  const save = useStore((s) => s.save);

  const handleClick = async () => {
    await save();
    navigate('/success');  // ✅ Navigation in the component
  };
}
```

---

## Quick cheat sheet

| Question | Answer |
|--------|-------|
| Single field | `useStore((s) => s.field)` |
| Multiple fields | `useStore(useShallow((s) => ({ a: s.a, b: s.b })))` |
| Computed/derived | Selector function: `(s) => s.items.filter(...)` |
| Heavy computation | `useMemo` in component over data from selector |
| Nested updates | `immer` middleware |
| Save in localStorage | `persist` middleware |
| Debug | `devtools` middleware + Redux DevTools |
| Frequent updates (60fps) | `subscribe` + ref, not React state |
| Server data | TanStack Query (or Zustand in simple projects) |
| Client state | Zustand ✅ |
| Store reset | `reset` action with `INITIAL_STATE` |

---

## See also
- `$react_beast_practices` — React-specific patterns
- `$es2025_beast_practices` — modern JavaScript
- `$testing_strategy_js` — testing strategy (including store tests)
- `$dev_reference_snippets` — Zustand, React, API examples
