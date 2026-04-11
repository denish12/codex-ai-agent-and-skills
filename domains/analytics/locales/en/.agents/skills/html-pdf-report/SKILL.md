---
name: html-pdf-report
description: Generating a self-contained HTML report for PDF printing — CSS print layout, Chart.js, Mermaid
---
# HTML/PDF Report — Generation of a self-contained HTML for PDF printing

## When to Use
- When implementing the **final analytical report** based on the Report Design Spec from the Designer.
- When creating a **self-contained HTML file** with Chart.js, Mermaid, and print-optimized CSS.
- When generating a **PDF-ready document** via Print-to-PDF in the browser.
- When laying out **analytical reports** with tables, matrices, charts, and diagrams.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Report Design Spec | ✅ | Section structure, visualizations, emphasis levels |
| Executive Summary Draft | ✅ | Draft from the Designer |
| Color Palette | ✅ | Primary, secondary, accent colors, etc. |
| Visualization Map | ✅ | List of visualizations with types and data |
| Raw report text | ✅ | Conclusion of the Mediator, Alpha/Beta Reports, Brief |
| Numerical data for charts | ✅ | Extracted from reports or provided |

> If mandatory fields are not provided — **request them from the user** before starting work. Do not generate placeholders.

## Data Sources
1. Report Design Spec from the Designer — structure, visualizations, palette.
2. session-1 through session-4 handoff files — raw text for sections and appendices.

### Link with Other Skills
| Skill | Interaction | When |
|------|----------------|-------|
| `$gates` (DS-01) | Layout and visualization specifications — primary input for layout | Before starting work |
| `$handoff` | Session handoff files — raw text for report sections | Loading content |
| `$board` | Updating LY-01 status upon completion | After generating HTML |
| `$gates` (LY-01) | HTML validation before Release Gate | After completion |
| Framework skills | Tables, matrices, scoring models — visualize according to the Visualization Map | For Chart.js / tables |

## Protocol

### Step 0 — Input Validation
1. Verify the presence of the Report Design Spec (P0 BLOCKER if missing).
2. Verify the presence of all raw text artifacts.
3. Extract numerical data for Chart.js from the reports.
4. Match the Visualization Map with the available data.
5. If data is incomplete — request it from the user.

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

5. Each section uses semantic HTML: `<section>`, `<article>`, `<figure>`, `<figcaption>`.
6. Charts — `<figure>` with `<figcaption>` for accessibility and captions.

### Step 2 — CSS (Base + Print)

Complete working CSS block:

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

> **Palette:** replace CSS variables from the Design Spec. All colors should be accessed via `var(--name)` so the palette can be changed in one place.

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
        labels: ['Functionality', 'Price', 'UX', 'Support', 'Ecosystem', 'Brand'],
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
        labels: ['Segment A', 'Segment B', 'Segment C', 'Others'],
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
            x: { min: 0, max: 10, title: { display: true, text: 'Functionality' } },
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
      AI Module
      Mobile App
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

> Every Mermaid diagram is wrapped in a `<figure>` with a `<figcaption>` and `page-break-inside: avoid`.

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
        <p>Product A ($30M, 18% growth)</p>
    </div>
    <div class="cell cell-tr">
        <h4>? Question Marks</h4>
        <p>Product C ($10M, 35% growth)</p>
    </div>
    <div class="cell cell-bl">
        <h4>$ Cash Cows</h4>
        <p>Product B ($45M, 3% growth)</p>
    </div>
    <div class="cell cell-br">
        <h4>✕ Dogs</h4>
        <p>Product D ($5M, 1% growth)</p>
    </div>
</div>
```

**Callout Box:**
```html
<div class="callout callout-warning">
    <div class="callout-title">⚠️ Key Risk</div>
    <p>Market TAM estimated based on 2 sources (instead of 3). Data is marked as Estimated.</p>
</div>
```

**Pull Quote:**
```html
<div class="pull-quote">
    "An AI-first CRM for small businesses is the only unoccupied position in the market."
</div>
```

### Step 6 — TOC (Table of Contents)

```html
<nav class="toc" id="toc">
    <h2>Table of Contents</h2>
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

1. All `<img>` and `<canvas>` elements — with `alt` / `aria-label`:
```html
<figure class="chart-container" role="img" aria-label="Competitor Threat Score: A=7.2, B=7.3, C=4.8">
    <canvas id="chart-competitors"></canvas>
    <figcaption>Fig. 1 — Competitor Threat Score (1-10 scale)</figcaption>
</figure>
```
2. Tables — `<caption>` and `scope="col"` / `scope="row"` for `<th>`.
3. Color coding — not the only way to convey information (add text labels, icons).
4. Contrast: text on background ≥ 4.5:1 (WCAG AA).

### Step 8 — Assembly and Testing

1. Assemble all components into a single HTML file.
2. Verify: all ids are unique, all canvases have a configuration, TOC anchors work.
3. **PDF Testing Protocol:**

| # | Check | How to test | Typical problem |
|---|----------|-----------------|-------------------|
| 1 | Open in Chrome/Edge | File → Open File | Mermaid doesn't render → check CDN |
| 2 | Ctrl+P → Preview | Check layout | Charts are cropped → shrink canvas |
| 3 | All charts are visible | Scroll the preview | Empty canvas → `animation: false` |
| 4 | Page breaks are correct | Each appendix is on a new page | Bleeding over → `page-break-before: always` |
| 5 | Tables are not cut | Tables are entirely on the page | Cut in half → `page-break-inside: avoid` |
| 6 | TOC anchors are clickable | Click links in the TOC | Not working → check ids |
| 7 | Background graphics | Enable in print settings | Colors disappeared → "Background graphics: ON" |
| 8 | Text is readable | Check font-size in print | Too small → increase `@media print` font-size |

