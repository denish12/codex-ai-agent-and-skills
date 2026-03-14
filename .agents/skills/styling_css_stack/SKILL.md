---
name: styling_css_stack
description: CSS практики — custom properties (design tokens), naming (BEM / CSS Modules), responsive, transitions, z-index scale, dark mode, a11y (focus-visible, prefers-reduced-motion, forced-colors). DO/DON'T примеры. Активируй при написании или ревью CSS/Less/Sass, при рефакторинге стилей, или при вопросах «как правильно стилизовать X».
---

# Skill: Styling (CSS Stack) Beast Practices

Конкретные DO/DON'T паттерны для CSS — от design tokens до a11y.

**Разделы:**
1. [Design Tokens (CSS Custom Properties)](#1-design-tokens)
2. [Naming: BEM vs CSS Modules](#2-naming)
3. [Responsive и Media Queries](#3-responsive)
4. [Dark Mode](#4-dark-mode)
5. [Transitions и Animations](#5-transitions-и-animations)
6. [Z-index Scale](#6-z-index-scale)
7. [Accessibility (a11y)](#7-accessibility)
8. [Организация файлов](#8-организация-файлов)
9. [Anti-patterns](#9-anti-patterns)

---

## 1. Design Tokens

### ✅ DO: CSS custom properties как единый источник правды

```css
/* tokens.css — глобальные design tokens */
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

### ❌ DON'T: хардкод значений в компонентах

```css
/* ❌ Магические значения — невозможно поддерживать, нет dark mode */
.card {
  padding: 17px;
  color: #333;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* ✅ Токены — единообразно, поддерживает тему */
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

### ✅ DO: BEM для vanilla CSS

```css
/* Block */
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

### ✅ DO: CSS Modules для React (scoped by default)

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

### Когда что

| Подход | Когда ✅ | Когда ❌ |
|--------|---------|---------|
| **BEM** | Vanilla CSS/HTML, виджеты, legacy | Большие SPA (нет scoping) |
| **CSS Modules** | React/Vue SPA, компонентная архитектура | Статичные сайты |
| **Tailwind** | Rapid prototyping, utility-first команды | Wix виджеты, сложные анимации |

---

## 3. Responsive

### ✅ DO: mobile-first с min-width breakpoints

```css
/* ✅ Mobile-first: базовые стили для mobile, расширяем вверх */
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
/* Breakpoints (не custom properties — media queries не поддерживают var()) */
/* sm:  640px  — phone landscape / small tablet */
/* md:  768px  — tablet portrait */
/* lg:  1024px — tablet landscape / small desktop */
/* xl:  1280px — desktop */
/* 2xl: 1536px — wide desktop */
```

### ✅ DO: container queries для компонентов

```css
/* ✅ Компонент адаптируется к размеру КОНТЕЙНЕРА, а не экрана */
.card-container {
  container-type: inline-size;
}

.card {
  display: flex;
  flex-direction: column;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row; /* Горизонтальный layout при достаточном месте */
  }
}
```

### ❌ DON'T: fixed width для layout

```css
/* ❌ Ломается на нестандартных экранах */
.container {
  width: 1200px;
}

/* ✅ Адаптивная ширина */
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-4);
}
```

---

## 4. Dark Mode

### ✅ DO: dark mode через переопределение tokens

```css
/* ✅ Автоматический dark mode через media query */
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

/* ✅ Или через class toggle (JS-controlled) */
[data-theme="dark"] {
  --color-surface: hsl(220, 20%, 10%);
  --color-text: hsl(220, 15%, 90%);
  /* ... */
}
```

### ❌ DON'T: инвертировать цвета или жёстко кодить

```css
/* ❌ filter — ломает изображения, иконки, видео */
.dark-mode {
  filter: invert(1);
}

/* ❌ Дублирование стилей вместо переопределения tokens */
.dark-mode .card {
  background: #1a1a2e;
  color: #eee;
  border-color: #333;
}
```

---

## 5. Transitions и Animations

### ✅ DO: transition на конкретные свойства

```css
/* ✅ Явные свойства — производительно, предсказуемо */
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

/* ❌ transition: all — анимирует всё подряд, включая width/height (layout thrashing) */
.button {
  transition: all 0.3s ease;  /* ❌ */
}
```

### ✅ DO: анимировать только transform и opacity (GPU-accelerated)

```css
/* ✅ GPU: transform + opacity — не вызывают layout/paint */
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

/* ❌ Анимирование width/height/top/left — вызывает layout recalculation */
@keyframes bad {
  from { width: 0; height: 0; }
  to   { width: 100px; height: 100px; }
}
```

---

## 6. Z-index Scale

### ✅ DO: предсказуемая фиксированная шкала

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
  --z-max: 9999;      /* только для critical overlays (fullscreen loader) */
}

/* Использование */
.dropdown { z-index: var(--z-dropdown); }
.modal-backdrop { z-index: var(--z-overlay); }
.modal { z-index: var(--z-modal); }
.toast { z-index: var(--z-toast); }
```

### ❌ DON'T: z-index wars

```css
/* ❌ Эскалация z-index — невозможно поддерживать */
.header   { z-index: 100; }
.dropdown { z-index: 999; }
.modal    { z-index: 9999; }
.toast    { z-index: 99999; }   /* когда-нибудь понадобится 999999 */
```

---

## 7. Accessibility

### ✅ DO: focus-visible, не focus

```css
/* ✅ focus-visible — показывает фокус только при навигации клавиатурой */
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ❌ focus — показывает outline при клике мышью (раздражает пользователей) */
.button:focus {
  outline: 2px solid blue;
}

/* ❌ Убирать outline полностью — ломает keyboard navigation */
*:focus {
  outline: none;  /* ❌ НИКОГДА */
}
```

### ✅ DO: prefers-reduced-motion

```css
/* ✅ Отключить анимации когда пользователь просит */
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

### ✅ DO: forced-colors для Windows High Contrast

```css
/* ✅ Поддержка Windows High Contrast Mode */
@media (forced-colors: active) {
  .button {
    border: 1px solid ButtonText;         /* Системный цвет */
  }
  .button:hover {
    background: Highlight;
    color: HighlightText;
  }
  .icon {
    forced-color-adjust: auto;            /* Позволить системе раскрасить */
  }
}
```

### ✅ DO: достаточный контраст

```css
/* Минимальные требования WCAG 2.1 AA */
/* Обычный текст: контраст ≥ 4.5:1 */
/* Крупный текст (≥ 18px bold или ≥ 24px): контраст ≥ 3:1 */
/* Интерактивные элементы: контраст ≥ 3:1 */

/* ✅ Проверять через: https://webaim.org/resources/contrastchecker/ */
```

---

## 8. Организация файлов

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
/* Порядок важен! */
@import './styles/tokens.css';
@import './styles/reset.css';
@import './styles/base.css';
@import './styles/utilities.css';
@import './styles/z-index.css';
```

### Utility classes

```css
/* utilities.css — переиспользуемые утилиты */

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

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| `!important` для layout | Увеличить специфичность через selectors |
| `transition: all` | Перечислить конкретные свойства |
| `outline: none` без замены | `focus-visible` + visible outline |
| Хардкод цветов (`#333`, `red`) | CSS custom properties |
| `px` для font-size | `rem` (доступность: уважает user settings) |
| Глобальные селекторы (`div { }`) | Scoped: CSS Modules, BEM, или layer |
| Вложенность > 3 уровней (Sass) | Flat selectors, BEM |
| `@import` в runtime CSS | Бандлер (Vite) или `@layer` |
| Анимация `width`/`height` | `transform: scale()` или `clip-path` |
| Magic numbers (`margin: 17px`) | Spacing tokens (`var(--space-4)`) |

---

## См. также
- `$design_systems` — интеграция дизайн-систем (shadcn/ui, WDS)
- `$a11y_baseline` — полный a11y чеклист
- `$tailwind_beast_practices` — Tailwind-специфичные паттерны
- `$design_parity_review` — сравнение реализации с дизайном
