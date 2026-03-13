---
name: state_rtk_beast_practices
description: Redux Toolkit ? predictable state for complex applications. createSlice, createAsyncThunk, createEntityAdapter, createSelector, RTK Query, middleware, TypeScript typing, testing. Activate when creating a new slice, refactoring Redux, or with questions like "how to organize RTK correctly".
---

# Skill: RTK Beast Practices

Concrete DO/DON'T patterns for Redux Toolkit — from architecture slices to testing.

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
| Complex domain with many events | ? | ?? Possible, but more complex |
| Normalization entities (entities) | ✅ `createEntityAdapter` | ❌ Manually |
| Middleware (logging, analytics, undo) | ✅ Embedded | ⚠️ Baseline |
| DevTools | ✅ Redux DevTools (full) | ✅ Redux DevTools (baseline) |
| Server state caching | ✅ RTK Query | ❌ Manually or TanStack Query |
| Small project, little state | ? Overkill | ? Minimal boilerplate |
| Bundle size | ?? ~11KB | ? ~1KB |
| Learning curve | ?? Medium | ? Low |

> [!TIP]
> **Simple rule:** Zustand for simple client state, RTK for complex domain with normalization and middleware. RTK Query replaces TanStack Query in the RTK ecosystem.

---

## 2. createSlice: architecture

### ✅ DO: one slice on domain (bounded context)

```js
// features/coupons/couponsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  items: [],
  selectedId: null,
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const couponsSlice = createSlice({
  name: 'coupons',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Selects a coupon by ID.
     * @param {Object} state - current state.
     * @param {{ payload: string }} action - ID coupon.
     */
    couponSelected(state, action) {
      state.selectedId = action.payload;
    },

    /**
     * Deactivates a coupon by ID.
     * @param {Object} state - current state.
     * @param {{ payload: string }} action - ID coupon.
     */
    couponDeactivated(state, action) {
      const coupon = state.items.find((c) => c.id === action.payload);
      if (coupon) coupon.active = false;  // ✅ Mutation OK inside createSlice (Immer)
    },

    /** resets slice to initial state. */
    couponsReset() {
      return INITIAL_STATE;
    },
  },
});

export const { couponSelected, couponDeactivated, couponsReset } = couponsSlice.actions;
export default couponsSlice.reducer;
```

### ✅ DO: Naming convention for actions

```js
// Format: [noun][PastTenseVerb]
// describes What happened, and not what do

// ✅ Events (what happened)
couponSelected      // coupon selected
couponDeactivated   // coupon deactivated
templateLoaded      // template loaded
formSubmitted       // form submitted

// ❌ Commands (what do) — less predictably
selectCoupon        // imperative style
deactivateCoupon
loadTemplate
```

### ✅ DO: prepare callback form payload

```js
const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    /**
     * Adds a new coupon with automatic ID and timestamp.
     * @param {Object} state - current state.
     * @param {{ payload: { id: string, createdAt: string, code: string, discount: number } }} action
     */
    couponAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      // ? prepare separates payload creation logic from the reducer
      prepare(code, discount) {
        return {
          payload: {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            code,
            discount,
          },
        };
      },
    },
  },
});

// Usage:
dispatch(couponAdded('SAVE20', 20));
// payload: { id: 'abc...', createdAt: '2026-...', code: 'SAVE20', discount: 20 }
```

### Structure directories

```
src/
├── app/
│   ├── store.js           # configureStore
│   └── hooks.js           # useAppDispatch, useAppSelector
├── features/
│   ├── coupons/
│   │   ├── couponsSlice.js
│   │   ├── couponsSlice.test.js
│   │   ├── couponsSelectors.js
│   │   └── CouponList.jsx
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
 * loads list coupons with server.
 * @returns {Promise<Coupon[]>} array coupons.
 */
export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/coupons');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Removes coupon by ID.
 * @param {string} couponId - ID coupon for deletion.
 * @returns {Promise<string>} ID of the deleted coupon.
 */
export const deleteCoupon = createAsyncThunk(
  'coupons/deleteCoupon',
  async (couponId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/coupons/${couponId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return couponId; // ✅ Return ID for deletion from state
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const couponsSlice = createSlice({
  name: 'coupons',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCoupons
      .addCase(fetchCoupons.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      })
      // deleteCoupon
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});
```

### ? DO: conditional thunks with condition

```js
export const fetchCouponsIfNeeded = createAsyncThunk(
  'coupons/fetchCoupons',
  async () => {
    const res = await fetch('/api/coupons');
    return res.json();
  },
  {
    // ? Do not run again if already loaded
    condition: (_, { getState }) => {
      const { status } = getState().coupons;
      return status === 'idle'; // run only from idle
    },
  }
);
```

