---
name: ux_spec
description: Сформировать UX Spec — user flows, IA, список экранов, спецификация каждого экрана (действия/секции/валидации/состояния), критерии UX качества для разработки и тестирования.
---

# Skill: UX Spec (Flows + Screens + States)

Спецификация, по которой можно реализовать UI без «домыслов».

**Разделы:**
1. [Workflow](#1-workflow)
2. [UX Spec Structure](#2-structure)
3. [Screen Spec Format](#3-screen-format)
4. [Interaction Patterns](#4-interactions)
5. [Quality Checklist](#5-quality)
6. [Handoff Checklist](#6-handoff)
7. [Пример: Settings Screen](#7-пример)
8. [Output Template](#8-output)

---

## 1. Workflow

```
1. Input: UX Discovery Report (из $ux_discovery) + PRD
2. Define users & roles
3. Map user flows (trigger → steps → outcome)
4. Define IA (screens, navigation, routes)
5. For each screen → spec (section 3)
6. Define interaction patterns (section 4)
7. Run quality checklist (section 5)
8. Create handoff package (section 6)
```

---

## 2. UX Spec Structure

### 1) Users & Roles

```markdown
| Role | Permissions | Access |
|------|------------|--------|
| Site Owner | Full CRUD, settings | Dashboard, widget config |
| End User | View popup, copy coupon | Widget only (public) |
```

### 2) Key User Flows

For each flow:

```markdown
### Flow: Create Coupon

**Trigger:** User clicks "Add Coupon" in Coupons section
**Preconditions:** Logged in, app installed

| Step | Action | Result |
|------|--------|--------|
| 1 | Click "Add Coupon" button | Form appears |
| 2 | Fill code, discount, type, expiry | Fields validated inline |
| 3 | Click "Save" | Loading state → toast "Saved" |

**Success:** Coupon appears in list
**Failure:** Validation errors shown inline
**Edge:** Duplicate code → error "Code already exists"
```

### 3) Information Architecture

```markdown
Dashboard
├── Settings
│   ├── General tab (title, description, CTA)
│   ├── Design tab (colors, fonts, template)
│   ├── Timer tab (countdown config)
│   └── Coupon tab (select coupon to display)
├── Coupons
│   ├── List (table with CRUD)
│   └── Create/Edit form
└── Live Preview (side panel)
```

### 4) Screen Specs → section 3

### 5) UI Rules → section 4

---

## 3. Screen Spec Format

### Template

```markdown
## Screen: <Name>

**URL/Route:** /dashboard/settings
**Purpose:** Configure popup appearance and behavior
**Role access:** Site Owner

### Layout
- [ ] Two-column: config panel (left) + live preview (right)
- [ ] Tabs: General | Design | Timer | Coupon

### Sections & Components
| Section | Components | Notes |
|---------|-----------|-------|
| Header | Title, Breadcrumbs | — |
| Config Panel | Tabs → FormFields | Tab-specific content |
| Live Preview | PopupPreview | Real-time updates |
| Actions | Save button, Reset link | Bottom of config panel |

### Primary Actions
| Action | Element | Behavior |
|--------|---------|----------|
| Save | Primary button | POST → toast "Saved" → refresh preview |
| Reset | Ghost link | Confirm dialog → reset to defaults |
| Switch tab | Tab buttons | Update config panel content |

### Forms & Validation
| Field | Type | Required | Validation | Error message |
|-------|------|:--------:|-----------|--------------|
| Title | Text | ✅ | 1-100 chars | "Title is required" |
| Subtitle | Textarea | ❌ | max 300 chars | "Too long (max 300)" |
| BG Color | ColorPicker | ✅ | valid hex | "Invalid color" |

### States
| State | Visual | Trigger |
|-------|--------|---------|
| **Loading** | Skeleton in config panel + preview | Initial fetch |
| **Empty** | — (always has defaults) | — |
| **Error** | Inline field errors + toast for server errors | Save fails |
| **Success** | Toast "Settings saved" | Successful save |
| **Saving** | Button shows spinner, disabled | During POST |

### Notifications
| Event | Type | Message | Duration |
|-------|------|---------|----------|
| Save success | Toast (success) | "Settings saved" | 3s auto-dismiss |
| Save error | Toast (error) | "Failed to save. Try again." | Manual dismiss |
| Reset confirm | Modal (confirm) | "Reset to defaults?" | — |

### Responsive Notes
- Desktop only (Wix iframe)
- Min width: 700px
```

---

## 4. Interaction Patterns

### Standard patterns (apply globally)

| Pattern | Rule |
|---------|------|
| **Primary action** | One primary button per screen (filled, accent color) |
| **Secondary action** | Outlined or ghost button |
| **Destructive action** | Red button + confirmation modal |
| **Loading** | Skeleton for initial load, spinner for in-flight actions |
| **Save** | Button shows spinner + disabled during save |
| **Form errors** | Inline below field, red text, shown on blur + submit |
| **Toast** | Bottom-right, auto-dismiss 3-5s for success, manual dismiss for errors |
| **Empty list** | Illustration + message + CTA ("Create your first coupon") |
| **Pagination** | Bottom of list, show total count + page controls |
| **Hover** | Subtle background change on interactive elements |
| **Transitions** | 200-300ms ease for all state changes |

### Keyboard interactions

| Element | Enter | Escape | Tab |
|---------|-------|--------|-----|
| Button | Activate | — | Next element |
| Modal | — | Close | Trap focus inside |
| Dropdown | Select item | Close | Navigate items |
| Tab | Switch tab | — | Next tab |
| Form | Submit (if last field) | — | Next field |

---

## 5. Quality Checklist

| # | Check | Status |
|---|-------|--------|
| UX-01 | Every PRD user story has a corresponding flow | ☐ |
| UX-02 | Every flow has a screen spec | ☐ |
| UX-03 | Every screen has all 4 states (loading/empty/error/success) | ☐ |
| UX-04 | Every form has validation rules + error messages | ☐ |
| UX-05 | Destructive actions have confirmation | ☐ |
| UX-06 | All components listed (no vague "and more...") | ☐ |
| UX-07 | All user actions documented (clicks, navigation, forms) | ☐ |
| UX-08 | Responsive behavior specified (or explicitly desktop-only) | ☐ |
| UX-09 | Permissions affect UI visibility (documented) | ☐ |
| UX-10 | Edge cases covered (duplicate, max length, empty, concurrent) | ☐ |

---

## 6. Handoff Checklist

What UX/UI Designer passes to Architect / DEV:

| # | Deliverable | For whom | Status |
|---|------------|:--------:|--------|
| 1 | UX Spec document | Architect + DEV | ☐ |
| 2 | Screen list + routes | Architect | ☐ |
| 3 | UI Inventory (`$ui_inventory`) | DEV | ☐ |
| 4 | A11y Baseline (`$a11y_baseline`) | DEV + Tester | ☐ |
| 5 | Design reference (Stitch/Figma/HTML) | DEV | ☐ |
| 6 | Component states mapping | DEV + Tester | ☐ |
| 7 | Validation rules table | Architect (→ API contracts) | ☐ |

---

## 7. Пример: Settings Screen

```markdown
## Screen: Settings

**URL/Route:** /dashboard/settings
**Purpose:** Configure popup widget appearance
**Role:** Site Owner

### Layout
Two-column: Config Panel (left, 60%) + Live Preview (right, 40%)

### Sections
| Section | Tab | Components |
|---------|-----|-----------|
| Title & Subtitle | General | TextInput, Textarea |
| CTA Button | General | TextInput, Switch (show/hide) |
| Design Style | Design | ColorPickers (4 tokens), FontSelect |
| Timer | Timer | Switch (enable), NumberInputs (min, sec) |
| Coupon | Coupon | CouponSelector (dropdown from DB) |

### States
| State | Loading | Empty | Error | Success |
|-------|---------|-------|-------|---------|
| Config | Skeleton fields | N/A (defaults) | Inline + toast | Toast "Saved" |
| Preview | Skeleton popup | Default template | Error illustration | Live update |
```

---

## 8. Output Template

```markdown
# UX Spec: <Feature/Project>

**Date:** YYYY-MM-DD
**Author:** UX/UI Designer Agent
**PRD:** <reference>
**Discovery:** <reference>

## 1. Users & Roles
<section 2 table>

## 2. Key User Flows
<section 2 flow format × N flows>

## 3. Information Architecture
<IA tree>

## 4. Screen Specs
<section 3 format × N screens>

## 5. Interaction Patterns
<section 4 tables>

## 6. Quality Checklist
<section 5 — all checked>

## Handoff
<section 6 — all checked>
```

---

## См. также
- `$ux_discovery` — discovery before spec
- `$ui_inventory` — component inventory
- `$a11y_baseline` — accessibility requirements
- `$design_intake` — analyze design materials
- `$google_stitch_skill` — generate UI screens from spec
