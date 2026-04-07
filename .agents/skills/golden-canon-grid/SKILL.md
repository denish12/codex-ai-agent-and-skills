---
name: golden-canon-grid
description: Классические пропорциональные системы для UI-лейаутов — Golden Canon (Van de Graaf), Villard de Honnecourt, Golden Ratio (φ), Rule of Thirds, модульные сетки. CSS-реализация через Grid/custom properties. Активируй при проектировании лейаутов попапов, лендингов, страниц дашборда, модальных окон, или при вопросах «как расположить элементы гармонично».
---

# Skill: Golden Canon Grid

Система пропорциональных сеток для создания визуально гармоничных UI-лейаутов, основанная на классической типографике и математике красоты.

**Разделы:**
1. [Теория и история](#1-теория)
2. [Математические основы](#2-математика)
3. [Системы пропорций](#3-системы)
4. [CSS-реализация](#4-css)
5. [Применение к UI-компонентам](#5-применение)
6. [Decision Matrix — когда что применять](#6-decision-matrix)
7. [Anti-patterns](#7-anti-patterns)
8. [Checklist](#8-checklist)

---

## 1. Теория и история

### Golden Canon (Van de Graaf Canon)
Метод деления страницы на гармоничные зоны, открытый заново Яном Чихольдом (Jan Tschichold) в работах средневековых типографов. Конструкция создаёт текстовый блок, площадь которого = ½ площади страницы, с пропорциями полей:

```
inner : top : outer : bottom = 1 : 1.5 : 2 : 3
```

### Villard de Honnecourt (XIII век)
Геометрическая конструкция через диагонали — деление страницы на 9 равных частей (сетка 3×3) с дополнительными диагоналями, создающими точки оптического фокуса на пересечениях.

### Golden Ratio (φ = 1.618…)
Математическая пропорция, встречающаяся в природе. Прямоугольник с соотношением сторон 1 : 1.618 воспринимается как наиболее «приятный». Fibonacci последовательность (1, 1, 2, 3, 5, 8, 13, 21…) — дискретное приближение.

### Rule of Thirds
Упрощённая версия: деление на сетку 3×3. Ключевые элементы размещаются на пересечениях линий (4 «power points»). Наиболее применимо к композиции single-screen views.

### Модульные сетки (Josef Müller-Brockmann)
Систематический подход: страница делится на модули одинакового размера, разделённые gutters. Любой элемент занимает один или несколько модулей. Популярно в Swiss Style / International Typographic Style.

---

## 2. Математические основы

### Ключевые соотношения

| Система | Соотношение | CSS-значение | Использование |
|---------|-------------|-------------|---------------|
| **Golden Ratio** | 1 : 1.618 | `61.8% / 38.2%` | Колонки main/aside, hero section |
| **Golden Ratio (обратный)** | 0.618 : 1 | `38.2% / 61.8%` | Sidebar/content |
| **Rule of Thirds** | 1 : 1 : 1 | `33.3% × 3` | Три равных секции, grid cards |
| **Van de Graaf margins** | 1 : 1.5 : 2 : 3 | `calc()` от viewport | Page margins (вложенные) |
| **Fibonacci spacing** | 1, 1, 2, 3, 5, 8, 13 | `4, 4, 8, 12, 20, 32, 52px` | Spacing scale, padding |
| **√2 (ISO 216 / A4)** | 1 : 1.414 | `58.6% / 41.4%` | Портретные карточки, модалки |
| **Musical Scale (Augmented Fourth)** | 1 : 1.414 | — | Typography, альтернатива φ |

### Fibonacci Spacing Scale (base 4px)

```
--space-1:  4px;    /* fib(1) × 4 */
--space-2:  4px;    /* fib(2) × 4 */
--space-3:  8px;    /* fib(3) × 4 */
--space-5:  12px;   /* fib(4) × 4 — округлено */
--space-8:  20px;   /* fib(5) × 4 */
--space-13: 32px;   /* fib(6) × 4 — округлено */
--space-21: 52px;   /* fib(7) × 4 — округлено */
--space-34: 84px;   /* fib(8) × 4 — округлено */
```

> **Округление к 4px grid:** Все значения округляются до ближайшего числа, кратного 4, для pixel-perfect рендеринга.

---

## 3. Системы пропорций

### 3.1 Golden Canon для Web-страниц

```
┌──────────────────────────────────────────────┐
│                 top margin (1.5x)             │
│  ┌────────────────────────────────────────┐   │
│  │                                        │   │
│  │          TEXT / CONTENT BLOCK           │   │
│  │                                        │   │
│  │      Площадь = ½ площади страницы      │   │
│  │                                        │   │
│  │      Пропорции = пропорции страницы    │   │
│  │                                        │   │
│  └────────────────────────────────────────┘   │
│                 bottom margin (3x)            │
└──────────────────────────────────────────────┘
 inner(1x)                           outer(2x)
```

**Правило:** Текстовый/контентный блок занимает ровно 50% площади viewport/container, и его пропорции совпадают с пропорциями контейнера.

### 3.2 Villard Diagram для UI

```
┌───────────┬───────────┬───────────┐
│           │           │           │
│     ╲     │     │     │     ╱     │
│       ╲   │     │     │   ╱       │
├─────────╲─┼─────┼─────┼─╱─────────┤
│           ╲     │     ╱           │
│           │ ╲   │   ╱ │           │
│           │   ╲ │ ╱   │           │
├───────────┼─────╳─────┼───────────┤
│           │   ╱ │ ╲   │           │
│           │ ╱   │   ╲ │           │
│           ╱     │     ╲           │
├─────────╱─┼─────┼─────┼─╲─────────┤
│       ╱   │     │     │   ╲       │
│     ╱     │     │     │     ╲     │
│           │           │           │
└───────────┴───────────┴───────────┘

4 Power Points = пересечения диагоналей (●)
→ Размещай CTA, заголовки, ключевые визуалы
```

### 3.3 Golden Spiral для визуальной иерархии

```
┌─────────────────────┬─────────────┐
│                     │             │
│                     │      B      │
│                     │             │
│         A           ├──────┬──────┤
│                     │      │  D   │
│    (Primary CTA)    │  C   ├───┬──┤
│                     │      │ E │F │
└─────────────────────┴──────┴───┴──┘

A:B:C:D:E:F = φ⁰:φ¹:φ²:φ³:φ⁴:φ⁵
Приоритет контента: A > B > C > D > E > F
```

---

## 4. CSS-реализация

### 4.1 Design Tokens (custom properties)

```css
:root {
  /* === Golden Canon Tokens === */

  /* Golden Ratio */
  --phi: 1.618;
  --phi-inverse: 0.618;
  --phi-major: 61.8%;      /* φ / (1 + φ) × 100 */
  --phi-minor: 38.2%;      /* 1 / (1 + φ) × 100 */

  /* Rule of Thirds */
  --third: 33.333%;

  /* Van de Graaf margin ratios (base = inner margin) */
  --canon-base: 2.5vw;
  --canon-inner: var(--canon-base);                    /* 1x */
  --canon-top: calc(var(--canon-base) * 1.5);          /* 1.5x */
  --canon-outer: calc(var(--canon-base) * 2);          /* 2x */
  --canon-bottom: calc(var(--canon-base) * 3);         /* 3x */

  /* Fibonacci spacing scale (base 4px, rounded to 4px grid) */
  --fib-1: 4px;
  --fib-2: 4px;
  --fib-3: 8px;
  --fib-5: 12px;
  --fib-8: 20px;
  --fib-13: 32px;
  --fib-21: 52px;
  --fib-34: 84px;

  /* √2 for portrait proportions */
  --sqrt2: 1.414;
  --sqrt2-major: 58.6%;
  --sqrt2-minor: 41.4%;
}
```

### 4.2 Golden Layout — Main + Sidebar

```css
/* Golden-ratio two-column layout */
.layout-golden {
  display: grid;
  grid-template-columns: var(--phi-major) var(--phi-minor);
  gap: var(--fib-8);
}

/* Reversed: sidebar left, content right */
.layout-golden--reversed {
  grid-template-columns: var(--phi-minor) var(--phi-major);
}
```

### 4.3 Van de Graaf Page Margins

```css
/* Full-page canon margins */
.page-canon {
  padding:
    var(--canon-top)      /* top: 1.5x */
    var(--canon-outer)    /* right: 2x */
    var(--canon-bottom)   /* bottom: 3x */
    var(--canon-inner);   /* left: 1x */
}
```

### 4.4 Rule of Thirds Grid

```css
.grid-thirds {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: var(--fib-5);
}

/* Power point placement (top-left intersection) */
.grid-thirds__focal {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
```

### 4.5 Golden Modal / Popup

```css
/* Modal with golden proportions */
.modal-golden {
  width: min(520px, 90vw);
  aspect-ratio: 1.618 / 1;    /* landscape golden rectangle */

  /* Canon margins inside */
  padding:
    var(--fib-13)   /* top */
    var(--fib-21)   /* right */
    var(--fib-21)   /* bottom */
    var(--fib-13);  /* left */
}

/* Content split inside modal: 61.8% visual / 38.2% CTA zone */
.modal-golden__body {
  display: grid;
  grid-template-rows: var(--phi-major) var(--phi-minor);
}
```

### 4.6 Golden Typography Scale

```css
:root {
  /* Type scale based on φ — each step = previous × 1.618 */
  --font-xs:    0.625rem;   /* ~10px */
  --font-sm:    0.75rem;    /* ~12px */
  --font-base:  1rem;       /* ~16px (anchor) */
  --font-lg:    1.25rem;    /* ~20px */
  --font-xl:    1.618rem;   /* base × φ */
  --font-2xl:   2.618rem;   /* xl × φ */
  --font-3xl:   4.236rem;   /* 2xl × φ */

  /* Responsive variant with clamp */
  --font-hero:  clamp(2rem, 1.5rem + 2.5vw, var(--font-3xl));
}
```

### 4.7 Responsive Breakpoints (φ-based)

```css
/* Golden breakpoints: each = previous × φ */
/* 320 → 518 → 838 → 1355 → 2192 */
@media (min-width: 320px)  { /* Mobile */ }
@media (min-width: 518px)  { /* Large mobile / small tablet */ }
@media (min-width: 838px)  { /* Tablet */ }
@media (min-width: 1355px) { /* Desktop */ }
```

---

## 5. Применение к UI-компонентам

### 5.1 Admin Panel / Dashboard (Controls + Content)

| Элемент | Пропорция | CSS |
|---------|-----------|-----|
| Controls/sidebar | 38.2% (φ-minor) | `grid-template-columns: var(--phi-minor) var(--phi-major)` |
| Main content area | 61.8% (φ-major) | — (автоматически) |
| Internal padding | Van de Graaf 1:1.5:2:3 | `padding: var(--canon-top) var(--canon-outer) var(--canon-bottom) var(--canon-inner)` |

### 5.2 Modal / Popup / Dialog

| Элемент | Пропорция | Паттерн |
|---------|-----------|---------|
| Container | `aspect-ratio: 1.618` | Golden rectangle |
| Content / action zone | 61.8% / 38.2% | Вертикальный golden split |
| Hero image zone | Rule of Thirds | Изображение в top 2/3 |
| CTA button placement | Power point | Нижняя правая 1/3 × 1/3 |
| Internal spacing | Fibonacci scale | `gap: var(--fib-8)` / `padding: var(--fib-13)` |

### 5.3 Card Grid

```css
/* Card grid with golden gaps */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--fib-13);
  padding: var(--fib-21);
}

/* Portrait card with A4 proportions */
.card {
  aspect-ratio: 1 / var(--sqrt2);  /* ≈ 1:1.414 */
}

/* Landscape card with golden proportions */
.card--landscape {
  aspect-ratio: var(--phi) / 1;    /* ≈ 1.618:1 */
}
```

### 5.4 Hero Section / Landing

```
┌──────────────────────────────────────────┐
│  ┌────────── 61.8% ──────────┬─ 38.2% ─┐│
│  │                           │          ││
│  │  Heading + Body text      │  Hero    ││
│  │  (primary content)        │  Image   ││
│  │                           │          ││
│  │  [CTA Button]             │          ││
│  │  ↑ at power point (2/3)   │          ││
│  └───────────────────────────┴──────────┘│
└──────────────────────────────────────────┘
```

### 5.5 Form Layout

```css
/* Form with golden label/input ratio */
.form-field--golden {
  display: grid;
  grid-template-columns: var(--phi-minor) var(--phi-major);
  /* Label: 38.2%, Input: 61.8% */
  align-items: baseline;
  gap: var(--fib-5);
}
```

### 5.6 Navigation / Sidebar

```css
/* Collapsible sidebar with golden width */
.sidebar {
  width: calc(100vw * 0.382);  /* φ-minor от viewport */
  min-width: 240px;
  max-width: 400px;
}

/* Collapsed: inverse fibonacci */
.sidebar--collapsed {
  width: var(--fib-21);  /* 52px — иконки */
}
```

---

## 6. Decision Matrix — когда что применять

| Контекст | Система | Почему |
|----------|---------|--------|
| **Две колонки (main + side)** | Golden Ratio 61.8/38.2 | Естественная иерархия main > side |
| **Popup / Modal / Dialog** | Golden Rectangle + vertical split | Воспринимается как «правильный» прямоугольник |
| **Card grid** | Rule of Thirds (3 col) | Равномерное распределение, сканируемость |
| **Typography scale** | φ-множитель | Гармоничный переход между уровнями |
| **Spacing** | Fibonacci (4px base) | Нелинейная, но предсказуемая прогрессия |
| **Page margins** | Van de Graaf | Оптический центр выше геометрического |
| **Hero / landing** | Golden Spiral + power points | Направляет взгляд к CTA |
| **Portrait card** | √2 (A4 ratio) | Привычные, «бумажные» пропорции |
| **Admin / dashboard** | φ-minor sidebar (30-38%) | Контролы компактно, контент максимально |
| **Full-width content** | Skip. Use 8px grid | Не применять φ к каждому элементу |
| **Dense data tables** | Modular grid (Müller-Brockmann) | Ячейки одинаковой ширины, чёткий ритм |
| **Marketing / promo** | Golden Spiral + Rule of Thirds | Максимальный визуальный impact |

---

## 7. Anti-patterns

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| **φ-фанатизм** — применять golden ratio к КАЖДОМУ элементу | Использовать φ только для **крупных структурных** решений (колонки, секции, margins). Мелкие элементы — обычный 4/8px grid |
| **Pixel-perfect φ** — 61.803398875% | Округлять до `61.8%` / `38.2%`. Браузер всё равно округляет субпиксели |
| **Игнорирование контента** — пропорции важнее текста | Пропорции **подчиняются** контенту. Если текст не помещается в φ-зону — расширяй |
| **Фиксированный aspect-ratio на responsive** — без fallback | Использовать `aspect-ratio` только на контролируемых контейнерах (modal, card). На full-width — `min-height` |
| **Одна система на всё** — только golden ratio | Комбинировать: φ для структуры, Rule of Thirds для фокусных точек, Fibonacci для spacing |
| **Перегруженная сетка** — 12 линий + диагонали + golden spiral | На экране одновременно — максимум одна система. Layering систем = визуальный хаос |
| **Забыть про оптический центр** — геометрический центр = оптический | Оптический центр **выше** геометрического на ~5%. Van de Graaf учитывает это через `bottom margin > top margin` |
| **Навязать φ мобильному** — golden layout на 320px | На mobile (<518px) — single column. φ-split только от tablet (838px+) |

---

## 8. Checklist

Перед финализацией лейаута:

| # | Проверка | Применимо? | Статус |
|---|----------|:----------:|:------:|
| GC-01 | Основной layout (2-col) использует φ-split или thirds | При наличии sidebar/aside | ☐ |
| GC-02 | Spacing scale основан на Fibonacci или consistent 4/8px | Всегда | ☐ |
| GC-03 | CTA / primary action размещён в power point (Rule of Thirds) | Landing, hero, popup | ☐ |
| GC-04 | Typography scale гармонична (φ-множитель или musical scale) | Всегда | ☐ |
| GC-05 | Modal/popup aspect-ratio близок к golden rectangle | Popup, modal, dialog | ☐ |
| GC-06 | Page margins соблюдают Van de Graaf (bottom > top > outer > inner) | Full-page layouts | ☐ |
| GC-07 | Оптический центр учтён (верхний padding < нижнего) | Cards, modals, popup | ☐ |
| GC-08 | Не применён φ-фанатизм (мелкие элементы = обычный grid) | Self-check | ☐ |
| GC-09 | Responsive: пропорции адаптируются или отключаются на mobile | Mobile breakpoint | ☐ |
| GC-10 | Контент не обрезан ради пропорций | Self-check | ☐ |

---

## Deliverables

| Артефакт | Формат | Использование |
|---------|--------|---------------|
| Golden Canon tokens | CSS custom properties | Вставить в design system / global CSS |
| Layout decision | Запись в UX Spec (UI Direction → Layout grid) | Обоснование выбора системы пропорций |
| Spacing scale | Fibonacci tokens | Заменить/дополнить текущий spacing scale |

---

## См. также
- `$ux-spec` — UX Spec (UI Direction → Layout grid)
- `$ui-inventory` — UI Inventory (component sizing)
- `$styling-css-stack` — CSS practices (custom properties, spacing)
- `$a11y-baseline` — Accessibility (touch targets, reflow)
- `$design-systems` — Design system integration (tokens)
