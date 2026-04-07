---
name: content-brief
description: Complete brief for a unit of content — goal, persona, key points, SEO, visuals, references, distribution, metrics
---
# Content Brief 

## When to use
- When **handing off a task** from Strategist to Researcher / Copywriter / Visual Concept.
- During **content planning** — each unit from `$content-calendar` gets its own brief.
- During **recreation / updating** of existing content (rewrite, repurpose).

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Topic / idea | ✅ | What the content is about — from `$content-calendar`, user assignment, or Strategist |
| TA Persona | ✅ | Specifically targeted persona from `$audience-analysis` |
| Platform | ✅ | From `$platform-strategy` — where it will be published |
| Format | ✅ | Post, article, reel, carousel, email, video, etc. |
| Brand guidelines | ✅ | From `$brand-guidelines` — ToV, visual standards |
| Publication date | ⬚ | From `$content-calendar` or the user |
| SEO data | ⬚ | Keywords, search intent (for text formats: article, blog, landing) |
| References | ⬚ | Content examples (own / competitor / from other niches) |

> If persona or platform is unsupplied — **request them from the user**. A brief without TA or channel is useless.

## Protocol

### Step 1 — Goal and Context
1. Record the **content goal** — what the reader must do after consuming it (subscribe, buy, click, remember the brand).
2. Define the **funnel stage**: TOFU (awareness) / MOFU (consideration) / BOFU (decision).
3. Indicate the **publication context** — why specifically now (trend, season, launch, current event).

### Step 2 — Audience and Tone
1. Assign a specific **persona** from `$audience-analysis`.
2. Document the **tone** for this persona (from `$tone-of-voice` / `$brand-guidelines`).
3. Specify the **customer language** — words and phrases that resonate with this persona.

### Step 3 — Content Core
1. Formulate an **exact topic** (not generic, but a specific angle).
2. Outline **key theses** (3-5 mandatory points).
3. Specify **forbidden topics** and phrasing.
4. List **mandatory elements** — facts, quotes, data, statistics.

### Step 4 — SEO (for text formats)
> Skip for non-SEO formats (stories, reels, email).

1. **Primary keyword** + 3-5 secondary ones.
2. **Search intent** — informational / navigational / transactional.
3. **SERP competitors** — top-3 search results (to gauge required quality).
4. **Meta-title and meta-description** — if applicable.

### Step 5 — Format and Structure
1. State the **format** (post, carousel, article, reel, email, thread, etc.).
2. Set the **volume/length** — characters / words / slides / seconds.
3. Describe the **structure** — sequence of sections, headings, hook.
4. Call out **platform constraints** — character limits, aspect ratios, duration.

### Step 6 — CTA
1. **Primary CTA** — one specific action (not "subscribe and buy and share").
2. **Secondary CTA** — if applicable (save, send to a friend).
3. CTA must align with the funnel stage from Step 1.

### Step 7 — Visual Requirements
1. Describe the **visual concept** — what is in the image/video.
2. Dictate the **style** — from `$brand-guidelines` (photo / illustration / typography / mix).
3. Give **dimensions** — appropriate to the platform.
4. If a full visual brief is required → link to `$visual-brief`.

### Step 8 — References
1. **Own best** — 1-2 examples of own content that worked.
2. **Competitor** — 1-2 examples from `$competitor-content-analysis`.
3. **Inspiration** — from other niches / platforms (if applicable).
4. For each reference — specifically note what to borrow (structure, tone, hook, visual).

### Step 9 — Distribution
1. **Primary channel** — where we publish.
2. **Cross-posting** — adaptations for other platforms (specify what must be altered).
3. **Promo** — organic / paid / both. Budget, if known.
4. **Partnerships** — collaborations, influencers, reposts (if planned).

### Step 10 — Metrics and Deadline
1. **Success metrics** — 2-3 specific KPIs with target values (ER > 5%, reach > 10K, clicks > 200).
2. **Production deadline** — when the content must be finished.
3. **Publication date** — when it goes live.

## Validation (Quality Gate)

A brief is deemed ready for handoff if:

- [ ] Goal is specific and measurable (not "gain attention", but "webinar subscriptions")
- [ ] A specific persona is listed (not "everyone")
- [ ] Platform and format are determined
- [ ] Key theses are specific (3-5 items)
- [ ] CTA is a single primary action, matching the funnel stage
- [ ] Volume and structure are laid out
- [ ] Visual requirements are specified (at least minimal)
- [ ] Metrics carry target values
- [ ] SEO-block is populated (for text formats) or marked N/A
- [ ] No conflicts (a TOFU goal + "buy now" CTA = conflict)

## Handoff

