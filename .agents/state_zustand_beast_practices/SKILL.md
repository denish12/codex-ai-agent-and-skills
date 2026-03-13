---
name: state_zustand_beast_practices
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
// ✅ stores/coupon-store.js — отвечает только за купоны
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

### ❌ DON'T: один «бог-стор» на всё приложение

```js
// ❌ Один стор = всё в одном месте = неуправляемо
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
  
  // ... ещё 50 полей
}));
```

### ✅ DO: slice pattern для составных сторов

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
const useCouponStore = create((set, get) => ({
  coupons: [],

  /**
   * Применяет купон к заказу и обновляет его статус.
   * @param {string} couponId - ID купона.
   * @param {string} orderId - ID заказа.
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

### ✅ DO: set с updater function для сложных обновлений

```js
// ✅ Updater function — безопасно, не зависит от замыкания
set((state) => ({
  coupons: state.coupons.map((c) =>
    c.id === id ? { ...c, active: false } : c
  ),
}));

// ❌ Чтение state из замыкания — race condition
const coupons = get().coupons;
set({ coupons: coupons.map(/* ... */) }); // stale если другой action обновил coupons
```

### ✅ DO: reset action для возврата к начальному состоянию

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

  /** Сбрасывает стор к начальному состоянию. */
  reset: () => set(INITIAL_STATE),
}));
```

---

## 3. Селекторы и производительность

### ✅ DO: атомарные селекторы для предотвращения лишних ререндеров

```js
// ✅ Каждый компонент подписан только на нужное поле
function CouponList() {
  const coupons = useCouponStore((state) => state.coupons);
  return coupons.map((c) => <CouponCard key={c.id} coupon={c} />);
}

function LoadingSpinner() {
  const isLoading = useCouponStore((state) => state.isLoading);
  if (!isLoading) return null;
  return <Spinner />;
}

// ❌ Берём весь стор — ререндер при ЛЮБОМ изменении
function CouponList() {
  const store = useCouponStore(); // подписка на ВСЁ
  return store.coupons.map(/* ... */);
}
```

### ✅ DO: useShallow для объектов/массивов из нескольких полей

```js
import { useShallow } from 'zustand/react/shallow';

// ✅ shallow сравнение — ререндер только при реальном изменении
function CouponHeader() {
  const { coupons, isLoading } = useCouponStore(
    useShallow((state) => ({
      coupons: state.coupons,
      isLoading: state.isLoading,
    }))
  );

  return <h2>Coupons ({coupons.length}) {isLoading && '...'}</h2>;
}

// ❌ Без useShallow — каждый set() создаёт новый объект → перерисовка
function CouponHeader() {
  const { coupons, isLoading } = useCouponStore((state) => ({
    coupons: state.coupons,
    isLoading: state.isLoading,
  })); // ❌ новый объект каждый раз
}
```

### ✅ DO: derived (computed) значения через селекторы

```js
// ✅ Селектор-функция снаружи стора — переиспользуемая
const selectActiveCoupons = (state) =>
  state.coupons.filter((c) => c.active);

const selectCouponById = (id) => (state) =>
  state.coupons.find((c) => c.id === id);

// Использование:
function ActiveCoupons() {
  const active = useCouponStore(selectActiveCoupons);
  // ...
}

function CouponDetail({ id }) {
  const coupon = useCouponStore(selectCouponById(id));
  // ...
}
```

### ⚠️ Мемоизация тяжёлых вычислений

```js
import { useMemo } from 'react';

function CouponStats() {
  const coupons = useCouponStore((state) => state.coupons);

  // ✅ Мемоизируем тяжёлое вычисление
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
    { name: 'CouponStore' } // ✅ Имя в Redux DevTools
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

### ✅ DO: типизированные slice

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

## 6. Тестирование сторов

### ✅ DO: тестировать стор напрямую (без React)

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCouponStore } from './coupon-store.js';

describe('CouponStore', () => {
  beforeEach(() => {
    // ✅ Сброс стора перед каждым тестом
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

### ✅ DO: тестировать async actions с моками

```js
import { vi } from 'vitest';

// Мокаем API
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

    // Во время загрузки
    expect(useCouponStore.getState().isLoading).toBe(true);

    resolvePromise([]);
    await fetchPromise;

    // После загрузки
    expect(useCouponStore.getState().isLoading).toBe(false);
  });
});
```

### ✅ DO: тестировать subscribe (подписки)

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

## 7. React интеграция

### ✅ DO: подписка на стор вне React (subscribe)

```js
// ✅ Для side-effects, логирования, аналитики
const unsubscribe = useCouponStore.subscribe(
  (state) => state.selectedCouponId,
  (selectedId, prevSelectedId) => {
    if (selectedId !== prevSelectedId) {
      analytics.track('coupon_selected', { couponId: selectedId });
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
function CouponList() {
  const fetchCoupons = useCouponStore((s) => s.fetchCoupons);
  fetchCoupons(); // ❌ Вызывается при каждом рендере!

  // ✅ Правильно:
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);
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
// ❌ activeCoupons — derived от coupons, отвечает за синхронизацию
const useStore = create((set) => ({
  coupons: [],
  activeCoupons: [],  // ❌ дубликат!

  addCoupon: (c) => set((s) => ({
    coupons: [...s.coupons, c],
    activeCoupons: c.active
      ? [...s.activeCoupons, c]
      : s.activeCoupons, // легко забыть обновить
  })),
}));

// ✅ Вычислять через селектор
const selectActiveCoupons = (state) => state.coupons.filter((c) => c.active);
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
- `$react_beast_practices` — React-специфичные паттерны
- `$es2025_beast_practices` — современный JavaScript
- `$testing_strategy_js` — стратегия тестирования (включая тесты сторов)
- `$dev_reference_snippets` — Zustand, React, API примеры
