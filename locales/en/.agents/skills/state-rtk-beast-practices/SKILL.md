---
name: state-rtk-beast-practices
description: Redux Toolkit — predictable state for complex applications. createSlice, createAsyncThunk, createEntityAdapter, createSelector, RTK Query, middleware, TypeScript typing, testing. Activate when creating a new slice, refactoring Redux, or for questions "how to properly organize RTK".
---

# Skill: RTK Beast Practices

Specific DO/DON'T patterns for Redux Toolkit — from slices architecture to testing.

**Sections:**
1. [When RTK vs Zustand](#1-when-rtk-vs-zustand)
2. [createSlice: architecture](#2-createslice-architecture)
3. [createAsyncThunk: async operations](#3-createasyncthunk)
4. [createEntityAdapter: normalization](#4-createentityadapter)
5. [Selectors and createSelector](#5-selectors)
6. [RTK Query: server state](#6-rtk-query)
7. [TypeScript typing](#7-typescript)
8. [Testing](#8-testing)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. When RTK vs Zustand

| Criterion | RTK ✅ | Zustand ✅ |
|---------|--------|-----------|
| Complex domains with many events | ✅ | ⚠️ Possible, but harder |
| Entity normalization | ✅ `createEntityAdapter` | ❌ Manually |
| Middleware (logging, analytics, undo) | ✅ Built-in | ⚠️ Basic |
| DevTools | ✅ Redux DevTools (full) | ✅ Redux DevTools (basic) |
| Server state caching | ✅ RTK Query | ❌ Manually or TanStack Query |
| Small project, little state | ❌ Overkill | ✅ Minimal boilerplate |
| Bundle size | ⚠️ ~11KB | ✅ ~1KB |
| Learning curve | ⚠️ Medium | ✅ Low |

> [!TIP]
> **Simple rule:** Zustand for simple client state, RTK for complex domains with normalization and middleware. RTK Query replaces TanStack Query in the RTK ecosystem.

---

## 2. createSlice: architecture

### ✅ DO: one slice per domain (bounded context)

```js
// features/products/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  items: [],
  selectedId: null,
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Selects a product by ID.
     * @param {Object} state - current state.
     * @param {{ payload: string }} action - product ID.
     */
    productSelected(state, action) {
      state.selectedId = action.payload;
    },

    /**
     * Deactivates a product by ID.
     * @param {Object} state - current state.
     * @param {{ payload: string }} action - product ID.
     */
    productDeactivated(state, action) {
      const product = state.items.find((c) => c.id === action.payload);
      if (product) product.active = false;  // ✅ Mutation OK inside createSlice (Immer)
    },

    /** Resets the slice to the initial state. */
    productsReset() {
      return INITIAL_STATE;
    },
  },
});

export const { productSelected, productDeactivated, productsReset } = productsSlice.actions;
export default productsSlice.reducer;
```

### ✅ DO: Naming convention for actions

```js
// Format: [noun][PastTenseVerb]
// Describes WHAT HAPPENED, not what to do

// ✅ Events (what happened)
productSelected      // product selected
productDeactivated   // product deactivated
templateLoaded       // template loaded
formSubmitted        // form submitted

// ❌ Commands (what to do) — less predictable
selectProduct        // imperative style
deactivateProduct
loadTemplate
```

### ✅ DO: prepare callback to format payload

```js
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Adds a new product with automatic ID and timestamp.
     * @param {Object} state - current state.
     * @param {{ payload: { id: string, createdAt: string, name: string, price: number } }} action
     */
    productAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      // ✅ prepare separates payload creation logic from reducer
      prepare(name, price) {
        return {
          payload: {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            name,
            price,
          },
        };
      },
    },
  },
});

// Usage:
dispatch(productAdded('Premium Widget', 29.99));
// payload: { id: 'abc...', createdAt: '2026-...', name: 'Premium Widget', price: 29.99 }
```

### Directory structure

```
src/
├── app/
│   ├── store.js           # configureStore
│   └── hooks.js           # useAppDispatch, useAppSelector
├── features/
│   ├── products/
│   │   ├── productsSlice.js
│   │   ├── productsSlice.test.js
│   │   ├── productsSelectors.js
│   │   └── ProductList.jsx
│   └── templates/
│       ├── templatesSlice.js
│       ├── templatesSlice.test.js
│       └── TemplateEditor.jsx
```

---

## 3. createAsyncThunk

### ✅ DO: async operations via createAsyncThunk

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Loads a list of products from the server.
 * @returns {Promise<Product[]>} array of products.
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Deletes a product by ID.
 * @param {string} productId - Product ID to delete.
 * @returns {Promise<string>} ID of the deleted product.
 */
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return productId; // ✅ Return ID for deletion from state
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      })
      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});
```

### ✅ DO: conditional thunks with condition

```js
export const fetchProductsIfNeeded = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('/api/products');
    return res.json();
  },
  {
    // ✅ Do not run again if already loaded
    condition: (_, { getState }) => {
      const { status } = getState().products;
      return status === 'idle'; // Run only from idle
    },
  }
);
```

### ✅ DO: thunk with access to other slices

```js
export const addProductToOrder = createAsyncThunk(
  'products/addProductToOrder',
  async ({ productId, orderId }, { getState, rejectWithValue }) => {
    const product = getState().products.items.find((c) => c.id === productId);
    if (!product?.active) {
      return rejectWithValue('Product is inactive');
    }

    const res = await fetch(`/api/orders/${orderId}/add-product`, {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  }
);
```

---

## 4. createEntityAdapter

### ✅ DO: normalization for entity collections

```js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// ✅ EntityAdapter: automatic ids[] and entities{} + CRUD operations
const productsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name), // sort by name
});

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  // initialState = { ids: [], entities: {}, status: 'idle', error: null }

  reducers: {
    productAdded: productsAdapter.addOne,
    productUpdated: productsAdapter.updateOne,
    productRemoved: productsAdapter.removeOne,
    productsReceived: productsAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = 'succeeded';
      });
  },
});

