---
name: report-design
description: Designing the layout of a PRD or Product Review Deck — structure, navigation, visual hierarchy
---
# Report Design — PRD / Product Review Deck Layout Design

## When to Use
- When preparing a **final PRD** or **Product Review Deck** (Session 6 Full Pipeline A/B).
- When you need to **design the structure** of a PDF document: which sections, which visualizations, which hierarchy.
- When creating a **design specification** for handoff to the Layouter.
- When designing the **executive summary** based on the Unified Strategy Brief (Mediator synthesis) or approved scope.
- When defining the **color palette** and **visual hierarchy** for a PRD document (B2B SaaS typically uses a sober, data-driven tone).

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Mediator synthesis | ✅ | Unified Strategy Brief (Full A) or Final Scope Decision (Full B) |
| PRD (from PM-SPEC) | ✅ | User stories, AC, NFR, success metrics, risks, rollout |
| Team Beta report | ⬚ | Alternative research, critique, strategy (Full Pipeline) |
| Interview Brief | ✅ | Topic, scope, constraints, target audience |
| Appendix D (Synthesis) | ⬚ | Combined findings (if approved) |
| Target audience | ✅ | CEO / investor / operations team / external client |
| Style preferences | ⬚ | Corporate brand book, colors, fonts |

> If required fields are not provided — **request from the user** before starting. Do not generate placeholders.

## Data Sources
1. session-1-handoff.md — Interview Brief with scope and constraints.
2. session-2-handoff.md — Alpha Report with findings and frameworks.
3. session-3-handoff.md — Beta Report with critique and alternative.
4. session-4-handoff.md — Mediated Conclusion with final verdict.
5. User preferences — audience, style, format.

### Related Skills
| Skill | Interaction | When |
|-------|-------------|------|
| `$html-pdf-report` | Primary recipient: Report Design Spec → Layouter implements in HTML/CSS/Chart.js | After design is complete (step 7) |
| `$gates` (DS-01) | Verify design spec readiness before handoff to Layouter | After step 7 |
| `$handoff` | Transfer design spec via handoff envelope | After gate check |
| `$board` | Update DS-01 status | After transfer |
| Framework skills | Framework output templates (SWOT, BCG, Ansoff, etc.) → determine visualization type | Step 3: selecting visualizations |

## Protocol

### Step 0 — Clarification
1. Clarify the target audience of the report.
2. Ask about the existence of a corporate style / brand book.
3. Determine the level of detail:

   | Audience | Level | Volume | Focus |
   |----------|-------|--------|-------|
   | CEO / investor | Executive | 8-12 pp. | Verdict, metrics, recommendations |
   | Operations team | Detailed | 15-25 pp. | Data, methodology, action plan |
   | External client | Presentable | 10-15 pp. | Findings, visualizations, recommendations |

4. Clarify format (A4 portrait, number of pages).
5. Record visualization preferences.

### Step 1 — Content Inventory
1. Go through all input artifacts sequentially.
2. For each element record:

   | Source | Element | Data Type | Importance | Recommendation |
   |--------|---------|:---------:|:----------:|----------------|
   | PRD | Problem + TL;DR | Text | Critical | Cover + Exec Summary |
   | Mediator synthesis | Unified vision + NSM | Text + metric | Critical | Pull quote + Exec Summary |
   | PRD / PM-SPEC | User stories + AC (top 5) | Table | Critical | Stories table + Appendix A |
   | PM / RICE | Prioritized backlog | Scoring table | Important | Bar chart + Backlog section |
   | Strategy / Roadmap | Now/Next/Later | Timeline | Important | Roadmap visual |
   | Data Analyst | Metric tree + targets | Diagram + numbers | Critical | Metric tree diagram |
   | Tech Lead | Risk register (top 5) | Table | Important | Risks section |
   | Strategy Briefs Alpha+Beta (Full A) | Rejected paths | Text | Supporting | Appendix B (synthesis rationale) |

3. Count: how many Critical / Important / Supporting elements.
4. Mark data points requiring visualization.
5. Mark text blocks for callout boxes and pull quotes.

