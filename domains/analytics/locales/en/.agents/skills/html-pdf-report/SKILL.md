---
name: html-pdf-report
description: Self-contained HTML report generation for PDF printing — CSS print layout, Chart.js, Mermaid
---
# HTML/PDF Report — Self-Contained HTML Generation for PDF Printing

## When to Use
- When implementing the **final analytical report** based on the Report Design Spec from the Designer.
- When creating a **self-contained HTML file** with embedded charts (Chart.js), diagrams (Mermaid), and print-optimized CSS.
- When generating a **PDF-ready document** via Print-to-PDF in the browser.
- When laying out **analytical reports** with tables, matrices, charts, and diagrams.
- When creating an **A4-optimized** document with correct page breaks and print stylesheet.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Report Design Spec | ✅ | Section structure, visualizations, emphasis levels |
| Executive Summary Draft | ✅ | Draft from the Designer |
| Color Palette | ✅ | Primary, secondary, accent colors, etc. |
| Visualization Map | ✅ | List of visualizations with types and data |
| Raw text of reports | ✅ | Mediator conclusion, Alpha/Beta Reports, Brief |
| Numeric data for charts | ✅ | Extracted from reports or provided |

## Data Sources
1. Report Design Spec from Designer — structure, visualizations, palette.
2. session-1-handoff.md — Interview Brief (raw text for Appendix).
3. session-2-handoff.md — Alpha Report (raw text for Appendix A).
4. session-3-handoff.md — Beta Report (raw text for Appendix B).
5. session-4-handoff.md — Mediated Conclusion (raw text for Main Section).

## Protocol

### Step 0 — Input Validation
1. Verify Report Design Spec is present (P0 BLOCKER if missing).
2. Verify all raw text artifacts are present.
3. Extract numeric data for Chart.js from reports.
4. Ensure the Visualization Map contains data for each chart.
5. If data is incomplete — request from the user.

### Step 1 — HTML Skeleton
1. Create `<!DOCTYPE html>` with `lang="en"`, `charset="UTF-8"`.
2. Include CDN: Chart.js 4.x, Mermaid 10.x.
3. Create `<style>` for all CSS.
4. Create `<body>` structure: report container → sections.
5. Create `<script>` for Chart.js configurations and Mermaid init.

### Step 2 — CSS Implementation
1. **Base reset**: box-sizing, margin/padding reset, system fonts.
2. **Typography**: h1-h4 styles, paragraph, blockquote, lists.
3. **Layout**: .report max-width 210mm, padding 20mm, margin auto.
4. **Components**: callout boxes, pull quotes, severity badges, data tables, 2x2 matrices.
5. **Print stylesheet** (`@media print`):
   - `@page { size: A4; margin: 20mm; }`
   - Page breaks: `always` on appendices, `avoid` on tables and charts.
   - Hide non-print elements (`.no-print`).
   - Disable link decorations, set black text for links.
   - Canvas max-width 100%.

### Step 3 — Content Sections
1. **Title Page**: title, date, audience. `page-break-after: always`.
2. **TOC**: `<nav>` with `<ol>`, anchor links to all sections.
3. **Executive Summary**: HTML adaptation of the Designer's draft.
4. **Main Section**: verdict (pull quote) → metrics (charts) → strategy (flowchart) → roadmap (table).
5. **Appendix A**: Alpha Report text + visualizations.
6. **Appendix B**: Beta Report text + visualizations (Full Pipeline).
7. **Appendix C**: Mediator Reasoning (comparison table).
8. **Appendix D**: Synthesis (if included).

### Step 4 — Chart.js Implementation
1. For each chart from the Visualization Map:
   - Create `<div class="chart-container"><canvas id="chart-N"></canvas><p class="chart-caption">...</p></div>`.
   - Create `new Chart(...)` configuration in `<script>`.
2. Required settings:
   - `animation: false` (for correct printing).
   - `responsive: true`.
   - Colors — strictly from the palette.
   - Legend position: `bottom` for bar/line, `right` for pie/doughnut.
3. Types: bar (grouped/stacked), line (multi-series), pie, doughnut, radar, scatter.

### Step 5 — Mermaid Implementation
1. Initialize Mermaid: `mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' })`.
2. For each diagram:
   - Create `<div class="mermaid">...</div>`.
   - Types: flowchart (LR/TD), mindmap, quadrantChart.
3. `<noscript>` fallback with text description.
4. CSS: `page-break-inside: avoid` on the container.

### Step 6 — Tables and Matrices
1. **Data tables**: `<table class="data-table">` with `<thead>/<tbody>`, alternating rows.
2. **2x2 matrices**: `<div class="matrix-2x2">` with CSS Grid (grid-template-columns: 1fr 1fr).
3. CSS: border-collapse, padding, responsive width, `page-break-inside: avoid`.
4. Matrix cell color coding — from severity indicators palette.

### Step 7 — Page Breaks and Print
1. Title Page: `page-break-after: always`.
2. TOC: `page-break-after: always`.
3. Appendices: `page-break-before: always`.
4. Tables, charts, matrices: `page-break-inside: avoid`.
5. h2/h3: `page-break-after: avoid`.
6. Test: `Ctrl+P` in Chrome/Edge → preview.

### Step 8 — Assembly
1. Combine all components into a single HTML file.
2. Verify: all IDs are unique, all canvases have configurations.
3. Verify: TOC links are correct.
4. Verify: HTML is valid.
5. Output the final HTML file + printing instructions.

