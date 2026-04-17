---
name: handoff
description: Transferring artifacts between gates and sessions — structured format with decision context
---
# Handoff — Transferring Context Between Gates and Sessions

## When to Use
- At **every transition** between gates within a session — standard transfer (intra-session handoff).
- At **session completion** — cross-session transfer (multi-session handoff), saved to file.
- When **returning for rework** — reverse handoff.
- **Required** at every transition, in any pipeline mode. No exceptions.

> **Distinction:** `$gates` checks readiness. `$handoff` transfers work. `$board` tracks status. Order: `$gates` PASS → `$handoff` → update `$board`.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| `$gates` result | ✅ | PASS or CONDITIONAL PASS — handoff is impossible on FAIL |
| Sending agent | ✅ | Who is transferring (current gate with ID) |
| Receiving agent | ✅ | To whom (next gate with ID) |
| Gate artifacts | ✅ | Deliverables of the current gate (from `$gates` registry) |
| Pipeline mode | ✅ | Full A (`/ship-right-thing`) / Full B (`/shape-prioritize`) / Quick (`/quick-pm`) / Spec (`/spec`) |
| Handoff type | ✅ | Forward / Reverse / Session (cross-session) |
| Adversarial camp | ⬚ | For Full A/B when transferring between camps (via Mediator) |
| Session number | ⬚ | For cross-session handoff — current and next session |

> **Precondition:** Handoff is only possible after `$gates` PASS or CONDITIONAL PASS. On FAIL — return to agent, handoff is not executed.

### Related Skills
| Skill | Interaction | When |
|-------|-------------|------|
| `$gates` | Precondition: PASS / CONDITIONAL PASS → enables handoff. Gate check attached to envelope | Before each handoff |
| `$board` | After handoff: update gate statuses (current → `[✓]`, next → `[→]`) | After each handoff |
| `$session-prompt-generator` | For Session handoff: generate next session prompt, included in file | On session completion |
| Framework skills (jtbd, prd, rice etc.) | Skill artifacts (completed templates) — part of gate deliverables | When transferring between agents |

## Handoff Types

| Type | Description | File | Next recipient context |
|------|-------------|------|------------------------|
| **Forward** | Standard transfer between gates within session | No (in memory) | Full session context available |
| **Reverse** | Return for rework | No (in memory) | Full session context available |
| **Session** | Cross-session transfer | `docs/product/session-N-handoff.md` | **ZERO** prior context — file must be self-contained |

> **Key rule for cross-session handoff:** The next session starts with ZERO context. The handoff file is the sole source of information. No references to «see above» or «as discussed». Everything must be in the file.

> **Key rule for adversarial independence:** In Full A/B when transferring the Discovery Brief to both camps — **both packages are identical**. Alpha and Beta do not see each other's artifacts until Mediator. Session-handoff Camp Alpha is **NOT passed** to Beta before MED-01.

## Transfer Registry — What to Transfer

### Full Pipeline A (`/ship-right-thing`, 6 sessions)

| Transition | Artifacts | Key context |
|------------|-----------|-------------|
| **COND-01 → DISC-01** | Task scope, mode, board, adversarial context | Product question, constraints, ICP, current metrics |
| **DISC-01 → Session Handoff** | Discovery Brief (JTBD, problems, assumptions, evidence) | All discovery evidence, open questions |
| **COND-02 → STRAT-01α** | Session-1 handoff (Discovery Brief), camp assignment | Discovery Brief + explicit «you are Customer-Champion» |
| **STRAT-01α → Session Handoff** | Strategy Brief Alpha (vision, NSM, OKR, roadmap) | Customer-Champion package for Mediator — isolated from Beta |
| **COND-03 → STRAT-02β** | Session-1 handoff (Discovery Brief, same as given to Alpha) | **WITHOUT** Session-2-handoff! Discovery only |
| **STRAT-02β → Session Handoff** | Strategy Brief Beta | Business-Champion package for Mediator |
| **COND-04 → MED-01** | Session-2 + Session-3 handoff (both) | First gate where both camps are visible simultaneously |
| **MED-01 → Session Handoff** | Unified Strategy Brief (synthesis + rationale) | Final strategy, evidence audit, synthesis path |
| **COND-05 → PM-SPEC** | Session-4 handoff (unified strategy) + Discovery Brief | Strategy for scope decisions |
| **PM-SPEC → UX-01 + TECH-01 + DATA-01** (parallel) | PRD + user stories + AC | Each receives their part for parallel work |
| **Session 5 → Session Handoff** | Combined S5 deliverable (PRD + wireframes + feasibility + metric plan) | Everything ready for final packaging |
| **COND-06 → DS-01** | Session-5 handoff + design directive | Content for layout |
| **DS-01 → LY-01** | Design spec (layout + components) | Ready templates for HTML/PDF |
| **LY-01 → RG-01** | Final PRD + Product Review Deck (PDF) | Release-ready package |