### Step 2 — Report Structure
1. Define sections:

   | # | Section | Pp. | Content | Page Break |
   |---|---------|:---:|---------|:----------:|
   | 1 | Title Page | 1 | Title, date, audience, logo | After |
   | 2 | Table of Contents | 1 | Auto-generated from sections | After |
   | 3 | Executive Summary | 1-1.5 | Verdict, findings, recommendations | After |
   | 4 | Main: Verdict and metrics | 2-3 | Key data, scoring | — |
   | 5 | Main: Strategy and roadmap | 2-3 | Recommendations, roadmap | — |
   | 6 | Main: Detailed analysis | 3-5 | Frameworks, tables | — |
   | 7 | Appendix A: Alpha Report | 3-5 | Full Team Alpha report | Before |
   | 8 | Appendix B: Beta Report | 3-5 | Full Team Beta report (Full) | Before |
   | 9 | Appendix C: Mediator Reasoning | 1-2 | Verdict rationale | Before |
   | 10 | Appendix D: Sources | 1-2 | All sources with dates | Before |

2. For Quick Pipeline: remove Appendix B, shorten sections 4-6.
3. Assign page breaks between sections.

### Step 3 — Selecting Visualizations

**Decision tree: data type → visualization:**

| Data Type | Visualization | Tool | Example |
|-----------|--------------|------|---------|
| Comparison of N values | **Bar chart** (vertical) | Chart.js | Competitor Threat Score |
| Trend / dynamics | **Line chart** | Chart.js | Retention curves, monthly revenue |
| Shares / distribution | **Doughnut / Pie** | Chart.js | Market shares, budget distribution |
| Multi-criteria comparison | **Radar chart** | Chart.js | Competitor comparison on 6+ axes |
| 2D positioning | **Scatter chart** | Chart.js | Positioning map |
| 2×2 matrix | **CSS Grid matrix** | HTML/CSS | SWOT, BCG, Ansoff, Impact×Effort |
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
- Framework skills define data structure → Designer chooses visual form.

### Step 4 — Visual Hierarchy
1. Define 4 emphasis levels:

   | Level | Elements | Placement | CSS technique |
   |-------|----------|-----------|---------------|
   | **Hero** | Verdict, main recommendation | Exec Summary, start of Main | Pull quote, large font (14-16pt), accent color |
   | **Key Finding** | TOP-3 findings, critical metrics | Main section | Callout box, score badge, bold |
   | **Supporting** | Data, frameworks, tables | Main + Appendices | Standard font, data tables |
   | **Background** | Methodology, sources, details | Appendices | Small font (9-10pt), muted color |

2. Severity indicators:

   | Severity | Color | Usage |
   |----------|-------|-------|
   | Critical / Negative | `var(--danger)` red | Risks, threats, blockers |
   | Warning / Attention | `var(--warning)` orange | Constraints, ⚠️ data |
   | Positive / Opportunity | `var(--success)` green | Opportunities, strengths |
   | Neutral / Info | `var(--accent)` blue | Context, neutral data |

3. For each section — assign emphasis level.

### Step 5 — Color Palette
1. If a brand book exists — adapt to corporate colors.
2. If not — use the default professional palette:

   **Default palette (dark-blue base):**

   | Variable | HEX | Usage |
   |----------|-----|-------|
   | `--primary` | `#1a1a2e` | Headings, table headers, body text |
   | `--secondary` | `#16213e` | Subheadings, h3 |
   | `--accent` | `#0f3460` | Links, callout info, neutral accents |
   | `--highlight` | `#e94560` | Key metrics, hero elements |
   | `--success` | `#2ecc71` | Positive indicators, opportunities |
   | `--warning` | `#f39c12` | Warnings, ⚠️ data |
   | `--danger` | `#e74c3c` | Risks, threats, critical |
   | `--bg-light` | `#f5f5f5` | Callout background, alternating rows |
   | `--border` | `#e0e0e0` | Table borders, dividers |
   | `--text` | `#1a1a2e` | Body text |
   | `--muted` | `#666666` | Captions, small text, sources |

   **Chart.js palette (6 series):**
   `['#1a1a2e', '#0f3460', '#e94560', '#2ecc71', '#f39c12', '#9b59b6']`

