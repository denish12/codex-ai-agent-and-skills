---
name: analytics-pipeline-rules
description: Absolute rules of the analytical pipeline — gates, discipline, inter-session protocol
---

# Analytical Pipeline Rules

> [!CAUTION]
> **🔴 ABSOLUTE RULE #1:** Skipping the pipeline is prohibited. No exceptions.
> Every gate → read the agent → deliverable → `$gates` PASS → `$handoff` → **User sign-off** → next gate.

---

## Three Pipeline Modes

### 🔵 Full Pipeline (`/analyze`) — 5 sessions
Full analytical cycle with two competing teams, mediation, and a PDF report.

```
Session 1: CONDUCTOR → INTERVIEWER
Session 2: CONDUCTOR → ANALYSTS (RESEARCHER → DATA_ANALYST → STRATEGIST)
Session 3: CONDUCTOR → CRITICS   (RESEARCHER → DATA_ANALYST → STRATEGIST)
Session 4: CONDUCTOR → MEDIATOR
Session 5: CONDUCTOR → DESIGNER → LAYOUTER → RELEASE GATE
```

### 🟢 Quick Pipeline (`/quick-insight`) — 1 session
A single team, no critics. Used for simple questions when adversarial analysis is excessive.

```
CONDUCTOR → INTERVIEWER → RESEARCHER → DATA_ANALYST → STRATEGIST → MEDIATOR → DESIGNER → LAYOUTER → RELEASE GATE
```

---

## Decision Tree — mode selection

```
User request
       │
       ├── Complex strategic question? High stakes? Devil's advocate needed?
       │   └── YES → /analyze (Full Pipeline, 5 sessions)
       │
       ├── Simple analytical question? Single framework? Quick check?
       │   └── YES → /quick-insight (Quick Pipeline, 1 session)
       │
       ├── User explicitly specified a mode?
       │   └── Use the specified mode
       │
       └── In doubt?
           └── /analyze (better to play it safe)
```

---

## Mandatory Discipline (MANDATORY ENFORCEMENT)

### Rule 1: Gates cannot be skipped
- The order of gates is defined by the mode's workflow.
- Every gate requires: deliverable + `$gates` PASS + `$handoff` + user sign-off.
- Skipping a gate → 🔴 **P0 / BLOCKER**.

**Applied skills:** `$gates` (readiness check), `$board` (status tracking), `$handoff` (context transfer).

### Rule 2: User sign-off at every gate
- Transitioning to the next gate is **only** allowed after an explicit "Approved" from the user.
- Upon sign-off, the user **verifies** that the AI correctly loaded the agent and its skills.
- `ShouldAutoProceed = false` ALWAYS.

**Applied skills:** `$gates` (requests Approved), `$handoff` (waits for Approved before transfer).

### Rule 3: Agent protocol — step-by-step
- Every § (paragraph) in `agents/<role>.md` is a separate action.
- You cannot "collapse" multiple steps into one.
- Before writing a deliverable — complete ALL steps of the protocol.

### Rule 4: Web search is mandatory
- The Researcher **must** use `$web-research` upon every launch.
- The user's data is **mandatory** to be verified via external sources.
- Without a web search, the deliverable is considered **INCOMPLETE**.

**Applied skill:** `$web-research` (search protocol), `$gates` (RES-xx without web-research = automatic Blocker).

### Rule 5: Team Mode is strictly defined
- Conductor defines the team mode (Alpha/Beta) in the Handoff Envelope.
- Researcher, Analyst, and Strategist must follow the assigned mode.
- Critics (Beta) **must** receive the full Analysts' (Alpha) report as input.

**Applied skills:** `$handoff` (team mode in envelope), `$gates` (team mode check).

### Rule 6: Inter-session protocol
- In the Full Pipeline, every session ends by saving `docs/analytics/session-N-handoff.md`.
- The handoff file contains the **full text of artifacts** (not links — the next session lacks context).
- A ready-to-use prompt for the next session is generated (`$session-prompt-generator`).
- Without a handoff file, the session is considered **INCOMPLETE**.

**Applied skills:** `$handoff` (Session type, full text), `$session-prompt-generator` (prompt), `$board` (state saving).

### Rule 7: Mediator — impartiality
- The Mediator evaluates the quality of arguments and evidence base, **not text volume**.
- Evaluation mode (scoring/qualitative/synthesis) is determined during the interview.
- Synthesis (Appendix D) — only upon Mediator's proposal and user's approval.

---

## Mapping "Rule → Skill → Check"

