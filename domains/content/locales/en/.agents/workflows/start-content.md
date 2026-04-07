# Workflow: /start-content — Full Content Pipeline

## Description
Full pipeline for creating content from scratch. Maximum elaboration: strategy, research, copywriting, visual, review, release gate. Used for new publications, campaigns, and content requiring deep preparation.

## When to use
- New publication or campaign from scratch.
- Content requires data research / factual basis.
- Strategic elaboration is needed (audience, platform, goals).
- No drafted text or concept exists.
- Edits of existing content > 50% (switching from `/edit-content`).

## When NOT to use
- Ready text exists, needs edits ≤ 50% → `/edit-content`.
- Simple post, blast radius ≈ 0 → `/quick-post`.
- When in doubt — **use** `/start-content` (better safe than sorry).

## Workflow Input

| Field | Required | Description |
|------|:-----------:|----------|
| Task / topic | ✅ | What needs to be created — from user |
| Brand guidelines | ✅ | From `$brand-guidelines`. Without them — request before start |
| Business goals | ⬚ | Awareness / leads / sales / community |
| Target platform | ⬚ | If known in advance. If not — Strategist will define |
| Audience personas | ⬚ | If `$audience-analysis` already exists. If not — Strategist will create |
| Budget | ⬚ | If there's a paid component |
| Deadline | ⬚ | Influences prioritization and research depth |

> If brand guidelines are not provided — Conductor requests them **before starting** the pipeline. Without them, brand compliance (Rule 7) is impossible.

## Pipeline

```
CONDUCTOR → STRATEGIST → RESEARCHER → COPYWRITER → VISUAL CONCEPT → REVIEWER → RELEASE GATE
   G1            G2            G3           G4            G5             G6          G7
```

### Parallelism

| Gates | Parallel? | Condition |
|-------|:------------:|---------|
| G1→G2→G3 | ❌ Strictly sequential | Each depends on the previous one |
| **G4 + G5** | ✅ Possible | If visual is created from brief (not from text). Conductor decides |
| G4→G5 | Sequential by default | Visual Concept often depends on the final text |
| G6 | ❌ Only after G4+G5 | Reviewer checks both text and visual |
| G7 | ❌ Only after G6 APPROVED | Release Gate = final check |

> The Conductor at Gate 1 determines whether G4+G5 will be parallel and informs the user.

## Gates and Deliverables

### Gate 1: Conductor
**Input:** User task + workflow input
**Actions:**
1. Determine content type, platform (if known), scope.
2. Check the presence of `$brand-guidelines`. If not → request.
3. Determine if G4+G5 will be parallel.
4. Initialize the board (`$board` — Full Pipeline).
5. Formulate the task for Strategist.
6. Execute `$handoff` (forward) → Strategist.
**Mandatory skills:** `$board`, `$handoff`
**Deliverable:** Handoff Envelope → Strategist (task + scope + limitations)
**Verification:** `$gates` — task is specific, board is created, brand guidelines exist
**→ Wait for "Approved"**

### Gate 2: Strategist
**Input:** `$handoff` from Conductor
**Actions:**
1. Audience analysis (`$audience-analysis`) — personas, pain points, triggers.
2. Platform selection (`$platform-strategy`) — channels, formats, frequency.
3. Competitor analysis (`$competitor-content-analysis`) — gaps, differentiation.
4. Content plan (`$content-calendar`) — if a series / campaign is planned.
5. ToV formation (`$tone-of-voice`) — if not defined earlier.
6. Brief formation (`$content-brief`) — full brief for Researcher + Copywriter.
7. Execute `$handoff` (forward) → Researcher.
**Mandatory skills:** `$audience-analysis`, `$platform-strategy`, `$content-brief`
**Optional:** `$competitor-content-analysis`, `$content-calendar`, `$tone-of-voice`
**Deliverable:** Content brief + content plan (if series)
**Verification:** `$gates` — brief contains: topic, persona, platform, format, ToV, CTA, volume
**→ Wait for "Approved"**

### Gate 3: Researcher
**Input:** `$handoff` from Strategist (brief)
**Actions:**
1. Trend analysis (`$trend-research`) — what is relevant on the topic.
2. Topic research (`$topic-research`) — facts, statistics, experts.
3. Source verification (`$source-verification`) — all sources checked.
4. Narrative formation (`$data-storytelling`) — if data-driven content.
5. Execute `$handoff` (forward) → Copywriter.
**Mandatory skills:** `$topic-research`, `$source-verification`
**Optional:** `$trend-research`, `$data-storytelling`
**Deliverable:** Data package — facts (verified), statistics, quotes, narrative, structure for copywriter
**Verification:** `$gates` — all facts verified, sources ≥ minimum rating, narrative formed
**→ Wait for "Approved"**