3. Verify:
   - WCAG AA contrast: text on background ≥ 4.5:1.
   - Distinguishability in B/W print: each color is distinguishable in greyscale.
   - Color blindness: don't rely solely on red/green — add icons/text.

### Step 6 — Executive Summary
1. Write a draft based on the Mediator's conclusion.
2. Structure:

   ```
   ## Executive Summary

   ### Context
   [1-2 sentences: what was analyzed, for whom, in what scope]

   ### Methodology
   [1-2 sentences: which frameworks, how many sources, adversarial approach]

   ### Key Findings

   > «[Mediator's main verdict — pull quote]»

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
4. Language: clear, jargon-free, adapted for the audience.
5. Each finding supported by a number or fact (not «the market is growing», but «TAM $4.2B, CAGR 18%»).

### Step 7 — Report Design Spec (final deliverable)
1. Fill in the complete specification (see output template).
2. Attach:
   - Content Inventory (step 1)
   - Report Structure (step 2)
   - Visualization Map (step 3)
   - Color Palette (step 5)
   - Executive Summary Draft (step 6)
3. Transfer to the Layouter via `$handoff`.

## Example — TeamFlow Product Review Deck for exec review

**Context:** TeamFlow (B2B SaaS HR-tech, $8M ARR). Initiative: AI-powered 1:1 summarization. Full Pipeline A complete, preparing Product Review Deck for CEO / CRO / VP Eng review. Level: Executive (12 slides).

### Content Inventory (fragment)

| Source | Element | Type | Importance | Visualization |
|--------|---------|:---:|:----------:|--------------|
| Mediator synthesis | Vision: «Help companies measurably improve manager effectiveness via AI-assisted 1:1s» | Text | Critical | Pull quote (Slide 3) |
| Mediator / Data Analyst | NSM: «weekly 1:1s with AI summary used» target 50% in 90 days | Metric | Critical | Metric tree + target gauge |
| PM / RICE | Top 7 user stories prioritized | Scoring table | Critical | Backlog bar chart |
| Alpha/AN-01 | SWOT matrix | 2×2 | Important | CSS Matrix |
| Beta/AN-02 | Alternative Porter's 5 Forces | Scoring 1-5 | Supporting | Radar chart |
| Mediator | Final scoring Alpha vs Beta | Scoring | Critical | Table + badge |

**Total:** 28 elements (8 Critical, 12 Important, 8 Supporting).

### Report Structure

| # | Section | Pp. | Visualizations | Emphasis |
|---|---------|:---:|:--------------:|:--------:|
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
|---|---------|------|------|------|
| 1 | Exec Summary | Mediator's verdict | Pull quote | HTML/CSS |
| 2 | Market | TAM $4.2B, SAM $1.8B, SOM $180M | Bar chart | Chart.js |
| 3 | Competition | Threat Score: Skillbox 7.2, Netologia 6.8, Yandex 7.6 | Bar chart | Chart.js |
| 4 | Competition | 6 competitor comparison axes | Radar | Chart.js |
| 5 | Strategy | Growth strategy tree | Mindmap | Mermaid |
| 6 | App. A | SWOT S/W/O/T | 2×2 matrix | CSS Grid |

## Validation (Quality Gate)

- [ ] Content Inventory is complete: every element from input artifacts is accounted for
- [ ] Every numeric data point has an assigned visualization type (per decision tree)
- [ ] Report structure is complete (Title → TOC → Summary → Main → Appendices)
- [ ] Executive Summary ≤ 1.5 pp., contains: context, methodology, 3-5 findings with numbers, recommendation
- [ ] Visual hierarchy defined (4 emphasis levels) and assigned to sections
- [ ] Palette defined (11 CSS variables), verified for WCAG AA contrast and B/W distinguishability
- [ ] Chart.js palette defined (6 series)
- [ ] Maximum 3 visualizations per page
- [ ] Report Design Spec fully completed (structure + visualization map + palette + exec summary)
- [ ] Brief compliance: report answers questions from the Interview Brief
- [ ] Appendix D (Sources) included / excluded deliberately
- [ ] Each visualization has a caption (`figcaption`) and `aria-label`

## Handoff
The result of `$report-design` is input for:
- **`$html-pdf-report`** (Layouter) — primary recipient: implementation in HTML/CSS/Chart.js/Mermaid.
- **`$gates` (DS-01)** — verify design spec readiness.
- **`$board`** — update DS-01 status.

Transfer format: Report Design Spec (structure + content inventory + visualization map + color palette + executive summary draft). When transferring — use `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|-------------------|
| Design without inventory | Empty sections, unnecessary charts | First go through all artifacts, create registry |
| One chart type for everything | Uninformative, doesn't fit data type | Decision tree: data type → visualization |
| Executive summary > 2 pp. | Executives don't read it | Maximum 1.5 pages, facts with numbers |
| Palette for screens | In PDF it looks grey and indistinguishable | WCAG AA, B/W distinguishability, color blindness test |
| Overloaded pages | Chart chaos | Maximum 3 visualizations per page |
| Changing findings | Violates chain of custody: Designer is not an analyst | Format, don't edit content |
| Findings without numbers | «Market is growing» is not a finding | Each finding = specific metric: «TAM $4.2B, CAGR 18%» |
| Palette without HEX codes | Layouter cannot implement «dark-blue base» | 11 CSS variables with specific HEX |

