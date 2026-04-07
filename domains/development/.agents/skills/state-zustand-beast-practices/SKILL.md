---
name: state-zustand-beast-practices
description: Zustand — простой глобальный state без prop drilling, модульность стора, селекторы, избегание лишних ререндеров. Паттерны создания slice-сторов, middleware (immer, persist, devtools), TypeScript типизация, тестирование. Активируй при создании нового стора, рефакторинге state management, или при вопросах «как правильно организовать Zustand».
---

# Skill: Zustand Beast Practices

Конкретные DO/DON'T паттерны для Zustand — от архитектуры стора до тестирования.

**Разделы:**
1. [Архитектура: slice-сторы](#1-архитектура-slice-сторы)
2. [Actions и логика](#2-actions-и-логика)
3. [Селекторы и производительность](#3-селекторы-и-производительность)
4. [Middleware: immer, persist, devtools](#4-middleware)
5. [TypeScript типизация](#5-typescript-типизация)
6. [Тестирование сторов](#6-тестирование-сторов)
7. [React интеграция](#7-react-интеграция)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Архитектура: slice-сторы

### ✅ DO: один стор на домен (bounded context)

```js
// ✅ stores/product-store.js — отвечает только за продукты
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

### ❌ DON'T: один «бог-стор» на всё приложение

```js
// ❌ Один стор = всё в одном месте = неуправляемо
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
  
  // ... ещё 50 полей
}));
```

### ✅ DO: slice pattern для составных сторов

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

### Структура директорий

```
src/
├── stores/
│   ├── coupon-store.js         # Доменный стор (небольшой)
│   ├── template-store.js       # Доменный стор
│   └── dashboard-store.js      # Composition из slices (если нужно)
├── slices/                      # При slice pattern
│   ├── coupon-slice.js
│   └── template-slice.js
└── test-utils/
    └── store-helpers.js         # Хелперы для тестов
```

---

## 2. Actions и логика

### ✅ DO: бизнес-логику в actions, UI-логику в компоненты

```js
// ✅ Action инкапсулирует бизнес-логику
const useProductStore = create((set, get) => ({
  products: [],

  /**
   * Добавляет продукт в заказ и обновляет его статус.
   * @param {string} productId - ID продукта.
   * @param {string} orderId - ID заказа.
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

### ✅ DO: set с updater function для сложных обновлений

```js
// ✅ Updater function — безопасно, не зависит от замыкания
set((state) => ({
  products: state.products.map((c) =>
    c.id === id ? { ...c, active: false } : c
  ),
}));

// ❌ Чтение state из замыкания — race condition
const products = get().products;
set({ products: products.map(/* ... */) }); // stale если другой action обновил products
```

### ✅ DO: reset action для возврата к начальному состоянию

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

  /** Сбрасывает стор к начальному состоянию. */
  reset: () => set(INITIAL_STATE),
}));
```

---

## 3. Селекторы и производительность

### ✅ DO: атомарные селекторы для предотвращения лишних ререндеров

```js
// ✅ Каждый компонент подписан только на нужное поле
function ProductList() {
  const products = useProductStore((state) => state.products);
  return products.map((c) => <ProductCard key={c.id} product={c} />);
}

function LoadingSpinner() {
  const isLoading = useProductStore((state) => state.isLoading);
  if (!isLoading) return null;
  return <Spinner />;
}

// ❌ Берём весь стор — ререндер при ЛЮБОМ изменении
function ProductList() {
  const store = useProductStore(); // подписка на ВСЁ
  return store.products.map(/* ... */);
}
```

### ✅ DO: useShallow для объектов/массивов из нескольких полей

```js
import { useShallow } from 'zustand/react/shallow';

// ✅ shallow сравнение — ререндер только при реальном изменении
function ProductHeader() {
  const { products, isLoading } = useProductStore(
    useShallow((state) => ({
      products: state.products,
      isLoading: state.isLoading,
    }))
  );

  return <h2>Products ({products.length}) {isLoading && '...'}</h2>;
}

// ❌ Без useShallow — каждый set() создаёт новый объект → перерисовка
function ProductHeader() {
  const { products, isLoading } = useProductStore((state) => ({
    products: state.products,
    isLoading: state.isLoading,
  })); // ❌ новый объект каждый раз
}
```

### ✅ DO: derived (computed) значения через селекторы

```js
// ✅ Селектор-функция снаружи стора — переиспользуемая
const selectActiveProducts = (state) =>
  state.products.filter((c) => c.active);

const selectProductById = (id) => (state) =>
  state.products.find((c) => c.id === id);

// Использование:
function ActiveProducts() {
  const active = useProductStore(selectActiveProducts);
  // ...
}

function ProductDetail({ id }) {
  const product = useProductStore(selectProductById(id));
  // ...
}
```

### ⚠️ Мемоизация тяжёлых вычислений

```js
import { useMemo } from 'react';

function ProductStats() {
  const products = useProductStore((state) => state.products);

  // ✅ Мемоизируем тяжёлое вычисление
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

### ✅ DO: immer для сложных вложенных обновлений

```js
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useTemplateStore = create(
  immer((set) => ({
    templates: [],

    // ✅ Мутации внутри immer — иммутабельно снаружи
    updateTemplateField: (templateId, field, value) =>
      set((state) => {
        const template = state.templates.find((t) => t.id === templateId);
        if (template) {
          template.config[field] = value; // прямая мутация OK внутри immer
        }
      }),

    addTemplateTag: (templateId, tag) =>
      set((state) => {
        const template = state.templates.find((t) => t.id === templateId);
        if (template) {
          template.tags.push(tag); // push OK внутри immer
        }
      }),
  }))
);
```

> [!TIP]
> Используй `immer` когда state имеет вложенность > 2 уровней.
> Для flat state — обычный spread достаточен и быстрее.

### ✅ DO: persist для данных, переживающих перезагрузку

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
      name: 'app-settings',                     // ключ в storage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({                  // ✅ Сохраняем только нужное
        theme: state.theme,
        locale: state.locale,
        // sidebarOpen — не сохраняем (UI-only)
      }),
      version: 1,                                // ✅ Версионирование для миграций
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

### ✅ DO: devtools для отладки

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
    { name: 'ProductStore' } // ✅ Имя в Redux DevTools
  )
);
```

### ✅ DO: комбинирование middleware

```js
// Порядок: devtools → persist → immer (от внешнего к внутреннему)
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

## 5. TypeScript типизация

### ✅ DO: типизация интерфейса стора

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

### ✅ DO: типизированные slice

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

## 6. Тестирование сторов

### ✅ DO: тестировать стор напрямую (без React)

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProductStore } from './product-store.js';

describe('ProductStore', () => {
  beforeEach(() => {
    // ✅ Сброс стора перед каждым тестом
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

### ✅ DO: тестировать async actions с моками

```js
import { vi } from 'vitest';

// Мокаем API
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

    // Во время загрузки
    expect(useProductStore.getState().isLoading).toBe(true);

    resolvePromise([]);
    await fetchPromise;

    // После загрузки
    expect(useProductStore.getState().isLoading).toBe(false);
  });
});
```

### ✅ DO: тестировать subscribe (подписки)

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

## 7. React интеграция

### ✅ DO: подписка на стор вне React (subscribe)

```js
// ✅ Для side-effects, логирования, аналитики
const unsubscribe = useProductStore.subscribe(
  (state) => state.selectedProductId,
  (selectedId, prevSelectedId) => {
    if (selectedId !== prevSelectedId) {
      analytics.track('product_selected', { productId: selectedId });
    }
  }
);
```

### ✅ DO: transient updates для частых изменений

```js
// ✅ Для анимаций, drag, cursor position — не через React state
const useMouseStore = create((set) => ({
  x: 0,
  y: 0,
  setPosition: (x, y) => set({ x, y }),
}));

