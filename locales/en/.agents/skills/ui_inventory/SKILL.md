---
name: ui_inventory
description: Compile an inventory of UI components and reuse rules — base components, composition components, patterns (forms, tables, dialogs), design tokens (minimum).
---

# Skill: UI Components Inventory

Catalog of UI components with variants, states, a11y notes.

**Sections:**
1. [Workflow](#1-workflow)
2. [Component Card Template](#2-card)
3. [Component Catalog](#3-catalog)
4. [Design Tokens](#4-tokens)
5. [Design System Mapping](#5-mapping)
6. [Example: Button Card](#6-example)
7. [Output Template](#7-output)

---

## 1. Workflow

```
1. Input: UX Spec (from $ux_spec)
2. Extract all mentioned components from Screen Specs
3. Classify: atom / molecule / organism / pattern
4. For each → Component Card (section 2)
5. Map to design system (section 5) if available
6. Define design tokens (section 4)
7. Validate: every component in UI Spec is covered
```

### Decision: Use existing vs Build custom

```
Component needed ← UX Spec
    ├── Exists in design system? (WDS / shadcn / Mantine)
    │   ├── Yes, fits → USE (specify import + variant)
    │   ├── Yes, but needs customization → CUSTOMIZE (wrapper component)
    │   └── No → BUILD CUSTOM (with a11y baseline)
    └── Already exists in the project?
        ├── Yes → REUSE (specify path)
        └── No → CREATE (using template)
```

---

## 2. Component Card Template

```markdown
### Component: <Name>

**Category:** Atom / Molecule / Organism
**Source:** WDS | shadcn | Custom | Existing (<path>)
**Used in:** <screens list>

#### Variants
| Variant | Visual | Use case |
|---------|--------|----------|
| primary | Filled, accent color | Main CTA |
| secondary | Outlined | Secondary actions |
| ghost | Text only | Tertiary actions |
| destructive | Red filled | Delete/remove |

#### Props
| Prop | Type | Required | Default | Description |
|------|------|:--------:|---------|-------------|
| label | string | ✅ | — | Button text |
| variant | enum | ❌ | "primary" | Visual style |
| size | "sm" | "md" | "lg" | ❌ | "md" | Dimensions |
| disabled | boolean | ❌ | false | Disable interaction |
| loading | boolean | ❌ | false | Show spinner |
| onClick | function | ✅ | — | Click handler |

#### States
| State | Visual | Behavior |
|-------|--------|----------|
| Default | Normal appearance | Clickable |
| Hover | Darker bg / lighter bg | Cursor pointer |
| Active/Pressed | Slight scale down | Processing |
| Focused | Focus ring visible | Keyboard nav |
| Disabled | 50% opacity | Not clickable |
| Loading | Spinner replaces label | Not clickable |

#### A11y Notes
- Uses `<button>` element (not div)
- `aria-disabled` when disabled
- `aria-busy` when loading
- Focus visible via `:focus-visible`
```

---

## 3. Component Catalog

### 3.1 Atoms (base elements)

| Component | Variants | Source | A11y |
|-----------|---------|--------|------|
| **Button** | primary / secondary / ghost / destructive | WDS / Custom | `<button>`, focus-visible |
| **TextInput** | default / error / disabled | WDS / Custom | `<label>` linked, aria-invalid |
| **Textarea** | default / error / disabled | WDS / Custom | `<label>` linked |
| **Select** | default / error / disabled | WDS / Custom | aria-expanded, listbox role |
| **Checkbox** | unchecked / checked / indeterminate | WDS | `<input type="checkbox">` |
| **Switch** | off / on / disabled | WDS | role="switch", aria-checked |
| **ColorPicker** | — | Custom | aria-label, keyboard nav |
| **NumberInput** | default / error / disabled | WDS / Custom | min/max, step |
| **Badge** | success / warn / error / info / neutral | WDS | aria-label for icon-only |
| **Spinner** | sm / md / lg | WDS | aria-busy on parent |
| **Skeleton** | text / rect / circle | Custom | aria-hidden |
| **Icon** | varies (Material Symbols) | Custom | aria-hidden (decorative) or aria-label |
| **Tooltip** | top / bottom / left / right | WDS | role="tooltip", aria-describedby |

### 3.2 Molecules (composed)

| Component | Contains | Source | Notes |
|-----------|---------|--------|-------|
| **FormField** | Label + Control + HelpText + Error | Custom | Standard form pattern |
| **Toast** | Icon + Message + Close | WDS | Auto-dismiss, aria-live |
| **EmptyState** | Icon/Illustration + Text + CTA | Custom | Call-to-action button |
| **ErrorState** | Icon + Message + Retry button | Custom | — |
| **Card** | Header + Body + Actions | Custom | — |
| **TabBar** | Tab × N | WDS | role="tablist", arrow keys |

### 3.3 Organisms (complex)

| Component | Contains | Source | Notes |
|-----------|---------|--------|-------|
| **ConfigPanel** | TabBar + FormFields + SaveButton | Custom | Main settings form |
| **LivePreview** | PopupTemplate (rendered) | Custom | Updates on config change |
| **DataTable** | Table + Pagination + EmptyState | Custom | CRUD actions |
| **ConfirmDialog** | Modal + Message + Confirm/Cancel buttons | WDS | Focus trap |

### 3.4 Patterns (behavioral)

| Pattern | Rule | Components used |
|---------|------|----------------|
| **Loading strategy** | Skeleton for initial, spinner for actions | Skeleton, Spinner |
| **Empty state** | Illustration + text + CTA | EmptyState |
| **Error recovery** | Message + retry button | ErrorState, Toast |
| **Destructive confirm** | Modal before delete | ConfirmDialog |
| **Optimistic update** | Show change → revert on error | Toast (undo) |
| **Form validation** | Inline on blur + all on submit | FormField (error state) |

---

## 4. Design Tokens

### Spacing

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 4px | Dense padding |
| `--space-sm` | 8px | Default gap |
| `--space-md` | 16px | Section padding |
| `--space-lg` | 24px | Card padding |
| `--space-xl` | 32px | Section spacing |
| `--space-2xl` | 48px | Page margins |

### Typography

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `--text-xs` | 12px | 400 | Captions, help text |
| `--text-sm` | 14px | 400 | Body, form labels |
| `--text-md` | 16px | 400 | Default body |
| `--text-lg` | 18px | 500 | Section headers |
| `--text-xl` | 24px | 600 | Page headers |
| `--text-2xl` | 32px | 700 | Title |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Inputs, badges |
| `--radius-md` | 8px | Cards, buttons |
| `--radius-lg` | 12px | Modals, panels |
| `--radius-full` | 9999px | Avatars, pills |

### Status Colors

| Token | Value | Use |
|-------|-------|-----|
| `--color-success` | `#22c55e` | Success states |
| `--color-warning` | `#f59e0b` | Warnings |
| `--color-error` | `#ef4444` | Errors |
| `--color-info` | `#3b82f6` | Info |

### Shadows

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Dropdowns |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.15)` | Modals |

---

## 5. Design System Mapping

### Wix Design System (WDS) mapping

| UI Inventory | WDS component | Import | Notes |
|-------------|--------------|--------|-------|
| Button | `<Button>` | `@wix/design-system` | Supports priority prop |
| TextInput | `<Input>` | `@wix/design-system` | — |
| Switch | `<ToggleSwitch>` | `@wix/design-system` | — |
| Toast | `Toast` (imperative) | `@wix/design-system` | Use with `<Notification>` |
| Modal | `<Modal>` + `<MessageModalLayout>` | `@wix/design-system` | — |
| Tabs | `<Tabs>` | `@wix/design-system` | — |
| Table | `<Table>` | `@wix/design-system` | — |
| ColorPicker | — | Custom build | WDS doesn't have one |
| LivePreview | — | Custom build | App-specific |

---

## 6. Example: Button Card

```markdown
### Component: Button

**Category:** Atom
**Source:** WDS `<Button>` (customized)
**Used in:** Settings (Save, Reset), Items (Create, Delete)

#### Variants
| Variant | WDS `priority` | Visual |
|---------|:-------------:|--------|
| primary | `primary` | Filled blue (#116DFF) |
| secondary | `secondary` | Outlined |
| destructive | N/A (custom) | Filled red (#D32F2F) |

#### States
| Default | Hover | Loading | Disabled |
|---------|-------|---------|----------|
| Normal | Darker bg | Spinner, no text | 50% opacity |

#### A11y: `<button>`, focus-visible, aria-disabled, aria-busy
```

---

## 7. Output Template

```markdown
# UI Components Inventory

**Date:** YYYY-MM-DD
**Author:** UX/UI Designer Agent
**Design System:** <WDS / shadcn / Custom>
**UX Spec:** <reference>

## Component Summary
| Category | Count | Custom | From DS |
|----------|:-----:|:------:|:-------:|
| Atoms | 13 | 3 | 10 |
| Molecules | 6 | 4 | 2 |
| Organisms | 4 | 4 | 0 |
| Patterns | 6 | — | — |

## Component Cards
<section 2 format × N components>

## Design Tokens
<section 4>

## Design System Mapping
<section 5>
```

---

## See also
- `$ux_spec` — Screen specs (input for inventory)
- `$a11y_baseline` — a11y requirements per component
- `$design_systems` — integration guide for design systems
- `$design_intake` — analyze design materials