> **Instruction for the user:** Chrome/Edge → Ctrl+P → Destination: Save as PDF → Layout: Portrait → Paper: A4 → Margins: Default → **Background graphics: ON** → Save.

## Example — Executive Summary Section

```html
<section class="executive-summary" id="executive-summary">
    <h2>Executive Summary</h2>

    <div class="pull-quote">
        "The Russian EdTech market will reach $4.2B by 2027. The primary opportunity is 
        corporate training (28% CAGR), where competition is fragmented."
    </div>

    <h3>Key Takeaways</h3>
    <div class="callout callout-success">
        <div class="callout-title">✅ Main Insight</div>
        <p>AI personalization of learning is an unoccupied niche. None of the 5 key competitors
        offer adaptive learning paths at a ★★★ level.</p>
    </div>

    <table class="data-table">
        <caption>Key Metrics Summary</caption>
        <thead>
            <tr><th scope="col">Metric</th><th scope="col">Value</th><th scope="col">Benchmark</th><th scope="col">Rating</th></tr>
        </thead>
        <tbody>
            <tr><td>TAM</td><td>$4.2B</td><td>—</td>
                <td><span class="score-badge score-high">Large</span></td></tr>
            <tr><td>SOM (Year 1)</td><td>$180M</td><td>—</td>
                <td><span class="score-badge score-mid">Medium</span></td></tr>
            <tr><td>Main Threat</td><td>Yandex Praktikum</td><td>Score 7.6</td>
                <td><span class="score-badge score-low">High</span></td></tr>
        </tbody>
    </table>

    <figure class="chart-container" role="img" aria-label="Threat Score: Skillbox 7.2, Netology 6.8, Yandex 7.6, GeekBrains 4.1, Skyeng 5.3">
        <canvas id="chart-exec-threats"></canvas>
        <figcaption>Fig. 1 — Threat Score of key competitors</figcaption>
    </figure>
</section>
```

## Validation (Quality Gate)

- [ ] HTML is self-contained (no external CSS/JS besides CDNs for Chart.js and Mermaid)
- [ ] All sections from the Design Spec are implemented
- [ ] All visualizations from the Visualization Map are present
- [ ] CSS variables conform to the palette from the Design Spec
- [ ] TOC anchors work (each `<a href="#id">` → `<section id="id">`)
- [ ] `@media print` is correct (A4, 20mm, page breaks)
- [ ] Chart.js: `animation: false`, `responsive: true` on each chart
- [ ] Mermaid: `startOnLoad: true`, `theme: 'neutral'`
- [ ] HTML is valid (no duplicated ids, no unclosed tags)
- [ ] Accessibility: `alt` / `aria-label` on charts, `caption` on tables, contrast ≥ 4.5:1
- [ ] PDF Testing Protocol passed (8 checks)
- [ ] Print preview: all charts are visible, page breaks are correct, tables are not cut

## Handoff
The result is delivered to:
- **User** — open in browser → Ctrl+P → Save as PDF (instructions in the report).
- **`$gates` (RG-01)** — Release Gate: final check before publication.
- **`$board`** — update LY-01 → `[✓]`.

Delivery format: `report.html` (single file) + PDF printing instructions.

## Anti-patterns

| Mistake | Why it's bad | Correct approach |
|--------|-------------|---------------|
| External CSS frameworks (Bootstrap, etc.) | Doesn't work offline, excessive footprint | Inline CSS only |
| `animation: true` | Empty charts in PDF (canvas not rendered) | Always `animation: false` |
| Fixed canvas size (`width="600"`) | Fails to scale when printing | `responsive: true`, size via CSS |
| Skipping page breaks | Sections bleed together, tables are cut | `page-break-before/after/inside` per protocol |
| Broken TOC anchors | Navigation is broken | Unique ids on each section, verify all links |
| Hardcoded colors | Palette can't be changed from one place | CSS variables: `var(--primary)`, `var(--accent)` |
| Missing `<figcaption>` on charts | Unclear what the chart is showing | `<figure>` + `<figcaption>` + `aria-label` |
| No fallback for Mermaid | Blank space if JS fails to load | `<noscript>` with text description of the diagram |
| Background graphics disabled | Colors and table backgrounds disappear in PDF | User instruction: Background graphics: ON |

## Output Template

```
## HTML Report: [Name]
**File:** docs/analytics/report.html
**Size:** ~XXX KB
**Sections:** N main + N appendices
**Date:** [YYYY-MM-DD]

### Components
| Type | Count | ID |
|-----|:----------:|-----|
| Chart.js (bar, radar, etc.) | N | chart-1, chart-2, ... |
| Mermaid (flowchart, mindmap) | N | — (auto) |
| Data Tables | N | — |
| Matrices 2×2 | N | — |
| Callout Boxes | N | — |
| Pull Quotes | N | — |

### Palette
| Variable | Hex | Usage |
|----------|-----|---------------|
| --primary | #XXXXXX | Headings, tables |
| --accent | #XXXXXX | Accents, links |
| --highlight | #XXXXXX | Key metrics |

### Testing Protocol
- [ ] Chrome/Edge opens without errors
- [ ] All charts are rendered (not empty)
- [ ] Ctrl+P → preview is correct
- [ ] Page breaks are in place
- [ ] Background graphics: ON

### Instructions for PDF
Chrome/Edge → Ctrl+P → Save as PDF → Portrait → A4 → Default margins → **Background graphics: ON** → Save
```