## Output Template

```
## Report Design Spec: [Report Topic]
**Audience:** [CEO / investor / ops team / external client]
**Level:** [Executive / Detailed / Presentable]
**Mode:** Full / Quick
**Pages:** ~[N]
**Date:** [date]

---

### Content Inventory

| Source | Element | Data Type | Importance | Recommendation |
|--------|---------|:---------:|:----------:|----------------|
| [Source] | [Element] | [Number/Text/Framework/Scoring] | Critical/Important/Supporting | [Visualization / section] |

**Total:** [N] elements ([N] Critical, [N] Important, [N] Supporting)

---

### Report Structure

| # | Section | Pp. | Visualizations | Emphasis | Page Break |
|---|---------|:---:|:--------------:|:--------:|:----------:|
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
|---|---------|------|:-----------------:|:----:|---------------------|
| 1 | [Section] | [What data] | [Bar/Line/Radar/...] | Chart.js / Mermaid / CSS | «Fig. N — [description]» |

---

### Color Palette

| Variable | HEX | Usage |
|----------|-----|-------|
| --primary | #XXXXXX | Headings, table headers |
| --secondary | #XXXXXX | Subheadings |
| --accent | #XXXXXX | Links, callout info |
| --highlight | #XXXXXX | Key metrics |
| --success | #XXXXXX | Positive indicators |
| --warning | #XXXXXX | Warnings |
| --danger | #XXXXXX | Risks, critical |
| --bg-light | #XXXXXX | Callout background, alternating rows |
| --border | #XXXXXX | Borders |
| --text | #XXXXXX | Body text |
| --muted | #XXXXXX | Captions, small text |

**Chart.js series:** ['#XXXXXX', '#XXXXXX', '#XXXXXX', '#XXXXXX', '#XXXXXX', '#XXXXXX']

**Checks:** WCAG AA ✅ / ⚠️ | B/W distinguishability ✅ / ⚠️ | Color blindness ✅ / ⚠️

---

### Executive Summary (Draft)

## Executive Summary

### Context
[1-2 sentences: what was analyzed, for whom, scope]

### Methodology
[1-2 sentences: frameworks, sources, adversarial approach]

### Key Findings

> «[Mediator's main verdict]»

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
|---------|:-------------:|---------|
| [Section] | Hero / Key / Supporting / Background | [Which elements] |
```

## Worked Example — TeamFlow Product Review Deck Design Spec

**Context:** `/ship-right-thing` complete. Unified Strategy Brief (Mediator) + PRD + Metric Plan ready. Designer prepares design spec for Layouter — Product Review Deck (12 slides, executive audience).