### ✅ DO: thunk with access to other slices

```js
export const applyCouponToOrder = createAsyncThunk(
  'coupons/applyCouponToOrder',
  async ({ couponId, orderId }, { getState, rejectWithValue }) => {
    const coupon = getState().coupons.items.find((c) => c.id === couponId);
    if (!coupon?.active) {
      return rejectWithValue('Coupon is inactive');
    }

    const res = await fetch(`/api/orders/${orderId}/apply-coupon`, {
      method: 'POST',
      body: JSON.stringify({ couponId }),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  }
);
```

---

## 4. createEntityAdapter

### ✅ DO: normalization for collections entities

```js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// ✅ EntityAdapter: automatic ids[] and entities{} + CRUD operations
const couponsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.code.localeCompare(b.code), // sorting by code
});

const couponsSlice = createSlice({
  name: 'coupons',
  initialState: couponsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  // initialState = { ids: [], entities: {}, status: 'idle', error: null }

  reducers: {
    couponAdded: couponsAdapter.addOne,
    couponUpdated: couponsAdapter.updateOne,
    couponRemoved: couponsAdapter.removeOne,
    couponsReceived: couponsAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        couponsAdapter.setAll(state, action.payload);
        state.status = 'succeeded';
      });
  },
});

// ✅ Automatic selectors
export const {
  selectAll: selectAllCoupons,        // all coupons how array
  selectById: selectCouponById,       // coupon by ID
  selectIds: selectCouponIds,         // array ID
  selectTotal: selectTotalCoupons,    // count
  selectEntities: selectCouponEntities, // dictionary
} = couponsAdapter.getSelectors((state) => state.coupons);
```

### Dispatch examples

```js
// Add
dispatch(couponAdded({ id: '1', code: 'SAVE10', discount: 10, active: true }));

// Update (partial update)
dispatch(couponUpdated({ id: '1', changes: { active: false } }));

// Delete
dispatch(couponRemoved('1'));

// Load all
dispatch(couponsReceived(couponsFromApi));
```

---

## 5. Selectors

### ? DO: createSelector for memoized derived data

```js
import { createSelector } from '@reduxjs/toolkit';

// Baseline selector
const selectCouponsState = (state) => state.coupons;

// ? Memoized: recalculates only when `items` changes
export const selectActiveCoupons = createSelector(
  [selectAllCoupons],
  (coupons) => coupons.filter((c) => c.active)
);

export const selectCouponStats = createSelector(
  [selectAllCoupons],
  (coupons) => ({
    total: coupons.length,
    active: coupons.filter((c) => c.active).length,
    inactive: coupons.filter((c) => !c.active).length,
    totalDiscount: coupons.reduce((sum, c) => sum + c.discount, 0),
  })
);

// ? Parameterized selector
export const selectCouponsByType = createSelector(
  [selectAllCoupons, (_, type) => type],
  (coupons, type) => coupons.filter((c) => c.type === type)
);

// Usage: selectCouponsByType(state, 'percent')
```

### ? DON'T: compute in a component without memoization

```js
// ? Filtering is called on each render ? new array ? rerender of children
function ActiveCoupons() {
  const coupons = useSelector((state) => state.coupons.items);
  const active = coupons.filter((c) => c.active); // ❌ each times new array
  return <List items={active} />;
}

// ? With a memoized selector ? the same array if data did not change
function ActiveCoupons() {
  const active = useSelector(selectActiveCoupons);
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
  tagTypes: ['Coupon', 'Template'],
  endpoints: (builder) => ({

    /**
     * Get all coupons.
     */
    getCoupons: builder.query({
      query: () => '/coupons',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Coupon', id })),
              { type: 'Coupon', id: 'LIST' },
            ]
          : [{ type: 'Coupon', id: 'LIST' }],
    }),

    /**
     * Create new coupon.
     */
    addCoupon: builder.mutation({
      query: (coupon) => ({
        url: '/coupons',
        method: 'POST',
        body: coupon,
      }),
      invalidatesTags: [{ type: 'Coupon', id: 'LIST' }],
    }),

    /**
     * Delete coupon.
     */
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Coupon', id },
        { type: 'Coupon', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useAddCouponMutation,
  useDeleteCouponMutation,
} = apiSlice;
```

### Usage in component

```jsx
function CouponList() {
  const { data: coupons, isLoading, error } = useGetCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <ul>
      {coupons.map((c) => (
        <li key={c.id}>
          {c.code} — {c.discount}%
          <button onClick={() => deleteCoupon(c.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 7. TypeScript

### ✅ DO: type hooks

```ts
// app/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### ✅ DO: type store

