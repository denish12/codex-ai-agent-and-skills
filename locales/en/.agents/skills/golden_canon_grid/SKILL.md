---
name: golden_canon_grid
description: Classic proportional systems for UI layouts — Golden Canon (Van de Graaf), Villard de Honnecourt, Golden Ratio (φ), Rule of Thirds, modular grids. CSS implementation via Grid/custom properties. Activate when designing layouts for popups, landings, dashboard pages, modal windows, or when answering "how to place elements harmoniously".
---

# Skill: Golden Canon Grid

A system of proportional grids for creating visually harmonious UI layouts, based on classical typography and the mathematics of beauty.

**Sections:**
1. [Theory and History](#1-theory-and-history)
2. [Mathematical Foundations](#2-mathematical-foundations)
3. [Systems of Proportions](#3-systems-of-proportions)
4. [CSS Implementation](#4-css-implementation)
5. [Application to UI Components](#5-application-to-ui-components)
6. [Decision Matrix — When to Apply What](#6-decision-matrix-when-to-apply-what)
7. [Anti-patterns](#7-anti-patterns)
8. [Checklist](#8-checklist)

---

## 1. Theory and History

### Golden Canon (Van de Graaf Canon)
A method of dividing a page into harmonious zones, rediscovered by Jan Tschichold in the works of medieval typographers. The construction creates a text block whose area = ½ the area of the page, with the following margin proportions:

```
inner : top : outer : bottom = 1 : 1.5 : 2 : 3
```

### Villard de Honnecourt (13th Century)
A geometric construction using diagonals — dividing a page into 9 equal parts (3×3 grid) with additional diagonals creating optical focus points at the intersections.

### Golden Ratio (φ = 1.618…)
A mathematical proportion found in nature. A rectangle with an aspect ratio of 1 : 1.618 is perceived as the most "pleasing". The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21…) is a discrete approximation.

### Rule of Thirds
A simplified version: division into a 3×3 grid. Key elements are placed at the intersections of the lines (4 "power points"). Most applicable to the composition of single-screen views.

### Modular Grids (Josef Müller-Brockmann)
A systematic approach: the page is divided into identical-sized modules, separated by gutters. Any element occupies one or more modules. Popular in Swiss Style / International Typographic Style.

---

## 2. Mathematical Foundations

### Key Ratios

| System | Ratio | CSS Value | Usage |
|---------|-------------|-------------|---------------|
| **Golden Ratio** | 1 : 1.618 | `61.8% / 38.2%` | Columns main/aside, hero section |
| **Golden Ratio (inverse)** | 0.618 : 1 | `38.2% / 61.8%` | Sidebar/content |
| **Rule of Thirds** | 1 : 1 : 1 | `33.3% × 3` | Three equal sections, grid cards |
| **Van de Graaf margins** | 1 : 1.5 : 2 : 3 | `calc()` of viewport | Page margins (nested) |
| **Fibonacci spacing** | 1, 1, 2, 3, 5, 8, 13 | `4, 4, 8, 12, 20, 32, 52px` | Spacing scale, padding |
| **√2 (ISO 216 / A4)** | 1 : 1.414 | `58.6% / 41.4%` | Portrait cards, modals |
| **Musical Scale (Augmented Fourth)** | 1 : 1.414 | — | Typography, alternative to φ |

### Fibonacci Spacing Scale (base 4px)

```
--space-1:  4px;    /* fib(1) × 4 */
--space-2:  4px;    /* fib(2) × 4 */
--space-3:  8px;    /* fib(3) × 4 */
--space-5:  12px;   /* fib(4) × 4 — rounded */
--space-8:  20px;   /* fib(5) × 4 */
--space-13: 32px;   /* fib(6) × 4 — rounded */
--space-21: 52px;   /* fib(7) × 4 — rounded */
--space-34: 84px;   /* fib(8) × 4 — rounded */
```

> **Rounding to 4px grid:** All values are rounded to the nearest multiple of 4 for pixel-perfect rendering.

---

## 3. Systems of Proportions

### 3.1 Golden Canon for Web Pages

```
┌──────────────────────────────────────────────┐
│                 top margin (1.5x)             │
│  ┌────────────────────────────────────────┐   │
│  │                                        │   │
│  │          TEXT / CONTENT BLOCK           │   │
│  │                                        │   │
│  │      Area = ½ screen area              │   │
│  │                                        │   │
│  │      Proportions = page proportions    │   │
│  │                                        │   │
│  └────────────────────────────────────────┘   │
│                 bottom margin (3x)            │
└──────────────────────────────────────────────┘
 inner(1x)                           outer(2x)
```

**Rule:** The text/content block occupies exactly 50% of the viewport/container area, and its proportions match those of the container.

### 3.2 Villard Diagram for UI

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

4 Power Points = intersections of diagonals (●)
→ Place CTA, headings, key visuals here
```

### 3.3 Golden Spiral for Visual Hierarchy

```
┌─────────────────────┬─────────────┐
│                     │             │
│                     │      B      │
│                     │             │
│         A           ├──────┬──────┤
│                     │      │  D   │
│    (Primary CTA)    │  C   ├───┬──┤
│                     │      │ E │F │
│                     │      │   │  │
└─────────────────────┴──────┴───┴──┘

A:B:C:D:E:F = φ⁰:φ¹:φ²:φ³:φ⁴:φ⁵
Content priority: A > B > C > D > E > F
```

---

## 4. CSS Implementation

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

## 5. Application to UI Components

### 5.1 Admin Panel / Dashboard (Controls + Content)

| Element | Proportion | CSS |
|---------|-----------|-----|
| Controls/sidebar | 38.2% (φ-minor) | `grid-template-columns: var(--phi-minor) var(--phi-major)` |
| Main content area | 61.8% (φ-major) | — (automatic) |
| Internal padding | Van de Graaf 1:1.5:2:3 | `padding: var(--canon-top) var(--canon-outer) var(--canon-bottom) var(--canon-inner)` |

### 5.2 Modal / Popup / Dialog

| Element | Proportion | Pattern |
|---------|-----------|---------|
| Container | `aspect-ratio: 1.618` | Golden rectangle |
| Content / action zone | 61.8% / 38.2% | Vertical golden split |
| Hero image zone | Rule of Thirds | Image in top 2/3 |
| CTA button placement | Power point | Bottom right 1/3 × 1/3 |
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
  width: calc(100vw * 0.382);  /* φ-minor of viewport */
  min-width: 240px;
  max-width: 400px;
}

/* Collapsed: inverse fibonacci */
.sidebar--collapsed {
  width: var(--fib-21);  /* 52px — icons */
}
```

---

## 6. Decision Matrix — When to Apply What

| Context | System | Why |
|----------|---------|--------|
| **Two columns (main + side)** | Golden Ratio 61.8/38.2 | Natural hierarchy main > side |
| **Popup / Modal / Dialog** | Golden Rectangle + vertical split | Perceived as a "correct" rectangle |
| **Card grid** | Rule of Thirds (3 col) | Even distribution, scannability |
| **Typography scale** | φ-multiplier | Harmonious transition between levels |
| **Spacing** | Fibonacci (4px base) | Non-linear, but predictable progression |
| **Page margins** | Van de Graaf | Optical center is higher than geometric |
| **Hero / landing** | Golden Spiral + power points | Guides the eye to the CTA |
| **Portrait card** | √2 (A4 ratio) | Familiar, "paper" proportions |
| **Admin / dashboard** | φ-minor sidebar (30-38%) | Controls compactly, content maximally |
| **Full-width content** | Skip. Use 8px grid | Do not apply φ to every element |
| **Dense data tables** | Modular grid (Müller-Brockmann) | Cells of equal width, clear rhythm |
| **Marketing / promo** | Golden Spiral + Rule of Thirds | Maximum visual impact |

---

## 7. Anti-patterns

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| **φ-fanaticism** — applying golden ratio to EVERY element | Use φ only for **large structural** decisions (columns, sections, margins). Small elements — normal 4/8px grid |
| **Pixel-perfect φ** — 61.803398875% | Round to `61.8%` / `38.2%`. The browser rounds subpixels anyway |
| **Ignoring content** — proportions are more important than text | Proportions are **subordinate** to the content. If the text does not fit into the φ-zone — expand |
| **Fixed aspect-ratio on responsive** — without fallback | Use `aspect-ratio` only on controlled containers (modal, card). On full-width — `min-height` |
| **One system for everything** — only golden ratio | Combine: φ for structure, Rule of Thirds for focal points, Fibonacci for spacing |
| **Overloaded grid** — 12 lines + diagonals + golden spiral | On the screen simultaneously — maximum one system. Layering systems = visual chaos |
| **Forgetting the optical center** — geometric center = optical | The optical center is **higher** than the geometric one by ~5%. Van de Graaf accounts for this via `bottom margin > top margin` |
| **Forcing φ onto mobile** — golden layout on 320px | On mobile (<518px) — single column. φ-split only from tablet (838px+) |

---

## 8. Checklist

Before finalizing the layout:

| # | Check | Applicable? | Status |
|---|----------|:----------:|:------:|
| GC-01 | Main layout (2-col) uses φ-split or thirds | If there is a sidebar/aside | ☐ |
| GC-02 | Spacing scale is based on Fibonacci or consistent 4/8px | Always | ☐ |
| GC-03 | CTA / primary action placed in a power point (Rule of Thirds) | Landing, hero, popup | ☐ |
| GC-04 | Typography scale is harmonious (φ-multiplier or musical scale) | Always | ☐ |
| GC-05 | Modal/popup aspect-ratio is close to a golden rectangle | Popup, modal, dialog | ☐ |
| GC-06 | Page margins follow Van de Graaf (bottom > top > outer > inner) | Full-page layouts | ☐ |
| GC-07 | Optical center is accounted for (top padding < bottom) | Cards, modals, popup | ☐ |
| GC-08 | No φ-fanaticism applied (small elements = normal grid) | Self-check | ☐ |
| GC-09 | Responsive: proportions adapt or are disabled on mobile | Mobile breakpoint | ☐ |
| GC-10 | Content is not truncated for the sake of proportions | Self-check | ☐ |

---

## Deliverables

| Artifact | Format | Usage |
|---------|--------|---------------|
| Golden Canon tokens | CSS custom properties | Insert into design system / global CSS |
| Layout decision | Entry in UX Spec (UI Direction → Layout grid) | Justification for the choice of proportion system |
| Spacing scale | Fibonacci tokens | Replace/supplement the current spacing scale |

---

## See also
- `$ux_spec` — UX Spec (UI Direction → Layout grid)
- `$ui_inventory` — UI Inventory (component sizing)
- `$styling_css_stack` — CSS practices (custom properties, spacing)
- `$a11y_baseline` — Accessibility (touch targets, reflow)
- `$design_systems` — Design system integration (tokens)
