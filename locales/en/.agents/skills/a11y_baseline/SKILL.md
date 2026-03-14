---
name: a11y_baseline
description: Minimum accessibility baseline for web UI — keyboard navigation, focus management, form labels, ARIA for interactive components, error messages.
---

# Skill: A11y Baseline

Minimum accessibility requirements for an MVP. For testing → `$qa_ui_a11y_smoke`.

**Sections:**
1. [WCAG Requirements](#1-requirements)
2. [Component A11y Table](#2-components)
3. [Code Examples](#3-examples)
4. [Verification](#4-verification)
5. [Output Template](#5-output)

---

## 1. Requirements according to WCAG 2.1 AA

### 1.1 Keyboard (WCAG 2.1.1, 2.1.2)

| # | Requirement | WCAG | Severity |
|---|------------|------|----------|
| A-01 | All interactive elements reachable via Tab | 2.1.1 (A) | 🔴 P0 |
| A-02 | No keyboard traps (always can Tab out) | 2.1.2 (A) | 🔴 P0 |
| A-03 | Focus order is logical (DOM order matches visual) | 2.4.3 (A) | 🟠 P1 |
| A-04 | Shortcuts don't conflict with assistive tech | 2.1.4 (A) | 🟡 P2 |

### 1.2 Focus (WCAG 2.4.7)

| # | Requirement | WCAG | Severity |
|---|------------|------|----------|
| A-05 | Visible focus indicator on all interactive elements | 2.4.7 (AA) | 🔴 P0 |
| A-06 | Focus indicator ≥ 2px in contrast | 1.4.11 (AA) | 🟠 P1 |
| A-07 | Modal: focus moves inside on open | — (UX) | 🟠 P1 |
| A-08 | Modal: focus returns to trigger on close | — (UX) | 🟠 P1 |
| A-09 | No `outline: none` without `:focus-visible` replacement | — | 🔴 P0 |

### 1.3 Forms (WCAG 1.3.1, 3.3.x)

| # | Requirement | WCAG | Severity |
|---|------------|------|----------|
| A-10 | Every input has `<label>` or `aria-label` | 1.3.1 (A) | 🔴 P0 |
| A-11 | Required fields have `aria-required="true"` or visual marker | 1.3.1 (A) | 🟠 P1 |
| A-12 | Error messages associated via `aria-describedby` | 3.3.1 (A) | 🟠 P1 |
| A-13 | Error messages are descriptive (not just "Invalid") | 3.3.3 (AA) | 🟠 P1 |
| A-14 | Form submission feedback announced (toast + aria-live) | 4.1.3 (AA) | 🟠 P1 |

### 1.4 Content (WCAG 1.1.1, 1.3.1)

| # | Requirement | WCAG | Severity |
|---|------------|------|----------|
| A-15 | Images have `alt` text (or `alt=""` for decorative) | 1.1.1 (A) | 🟠 P1 |
| A-16 | One `<h1>` per page with logical heading hierarchy | 1.3.1 (A) | 🟠 P1 |
| A-17 | Semantic HTML used (`<button>`, `<nav>`, `<main>`) | 1.3.1 (A) | 🟠 P1 |
| A-18 | Language attribute set (`<html lang="en">`) | 3.1.1 (A) | 🟡 P2 |

### 1.5 Contrast & Visual (WCAG 1.4.x)

| # | Requirement | WCAG | Severity |
|---|------------|------|----------|
| A-19 | Text contrast ≥ 4.5:1 (normal) / 3:1 (large text ≥ 18px) | 1.4.3 (AA) | 🟠 P1 |
| A-20 | Non-text UI contrast ≥ 3:1 (borders, icons) | 1.4.11 (AA) | 🟡 P2 |
| A-21 | Color is not the only means to convey meaning | 1.4.1 (A) | 🟠 P1 |
| A-22 | `prefers-reduced-motion` respected (or opt-in animations) | 2.3.3 (AAA) | 🟡 P2 |

---

## 2. Component A11y Table

### Required ARIA per component type

| Component | Element | Required ARIA | Keyboard |
|-----------|---------|--------------|----------|
| **Button** | `<button>` | — (native) | Enter/Space → activate |
| **Link** | `<a href>` | — (native) | Enter → navigate |
| **Input** | `<input>` | `aria-invalid`, `aria-describedby` | — |
| **Select** | `<select>` or `[role="listbox"]` | `aria-expanded`, `aria-selected` | Arrow keys |
| **Checkbox** | `<input type="checkbox">` | — (native) | Space → toggle |
| **Switch** | `[role="switch"]` | `aria-checked` | Space → toggle |
| **Tabs** | `[role="tablist"]` + `[role="tab"]` | `aria-selected`, `aria-controls` | Arrow keys → navigate |
| **Modal** | `[role="dialog"]` | `aria-modal="true"`, `aria-labelledby` | Escape → close, focus trap |
| **Toast** | `[role="status"]` or `[aria-live="polite"]` | — | Auto-announced |
| **Tooltip** | `[role="tooltip"]` | `aria-describedby` on trigger | Escape → dismiss |
| **Spinner** | — | `aria-busy="true"` on container | — |
| **Skeleton** | — | `aria-hidden="true"` | — |
| **Table** | `<table>` | `<th scope="col/row">` | — |
| **Dropdown** | `[role="menu"]` | `aria-expanded`, `aria-haspopup` | Arrow keys, Enter, Escape |

---

## 3. Code Examples

### Focus management: Modal

```jsx
// ✅ Correct modal focus management
function Modal({ isOpen, onClose, children }) {
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus(); // Focus moves inside modal
    } else {
      triggerRef.current?.focus(); // Focus returns to trigger
    }
  }, [isOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Confirm Delete</h2>
      {children}
      <button ref={closeRef} onClick={onClose}>Cancel</button>
    </div>
  );
}
```

### Form field with error

```jsx
// ✅ Correct form field a11y
function FormField({ id, label, error, required, children }) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {React.cloneElement(children, {
        id,
        'aria-required': required,
        'aria-invalid': !!error,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} role="alert" className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}
```

### Focus visible CSS

```css
/* ✅ Correct focus management */
/* Remove default but keep for keyboard users */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ❌ DON'T: Remove focus for everyone */
*:focus {
  outline: none; /* breaks keyboard navigation! */
}
```

### Toast with aria-live

```jsx
// ✅ Toast that screen readers announce
function ToastContainer({ toasts }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {toasts.map(toast => (
        <div key={toast.id} role="status">
          {toast.message}
        </div>
      ))}
    </div>
  );
}
```

---

## 4. Verification

### Automated tools

| Tool | What it checks | How to run |
|------|---------------|-----------|
| **axe DevTools** | WCAG violations, missing ARIA | Browser extension → Scan |
| **Lighthouse a11y** | Overall a11y score (target ≥ 90) | DevTools → Lighthouse |
| **eslint-plugin-jsx-a11y** | JSX a11y rules in code | `npm install eslint-plugin-jsx-a11y` |

### Manual checks

| Check | How |
|-------|-----|
| Keyboard navigation | Tab through entire page without mouse |
| Focus visible | Every focused element has visible outline |
| Screen reader | Test with NVDA/VoiceOver |
| Color contrast | axe DevTools or Lighthouse |

### Acceptance criteria for Tester

```markdown
- [ ] All P0 interactive flows completable via keyboard
- [ ] All form fields have labels (visible or aria-label)
- [ ] Modals trap focus and return on close
- [ ] Error messages linked to fields (aria-describedby)
- [ ] No `outline: none` without focus-visible replacement
- [ ] Lighthouse a11y score ≥ 90
```

---

## 5. Output Template

```markdown
# A11y Baseline: <Project/Feature>

**Date:** YYYY-MM-DD
**Author:** UX/UI Designer Agent
**WCAG Target:** 2.1 AA

## Requirements Summary
| Category | Total | P0 | P1 | P2 |
|----------|:-----:|:---:|:---:|:---:|
| Keyboard | 4 | 2 | 1 | 1 |
| Focus | 5 | 2 | 3 | 0 |
| Forms | 5 | 1 | 4 | 0 |
| Content | 4 | 0 | 3 | 1 |
| Visual | 4 | 0 | 2 | 2 |
| **Total** | **22** | **5** | **13** | **4** |

## Component A11y Requirements
<section 2 table>

## Acceptance Criteria for Tester
<section 4 checklist>

## Notes / Exceptions
- <any project-specific exceptions>
```

---

## See also
- `$qa_ui_a11y_smoke` — a11y smoke testing
- `$ui_inventory` — component inventory (includes a11y notes)
- `$styling_css_stack` — CSS a11y patterns (focus-visible, prefers-reduced-motion)
- `$ux_spec` — UX Spec (screens with states)