# Content Pipeline Rules — Absolute Constraints

## Purpose
This document defines the immutable rules for operating the content pipeline. Violation of any of these rules is unacceptable. The rules apply to **all** pipeline modes.

---

## Pipeline Modes

### Decision Tree — Mode Selection

```
User Task
       │
       ├── New content from scratch / campaign / requires research?
       │   └── YES → /start-content (Full Pipeline)
       │
       ├── Have drafted text, need edits?
       │   └── YES → Edits > 50%?
       │           ├── YES → /start-content (too many edits)
       │           └── NO → /edit-content (Edit Pipeline)
       │
       ├── Simple post, topic is clear, no complex facts?
       │   └── YES → Blast radius ≈ 0?
       │           ├── YES → /quick-post (Quick Pipeline)
       │           └── NO → /start-content or /edit-content
       │
       └── Not sure?
           └── Choose the heavier mode. Better to be safe.
```

### Additional Criteria

| Criterion | /start-content | /edit-content | /quick-post |
|----------|:-:|:-:|:-:|
| Needs data research | ✅ | ❌ | ❌ |
| Needs strategy (audience, platform) | ✅ | ❌ | ❌ |
| Has drafted text | ❌ | ✅ | ❌ |
| Topic is clear, audience is known | — | ✅ | ✅ |
| Blast radius ≈ 0 | — | — | ✅ |
| Reaction to trend / news hook | — | — | ✅ |
| Complex factual assertions | ✅ | ❌ | ❌ |
| Target time | 1-3 hours | 30-60 min | 5-15 min |

### Gate Schemas by Mode

**Full Pipeline** (`/start-content`):
```
CONDUCTOR → STRATEGIST → RESEARCHER → COPYWRITER → VISUAL_CONCEPT → REVIEWER → RELEASE GATE
   G1            G2            G3           G4            G5             G6          G7
```

**Edit Pipeline** (`/edit-content`):
```
CONDUCTOR → COPYWRITER → REVIEWER
   G1            G2          G3
```

**Quick Pipeline** (`/quick-post`):
```
CONDUCTOR → COPYWRITER + REVIEWER
   G1            G2          G3
```

---

## Gates, Deliverables, and Mandatory Skills

### Full Pipeline — `/start-content`

| Gate | Agent | Deliverable | Mandatory Skills | Optional Skills |
|------|-------|-------------|-------------------|-------------------|
| G1 | **Conductor** | Handoff Envelope + board | `$board`, `$handoff` | — |
| G2 | **Strategist** | Content brief + content plan | `$audience-analysis`, `$platform-strategy`, `$content-calendar`, `$content-brief` | `$competitor-content-analysis`, `$tone-of-voice` |
| G3 | **Researcher** | Data package: facts, sources, narrative | `$topic-research`, `$source-verification` | `$trend-research`, `$data-storytelling` |
| G4 | **Copywriter** | Final text + headlines + CTA | `$tone-of-voice`, `$headline-formulas`, `$cta-optimization` | `$storytelling-framework`, `$social-media-formats`, `$email-copywriting`, `$seo-copywriting` |
| G5 | **Visual Concept** | Visual brief + AI-prompts | `$visual-brief`, `$platform-visual-specs` | `$moodboard`, `$image-prompt-engineering`, `$brand-guidelines` |
| G6 | **Reviewer** | APPROVED or list of edits | `$content-review-checklist`, `$brand-compliance` | `$fact-checking`, `$readability-scoring`, `$platform-compliance` |
| G7 | **Release Gate** | Package for publication | `$content-release-gate` | — |

### Edit Pipeline — `/edit-content`

| Gate | Agent | Deliverable | Mandatory Skills |
|------|-------|-------------|-------------------|
| G1 | **Conductor** | Handoff + task for edits | `$board`, `$handoff` |
| G2 | **Copywriter** | Edited text + diff | `$tone-of-voice` |
| G3 | **Reviewer** | APPROVED or rework | `$content-review-checklist`, `$brand-compliance` |

### Quick Pipeline — `/quick-post`

