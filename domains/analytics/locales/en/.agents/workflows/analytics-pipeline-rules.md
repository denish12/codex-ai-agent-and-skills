---
name: analytics-pipeline-rules
description: Absolute rules for the analytics pipeline — gates, discipline, multi-session protocol
---

# Analytics Pipeline Rules

> [!CAUTION]
> **🔴 ABSOLUTE RULE #1:** The pipeline cannot be skipped. No exceptions.
> Each gate → read agent → deliverable → HANDOFF → **User sign-off** → next gate.

---

## Three Pipeline Modes

### 🔵 Full Pipeline (`/analyze`) — 5 sessions
Complete analytical cycle with two competing teams, mediation, and PDF report.

```
Session 1: CONDUCTOR → INTERVIEWER
Session 2: CONDUCTOR → ANALYSTS (RESEARCHER → DATA_ANALYST → STRATEGIST)
Session 3: CONDUCTOR → CRITICS  (RESEARCHER → DATA_ANALYST → STRATEGIST)
Session 4: CONDUCTOR → MEDIATOR
Session 5: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE GATE
```

### 🟢 Quick Pipeline (`/quick-insight`) — 1 session
Single team, no critics. For simple questions where adversarial analysis is excessive.

```
CONDUCTOR → INTERVIEWER → RESEARCHER → DATA_ANALYST → STRATEGIST → MEDIATOR → DESIGNER → LAYOUTER → RELEASE GATE
```

---

## Decision Tree — Mode Selection

```
User task
       │
       ├── Complex strategic question? High stakes? Need devil's advocate?
       │   └── YES → /analyze (Full Pipeline, 5 sessions)
       │
       ├── Simple analytical question? Single framework? Quick check?
       │   └── YES → /quick-insight (Quick Pipeline, 1 session)
       │
       ├── User explicitly specified mode?
       │   └── Use specified mode
       │
       └── Uncertain?
           └── /analyze (better safe than sorry)
```

---

## Mandatory Discipline (MANDATORY ENFORCEMENT)

### Rule 1: Gates cannot be skipped
- Gate order is defined by the workflow mode.
- Each gate requires: deliverable + `$handoff` + `$gates` PASS + user sign-off.
- Skipping a gate → 🔴 **P0 / BLOCKER**.

### Rule 2: User sign-off at every gate
- Transition to the next gate — **only** after explicit "Approved" from the user.
- During sign-off, the user **verifies** that the AI correctly loaded the agent and its skills.
- `ShouldAutoProceed = false` ALWAYS.

### Rule 3: Agent protocol — step by step
- Each § (paragraph) in `agents/<role>.md` is a separate action.
- Cannot "collapse" multiple steps into one.
- Before writing a deliverable — complete ALL protocol steps.

### Rule 4: Web search is mandatory
- The Researcher **must** use `$web-research` on every run.
- User-provided data **must** be verified through external sources.
- Without web search, a deliverable is considered **INCOMPLETE**.

### Rule 5: Team Mode is strictly defined
- The Conductor determines team mode (Alpha/Beta) in the Handoff Envelope.
- Researcher, Data Analyst, and Strategist must follow the assigned mode.
- Critics (Beta) **must** receive the full Analysts (Alpha) report as input.

### Rule 6: Multi-session protocol
- In the Full Pipeline, each session ends with saving `docs/analytics/session-N-handoff.md`.
- The handoff file contains **full artifact text** (not references — the next session has no context).
- A ready prompt for the next session is generated (`$session-prompt-generator`).
- Without a handoff file, the session is considered **INCOMPLETE**.

### Rule 7: Mediator — impartiality
- The Mediator evaluates argument and evidence quality, **not text volume**.
- Evaluation mode (scoring/qualitative/synthesis) is determined during the interview.
- Synthesis (Appendix D) — only upon Mediator's proposal and user approval.

---

## Handoff Envelope — mandatory format

```markdown
---
## HANDOFF ENVELOPE
From: <Gate>
To: <Gate>
Team: Alpha | Beta | N/A
Session: N of M
Date: YYYY-MM-DD

### Context Pack
- Goal: [Analysis goal]
- Scope: [In / Out]
- Constraints: [Constraints]
- Inputs: [What was received]
- Decisions: [Decisions at this gate]
- Open Questions: [Unresolved questions]
- Data Sources: [Sources used]
- DoD: [Definition of Done]
- Output Format: [Deliverable format]
---
```

---

## Reverse Handoff Protocol

When a problem is discovered at a subsequent gate:
1. The agent forms a Reverse Handoff describing the problem.
2. The Conductor routes the return to the appropriate gate.
3. The board (`$board`) is updated: current gate → `[↩]`, return gate → `[→]`.
4. After correction — re-check via `$gates`.

---

## Priority Format

- 🔴 **P0 / BLOCKER** — blocks progress / report publication
- 🟠 **P1 / IMPORTANT** — must fix before finalization
- 🟡 **P2 / NICE-TO-HAVE** — can include in next iteration

---

## Mechanical Blocks (forced checks)

1. **Pre-flight check:** before writing deliverable — cite the user's last "Approved".
2. **Skill read check:** before applying a skill — read its SKILL.md via `view_file`.
3. **Data verification check:** every fact in a deliverable must have source URL + date + confidence.
4. **Handoff file check (Full Pipeline):** before closing session — ensure `docs/analytics/session-N-handoff.md` is saved.
5. **Team mode check:** Conductor verifies the agent is working in the assigned team mode (Alpha/Beta).

---

## Pipeline Artifacts

| Session | Artifact | Format | Created By |
|---------|----------|--------|------------|
| 1 | Interview Brief | Markdown | Interviewer |
| 1 | Session 1 Handoff | `docs/analytics/session-1-handoff.md` | Conductor |
| 2 | Alpha Research Package | Markdown (in handoff) | Researcher (Alpha) |
| 2 | Alpha Analytical Report | Markdown (in handoff) | Data Analyst (Alpha) |
| 2 | Alpha Strategy | Markdown (in handoff) | Strategist (Alpha) |
| 2 | Session 2 Handoff | `docs/analytics/session-2-handoff.md` | Conductor |
| 3 | Beta Research Package | Markdown | Researcher (Beta) |
| 3 | Beta Analytical Report | Markdown | Data Analyst (Beta) |
| 3 | Beta Strategy + Critique | Markdown | Strategist (Beta) |
| 3 | Session 3 Handoff | `docs/analytics/session-3-handoff.md` | Conductor |
| 4 | Mediated Conclusion | Markdown | Mediator |
| 4 | Session 4 Handoff | `docs/analytics/session-4-handoff.md` | Conductor |
| 4.5 | Synthesis (optional) | Markdown | Mediator |
| 5 | Report Design Spec | Markdown | Designer |
| 5 | Final PDF Report | HTML → PDF | Layouter |
