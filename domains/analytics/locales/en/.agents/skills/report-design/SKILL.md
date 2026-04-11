---
name: report-design
description: Designing an analytical report layout — structure, visualizations, hierarchy, palette
---
# Report Design — Designing an Analytical Report Layout

## When to Use
- When preparing the **final analytical report** based on the pipeline results (Session 5 Full Pipeline or finale of the Quick Pipeline).
- When it is necessary to **design the structure** of a PDF report: which sections, which visualizations, what hierarchy.
- When creating a **report design specification** to hand off to the Layouter.
- When designing an **executive summary** based on the Mediator's conclusion.
- When defining the **color palette** and **visual hierarchy** for a printed document.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Mediator's Conclusion | ✅ | Final verdict, synthesis, recommendations |
| Team Alpha Report | ✅ | Research, data, frameworks, strategy |
| Team Beta Report | ⬚ | Alternative research, critique, strategy (Full Pipeline) |
| Interview Brief | ✅ | Topic, scope, constraints, target audience |
| Appendix D (Synthesis) | ⬚ | Combined findings (if approved) |
| Target Audience | ✅ | CEO / investor / operational team / external client |
| Style Preferences | ⬚ | Corporate brand book, colors, typography |

> If mandatory fields are not provided — **request them from the user** before starting work. Do not generate placeholders.

## Data Sources
1. session-1-handoff.md — Interview Brief with scope and constraints.
2. session-2-handoff.md — Alpha Report with findings and frameworks.
3. session-3-handoff.md — Beta Report with critique and alternative.
4. session-4-handoff.md — Mediated Conclusion with the final verdict.
5. User preferences — audience, style, format.

### Relationship with Other Skills
| Skill | Interaction | When |
|------|----------------|-------|
| `$html-pdf-report` | Primary recipient: Report Design Spec → Layouter implements in HTML/CSS/Chart.js | After the design is completed (step 7) |
| `$gates` (DS-01) | Checking the readiness of the design spec before handing off to the Layouter | After step 7 |
| `$handoff` | Handing off the design spec via handoff envelope | After the gate check |
| `$board` | Updating the status of DS-01 | After handoff |
| Framework skills | Framework output templates (SWOT, BCG, Ansoff, etc.) → determine the visualization type | Step 3: selecting visualizations |

## Protocol

### Step 0 — Clarification
1. Clarify the target audience of the report.
2. Find out if there is a corporate style / brand book.
3. Determine the level of detail:

   | Audience | Level | Volume | Focus |
   |-----------|---------|-------|-------|
   | CEO / investor | Executive | 8-12 pages | Verdict, metrics, recommendations |
   | Operational team | Detailed | 15-25 pages | Data, methodology, action plan |
   | External client | Presentable | 10-15 pages | Findings, visualizations, recommendations |

4. Clarify the format (A4 portrait, number of pages).
5. Record preferences for visualizations.

### Step 1 — Content Inventory
1. Go through all input artifacts sequentially.
2. For each element, record:

   | Source | Element | Data Type | Importance | Recommendation |
   |----------|---------|:----------:|:----------:|-------------|
   | Brief | Task scope | Text | Critical | Title + Exec Summary |
   | Alpha / RES-01 | EdTech market TAM | Number ($4.2B) | Critical | Bar chart + Exec Summary |
   | Alpha / AN-01 | SWOT matrix | 2x2 framework | Important | CSS Matrix |
   | Mediator | Final verdict | Text | Critical | Pull quote + Exec Summary |
   | Beta / ST-02 | Alternative strategy | Text + table | Supporting | Appendix B |

3. Count: how many Critical / Important / Supporting elements there are.
4. Mark data points that require visualization.
5. Mark text blocks for callout boxes and pull quotes.

### Step 2 — Report Structure
1. Define sections:

   | # | Section | Pages | Content | Page Break |
   |---|--------|:----:|------------|:----------:|
   | 1 | Title Page | 1 | Title, date, audience, logo | After |
   | 2 | Table of Contents | 1 | Auto-generated from sections | After |
   | 3 | Executive Summary | 1-1.5 | Verdict, findings, recommendations | After |
   | 4 | Main: Verdict and metrics | 2-3 | Key data, scoring | — |
   | 5 | Main: Strategy and roadmap | 2-3 | Recommendations, roadmap | — |
   | 6 | Main: Detailed analysis | 3-5 | Frameworks, tables | — |
   | 7 | Appendix A: Alpha Report | 3-5 | Full Team Alpha report | Before |
   | 8 | Appendix B: Beta Report | 3-5 | Full Team Beta report (Full) | Before |
   | 9 | Appendix C: Mediator Reasoning | 1-2 | Verdict justification | Before |
   | 10 | Appendix D: Sources | 1-2 | All sources with dates | Before |

