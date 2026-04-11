---
name: quick-insight
description: Quick analytical pipeline — 1 session, one team, logic mediation, PDF report
---

# Workflow: /quick-insight — Quick Analytical Pipeline (1 session)

## Description
A simplified, rapid analytical pipeline contained within a single session. One single Analysts team (no Critics); the Mediator verifies logical chaining, and the designers layout a PDF report. Designed for simple, direct questions and quick checks.

> **Pipeline rules:** This workflow adheres to `analytics-pipeline-rules.md` — all 7 rules, mandatory checks, and the escalation protocol apply strictly, identical to /analyze.

## When to use

| Criterion | /quick-insight (Quick) | /analyze (Full) |
|-----------|:----------------------:|:---------------:|
| Complexity of the question | Low: single framework, fast check | High: multifactorial, strategic |
| Stakes | Low: internal report, exploration | High: investments, market entries |
| Devil's advocate needed? | No | Yes |
| PDF report | Yes (simplified) | Yes (comprehensive with Appendix A-D) |
| Time budget | 1 session (30-60 min) | 5 sessions (2-4 hours) |
| Preliminary check | ✅ Proving a hypothesis before full /analyze | |

## When NOT to use
- A complex strategic question with high stakes → `/analyze`.
- Necessitating the cross-check of arguments by a secondary team → `/analyze`.
- The decision impacts mission-critical business processes → `/analyze`.
- In doubt → `/analyze` (always lean towards thoroughness).

> Full Pipeline is documented in `analyze.md`.

## Workflow Inputs

| Field | Required | Description |
|-------|:--------:|-------------|
| Question / topic | ✅ | What needs to be analyzed |
| User's data | ⬚ | Readily available data, metrics |
| Industry / market | ⬚ | If known |

---

## Pipeline (1 session)

```
COND-01 → INT-01 → RES-01 → AN-01 → ST-01 → MED-01 → DS-01 → LY-01
```

All 8 gates operate inside one session. Cross-session handoff files are omitted.

### Parallelism

| Gates | Parallel? | Reason |
|-------|:---------:|--------|
| COND-01 → LY-01 | ❌ Sequentially strict | Every gate requires completion of the predecessor |

---

## Gates and deliverables

### COND-01: Conductor
**Input:** User request
**Actions:**
1. Ascertain the scope and explicitly confirm the `/quick-insight` mode (or suggest switching to `/analyze`).
2. Initialize the board (`$board` — Quick Pipeline, 8 gates).
3. Compose the task definition for the Interviewer.
4. `$gates` → `$handoff` → INT-01.
**Required skills:** `$board`, `$gates`, `$handoff`
**Deliverable:** Board (Quick Pipeline) + Handoff Envelope → INT-01
**→ Wait for "Approved"**

### INT-01: Interviewer
**Input:** `$handoff` from COND-01
**Actions:**
1. Formulate a short, adaptive interview (3-5 questions focusing on scope and intention).
2. Determine: question, industry, data sources, aim, and Mediator's validation methodology.
3. Establish a coherent Research Brief (compact format).
4. `$gates` → `$handoff` → RES-01.
**Required skills:** `$gates`, `$handoff`
**Deliverable:** Research Brief (scope, central questions, data origins, assessing logic)
**→ Wait for "Approved"**

### RES-01: Researcher
**Input:** Research Brief
**Actions:**
1. Garner evidence and details corresponding to the Research Brief's key questions.
2. **Mandatory** web search (`$web-research`) — verify + augment data.
3. Collate the findings as a Research Package (facts + links + Tier + confidence status).
4. `$gates` → `$handoff` → AN-01.
**Required skills:** `$web-research`, `$gates`, `$handoff`
**Deliverable:** Research Package (data bundled with URLs, dates, authenticity levels ✅/⚠️/🔮)
**→ Wait for "Approved"**

### AN-01: Data Analyst
**Input:** Research Package + Research Brief
**Actions:**
1. Select 1-3 applicable analytical frameworks (browse catalog).
2. Expose the data package to the frameworks.
3. Structurize findings, isolate patterns.
4. `$gates` (dependency check: data cited correctly from RES-01) → `$handoff` → ST-01.
**Required skills:** Elected frameworks, `$gates`, `$handoff`
**Deliverable:** Analytical Report (compact: frameworks + observed patterns + insight deductions)
**→ Wait for "Approved"**

### ST-01: Strategist
**Input:** Research Package + Analytical Report
**Actions:**
1. Melt data and analysis into cohesive structural recommendations.
2. Form a succinct risk appraisal.
3. Define the Action Plan (top-3 priorities furnished with targets).
4. `$gates` (dependency check: AN-01 & RES-01 pieces of evidence properly incorporated) → `$handoff` → MED-01.
**Required skills:** `$gates`, `$handoff`
**Deliverable:** Strategy Report (compact: recommendations + risk factors + action map)
**→ Wait for "Approved"**

