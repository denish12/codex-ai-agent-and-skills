---
name: report-design
description: Analytical report layout design — structure, visualizations, hierarchy, palette
---
# Report Design — Analytical Report Layout Design

## When to Use
- When preparing the **final analytical report** from pipeline results (Session 5 Full Pipeline or Quick Pipeline finale).
- When needing to **design the structure** of a PDF report: which sections, which visualizations, which hierarchy.
- When creating a **report design specification** for handoff to the Layouter.
- When designing the **executive summary** based on the Mediator's conclusion.
- When defining the **color palette** and **visual hierarchy** for a printed document.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Mediator Conclusion | ✅ | Final verdict, synthesis, recommendations |
| Team Alpha Report | ✅ | Research, data, frameworks, strategy |
| Team Beta Report | ⬚ | Alternative research, critique, strategy (Full Pipeline) |
| Interview Brief | ✅ | Topic, scope, constraints, target audience |
| Appendix D (Synthesis) | ⬚ | Combined conclusions (if approved) |
| Target audience | ✅ | CEO / investor / operations team / external client |
| Style preferences | ⬚ | Corporate brand book, colors, fonts |

## Data Sources
1. session-1-handoff.md — Interview Brief with scope and constraints.
2. session-2-handoff.md — Alpha Report with findings and frameworks.
3. session-3-handoff.md — Beta Report with critique and alternative.
4. session-4-handoff.md — Mediated Conclusion with final verdict.
5. User preferences — audience, style, format.

## Protocol

### Step 0 — Clarification
1. Clarify the target audience of the report.
2. Ask about corporate style / brand book availability.
3. Determine the level of detail (executive / detailed).
4. Clarify the format (A4 portrait, page count).
5. Record visualization preferences.

### Step 1 — Content Inventory
1. Go through all input artifacts sequentially.
2. For each data element, record: type, importance, recommended placement.
3. Create a content registry: `[source] x [element] x [data type] x [importance]`.
4. Flag data points that require visualization.
5. Flag text blocks for callout boxes and pull quotes.

### Step 2 — Report Structure
1. Define sections: Title Page → TOC → Executive Summary → Main Section → Appendices.
2. For Main Section: verdict → metrics → strategy → roadmap.
3. For Appendices: A (Alpha) → B (Beta, Full Pipeline) → C (Mediator Reasoning) → D (Synthesis, optional).
4. Assign page count to each section.
5. Define page breaks between sections.

### Step 3 — Visualization Selection
1. For each numeric data point — choose chart type (bar / line / pie / radar / scatter).
2. For frameworks (SWOT, BCG, Ansoff) — 2x2 CSS matrix.
3. For processes and flows — Mermaid flowchart.
4. For structures and hierarchies — Mermaid mindmap.
5. For positioning — Mermaid quadrant chart.
6. For detailed comparisons — HTML table.
7. Maximum 3 visualizations per page.

### Step 4 — Visual Hierarchy
1. Define 4 emphasis levels: Hero → Key Finding → Supporting → Background.
2. Assign severity indicators: Critical (red), Warning (orange), Positive (green), Neutral (blue).
3. Define the use of callout boxes, pull quotes, severity badges.
4. For each section from the structure — assign an emphasis level.

### Step 5 — Color Palette
1. If a brand book exists — adapt the palette to corporate colors.
2. If not — use a standard professional palette (dark blue base).
3. Define colors for: primary, secondary, accent, success, warning, critical, background, text, muted.
4. Define the Chart.js palette (6 series).
5. Check WCAG AA contrast and grayscale print distinguishability.

### Step 6 — Executive Summary
1. Write a draft based on the Mediator's conclusion.
2. Structure: context → methodology → findings (3-5) → recommendation → risks → next steps.
3. Length: maximum 1.5 A4 pages.
4. Language: clear, jargon-free, adapted for the audience.

### Step 7 — Report Design Spec
1. Fill in the table: `[section] x [pages] x [content] x [visualization] x [emphasis] x [notes]`.
2. Attach the Visualization Map, Color Palette, Executive Summary Draft.
3. Hand off the specification to the Layouter via HANDOFF.

## Validation (Quality Gate)

- [ ] Every data point from the analysis has an assigned visualization type
- [ ] Report structure is complete (Title → TOC → Summary → Main → Appendices)
- [ ] Executive summary does not exceed 1.5 pages
- [ ] Visual hierarchy defined (4 emphasis levels)
- [ ] Palette is print-suitable (contrast, grayscale distinguishability)
- [ ] Report Design Spec is fully completed
- [ ] Brief compliance: report answers questions from the Interview Brief
- [ ] Maximum 3 visualizations per page
- [ ] Appendix D included / excluded deliberately

## Handoff
Result → Layouter for implementation in HTML/CSS/Chart.js.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Design without inventory | Empty sections, unnecessary charts | Go through all artifacts first |
| One chart type for everything | Uninformative | Match visualization to data type |
| Executive summary > 2 pages | Executives won't read it | Maximum 1.5 pages |
| Screen-optimized palette | Gray and indistinguishable in PDF | Check contrast for print |
| Overloaded pages | Cluttered mess of charts | Maximum 3 visualizations per page |
| Altering conclusions | Chain of custody violation | Format, don't edit |

## Output Template

```
## Report Design Spec: [Report Topic]
**Audience:** [who]  |  **Date:** [date]  |  **Mode:** Full / Quick

### Content Inventory
| Source | Elements | Critical | Important | Supporting |
|--------|----------|----------|-----------|------------|
| Brief | N | N | N | N |
| Alpha | N | N | N | N |
| Beta | N | N | N | N |
| Mediator | N | N | N | N |

### Report Structure
| # | Section | Pages | Visualization | Emphasis |
|---|---------|-------|--------------|----------|
| 1 | Title Page | 1 | — | Hero |
| 2 | TOC | 1 | — | — |
| ... | ... | ... | ... | ... |

### Color Palette
Primary: #XXXXXX | Secondary: #XXXXXX | ...

### Executive Summary (Draft)
[Draft]

### Visualization Map
| # | Section | Data Type | Visualization | Data |
|---|---------|----------|--------------|------|
| 1 | ... | ... | Bar chart | [...] |
```