2. For Quick Pipeline: remove Appendix B, shorten sections 4-6.
3. Assign page breaks between sections.

### Step 3 — Selecting Visualizations

**Decision tree: data type → visualization:**

| Data Type | Visualization | Tool | Example |
|------------|-------------|------------|--------|
| Comparing N values | **Bar chart** (vertical) | Chart.js | Competitor Threat Score |
| Trend / dynamics | **Line chart** | Chart.js | Retention curves, monthly revenue |
| Proportions / distribution | **Doughnut / Pie** | Chart.js | Market shares, budget distribution |
| Multi-criteria comparison | **Radar chart** | Chart.js | Comparing competitors across 6+ axes |
| 2D positioning | **Scatter chart** | Chart.js | Positioning map |
| 2x2 matrix | **CSS Grid matrix** | HTML/CSS | SWOT, BCG, Ansoff, Impact×Effort |
| Process / flow | **Flowchart** | Mermaid | Customer journey, pipeline |
| Hierarchy / structure | **Mindmap** | Mermaid | Growth strategy, org chart |
| 2D prioritization | **Quadrant chart** | Mermaid | Importance×Satisfaction, Impact×Effort |
| Detailed comparison | **HTML table** | HTML/CSS | Feature matrix, scoring |
| Key finding | **Callout box** | HTML/CSS | Critical finding, risk, recommendation |
| Quote / verdict | **Pull quote** | HTML/CSS | Mediator's final verdict |
| Single metric | **Score badge** | HTML/CSS | NPS, Threat Score, Opportunity Score |

**Rules:**
- Maximum **3 visualizations per page**.
- Each visualization has a `<figcaption>` (caption) and `aria-label` (accessibility).
- Framework skills determine the data structure → The Designer chooses the visual form.

### Step 4 — Visual Hierarchy
1. Define 4 levels of emphasis:

   | Level | Elements | Placement | CSS Technique |
   |---------|----------|------------|-----------|
   | **Hero** | Verdict, main recommendation | Exec Summary, start of Main | Pull quote, large font (14-16pt), accent color |
   | **Key Finding** | TOP-3 findings, critical metrics | Main section | Callout box, score badge, bold |
   | **Supporting** | Data, frameworks, tables | Main + Appendices | Standard font, data tables |
   | **Background** | Methodology, sources, details | Appendices | Small font (9-10pt), muted color |

2. Severity indicators:

   | Severity | Color | Usage |
   |----------|------|---------------|
   | Critical / Negative | `var(--danger)` red | Risks, threats, blockers |
   | Warning / Attention | `var(--warning)` orange | Constraints, ⚠️ data |
   | Positive / Opportunity | `var(--success)` green | Opportunities, strengths |
   | Neutral / Info | `var(--accent)` blue | Context, neutral data |

3. For each section — assign an emphasis level.

### Step 5 — Color Palette
1. If there is a brand book — adapt to corporate colors.
2. If not — use the default professional palette:

   **Default Palette (dark blue base):**

   | Variable | HEX | Usage |
   |----------|-----|---------------|
   | `--primary` | `#1a1a2e` | Headings, table headers, main text |
   | `--secondary` | `#16213e` | Subheadings, h3 |
   | `--accent` | `#0f3460` | Links, callout info, neutral accents |
   | `--highlight` | `#e94560` | Key metrics, hero elements |
   | `--success` | `#2ecc71` | Positive indicators, opportunities |
   | `--warning` | `#f39c12` | Warnings, ⚠️ data |
   | `--danger` | `#e74c3c` | Risks, threats, critical |
   | `--bg-light` | `#f5f5f5` | Callout background, alternating rows |
   | `--border` | `#e0e0e0` | Table borders, dividers |
   | `--text` | `#1a1a2e` | Main text |
   | `--muted` | `#666666` | Captions, small text, sources |

   **Chart.js palette (6 series):**
   `['#1a1a2e', '#0f3460', '#e94560', '#2ecc71', '#f39c12', '#9b59b6']`

3. Verify:
   - WCAG AA contrast: text on background ≥ 4.5:1.
   - Distinctiveness in B/W printing: every color is distinguishable in greyscale.
   - Color blindness: do not rely only on red/green — add icons/text.

### Step 6 — Executive Summary
1. Write a draft based on the Mediator's conclusion.
2. Structure:

   ```markdown
   ## Executive Summary

   ### Context
   [1-2 sentences: what was analyzed, for whom, in what scope]

   ### Methodology
   [1-2 sentences: which frameworks, how many sources, adversarial approach]

   ### Key Findings

   > "[Mediator's main verdict — pull quote]"

   1. **[Finding 1]:** [description + key metric]
   2. **[Finding 2]:** [description + key metric]
   3. **[Finding 3]:** [description + key metric]

   ### Recommendation
   [1-2 sentences: what to do, what priority]

   ### Risks
   [1-2 sentences: main constraints and risks]

   ### Next Steps
   [Bulleted list: 3-5 specific actions]
   ```