| Rule | Skills | What is checked | In case of violation |
|------|--------|-----------------|----------------------|
| 1. Gates cannot be skipped | `$gates`, `$board`, `$handoff` | Statuses on the board flow sequentially, no gaps | 🔴 P0 Blocker |
| 2. User sign-off | `$gates`, `$handoff` | Explicit "Approved" before every transition | 🔴 P0 Blocker |
| 3. Agent protocol | `$gates` (dependency check) | All steps of the agent's protocol are completed | 🔴 P0 Blocker |
| 4. Web search is mandatory | `$web-research`, `$gates` (RES-xx) | WebSearch/WebFetch completed, audit trail filled | 🔴 P0 Blocker |
| 5. Team mode | `$handoff`, `$gates` (team mode check) | Agent works in the assigned Alpha/Beta mode | 🟠 P1 Important |
| 6. Inter-session protocol | `$handoff` (Session), `$session-prompt-generator` | File saved, prompt generated, artifacts in full text | 🔴 P0 Blocker |
| 7. Impartiality of Mediator | `$gates` (MED-xx) | Scoring/qualitative by criteria, not by volume | 🟠 P1 Important |

---

## Mechanical Blocks (mandatory forced checks)

| # | Block | When | What it checks | On failure |
|---|-------|------|----------------|------------|
| 1 | **Pre-flight check** | Before writing a deliverable | Quote the last user's "Approved" | Stop, request Approved |
| 2 | **Skill read check** | Before applying a skill | Read SKILL.md via `view_file` | Read, then apply |
| 3 | **Data verification check** | Every fact in the deliverable | Source URL + date + confidence (✅/⚠️/🔮) | Mark as 🔮 Assumed or remove |
| 4 | **Handoff file check** | Before closing the session (Full) | `docs/analytics/session-N-handoff.md` saved, self-contained | Do not close session, save file |
| 5 | **Team mode check** | Conductor at every handoff | Agent works in the assigned team mode | Return and reassign |

---

## Escalation Protocol

### When user sign-off is missing
1. Show the deliverable and request "Approved".
2. If there is no answer — **wait**. Do not proceed to the next gate.
3. Remind: "Waiting for 'Approved' to transition to [next gate]".
4. **Never** auto-proceed. `ShouldAutoProceed = false` ALWAYS.

### Upon repeated FAILs at `$gates`
| Iteration | Action |
|:---------:|--------|
| 1st FAIL | Standard return: list of gaps → agent revises |
| 2nd FAIL | Extended return + specific instructions "how to fix" |
| 3+ FAIL | **Escalation to user** via `$gates` protocol (options: scope revision / return to previous gate / forced CONDITIONAL PASS) |

> Detailed escalation protocol — in `$gates` → "Escalation protocol on repeated FAILs".

### Upon detecting an issue at a subsequent gate (Reverse Handoff)
1. The agent forms a Reverse Handoff detailing the issue via `$handoff`.
2. Conductor routes the return to the correct gate.
3. The board (`$board`) is updated: current gate → `[↩]`, return gate → `[→]`.
4. After correction — repeated check via `$gates`.

> Detailed reverse handoff protocol — in `$handoff` → "Reverse Handoff".

---

## Pipeline Health Metrics

`$board` calculates and displays upon every update:

| Metric | Formula | Healthy | Problematic |
|--------|---------|:-------:|:-----------:|
| Progress (%) | Completed / Total × 100 | Growing | Stagnating |
| Avg. time/gate | Σ time / completed | ≤ 15 min | > 30 min |
| Blockers (total) | No. of [!] of all time | 0-1 | ≥ 3 |
| Returns (total) | No. of [↩] of all time | 0-1 | ≥ 3 |
| FAIL rate | FAILs / gate checks × 100 | < 20% | > 40% |

**At FAIL rate > 40%:** Conductor escalates to the user — the scope might be too broad or data is insufficient.

> Detailed metrics — in `$board` → "Progress Metrics".

---

## Priority Format

| Priority | Description | Action |
|:--------:|-------------|--------|
| 🔴 **P0 / BLOCKER** | Blocks progress / report publication | Immediately: fix or escalate |
| 🟠 **P1 / IMPORTANT** | Important to fix before finalization | Before Release Gate |
| 🟡 **P2 / NICE-TO-HAVE** | Can be included in the next iteration | Backlog |

---

## Pipeline Artifacts

### Full Pipeline

