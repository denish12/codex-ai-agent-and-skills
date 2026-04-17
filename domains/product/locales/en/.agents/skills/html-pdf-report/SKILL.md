---
name: html-pdf-report
description: Generating a PRD or Product Review Deck from HTML/CSS to PDF — self-contained, print-ready
---
# HTML/PDF Report — Generating a PRD or Product Review Deck as PDF

## When to Use
- When implementing the **final PRD** or **Product Review Deck** from the Design Spec provided by the Designer.
- When creating a **self-contained HTML file** with Chart.js, Mermaid, and print-optimized CSS.
- When generating a **PDF-ready document** via Print-to-PDF in the browser or puppeteer.
- When laying out **PRD documents** with user stories, tables (AC / RICE / metrics), roadmap visualizations, and diagrams.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Report Design Spec | ✅ | Section structure, visualizations, emphasis levels |
| Executive Summary Draft | ✅ | Draft from the Designer |
| Color Palette | ✅ | Primary, secondary, accent colors, etc. |
| Visualization Map | ✅ | List of visualizations with types and data |
| Raw report text | ✅ | Mediator conclusion, Alpha/Beta Reports, Brief |
| Numeric data for charts | ✅ | Extracted from reports or provided separately |

> If required fields are not provided — **request from user** before starting work. Do not generate placeholders.

## Data Sources
1. Report Design Spec from the Designer — structure, visualizations, palette.
2. session-1 through session-4 handoff files — raw text for sections and appendices.

### Related Skills
| Skill | Interaction | When |
|-------|-------------|------|
| `$gates` (DS-01) | Layout and visualization specifications — primary input for layout | Before starting work |
| `$handoff` | Session handoff files — raw text for report sections | Content loading |
| `$board` | Update LY-01 status on completion | After HTML generation |
| `$gates` (LY-01) | HTML validation before Release Gate | After completion |
| Framework skills | Tables, matrices, scoring models — visualize per Visualization Map | For Chart.js / tables |

## Protocol

### Step 0 — Input Validation
1. Verify presence of Report Design Spec (P0 BLOCKER if absent).
2. Verify presence of all raw text artifacts.
3. Extract numeric data for Chart.js from reports.
4. Match Visualization Map against available data.
5. If data is incomplete — request from user.

### Step 1 — HTML Skeleton
1. `<!DOCTYPE html>` with `lang="en"`, `charset="UTF-8"`.
2. CDN: Chart.js 4.x, Mermaid 10.x.
3. `<style>` for all CSS, `<script>` for Chart.js and Mermaid init.
4. Body structure:

```html
<div class="report">
    <section class="title-page" id="title">...</section>
    <nav class="toc" id="toc">...</nav>
    <section class="executive-summary" id="executive-summary">...</section>
    <section class="main-section" id="section-1">...</section>
    <section class="main-section" id="section-2">...</section>
    <section class="appendix" id="appendix-a">...</section>
</div>
```

5. Each section — semantic HTML: `<section>`, `<article>`, `<figure>`, `<figcaption>`.
6. Charts — `<figure>` with `<figcaption>` for accessibility and caption.

### Step 2 — CSS (Base + Print)

Full working CSS block:

```css
/* ========== RESET & BASE ========== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a2e;
    background: #fff;
}
.report { max-width: 210mm; margin: 0 auto; padding: 20mm; }

/* ========== TYPOGRAPHY ========== */
h1 { font-size: 24pt; font-weight: 700; margin-bottom: 0.5em; color: var(--primary); }
h2 { font-size: 18pt; font-weight: 600; margin: 1.5em 0 0.5em; padding-bottom: 0.3em;
     border-bottom: 2px solid var(--primary); color: var(--primary); }
h3 { font-size: 14pt; font-weight: 600; margin: 1.2em 0 0.4em; color: var(--secondary); }
h4 { font-size: 12pt; font-weight: 600; margin: 1em 0 0.3em; }
p { margin-bottom: 0.8em; }
blockquote { border-left: 4px solid var(--accent); padding: 0.8em 1.2em;
             margin: 1em 0; background: var(--bg-light); font-style: italic; }

/* ========== CSS VARIABLES (from palette) ========== */
:root {
    --primary: #1a1a2e;    /* Replace from Design Spec */
    --secondary: #16213e;
    --accent: #0f3460;
    --highlight: #e94560;
    --bg-light: #f5f5f5;
    --border: #e0e0e0;
    --success: #2ecc71;
    --warning: #f39c12;
    --danger: #e74c3c;
}

/* ========== TITLE PAGE ========== */
.title-page {
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    min-height: 100vh; text-align: center;
}
.title-page h1 { font-size: 32pt; margin-bottom: 0.3em; }
.title-page .subtitle { font-size: 16pt; color: var(--secondary); margin-bottom: 2em; }
.title-page .meta { font-size: 10pt; color: #666; }

/* ========== TOC ========== */
.toc-list { list-style: none; counter-reset: toc; }
.toc-list li { padding: 0.4em 0; border-bottom: 1px dotted var(--border); }
.toc-list li::before { counter-increment: toc; content: counter(toc) ". "; font-weight: 600; }
.toc-list a { text-decoration: none; color: var(--primary); }
.toc-list a:hover { color: var(--accent); }

/* ========== DATA TABLE ========== */
.data-table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 10pt; }
.data-table th { background: var(--primary); color: #fff; padding: 8px 12px;
                 text-align: left; font-weight: 600; }
.data-table td { padding: 8px 12px; border-bottom: 1px solid var(--border); }
.data-table tr:nth-child(even) { background: var(--bg-light); }
.data-table .highlight { background: rgba(233, 69, 96, 0.1); font-weight: 600; }

/* ========== MATRIX 2x2 ========== */
.matrix-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
              margin: 1em 0; border: 2px solid var(--border); }
.matrix-2x2 .cell { padding: 1.2em; }
.matrix-2x2 .cell-header { background: var(--primary); color: #fff; font-weight: 600;
                            text-align: center; padding: 0.6em; }
.matrix-2x2 .cell-tl { background: #e8f5e9; } /* Top-left: green */
.matrix-2x2 .cell-tr { background: #fff3e0; } /* Top-right: orange */
.matrix-2x2 .cell-bl { background: #e3f2fd; } /* Bottom-left: blue */
.matrix-2x2 .cell-br { background: #fce4ec; } /* Bottom-right: red */

/* ========== CALLOUT BOX ========== */
.callout { padding: 1em 1.2em; margin: 1em 0; border-radius: 6px; border-left: 4px solid; }
.callout-info { background: #e3f2fd; border-color: #2196f3; }
.callout-success { background: #e8f5e9; border-color: var(--success); }
.callout-warning { background: #fff3e0; border-color: var(--warning); }
.callout-danger { background: #fce4ec; border-color: var(--danger); }
.callout-title { font-weight: 700; margin-bottom: 0.3em; }

/* ========== PULL QUOTE ========== */
.pull-quote { font-size: 14pt; font-weight: 300; text-align: center;
              padding: 1.5em 2em; margin: 1.5em 0; color: var(--accent);
              border-top: 2px solid var(--accent); border-bottom: 2px solid var(--accent); }

/* ========== CHART CONTAINER ========== */
.chart-container { position: relative; margin: 1.5em 0; max-width: 100%; }
.chart-container canvas { max-width: 100%; }
.chart-container figcaption { font-size: 9pt; color: #666; text-align: center;
                              margin-top: 0.5em; font-style: italic; }

/* ========== SCORE / BADGE ========== */
.score-badge { display: inline-block; padding: 0.2em 0.8em; border-radius: 12px;
               font-weight: 700; font-size: 10pt; }
.score-high { background: var(--success); color: #fff; }
.score-mid { background: var(--warning); color: #fff; }
.score-low { background: var(--danger); color: #fff; }

/* ========== PRINT ========== */
@media print {
    @page { size: A4 portrait; margin: 20mm; }
    body { font-size: 10pt; }
    .report { max-width: none; padding: 0; }
    .title-page { min-height: auto; page-break-after: always; }
    .toc { page-break-after: always; }
    .executive-summary { page-break-after: always; }
    .appendix { page-break-before: always; }
    .data-table, .chart-container, .matrix-2x2, .mermaid, figure {
        page-break-inside: avoid;
    }
    h2, h3 { page-break-after: avoid; }
    .callout { page-break-inside: avoid; }
    a { color: inherit; text-decoration: none; }
    canvas { max-width: 100% !important; height: auto !important; }
}
```

> **Palette:** replace CSS variables from Design Spec. All colors — via `var(--name)` so the palette changes in one place.

### Step 3 — Chart.js

For each chart from the Visualization Map:
1. `<figure class="chart-container">` → `<canvas id="chart-N">` → `<figcaption>`.
2. Config: `animation: false`, `responsive: true`, palette from CSS variables.

**Configurations by type:**