## HTML Template Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[REPORT_TITLE]</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <style>
        /* BASE */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
               font-size: 11pt; line-height: 1.6; color: #212529; }
        .report { max-width: 210mm; margin: 0 auto; padding: 20mm; }
        /* TYPOGRAPHY */
        h1 { font-size: 24pt; color: [PRIMARY]; margin-bottom: 0.5em; }
        h2 { font-size: 18pt; color: [PRIMARY]; border-bottom: 2px solid [PRIMARY]; padding-bottom: 4px; margin: 1.5em 0 0.5em; }
        h3 { font-size: 14pt; color: [SECONDARY]; margin: 1em 0 0.3em; }
        /* COMPONENTS */
        .callout-box { background: [BACKGROUND]; border-left: 4px solid [ACCENT]; padding: 1em; margin: 1em 0; }
        .pull-quote { font-size: 14pt; font-style: italic; text-align: center; color: [PRIMARY];
                      border-top: 2px solid [PRIMARY]; border-bottom: 2px solid [PRIMARY]; padding: 1em; margin: 1.5em 0; }
        .data-table { width: 100%; border-collapse: collapse; font-size: 10pt; margin: 1em 0; }
        .data-table th { background: [PRIMARY]; color: #fff; padding: 8px 12px; text-align: left; }
        .data-table td { padding: 8px 12px; border-bottom: 1px solid #dee2e6; }
        .data-table tr:nth-child(even) { background: [BACKGROUND]; }
        .matrix-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
                       border: 1px solid #dee2e6; margin: 1em 0; }
        .matrix-cell { padding: 1em; min-height: 120px; }
        .chart-container { max-width: 100%; margin: 1em auto; }
        .chart-caption { font-size: 9pt; color: [MUTED]; text-align: center; margin-top: 4px; }
        /* PRINT */
        @media print {
            @page { size: A4; margin: 20mm; }
            body { font-size: 10pt; }
            .title-page { page-break-after: always; }
            .toc { page-break-after: always; }
            .appendix { page-break-before: always; }
            table, .chart-container, .matrix-2x2, .mermaid { page-break-inside: avoid; }
            h2, h3 { page-break-after: avoid; }
            a { text-decoration: none; color: inherit; }
            canvas { max-width: 100% !important; }
        }
    </style>
</head>
<body>
<div class="report">
    <section class="title-page" id="title"> <!-- Title Page --> </section>
    <section class="toc" id="toc"> <!-- Table of Contents --> </section>
    <section class="executive-summary" id="executive-summary"> <!-- Executive Summary --> </section>
    <section class="main-section" id="main"> <!-- Main: Verdict + Metrics + Strategy + Roadmap --> </section>
    <section class="appendix appendix-a" id="appendix-a"> <!-- Appendix A: Alpha --> </section>
    <section class="appendix appendix-b" id="appendix-b"> <!-- Appendix B: Beta --> </section>
    <section class="appendix appendix-c" id="appendix-c"> <!-- Appendix C: Reasoning --> </section>
    <section class="appendix appendix-d" id="appendix-d"> <!-- Appendix D: Synthesis --> </section>
</div>
<script>
    mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
    // Chart.js configurations here
</script>
</body>
</html>
```

## CSS Patterns

**Severity indicators:**
```css
.severity-critical { background: #fde8e8; border-left: 4px solid #D62828; padding: 0.5em 1em; }
.severity-warning { background: #fef3e2; border-left: 4px solid #E76F51; padding: 0.5em 1em; }
.severity-positive { background: #e8f5e9; border-left: 4px solid #2D6A4F; padding: 0.5em 1em; }
.severity-neutral { background: #e3f2fd; border-left: 4px solid #2C7DA0; padding: 0.5em 1em; }
```

**TOC:**
```css
.toc-list { list-style: none; padding: 0; }
.toc-list li { padding: 4px 0; border-bottom: 1px dotted #dee2e6; }
.toc-list a { text-decoration: none; color: [PRIMARY]; }
```

## Validation (Quality Gate)

- [ ] HTML file is self-contained (no external CSS/JS except CDN)
- [ ] All sections from Report Design Spec are implemented
- [ ] All visualizations from the Visualization Map are present
- [ ] Palette matches the specification
- [ ] TOC anchors work
- [ ] `@media print` is correct (A4, 20mm margins, page breaks)
- [ ] Chart.js: `animation: false`, `responsive: true`
- [ ] Mermaid: `theme: 'neutral'`, `page-break-inside: avoid`
- [ ] Tables are not clipped when printing
- [ ] HTML is valid (no duplicate IDs, unclosed tags)

## Handoff
Result → User (open in browser → Print-to-PDF) / Conductor (Release Gate).

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| External CSS frameworks | Doesn't work offline | Inline CSS only |
| Animation: true | Empty charts in PDF | Always `animation: false` |
| Fixed canvas size | Doesn't scale | `responsive: true` |
| Missing page breaks | Everything bleeds together | `page-break-before: always` on appendices |
| Layout without spec | Doesn't match the design | Wait for Report Design Spec |
| Broken TOC anchors | Navigation doesn't work | Unique ID on every section |

## Output Template

```
## HTML Report: [Title]
**File:** report.html  |  **Size:** ~N KB  |  **Sections:** N

### Components
- Chart.js charts: N (bar: N, line: N, pie: N, radar: N)
- Mermaid diagrams: N (flowchart: N, mindmap: N)
- Tables: N
- Matrices (2x2): N

### Print Instructions
1. Open report.html in Chrome/Edge
2. Ctrl+P → Save as PDF
3. Layout: Portrait | Margins: Default | Background graphics: ON

### Validation
- [ ] Self-contained: YES
- [ ] Print tested: YES
- [ ] All viz implemented: YES
```