3. Volume: **maximum 1.5 A4 pages**.
4. Language: clear, jargon-free, adapted to the audience.
5. Every finding is backed by a number or fact (not "the market is growing", but "TAM $4.2B, CAGR 18%").

### Step 7 — Report Design Spec (final deliverable)
1. Fill out the full specification (see output template).
2. Attach:
   - Content Inventory (step 1)
   - Report Structure (step 2)
   - Visualization Map (step 3)
   - Color Palette (step 5)
   - Executive Summary Draft (step 6)
3. Hand off to the Layouter via `$handoff`.

## Example — EdTech Report for CEO

**Context:** Analysis of the EdTech market, Full Pipeline, audience — CEO. Level: Executive (10 pages).

### Content Inventory (fragment)

| Source | Element | Type | Importance | Visualization |
|----------|---------|:---:|:----------:|-------------|
| Mediator | Verdict: "AI-first corp. training" | Text | Critical | Pull quote |
| Alpha/RES-01 | TAM $4.2B, SAM $1.8B, SOM $180M | Numbers | Critical | Bar chart |
| Alpha/AN-01 | Competitor Threat Score | Scoring | Critical | Bar chart + table |
| Alpha/AN-01 | SWOT matrix | 2x2 | Important | CSS Matrix |
| Beta/AN-02 | Alternative Porter's 5 Forces | Scoring 1-5 | Supporting | Radar chart |
| Mediator | Final Alpha vs Beta scoring | Scoring | Critical | Table + badge |

**Total:** 28 elements (8 Critical, 12 Important, 8 Supporting).

### Report Structure

| # | Section | Pages | Visualizations | Emphasis |
|---|--------|:----:|:------------:|:--------:|
| 1 | Title Page | 1 | — | Hero |
| 2 | TOC | 0.5 | — | — |
| 3 | Executive Summary | 1.5 | 1 pull quote, 1 callout | Hero |
| 4 | Market and competition | 2 | Bar (TAM), Radar (competitors), Table (threat) | Key Finding |
| 5 | Strategy and roadmap | 1.5 | Mindmap (strategy), Table (actions) | Key Finding |
| 6 | Appendix A: Alpha | 2 | SWOT matrix, Table | Supporting |
| 7 | Appendix B: Beta | 1.5 | Porter's radar | Supporting |
| 8 | Appendix C: Mediator | 1 | Scoring table | Background |
| 9 | Appendix D: Sources | 1 | — | Background |

**Total:** ~12 pages, 9 visualizations.

### Visualization Map (fragment)

| # | Section | Data | Type | Tool |
|---|--------|--------|-----|------------|
| 1 | Exec Summary | Mediator's verdict | Pull quote | HTML/CSS |
| 2 | Market | TAM $4.2B, SAM $1.8B, SOM $180M | Bar chart | Chart.js |
| 3 | Competition | Threat Score: Skillbox 7.2, Coursera 6.8, Udemy 7.6 | Bar chart | Chart.js |
| 4 | Competition | 6 axes of competitor comparison | Radar | Chart.js |
| 5 | Strategy | Growth strategy tree | Mindmap | Mermaid |
| 6 | App. A | SWOT S/W/O/T | 2x2 matrix | CSS Grid |

## Validation (Quality Gate)

- [ ] Content Inventory is complete: every element from input artifacts is accounted for
- [ ] Each numerical data point has an assigned visualization type (via decision tree)
- [ ] Report structure is complete (Title → TOC → Summary → Main → Appendices)
- [ ] Executive Summary ≤ 1.5 pages, contains: context, methodology, 3-5 findings with numbers, recommendation
- [ ] Visual hierarchy is defined (4 levels of emphasis) and assigned to sections
- [ ] Palette is defined (11 CSS variables), validated for WCAG AA contrast and B/W distinctiveness
- [ ] Chart.js palette is defined (6 series)
- [ ] Maximum 3 visualizations per page
- [ ] Report Design Spec is fully populated (structure + visualization map + palette + exec summary)
- [ ] Brief compliance: the report answers the questions from the Interview Brief
- [ ] Appendix D (Sources) is included / excluded intentionally
- [ ] Each visualization has a caption (`figcaption`) and `aria-label`

