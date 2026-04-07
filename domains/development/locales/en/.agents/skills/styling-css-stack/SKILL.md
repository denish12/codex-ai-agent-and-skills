---
name: styling-css-stack
description: CSS practices — custom properties (design tokens), naming (BEM / CSS Modules), responsive, transitions, z-index scale, dark mode, a11y (focus-visible, prefers-reduced-motion, forced-colors). DO/DON'T examples. Activate when writing or reviewing CSS/Less/Sass, when refactoring styles, or for questions "how to properly style X".
---

# Skill: Styling (CSS Stack) Beast Practices

Specific DO/DON'T patterns for CSS — from design tokens to a11y.

**Sections:**
1. [Design Tokens (CSS Custom Properties)](#1-design-tokens)
2. [Naming: BEM vs CSS Modules](#2-naming)
3. [Responsive and Media Queries](#3-responsive)
4. [Dark Mode](#4-dark-mode)
5. [Transitions and Animations](#5-transitions-and-animations)
6. [Z-index Scale](#6-z-index-scale)
7. [Accessibility (a11y)](#7-accessibility)
8. [File Organization](#8-file-organization)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. Design Tokens

### ✅ DO: CSS custom properties as a single source of truth

```css
/* tokens.css — global design tokens */
:root {
  /* Colors */
  --color-primary: hsl(220, 90%, 56%);
  --color-primary-hover: hsl(220, 90%, 46%);
  --color-secondary: hsl(280, 70%, 50%);
  --color-surface: hsl(0, 0%, 100%);
  --color-surface-elevated: hsl(0, 0%, 98%);
  --color-text: hsl(220, 20%, 12%);
  --color-text-muted: hsl(220, 10%, 50%);
  --color-border: hsl(220, 15%, 88%);
  --color-error: hsl(0, 80%, 55%);
  --color-success: hsl(145, 70%, 40%);

  /* Spacing (4px grid) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.05);
  --shadow-md: 0 4px 6px hsl(0 0% 0% / 0.07);
  --shadow-lg: 0 10px 25px hsl(0 0% 0% / 0.1);

  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### ❌ DON'T: hardwood values in components

```css
/* ❌ Magic values — impossible to maintain, no dark mode */
.card {
  padding: 17px;
  color: #333;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* ✅ Tokens — uniform, supports theme */
.card {
  padding: var(--space-4);
  color: var(--color-text);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

---

## 2. Naming

### ✅ DO: BEM for vanilla CSS

```css
/* Block */
.product-card { }

/* Element */
.product-card__title { }
.product-card__price { }
.product-card__actions { }

/* Modifier */
.product-card--active { }
.product-card--sold-out { }

/* State (JS-driven) */
.product-card.is-selected { }
.product-card.is-loading { }
```

```html
<div class="product-card product-card--active is-selected">
  <h3 class="product-card__title">Premium Widget</h3>
  <span class="product-card__price">$29.99</span>
  <div class="product-card__actions">
    <button>Add to Cart</button>
  </div>
</div>
```

### ✅ DO: CSS Modules for React (scoped by default)

```css
/* ProductCard.module.css */
.card {
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.card.active {
  border-color: var(--color-primary);
}

.title {
  font-size: var(--text-lg);
  font-weight: 600;
}

.price {
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}
```

```jsx
import styles from './ProductCard.module.css';
import clsx from 'clsx';

function ProductCard({ product }) {
  return (
    <div className={clsx(styles.card, product.active && styles.active)}>
      <h3 className={styles.title}>{product.name}</h3>
      <span className={styles.price}>${product.price}</span>
    </div>
  );
}
```

### When to use what

| Approach | When ✅ | When ❌ |
|--------|---------|---------|
| **BEM** | Vanilla CSS/HTML, widgets, legacy | Large SPAs (no scoping) |
| **CSS Modules** | React/Vue SPA, component architecture | Static sites |
| **Tailwind** | Rapid prototyping, utility-first teams | Wix widgets, complex animations |

---

## 3. Responsive

### ✅ DO: mobile-first with min-width breakpoints

```css
/* ✅ Mobile-first: base styles for mobile, expand upwards */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {  /* sm */
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) { /* lg */
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### ✅ DO: breakpoint tokens

```css
/* Breakpoints (not custom properties — media queries do not support var()) */
/* sm:  640px  — phone landscape / small tablet */
/* md:  768px  — tablet portrait */
/* lg:  1024px — tablet landscape / small desktop */
/* xl:  1280px — desktop */
/* 2xl: 1536px — wide desktop */
```

### ✅ DO: container queries for components

```css
/* ✅ Component adapts to CONTAINER size, not screen */
.card-container {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row; /* Horizontal layout when enough space */
  }
}
```

### ❌ DON'T: fixed width for layout

```css
/* ❌ Breaks on non-standard screens */
.container {
  width: 1200px;
}

/* ✅ Responsive width */
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-4);
}
```

---

## 4. Dark Mode

### ✅ DO: dark mode via overriding tokens

```css
/* ✅ Automatic dark mode via media query */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: hsl(220, 20%, 10%);
    --color-surface-elevated: hsl(220, 20%, 14%);
    --color-text: hsl(220, 15%, 90%);
    --color-text-muted: hsl(220, 10%, 60%);
    --color-border: hsl(220, 15%, 25%);
    --color-primary: hsl(220, 90%, 65%);
    --shadow-md: 0 4px 6px hsl(0 0% 0% / 0.3);
  }
}

/* ✅ Or via class toggle (JS-controlled) */
[data-theme="dark"] {
  --color-surface: hsl(220, 20%, 10%);
  --color-text: hsl(220, 15%, 90%);
  /* ... */
}
```

### ❌ DON'T: invert colors or hardcode

```css
/* ❌ filter — breaks images, icons, video */
.dark-mode {
  filter: invert(1);
}

/* ❌ Duplicating styles instead of overriding tokens */
.dark-mode .card {
  background: #1a1a2e;
  color: #eee;
  border-color: #333;
}
```

---

## 5. Transitions and Animations

### ✅ DO: transition on specific properties

```css
/* ✅ Explicit properties — performant, predictable */
.button {
  transition:
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* ❌ transition: all — animates everything, including width/height (layout thrashing) */
.button {
  transition: all 0.3s ease;  /* ❌ */
}
```

### ✅ DO: animate only transform and opacity (GPU-accelerated)

```css
/* ✅ GPU: transform + opacity — do not trigger layout/paint */
.fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ❌ Animating width/height/top/left — triggers layout recalculation */
@keyframes bad {
  from { width: 0; height: 0; }
  to   { width: 100px; height: 100px; }
}
```

---

## 6. Z-index Scale

### ✅ DO: predictable fixed scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-popover: 500;
  --z-toast: 600;
  --z-tooltip: 700;
  --z-max: 9999;      /* only for critical overlays (fullscreen loader) */
}

/* Usage */
.dropdown { z-index: var(--z-dropdown); }
.modal-backdrop { z-index: var(--z-overlay); }
.modal { z-index: var(--z-modal); }
.toast { z-index: var(--z-toast); }
```

### ❌ DON'T: z-index wars

```css
/* ❌ z-index escalation — impossible to maintain */
.header   { z-index: 100; }
.dropdown { z-index: 999; }
.modal    { z-index: 9999; }
.toast    { z-index: 99999; }   /* will need 999999 someday */
```

---

## 7. Accessibility

### ✅ DO: focus-visible, not focus

```css
/* ✅ focus-visible — shows focus only during keyboard navigation */
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ❌ focus — shows outline on mouse click (annoys users) */
.button:focus {
  outline: 2px solid blue;
}

/* ❌ Removing outline completely — breaks keyboard navigation */
*:focus {
  outline: none;  /* ❌ NEVER */
}
```

### ✅ DO: prefers-reduced-motion

```css
/* ✅ Disable animations when user requests */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### ✅ DO: forced-colors for Windows High Contrast

```css
/* ✅ Support for Windows High Contrast Mode */
@media (forced-colors: active) {
  .button {
    border: 1px solid ButtonText;         /* System color */
  }
  .button:hover {
    background: Highlight;
    color: HighlightText;
  }
  .icon {
    forced-color-adjust: auto;            /* Allow system to color */
  }
}
```

### ✅ DO: sufficient contrast

```css
/* Minimum WCAG 2.1 AA requirements */
/* Normal text: contrast ≥ 4.5:1 */
/* Large text (≥ 18px bold or ≥ 24px): contrast ≥ 3:1 */
/* Interactive elements: contrast ≥ 3:1 */

/* ✅ Check via: https://webaim.org/resources/contrastchecker/ */
```

---

## 8. File Organization

```
src/
├── styles/
│   ├── tokens.css          # Design tokens (custom properties)
│   ├── reset.css           # CSS reset / normalize
│   ├── base.css            # Typography, base elements
│   ├── utilities.css       # Utility classes (.sr-only, .truncate)
│   └── z-index.css         # Z-index scale
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.module.css
│   └── ProductCard/
│       ├── ProductCard.jsx
│       └── ProductCard.module.css
└── index.css               # Imports: tokens → reset → base → utilities
```

### index.css (entry point)

```css
/* Order is important! */
@import './styles/tokens.css';
@import './styles/reset.css';
@import './styles/base.css';
@import './styles/utilities.css';
@import './styles/z-index.css';
```

### Utility classes

```css
/* utilities.css — reusable utilities */

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Truncate text */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 9. Anti-patterns

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| `!important` for layout | Increase specificity via selectors |
| `transition: all` | List specific properties |
| `outline: none` without replacement | `focus-visible` + visible outline |
| Hardcoded colors (`#333`, `red`) | CSS custom properties |
| `px` for font-size | `rem` (accessibility: respects user settings) |
| Global selectors (`div { }`) | Scoped: CSS Modules, BEM, or layer |
| Nesting > 3 levels (Sass) | Flat selectors, BEM |
| `@import` in runtime CSS | Bundler (Vite) or `@layer` |
| Animation of `width`/`height` | `transform: scale()` or `clip-path` |
| Magic numbers (`margin: 17px`) | Spacing tokens (`var(--space-4)`) |

---

## See also
- `$design-systems` — design systems integration (shadcn/ui, WDS)
- `$a11y-baseline` — full a11y checklist
- `$tailwind-beast-practices` — Tailwind-specific patterns
- `$design-parity-review` — comparing implementation with design