### MED-01: Mediator
**Input:** Research Brief + Research Package + Analytical Report + Strategy Report
**Actions:**
1. Subject the narrative to the logical chain check-list:

   | # | Check | Appraisal |
   |---|-------|:---------:|
   | 1 | Research data → independently corroborated via `$web-research`? | ✅ / ⚠️ / ❌ |
   | 2 | Analyst's conclusions → rigorously trace back to Research data (no leaps)? | ✅ / ⚠️ / ❌ |
   | 3 | Strategist's strategy → organically emanates from the analytics? | ✅ / ⚠️ / ❌ |
   | 4 | Frameworks utilized congruently (Quality Gates effectively passed)? | ✅ / ⚠️ / ❌ |
   | 5 | Actionable recommendations (incorporating action + indicator + schedule)? | ✅ / ⚠️ / ❌ |
   | 6 | Potential pitfalls diagnosed and counteracted? | ✅ / ⚠️ / ❌ |
   | 7 | Total absence of logical dissonances spanning the reports? | ✅ / ⚠️ / ❌ |

2. Deliver Conclusion:
   - Overall grade of the analysis.
   - Core findings (3-5 points).
   - Unified final recommendation.
   - Disclaimers/Limitations (exemptions forced by the swift Quick-mode profile).
3. `$gates` → `$handoff` → DS-01.
**Required skills:** `$gates`, `$handoff`
**Deliverable:** Quick Conclusion (logical alignment verification + findings + propositions + constraints)
**→ Wait for "Approved"**

### DS-01: Designer
**Input:** Quick Conclusion + Research Package + Analytical Report + Strategy Report
**Actions:**
1. Formulate architecture of a simplified report (`$report-design`).
2. Elect diagrammatic logic components (decision tree via `$report-design`).
3. Frame up a distinct palette and narrative hierarchy.
4. Construct the executive summary wrapper.
5. `$gates` → `$handoff` → LY-01.
**Required skills:** `$report-design`, `$gates`, `$handoff`
**Deliverable:** Report Design Spec (compact: structure + vis. map + color theory + executive intro)
**→ Wait for "Approved"**

