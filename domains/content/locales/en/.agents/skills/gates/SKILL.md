---
name: gates
description: Pipeline gates control — deliverables registry, criteria by gates and modes, severity, check log
---
# Gates — Pipeline Gates Control

## When to Use
- **Before every transition** between gates — check the deliverable of the current gate.
- **When returning for rework** — re-check after corrections.
- **In case of dispute about readiness** — formal arbiter: what is done and what is not.

> **Distinction from `$board`:** `$gates` checks the **quality and completeness** of the deliverable. `$board` tracks **status and progress**. Gates answers "is it ready?", Board answers "where are we now?".

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Gate Name | ✅ | Which gate we are checking |
| Pipeline Mode | ✅ | Full / Bugfix / Hotfix — determines the set of gates and criteria |
| Gate Deliverables | ✅ | Artifacts that the agent hands over for review |
| Iteration | ⬚ | If a re-check — iteration number + gaps from the previous one |

## Gates and Deliverables Registry

### Full Pipeline

| # | Gate | Agent | Mandatory Deliverables | Skills |
|---|------|-------|--------------------------|-------|
| 1 | **Conductor** | Conductor | Mode determined, task decomposed, board created | `$board` |
| 2 | **Strategist** | Strategist | Audience analysis, platform strategy, content calendar, competitor analysis | `$audience-analysis`, `$platform-strategy`, `$content-calendar`, `$competitor-content-analysis` |
| 3 | **Researcher** | Researcher | Topic research, source verification, data storytelling (if data-driven) | `$topic-research`, `$source-verification`, `$data-storytelling` |
| 4 | **Copywriter** | Copywriter | Final text by content brief, CTA, headline | `$content-brief`, `$cta-optimization`, `$headline-formulas`, `$storytelling-framework` |
| 5 | **Visual Concept** | Visual Concept | Visual brief, image prompts, platform visual specs | `$visual-brief`, `$image-prompt-engineering`, `$platform-visual-specs` |
| 6 | **Reviewer** | Reviewer | Content review checklist, brand compliance, fact checking, readability | `$content-review-checklist`, `$brand-compliance`, `$fact-checking`, `$readability-scoring` |
| 7 | **Release Gate** | Conductor | Full package for publication, final checklist | `$content-release-gate` |

### Bugfix Pipeline

| # | Gate | Agent | Mandatory Deliverables |
|---|------|-------|--------------------------|
| 1 | **Conductor** | Conductor | Problem identified, Bugfix mode, board created |
| 2 | **Copywriter / Researcher** | Copywriter / Researcher | Fixed content / fixed data |
| 3 | **Reviewer** | Reviewer | Fix check: review checklist (focus on fixes) |
| 4 | **Release Gate** | Conductor | Final fix check |

### Hotfix Pipeline

| # | Gate | Agent | Mandatory Deliverables |
|---|------|-------|--------------------------|
| 1 | **Conductor** | Conductor | Problem identified, Hotfix mode, blast radius ≈ 0 confirmed |
| 2 | **Copywriter + Reviewer** | Copywriter | Fix + self-check by mini-checklist |

## Readiness Criteria by Gates

### Conductor
- [ ] Pipeline mode determined and justified
- [ ] Task decomposed (what we do, why, scope)
- [ ] Board created via `$board`
- [ ] First gate activated

### Strategist
- [ ] `$audience-analysis` — personas defined, validation passed
- [ ] `$platform-strategy` — platforms selected, frequency fixed
- [ ] `$content-calendar` — calendar filled, balance check passed
- [ ] `$competitor-content-analysis` — gaps identified, recommendations formulated
- [ ] All artifacts aligned with each other (personas ↔ platforms ↔ calendar)

### Researcher
- [ ] Topic researched, key facts gathered (`$topic-research`)
- [ ] Sources verified (`$source-verification`)
- [ ] Data storytelling prepared (if data-driven content)
- [ ] Facts ready for handoff to Copywriter

### Copywriter
- [ ] Text written according to `$content-brief`
- [ ] Topic, thesis, persona match the brief
- [ ] CTA optimized (`$cta-optimization`)
- [ ] Volume matches the platform
- [ ] ToV aligns with `$brand-guidelines`

### Visual Concept
- [ ] Visual brief created (`$visual-brief`)
- [ ] AI prompts prepared (if AI generation)
- [ ] Dimensions align with platform (`$platform-visual-specs`)
- [ ] Style aligns with `$brand-guidelines`

### Reviewer
- [ ] `$content-review-checklist` — fully passed, decision APPROVED
- [ ] `$brand-compliance` — status COMPLIANT
- [ ] `$fact-checking` — status PASS / VERIFIED
- [ ] `$readability-scoring` — within acceptable range (if applicable)
- [ ] All comments addressed (if it was REQUIRES CHANGES)

### Release Gate
- [ ] All previous gates passed (status `[✓]` on `$board`)
- [ ] `$content-release-gate` checklist passed — 0 blockers
- [ ] Publication package formed
- [ ] User sign-off obtained

## Criteria Severity