| Gate | Agent | Deliverable | Mandatory Skills |
|------|-------|-------------|-------------------|
| G1 | **Conductor** | Brief | `$board` |
| G2 | **Copywriter** | Ready post text | `$tone-of-voice`, `$social-media-formats`, `$cta-optimization` |
| G3 | **Reviewer** | APPROVED or 1-2 edits | `$brand-compliance` |

---

## Rules (Absolute)

### Rule 1: Explicit Approved before every transition
Never proceed to the next gate without an explicit **"Approved"** from the user.
- Even if the deliverable seems obvious.
- Even under a deadline.
- **Exception:** `/quick-post` Gate 2 → Gate 3 can occur without a pause upon explicit user request.

**Approved Protocol:**
1. Show the gate's deliverable to the user.
2. Pass `$gates` — verify completeness and quality.
3. Request explicit "Approved".
4. Only after Approved — execute `$handoff` → update `$board`.

### Rule 2: Do not skip gates
Gates cannot be skipped, merged, or reordered without explicit user permission.
- Each gate has its own responsibility and deliverable.
- If a gate seems redundant — **discuss** with the user, do not skip silently.
- Gate order is dictated by the mode schema. Breaking order = breaking the rule.

### Rule 3: Every gate must have a deliverable
A gate is not considered complete without a specific deliverable (see tables above).
- The deliverable is verified via `$gates` (Quality Gate checklist).
- A gate with an empty or incomplete deliverable → `$gates` FAIL → return for rework.
- The deliverable is recorded in `$board` upon gate closure.

### Rule 4: Facts must be conditionally verified
Any factual assertion in the text must be verified.
- Statistics → primary source is mandatory (`$source-verification`).
- Quotes → original context verified (`$fact-checking`).
- Data relevance — **adaptive** (not hardcoded):
  - Tech / Digital: ≤ 1 year
  - Business / Markets: ≤ 2 years
  - Science: ≤ 5 years (for basics), ≤ 2 years (for breakthroughs)
  - Legal: current law (check date)
- No source → do not use the fact.
- **Exception for `/quick-post`:** if the text has no factual assertions (opinion, humor), `$fact-checking` is not mandatory. If there is at least one fact — it is mandatory.

### Rule 5: One pipeline — one task
Each pipeline execution solves one specific task.
- Do not combine the creation of different content units in one pipeline.
- If the task expands → complete the current pipeline, launch a new one.
- One content unit = one ID from `$content-calendar` (if applicable).

### Rule 6: Edits return to the executor
If the Reviewer gives edits → they return to the **specific agent** via `$handoff` (reverse):
- Textual edits → Copywriter.
- Visual edits → Visual Concept.
- Factual errors → Researcher.
- Legal issues → escalate to user.
- **The Conductor does not rewrite text.**
- Re-review is mandatory after edits (`$gates` → `$handoff` → Reviewer).

### Rule 7: Brand compliance is a mandatory check
Every unit of content must pass `$brand-compliance`.
- No exceptions, even for `/quick-post`.
- Brand guideline violation = Blocker.
- If `$brand-guidelines` are not defined → request from the user **before starting** the pipeline.

### Rule 8: Platform dictates the format
Content adapts to the platform, not vice versa.
- Technical specs are verified via `$platform-visual-specs` and `$platform-compliance`.
- Cannot publish content in the wrong format, size, or ratio.
- Text adapts via `$social-media-formats`.

### Rule 9: Mode selection is the Conductor's responsibility
The Conductor determines the mode per the Decision Tree (see above).
- The decision is made at Gate 1 and **communicated to the user** with justification.
- When in doubt — **choose the heavier mode**.
- The user can override the mode — the Conductor complies.
- If during the process it turns out the mode is too light → suggest to the user to switch to a heavier one.

### Rule 10: CONTEXT.md updates after every pipeline
Upon completing the pipeline, the Conductor updates `domains/content/CONTEXT.md`:
- Pipeline mode.
- Completed gates.
- Key outcome (what was created).
- Date.

### Rule 11: `$board` updates at every transition
The board (`$board`) is the single source of truth about the current status:
- Created by Conductor at Gate 1.
- Updated during **every** `$handoff` (forward and reverse).
- Gate status changes only via `$board`.
- Upon completion — all gates are `[✓]`.

