---
name: handoff
description: Context transfer between gates and sessions — Handoff Envelope, cross-session protocol, file generation
---
# Handoff — Context Transfer Between Gates and Sessions

## When to Use
- At **every transition** between gates within a session — standard transfer (intra-session handoff).
- At **session completion** — cross-session transfer (multi-session handoff), saved to file.
- At **return for rework** — reverse transfer (reverse handoff).
- **Mandatory** at every transition, in any pipeline mode. No exceptions.

> **Distinction:** `$gates` verifies readiness. `$handoff` transfers the work. `$board` tracks status. Order: `$gates` PASS → `$handoff` → update `$board`.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| `$gates` result | ✅ | PASS or CONDITIONAL PASS — handoff is impossible on FAIL |
| Sending agent | ✅ | Who is handing off (current gate with ID) |
| Receiving agent | ✅ | Who receives (next gate with ID) |
| Gate artifacts | ✅ | Current gate deliverables (from `$gates` registry) |
| Pipeline mode | ✅ | Full (`/analyze`) / Quick (`/quick-insight`) |
| Handoff type | ✅ | Forward / Reverse / Session (cross-session) |
| Session number | ⬚ | For cross-session handoff — current and next session |

> **Precondition:** Handoff is possible **only** after `$gates` PASS or CONDITIONAL PASS. On FAIL — return to agent, handoff is not executed.

## Handoff Types

| Type | Description | File | Next recipient's context |
|------|------------|------|--------------------------|
| **Forward** | Standard transfer between gates within a session | None (in memory) | Full session context available |
| **Reverse** | Return for rework | None (in memory) | Full session context available |
| **Session** | Cross-session transfer | `docs/analytics/session-N-handoff.md` | **ZERO** previous context — file must be self-contained |

> **Key rule for cross-session handoff:** the next session starts with ZERO context. The handoff file is the only source of information. No references to "see above" or "as discussed". Everything must be in the file.

## Transfer Registry — What to Transfer

### Full Pipeline (inter-gate)

| Transition | Artifacts | Key Context |
|-----------|-----------|-------------|
| **COND-01 → INT-01** | Task scope, mode, board | Business question, constraints, expectations |
| **INT-01 → Session Handoff** | Research brief, interview context, evaluation mode | All user responses, selected metrics |
| **COND-02 → RES-01** | Session-1 handoff, research brief | Full interview context, research questions |
| **RES-01 → AN-01** | Data, sources, facts | Verified data with URLs and dates |
| **AN-01 → ST-01** | Frameworks, analysis, patterns | Methodology, key insights |
| **ST-01 → Session Handoff** | Strategy, recommendations | Complete Analyst team package for Critics and Mediator |
| **COND-03 → RES-02** | Session-2 handoff, Analyst results | Data for critique and alternative research |
| **RES-02 → AN-02** | Alternative data, critique | Counter-data with sources |
| **AN-02 → ST-02** | Alternative analysis | Counter-frameworks, differences from Analysts |
| **ST-02 → Session Handoff** | Alternative strategy, critique | Complete Critic team package |
| **COND-04 → MED-01** | Session-2 + Session-3 handoff | Both packages (Analysts + Critics) |
| **MED-01 → Session Handoff** | Final conclusion, scores | Final verdict, justification |
| **COND-05 → DS-01** | Session-4 handoff | Mediator conclusion for visualization |
| **DS-01 → LY-01** | Layout, visualization specifications | Report structure, palette, fonts |

## Cross-Session Handoff (Session)

### File Structure `docs/analytics/session-N-handoff.md`

The file contains **all** necessary context. No references, no abbreviations.

```markdown
# Session [N] Handoff — [Project Name]

## Meta
- **Project:** [Name]
- **Date:** [YYYY-MM-DD]
- **Session:** [N] of [M]
- **Mode:** Full / Quick
- **Completed gates:** [list of IDs with deliverables]
- **Next gate:** [ID] [Name]

## Brief Summary
[2-3 sentences: what was done in this session, key result]

## Full Artifact Contents

### [Artifact 1 — Name]
[FULL TEXT of the artifact, not a link or brief description]

### [Artifact 2 — Name]
[FULL TEXT of the artifact]

### [Artifact N — ...]
[FULL TEXT]

## Cumulative Index
| Session | Gates | Key Artifacts | File |
|---------|-------|---------------|------|
| 1 | COND-01, INT-01 | Research brief, interview context | session-1-handoff.md |
| 2 | RES-01, AN-01, ST-01 | Data, analysis, Analyst strategy | session-2-handoff.md |
| [N] | [...] | [...] | session-N-handoff.md |

## Prompt for the Next Session
[Generated via $session-prompt-generator — ready-to-paste prompt]

## Verification Checklist
- [ ] All artifacts included in full (not as links)
- [ ] Cumulative index is current
- [ ] Prompt for the next session generated
- [ ] Task board ($board) saved in current state
- [ ] Open questions / blockers recorded
```

