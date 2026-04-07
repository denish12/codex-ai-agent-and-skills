---
name: design-systems
description: Интеграция дизайн-систем — shadcn/ui, Mantine, Wix Design System. Установка, кастомизация темы, component composition, wrapper pattern, UI inventory, маппинг состояний (loading/error/empty/disabled), responsive, a11y. Активируй при подключении дизайн-системы, создании новых компонентов, или при вопросах «как интегрировать X».
---

# Skill: Design Systems Integration

Конкретные паттерны интеграции дизайн-систем: от выбора до wrapper-компонентов.

**Разделы:**
1. [Выбор дизайн-системы](#1-выбор-дизайн-системы)
2. [shadcn/ui: setup и кастомизация](#2-shadcnui)
3. [Wix Design System (WDS)](#3-wix-design-system)
4. [Mantine](#4-mantine)
5. [Wrapper Pattern](#5-wrapper-pattern)
6. [UI Inventory](#6-ui-inventory)
7. [Состояния компонентов](#7-состояния-компонентов)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Выбор дизайн-системы

| Критерий | shadcn/ui | Mantine | WDS |
|---------|-----------|---------|-----|
| **Стек** | React + Tailwind + Radix | React | React + Wix |
| **Кастомизация** | Полная (copy-paste) | Через theme | Через CSS overrides |
| **Bundle size** | Минимальный (no dep) | ~50KB | Включён в Wix |
| **a11y** | Radix (excellent) | Good | Good |
| **Dark mode** | CSS variables | Built-in theme | Ограничен |
| **Когда** | Новые SPA, нужен полный контроль | SPA с rich UI | Wix экосистема |
| **Когда НЕ** | Нет Tailwind в проекте | Нужен minimal bundle | Вне Wix |

> [!TIP]
> **Простое правило:** Wix-проект → WDS. Новый SPA с Tailwind → shadcn/ui. Нужно много ready-made компонентов → Mantine.

---

## 2. shadcn/ui

### Setup

```bash
# Инициализация (Vite + React + Tailwind)
npx shadcn@latest init

# Добавление компонентов (copy-paste, не dependency)
npx shadcn@latest add button dialog input toast
```

### ✅ DO: кастомизация через CSS variables

```css
/* globals.css — переопределение темы shadcn/ui */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 220 90% 56%;
    --primary-foreground: 210 40% 98%;
    --secondary: 280 70% 50%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 220 90% 65%;
    /* ... */
  }
}
```

### ✅ DO: composition с shadcn/ui

```jsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

/**
 * Форма создания купона в модальном окне.
 * @param {{ onSubmit: (code: string) => void }} props
 */
function CreateCouponDialog({ onSubmit }) {
  const [code, setCode] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Coupon</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Coupon code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button onClick={() => onSubmit(code)}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}
```

### Структура файлов

```
src/
├── components/
│   ├── ui/                    # shadcn/ui компоненты (auto-generated)
│   │   ├── button.jsx
│   │   ├── dialog.jsx
│   │   └── input.jsx
│   └── domain/                # Бизнес-компоненты (composition)
│       ├── CouponCard.jsx
│       └── CreateCouponDialog.jsx
├── lib/
│   └── utils.js               # cn() helper (clsx + tailwind-merge)
└── components.json            # shadcn/ui config
```

---

## 3. Wix Design System

### ✅ DO: использовать WDS-компоненты вместо кастомных

```jsx
import {
  Card,
  Text,
  Button,
  Input,
  Loader,
  EmptyState,
  FormField,
  ToggleSwitch,
  ColorInput,
  Tooltip,
  Badge,
} from '@wix/design-system';

/**
 * Карточка купона на WDS.
 * @param {{ coupon: Coupon, onDelete: (id: string) => void }} props
 */
function CouponCard({ coupon, onDelete }) {
  return (
    <Card>
      <Card.Header
        title={coupon.code}
        subtitle={`${coupon.discount}% discount`}
        suffix={
          <Badge skin={coupon.active ? 'success' : 'neutral'}>
            {coupon.active ? 'Active' : 'Inactive'}
          </Badge>
        }
      />
      <Card.Divider />
      <Card.Content>
        <Text size="small" secondary>
          Used {coupon.usageCount} times
        </Text>
      </Card.Content>
      <Card.Divider />
      <Card.Content>
        <Button
          size="small"
          skin="destructive"
          onClick={() => onDelete(coupon.id)}
        >
          Delete
        </Button>
      </Card.Content>
    </Card>
  );
}
```

### ✅ DO: WDS FormField для форм

```jsx
function CouponForm({ onSave }) {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');

  return (
    <form onSubmit={() => onSave({ code, discount: Number(discount) })}>
      <FormField label="Coupon Code" required>
        <Input value={code} onChange={(e) => setCode(e.target.value)} />
      </FormField>

      <FormField label="Discount (%)" required>
        <Input
          type="number"
          min={1}
          max={100}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </FormField>

      <Button type="submit">Save</Button>
    </form>
  );
}
```

### WDS Component Mapping (частые компоненты)

| UI задача | WDS компонент | Props |
|-----------|-------------|-------|
| Кнопка | `Button` | `skin`, `size`, `priority`, `disabled` |
| Ввод текста | `Input` | `status`, `statusMessage`, `prefix`, `suffix` |
| Формы | `FormField` + `Input` | `label`, `required`, `infoContent` |
| Карточка | `Card` + subcomponents | `Card.Header`, `Card.Content`, `Card.Divider` |
| Таблица | `Table` | columns, data, onRowClick |
| Модалка | `Modal` / `MessageBoxFunctionalLayout` | `title`, `primaryButtonText` |
| Пустое состояние | `EmptyState` | `title`, `subtitle`, `image` |
| Лоадер | `Loader` | `size`, `text` |
| Тоггл | `ToggleSwitch` | `checked`, `onChange`, `size` |
| Цвет | `ColorInput` | `value`, `onChange` |
| Тултип | `Tooltip` | `content`, `placement` |
| Бейдж | `Badge` | `skin`, `size`, `type` |

---

## 4. Mantine

### Setup

```bash
npm install @mantine/core @mantine/hooks @mantine/form
```

### ✅ DO: Mantine theme

```jsx
// theme.js
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
  radius: { sm: '4px', md: '8px', lg: '12px' },
  components: {
    Button: {
      defaultProps: { radius: 'md' },
    },
    Input: {
      defaultProps: { radius: 'md' },
    },
  },
});

// App.jsx
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <MyApp />
    </MantineProvider>
  );
}
```

---

## 5. Wrapper Pattern

### ✅ DO: обёртки над библиотечными компонентами

```jsx
// components/AppButton.jsx
import { Button as WDSButton } from '@wix/design-system';

/**
 * Обёртка над WDS Button с проектными дефолтами.
 * Позволяет заменить WDS на другую систему без правок всего кода.
 * @param {Object} props - WDS Button props.
 * @param {React.ReactNode} props.children - Текст кнопки.
 * @param {'primary' | 'secondary' | 'destructive'} [props.variant='primary']
 */
export function AppButton({ variant = 'primary', children, ...rest }) {
  const skinMap = {
    primary: 'standard',
    secondary: 'light',
    destructive: 'destructive',
  };

  return (
    <WDSButton skin={skinMap[variant]} {...rest}>
      {children}
    </WDSButton>
  );
}
```

### Зачем wrapper?

| Причина | Объяснение |
|---------|------------|
| **Миграция** | Замена WDS → shadcn/ui в одном файле, а не в 50 |
| **Единообразие** | Проектные дефолты (size, skin) в одном месте |
| **API упрощение** | Скрыть ненужные props от domain-компонентов |
| **Тестируемость** | Mock одного wrapper, а не всей DDS |

> [!WARNING]
> Wrapper ≠ копировать 100% API библиотеки. Wrapper — тонкая прослойка с проектными дефолтами. Если wrapper дублирует 80%+ props — он бесполезен.

---

## 6. UI Inventory

### ✅ DO: таблица всех используемых компонентов

```markdown
# UI Inventory

| Компонент | DDS Source | Варианты | Используется в |
|-----------|-----------|---------|----------------|
| Button | WDS `Button` | primary, secondary, destructive, icon-only | Все формы, toolbar |
| Input | WDS `Input` | text, number, search, password | Формы |
| Card | WDS `Card` | with header, with divider | Coupons, Templates |
| EmptyState | WDS `EmptyState` | with image, with action | Lists |
| Loader | WDS `Loader` | inline, fullscreen | Async operations |
| ColorPicker | WDS `ColorInput` | single color | Widget config |
| Modal | WDS `Modal` | confirm, form | Delete confirm, create |
| Badge | WDS `Badge` | success, warning, neutral | Status indicators |
| Table | Custom (WDS) | sortable, selectable | Coupons list |
| Toast | WDS `Notification` | success, error, info | After actions |
```

> [!TIP]
> UI Inventory создаётся на UX gate и обновляется на DEV gate. Каждый новый компонент → сначала добавить в inventory.

---

## 7. Состояния компонентов

### ✅ DO: каждый компонент поддерживает 5 состояний

```jsx
/**
 * Универсальный список с поддержкой всех состояний.
 * @param {Object} props
 * @param {any[]} props.items - данные.
 * @param {boolean} props.isLoading - загрузка.
 * @param {string|null} props.error - ошибка.
 * @param {(item: any) => JSX.Element} props.renderItem - рендер элемента.
 * @param {{ title: string, action?: JSX.Element }} props.emptyState - empty state config.
 */
function DataList({ items, isLoading, error, renderItem, emptyState }) {
  // Loading
  if (isLoading) return <Loader size="medium" />;

  // Error
  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  // Empty
  if (!items?.length) {
    return (
      <EmptyState
        title={emptyState.title}
        subtitle="Try adjusting your filters"
        image={<EmptyStateImage />}
      >
        {emptyState.action}
      </EmptyState>
    );
  }

  // Data (happy path)
  return <ul>{items.map(renderItem)}</ul>;
}
```

### Чеклист состояний

| Состояние | Обязательно? | Что показывать |
|-----------|-------------|---------------|
| **Loading** | ✅ Always | Skeleton / Spinner / Progress |
| **Error** | ✅ Always | Сообщение + Retry action |
| **Empty** | ✅ Always | Illustration + Message + Action |
| **Data** | ✅ Always | Основной контент |
| **Disabled** | ⚠️ If interactive | Визуальная индикация + курсор |
| **Partial error** | ⚠️ If applicable | Inline error на отдельных элементах |

---

## 8. Anti-patterns

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| Смешивать несколько DDS в проекте | Одна DDS + wrappers |
| Кастомная кнопка рядом с DDS Button | Использовать DDS, кастомизировать через theme |
| Override DDS стилей через `!important` | Wrapper + props + CSS variables |
| Нет empty/loading/error state | Чеклист 5 состояний для каждого компонента |
| DDS-компоненты напрямую в domain-коде | Wrapper pattern для portability |
| «Свой DatePicker» когда есть в DDS | Всегда проверять DDS каталог сначала |
| Стилизация через className override | Props-first (skin, variant, size) |

---

## Definition of Done (интеграция DDS)

- [ ] DDS выбрана и обоснована
- [ ] Theme/tokens кастомизированы
- [ ] UI Inventory создан
- [ ] Wrappers для ключевых компонентов
- [ ] Все компоненты поддерживают loading/error/empty/disabled
- [ ] Dark mode (если требуется)
- [ ] a11y: focus management, screen reader labels

---

## См. также
- `$ui-inventory` — полный формат UI inventory
- `$styling-css-stack` — CSS токены и naming
- `$ux-spec` — UX спецификация (определяет состояния)
- `$a11y-baseline` — accessibility чеклист
- `$design-parity-review` — сравнение реализации с дизайном