```markdown
# Design Spec: TeamFlow AI Summarization Product Review Deck

**Target Artifact:** Product Review Deck (executive sign-off presentation)
**Audience Level:** Executive (CEO, CPO, VP Sales, VP Product)
**Length:** 12 slide-like pages
**Distribution:** PDF email + presented live in review meeting
**Tone:** Sober, professional, data-forward (see GTM brief tone axes — 80% serious)

---

## Artifact Type Decision

**Why Deck, not PRD-as-document:**
- Audience = execs (5-10 minute scan; live presentation 30 min)
- Decision required = go/no-go sign-off (not reference material)
- Mid-market + enterprise B2B SaaS expectation = exec-grade visuals

**Secondary artifact:** Full PRD (40+ pages, document style) done separately for engineering/design team — via separate `$prd-template` skill. Deck references PRD in appendix.

---

## Information Architecture (12 pages)

| # | Page | Purpose | Emphasis | Key visual |
|:-:|------|---------|:--------:|------------|
| 1 | Cover | Anchor attention, set context | Hero | Large title, subtitle, date |
| 2 | Executive Summary (TL;DR) | 30-sec read gives full picture | Hero | Pull quote + 3 KPI cards |
| 3 | The Problem | Establish urgency with evidence | Key | 3 KPI cards «pain sizing» + callouts with verbatim quotes |
| 4 | The Opportunity | Scope of prize | Key | Metric tree with business impact arrows |
| 5 | Unified Strategy (Mediator synthesis) | Approach | Key | Vision statement + 4-principle list + tier architecture diagram |
| 6 | Product Scope (MoSCoW) | What ships, what doesn't | Key | Must/Should/Could table with scope rationale |
| 7 | User Experience | Feel of the product | Supporting | 3-4 wireframe thumbnails + flow arrows |
| 8 | Metrics & NSM | Success definition | Key | Metric tree + 30/90-day targets |
| 9 | Risks & Mitigations | Credibility | Key | Top 5 risks table with probability × impact matrix |
| 10 | Rollout Plan | Execution | Supporting | T-weeks timeline + phased rollout diagram |
| 11 | Investment & ROI | Business case | Key | 3-scenario forecast chart + cost breakdown |
| 12 | Roadmap Now/Next/Later | Future direction | Supporting | 3-column roadmap |

---

## Visual Hierarchy

### Typography Scale

| Level | Font | Size | Weight | Use |
|-------|------|:----:|:------:|-----|
| H1 (page title) | Inter | 32px | 700 | Page titles |
| H2 (section) | Inter | 22px | 600 | Within-page sections |
| H3 (subsection) | Inter | 16px | 600 | Subsections |
| Lead (intro para) | Inter | 16px | 400 | First paragraph on page |
| Body | Inter | 14px | 400 | Standard text |
| Pull-quote | Source Serif Pro | 20px | 400 | Key quotes, vision statements |
| KPI value | Inter | 32px | 700 | Large metric numbers |
| KPI label | Inter | 11px | 500 | Metric context |
| Caption | Inter | 10px | 400 | Page footers, source attributions |

### Color Palette

```css
--color-primary: #0A2540;     /* TeamFlow brand deep blue — headings, primary action color */
--color-accent: #F2A900;      /* TeamFlow amber — highlights, KPI borders, CTA */
--color-text: #1A1A1A;         /* Body text (near black) */
--color-text-muted: #6B6B6B;   /* Secondary text */
--color-bg: #FFFFFF;           /* Page background */
--color-bg-alt: #F7F9FB;       /* Callout background, alternate row */
--color-success: #22A06B;      /* Green metrics, positive signals */
--color-warning: #E67E22;      /* Amber warnings */
--color-danger: #C0392B;       /* Red alerts, pain-sizing metrics */
--color-border: #E1E4E8;       /* Subtle borders, table dividers */
```

**Rationale for sober palette:** B2B SaaS executive audiences respond to professional, data-forward. Too many colors → «consumer» feel. Use green / amber / red sparingly — only for sentiment-loaded metrics.

### Spacing System (8pt grid)

- `--space-1: 4px` (tight — between related items)
- `--space-2: 8px` (list item padding)
- `--space-3: 16px` (paragraph spacing)
- `--space-4: 24px` (between sections in page)
- `--space-5: 32px` (between major blocks)
- `--space-6: 48px` (rare — page header / hero)

---

## Key Visualizations (Detailed Specs)

### 1. KPI Card (used pages 2, 3, 11)

**Anatomy:**
```
┌─────────────────────────────────┐
│ [amber 3px left border]          │
│                                  │
│    40               ← big number │
│    ────              (32px 700)  │
│    Target Team Tier  ← label     │
│    Upgrades (Q2)     (11px 500)  │
│                                  │
└─────────────────────────────────┘
```

**Rules:**
- Max 1 number per card
- Label 1-2 lines max
- Group in grids of 3 (rule of three)
- Color number by sentiment: primary blue (default) / success green / danger red

**TeamFlow-specific examples:**
- Page 2: «40 Target Upgrades» / «+$8 Per-Seat Premium» / «3 hrs Weekly Time Saved»
- Page 3 (pain): «3-4 hrs Admin/week» / «40% Action Items Dropped» / «0% VP Visibility» (all danger red)

### 2. Pull Quote (pages 2, 3, 5)

**Anatomy:**
```
┌──────────────────────────────────────────┐
│▐ «Quote text in Source Serif Pro,        │
│▐  20px, line-height 1.4. Draws attention │
│▐  from scanner, not too large to read.»  │
└──────────────────────────────────────────┘
                        — Attribution (12px 400 muted)