## Reverse Handoff

### When It Occurs
- `$gates` — FAIL.
- Mediator discovered critical data discrepancies.
- User requested rework.
- Next gate discovered an issue with a previous gate's artifact.

### Reverse Handoff Protocol
1. Specify the **reason for return** — specific gaps / remarks.
2. Specify **what exactly to rework** — not "redo it" but "verify source X: data from 2023, current 2025 data needed".
3. Specify **what NOT to touch** — what is already approved and doesn't need changes.
4. Update `$board` — receiving gate → `[↩] Returned`, sending gate → `[→] In Progress`.
5. After rework — repeat `$gates` check → forward handoff.

## Protocol

### Step 0 — Determine Handoff Type
1. Forward (within session), Reverse (return), Session (cross-session).
2. For Session — determine file path: `docs/analytics/session-N-handoff.md`.

### Step 1 — Preconditions
1. Ensure `$gates` gave PASS or CONDITIONAL PASS (except for Reverse).
2. Determine the receiving agent from the registry.
3. Collect all artifacts from the transfer registry.

### Step 2 — Compose the Envelope
1. For Forward: fill in the standard envelope template.
2. For Session: fill in the file template, include FULL artifact contents.
3. For Reverse: fill in the reverse envelope with gaps.
4. For CONDITIONAL PASS — explicitly indicate the gaps being transferred.

### Step 3 — User Sign-off
1. Show the envelope to the user.
2. Await explicit **"Approved"**.
3. Do not proceed without Approved. No exceptions.

### Step 4 — Save and Activate
1. For Session: save the file to `docs/analytics/session-N-handoff.md`.
2. Update `$board`: current gate → `[✓] Completed`, next → `[→] In Progress`.
3. Add an entry to the transfer log.
4. For Session: call `$session-prompt-generator` to generate the prompt.

## Envelope Validation (Quality Gate)

### Standard (Forward) Envelope
- [ ] `$gates` result attached (PASS / CONDITIONAL PASS)
- [ ] Sending and receiving agents specified with gate IDs
- [ ] All artifacts from the transfer registry attached
- [ ] Task for the next agent formulated specifically
- [ ] Context transferred
- [ ] User Approved obtained
- [ ] `$board` updated

### Cross-Session (Session) Envelope — additionally
- [ ] File saved at path `docs/analytics/session-N-handoff.md`
- [ ] All artifacts included as **full text** (not links or summaries)
- [ ] Cumulative index is current
- [ ] Prompt for the next session generated
- [ ] Verification checklist completed
- [ ] File is self-contained — can be read without any previous context

## Handoff
The `$handoff` result is input for: the next agent in the pipeline, `$board` (status updates), `$session-prompt-generator` (for cross-session handoffs).

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Handoff without `$gates` | Unverified artifacts → problems at the next gate | Always `$gates` PASS → then handoff |
| Handoff without Approved | Protocol violation, user is uninformed | Always wait for explicit Approved |
| Session handoff with links instead of content | Next session has no access to context | FULL artifact text in the file |
| "Do the analysis" instead of a task | Agent doesn't know the scope | Specific task with parameters |
| Transfer without artifacts | Next agent works blind | All artifacts from the registry attached |
| Reverse handoff without specifics | Agent doesn't know what to fix | Specific gaps + what NOT to touch |
| Not updating `$board` | Board is out of sync | Update `$board` on every handoff |
| Loss of context between sessions | Next session starts from scratch | Cross-session handoff with full content |

## Output Template

### Forward Handoff (within session)

```
### Handoff Envelope — [ID From] [Agent From] → [ID To] [Agent To]

**Type:** Forward
**Mode:** [Full / Quick]
**Session:** [N]
**Gate Check:** [PASS / CONDITIONAL PASS] (iteration [N])
**Date:** [YYYY-MM-DD]

---

**Artifacts:**
- [Artifact 1 — description]
- [Artifact 2 — description]

**Gaps (if CONDITIONAL):**
- [Gap 1 — what to consider]

---

**Task for [Agent To]:**
[Clear specific formulation]

**Expected deliverable:**
[What the next agent should return]

**Blockers:**
[List or "None"]

---

→ Awaiting **"Approved"** to proceed to **[ID To] [Agent To]**
```

### Reverse Handoff

```
### Reverse Handoff — [ID From] [Agent From] → [ID To] [Agent To] (return)

**Type:** Reverse
**Reason:** [FAIL / feedback / data discrepancies]
**Date:** [YYYY-MM-DD]

---

**What to fix:**
| # | Gap / Remark | Sev | Specific Action |
|---|-------------|-----|-----------------|
| 1 | [description] | Blocker | [what to do] |

**What NOT to touch:**
- [Artifact / section that is already approved]

---

→ After rework — re-check via `$gates` (iteration [N+1])
→ Awaiting **"Approved"** for the return
```
