# Workflow: /edit-content — Content Edit Pipeline

## Description
Pipeline for editing existing content. Used when the foundation already exists, but requires improvement: tone, structure, CTA, brand compliance, platform adaptation, visual edits.

## When to use
- A ready draft of the text exists.
- Tone, structure, or CTA needs improvement.
- Content failed review (return from `/start-content`).
- Adaptation for a new platform or audience is required.
- Visual edits are needed (the visual already exists, but is non-compliant).

## When NOT to use
- > 50% of the text needs to be rewritten → `/start-content`.
- Data research or a new strategy is needed → `/start-content`.
- A simple post from scratch, the topic is clear → `/quick-post`.

## Workflow Input

| Field | Required | Description |
|------|:-----------:|----------|
| Original text | ✅ | Current version of the content (v1) |
| Editing task | ✅ | Exactly what needs to be changed and why |
| Platform | ✅ | Where it will be published (can differ from the original) |
| Brand guidelines | ✅ | From `$brand-guidelines` — for brand compliance |
| Target audience persona | ⬚ | From `$audience-analysis` — if adapting for a different audience |
| Original visual | ⬚ | If visual edits are needed |
| Previous review | ⬚ | If content returned from review — list of remarks |

## Types of Edits

| Type | Depth | Examples | Gates |
|-----|---------|---------|-------|
| **Tonal** | Light | Change ToV (more formal / less formal), remove clichés | Conductor → Copywriter → Reviewer |
| **Structural** | Medium | Restructure text, improve hook, strengthen CTA | Conductor → Copywriter → Reviewer |
| **Platform** | Medium | Adapt from LinkedIn to Instagram, change format | Conductor → Copywriter → Reviewer |
| **Visual** | Medium | Fix visual, change composition, update brand elements | Conductor → Visual Concept → Reviewer |
| **Complex** | High | Text + visual + platform simultaneously | Conductor → Copywriter → Visual Concept → Reviewer |
| **Post-review** | Depends on remarks | Fixes based on Reviewer's remarks | Conductor → Copywriter/Visual → Reviewer |

> The Conductor determines the type of edits at Gate 1 and selects the necessary gates.

## Pipeline

### Basic (text edits)
```
CONDUCTOR → COPYWRITER → REVIEWER → RELEASE CHECK
   G1            G2          G3           G4
```

### With visual edits
```
CONDUCTOR → VISUAL CONCEPT → REVIEWER → RELEASE CHECK
   G1             G2v            G3          G4
```

### Complex (text + visual)
```
CONDUCTOR → COPYWRITER → VISUAL CONCEPT → REVIEWER → RELEASE CHECK
   G1            G2            G2v             G3          G4
```

> The Conductor determines which pipeline variant to activate at Gate 1.

## Gates and Deliverables

### Gate 1: Conductor
**Input:** User task + original content
**Actions:**
- Determine **type of edits** (tonal / structural / platform / visual / complex / post-review)
- Fix the current version as **v1** (text and/or visual)
- Determine **which gates** are needed (basic / visual / complex)
- Initialize the board (`$board`) for the Edit Pipeline
- Formulate the task: **what** to change, **why**, **what NOT to touch**
- Check: are edits ≤ 50%? If not → suggest `/start-content`
**Mandatory skills:** `$board`, `$handoff`
**Deliverable:** Handoff Envelope → Copywriter / Visual Concept
**Verification:** `$gates` — task is specific, type is determined, v1 is fixed
**→ Wait for "Approved"**

### Gate 2: Copywriter (text edits)
**Input:** `$handoff` from Conductor with original text and task
**Actions:**
- Verify/correct ToV (`$tone-of-voice`)
- Improve headlines (`$headline-formulas`) if needed
- Reformat for platform (`$social-media-formats`) if needed
- Optimize CTA (`$cta-optimization`) if needed
- Make the requested edits **while preserving what shouldn't be changed**
- Prepare a **diff**: exactly what changed and why
**Mandatory skills:** `$tone-of-voice`
**Optional:** `$headline-formulas`, `$social-media-formats`, `$cta-optimization`, `$seo-copywriting`
**Deliverable:** Edited text (v2) + diff (list of changes with justification)
**Verification:** `$gates` — all requested edits are made, the text is cohesive, diff is provided
**→ Wait for "Approved"**

### Gate 2v: Visual Concept (visual edits)
**Input:** `$handoff` from Conductor with original visual and task
**Actions:**
- Determine what to change in the visual based on the task
- Update `$visual-brief` considering the edits
- Update AI prompts (`$image-prompt-engineering`) if AI generation
- Check brand elements (`$brand-guidelines`)
- Check platform specs (`$platform-visual-specs`)
**Mandatory skills:** `$visual-brief`, `$platform-visual-specs`
**Optional:** `$image-prompt-engineering`, `$brand-guidelines`
**Deliverable:** Updated visual brief / prompts (v2) + description of changes
**Verification:** `$gates`
**→ Wait for "Approved"**