| Session | Artifact | Format | Who creates | Skill |
|:-------:|----------|--------|-------------|-------|
| 1 | Interview Brief | Markdown | Interviewer | — |
| 1 | Session 1 Handoff | `docs/analytics/session-1-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 2 | Alpha Research Package | Markdown (in handoff) | Researcher (Alpha) | `$web-research` |
| 2 | Alpha Analytical Report | Markdown (in handoff) | Data Analyst (Alpha) | Framework skills |
| 2 | Alpha Strategy | Markdown (in handoff) | Strategist (Alpha) | — |
| 2 | Session 2 Handoff | `docs/analytics/session-2-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 3 | Beta Research Package | Markdown | Researcher (Beta) | `$web-research` |
| 3 | Beta Analytical Report | Markdown | Data Analyst (Beta) | Framework skills (counter) |
| 3 | Beta Strategy + Critique | Markdown | Strategist (Beta) | — |
| 3 | Session 3 Handoff | `docs/analytics/session-3-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 4 | Mediated Conclusion | Markdown | Mediator | — |
| 4 | Synthesis (optional) | Markdown | Mediator | — |
| 4 | Session 4 Handoff | `docs/analytics/session-4-handoff.md` | Conductor | `$handoff`, `$session-prompt-generator` |
| 5 | Report Design Spec | Markdown | Designer | `$report-design` |
| 5 | Final HTML Report | HTML → PDF | Layouter | `$html-pdf-report` |

### Quick Pipeline

| Artifact | Format | Who creates | Skill |
|----------|--------|-------------|-------|
| Interview Brief | Markdown | Interviewer | — |
| Research Package | Markdown | Researcher | `$web-research` |
| Analytical Report | Markdown | Data Analyst | Framework skills |
| Strategy | Markdown | Strategist | — |
| Conclusion | Markdown | Mediator | — |
| Report Design Spec | Markdown | Designer | `$report-design` |
| Final HTML Report | HTML → PDF | Layouter | `$html-pdf-report` |

---

## Example — Full Pipeline mid-flight (session 2, blocker resolved)

```
Session 1 (completed):
  COND-01 [✓] → Decision Tree → Full Pipeline
  INT-01  [✓] → Brief: 12 questions, scoring mode, scope = EdTech corp. training RF
  → session-1-handoff.md saved ✅

Session 2 (in progress):
  COND-02 [✓] → Context loaded from session-1-handoff.md
  RES-01  [✓] → CONDITIONAL PASS (2 gaps: TAM 2 sources, IDC 14 mo)
                 $web-research: 38 queries, 48 sources, Verified 62% 🟡
                 $handoff: envelope with gaps transferred to AN-01
  AN-01   [→] → In progress: TAM/SAM/SOM + Competitive Analysis + PEST
                 $gates dependency check: RES-01 data quoted ✅
  ST-01   [ ] → Waiting

Metrics: Progress 33% (5/15) | Avg. time/gate: 9 min | Blockers: 0 | Returns: 0
```

**What happened:**
1. COND-01: Decision Tree → Full Pipeline. User: "Approved" ✅
2. INT-01: 12 questions, scoring mode. User: "Approved" ✅
3. Session 1 Handoff: file saved, prompt generated. User: "Approved" ✅
4. COND-02: context loaded, verified. User: "Approved" ✅
5. RES-01: `$web-research` completed (38 queries). `$gates`: CONDITIONAL PASS (2 gaps). User: "Approved" (marking the gaps) ✅
6. AN-01: in progress. `$gates` dependency check: RES-01 data engaged.

**Blocker-scenario (example):**
If RES-01 did not perform `$web-research`:
- `$gates` → automatic 🔴 Blocker (Rule 4).
- `$board` → RES-01 [!] Blocker.
- Escalation: "⚠️ Researcher did not perform a web search. This is a mandatory requirement."
- Return: RES-01 [↩] → perform `$web-research` → repeated `$gates` check.

---

## Pipeline Startup Checklist (for Conductor)

Conductor performs upon initialization:

- [ ] Mode determined by Decision Tree (Full / Quick)
- [ ] Board created via `$board` with correct gate IDs
- [ ] First gate is activated (COND-01 → [→])
- [ ] User sign-off obtained on mode and scope
- [ ] For a continuing session: handoff file loaded and verified (`$handoff` recovery protocol)

## Session Closing Checklist (for Conductor)

Conductor performs before completion:

- [ ] All gates of the current session in [✓] or [⊘] (no [→] or [!])
- [ ] `$board` is saved in the handoff file
- [ ] All artifacts are included in **full text** in the handoff
- [ ] `$session-prompt-generator` called, prompt generated
- [ ] Handoff file saved: `docs/analytics/session-N-handoff.md`
- [ ] File is self-contained (test: possible to start work without external context)
- [ ] User sign-off obtained to close the session

## Release Gate Checklist (for Conductor, session 5)

- [ ] All gates of all sessions are in [✓] on the `$board`
- [ ] PDF report generated and visually checked (`$html-pdf-report` testing protocol)
- [ ] Data in the report is up to date as of publication date
- [ ] User sign-off obtained
- [ ] Final board + log shown to the user