## Handoff
The output of `$report-design` is an input for:
- **`$html-pdf-report`** (Layouter) — primary recipient: implementation in HTML/CSS/Chart.js/Mermaid.
- **`$gates` (DS-01)** — checking the readiness of the design spec.
- **`$board`** — updating the status of DS-01.

Handoff format: Report Design Spec (structure + content inventory + visualization map + color palette + executive summary draft). When transferring — use `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Design without inventory | Empty sections, unnecessary charts | Go through all artifacts first, create an inventory |
| One chart type for everything | Uninformative, does not fit the data type | Decision tree: data type → visualization |
| Executive summary > 2 pages | Executives will not read it | Maximum 1.5 pages, facts with numbers |
| Palette for screen only | Gray and indistinguishable in standard PDF | WCAG AA, B/W distinctiveness, color blindness test |
| Cluttered pages | A mess of charts | Maximum 3 visualizations per page |
| Changing findings | Chain of custody violation: Designer is not an analyst | Format, do not edit the content |
| Findings without numbers | "Market is growing" — is not a finding | Every finding = specific metric: "TAM $4.2B, CAGR 18%" |
| Palette without HEX codes | Layouter cannot implement "dark blue base" | 11 CSS variables with specific HEX |

## Output Template

```markdown
## Report Design Spec: [Report Topic]
**Audience:** [CEO / investor / operational team / external client]
**Level:** [Executive / Detailed / Presentable]
**Mode:** Full / Quick
**Pages:** ~[N]
**Date:** [Date]

---

### Content Inventory

| Source | Element | Data Type | Importance | Recommendation |
|----------|---------|:----------:|:----------:|-------------|
| [Source] | [Element] | [Number/Text/Framework/Scoring] | Critical/Important/Supporting | [Visualization / Section] |

**Total:** [N] elements ([N] Critical, [N] Important, [N] Supporting)

---

### Report Structure

| # | Section | Pages | Visualizations | Emphasis | Page Break |
|---|--------|:----:|:------------:|:--------:|:----------:|
| 1 | Title Page | 1 | — | Hero | After |
| 2 | TOC | 0.5-1 | — | — | After |
| 3 | Executive Summary | 1-1.5 | [N]: [types] | Hero | After |
| 4 | Main: [Name] | [N] | [N]: [types] | Key Finding | — |
| 5 | Main: [Name] | [N] | [N]: [types] | Key Finding | — |
| 6 | Appendix A: Alpha | [N] | [N]: [types] | Supporting | Before |
| 7 | Appendix B: Beta | [N] | [N]: [types] | Supporting | Before |
| 8 | Appendix C: Mediator | [N] | [N]: [types] | Background | Before |
| 9 | Appendix D: Sources | [N] | — | Background | Before |

---

### Visualization Map

| # | Section | Data | Visualization Type | Tool | Caption (figcaption) |
|---|--------|--------|:----------------:|:----------:|---------------------|
| 1 | [Section] | [Which data] | [Bar/Line/Radar/...] | Chart.js / Mermaid / CSS | "Fig. N — [description]" |

---

### Color Palette

| Variable | HEX | Usage |
|----------|-----|---------------|
| --primary | #XXXXXX | Headings, table headers |
| --secondary | #XXXXXX | Subheadings |
| --accent | #XXXXXX | Links, callout info |
| --highlight | #XXXXXX | Key metrics |
| --success | #XXXXXX | Positive indicators |
| --warning | #XXXXXX | Warnings |
| --danger | #XXXXXX | Risks, critical |
| --bg-light | #XXXXXX | Callout background, alternating rows |
| --border | #XXXXXX | Borders |
| --text | #XXXXXX | Main text |
| --muted | #XXXXXX | Captions, small text |

**Chart.js series:** ['#XXXXXX', '#XXXXXX', '#XXXXXX', '#XXXXXX', '#XXXXXX', '#XXXXXX']

**Checks:** WCAG AA ✅ / ⚠️ | B/W distinctiveness ✅ / ⚠️ | Color blindness ✅ / ⚠️

---

### Executive Summary (Draft)

## Executive Summary

### Context
[1-2 sentences: what was analyzed, for whom, scope]

### Methodology
[1-2 sentences: frameworks, sources, adversarial approach]

### Key Findings

> "[Mediator's main verdict]"

1. **[Finding 1]:** [description + metric]
2. **[Finding 2]:** [description + metric]
3. **[Finding 3]:** [description + metric]

### Recommendation
[1-2 sentences: what to do]

### Risks
[1-2 sentences: constraints]

### Next Steps
- [Action 1]
- [Action 2]
- [Action 3]

---

### Emphasis Map

| Section | Emphasis Level | Elements |
|--------|:-------------:|----------|
| [Section] | Hero / Key / Supporting / Background | [Which elements] |
```