### Gate 4: Copywriter
**Input:** `$handoff` from Researcher (data) + brief from Strategist (G2)
**Actions:**
1. Apply ToV (`$tone-of-voice`).
2. Select storytelling framework (`$storytelling-framework`).
3. Write headlines (`$headline-formulas`) — 3-5 options.
4. Write text based on brief + data.
5. Platform adaptation (`$social-media-formats` / `$email-copywriting`).
6. CTA optimization (`$cta-optimization`).
7. SEO optimization (`$seo-copywriting`) — if indexable content.
8. Execute `$handoff` (forward) → Visual Concept (or Reviewer, if visual is in parallel).
**Mandatory skills:** `$tone-of-voice`, `$headline-formulas`, `$cta-optimization`
**Optional:** `$storytelling-framework`, `$social-media-formats`, `$email-copywriting`, `$seo-copywriting`
**Deliverable:** Final text + headline options + CTA
**Verification:** `$gates` — text matches brief (topic, thesis, persona), ToV, volume, platform
**→ Wait for "Approved"**

### Gate 5: Visual Concept
**Input:** `$handoff` from Copywriter (text) or from Conductor (brief, if parallel to G4)
**Actions:**
1. Apply brand guidelines (`$brand-guidelines`).
2. Create moodboard (`$moodboard`) — if new campaign / series.
3. Visual brief (`$visual-brief`) — detailed specification.
4. Platform specs (`$platform-visual-specs`) — dimensions, ratio, safe zones.
5. AI prompts (`$image-prompt-engineering`) — if AI generation.
6. Execute `$handoff` (forward) → Reviewer.
**Mandatory skills:** `$visual-brief`, `$platform-visual-specs`
**Optional:** `$moodboard`, `$image-prompt-engineering`, `$brand-guidelines`
**Deliverable:** Visual brief + AI prompts (or spec for designer)
**Verification:** `$gates` — brief is complete, specs match platform, style = brand
**→ Wait for "Approved"**

### Gate 6: Reviewer
**Input:** `$handoff` from Visual Concept (text + visual)
**Actions:**
1. Review checklist (`$content-review-checklist`) — full, 38 items.
2. Brand compliance (`$brand-compliance`) — ToV, visual, messaging, legal.
3. Fact-checking (`$fact-checking`) — all factual assertions.
4. Readability (`$readability-scoring`) — if text format.
5. Platform compliance (`$platform-compliance`) — technical + rules + algorithmic.

**If APPROVED:** → `$handoff` (forward) → Release Gate.
**If REQUIRES CHANGES:** → Reverse `$handoff` → Copywriter / Visual Concept (by remark type).

**Mandatory skills:** `$content-review-checklist`, `$brand-compliance`
**Optional:** `$fact-checking`, `$readability-scoring`, `$platform-compliance`
**Deliverable:** APPROVED or a list of fixes with severity (Blocker / Major / Minor)
**Verification:** `$gates` — all Blockers closed, Majors ≤ 2 (fixed or accepted)
**→ Wait for "Approved"**

### Gate 7: Release Gate
**Input:** APPROVED from Reviewer
**Actions:**
1. Final checklist (`$content-release-gate`) — artifacts, meta, legal.
2. Prepare publication package: text + visual + hashtags + links + UTM + schedule.
3. Update `$board` — all gates `[✓]`.
4. Update `domains/content/CONTEXT.md`.
**Mandatory skills:** `$content-release-gate`
**Deliverable:** Full publication package

**If READY TO PUBLISH:** → Final "Approved" → Publication.
**If HOLD:** → Reverse `$handoff` by blocker type (see `$content-release-gate` rollback).

**→ Final "Approved" → Publication**

## Reverse Handoff — Return Protocol

### From Gate 6 (Reviewer)

```
Reviewer (REQUIRES CHANGES)
    │
    ├── Text remarks → Reverse $handoff → Copywriter (G4)
    │   └── Copywriter fixes → Forward $handoff → Reviewer (repeat G6)
    │
    ├── Visual remarks → Reverse $handoff → Visual Concept (G5)
    │   └── Visual Concept fixes → Forward $handoff → Reviewer (repeat G6)
    │
    ├── Factual errors → Reverse $handoff → Researcher (G3)
    │   └── Researcher fixes/replaces → Forward → Copywriter → Reviewer
    │
    └── Both (text + visual) → Reverse $handoff → Copywriter + Visual Concept → Reviewer
```

### From Gate 7 (Release Gate)

