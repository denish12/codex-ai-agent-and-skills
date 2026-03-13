---
name: state_rtk_beast_practices
description: Redux Toolkit — предсказуемый state для сложных приложений. createSlice, createAsyncThunk, createEntityAdapter, createSelector, RTK Query, middleware, TypeScript типизация, тестирование. Активируй при создании нового slice, рефакторинге Redux, или при вопросах «как правильно организовать RTK».
---

# Skill: RTK Beast Practices

Конкретные DO/DON'T паттерны для Redux Toolkit — от архитектуры slices до тестирования.

**Разделы:**
1. [Когда RTK vs Zustand](#1-когда-rtk-vs-zustand)
2. [createSlice: архитектура](#2-createslice-архитектура)
3. [createAsyncThunk: async operations](#3-createasyncthunk)
4. [createEntityAdapter: нормализация](#4-createentityadapter)
5. [Селекторы и createSelector](#5-селекторы)
6. [RTK Query: server state](#6-rtk-query)
7. [TypeScript типизация](#7-typescript)
8. [Тестирование](#8-тестирование)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. Когда RTK vs Zustand

| Критерий | RTK ✅ | Zustand ✅ |
|---------|--------|-----------|
| Сложные домены с множеством событий | ✅ | ⚠️ Возможно, но сложнее |
| Нормализация сущностей (entities) | ✅ `createEntityAdapter` | ❌ Вручную |
| Middleware (logging, analytics, undo) | ✅ Встроенный | ⚠️ Базовый |
| DevTools | ✅ Redux DevTools (полный) | ✅ Redux DevTools (базовый) |
| Server state кэширование | ✅ RTK Query | ❌ Вручную или TanStack Query |
| Небольшой проект, мало state | ❌ Оверкилл | ✅ Минимальный boilerplate |
| Размер бандла | ⚠️ ~11KB | ✅ ~1KB |
| Learning curve | ⚠️ Средняя | ✅ Низкая |

> [!TIP]
> **Простое правило:** Zustand для простого client state, RTK для сложных доменов с нормализацией и middleware. RTK Query заменяет TanStack Query в RTK-экосистеме.

---

## 2. createSlice: архитектура

### ✅ DO: один slice на домен (bounded context)

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
     * Выбирает купон по ID.
     * @param {Object} state - текущее состояние.
     * @param {{ payload: string }} action - ID купона.
     */
    couponSelected(state, action) {
      state.selectedId = action.payload;
    },

    /**
     * Деактивирует купон по ID.
     * @param {Object} state - текущее состояние.
     * @param {{ payload: string }} action - ID купона.
     */
    couponDeactivated(state, action) {
      const coupon = state.items.find((c) => c.id === action.payload);
      if (coupon) coupon.active = false;  // ✅ Мутация OK внутри createSlice (Immer)
    },

    /** Сбрасывает slice к начальному состоянию. */
    couponsReset() {
      return INITIAL_STATE;
    },
  },
});

export const { couponSelected, couponDeactivated, couponsReset } = couponsSlice.actions;
export default couponsSlice.reducer;
```

### ✅ DO: Naming convention для actions

```js
// Формат: [noun][PastTenseVerb]
// Описывает ЧТО ПРОИЗОШЛО, а не что делать

// ✅ Events (что произошло)
couponSelected      // купон выбран
couponDeactivated   // купон деактивирован
templateLoaded      // шаблон загружен
formSubmitted       // форма отправлена

// ❌ Commands (что делать) — менее предсказуемо
selectCoupon        // императивный стиль
deactivateCoupon
loadTemplate
```

### ✅ DO: prepare callback для формирования payload

```js
const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    /**
     * Добавляет новый купон с автоматическим ID и timestamp.
     * @param {Object} state - текущее состояние.
     * @param {{ payload: { id: string, createdAt: string, code: string, discount: number } }} action
     */
    couponAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      // ✅ prepare отделяет логику создания payload от reducer
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

// Использование:
dispatch(couponAdded('SAVE20', 20));
// payload: { id: 'abc...', createdAt: '2026-...', code: 'SAVE20', discount: 20 }
```

### Структура директорий

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

### ✅ DO: async operations через createAsyncThunk

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Загружает список купонов с сервера.
 * @returns {Promise<Coupon[]>} массив купонов.
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
 * Удаляет купон по ID.
 * @param {string} couponId - ID купона для удаления.
 * @returns {Promise<string>} ID удалённого купона.
 */
export const deleteCoupon = createAsyncThunk(
  'coupons/deleteCoupon',
  async (couponId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/coupons/${couponId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return couponId; // ✅ Возвращаем ID для удаления из state
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

### ✅ DO: условные thunks с condition

```js
export const fetchCouponsIfNeeded = createAsyncThunk(
  'coupons/fetchCoupons',
  async () => {
    const res = await fetch('/api/coupons');
    return res.json();
  },
  {
    // ✅ Не запускаем повторно если уже загружено
    condition: (_, { getState }) => {
      const { status } = getState().coupons;
      return status === 'idle'; // Запускаем только из idle
    },
  }
);
```

### ✅ DO: thunk с доступом к другим slices

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

### ✅ DO: нормализация для коллекций сущностей

```js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// ✅ EntityAdapter: автоматические ids[] и entities{} + CRUD операции
const couponsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.code.localeCompare(b.code), // сортировка по коду
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

// ✅ Автоматические селекторы
export const {
  selectAll: selectAllCoupons,        // все купоны как массив
  selectById: selectCouponById,       // купон по ID
  selectIds: selectCouponIds,         // массив ID
  selectTotal: selectTotalCoupons,    // количество
  selectEntities: selectCouponEntities, // словарь
} = couponsAdapter.getSelectors((state) => state.coupons);
```

### Dispatch примеры

```js
// Добавить
dispatch(couponAdded({ id: '1', code: 'SAVE10', discount: 10, active: true }));

// Обновить (partial update)
dispatch(couponUpdated({ id: '1', changes: { active: false } }));

// Удалить
dispatch(couponRemoved('1'));

// Загрузить все
dispatch(couponsReceived(couponsFromApi));
```

---

## 5. Селекторы

### ✅ DO: createSelector для мемоизированных derived данных

```js
import { createSelector } from '@reduxjs/toolkit';

// Базовый селектор
const selectCouponsState = (state) => state.coupons;

// ✅ Мемоизированный: пересчитывается только при изменении `items`
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

// ✅ Параметризованный селектор
export const selectCouponsByType = createSelector(
  [selectAllCoupons, (_, type) => type],
  (coupons, type) => coupons.filter((c) => c.type === type)
);

// Использование: selectCouponsByType(state, 'percent')
```

### ❌ DON'T: вычисления в компоненте без мемоизации

```js
// ❌ Фильтрация вызывается при КАЖДОМ рендере — новый массив → ререндер дочерних
function ActiveCoupons() {
  const coupons = useSelector((state) => state.coupons.items);
  const active = coupons.filter((c) => c.active); // ❌ каждый раз новый массив
  return <List items={active} />;
}

// ✅ С мемоизированным селектором — один и тот же массив если данные не менялись
function ActiveCoupons() {
  const active = useSelector(selectActiveCoupons);
  return <List items={active} />;
}
```

---

## 6. RTK Query

### ✅ DO: RTK Query для server state

```js
// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Coupon', 'Template'],
  endpoints: (builder) => ({

    /**
     * Получить все купоны.
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
     * Создать новый купон.
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
     * Удалить купон.
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

### Использование в компоненте

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

### ✅ DO: типизированные hooks

```ts
// app/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### ✅ DO: типизированный store

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

### ✅ DO: типизированный slice

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

## 8. Тестирование

### ✅ DO: тестировать reducer напрямую

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

### ✅ DO: тестировать async thunks

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

### ✅ DO: тестировать селекторы

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

### ❌ DON'T: мутировать state вне createSlice

```js
// ❌ Мутация вне Immer — баг
const newState = state;
newState.items.push(item); // мутация оригинала!

// ✅ Мутация только внутри createSlice reducers (Immer обёрнут)
reducers: {
  itemAdded(state, action) {
    state.items.push(action.payload); // ✅ OK — Immer proxy
  },
},
```

### ❌ DON'T: dispatch в render

```jsx
// ❌ Dispatch при каждом рендере — бесконечный цикл
function CouponList() {
  const dispatch = useDispatch();
  dispatch(fetchCoupons()); // ❌ каждый рендер

  // ✅ Правильно:
  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);
}
```

### ❌ DON'T: хранить не-сериализуемые данные в state

```js
// ❌ Date, Map, Set, Class instances, Functions — не сериализуемы
const initialState = {
  createdAt: new Date(),      // ❌ Date объект
  cache: new Map(),           // ❌ Map
  onClick: () => {},          // ❌ Function
};

// ✅ Только plain objects, arrays, primitives
const initialState = {
  createdAt: new Date().toISOString(),  // ✅ string
  cache: {},                             // ✅ plain object
};
```

### ❌ DON'T: вкладывать state глубже 3 уровней

```js
// ❌ Глубокая вложенность — даже с Immer тяжело читать
state.orders[0].items[2].variants[0].price = 100;

// ✅ Нормализовать через createEntityAdapter
// orders: { ids, entities }
// items:  { ids, entities }
// variants: { ids, entities }
```

---

## Краткая шпаргалка

| Задача | Решение |
|--------|---------|
| Создать slice | `createSlice({ name, initialState, reducers, extraReducers })` |
| Async операция | `createAsyncThunk('name', async (arg, { rejectWithValue }) => ...)` |
| Нормализация | `createEntityAdapter()` → `getSelectors()` |
| Мемоизация | `createSelector([inputs], output)` |
| Server state | RTK Query: `createApi({ endpoints })` |
| Типизация hooks | `useDispatch.withTypes<AppDispatch>()` |
| Reset state | `return initialState` в reducer |
| Тестирование | `reducer(state, action)`, `store.dispatch(thunk())`, `selector(state)` |

---

## См. также
- `$state_zustand_beast_practices` — Zustand для простого client state
- `$react_beast_practices` — React-специфичные паттерны
- `$testing_strategy_js` — стратегия тестирования
- `$es2025_beast_practices` — современный JavaScript