| Severity | Definition | Impact on Decision |
|----------|-------------|-------------------|
| 🔴 **Blocker** | Mandatory deliverable is missing or critically incomplete | FAIL — return for rework |
| 🟡 **Gap** | Deliverable is present, but incomplete or has remarks | CONDITIONAL PASS — can be handed off, but gaps are logged |
| 🔵 **Note** | Minor remark, does not affect transition | PASS — remark is passed to the next gate as context |

## Decisions

| Decision | Condition | Action |
|---------|---------|----------|
| **PASS** | 0 Blocker + 0 Gap | → Request user Approved → `$handoff` → next gate |
| **CONDITIONAL PASS** | 0 Blocker + 1-2 Gap | → Log gaps → Request user Approved with note of gaps → `$handoff` with note |
| **FAIL** | ≥ 1 Blocker | → Return to agent with specific list of gaps → Do not request Approved |

> **Absolute rule:** Never skip gates, even if the task seems simple. FAIL → rework → re-check. No exceptions.

## Protocol

### Step 1 — Context Definition
1. Determine which gate is being checked.
2. Determine pipeline mode (Full / Bugfix / Hotfix).
3. Load readiness criteria for this gate from the registry.
4. If a re-check — load gaps from the previous iteration.

### Step 2 — Deliverables Check
1. For each readiness criterion — check: done ✅ / not done ❌ / N/A.
2. For each ❌ — assign severity (🔴 Blocker / 🟡 Gap / 🔵 Note).
3. For each ❌ — describe specific gap: what exactly is missing / what to fix.

### Step 3 — Decision Making
1. Count severity.
2. Apply decision rules (PASS / CONDITIONAL PASS / FAIL).
3. Add entry to check log.

### Step 4 — Action by Result
- **PASS:** show to user → request Approved → `$handoff` → update `$board`.
- **CONDITIONAL PASS:** show gaps → request Approved confirming gaps → `$handoff` with note → update `$board`.
- **FAIL:** show gaps → return to agent → update `$board` (status `[↩] Rework`).

## Validation (Quality Gate)

Gate check is considered complete if:

- [ ] All readiness criteria passed (✅ / ❌ / N/A — none empty)
- [ ] For each ❌ specified: severity, gap description, what to fix
- [ ] Decision aligns with rules (not subjective)
- [ ] Check log updated
- [ ] If PASS/CONDITIONAL PASS — user Approved obtained
- [ ] `$board` updated

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$board` | **Update:** gate status by check result |
| `$handoff` | **Consumer:** on PASS — handoff with attached gate check |
| `$content-release-gate` | **Final gate:** Release Gate = the last `$gates` check |
| All gate skills | **Criteria source:** skill deliverables = check criteria |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Skipping a gate "because it's simple" | Errors go unnoticed | Never skip. No exceptions |
| PASS without checking all criteria | Unnoticed gaps | Each criterion = ✅ / ❌ / N/A |
| "Generally ok" instead of specifics | Agent doesn't know what to fix | Specific gap: "missing CTA in text" |
| FAIL without gap descriptions | Agent returns and doesn't know what to do | Every FAIL = list of specific reworks |
| Approved without user sign-off | Pipeline protocol violation | Always an explicit Approved from the user |
| Re-check without comparing to previous gaps | Gap might not have been fixed | Load gaps from previous iteration, check each |
| All criteria of equal importance | Trivial blocks, critical passes | Severity: Blocker / Gap / Note |

## Output Template

```
### Gate Check — [Gate Name]

**Mode:** [Full / Bugfix / Hotfix]
**Iteration:** [1 / 2 / N]
**Previous gaps:** [list or "First check"]

---

#### Readiness Criteria

| # | Criterion | Sev | Status | Gap / Comment |
|---|----------|-----|--------|-------------------|
| 1 | [Criterion from registry] | 🔴 | ✅/❌ | |
| 2 | [Criterion from registry] | 🔴 | ✅/❌ | |
| 3 | [Criterion from registry] | 🟡 | ✅/❌ | |
| 4 | [Criterion from registry] | 🔵 | ✅/❌/N/A | |

---

#### Summary

| Severity | Amount | Items |
|----------|-----------|--------|
| 🔴 Blocker | [N] | #[list] |
| 🟡 Gap | [N] | #[list] |
| 🔵 Note | [N] | #[list] |

### Decision: [ PASS / CONDITIONAL PASS / FAIL ]

**Justification:** [by rules: 0 blocker + 0 gap = PASS]

---

#### On PASS / CONDITIONAL PASS:
**Deliverables for handoff:**
- [Artifact 1]
- [Artifact 2]

**Gaps for next gate (if CONDITIONAL):**
- [Gap 1 — what to consider]

→ Ready for handoff to **[Next Agent]**. Waiting for **"Approved"**.

#### On FAIL:
**Gaps for rework:**

| # | Gap | Sev | What to fix | Responsible |
|---|-----|-----|---------------|---------------|
| [N] | [description] | 🔴 | [specific action] | [agent] |

→ Return to **[Current Agent]**. After fix — re-check (iteration [N+1]).

---

#### Check Log

| Iteration | Date | Decision | Gaps | Fixed |
|----------|------|---------|-------|------------|
| 1 | [date] | [PASS/FAIL] | [list] | — |
| 2 | [date] | [PASS/FAIL] | [list] | [what was fixed] |
```