```
Release Gate (HOLD)
    │
    ├── Text → Copywriter → Reviewer → Release Gate (repeat)
    ├── Visual → Visual Concept → Reviewer → Release Gate (repeat)
    ├── Legal → Escalate to user
    └── Meta / links → Conductor fixes → Release Gate (repeat)
```

### Reverse Handoff Rules
1. Reverse `$handoff` contains: **specific remarks** + **severity** + **what NOT to touch**.
2. Update `$board`: current gate → `[↩] Return`, target → `[→] In progress`.
3. After fixes — **re-check** `$gates` → forward `$handoff`.
4. Maximum of **3 iterations** at the Reviewer gate. If not APPROVED after 3 → escalate to user.

## Escalation

| Situation | Action | Who |
|----------|----------|-----|
| Blocker on any gate | `$board` → `[!]`, notify user, do not proceed | Current agent |
| Brand guidelines undefined | Stop pipeline, request from user | Conductor (G1) |
| Insufficient data for Researcher | Reverse → Strategist for brief clarification, or request from user | Researcher (G3) |
| Fixes > 3 iterations at Reviewer | Escalate to user — issue might be in the brief | Conductor |
| User is unresponsive | Wait. Do not proceed without Approved. Remind | Conductor |
| Tight deadline | Suggest reducing scope or switching to `/quick-post` for part of the content | Conductor |
| Conflict between gates | Escalate to user with arguments from both sides | Conductor |
| Task proved too simple | Suggest switching to `/quick-post`. User decides | Conductor (G1-G2) |

## Threshold for mode switching

| Indicator | Direction | Decision |
|-----------|-------------|---------|
| Task is trivial (clear topic, no facts, blast radius ≈ 0) | → `/quick-post` | Conductor suggests at G1 |
| Strategist determined strategy already exists, only text needed | → `/edit-content` (if draft exists) or proceed without G2 | Conductor suggests, user decides |
| During G3-G4 it became clear task is simpler than it seemed | → Cannot skip (Rule 2), but reduce gate depth | Conductor |

> Mode switching is **always the user's decision**. Conductor suggests, but does not switch on their own.

## Orchestration Skills (used at every gate)

| Skill | When | Description |
|------|-------|----------|
| `$board` | G1 (creation), every transition (update), G7 (closure) | Single source of truth on status |
| `$gates` | Before every transition | Deliverable check: PASS / CONDITIONAL PASS / FAIL |
| `$handoff` | Upon every transition (forward and reverse) | Transfer of artifacts + context + task |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Skip Strategist "the topic is already clear" | No brief → Copywriter works blind | Rule 2: do not skip gates |
| Researcher without verification | Unverified facts in text → loss of trust | `$source-verification` is mandatory |
| Copywriter ignores the brief | Text does not match the strategy | `$gates` checks compliance with the brief |
| Visual Concept without brand guidelines | Visual cannot be recognized as brand | `$brand-guidelines` is mandatory |
| Reviewer checks only the text | Visual with AI artifacts slips through | Reviewer checks both text and visual |
| Release Gate "it's all good anyway" | Broken links, no UTM, no disclaimer | `$content-release-gate` — full checklist |
| Parallel G4+G5 when visual depends on text | Visual Concept redoes everything after getting text | Parallel only if visual is based on brief, not text |
| 5+ iterations at Reviewer | Infinite loop, time wasted | Max 3 iterations → escalate |
| Conductor rewrites text instead of Copywriter | Role violation, no quality review | Rule 6: fixes go to the executor |

## Output Template (Gate 1 — Conductor)

```
### Full Pipeline — Initialization

**Task:** [description from user]
**Scope:** [what is created — content unit / series / campaign]
**Brand guidelines:** [✅ exist / ❌ request]

#### Pipeline Parameters
- **Mode:** Full Pipeline (`/start-content`)
- **Parallelism G4+G5:** [Yes — visual by brief / No — visual depends on text]
- **Deadline:** [date or "no"]

#### Board

| # | Gate | Agent | Status |
|---|------|-------|--------|
| G1 | Conductor | Conductor | [→] In progress |
| G2 | Strategist | Strategist | [ ] Waiting |
| G3 | Researcher | Researcher | [ ] Waiting |
| G4 | Copywriter | Copywriter | [ ] Waiting |
| G5 | Visual Concept | Visual Concept | [ ] Waiting |
| G6 | Reviewer | Reviewer | [ ] Waiting |
| G7 | Release Gate | Conductor | [ ] Waiting |

#### Task for Strategist
[Clear formulation: what to elaborate, for whom, on what platform, with what goal]

→ Waiting for **"Approved"** to proceed to Strategist
```