```javascript
// ========== BAR CHART (competitor comparison, scoring) ==========
new Chart(document.getElementById('chart-competitors'), {
    type: 'bar',
    data: {
        labels: ['Competitor A', 'Competitor B', 'Competitor C', 'Our Product'],
        datasets: [{
            label: 'Threat Score',
            data: [7.2, 7.3, 4.8, null],
            backgroundColor: ['#e74c3c', '#e74c3c', '#f39c12', '#2ecc71'],
            borderWidth: 0,
            borderRadius: 4
        }]
    },
    options: {
        animation: false, responsive: true,
        plugins: { legend: { display: false },
                   title: { display: true, text: 'Competitor Threat Score', font: { size: 14 } } },
        scales: { y: { beginAtZero: true, max: 10, title: { display: true, text: 'Score' } } }
    }
});

// ========== RADAR CHART (multi-criteria comparison) ==========
new Chart(document.getElementById('chart-radar'), {
    type: 'radar',
    data: {
        labels: ['Features', 'Price', 'UX', 'Support', 'Ecosystem', 'Brand'],
        datasets: [
            { label: 'Our Product', data: [7, 8, 6, 5, 4, 3],
              borderColor: '#0f3460', backgroundColor: 'rgba(15,52,96,0.1)', borderWidth: 2 },
            { label: 'Market Leader', data: [9, 4, 8, 7, 9, 9],
              borderColor: '#e94560', backgroundColor: 'rgba(233,69,96,0.1)', borderWidth: 2 }
        ]
    },
    options: {
        animation: false, responsive: true,
        scales: { r: { beginAtZero: true, max: 10, ticks: { stepSize: 2 } } }
    }
});

// ========== PIE / DOUGHNUT (shares, distribution) ==========
new Chart(document.getElementById('chart-share'), {
    type: 'doughnut',
    data: {
        labels: ['Segment A', 'Segment B', 'Segment C', 'Other'],
        datasets: [{ data: [35, 28, 22, 15],
                     backgroundColor: ['#1a1a2e', '#0f3460', '#e94560', '#ccc'],
                     borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
        animation: false, responsive: true,
        plugins: { legend: { position: 'right' } }
    }
});

// ========== LINE CHART (trends, retention curves) ==========
new Chart(document.getElementById('chart-retention'), {
    type: 'line',
    data: {
        labels: ['M0', 'M1', 'M2', 'M3', 'M6', 'M12'],
        datasets: [
            { label: 'Jan Cohort', data: [100, 42, 31, 26, 20, 16],
              borderColor: '#e94560', fill: false, tension: 0.3 },
            { label: 'Mar Cohort', data: [100, 55, 44, 38, null, null],
              borderColor: '#2ecc71', fill: false, tension: 0.3 }
        ]
    },
    options: {
        animation: false, responsive: true,
        scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Retention %' } } }
    }
});

// ========== SCATTER (2D positioning) ==========
new Chart(document.getElementById('chart-positioning'), {
    type: 'scatter',
    data: {
        datasets: [
            { label: 'Competitor A', data: [{ x: 8, y: 7 }], pointRadius: 10,
              backgroundColor: '#e74c3c' },
            { label: 'Our Product', data: [{ x: 5, y: 6 }], pointRadius: 12,
              backgroundColor: '#2ecc71', pointStyle: 'star' }
        ]
    },
    options: {
        animation: false, responsive: true,
        scales: {
            x: { min: 0, max: 10, title: { display: true, text: 'Features' } },
            y: { min: 0, max: 10, title: { display: true, text: 'Price' } }
        }
    }
});
```

### Step 4 — Mermaid

```javascript
mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
```

**Diagrams by type:**

```html
<!-- ========== FLOWCHART (processes, pipelines) ========== -->
<div class="mermaid">
flowchart TD
    A[Awareness] --> B[Consideration]
    B --> C[Decision]
    C --> D[Purchase]
    D --> E[Retention]
    E --> F[Advocacy]
    E -.->|churn| G[Exit]
    style G fill:#fce4ec,stroke:#e74c3c
</div>

<!-- ========== MINDMAP (structure, hierarchy) ========== -->
<div class="mermaid">
mindmap
  root((Growth Strategy))
    Penetration
      Upsell
      Cross-sell
    Market Development
      CIS
      Enterprise
    Product Development
      AI module
      Mobile app
    Diversification
      White-label
</div>

<!-- ========== QUADRANT CHART (2x2 matrices) ========== -->
<div class="mermaid">
quadrantChart
    title Impact vs Effort
    x-axis Low Effort --> High Effort
    y-axis Low Impact --> High Impact
    quadrant-1 Big Bets
    quadrant-2 Quick Wins
    quadrant-3 Fill-ins
    quadrant-4 Avoid
    Action A: [0.3, 0.8]
    Action B: [0.7, 0.9]
    Action C: [0.2, 0.3]
</div>
```

> Each Mermaid diagram is wrapped in `<figure>` with `<figcaption>` and `page-break-inside: avoid`.

### Step 5 — Components (HTML fragments)