### LY-01: Layouter
**Input:** Report Design Spec + comprehensive data blocks compiled thus far
**Actions:**
1. Transpile into HTML bearing internal CSS (`$html-pdf-report`).
2. Configure Chart.js logic graphs & render Mermaid schematics.
3. Execute condensed structuring layout (Skip Appendix B — no parallel teams critique; Skip Appendix D — no Synthesis required).
4. Run testing metrics sequence for static PDF conversion (8 queries from `$html-pdf-report`).
5. `$gates` → Validate via internal Release Gate mechanism:
   - [ ] All respective gate nodes state [✓] within `$board`
   - [ ] PDF structure encompasses: Title, TOC, Exec Summary, Main Sections, Appendix A (Analyzed Metrics), Appendix B (Mediator's verification reasoning log)
   - [ ] Embedded assertions feature verified tags (URLs affixed)
   - [ ] Visual artifacts generate safely (animations disabled, Mermaid correctly transpiled)

**Decision Node:** GO ✅ / NO-GO ❌ / GO-with-conditions ⚠️
**Required skills:** `$html-pdf-report`, `$gates`, `$handoff`
**Deliverable:** Standalone HTML package (Prefigured for Print-to-PDF pipeline)
**→ Wait for "Approved"**

---

## Reverse Handoff — loopback protocol

| From Gate | Motivation | Bounce sequence | Consequence |
|-----------|------------|-----------------|-------------|
| AN-01 | Deficiency in primary datasets backing frameworks | RES-01 | Conduct supplementary search sweeps |
| ST-01 | Analysis narrative misses core briefing themes | AN-01 | Incorporate additional framework lenses |
| MED-01 | Deductive rupture detected | RES-01 or AN-01 | Location-dependent back-tracing iteration |
| DS-01 | Void of numerically representable material | MED-01 | Enforce clearer quantitative findings |
| LY-01 | Design blueprint missing fundamental directives | DS-01 | Retouch specifications |

### Rebound Protocol
1. Subsystem creates Reverse Handoff through `$handoff` (indicating alterations + strict immutable elements).
2. Board tracker `$board` synchronizes states: current stage → [↩], target phase → [→].
3. After modification — reiterate the `$gates` verification threshold.

> During Quick Pipeline functionality — all return pathways are confined to the localized session sequence preventing context bleed.

---

## Structure of the Quick PDF Report

```
Title Page
Table of Contents
Executive Summary
Core Section (Mediator's Conclusion Output)
  ├─ Critical Findings (3-5 points)
  ├─ Quantitative Visualizations
  ├─ Strategy Output + Functional Roadmaps
  └─ Inherent Constraints stemming from Quick-mode deployment
Appendix A — Operational Data Logs (Research + Diagnostics + Plan)
Appendix B — Neutral Verification Protocol (Checklists + Argumentation Log)
Appendix C — Bibliography & Provenance (URL origins, Datestamp, Fidelity Index)
```

> **Absent elements:** Team Critic Appendix (owing to 1 team topology) alongside Final Synthesis comparisons.

---

## Accessible Analytical Frameworks Compendium (For AN-01 Application)

| Methodology | Respective Skill | Situational Match |
|-------------|------------------|-------------------|
| SWOT | `$swot-analysis` | Assessing broad strategic posturing |
| TAM/SAM/SOM | `$tam-sam-som` | Quantifying market saturation possibilities |
| Competitive Analysis | `$competitive-analysis` | Diagnosing adversary layouts / market heat map |
| PEST/PESTEL | `$pest-analysis` | Interpreting macroscopic shifting pressures |
| Porter's 5 Forces | `$porters-five-forces` | Checking sector stability & allure |
| BCG Matrix | `$bcg-matrix` | Categorizing internal operations / offerings |
| Ansoff Matrix | `$ansoff-matrix` | Graphing paths for corporate scaling |
| Blue Ocean | `$blue-ocean-strategy` | Inventing uncontested zones |
| Value Chain | `$value-chain-analysis` | Identifying operational value leaks / enhancements |
| Cohort Analysis | `$cohort-analysis` | Observing retention lifespan grouped parameters |
| RFM Analysis | `$rfm-analysis` | Calibrating buyer segmentation groups |
| Unit Economics | `$unit-economics` | Analyzing atomic margin yields, CAC versus LTV |
| Trend Analysis | `$trend-analysis` | Chronological extrapolation mapping |
| Customer Journey | `$customer-journey-mapping` | Decoding step-by-step UX pain points |
| ICP / Buyer Persona | `$icp-buyer-persona` | Distilling archetypal user characteristics |
| JTBD | `$jtbd-analysis` | Discovering core objective motives |

**Defining Rule regarding Quick Pipeline operation:** Deployment confined to 1-3 analytical structures per launch (as opposed to minimum 2 frameworks mapped within the Full pipeline).

---

## Example — Quick Pipeline mid-flight (AN-01 operations engaged)

```
📊 Process Rate: 38% (3/8) | Avg transit timing: 6 mins | Active Blockages: 0 | Backtracks: 0

| # | ID | Gate phase | Integrity Status | Deliverable Output |
|---|----|------------|:----------------:|--------------------|
| 1 | COND-01 | Conductor System | [✓] | Quick Pipeline, Parameter scope: Unit Economics targeted start-up metrics |
| 2 | INT-01 | Extraction Logic | [✓] | Prompt Summary: 5 interrogations, target: B2B SaaS, baseline: $500K ARR rate |
| 3 | RES-01 | Sourcing Extractor| [✓] | Discovered 18 origins, Authenticity confirmed roughly at 68% 🟡 |
| 4 | AN-01 | Data Analytics | [→] | Currently synthesizing: unit-economics calculations nested against competitive-analysis overlays |
| 5 | ST-01 | Strategic Director | [ ] | — |
| 6 | MED-01 | Adjudicator | [ ] | — |
| 7 | DS-01 | Design Orchestrator| [ ] | — |
| 8 | LY-01 | Assembly + RG Gate | [ ] | — |
```

---

## Divergence Key: Quick configuration against Full configuration properties

| Parameter Characteristic | Configuration: Quick (`/quick-insight`) | Configuration: Full (`/analyze`) |
|--------------------------|:---------------------------------------:|:--------------------------------:|
| Phase Sessions allocated | 1 | 5 |
| Individual Gate Checks | 8 | 15 |
| Assembled Analytical Nodes | 1 single-vector alignment (Alpha variant) | 2 oppositional segments (Alpha versus Beta forces) |
| Active Bridge Inter-session links | None required | Hard requirement (session-N-handoff sequence) |
| Active Logic modules requested | Limits bounding at 1-3 | Absolute floor requirement of at least 2 models requested |
| Adjudication Directives | Rigid tracing analysis spanning chronological outputs | Direct adversarial contrasting evaluation (A v B output mapping) |
| Attached Appendix elements | Index A (Analyzed), Index B (Tracing details), Index C (Origin Citations) | Appendix A-B matching node reports, C Mediator logs, + synthesized D |
| `$session-prompt-generator` usage | Unnecessary payload weight | Critical path dependency requiring payload transition |
| Scope-creep protocols | Trigger response to escalate → re-route mapping → /analyze parameter | — |

> **Scope-creep rule parameter behavior:** If an analysis vector reveals deeper necessary inquiries than predicted within Quick Pipeline parameters (requiring oppositional review checks, multiple modeling tests simultaneously executing due to stake elevation requirements) — systemic rules dictate Conductor to recommend overriding parameters towards sequence implementation corresponding strictly parallel with /analyze mechanics. Authorized manual user verification operates final toggle sequence parameter.

---

## Starting prompt initiation framework

```
Quick inquiry brief: [insert analytical focal question].

Acquired data pool: [if presently available insert here]
Associated industry parameter: [insert field here if strictly relevant]

Commence subroutine /quick-insight.
```