// ✅ Automatic selectors
export const {
  selectAll: selectAllProducts,        // all products as an array
  selectById: selectProductById,       // product by ID
  selectIds: selectProductIds,         // array of IDs
  selectTotal: selectTotalProducts,    // count
  selectEntities: selectProductEntities, // dictionary
} = productsAdapter.getSelectors((state) => state.products);
```

### Dispatch examples

```js
// Add
dispatch(productAdded({ id: '1', name: 'Widget', price: 29.99, active: true }));

// Update (partial update)
dispatch(productUpdated({ id: '1', changes: { active: false } }));

// Delete
dispatch(productRemoved('1'));

// Load all
dispatch(productsReceived(productsFromApi));
```

---

## 5. Selectors

### ✅ DO: createSelector for memoized derived data

```js
import { createSelector } from '@reduxjs/toolkit';

// Basic selector
const selectProductsState = (state) => state.products;

// ✅ Memoized: recalculated only when `items` change
export const selectActiveProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((c) => c.active)
);

export const selectProductStats = createSelector(
  [selectAllProducts],
  (products) => ({
    total: products.length,
    active: products.filter((c) => c.active).length,
    inactive: products.filter((c) => !c.active).length,
    totalPrice: products.reduce((sum, c) => sum + c.price, 0),
  })
);

// ✅ Parameterized selector
export const selectProductsByCategory = createSelector(
  [selectAllProducts, (_, category) => category],
  (products, category) => products.filter((c) => c.category === category)
);

// Usage: selectProductsByCategory(state, 'digital')
```

### ❌ DON'T: calculations in component without memoization

```js
// ❌ Filtration is called on EVERY render — new array → re-render children
function ActiveProducts() {
  const products = useSelector((state) => state.products.items);
  const active = products.filter((c) => c.active); // ❌ every time a new array
  return <List items={active} />;
}