**Data Table:**
```html
<table class="data-table">
    <thead>
        <tr><th>Competitor</th><th>Score</th><th>Rank</th></tr>
    </thead>
    <tbody>
        <tr><td>Company A</td><td>7.6</td>
            <td><span class="score-badge score-high">High</span></td></tr>
        <tr class="highlight"><td><strong>Our Product</strong></td><td>6.2</td>
            <td><span class="score-badge score-mid">Medium</span></td></tr>
    </tbody>
</table>
```

**Matrix 2×2:**
```html
<div class="matrix-2x2">
    <div class="cell-header">High Share</div>
    <div class="cell-header">Low Share</div>
    <div class="cell cell-tl">
        <h4>★ Stars</h4>
        <p>Product A ($30M, growth 18%)</p>
    </div>
    <div class="cell cell-tr">
        <h4>? Question Marks</h4>
        <p>Product C ($10M, growth 35%)</p>
    </div>
    <div class="cell cell-bl">
        <h4>$ Cash Cows</h4>
        <p>Product B ($45M, growth 3%)</p>
    </div>
    <div class="cell cell-br">
        <h4>✕ Dogs</h4>
        <p>Product D ($5M, growth 1%)</p>
    </div>
</div>
```

**Callout Box:**
```html
<div class="callout callout-warning">
    <div class="callout-title">⚠️ Key Risk</div>
    <p>TAM was assessed based on 2 sources (instead of 3). Data is marked as Estimated.</p>
</div>
```

**Pull Quote:**
```html
<div class="pull-quote">
    «AI-first CRM for small business — the only unoccupied position in the market»
</div>
```

### Step 6 — TOC (Table of Contents)

```html
<nav class="toc" id="toc">
    <h2>Contents</h2>
    <ol class="toc-list">
        <li><a href="#executive-summary">Executive Summary</a></li>
        <li><a href="#section-1">Market Analysis</a></li>
        <li><a href="#section-2">Competitive Landscape</a></li>
        <li><a href="#section-3">Strategic Recommendations</a></li>
        <li><a href="#appendix-a">Appendix A — Research Brief</a></li>
        <li><a href="#appendix-b">Appendix B — Analyst Data</a></li>
        <li><a href="#appendix-c">Appendix C — Critic Data</a></li>
        <li><a href="#appendix-d">Appendix D — Sources</a></li>
    </ol>
</nav>
```

### Step 7 — Accessibility

1. All `<img>` and `<canvas>` — with `alt` / `aria-label`:
```html
<figure class="chart-container" role="img" aria-label="Competitor Threat Score: A=7.2, B=7.3, C=4.8">
    <canvas id="chart-competitors"></canvas>
    <figcaption>Fig. 1 — Competitor Threat Score (scale 1-10)</figcaption>
</figure>
```
2. Tables — `<caption>` and `scope="col"` / `scope="row"` for `<th>`.
3. Color coding — not the sole means of conveying information (+ text labels, icons).
4. Contrast: text on background ≥ 4.5:1 (WCAG AA).

### Step 8 — Assembly and Testing

1. Assemble all components into a single HTML.
2. Check: all ids are unique, all canvases have configuration, TOC anchors work.
3. **PDF testing protocol:**

| # | Check | How to test | Typical issue |
|---|-------|-------------|---------------|
| 1 | Open in Chrome/Edge | File → Open file | Mermaid does not render → check CDN |
| 2 | Ctrl+P → Preview | Check layout | Charts clipped → reduce canvas |
| 3 | All charts visible | Scroll preview | Empty canvas → `animation: false` |
| 4 | Page breaks correct | Each appendix on new page | Merging → `page-break-before: always` |
| 5 | Tables not cut | Tables complete on page | Cut → `page-break-inside: avoid` |
| 6 | TOC anchors clickable | Click links in TOC | Not working → check ids |
| 7 | Background graphics | Enable in print settings | Colors disappeared → «Background graphics: ON» |
| 8 | Text readable | Check font-size in print | Too small → increase `@media print` font-size |

> **User instructions:** Chrome/Edge → Ctrl+P → Destination: Save as PDF → Layout: Portrait → Paper: A4 → Margins: Default → **Background graphics: ON** → Save.

## Example — Executive Summary Section

