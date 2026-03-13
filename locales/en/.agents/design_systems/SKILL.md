---
name: design_systems
description: Design system integration ? shadcn/ui, Mantine, Wix Design System. Setup, theme customization, component composition, wrapper pattern, UI inventory, state mapping (loading/error/empty/disabled), responsive behavior, a11y. Activate when connecting a design system, creating new components, or with questions like "how to integrate X".
---

# Skill: Design Systems Integration

Concrete patterns integrations design systems: from choice to wrapper-components.

**Sections:**
1. [Choosing a design system](#1-design-system-choice)
2. [shadcn/ui: setup and customization](#2-shadcnui)
3. [Wix Design System (WDS)](#3-wix-design-system)
4. [Mantine](#4-mantine)
5. [Wrapper Pattern](#5-wrapper-pattern)
6. [UI Inventory](#6-ui-inventory)
7. [Component states](#7-component-states)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Choice design system

| Criterion | shadcn/ui | Mantine | WDS |
|---------|-----------|---------|-----|
| **Stack** | React + Tailwind + Radix | React | React + Wix |
| **Customization** | Full (copy-paste) | Via theme | Via CSS overrides |
| **Bundle size** | Minimal (no dependency) | ~50KB | Included in Wix |
| **a11y** | Radix (excellent) | Good | Good |
| **Dark mode** | CSS variables | Built-in theme | Limited |
| **When** | New SPA, need full control | SPA with rich UI | Wix ecosystem |
| **When Not** | No Tailwind in project | Needed minimal bundle | Innot Wix |

> [!TIP]
> **Simple rule:** Wix-project → WDS. New SPA with Tailwind → shadcn/ui. Needed many ready-made components → Mantine.

---

## 2. shadcn/ui

### Setup

```bash
# Initialization (Vite + React + Tailwind)
npx shadcn@latest init

# Add components (copy-paste, not dependency)
npx shadcn@latest add button dialog input toast
```

### ✅ DO: customization via CSS variables

```css
/* globals.css — override themes shadcn/ui */
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

### ✅ DO: composition with shadcn/ui

```jsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

/**
 * Coupon creation form in a modal window.
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

### Structure files

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components (auto-generated)
│   │   ├── button.jsx
│   │   ├── dialog.jsx
│   │   └── input.jsx
?   ??? domain/                # Business components (composition)
│       ├── CouponCard.jsx
│       └── CreateCouponDialog.jsx
├── lib/
│   └── utils.js               # cn() helper (clsx + tailwind-merge)
└── components.json            # shadcn/ui config
```

---

## 3. Wix Design System

### ? DO: use WDS components instead of custom ones

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
 * Card coupon on WDS.
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

### ✅ DO: WDS FormField forms

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

### WDS Component Mapping (common components)

| UI task | WDS component | Props |
|-----------|-------------|-------|
| Button | `Button` | `skin`, `size`, `priority`, `disabled` |
| Text input | `Input` | `status`, `statusMessage`, `prefix`, `suffix` |
| Forms | `FormField` + `Input` | `label`, `required`, `infoContent` |
| Card | `Card` + subcomponents | `Card.Header`, `Card.Content`, `Card.Divider` |
| Table | `Table` | columns, data, onRowClick |
| Modal | `Modal` / `MessageBoxFunctionalLayout` | `title`, `primaryButtonText` |
| Empty state | `EmptyState` | `title`, `subtitle`, `image` |
| Loader | `Loader` | `size`, `text` |
| Toggle | `ToggleSwitch` | `checked`, `onChange`, `size` |
| Color | `ColorInput` | `value`, `onChange` |
| Tooltip | `Tooltip` | `content`, `placement` |
| Badge | `Badge` | `skin`, `size`, `type` |

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

### ? DO: wrappers over library components

```jsx
// components/AppButton.jsx
import { Button as WDSButton } from '@wix/design-system';

/**
 * Wrapper over WDS Button with project defaults.
 * Allows replacing WDS with another system without editing all code.
 * @param {Object} props - WDS Button props.
 * @param {React.ReactNode} props.children - Text button.
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

### Why wrapper?

| Cause | Explanation |
|---------|------------|
| **Migration** | Replacement WDS → shadcn/ui in one file, and not in 50 |
| **Consistency** | Project defaults (size, skin) in one place |
| **API simplification** | Hide unnecessary props from domain components |
| **Testability** | Mock one wrapper, not the entire DS |

> [!WARNING]
> Wrapper ? copy 100% of the library API. A wrapper is a thin layer with project defaults. If the wrapper duplicates 80%+ of props ? it is useless.

---

## 6. UI Inventory

### ✅ DO: table all use components

```markdown
# UI Inventory

| Component | DDS Source | Options | Is used in |
|-----------|-----------|---------|----------------|
| Button | WDS `Button` | primary, secondary, destructive, icon-only | All forms, toolbar |
| Input | WDS `Input` | text, number, search, password | Forms |
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
> UI Inventory create on UX gate and update on DEV gate. Each new component → first add inventory.

---

## 7. States components

### ✅ DO: each component supports 5 states

```jsx
/**
 * Universal list with support all states.
 * @param {Object} props
 * @param {any[]} props.items - data.
 * @param {boolean} props.isLoading - loading.
 * @param {string|null} props.error - error.
 * @param {(item: any) => JSX.Element} props.renderItem - render element.
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

### Checklist states

| State | Mandatory? | What show |
|-----------|-------------|---------------|
| **Loading** | ✅ Always | Skeleton / Spinner / Progress |
| **Error** | ✅ Always | Message + Retry action |
| **Empty** | ✅ Always | Illustration + Message + Action |
| **Data** | ✅ Always | Main content |
| **Disabled** | ?? If interactive | Visual indication + cursor |
| **Partial error** | ?? If applicable | Inline error on individual elements |

---

## 8. Anti-patterns

| ❌ Anti-pattern | ✅ Decision |
|----------------|-----------|
| Mix several DDS in project | One DDS + wrappers |
| Custom button next to a DS button | Use DS, customize via theme |
| Override DDS styles via `!important` | Wrapper + props + CSS variables |
| No empty/loading/error state | Checklist 5 states for each component |
| DDS-components directly in domain-code | Wrapper pattern for portability |
| «Own DatePicker» when is in DDS | Always check DDS catalog first |
| Style via className override | Props-first (skin, variant, size) |

---

## Definition of Done (integration DDS)

- [ ] DS selected and justified
- [ ] Theme/tokens customized
- [ ] UI Inventory create
- [ ] Wrappers for key components
- [ ] All components support loading/error/empty/disabled
- [ ] Dark mode (if required)
- [ ] a11y: focus management, screen reader labels

---

## See also
- `$ui_inventory` — full format UI inventory
- `$styling_css_stack` — CSS tokens and naming
- `$ux_spec` — UX specification (defines states)
- `$a11y_baseline` — accessibility checklist
- `$design_parity_review` — comparison implementation with design