### Full Pipeline B (`/shape-prioritize`, 6 sessions)

| Transition | Artifacts | Key context |
|------------|-----------|-------------|
| **COND-01 → DISC-01** | Task scope, approved strategy (from prior /ship-right-thing or external) | Scope boundaries for prioritization |
| **DISC-01 → Session Handoff** | Scope Brief (WHAT we're prioritizing, which JTBD in scope) | Scope boundaries for both camps |
| **COND-02 → PM-01α + TECH-01α** (parallel) | Session-1 handoff, Build-camp assignment | Scope Brief + «you are Build-Camp: maximum scope, every feature justified» |
| **PM-01α / TECH-01α → Session Handoff** | Build scope proposal (max RICE) + feasibility per story | Max-scope package for Mediator |
| **COND-03 → PM-02β + TECH-02β** (parallel) | Session-1 handoff (same Scope Brief) | **WITHOUT** Session-2! Cut-camp does not see Build artifacts |
| **PM-02β / TECH-02β → Session Handoff** | Cut scope proposal (MoSCoW) + hidden risks | Min-scope package for Mediator |
| **COND-04 → MED-01** | Session-2 + Session-3 handoff | Build vs Cut simultaneously |
| **MED-01 → Session Handoff** | Final scope decision + rationale | Approved scope + out-of-scope list |
| **COND-05 → PM-SPEC** | Session-4 handoff (final scope) | Ready to write final PRD |
| **PM-SPEC → UX-01 + DATA-01** (parallel) | PRD | Parallel work on scope |
| **Session 5 → Session Handoff** | PRD + wireframes + metric plan | Packaging for PDF |
| **COND-06 → DS-01 → LY-01 → RG-01** | Standard packaging | — |

### Quick Pipeline (`/quick-pm`, 1 session)

| Transition | Artifacts | Key context |
|------------|-----------|-------------|
| **COND-01 → DISC-01** | Focused question | Short scope |
| **DISC-01 → STRAT-01** | Rough JTBD + problem statement | Strategy alignment input |
| **STRAT-01 → PM-01** | NSM, theme, strategic fit | For rough RICE |
| **PM-01 → TECH-01** | Rough RICE, MVP sketch (3-5 stories) | For feasibility |
| **TECH-01 → DATA-01** | Feasibility, risks | For metric sketch |
| **DATA-01 → Short Brief** | Primary metric, guardrail, target | Final brief |

### Spec Pipeline (`/spec`, 1 session)

| Transition | Artifacts | Key context |
|------------|-----------|-------------|
| **COND-01 → PM-SPEC** | Approved strategy + scope | Ready to write PRD |
| **PM-SPEC → UX-01 + TECH-01** (parallel) | PRD draft | Parallel review |
| **UX + TECH → PM-FINAL** | UX flows + feasibility + NFR | Merge into PRD |
| **PM-FINAL → Handoff to Engineering** | Final PRD | Implementation ready |

## Cross-Session Handoff (Session)

### File structure `docs/product/session-N-handoff.md`

The file contains **all** necessary context. No references, no abbreviations.

```markdown
# Session [N] Handoff — [Initiative Name]

## Meta
- **Project:** [Name]
- **Date:** [YYYY-MM-DD]
- **Session:** [N] of [M]
- **Mode:** /ship-right-thing | /shape-prioritize | /quick-pm | /spec
- **Adversarial camp** (if applicable): Alpha (Customer / Build) | Beta (Business / Cut) | —
- **Completed gates:** [list of IDs with deliverables]
- **Next gate:** [ID] [Name]

## Brief Summary
[2-3 sentences: what was done in this session, key result]

## Board State ($board)
[Full copy of the board table in its current state + progress metrics]

## Full Artifact Contents

### [Artifact 1 — e.g., Discovery Brief]
[FULL TEXT of the artifact, not a link or brief description]

### [Artifact 2 — e.g., JTBD Canvas]
[FULL TEXT of the artifact]

### [Artifact N — ...]
[FULL TEXT]

## Decisions and Context
| # | Decision | Rationale | Made by | Affects |
|---|----------|-----------|---------|---------|
| 1 | [What was decided] | [Why] | [User / Conductor] | [Which gates] |

## Open Questions and Blockers
| # | Question / Blocker | Severity | For which gate | Status |
|---|-------------------|:--------:|:--------------:|--------|
| 1 | [Description] | 🔴/🟡/🟢 | [Gate ID] | Open / Resolved |

## Camp Independence Check (Full A/B)
- [ ] This handoff does **NOT** contain artifacts from the opposing camp (if applicable)
- [ ] If handoff goes to Camp Beta — Alpha artifacts are excluded
- [ ] Mediator receives **both** session-handoffs (explicitly)

## Cumulative Index
| Session | Gates | Key Artifacts | File |
|---------|-------|---------------|------|
| 1 | COND-01, DISC-01 | Discovery Brief, JTBD canvas | session-1-handoff.md |
| 2 | STRAT-01α | Strategy Brief Alpha | session-2-handoff.md |
| [N] | [...] | [...] | session-N-handoff.md |

## Prompt for Next Session
[Generated via $session-prompt-generator — ready-to-paste prompt]

## Verification Checklist
- [ ] All artifacts included in full (not as links)
- [ ] Task board ($board) saved in current state
- [ ] Decisions and context recorded
- [ ] Open questions / blockers recorded
- [ ] Cumulative index is up to date
- [ ] Prompt for next session generated
- [ ] Camp independence check passed (Full A/B)
- [ ] File is self-contained — test: can be read without ANY prior context
```

### Recovery Protocol (damaged / incomplete handoff)

When loading a session handoff in a new session — Conductor performs verification:

| Check | Action on failure |
|-------|-------------------|
| File not found | Request path from user or reconstruct from previous session memory |
| Artifacts incomplete (links instead of content) | Mark as ⚠️, request missing content from user |
| Cumulative index does not match content | Rebuild index from actual file contents |
| Prompt missing | Generate via `$session-prompt-generator` |
| Board missing | Restore from cumulative index + artifacts |
| Camp contamination detected | 🔴 Critical: stop, escalate, recreate handoff with filtering |

> On any recovery — explicitly notify the user that the handoff was incomplete and what was restored.

## Reverse Handoff

### When it happens
- `$gates` — FAIL.
- Mediator discovered critical data discrepancies.
- User requested rework.
- Next gate discovered a problem with an artifact from the previous gate.

### Reverse handoff protocol
1. State the **reason for return** — specific gaps / comments.
2. State **exactly what to rework** — not «redo it», but «verify evidence for assumption X: Discovery has 0 interviews for this segment, need 5+».
3. State **what NOT to touch** — what has already been approved and needs no changes.
4. Update `$board` — receiving gate → `[↩] Returned`, sending gate → `[→] In Progress`.
5. After rework — re-run `$gates` check → forward handoff.

## Receive Acknowledgement

Upon receiving a handoff the receiving agent must:

1. **Confirm loading:** «Handoff from [ID] received, [N] artifacts loaded».
2. **List received:** list of artifacts with brief description.
3. **Note gaps:** if CONDITIONAL PASS — explicitly list received gaps.
4. **Record issues:** if an artifact is incomplete or unclear — request clarification before starting work (do not guess).

> Acknowledge is embedded in the beginning of the next gate's work. It is not a separate step, but the first paragraph of the deliverable.

## Protocol

### Step 0 — Determine handoff type
1. Forward (within session), Reverse (return), Session (cross-session).
2. For Session — determine file path: `docs/product/session-N-handoff.md`.
3. For Full A/B — verify camp isolation (if handoff goes alpha → beta without Mediator — **prohibited**).

### Step 1 — Preconditions
1. Confirm that `$gates` gave PASS or CONDITIONAL PASS (except Reverse).
2. Identify the receiving agent from the registry.
3. Collect all artifacts from the transfer registry.
4. For Full A/B — **filter out** artifacts from the opposing camp (if cross-camp handoff).

### Step 2 — Form the envelope
1. For Forward: fill in the standard envelope template.
2. For Session: fill in the file template, include FULL artifact contents.
3. For Reverse: fill in the reverse envelope with gaps.
4. For CONDITIONAL PASS — explicitly state the gaps being transferred.

### Step 3 — User sign-off
1. Show envelope to user.
2. Await explicit **"Approved"**.
3. Do not proceed without Approved. No exceptions.

### Step 4 — Save and activate
1. For Session: save file to `docs/product/session-N-handoff.md`.
2. Update `$board`: current gate → `[✓] Completed`, next → `[→] In Progress`.
3. Add entry to the transfer log.
4. For Session: call `$session-prompt-generator` to generate the prompt.

## Example — Forward Handoff COND-03 → STRAT-02β (TeamFlow, `/ship-right-thing`)

**Context:** TeamFlow (B2B SaaS, HR-tech). Session 3: assigning Camp Beta (Business-Champion). Important: Beta receives ONLY the Discovery Brief, without Session-2 handoff (Alpha artifacts).

```
### Handoff Envelope — COND-03 → STRAT-02β Product Strategist (Business-Champion)

**Type:** Forward
**Mode:** /ship-right-thing (Full A)
**Session:** 3
**Camp:** Beta (Business-Champion)
**Gate Check:** PASS (camp assignment + independence verified)
**Date:** 2026-04-12

---

**Artifacts:**

1. **Discovery Brief** (from session-1-handoff.md) — FULL text:
   - ICP: mid-market HR-tech (100-500 employees)
   - Buyer: VP People/HR
   - End-user: People managers + ICs
   - JTBD canvas (buyer + end-user separate)
   - Top 3 problem statements
   - Assumption map (12 assumptions, 4 high-risk)

2. **Camp Assignment:** Business-Champion
   - You play the role of Business-Champion (β)
   - Focus: strategy around revenue, margin, strategic moat, competitive positioning
   - Do not play user-value angle (that is Alpha, working in parallel)

**Independence Check:**
- ⛔ Camp Alpha (Customer-Champion) Strategy Brief **NOT passed** — Beta works independently
- Session-2-handoff.md exists, but **explicitly excluded** from this envelope

---

**Task for STRAT-02β:**

Using **only the Discovery Brief**, form a Business-Champion Strategy Brief for the TeamFlow initiative «AI-powered 1:1 note summarization».

Include:
- Vision (business outcomes: ARR, moat, NRR angle)
- North Star Metric (business-value metric)
- OKR (quarterly)
- Product Roadmap (themes)
- Rationale: why this approach from a business perspective

**Expected deliverable:**
Strategy Brief Beta (markdown), ~800-1200 words, with an explicit business-angle argument.

**Blockers:** None

---

→ Awaiting **"Approved"** to proceed to **STRAT-02β Product Strategist (Business-Champion)**
```

## Validation (Quality Gate)

### Standard (Forward) envelope
- [ ] `$gates` result attached (PASS / CONDITIONAL PASS)
- [ ] Sending and receiving agents specified with gate IDs
- [ ] All artifacts from the transfer registry attached
- [ ] Task for the next agent formulated specifically
- [ ] Gaps (if CONDITIONAL) explicitly listed
- [ ] Context transferred
- [ ] For Full A/B — camp independence verified
- [ ] User Approved received
- [ ] `$board` updated

### Cross-session (Session) envelope — additionally
- [ ] File saved at path `docs/product/session-N-handoff.md`
- [ ] All artifacts included as **full text** (not links or summaries)
- [ ] Board state saved
- [ ] Decisions and context recorded
- [ ] Open questions / blockers recorded
- [ ] Cumulative index is up to date
- [ ] Prompt for next session generated
- [ ] Camp independence check passed (Full A/B)
- [ ] File is self-contained — test: can be read without ANY prior context

## Handoff
The `$handoff` output serves as input for: the next agent in the pipeline, `$board` (status updates), `$session-prompt-generator` (for cross-session handoffs).

## Anti-patterns

| Error | Why it's bad | How to do it right |
|-------|-------------|---------------------|
| Handoff without `$gates` | Unverified artifacts → problems at next gate | Always `$gates` PASS → then handoff |
| Handoff without Approved | Protocol violation, user is unaware | Always wait for explicit Approved |
| Session handoff with links instead of content | Next session has no access to context | FULL text of artifacts in file |
| «Do the analysis» instead of a task | Agent does not know the scope | Specific task with parameters and expected deliverable |
| Transfer without artifacts | Next agent works blind | All artifacts from registry attached |
| Reverse handoff without specifics | Agent does not know what to fix | Specific gaps + what NOT to touch |
| Not updating `$board` | Board is out of sync | Update `$board` at every handoff |
| Context lost between sessions | Next session starts from scratch | Cross-session handoff with full content |
| Recipient did not confirm loading | Unclear if all artifacts were received and understood | Receive Acknowledgement at start of next gate's work |
| Damaged session file | Next session works with incomplete data | Recovery protocol: verification on load |
| Camp contamination in Full A/B | Beta sees Alpha artifacts before Mediator → anchoring | Explicit filter in Step 1 + independence check in validation |

## Output Templates

### Forward Handoff (within session)

```
### Handoff Envelope — [ID From] [Agent From] → [ID To] [Agent To]

**Type:** Forward
**Mode:** [/ship-right-thing | /shape-prioritize | /quick-pm | /spec]
**Session:** [N]
**Camp:** [α (Customer/Build) | β (Business/Cut) | —]
**Gate Check:** [PASS / CONDITIONAL PASS] (iteration [N])
**Date:** [YYYY-MM-DD]

---

**Artifacts:**
- [Artifact 1 — description]
- [Artifact 2 — description]

**Gaps (if CONDITIONAL):**
- [Gap 1 — what to account for]

**Independence Check (Full A/B only):**
- Excluded: [artifacts from opposing camp, if applicable]

---

**Task for [Agent To]:**
[Clear specific formulation]

**Expected deliverable:**
[What the next agent must return]

**Blockers:**
[List or «None»]

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
| # | Gap / Comment | Sev | Specific action |
|---|--------------|:---:|-----------------|
| 1 | [description] | [B] | [what to do] |

**What NOT to touch:**
- [Artifact / section that has already been approved]

---

→ After rework — re-run `$gates` check (iteration [N+1])
→ Awaiting **"Approved"** for return
```

### Receive Acknowledgement (start of recipient's work)

```
**Handoff received:** [ID From] → [ID To]
**Artifacts loaded:** [N] items
- [Artifact 1] — ✅ received
- [Artifact 2] — ✅ received

**Gaps accepted:** [list or «None»]
**Camp-isolation (Full A/B):** [Verified / N/A]
**Loading issues:** [list or «None»]
```