```html
<section class="executive-summary" id="executive-summary">
    <h2>Executive Summary</h2>

    <div class="pull-quote">
        «AI-powered 1:1 summarization solves 45-60 min/week admin overhead for 5,000+
        managers in TeamFlow base. Projected +$2.4M ARR expansion over 12 months, NRR +4pp.»
    </div>

    <h3>Key Findings</h3>
    <div class="callout callout-success">
        <div class="callout-title">✅ Main Insight</div>
        <p>Mid-market and enterprise customers are ready to pay $8-12/seat premium for AI summarization.
        6 of 8 buyer interviews confirm value, 4/4 enterprise accounts ready for beta.</p>
    </div>

    <table class="data-table">
        <caption>Summary of Key Metrics</caption>
        <thead>
            <tr><th scope="col">Metric</th><th scope="col">Value</th><th scope="col">Benchmark</th><th scope="col">Rating</th></tr>
        </thead>
        <tbody>
            <tr><td>TAM</td><td>$4.2B</td><td>—</td>
                <td><span class="score-badge score-high">Large</span></td></tr>
            <tr><td>SOM (Year 1)</td><td>$180M</td><td>—</td>
                <td><span class="score-badge score-mid">Medium</span></td></tr>
            <tr><td>Top Threat</td><td>Competitor X</td><td>Score 7.6</td>
                <td><span class="score-badge score-low">High</span></td></tr>
        </tbody>
    </table>

    <figure class="chart-container" role="img" aria-label="Threat Score: A=7.2, B=6.8, C=7.6, D=4.1, E=5.3">
        <canvas id="chart-exec-threats"></canvas>
        <figcaption>Fig. 1 — Threat Score of key competitors</figcaption>
    </figure>
</section>
```

## Validation (Quality Gate)

- [ ] HTML self-contained (no external CSS/JS except CDN for Chart.js and Mermaid)
- [ ] All sections from Design Spec implemented
- [ ] All visualizations from Visualization Map present
- [ ] CSS variables match palette from Design Spec
- [ ] TOC anchors work (each `<a href="#id">` → `<section id="id">`)
- [ ] `@media print` correct (A4, 20mm, page breaks)
- [ ] Chart.js: `animation: false`, `responsive: true` on each chart
- [ ] Mermaid: `startOnLoad: true`, `theme: 'neutral'`
- [ ] HTML is valid (no duplicate ids, no unclosed tags)
- [ ] Accessibility: `alt` / `aria-label` on charts, `caption` on tables, contrast ≥ 4.5:1
- [ ] PDF testing protocol passed (8 checks)
- [ ] Print preview: all charts visible, page breaks correct, tables not cut

## Handoff
Output is passed to:
- **User** — open in browser → Ctrl+P → Save as PDF (instructions in report).
- **`$gates` (RG-01)** — Release Gate: final check before publishing.
- **`$board`** — update LY-01 → `[✓]`.

Transfer format: `report.html` (single file) + PDF printing instructions.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| External CSS frameworks (Bootstrap etc.) | Doesn't work offline, extra weight | Inline CSS only |
| `animation: true` | Empty charts in PDF (canvas not rendered) | Always `animation: false` |
| Fixed canvas size (`width="600"`) | Doesn't scale when printing | `responsive: true`, size via CSS |
| Missing page breaks | Sections merge, tables cut | `page-break-before/after/inside` per protocol |
| Broken TOC anchors | Navigation broken | Unique id on each section, verify all links |
| Colors hardcoded | Palette can't be changed in one place | CSS variables: `var(--primary)`, `var(--accent)` |
| No `<figcaption>` on charts | Unclear what the chart shows | `<figure>` + `<figcaption>` + `aria-label` |
| No fallback for Mermaid | If JS didn't load — blank space | `<noscript>` with text description of diagram |
| Background graphics not enabled | Colors, table backgrounds disappear in PDF | User instructions: Background graphics: ON |

## Output Template

```
## HTML Report: [Name]
**File:** docs/product/prd.html | docs/product/product-review-deck.html
**Size:** ~XXX KB
**Sections:** N main + N appendices
**Date:** [YYYY-MM-DD]

### Components
| Type | Count | ID |
|------|:-----:|-----|
| Chart.js (bar, radar, etc.) | N | chart-1, chart-2, ... |
| Mermaid (flowchart, mindmap) | N | — (auto) |
| Data Tables | N | — |
| Matrices 2×2 | N | — |
| Callout Boxes | N | — |
| Pull Quotes | N | — |

### Palette
| Variable | Hex | Usage |
|----------|-----|-------|
| --primary | #XXXXXX | Headings, tables |
| --accent | #XXXXXX | Accents, links |
| --highlight | #XXXXXX | Key metrics |

### Testing Protocol
- [ ] Chrome/Edge opens without errors
- [ ] All charts rendered (not empty)
- [ ] Ctrl+P → preview correct
- [ ] Page breaks in place
- [ ] Background graphics: ON

### PDF Instructions
Chrome/Edge → Ctrl+P → Save as PDF → Portrait → A4 → Default margins → **Background graphics: ON** → Save
```

