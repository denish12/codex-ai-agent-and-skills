---
name: handoff
description: Transition between gates — preconditions, artifacts registry by transitions, reverse handoff, handoff log
---
# Handoff — Transition Between Gates

## When to Use
- On **every transition** between gates — forward handoff.
- On **return for rework** — reverse handoff.
- **Mandatory** on every transition, in any pipeline mode. No exceptions.

> **Distinction:** `$gates` checks readiness. `$handoff` transfers work. `$board` tracks status. Order: `$gates` PASS → `$handoff` → update `$board`.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| `$gates` Result | ✅ | PASS or CONDITIONAL PASS — handoff impossible on FAIL |
| Sending Agent | ✅ | Who is handing off (current gate) |
| Receiving Agent | ✅ | Who is receiving (next gate) |
| Gate Artifacts | ✅ | Deliverables of the current gate (from `$gates` registry) |
| Pipeline Mode | ✅ | Full / Bugfix / Hotfix |
| Handoff Type | ✅ | Forward / Reverse (return for rework) |

> **Precondition:** Handoff is possible **only** after `$gates` PASS or CONDITIONAL PASS. On FAIL — return to agent, handoff is not performed.

## Handoff Statuses

| Status | Meaning | When |
|--------|----------|-------|
| **Completed** | All deliverables ready, `$gates` PASS | Normal transition |
| **Conditional** | Deliverables ready with gaps, `$gates` CONDITIONAL PASS | Transition with note: gaps logged |
| **Return** | Work returned for rework | `$gates` FAIL or feedback from next gate / user |
| **Blocker** | Handoff impossible, escalation required | External blocker (legal, access, data) |

## Handoff Registry — what to transfer

### Full Pipeline

| Transition | Artifacts | Key Context |
|---------|-----------|-------------------|
| **Conductor → Strategist** | Task, scope, mode, board | Business goal, brand, constraints |
| **Strategist → Researcher** | Audience analysis, platform strategy, content calendar, competitor analysis | Personas, platforms, competitor gaps, priority topics |
| **Researcher → Copywriter** | Topic research, source verification, data storytelling, content brief | Facts, sources, narrative, brief with theses |
| **Copywriter → Visual Concept** | Final text, content brief (visual section) | Topic, mood, platform, brand style |
| **Copywriter + Visual → Reviewer** | Final text, visual / visual brief, AI prompts | Brief for verification, brand guidelines |
| **Reviewer → Release Gate** | Review checklist (APPROVED), brand compliance, fact checking, readability | Remarks (if any and fixed), final statuses |
| **Release Gate → Publication** | Full package: text + visual + meta + schedule | Date, platform, cross-posting |

### Bugfix Pipeline

| Transition | Artifacts | Key Context |
|---------|-----------|-------------------|
| **Conductor → Copywriter/Researcher** | Problem description, fix scope | What's broken, where, priority |
| **Copywriter/Researcher → Reviewer** | Fixed content | What exactly changed, diff |
| **Reviewer → Release Gate** | Review checklist (APPROVED) | Focus on what was fixed |

### Hotfix Pipeline

| Transition | Artifacts | Key Context |
|---------|-----------|-------------------|
| **Conductor → Copywriter+Reviewer** | Problem description, fix | Blast radius ≈ 0 confirmed, mini-checklist |

## Reverse Handoff

When returning for rework — a special protocol:

### When it happens
- `$gates` — FAIL.
- Reviewer — REQUIRES CHANGES.
- User — requested rework.
- Next gate — found an issue with an artifact from the previous one.

### Reverse handoff protocol
1. State the **reason for return** — specific gaps / remarks.
2. State **what exactly to rework** — not "re-do", but "fix CTA: leave one instead of two, wording according to `$cta-optimization`".
3. State **what NOT to touch** — what is already approved and needs no changes.
4. Update `$board` — receiving gate → `[↩] Rework`, sending gate → `[→] In progress`.
5. After rework — repeat `$gates` check → forward handoff.

## Protocol

### Forward Handoff

#### Step 1 — Preconditions
1. Ensure that `$gates` gave PASS or CONDITIONAL PASS.
2. Determine receiving agent from registry.
3. Collect all artifacts from the handoff registry.

#### Step 2 — Envelope Formation
1. Fill **all fields** of the template (see below).
2. For CONDITIONAL PASS — explicitly specify the gaps being passed on.
3. Formulate a **clear task** for the next agent (what to do, not how).

#### Step 3 — User sign-off
1. Show the envelope to the user.
2. Await explicit **"Approved"**.
3. Do not proceed without Approved. No exceptions.

