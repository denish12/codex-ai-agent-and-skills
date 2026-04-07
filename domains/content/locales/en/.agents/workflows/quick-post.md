# Workflow: /quick-post — Quick Post Pipeline

## Description
An accelerated pipeline for creating simple publications without a full strategic cycle. Minimum gates, maximum speed — with guaranteed brand compliance.

## When to use
- A simple post with **blast radius ≈ 0** (see checklist below).
- No complex factual assertions.
- The topic is clear, the audience is known.
- A quick result is needed (deadline, news hook, trend).
- Reaction to an event losing relevance quickly.

## When NOT to use
- Controversial, sensitive, or political topic → `/start-content`.
- Contains complex factual assertions requiring research → `/start-content`.
- Strategic elaboration is needed (new audience, new platform) → `/start-content`.
- A drafted text exists, needs editing → `/edit-content`.
- The post takes > 30 minutes of work → `/start-content`.

## Workflow Input

| Field | Required | Description |
|------|:-----------:|----------|
| Topic / idea | ✅ | What the post is about — specifically |
| Platform | ✅ | Where we publish |
| Brand guidelines | ✅ | From `$brand-guidelines` — ToV, stop-list. Brand compliance is impossible without them |
| Goal | ⬚ | Engagement / awareness / traffic / opinion (if not specified — Conductor determines) |
| Context | ⬚ | Trend, news hook, date — why precisely now |
| Content calendar | ⬚ | If the post is from `$content-calendar` — unit ID |

## Blast Radius Checklist

The Conductor **must** complete this before choosing `/quick-post`:

| # | Criterion | ✅ Quick OK | ❌ Not Quick |
|---|----------|:----------:|:-----------:|
| 1 | Topic is **not** controversial / sensitive / political | ✅ | → `/start-content` |
| 2 | **No** factual assertions requiring verification | ✅ | If 1-2 simple facts — quick + `$fact-checking`. If many → `/start-content` |
| 3 | Audience and platform are **known** (not new) | ✅ | → `/start-content` with Strategist |
| 4 | Post is **not** promo / offer / advertisement | ✅ | Promo requires more thorough elaboration |
| 5 | Blast radius on error is **minimal** | ✅ | If an error → scandal/fine → `/start-content` |
| 6 | Estimated time ≤ 30 minutes | ✅ | → `/start-content` or `/edit-content` |

**Result:** All ✅ → `/quick-post`. At least one ❌ → switch mode.

## Types of quick-posts

| Type | Description | Structure Template |
|-----|----------|-----------------|
| **Opinion / insight** | Brand's personal stance on a topic | Hook (provocation/question) → Opinion (2-3 sentences) → CTA (question for the audience) |
| **Reaction to a trend** | Adapting a trend to the brand | Trend format + our angle + CTA |
| **Reaction to a news hook** | Commentary on an event | Event (1 sentence) → Our stance → CTA |
| **Quote / fact of the day** | Inspiring quote or interesting fact | Quote/fact → Context (why it matters) → CTA |
| **Behind the scenes** | Behind the scenes of the brand | Describe the moment → Insight → CTA |
| **Engagement** | Poll, question, challenge | Question / condition → Answer / participation options |
| **Repost with commentary** | Sharing someone else's content with added value | Our commentary (hook) → Link/repost → CTA |

> The Conductor determines the type at Gate 1 → Copywriter uses the corresponding template.

## Pipeline

```
CONDUCTOR → COPYWRITER → REVIEWER → RELEASE CHECK (mini)
   G1            G2          G3           G4
```

### Rule of Parallelism