## Worked Example — TeamFlow Product Review Deck (HTML skeleton)

**Context:** Full Pipeline A `/ship-right-thing` completed. Designer prepared design spec (see `$report-design`). Layouter converts to production HTML/PDF — Product Review Deck for exec sign-off.

### Target Structure

- 12 slide-like pages (each `page-break` separated)
- Cover → TL;DR → Problem → Strategy → PRD highlights → Metrics → Risks → Rollout → Appendices
- Executive style: dense but readable, no decoration, data-forward
- PDF size target < 5MB for email distribution

### Self-contained HTML Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TeamFlow AI Summarization — Product Review Deck · Q2 2026</title>
  <meta name="description" content="Product Review Deck for executive sign-off: AI-powered 1:1 summarization initiative">
  <style>
    /* ============ CSS Tokens ============ */
    :root {
      --color-primary: #0A2540;      /* TeamFlow deep blue */
      --color-accent: #F2A900;        /* TeamFlow amber */
      --color-text: #1A1A1A;
      --color-text-muted: #6B6B6B;
      --color-bg: #FFFFFF;
      --color-bg-alt: #F7F9FB;
      --color-success: #22A06B;
      --color-warning: #E67E22;
      --color-danger: #C0392B;
      --color-border: #E1E4E8;
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-serif: 'Source Serif Pro', Georgia, serif;
      --space-1: 4px; --space-2: 8px; --space-3: 16px;
      --space-4: 24px; --space-5: 32px; --space-6: 48px;
    }
    
    /* ============ Reset + Base ============ */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--font-body);
      color: var(--color-text);
      font-size: 14px;
      line-height: 1.5;
      background: var(--color-bg);
    }
    
    /* ============ Page Structure (print-ready) ============ */
    @page {
      size: A4 portrait;
      margin: 2cm 1.8cm;
    }
    .page {
      page-break-after: always;
      min-height: 24cm;
      padding: 2cm 1.5cm;
      position: relative;
    }
    .page:last-child { page-break-after: auto; }
    .page-footer {
      position: absolute;
      bottom: 0.8cm;
      left: 1.5cm;
      right: 1.5cm;
      font-size: 10px;
      color: var(--color-text-muted);
      border-top: 1px solid var(--color-border);
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
    }
    @media screen { .page { border-bottom: 2px dashed var(--color-border); margin-bottom: 2cm; } }
    
    /* ============ Typography ============ */
    h1 { font-size: 32px; font-weight: 700; color: var(--color-primary); letter-spacing: -0.5px; margin-bottom: var(--space-4); }
    h2 { font-size: 22px; font-weight: 600; color: var(--color-primary); margin: var(--space-5) 0 var(--space-3); }
    h3 { font-size: 16px; font-weight: 600; color: var(--color-text); margin: var(--space-3) 0 var(--space-2); }
    p { margin-bottom: var(--space-2); }
    .lead { font-size: 16px; line-height: 1.6; color: var(--color-text); }
    .pull-quote {
      font-family: var(--font-serif);
      font-size: 20px; line-height: 1.4;
      color: var(--color-primary);
      border-left: 3px solid var(--color-accent);
      padding: var(--space-3) var(--space-4);
      margin: var(--space-4) 0;
      background: var(--color-bg-alt);
    }
    
    /* ============ Components ============ */
    .meta-bar {
      display: flex;
      justify-content: space-between;
      border-top: 3px solid var(--color-accent);
      border-bottom: 1px solid var(--color-border);
      padding: var(--space-3) 0;
      font-size: 12px;
      color: var(--color-text-muted);
      margin-bottom: var(--space-5);
    }
    .callout {
      border-left: 4px solid var(--color-accent);
      padding: var(--space-3);
      background: var(--color-bg-alt);
      margin: var(--space-3) 0;
    }
    .callout-title {
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: var(--space-1);
    }
    .callout-success { border-left-color: var(--color-success); }
    .callout-warning { border-left-color: var(--color-warning); }
    .callout-danger { border-left-color: var(--color-danger); }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: var(--space-3) 0;
      font-size: 12px;
    }
    th, td {
      padding: var(--space-2) var(--space-3);
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }
    th {
      font-weight: 600;
      background: var(--color-bg-alt);
      color: var(--color-primary);
    }
    tr:hover { background: var(--color-bg-alt); }
    .metric-positive { color: var(--color-success); font-weight: 600; }
    .metric-negative { color: var(--color-danger); font-weight: 600; }
    .metric-neutral { color: var(--color-text-muted); }
    
    .status-badge {
      display: inline-block;
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 600;
      border-radius: 3px;
      text-transform: uppercase;
    }
    .status-green { background: var(--color-success); color: white; }
    .status-amber { background: var(--color-warning); color: white; }
    .status-red { background: var(--color-danger); color: white; }
    
    /* Grid layouts */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-3); }
    .kpi-card {
      padding: var(--space-4);
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border);
      border-left: 3px solid var(--color-accent);
    }
    .kpi-value {
      font-size: 32px; font-weight: 700;
      color: var(--color-primary);
      margin-bottom: var(--space-1);
    }
    .kpi-label {
      font-size: 11px;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    /* Roadmap columns */
    .roadmap {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--space-3);
      margin: var(--space-4) 0;
    }
    .roadmap-column {
      padding: var(--space-3);
      background: var(--color-bg-alt);
      border-top: 3px solid var(--color-accent);
    }
    .roadmap-column h4 {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-primary);
      margin-bottom: var(--space-2);
    }
    .roadmap-column ul { list-style: none; padding-left: 0; }
    .roadmap-column li { padding: 6px 0; border-bottom: 1px solid var(--color-border); font-size: 12px; }
    
    /* ============ Print Optimizations ============ */
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .page { page-break-after: always; }
      table { page-break-inside: avoid; }
      .callout { page-break-inside: avoid; }
      h2, h3 { page-break-after: avoid; }
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER -->
  <section class="page" id="cover">
    <div style="margin-top: 8cm; text-align: center;">
      <p style="font-size: 13px; color: var(--color-text-muted); letter-spacing: 2px;">PRODUCT REVIEW DECK · CONFIDENTIAL</p>
      <h1 style="font-size: 42px; margin-top: var(--space-4);">AI 1:1 Summarization</h1>
      <p class="lead" style="margin-top: var(--space-3); color: var(--color-text-muted);">
        TeamFlow Q2 2026 Launch Proposal · Executive Sign-Off
      </p>
      <div style="margin-top: 4cm;">
        <p style="font-size: 12px; color: var(--color-text-muted);">Prepared by Product Team · April 17, 2026</p>
        <p style="font-size: 12px; color: var(--color-text-muted);">Alex K., Product · Priya S., Engineering · Jordan M., Design · Sam P., Data</p>
      </div>
    </div>
  </section>

  <!-- PAGE 2: TL;DR / EXECUTIVE SUMMARY -->
  <section class="page" id="summary">
    <div class="meta-bar">
      <span>TeamFlow AI Summarization</span>
      <span>Page 2 · Executive Summary</span>
    </div>
    <h1>Executive Summary</h1>
    <div class="pull-quote">
      «AI-powered 1:1 summarization solves 45-60 min/week admin overhead for 3,000+ managers in TeamFlow base. Projected +$2.4M ARR expansion over 12 months, NRR +4pp.»
    </div>
    <div class="grid-3" style="margin: var(--space-5) 0;">
      <div class="kpi-card">
        <div class="kpi-value">40</div>
        <div class="kpi-label">Target Team Tier Upgrades (Q2)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">+$8</div>
        <div class="kpi-label">Per-Seat Premium (Team Tier)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value">3 hrs</div>
        <div class="kpi-label">Weekly Manager Time Saved</div>
      </div>
    </div>
    <h2>What we're proposing</h2>
    <p class="lead">Launch AI Summarization as flagship feature of new Team Tier ($23/seat/month). Core capability: generate structured summary + action items within 60 seconds of 1:1 meeting end. Privacy-first architecture — opt-in per meeting, zero data retention with LLM providers, SOC 2 Type II attestation.</p>
    <h2>Why now</h2>
    <p class="lead">Mid-market and enterprise customers face growing manager efficiency crisis — 3-4 hrs/week admin burden is #2 churn risk factor per exit interviews. Competitors (Lattice, 15Five) haven't shipped AI summarization — 6-12 month first-mover window exists. Our 3-year behavioral data corpus enables superior quality vs standalone tools.</p>
    <div class="callout callout-success">
      <div class="callout-title">Expected Outcome</div>
      <p>Mid-market base ($5M ARR) → +30% NRR lift over 12 months via Team Tier upgrades. Enterprise tier foundation enables $2-3M ARR expansion opportunity through Q3.</p>
    </div>
    <div class="page-footer">
      <span>TeamFlow AI Summarization · Product Review · April 17, 2026</span>
      <span>2 / 12</span>
    </div>
  </section>

  <!-- PAGE 3: PROBLEM -->
  <section class="page" id="problem">
    <div class="meta-bar">
      <span>TeamFlow AI Summarization</span>
      <span>Page 3 · The Problem</span>
    </div>
    <h1>The Problem</h1>
    <p class="lead">People managers managing 5-15 direct reports at mid-market B2B SaaS companies experience severe admin overhead in 1:1 workflow. This manifests across three dimensions:</p>
    
    <div class="grid-3" style="margin: var(--space-4) 0;">
      <div class="kpi-card">
        <div class="kpi-value" style="color: var(--color-danger);">3-4 hrs</div>
        <div class="kpi-label">Manager admin time / week on 1:1s (8 reports avg)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value" style="color: var(--color-danger);">40%</div>
        <div class="kpi-label">Action items dropped / never completed</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-value" style="color: var(--color-danger);">0%</div>
        <div class="kpi-label">VP HR visibility into manager 1:1 quality</div>
      </div>
    </div>
    
    <h2>Evidence from Discovery</h2>
    <p>8 customer interviews (4 buyers VP HR, 4 end-user managers) + 120 support tickets Q1 2026 + internal product analytics. Direct quotes:</p>
    
    <div class="callout">
      <p><em>«25 minutes of prep every week for each of 8 reports. That's ~3 hours per week.»</em></p>
      <p style="text-align: right; font-size: 11px; margin-top: 8px; color: var(--color-text-muted);">— Interview E3 (Engineering Manager, mid-market)</p>
    </div>
    <div class="callout">
      <p><em>«Some managers run amazing 1:1s, others literally cancel them. I have no visibility, no levers.»</em></p>
      <p style="text-align: right; font-size: 11px; margin-top: 8px; color: var(--color-text-muted);">— Interview B2 (VP HR, 450-employee B2B SaaS)</p>
    </div>
    
    <div class="page-footer">
      <span>TeamFlow AI Summarization · Product Review · April 17, 2026</span>
      <span>3 / 12</span>
    </div>
  </section>

  <!-- PAGES 4-12: abbreviated ... full deck continues with Strategy / PRD / Metrics / Risks / Rollout / Appendix -->

  <!-- PAGE 12: APPENDIX — Roadmap -->
  <section class="page" id="roadmap">
    <div class="meta-bar">
      <span>TeamFlow AI Summarization</span>
      <span>Page 12 · Roadmap</span>
    </div>
    <h1>Product Roadmap — Now / Next / Later</h1>
    <div class="roadmap">
      <div class="roadmap-column">
        <h4>Now (Q2 2026)</h4>
        <ul>
          <li>✨ AI Summarization Core (Team Tier)</li>
          <li>✨ Auto Action Items Extraction</li>
          <li>✨ Action Items Reminders</li>
          <li>🔐 SOC 2 Type II (AI features)</li>
          <li>🔐 SSO SAML + SCIM</li>
        </ul>
      </div>
      <div class="roadmap-column">
        <h4>Next (Q3 2026)</h4>
        <ul>
          <li>📊 Aggregate Dashboard (Enterprise)</li>
          <li>⏱️ Real-time Transcription</li>
          <li>🎯 Manager Health Score</li>
          <li>🔗 Zoom / Meet Import</li>
        </ul>
      </div>
      <div class="roadmap-column">
        <h4>Later (Q4+)</h4>
        <ul>
          <li>🌍 Multi-language Support</li>
          <li>📱 Native Mobile App</li>
          <li>🔍 AI Coaching Insights</li>
          <li>📈 Predictive Attrition Model</li>
        </ul>
      </div>
    </div>
    <div class="page-footer">
      <span>TeamFlow AI Summarization · Product Review · April 17, 2026</span>
      <span>12 / 12</span>
    </div>
  </section>

</body>
</html>
```

### Quality Checks Passed
- [x] Self-contained (single HTML file, all CSS inlined)
- [x] No broken references
- [x] Print-ready (@page, @media print directives)
- [x] Page breaks between sections
- [x] Executive dense without overwhelm
- [x] Color consistent with TeamFlow brand (deep blue + amber)
- [x] Accessible (semantic HTML, alt text on images if any)
- [x] File size estimate < 2MB (no embedded images yet; with logos/charts might grow to 3-4MB)

### PDF Generation

```bash
# Via puppeteer (preferred, automation-friendly)
puppeteer-pdf product-review-deck.html --format=A4 --margin-top=2cm --print-background

# Via WeasyPrint
weasyprint product-review-deck.html product-review-deck.pdf

# Manual via Chrome
open product-review-deck.html; Ctrl+P; Save as PDF; Background graphics ON
```

> **html-pdf-report lesson:** Self-contained = single HTML + inline CSS. Component tokens (CSS variables) enable consistency + easy re-skin. @page + @media print rules critical for PDF output. KPI cards with single large number + small label — reading pattern optimized for exec scanning. Callouts (colored left border) > inline quotes for visual hierarchy. Page footers with page numbers + title help reader navigate printed PDF.