| Outcome | Routing |
|------|---------|
| Brief is ready, text is needed | → **Copywriter** (or Researcher → Copywriter if the topic mandates research) |
| Brief is ready, visuals are needed | → **Visual Concept** (with `$visual-brief` or the visual excerpt from this brief) |
| Brief is ready, text + visuals | → **Copywriter** + **Visual Concept** in parallel |

When handing off — use `$handoff` attaching the full brief and declaring its status.

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$content-calendar` | Source: topic, date, content unit ID |
| `$audience-analysis` | Source: persona, pain points, triggers, customer language |
| `$platform-strategy` | Source: platform, format, publication time |
| `$brand-guidelines` | Source: ToV, visual standards |
| `$tone-of-voice` | Source: detailed tone for the persona |
| `$competitor-content-analysis` | Source: references, gaps |
| `$visual-brief` | Consumer: detailed visual spec is drafted from the brief |
| `$seo-copywriting` | Consumer: implements the SEO-block from the brief |
| `$brand-compliance` | Verifies final content against data inside the brief |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| "Topic: marketing" | Too broad — the copywriter lacks an angle | Specific angle: "5 email-marketing mistakes for SaaS in 2026" |
| No persona | Text to nobody = text for nobody | Always a specific persona from `$audience-analysis` |
| 3 CTAs in one post | Attention scatter, conversion drops | One primary CTA |
| TOFU Goal + "buy" CTA | Conflict between funnel stage and action | CTA matches the stage: TOFU = subscribe/learn |
| Brief without deadline | Task without timeframe = without priority | Always feature production deadline + publication date |
| Lacking references | Copywriter guesses the baseline | 2-3 references explicitly stating "what to take" |
| Non-specified volume | Results in 200 words or 2,000 | Provide a definite range: "800-1000 words" |

## Brief Statuses

| Status | Meaning |
|--------|----------|
| `Draft` | Brief is in progress, not all fields are filled |
| `Ready` | Brief passed validation, ready for handoff |
| `In Production` | Content is being fashioned based on the brief |
| `Review` | Content bounced back for verification |
| `Done` | Content published |

## Output Template

```
### Content Brief — [Topic]

**ID:** [unique ID from content calendar]
**Status:** [Draft / Ready / In Production / Review / Done]
**Version:** [N]
**Publication Date:** [date]
**Production Deadline:** [date]

---

#### 1. Goal and Context
- **Goal:** [what the reader should do]
- **Funnel stage:** [TOFU / MOFU / BOFU]
- **Context:** [why now — trend, season, launch]

#### 2. Audience
- **Persona:** [name from $audience-analysis]
- **Pain points:** [key persona pain points relevant to the topic]
- **Triggers:** [motivators for action]
- **Customer language:** [words and phrases]

#### 3. Content Core
- **Topic:** [exact topic / specific angle]
- **Key theses:**
  1. [thesis 1]
  2. [thesis 2]
  3. [thesis 3]
- **Forbidden topics:** [list]
- **Mandatory elements:** [facts, quotes, data, statistics]

#### 4. SEO (if applicable)
- **Primary keyword:** [keyword]
- **Secondary:** [list]
- **Search intent:** [informational / navigational / transactional]
- **SERP competitors:** [top-3 URLs + pros/cons]
- **Meta:** Title: [≤60 characters] · Description: [≤160 characters]
> N/A — if format lacks an SEO component.

#### 5. Format and Structure
- **Platform:** [platform]
- **Format:** [post / carousel / article / reel / email / thread]
- **Volume:** [characters / words / slides / seconds]
- **Structure:**
  1. Hook — [description]
  2. Main body — [description]
  3. Close — [description]
- **Platform constraints:** [limits]

#### 6. Style
- **ToV:** [tone from $brand-guidelines / $tone-of-voice]
- **Visual style:** [from $brand-guidelines]
- **Visual dimensions:** [WxH px]
- **Visual concept:** [what's pictured/videoed]
> Full visual brief → `$visual-brief` (if needed)

#### 7. CTA
- **Primary CTA:** [one specific action]
- **Secondary CTA:** [if there is one]
- **Funnel alignment:** [TOFU→subscribe / MOFU→download / BOFU→buy]

#### 8. References
| # | Source | Link | What to borrow |
|---|----------|--------|-----------|
| 1 | [own / competitor / inspiration] | [link] | [structure / hook / tone / visual] |
| 2 | [own / competitor / inspiration] | [link] | [what to borrow] |

#### 9. Distribution
- **Primary channel:** [platform]
- **Cross-posting:** [platforms + what to adapt]
- **Promo:** [organic / paid / budget]
- **Partnerships:** [collaborations, if any]

#### 10. Success Metrics
| Metric | Target |
|---------|-----------------|
| [ER / reach / clicks / conversions] | [number or %] |
| [metric 2] | [number or %] |

**→ Hand over to:** [Copywriter / Researcher / Visual Concept]
```
