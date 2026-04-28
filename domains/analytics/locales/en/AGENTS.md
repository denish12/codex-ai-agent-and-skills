# Analytics Domain Orchestrator

## Overview
The Analytics domain is a system of agents for business analytics and strategic analysis. Two competing teams (Analysts and Critics) independently research a question, then a Mediator evaluates the results and forms a final conclusion. A layout team prepares the PDF report.

## Pipeline (Full — `/analyze`, 5 sessions)
```
Session 1: CONDUCTOR → INTERVIEWER                                        → Handoff
Session 2: CONDUCTOR → ANALYSTS (RESEARCHER → DATA_ANALYST → STRATEGIST)  → Handoff
Session 3: CONDUCTOR → CRITICS  (RESEARCHER → DATA_ANALYST → STRATEGIST)  → Handoff
Session 4: CONDUCTOR → MEDIATOR                                           → Handoff
Session 5: CONDUCTOR → DESIGNER → LAYOUTER                                → PDF
```

## Pipeline (Quick — `/quick-insight`, 1 session)
```
CONDUCTOR → INTERVIEWER → RESEARCHER → DATA_ANALYST → STRATEGIST → MEDIATOR → DESIGNER → LAYOUTER → PDF
```

## Teams

| Team | Composition | Task |
|------|-------------|------|
| Analysts (Alpha) | Researcher → Data Analyst → Strategist | Research the question, form a strategy |
| Critics (Beta) | Researcher → Data Analyst → Strategist | Independent research + critique of Analysts + alternative strategy |
| Layout Team | Designer → Layouter | Report layout and PDF generation |

## Agents

| Role | File | Responsibility |
|------|------|----------------|
| Conductor | agents/conductor.md | Orchestration, session routing, gate control |
| Interviewer | agents/interviewer.md | Adaptive context gathering, scope definition |
| Researcher | agents/researcher.md | Fact collection, data gathering. Web search mandatory |
| Data Analyst | agents/data_analyst.md | Data structuring, patterns, frameworks |
| Strategist | agents/strategist.md | Conclusions, recommendations, action plans |
| Mediator | agents/mediator.md | Evaluation of both teams, final conclusion |
| Designer | agents/designer.md | Report layout, visualizations, palette |
| Layouter | agents/layouter.md | HTML/CSS → PDF, charts, document assembly |

## Workflows

| Command | Mode | Gates |
|---------|------|-------|
| /analyze | Full Pipeline (5 sessions) | CONDUCTOR → INTERVIEWER → ANALYSTS → CRITICS → MEDIATOR → DESIGNER → LAYOUTER → RG |
| /quick-insight | Quick Pipeline (1 session) | CONDUCTOR → INTERVIEWER → ANALYSTS → MEDIATOR → DESIGNER → LAYOUTER → RG |

## Skills

### Conductor
- $board — task board management
- $handoff — handoff between gates and sessions
- $gates — gate quality control
- $session-prompt-generator — next session prompt generation

### Interviewer
- $board — task board updates
- $handoff — research brief formation

### Researcher
- $web-research — mandatory web search and data verification
- $trend-analysis — trend analysis
- $competitive-analysis — competitive analysis

### Data Analyst
- $swot-analysis — SWOT analysis
- $pest-analysis — PEST/PESTEL analysis
- $porters-five-forces — Porter's 5 Forces
- $bcg-matrix — BCG matrix
- $blue-ocean-strategy — Blue Ocean strategy
- $ansoff-matrix — Ansoff matrix
- $value-chain-analysis — value chain analysis
- $tam-sam-som — market sizing
- $customer-journey-mapping — customer journey mapping
- $jtbd-analysis — Jobs To Be Done
- $rfm-analysis — RFM segmentation
- $icp-buyer-persona — ideal customer profile
- $unit-economics — unit economics
- $cohort-analysis — cohort analysis

### Strategist
- $swot-analysis — SWOT analysis (strategic synthesis)
- $blue-ocean-strategy — Blue Ocean strategy
- $ansoff-matrix — Ansoff matrix
- $value-chain-analysis — value chain analysis

### Mediator
- $handoff — receiving results from both teams
- $gates — final quality check

### Designer
- $report-design — report layout design

### Layouter
- $html-pdf-report — HTML/CSS → PDF generation

### Cross-cutting / Quality (all agents in the domain)
- $karpathy-guidelines — mandatory before any non-trivial task
