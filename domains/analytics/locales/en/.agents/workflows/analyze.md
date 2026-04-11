# Workflow: /analyze — Full Analytics Pipeline (5 sessions)

## Description
Full analytical pipeline with an adversarial approach. Two competing teams (Analysts and Critics) independently research a question, the Mediator evaluates results, and the layout team prepares a PDF report. Split across 5 sessions for context window management.

## When to Use
- Complex strategic question with high stakes.
- Need a devil's advocate — argument verification by a second team.
- PDF report with visualizations required for presentation.
- Decision impacts business strategy, investments, or market entry.

## When NOT to Use
- Simple analytical question → `/quick-insight`.
- Need a quick answer without PDF → `/quick-insight`.
- When in doubt → **use** `/analyze` (better safe than sorry).

## Workflow Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Question / topic | ✅ | What needs to be analyzed — from user |
| User data | ⬚ | Any available data, reports, metrics |
| Industry / market | ⬚ | If known in advance. Otherwise determined by Interviewer |
| Budget / resources | ⬚ | Context for strategic recommendations |
| Deadline | ⬚ | Impacts research depth |

---

## Pipeline (5 sessions)

```
┌─────────── Session 1 ──────────┐
│ CONDUCTOR → INTERVIEWER         │ → session-1-handoff.md
└─────────────────────────────────┘

┌─────────── Session 2 ──────────┐
│ CONDUCTOR → RESEARCHER(α)      │
│          → DATA_ANALYST(α)     │
│          → STRATEGIST(α)       │ → session-2-handoff.md
└─────────────────────────────────┘

┌─────────── Session 3 ──────────┐
│ CONDUCTOR → RESEARCHER(β)      │
│          → DATA_ANALYST(β)     │
│          → STRATEGIST(β)       │ → session-3-handoff.md
└─────────────────────────────────┘

┌─────────── Session 4 ──────────┐
│ CONDUCTOR → MEDIATOR            │ → session-4-handoff.md
│ (opt. 4.5: MEDIATOR Synthesis)  │
└─────────────────────────────────┘

┌─────────── Session 5 ──────────┐
│ CONDUCTOR → DESIGNER → LAYOUTER │ → PDF report
│          → RELEASE GATE         │
└─────────────────────────────────┘
```

---

## Gates and Deliverables by Session

### Session 1: Interview

#### Gate 1.1: Conductor
**Input:** User task
**Actions:**
1. Determine scope and question complexity.
2. Confirm `/analyze` mode (or switch to `/quick-insight`).
3. Initialize board (`$board` — Full Pipeline).
4. Formulate task for Interviewer.
5. `$handoff` → Interviewer.
**Required skills:** `$board`, `$handoff`
**→ Wait for "Approved"**

#### Gate 1.2: Interviewer
**Input:** `$handoff` from Conductor
**Actions:**
1. Adaptive interview — ask questions until sufficient context.
2. Determine: question, industry, data, goal, timeline, Mediator evaluation method.
3. Form Research Brief.
4. `$handoff` → Conductor.
**Deliverable:** Research Brief
**→ Wait for "Approved"**

#### Session 1 Completion
Conductor saves `docs/analytics/session-1-handoff.md` + generates prompt for Session 2.

---

### Session 2: Analysts Team (Alpha)

#### Gate 2.0: Conductor (initialization)
Parse handoff → load context → announce Session 2 → set team mode Alpha → `$handoff` → Researcher.

#### Gate 2.1: Researcher (Alpha)
Collect facts via `$web-research` (mandatory) → Research Package → `$handoff` → Data Analyst.

#### Gate 2.2: Data Analyst (Alpha)
Select 2-5 frameworks → apply to data → Analytical Report → `$handoff` → Strategist.

#### Gate 2.3: Strategist (Alpha)
Synthesize into strategy → recommendations + risks + action plan → Alpha Strategy Report.

#### Session 2 Completion
Conductor saves `docs/analytics/session-2-handoff.md` + prompt for Session 3.

---

### Session 3: Critics Team (Beta)

#### Gate 3.0: Conductor (initialization)
Parse handoff → load Alpha output → announce Session 3 → set team mode Beta.

#### Gate 3.1: Researcher (Beta)
Independent research + counter-evidence search + Alpha gap analysis → Beta Research Package.

#### Gate 3.2: Data Analyst (Beta)
Critique Alpha's analysis + apply missed frameworks + alternative analysis → Beta Analytical Report.

#### Gate 3.3: Strategist (Beta)
Point-by-point critique of Alpha strategy + alternative strategy → Beta Strategy Report.

#### Session 3 Completion
Conductor saves `docs/analytics/session-3-handoff.md` + prompt for Session 4.

---

### Session 4: Mediation

#### Gate 4.1: Mediator
Comparative analysis → apply evaluation method → final conclusion → propose synthesis.
**Deliverable:** Mediated Conclusion

#### Gate 4.5 (optional): Synthesis
If user approves → integrate best elements → Appendix D.

#### Session 4 Completion
Conductor saves `docs/analytics/session-4-handoff.md` + prompt for Session 5.

---

### Session 5: Report

#### Gate 5.1: Designer
Design report structure → select visualizations → executive summary → Report Design Spec.

#### Gate 5.2: Layouter
Generate HTML with inline CSS → Chart.js + Mermaid → appendices → self-contained HTML file.

#### Gate 5.3: Release Gate
All sessions complete, all gates passed, PDF valid → GO / NO-GO.

---

## Starter Prompt Template

```
I need a deep analysis: [describe the question].

Context:
- Industry: [industry]
- Available data: [what you have]
- Goal: [why you need this analysis]
- Deadline: [if any]

Run /analyze.
```