```ts
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import couponsReducer from '../features/coupons/couponsSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    coupons: couponsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### ✅ DO: type slice

```ts
interface CouponState {
  items: Coupon[];
  selectedId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CouponState = {
  items: [],
  selectedId: null,
  status: 'idle',
  error: null,
};

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    couponSelected(state, action: PayloadAction<string>) {
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
import reducer, { couponSelected, couponDeactivated, couponsReset } from './couponsSlice';

describe('couponsSlice reducer', () => {
  const initialState = { items: [], selectedId: null, status: 'idle', error: null };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should select coupon', () => {
    const state = reducer(initialState, couponSelected('c-1'));
    expect(state.selectedId).toBe('c-1');
  });

  it('should deactivate coupon by id', () => {
    const state = {
      ...initialState,
      items: [{ id: 'c-1', code: 'X', active: true }],
    };

    const next = reducer(state, couponDeactivated('c-1'));
    expect(next.items[0].active).toBe(false);
  });

  it('should reset to initial state', () => {
    const dirty = { items: [{ id: '1' }], selectedId: '1', status: 'failed', error: 'err' };
    expect(reducer(dirty, couponsReset())).toEqual(initialState);
  });
});
```

### ✅ DO: test async thunks

```js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { fetchCoupons } from './couponsSlice';

describe('fetchCoupons thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { coupons: reducer } });
    global.fetch = vi.fn();
  });

  it('should fetch and store coupons on success', async () => {
    const mockCoupons = [{ id: '1', code: 'A', active: true }];
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockCoupons) });

    await store.dispatch(fetchCoupons());

    const state = store.getState().coupons;
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockCoupons);
    expect(state.error).toBeNull();
  });

  it('should set error on failure', async () => {
    fetch.mockResolvedValue({ ok: false, status: 500 });

    await store.dispatch(fetchCoupons());

    const state = store.getState().coupons;
    expect(state.status).toBe('failed');
    expect(state.error).toMatch(/500/);
  });
});
```

### ✅ DO: test selectors

```js
import { selectActiveCoupons, selectCouponStats } from './couponsSelectors';

describe('coupon selectors', () => {
  const state = {
    coupons: {
      ids: ['1', '2', '3'],
      entities: {
        '1': { id: '1', code: 'A', active: true, discount: 10 },
        '2': { id: '2', code: 'B', active: false, discount: 20 },
        '3': { id: '3', code: 'C', active: true, discount: 15 },
      },
    },
  };

  it('should select only active coupons', () => {
    const active = selectActiveCoupons(state);
    expect(active).toHaveLength(2);
    expect(active.every((c) => c.active)).toBe(true);
  });

  it('should compute stats', () => {
    const stats = selectCouponStats(state);
    expect(stats).toEqual({ total: 3, active: 2, inactive: 1, totalDiscount: 45 });
  });
});
```

---

## 9. Anti-patterns

### ? DON'T: mutate state outside createSlice

```js
// ❌ Mutation innot Immer — bug
const newState = state;
newState.items.push(item); // mutation of the original!

// ? Mutation only inside createSlice reducers (wrapped by Immer)
reducers: {
  itemAdded(state, action) {
    state.items.push(action.payload); // ✅ OK — Immer proxy
  },
},
```

### ❌ DON'T: dispatch in render

```jsx
// ❌ Dispatch with each rendering — infinite cycle
function CouponList() {
  const dispatch = useDispatch();
  dispatch(fetchCoupons()); // ❌ each render

  // ✅ Correctly:
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);
}
```

### ? DON'T: store non-serializable data in state

```js
// ? Date, Map, Set, class instances, functions ? are not serializable
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

### ? DON'T: nest state deeper than 3 levels

```js
// ? Deep nesting ? hard to read even with Immer
state.orders[0].items[2].variants[0].price = 100;

// ? Normalize via createEntityAdapter
// orders: { ids, entities }
// items:  { ids, entities }
// variants: { ids, entities }
```

---

## Short cheat sheet

| Task | Decision |
|--------|---------|
| Create slice | `createSlice({ name, initialState, reducers, extraReducers })` |
| Async operation | `createAsyncThunk('name', async (arg, { rejectWithValue }) => ...)` |
| Normalization | `createEntityAdapter()` → `getSelectors()` |
| memoization | `createSelector([inputs], output)` |
| Server state | RTK Query: `createApi({ endpoints })` |
| Typing hooks | `useDispatch.withTypes<AppDispatch>()` |
| Reset state | `return initialState` in reducer |
| Testing | `reducer(state, action)`, `store.dispatch(thunk())`, `selector(state)` |

---

## See also
- `$state_zustand_beast_practices` — Zustand for simple client state
- `$react_beast_practices` — React-specific patterns
- `$testing_strategy_js` — strategy testing
- `$es2025_beast_practices` — modern JavaScript