// Подписка напрямую через ref — без ререндеров
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

### ❌ DON'T: вызывать actions в render

```js
// ❌ Вызов action при каждом рендере — бесконечный цикл
function ProductList() {
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  fetchProducts(); // ❌ Вызывается при каждом рендере!

  // ✅ Правильно:
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
}
```

---

## 8. Anti-patterns

### ❌ DON'T: дублировать server state в Zustand

```js
// ❌ Zustand как кэш для server state — лучше TanStack Query / SWR
const useStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    const users = await fetch('/api/users').then(r => r.json());
    set({ users }); // ручной кэш, нет invalidation, stale data
  },
}));

// ✅ Zustand — для client state (UI, selections, drafts)
// ✅ TanStack Query — для server state (fetching, caching, sync)
```

> [!IMPORTANT]
> **Zustand = client state** (selections, form drafts, UI toggles).
> **TanStack Query / SWR = server state** (API data, caching, revalidation).
> Если фетчите данные с API — предпочтите TanStack Query.
> Zustand для server state допустим в простых проектах без сложного кэширования.

### ❌ DON'T: вложенные объекты без immer

```js
// ❌ Ручной deep spread — ошибкоёмко и нечитаемо
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

// ✅ С immer — читаемо и безопасно
set((state) => {
  state.settings.display.colors.primary = '#ff0000';
});
```

### ❌ DON'T: хранить derived state

```js
// ❌ activeProducts — derived от products, отвечает за синхронизацию
const useStore = create((set) => ({
  products: [],
  activeProducts: [],  // ❌ дубликат!

  addProduct: (c) => set((s) => ({
    products: [...s.products, c],
    activeProducts: c.active
      ? [...s.activeProducts, c]
      : s.activeProducts, // легко забыть обновить
  })),
}));

// ✅ Вычислять через селектор
const selectActiveProducts = (state) => state.products.filter((c) => c.active);
```

### ❌ DON'T: actions зависят от React lifecycle

```js
// ❌ Action использует React-специфичные вещи
const useStore = create((set) => ({
  // ❌ router — это React hook, нельзя использовать в сторе
  navigate: (path) => {
    window.location.href = path; // side-effect в сторе
  },
}));

// ✅ Side-effects — в компоненте, стор только обновляет state
function SaveButton() {
  const navigate = useNavigate();
  const save = useStore((s) => s.save);

  const handleClick = async () => {
    await save();
    navigate('/success');  // ✅ Навигация в компоненте
  };
}
```

---

## Краткая шпаргалка

| Вопрос | Ответ |
|--------|-------|
| Одно поле | `useStore((s) => s.field)` |
| Несколько полей | `useStore(useShallow((s) => ({ a: s.a, b: s.b })))` |
| Computed/derived | Селектор-функция: `(s) => s.items.filter(...)` |
| Тяжёлое вычисление | `useMemo` в компоненте над данными из селектора |
| Вложенные обновления | `immer` middleware |
| Сохранить в localStorage | `persist` middleware |
| Debug | `devtools` middleware + Redux DevTools |
| Частые обновления (60fps) | `subscribe` + ref, не React state |
| Server data | TanStack Query (или Zustand в простых проектах) |
| Client state | Zustand ✅ |
| Сброс стора | `reset` action с `INITIAL_STATE` |

---

## См. также
- `$react-beast-practices` — React-специфичные паттерны
- `$es2025-beast-practices` — современный JavaScript
- `$testing-strategy-js` — стратегия тестирования (включая тесты сторов)
- `$dev-reference-snippets` — Zustand, React, API примеры