// ✅ With memoized selector — the same array if data hasn't changed
function ActiveProducts() {
  const active = useSelector(selectActiveProducts);
  return <List items={active} />;
}
```

---

## 6. RTK Query

### ✅ DO: RTK Query for server state

```js
// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Product', 'Template'],
  endpoints: (builder) => ({

    /**
     * Get all products.
     */
    getProducts: builder.query({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Product', id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    /**
     * Create a new product.
     */
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    /**
     * Delete a product.
     */
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = apiSlice;
```

### Usage in component

```jsx
function ProductList() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <ul>
      {products.map((c) => (
        <li key={c.id}>
          {c.name} — ${c.price}
          <button onClick={() => deleteProduct(c.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 7. TypeScript

### ✅ DO: typed hooks

```ts
// app/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### ✅ DO: typed store

```ts
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### ✅ DO: typed slice

```ts
interface ProductState {
  items: Product[];
  selectedId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedId: null,
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productSelected(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
  },
});
```

---

## 8. Testing

### ✅ DO: test reducer directly

```js
import { describe, it, expect } from 'vitest';
import reducer, { productSelected, productDeactivated, productsReset } from './productsSlice';

describe('productsSlice reducer', () => {
  const initialState = { items: [], selectedId: null, status: 'idle', error: null };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should select product', () => {
    const state = reducer(initialState, productSelected('p-1'));
    expect(state.selectedId).toBe('p-1');
  });

  it('should deactivate product by id', () => {
    const state = {
      ...initialState,
      items: [{ id: 'p-1', name: 'Widget', active: true }],
    };

    const next = reducer(state, productDeactivated('p-1'));
    expect(next.items[0].active).toBe(false);
  });

  it('should reset to initial state', () => {
    const dirty = { items: [{ id: '1' }], selectedId: '1', status: 'failed', error: 'err' };
    expect(reducer(dirty, productsReset())).toEqual(initialState);
  });
});
```

### ✅ DO: test async thunks

```js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { fetchProducts } from './productsSlice';

describe('fetchProducts thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { products: reducer } });
    global.fetch = vi.fn();
  });

  it('should fetch and store products on success', async () => {
    const mockProducts = [{ id: '1', name: 'Widget', active: true }];
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockProducts) });

    await store.dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockProducts);
    expect(state.error).toBeNull();
  });

  it('should set error on failure', async () => {
    fetch.mockResolvedValue({ ok: false, status: 500 });

    await store.dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.status).toBe('failed');
    expect(state.error).toMatch(/500/);
  });
});
```

### ✅ DO: test selectors

```js
import { selectActiveProducts, selectProductStats } from './productsSelectors';

describe('product selectors', () => {
  const state = {
    products: {
      ids: ['1', '2', '3'],
      entities: {
        '1': { id: '1', name: 'Widget A', active: true, price: 10 },
        '2': { id: '2', name: 'Widget B', active: false, price: 20 },
        '3': { id: '3', name: 'Widget C', active: true, price: 15 },
      },
    },
  };

  it('should select only active products', () => {
    const active = selectActiveProducts(state);
    expect(active).toHaveLength(2);
    expect(active.every((c) => c.active)).toBe(true);
  });

  it('should compute stats', () => {
    const stats = selectProductStats(state);
    expect(stats).toEqual({ total: 3, active: 2, inactive: 1, totalPrice: 45 });
  });
});
```

---

## 9. Anti-patterns

### ❌ DON'T: mutate state outside createSlice

```js
// ❌ Mutation outside Immer — bug
const newState = state;
newState.items.push(item); // mutation of the original!

// ✅ Mutation only inside createSlice reducers (Immer wrapped)
reducers: {
  itemAdded(state, action) {
    state.items.push(action.payload); // ✅ OK — Immer proxy
  },
},
```

### ❌ DON'T: dispatch in render

```jsx
// ❌ Dispatch on every render — infinite loop
function ProductList() {
  const dispatch = useDispatch();
  dispatch(fetchProducts()); // ❌ every render

  // ✅ Correct:
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
}
```

### ❌ DON'T: store non-serializable data in state

```js
// ❌ Date, Map, Set, Class instances, Functions — not serializable
const initialState = {
  createdAt: new Date(),      // ❌ Date object
  cache: new Map(),           // ❌ Map
  onClick: () => {},          // ❌ Function
};

// ✅ Only plain objects, arrays, primitives
const initialState = {
  createdAt: new Date().toISOString(),  // ✅ string
  cache: {},                             // ✅ plain object
};
```

### ❌ DON'T: nest state deeper than 3 levels

```js
// ❌ Deep nesting — even with Immer it is hard to read
state.orders[0].items[2].variants[0].price = 100;

// ✅ Normalize via createEntityAdapter
// orders: { ids, entities }
// items:  { ids, entities }
// variants: { ids, entities }
```

---

## Quick cheat sheet

| Task | Solution |
|--------|---------|
| Create slice | `createSlice({ name, initialState, reducers, extraReducers })` |
| Async operation | `createAsyncThunk('name', async (arg, { rejectWithValue }) => ...)` |
| Normalization | `createEntityAdapter()` → `getSelectors()` |
| Memoization | `createSelector([inputs], output)` |
| Server state | RTK Query: `createApi({ endpoints })` |
| Hooks typing | `useDispatch.withTypes<AppDispatch>()` |
| Reset state | `return initialState` in reducer |
| Testing | `reducer(state, action)`, `store.dispatch(thunk())`, `selector(state)` |

---

## See also
- `$state-zustand-beast-practices` — Zustand for simple client state
- `$react-beast-practices` — React-specific patterns
- `$testing-strategy-js` — testing strategy
- `$es2025-beast-practices` — modern JavaScript