```

**Rules:**
- Use for key vision statement or verbatim customer quote
- Max 1-2 per page
- Attribution line aligned right, muted color
- Left border 3px accent color; bg alt

### 3. Callout Box (all pages)

**Variants:**
- Neutral (accent border)
- Success (green border — positive signal)
- Warning (amber border — consideration)
- Danger (red border — risk / critical)

**Anatomy:**
```
┌──────────────────────────────────────────┐
│▐ Expected Outcome       ← title 600 weight
│▐ Description text wrapping normally...
└──────────────────────────────────────────┘
```

### 4. Metric Tree (page 4, 8)

**Anatomy:**
```
         NSM: Sticky Manager Ratio (AI Tier)
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
    Input:         Input:       Guardrails:
  New tier         Activation    NPS, Churn,
  conversions     rate           Support vol.
```

**Implementation:** SVG (for fidelity) or Mermaid (for authorability). TeamFlow prefers SVG produced from Figma.

### 5. Roadmap Columns (page 12)

**Anatomy:**
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ [accent top] │ │ [accent top] │ │ [accent top] │
│ NOW          │ │ NEXT         │ │ LATER        │
│ (Q2 2026)    │ │ (Q3 2026)    │ │ (Q4+)        │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ ✨ AI Summary│ │ 📊 Dashboard │ │ 🌍 Multi-lang│
│ ✨ Action items│ │ ⏱️ Real-time  │ │ 📱 Mobile app│
│ 🔐 SSO/SCIM  │ │ 🎯 Health Sc.│ │ 🔍 AI Coach  │
└─────────────┘ └─────────────┘ └─────────────┘
```

