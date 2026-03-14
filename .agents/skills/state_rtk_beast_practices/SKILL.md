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
     * Выбирает продукт по ID.
     * @param {Object} state - текущее состояние.
     * @param {{ payload: string }} action - ID продукта.
     */
    productSelected(state, action) {
      state.selectedId = action.payload;
    },

    /**
     * Деактивирует продукт по ID.
     * @param {Object} state - текущее состояние.
     * @param {{ payload: string }} action - ID продукта.
     */
    productDeactivated(state, action) {
      const product = state.items.find((c) => c.id === action.payload);
      if (product) product.active = false;  // ✅ Мутация OK внутри createSlice (Immer)
    },

    /** Сбрасывает slice к начальному состоянию. */
    productsReset() {
      return INITIAL_STATE;
    },
  },
});

export const { productSelected, productDeactivated, productsReset } = productsSlice.actions;
export default productsSlice.reducer;
```

### ✅ DO: Naming convention для actions

```js
// Формат: [noun][PastTenseVerb]
// Описывает ЧТО ПРОИЗОШЛО, а не что делать

// ✅ Events (что произошло)
productSelected      // продукт выбран
productDeactivated   // продукт деактивирован
templateLoaded       // шаблон загружен
formSubmitted        // форма отправлена

// ❌ Commands (что делать) — менее предсказуемо
selectProduct        // императивный стиль
deactivateProduct
loadTemplate
```

### ✅ DO: prepare callback для формирования payload

```js
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Добавляет новый продукт с автоматическим ID и timestamp.
     * @param {Object} state - текущее состояние.
     * @param {{ payload: { id: string, createdAt: string, name: string, price: number } }} action
     */
    productAdded: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      // ✅ prepare отделяет логику создания payload от reducer
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

// Использование:
dispatch(productAdded('Premium Widget', 29.99));
// payload: { id: 'abc...', createdAt: '2026-...', name: 'Premium Widget', price: 29.99 }
```

### Структура директорий

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

### ✅ DO: async operations через createAsyncThunk

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Загружает список продуктов с сервера.
 * @returns {Promise<Product[]>} массив продуктов.
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
 * Удаляет продукт по ID.
 * @param {string} productId - ID продукта для удаления.
 * @returns {Promise<string>} ID удалённого продукта.
 */
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return productId; // ✅ Возвращаем ID для удаления из state
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

### ✅ DO: условные thunks с condition

```js
export const fetchProductsIfNeeded = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('/api/products');
    return res.json();
  },
  {
    // ✅ Не запускаем повторно если уже загружено
    condition: (_, { getState }) => {
      const { status } = getState().products;
      return status === 'idle'; // Запускаем только из idle
    },
  }
);
```

### ✅ DO: thunk с доступом к другим slices

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

### ✅ DO: нормализация для коллекций сущностей

```js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// ✅ EntityAdapter: автоматические ids[] и entities{} + CRUD операции
const productsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name), // сортировка по имени
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

// ✅ Автоматические селекторы
export const {
  selectAll: selectAllProducts,        // все продукты как массив
  selectById: selectProductById,       // продукт по ID
  selectIds: selectProductIds,         // массив ID
  selectTotal: selectTotalProducts,    // количество
  selectEntities: selectProductEntities, // словарь
} = productsAdapter.getSelectors((state) => state.products);
```

### Dispatch примеры

```js
// Добавить
dispatch(productAdded({ id: '1', name: 'Widget', price: 29.99, active: true }));

// Обновить (partial update)
dispatch(productUpdated({ id: '1', changes: { active: false } }));

// Удалить
dispatch(productRemoved('1'));

// Загрузить все
dispatch(productsReceived(productsFromApi));
```

---

## 5. Селекторы

### ✅ DO: createSelector для мемоизированных derived данных

```js
import { createSelector } from '@reduxjs/toolkit';

// Базовый селектор
const selectProductsState = (state) => state.products;

// ✅ Мемоизированный: пересчитывается только при изменении `items`
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

// ✅ Параметризованный селектор
export const selectProductsByCategory = createSelector(
  [selectAllProducts, (_, category) => category],
  (products, category) => products.filter((c) => c.category === category)
);

// Использование: selectProductsByCategory(state, 'digital')
```

### ❌ DON'T: вычисления в компоненте без мемоизации

```js
// ❌ Фильтрация вызывается при КАЖДОМ рендере — новый массив → ререндер дочерних
function ActiveProducts() {
  const products = useSelector((state) => state.products.items);
  const active = products.filter((c) => c.active); // ❌ каждый раз новый массив
  return <List items={active} />;
}

// ✅ С мемоизированным селектором — один и тот же массив если данные не менялись
function ActiveProducts() {
  const active = useSelector(selectActiveProducts);
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
  tagTypes: ['Product', 'Template'],
  endpoints: (builder) => ({

    /**
     * Получить все продукты.
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
     * Создать новый продукт.
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
     * Удалить продукт.
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

### Использование в компоненте

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

### ✅ DO: типизированный slice

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

## 8. Тестирование

### ✅ DO: тестировать reducer напрямую

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

### ✅ DO: тестировать async thunks

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

### ✅ DO: тестировать селекторы

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
function ProductList() {
  const dispatch = useDispatch();
  dispatch(fetchProducts()); // ❌ каждый рендер

  // ✅ Правильно:
  useEffect(() => {
    dispatch(fetchProducts());
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
