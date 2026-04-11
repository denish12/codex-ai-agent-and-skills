# Workflow: /quick-insight — Quick Analytics Pipeline (1 session)

## Description
Simplified analytical pipeline in a single session. Only the Analysts team (no Critics), the Mediator forms a conclusion without adversarial analysis, and the layout team prepares a PDF report. Suitable for simple questions and quick checks.

## When to Use
- Simple analytical question that doesn't require a devil's advocate.
- Need a quick answer with visualization.
- Single framework or limited set of frameworks.
- Preliminary hypothesis check before a full `/analyze`.

## When NOT to Use
- Complex strategic question with high stakes → `/analyze`.
- Need argument verification by a second team → `/analyze`.
- Decision impacts critical business processes → `/analyze`.
- When in doubt → `/analyze`.

## Workflow Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Question / topic | ✅ | What needs to be analyzed |
| User data | ⬚ | Available data, metrics |
| Industry / market | ⬚ | If known |

## Pipeline (1 session)

```
CONDUCTOR → INTERVIEWER → RESEARCHER(α) → DATA_ANALYST(α) → STRATEGIST(α) → MEDIATOR → DESIGNER → LAYOUTER → RELEASE GATE
    G1           G2            G3               G4                G5             G6          G7         G8         G9
```

---

## Gates and Deliverables

### Gate 1: Conductor
Initialize board, confirm `/quick-insight` mode. **→ Wait for "Approved"**

### Gate 2: Interviewer
Brief interview (3-5 questions), form Research Brief. **→ Wait for "Approved"**

### Gate 3: Researcher (Alpha)
Collect facts (`$web-research` mandatory), verify user data. **→ Wait for "Approved"**

### Gate 4: Data Analyst (Alpha)
Select 1-3 frameworks, apply to data. **→ Wait for "Approved"**

### Gate 5: Strategist (Alpha)
Synthesize into recommendations, risk assessment, action plan. **→ Wait for "Approved"**

### Gate 6: Mediator
Evaluate analysis quality, form conclusion and recommendations. **→ Wait for "Approved"**

### Gate 7: Designer
Design compact report layout, select visualizations. **→ Wait for "Approved"**

### Gate 8: Layouter
Generate HTML file with inline CSS → Print-to-PDF. **→ Wait for "Approved"**

### Gate 9: Release Gate
All gates passed, PDF valid → GO / NO-GO.

---

## Quick PDF Report Structure

```
Title Page
Table of Contents
Main Section (Mediator's Conclusion)
  ├─ Executive Summary
  ├─ Key Findings
  ├─ Visualizations
  └─ Recommendations
Appendix A — Analysts Team Report
Appendix C — Mediator's Reasoning
```

> Appendix B (Critics) and Appendix D (Synthesis) are absent in Quick Pipeline.

---

## Starter Prompt Template

```
Quick question: [describe the question].

Data: [if available]
Industry: [if relevant]

Run /quick-insight.
```