**Rules:**
- 3-5 items per column (don't overload)
- Emoji prefix for category hint (✨ feature / 🔐 security / 📊 analytics)
- Vertical line between items for scannability
- Accent top border maintains brand presence

### 6. Risk Matrix (page 9)

**Implementation:** 2×2 grid showing probability × impact:

```
           LOW IMPACT          HIGH IMPACT
HIGH  ┌──────────────┬──────────────┐
 PROB │ monitor       │ ⚠️ TOP RISKS │
      │               │ R1, R2, R3   │
      ├──────────────┼──────────────┤
 LOW  │ acceptable    │ watch list   │
 PROB │               │ R4, R5       │
      └──────────────┴──────────────┘
```

**Below matrix:** detailed Top 5 risks table with columns: #, Risk, Probability, Impact, Mitigation.

---

## Component Library for Layouter

**Files:** `components/` folder in design handoff

| Component | File | Usage |
|-----------|------|-------|
| `kpi-card.html` | Snippet | Metric showcases |
| `pull-quote.html` | Snippet | Vision statements, customer quotes |
| `callout-[variant].html` | 4 snippets | Warnings, successes, info |
| `roadmap-columns.html` | Snippet | Page 12 only |
| `metric-tree.svg` | Asset | Pages 4 + 8 |
| `risk-matrix.svg` | Asset | Page 9 |
| `page-footer.html` | Snippet | All pages |
| `meta-bar.html` | Snippet | All pages |

---

## Design-to-Layout Handoff Specifications

### CSS Tokens

All styles defined as CSS custom properties (see layouter output). Ensures:
- Easy re-skinning for white-label
- Consistent spacing / sizing
- Dark mode future-proof (tokens override easily)

### Print-Specific

- `@page { size: A4 portrait; margin: 2cm 1.8cm; }` — standard A4
- `.page { page-break-after: always; }` — each major section on own page
- `page-break-inside: avoid` on tables + callouts — prevent awkward splits
- `print-color-adjust: exact` — preserve brand colors on printed output

### Fonts Bundling

- **Embedded fonts** in PDF generation for consistency:
  - Inter (all weights): [Google Fonts CSS link — OK for web, but for PDF embed WOFF2 locally]
  - Source Serif Pro: similar — embed for PDF
- **Fallbacks** for missing fonts: `-apple-system, sans-serif` (Inter), `Georgia, serif` (Source Serif Pro)

### Assets Bundle

- TeamFlow logo (SVG + PNG 2×)
- Partner logos (if case studies referenced): Lattice comparison etc.
- Icons (lucide-react or similar — SVG inline)
- Chart images (exported PNG 2× from Figma for complex charts)

---

## Accessibility Requirements (WCAG AA)

- **Color contrast:** All text ≥ 4.5:1 against bg (verified: primary blue on white = 11:1)
- **Semantic HTML:** `<section>`, `<article>`, `<h1-h6>` hierarchy correct
- **Alt text** on all images + SVGs
- **Focus states** visible (if deck interactive) — not relevant for PDF, but matters if HTML shared online
- **Screen reader** labels on status badges, icons

---

## Deliverables for Layouter (handoff)

- [x] This design spec document (markdown)
- [x] CSS tokens file (`tokens.css`)
- [x] HTML snippets folder (`components/`)
- [x] SVG assets (`assets/`)
- [x] Font files (WOFF2 embedded)
- [x] Color / typography reference sheet (1-page PDF for quick reference)
- [x] Figma file with all screen mockups (hi-fi, exported pages) [link]
- [x] Asset export manifest (which images at which sizes)

---

## Sign-off Required

- [ ] PM (Alex K.) — content accuracy
- [ ] Design Lead (Jordan M.) — visual standards
- [ ] Brand team — consistency with TeamFlow identity
- [ ] Eng Lead (Priya S.) — feasibility from layout perspective

Target sign-off date: May 20, 2026. Layout production window: May 21 - June 10. Final deck ready for June 30 launch.

---

### Emphasis Map Summary

| Page | Emphasis | Elements |
|:----:|:--------:|----------|
| 1 Cover | Hero | Title 42px, subtitle, brand accent bar |
| 2 TL;DR | Hero | Pull quote, 3 KPI cards, section breaks |
| 3 Problem | Key | 3 danger KPIs, 2 verbatim callouts |
| 4 Opportunity | Key | Metric tree, impact arrows |
| 5 Strategy | Key | Vision quote, tier architecture |
| 6 Scope | Key | MoSCoW table, rationale |
| 7 UX | Supporting | 4 thumbnail wireframes, flow |
| 8 Metrics | Key | Metric tree (2nd), target table |
| 9 Risks | Key | 2×2 matrix + top 5 table |
| 10 Rollout | Supporting | T-weeks timeline (dense but detailed) |
| 11 Investment | Key | 3-scenario chart, cost breakdown |
| 12 Roadmap | Supporting | 3-column Now/Next/Later |
```

> **report-design lesson:** Design spec = contract between Designer + Layouter. CSS tokens + component library turn ad-hoc page-by-page work into systematic assembly. **Emphasis map** prevents every page being equally loud = information noise. Executive audience = sober palette + dense-but-clean content. **Accessibility requirements** (WCAG AA) — required for mid-market + enterprise procurement. Component library reused for future decks (Q3 Product Review, etc.) — investment compounds.