### Rule 12: `$handoff` is the only way to to transit
Transitions between gates happen **only** via `$handoff`:
- Forward handoff — after `$gates` PASS + user Approved.
- Reverse handoff — on `$gates` FAIL or Reviewer REQUIRES CHANGES.
- Every handoff is recorded in the transition log.
- Handoff without `$gates` — is forbidden.

---

## Parallelism

### What can be done in parallel

| Gates | Condition | Mode |
|-------|---------|-------|
| **Copywriter + Visual Concept** | If text does not affect the visual (visual is straight from brief, not the text) | Full Pipeline — with Conductor's permission |
| **Copywriter + Reviewer** | Quick Pipeline: reviewer starts immediately after copywriter | Quick Pipeline |

### What cannot be done in parallel

| Gates | Why |
|-------|--------|
| Strategist + Researcher | The Researcher depends on the Strategist's brief |
| Copywriter + Reviewer (Full) | Reviewer checks the Copywriter's text |
| Any gate without Approved | Rule 1 forbids transition without Approved |

### Rule of Parallelism
- Parallel work is allowed **only** if the outputs of the gates **do not depend** on each other.
- The Conductor decides on parallelism and **informs** the user.
- Both parallel gates require **separate** Approved.

---

## Escalation

| Situation | Action | Who |
|----------|----------|-----|
| Blocker at a gate | Notify user via `$board` (status `[!]`), do not proceed further | Current agent |
| Insufficient data | Reverse `$handoff` → Researcher with specific gaps | Copywriter / Reviewer |
| Brand guidelines undefined | Request from user **before starting**, don't start without them | Conductor |
| Source unverified | Remove the assertion or find a replacement via `$source-verification` | Researcher |
| Edits > 50% of text | Recommend restarting `/start-content`, decision is up to user | Reviewer / Conductor |
| User doesn't answer | Wait. Do not proceed to next gate without Approved. Remind via message | Conductor |
| Deadline is tight | Suggest switching to `/quick-post` or `/edit-content`. Do not skip gates | Conductor |
| Conflict Reviewer ↔ Copywriter | Escalate to user with arguments from both sides | Conductor |
| Mode proved too light | Suggest switching to heavier. Decision is up to the user | Conductor |
| Unknown situation | Stop. Ask the user. Do not improvise | Conductor |

---

## Integration with Skills

### Orchestration Skills (used at every gate)

| Skill | When | Who uses |
|------|-------|---------------|
| `$board` | Creation (G1), update (every transition), closure (finale) | Conductor + every agent on handoff |
| `$gates` | Before every transition — deliverable check | Conductor |
| `$handoff` | On every transition (forward and reverse) | Conductor + current agent |

### Skills by Gates

Mapping of mandatory and optional skills — see tables in the "Gates, Deliverables, and Mandatory Skills" section.

### Rule for Applying Skills
- **Mandatory** gate skills — executed always. Omission = `$gates` FAIL.
- **Optional** skills — applied based on the task context. Conductor or agent decides.
- A skill is considered executed if its **Quality Gate** (validation) is passed.

---

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Skip a gate "because it's simple" | Errors go unnoticed | Never skip. Rule 2 |
| Transition without Approved | User is out of loop, lost control | Always wait for Approved. Rule 1 |
| Conductor rewrites text | Roles violated, no quality review | Edits → Copywriter → Reviewer. Rule 6 |
| `/quick-post` for complex topic | No research → factual errors | Decision Tree. In doubt → heavier. Rule 9 |
| Handoff without `$gates` | Unverified deliverables → problems downstream | `$gates` PASS → `$handoff`. Rule 12 |
| Not updating `$board` | Losing tracking, unclear where we are | Update on every handoff. Rule 11 |
| Brand compliance skipped | Content mismatch with brand → reputation risk | Mandatory for all modes. Rule 7 |
| Parallel work of dependent gates | Output of one gate needed by another → desync | Only independent gates in parallel |
| Improvisation in unknown situation | Unpredictable consequences | Stop, ask the user |