#### Step 4 — Activation
1. Update `$board`: current gate → `[✓] Completed`, next → `[→] In progress`.
2. Add entry to handoff log.
3. Activate the next agent with full context.

### Reverse Handoff

#### Step 1 — Reverse Envelope Formation
1. Specify reason, gaps, what to fix, what not to touch.

#### Step 2 — User sign-off
1. Show the reverse envelope to the user.
2. Await Approved for return.

#### Step 3 — Activation
1. Update `$board`: current → `[↩] Rework`, target → `[→] In progress`.
2. Add entry to handoff log (type: Reverse).

## Envelope Validation (Quality Gate)

A handoff envelope is considered complete if:

- [ ] `$gates` result attached (PASS / CONDITIONAL PASS)
- [ ] Sending and receiving agents specified
- [ ] All artifacts from handoff registry attached
- [ ] Task for next agent specifically formulated
- [ ] Context transferred (brand, platform, audience, constraints)
- [ ] Expected deliverable specified
- [ ] Blockers / gaps logged (or "None")
- [ ] User Approved obtained
- [ ] `$board` updated
- [ ] Entry added to handoff log

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$gates` | **Precondition:** handoff only after PASS/CONDITIONAL PASS |
| `$board` | **Update:** on every handoff — update gate statuses + event log |
| `$content-release-gate` | Final handoff → publication package |
| All gate skills | Skill artifacts = handoff envelope contents |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Handoff without `$gates` | Unverified artifacts → issues at the next gate | Always `$gates` PASS → then handoff |
| Handoff without Approved | Protocol violation, user unaware | Always wait for explicit Approved |
| "Make content" instead of a task | Agent doesn't know scope, does too much or too little | Specific task: "Write text for brief IG-20260415-01, focus on persona X" |
| Handoff without artifacts | Next agent works blind | All registry artifacts are attached |
| Reverse handoff without specifics | Agent doesn't know what to fix | Specific gaps + what NOT to touch |
| Failing to update `$board` | Board out of sync, unclear where we are | Update `$board` at every handoff |
| Context lost during handoff | Next agent asks again | Brand, platform, audience, constraints — in every envelope |

## Output Template

### Forward Handoff

```
### Handoff Envelope — [Agent From] → [Agent To]

**Type:** Forward
**Mode:** [Full / Bugfix / Hotfix]
**Gate Check:** [PASS / CONDITIONAL PASS] (iteration [N])
**Date:** [YYYY-MM-DD]

---

**Status:** [Completed / Conditional]

**Artifacts:**
- [Artifact 1 — description / link]
- [Artifact 2 — description / link]
- [Artifact 3 — description / link]

**Gaps (if CONDITIONAL):**
- [Gap 1 — what to consider]

---

**Task for [Agent To]:**
[Clear specific formulation: what to do, scope, focus]

**Context:**
- Brand: [brand]
- Platform: [platform]
- Audience: [persona from $audience-analysis]
- Constraints: [constraints]
- ToV: [tone from $brand-guidelines]

**Expected deliverable:**
[What the next agent should return — specific list]

**Blockers:**
[List of blockers or "None"]

---

→ Waiting for **"Approved"** to transition to **[Agent To]**
```

### Reverse Handoff

```
### Reverse Handoff — [Agent From] → [Agent To] (rework)

**Type:** Reverse
**Reason:** [FAIL on $gates / REQUIRES CHANGES from Reviewer / user feedback]
**Date:** [YYYY-MM-DD]

---

**What to fix:**
| # | Gap / Remark | Sev | Specific action |
|---|----------------|-----|---------------------|
| 1 | [description] | 🔴/🟡 | [what to do] |
| 2 | [description] | 🔴/🟡 | [what to do] |

**What NOT to touch:**
- [Artifact / section inherently approved]

**Context:**
[Additional context, if needed]

---

→ After rework — repeated `$gates` check (iteration [N+1])
→ Waiting for **"Approved"** for return
```

### Handoff Log

```
#### Handoff Log — [Task / ID]

| # | Date | Type | From → To | Gate Check | Status | Gaps |
|---|------|-----|-----------|------------|--------|-------|
| 1 | [date] | Forward | Conductor → Strategist | PASS | Completed | — |
| 2 | [date] | Forward | Strategist → Researcher | CONDITIONAL | Conditional | [gap] |
| 3 | [date] | Forward | Researcher → Copywriter | PASS | Completed | — |
| 4 | [date] | Reverse | Reviewer → Copywriter | FAIL | Return | [gaps] |
| 5 | [date] | Forward | Copywriter → Reviewer | PASS | Completed | — |
```
