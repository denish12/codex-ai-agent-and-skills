# Product Domain Orchestrator

## Overview
The product domain is an agent system for **B2B SaaS product management**: from discovery to release. Two adversarial axes provide decision stability:
- **Customer-Champion vs Business-Champion** — at the strategic level (why and for whom).
- **Build-Camp vs Cut-Camp** — at prioritization (how much and what scope).

Mediator synthesizes the results of both camps. Designer + Layouter prepare the PRD / Product Review Deck as PDF.

## Pipeline A — `/ship-right-thing` (Customer-vs-Business, 6 sessions)
```
Session 1: CONDUCTOR → DISCOVERY                                        → Handoff
Session 2: CONDUCTOR → CUSTOMER-CHAMPION (product_strategist α)         → Handoff
Session 3: CONDUCTOR → BUSINESS-CHAMPION (product_strategist β)         → Handoff
Session 4: CONDUCTOR → MEDIATOR                                         → Handoff
Session 5: CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD + DATA_ANALYST      → Handoff
Session 6: CONDUCTOR → DESIGNER → LAYOUTER                              → PDF
```

## Pipeline B — `/shape-prioritize` (Build-vs-Cut, 6 sessions)
Triggered when strategy is already approved — discussion focuses on scope.
```
Session 1: CONDUCTOR → DISCOVERY (scope intake)                         → Handoff
Session 2: CONDUCTOR → BUILD-CAMP (pm α + tech_lead α)                  → Handoff
Session 3: CONDUCTOR → CUT-CAMP (pm β + tech_lead β)                    → Handoff
Session 4: CONDUCTOR → MEDIATOR                                         → Handoff
Session 5: CONDUCTOR → PM → UX_DESIGNER + DATA_ANALYST                  → Handoff
Session 6: CONDUCTOR → DESIGNER → LAYOUTER                              → PDF (PRD)
```

## Pipeline Quick — `/quick-pm` (1 session, no adversarial)
```
CONDUCTOR → DISCOVERY → product_strategist → PM → TECH_LEAD → DATA_ANALYST → PDF
```

## Pipeline Spec — `/spec` (1 session, PRD only)
```
CONDUCTOR → PM → UX_DESIGNER + TECH_LEAD → PRD (markdown)
```

## Teams (adversarial)

| Team | Active in | Composition | Task |
|---------|-----------|--------|--------|
| Customer-Champion (Alpha) | /ship-right-thing | product_strategist α | Strategy around user value, JTBD, adoption |
| Business-Champion (Beta) | /ship-right-thing | product_strategist β | Strategy around revenue, margin, strategic moats |
| Build-Camp (Alpha) | /shape-prioritize | pm α + tech_lead α | Maximum scope: every feature is justified |
| Cut-Camp (Beta) | /shape-prioritize | pm β + tech_lead β | Minimum scope: cut everything that can be cut |
| Layout Team | all pipelines with PDF | Designer → Layouter | Layout and typesetting of PRD / Product Review Deck |

## Agents

| Role | File | Area of Responsibility |
|------|-------|---------------------|
| Conductor | agents/conductor.md | Orchestration, session routing, gate control |
| Discovery | agents/discovery.md | Scope, user research intake, jobs, assumptions |
| Product Strategist | agents/product_strategist.md | Vision, OKR, NSM, roadmap. Plays both sides in Customer-vs-Business |
| PM | agents/pm.md | Prioritization, PRD, stories. Plays both sides in Build-vs-Cut |
| UX Designer | agents/ux_designer.md | Wireframes, user flows, design brief |
| Tech Lead | agents/tech_lead.md | Feasibility, breakdown, risk, non-functional requirements |
| Data Analyst | agents/data_analyst.md | Experiment design, SaaS metrics, AARRR, hypothesis validation |
| Mediator | agents/mediator.md | Impartial synthesis of Customer/Business and Build/Cut |
| Designer | agents/designer.md | PRD / Product Review Deck layout, visualizations |
| Layouter | agents/layouter.md | HTML/CSS → PDF, charts, document assembly |

## Workflow

| Command | Mode | Adversarial Axis |
|---------|-------|-----------------|
| /ship-right-thing | Full Pipeline A (6 sessions) | Customer-Champion vs Business-Champion |
| /shape-prioritize | Full Pipeline B (6 sessions) | Build-Camp vs Cut-Camp |
| /spec | PRD Only (1 session) | — |
| /quick-pm | Quick Pipeline (1 session) | — |

## Skills by Agent

### Conductor
- $board — task board
- $handoff — handoff between gates/sessions
- $gates — gate control
- $session-prompt-generator — next session prompt

### Discovery
- $user-interview-script — B2B interview script
- $jtbd-canvas — Jobs-to-be-Done
- $opportunity-solution-tree — opportunity-solution tree
- $problem-statement — problem statement
- $assumption-mapping — assumption map
- $board, $handoff

### Product Strategist
- $product-vision — product vision
- $okr-framework — OKR
- $north-star-metric — NSM
- $product-roadmap — product roadmap
- $kano-model — Kano model
- $handoff

### PM
- $rice-scoring — RICE
- $moscow-prioritization — MoSCoW
- $wsjf-scoring — WSJF (for enterprise)
- $prd-template — PRD
- $user-story — user stories
- $acceptance-criteria — acceptance criteria
- $epic-breakdown — epic breakdown
- $kano-model — Kano model (for scope discussions)
- $handoff

### UX Designer
- $design-brief — design brief
- $user-flow — user flows
- $handoff

### Tech Lead
- $epic-breakdown — epic breakdown
- $handoff

### Data Analyst
- $hypothesis-template — hypothesis
- $ab-test-design — A/B test design
- $saas-metrics — B2B SaaS metrics
- $aarrr-metrics — AARRR
- $north-star-metric — NSM (for metric design)
- $handoff

### Mediator
- $handoff — receiving results from both camps
- $gates — final check

### Designer
- $report-design — PRD / Product Review Deck layout

### Layouter
- $html-pdf-report — HTML/CSS → PDF

### Release (cross-agent skills)
- $launch-checklist — launch checklist
- $gtm-brief — GTM brief (handoff to marketing/sales)
- $release-notes — release notes for B2B clients

### Cross-cutting / Quality (all agents in the domain)
- $karpathy-guidelines — mandatory before any non-trivial task

## MCP Integrations (expected)
- **mempalace** — long-term product memory, decisions, discovery artifacts
- **shadcn + tailwindcss + stitch** — for UI mockups via UX designer
- **scheduled-tasks** — discovery cadence, regular reviews

## Localization
- Default: `ru`
- Available: `ru` (v1.0), `en` (v1.1+)