| Mode | When | How it works |
|-------|-------|-------------|
| **Sequential** (default) | Standard quick-post | Copywriter → Approved → Reviewer → Approved → Release |
| **Fast** (with user's permission) | Extremely urgent, user explicitly requested | Copywriter → Reviewer **without a pause for Approved** between them. Approved only after Reviewer |

> Fast mode = exception to Rule 1. Only if the user **explicitly** requested acceleration.

## Gates and Deliverables

### Gate 1: Conductor
**Input:** User task
**Actions:**
1. Pass the **Blast Radius checklist** — confirm that the task is suitable for the Quick Pipeline.
2. Determine the **type of quick-post** from the table.
3. Determine the platform and key parameters (topic, ToV, CTA).
4. Formulate the task for the Copywriter in **3-5 sentences**.
5. Initialize the mini-board (`$board` — Quick Pipeline).
**Mandatory skills:** `$board`
**Deliverable:** Short brief: topic + platform + post type + ToV + CTA goal
**Verification:** Blast Radius checklist passed, type determined
**→ Wait for "Approved"**

> **Auto-transition:** If the task is obvious (user provided topic + platform) and explicitly said "quickly" — Conductor can suggest an auto-transition. But the decision belongs to the user.

### Gate 2: Copywriter
**Input:** Short brief from Conductor
**Actions:**
1. Apply ToV (`$tone-of-voice`).
2. Choose the structure template according to the **type of quick-post**.
3. Write the post for the platform (`$social-media-formats`).
4. Formulate the hook / headline (`$headline-formulas`).
5. Add CTA (`$cta-optimization`).
6. Check platform limits (characters, hashtags).
7. If there are factual assertions → `$fact-checking` (mandatory).
**Mandatory skills:** `$tone-of-voice`, `$social-media-formats`, `$cta-optimization`
**Optional:** `$headline-formulas`, `$fact-checking` (if facts are in the text)
**Deliverable:** Ready post text + hashtags
**Verification:** Text is complete, matches platform, ToV, post type
**→ Wait for "Approved" (or immediate handoff in fast mode)**

### Gate 3: Reviewer
**Input:** Text from Copywriter
**Actions:**
1. **Quick check** against `$content-review-checklist` — **Blockers and Critical only**:
   - [ ] Topic matches the task
   - [ ] CTA is present
   - [ ] ToV matches the brand
   - [ ] No prohibited words (stop-list)
   - [ ] No factual errors (if facts exist)
   - [ ] Platform limits followed
2. Brand compliance (`$brand-compliance`) — **core parameters** (not the full checklist).
3. Platform compliance (`$platform-compliance`) — **technical requirements**.
**Mandatory skills:** `$brand-compliance`
**Optional:** `$platform-compliance`
**Deliverable:** APPROVED or **1-2 specific fixes** (not lists, not a detailed checklist)

**If APPROVED:** → Gate 4 (Release Check)
**If fixes:** → Reverse handoff → Copywriter → fix → repeat Gate 3

**Verification:** No Blockers
**→ Wait for "Approved"**

### Gate 4: Release Check (mini)
**Input:** APPROVED from Reviewer
**Actions:**
- Final reconciliation (30 seconds):
  - [ ] Text = final version (not draft)
  - [ ] Hashtags are in place
  - [ ] Publication time is optimal (if matters)
  - [ ] Brand compliance ✅
- Update `$board` — all gates `[✓]`
- Update `domains/content/CONTEXT.md` (brief entry)
**Deliverable:** Post is ready for publication
**→ Final "Approved" → Publish immediately**

## Reverse Handoff — Return Protocol

If Reviewer gives **fixes** (not APPROVED):

```
Reviewer (1-2 fixes)
    │
    └── Reverse $handoff → Copywriter
        └── Copywriter makes fixes (< 5 min)
            └── Forward $handoff → Reviewer (repeat G3)
```

**Rules for Quick Pipeline:**
1. Reviewer gives **maximum 1-2 fixes** — no detailed checklist. Quick = fast.
2. If fixes > 3 → task is **not quick** → suggest `/edit-content`.
3. Maximum of **2 iterations** (Copywriter → Reviewer → Copywriter → Reviewer). If not APPROVED → escalate to user.
4. Update `$board` at each return.

## Execution Time

| Stage | Target time | Maximum |
|------|--------------|----------|
| Gate 1: Conductor | 1-2 min | 5 min |
| Gate 2: Copywriter | 3-8 min | 15 min |
| Gate 3: Reviewer | 1-3 min | 5 min |
| Gate 4: Release Check | 30 sec | 1 min |
| **Total** | **5-15 min** | **30 min** |

> If > 30 minutes → stop, suggest `/start-content` or `/edit-content`.

## Mode Limitations

- ❌ Do not conduct research (`$trend-research`, `$topic-research`, `$source-verification`).
- ❌ Do not create a visual brief (text only). If visuals are needed → `/start-content` or `/edit-content`.
- ❌ Do not revise strategy (audience, platform).
- ❌ Do not launch `$moodboard`, `$image-prompt-engineering`.
- ❌ Reviewer does not perform full `$content-review-checklist` — only Blockers.
- ✅ If there are factual assertions in the text → `$fact-checking` is **mandatory** even in Quick.
- ✅ `$brand-compliance` is **always** mandatory (Rule 7 from pipeline-rules).

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Quick for controversial topic | Scandal, negativity, reputational loss | Blast Radius checklist. Controversial → `/start-content` |
| Quick for promo / offer | No elaboration of CTA, offer, funnel | Promo → `/start-content` or `/edit-content` |
| Skip brand compliance | "It's quick" — but the brand is compromised | Brand compliance is ALWAYS mandatory. Rule 7 |
| Facts without verification | "It's quick" — but the fact is wrong → loss of trust | Facts → `$fact-checking` even in Quick |
| Quick dragged heavily > 30 min | It's not quick anymore — scope creep | Stop, switch mode |
| Reviewer writes 10 remarks | It's not a quick review — the task is too complex | Maximum 1-2 fixes. If > 3 → `/edit-content` |
| No hashtags / CTA | "Fast = can be without CTA" — no | CTA is mandatory. Hashtags per platform rules |
| Quick without `$board` | Tracking loss | Mini-board is mandatory |

## Output Template (Gate 1 — Conductor)

```
### Quick Post — Initialization

**Topic:** [topic]
**Platform:** [platform]
**Type of quick-post:** [opinion / trend / news hook / quote / BTS / engagement / repost]
**Goal:** [engagement / awareness / traffic / opinion]
**Context:** [why now — trend, event, date]

#### Blast Radius checklist
- [✅] Topic is not controversial / political
- [✅] No complex factual assertions
- [✅] Audience and platform are known
- [✅] Not a promo / offer
- [✅] Blast radius on error is minimal
- [✅] Estimated time ≤ 30 min

**Mode:** [sequential / fast (if requested by user)]

#### Brief for Copywriter (3-5 sentences)
[Topic. Platform. Tone. CTA goal. Structure template by post type.]

#### Mini-board
| # | Gate | Status |
|---|------|--------|
| G1 | Conductor | [→] In progress |
| G2 | Copywriter | [ ] Waiting |
| G3 | Reviewer | [ ] Waiting |
| G4 | Release Check | [ ] Waiting |

→ Waiting for "Approved" to proceed to Copywriter
```