### Gate 3: Reviewer
**Input:** `$handoff` from Copywriter / Visual Concept with v2
**Actions:**
- Review checklist (`$content-review-checklist`) — **focus on edited parts** + ensure unedited parts didn't break
- Brand compliance (`$brand-compliance`)
- Readability (`$readability-scoring`) — if text edits
- Platform compliance (`$platform-compliance`)
- Cross-check against original task: were all requested edits actually made?
**Mandatory skills:** `$content-review-checklist`, `$brand-compliance`
**Optional:** `$readability-scoring`, `$platform-compliance`, `$fact-checking`
**Deliverable:** APPROVED or a list of specific reworks with severity

**If APPROVED:** → Gate 4 (Release Check)
**If REQUIRES CHANGES:** → Reverse `$handoff` → Copywriter / Visual Concept → repeat Gate 3

**Verification:** `$gates` — no Blockers
**→ Wait for "Approved"**

### Gate 4: Release Check
**Input:** APPROVED from Reviewer
**Actions:**
- Quick final check via `$content-release-gate` (simplified for Edit Pipeline):
  - Text v2 is finalized ✅
  - Visual v2 is finalized (if visual edits were made) ✅
  - Brand compliance passed ✅
  - Platform compliance passed ✅
  - Publication package updated ✅
- Update `$board` — all gates `[✓]`
- Update `domains/content/CONTEXT.md`
**Deliverable:** Updated publication package
**→ Final "Approved" → Ready for publication**

## Reverse Handoff — Return Protocol

If Reviewer gives **REQUIRES CHANGES**:

```
Reviewer (REQUIRES CHANGES)
    │
    ├── Text edits → Reverse $handoff → Copywriter
    │   └── Copywriter makes edits → v3 → Forward $handoff → Reviewer (repeat G3)
    │
    ├── Visual edits → Reverse $handoff → Visual Concept
    │   └── Visual Concept makes edits → v3 → Forward $handoff → Reviewer (repeat G3)
    │
    └── Both → Reverse $handoff → Copywriter + Visual Concept → Reviewer
```

**Reverse Handoff Rules:**
1. Specify **concrete remarks** with severity (from `$content-review-checklist`).
2. Specify **what NOT to touch** (already approved parts).
3. Update `$board` — Reviewer gate → `[↩] Return`, target gate → `[→] In progress`.
4. After fixes — **re-check** `$gates` → forward `$handoff` → Reviewer.
5. Maximum of **3 iterations**. If not APPROVED after 3 iterations → escalate to user.

## Threshold for switching to `/start-content`

| Indicator | How to define | Action |
|-----------|---------------|----------|
| Edits > 50% of the text | Diff shows that more than half of the text has been rewritten | Suggest `/start-content` |
| New research is needed | No data in the text, but the task requires facts | Suggest `/start-content` with Researcher |
| Strategy is wrong | Wrong audience, wrong platform, wrong CTA focus | Suggest `/start-content` with Strategist |
| 3+ review iterations | Copywriter can't achieve APPROVED | Escalation → the problem might be the brief → `/start-content` |

> The decision to switch rests with the user. The Conductor **suggests**, but does not switch on their own.

## Mode Limitations
- ❌ Do not run research (`$trend-research`, `$topic-research`) — we take facts from the source.
- ❌ Do not revise the strategy (audience, platform) — unless explicitly requested by the user.
- ❌ Do not create a moodboard from scratch — only adjust the existing visual.
- ✅ If **new** factual assertions appear in the revised text → `$fact-checking` is mandatory.

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Rewrite everything instead of targeted edits | That's `/start-content`, not `/edit-content` | Preserve what works. Change only what's requested |
| Edits without a diff | It's unclear what changed, the Reviewer can't verify focus | Always provide a diff: what, where, why |
| Not fixing v1 | No way to roll back | Conductor fixes v1 at Gate 1 |
| Endless review iterations | Time is wasted, results don't improve | Maximum of 3 iterations → escalate |
| Visual edits without Visual Concept | Copywriter editing visual = out of their competence | Visuals → Visual Concept (Gate 2v) |
| Skip Release Check | "It's just edits" — but mistakes are still possible | Gate 4 is mandatory, even if simplified |
| Add new facts without `$fact-checking` | New assertions aren't verified | New facts → mandatory `$fact-checking` |
| Failure to specify "what NOT to touch" | Copywriter might break what's already approved | Conductor explicitly fixes the scope of edits |

## Output Template (Gate 1 — Conductor)

```
### Edit Pipeline — Initialization

**Original content:** [description / ID]
**Version:** v1 (fixed)
**Type of edits:** [tonal / structural / platform / visual / complex / post-review]
**Pipeline:** [basic / visual / complex]

**Editing task:**
[What to change — specific]

**Why:**
[Why the edits are needed — context]

**What NOT to touch:**
[What is already approved / works / requires no changes]

**Gates:**
| # | Gate | Status |
|---|------|--------|
| G1 | Conductor | [→] In progress |
| G2 | Copywriter | [ ] Waiting |
| G2v | Visual Concept | [ ] Waiting / N/A |
| G3 | Reviewer | [ ] Waiting |
| G4 | Release Check | [ ] Waiting |

→ Waiting for "Approved" to proceed to [Copywriter / Visual Concept]
```
