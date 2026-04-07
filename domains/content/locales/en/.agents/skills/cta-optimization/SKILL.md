---
name: cta-optimization
description: CTA optimization — funnel, psychological triggers, formulas, platform adaptation, A/B variants, metrics
---
# CTA Optimization

## When to use
- While **creating content** — formulating a CTA for a post, email, landing page, article, or video.
- While **optimizing existing content** — the CTA is not converting and requires a revamp.
- During **A/B testing** — generating variants to compare.
- As **part of `$content-brief`** — the CTA section is formulated using this skill.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Target action | ✅ | What the user should do (one specific action) |
| Target persona | ✅ | From `$audience-analysis` — who the CTA is written for |
| Funnel stage | ✅ | TOFU / MOFU / BOFU — determines the type of CTA |
| Platform | ✅ | Where the CTA will be placed (affects format and placement) |
| Content context | ✅ | What the text/post is about — the CTA must logically follow from the content |
| Content type | ⬚ | Post / email / landing page / article / video / stories |
| Current CTA | ⬚ | If optimizing existing — current formulation and its metrics |
| Constraints | ⬚ | Legal restrictions, brand stop-list, platform limits |

> If the funnel stage is not specified — **determine it** from the context or ask the user. A CTA without a funnel = a CTA by guesswork.

## CTAs by funnel stage

| Stage | CTA Goal | Action Types | Examples |
|------|----------|---------------|---------|
| **TOFU** (Awareness) | Attract, spark interest, gain subscribers | Subscribe, save, share, learn more | "Subscribe to stay updated", "Save for later" |
| **MOFU** (Consideration) | Deepen trust, get a contact | Download, register, watch demo, sign up | "Download the free guide", "Watch the full breakdown" |
| **BOFU** (Decision) | Convert into a customer | Buy, checkout, try for free, book | "Try 14 days for free", "Book a spot" |

> **Rule:** The CTA must align with the stage. TOFU + "Buy now" = conflict. BOFU + "Subscribe" = missed conversion.

## Psychological triggers

| Trigger | Description | When to use | Example |
|---------|----------|-------------------|--------|
| **Value** | Clear benefit from the action | Always — base trigger | "Get a 50-point checklist" |
| **Urgency** | Time constraint | Launches, promos, events | "Free until Friday" |
| **Scarcity** | Quantity constraint | Limited offers | "Only 12 spots left" |
| **Social proof** | Others have already done it | Subscriptions, purchases, registrations | "Join 10,000+ subscribers" |
| **Loss aversion** | Fear of missing out (FOMO) | MOFU/BOFU, high competition | "Don't miss the opportunity" |
| **Curiosity gap** | Incompleteness, intrigue | TOFU, engaging content | "Find out which of the 5 methods works best" |
| **Reciprocity** | Give value for free → ask for action | Lead magnets, freemium | "Download for free — we've already compiled everything for you" |
| **Identity** | Connection to self-identification | Niches with a strong community | "For those building a serious business" |

> Combine 1-2 triggers. More than 2 = overload; the CTA sounds manipulative.

## CTA Formulas

### Formula 1: Verb + Result
```
[Action] + [what the user gets]
→ "Download the email marketing guide"
→ "Get a personalized plan"
```

### Formula 2: Value → Action
```
[What the user gets] → [minimal action]
→ "50 content ideas — download for free"
→ "Ready-made template — grab it in one click"
```

### Formula 3: Action + Urgency/Scarcity
```
[Action] + [restriction]
→ "Book a spot — 5 left"
→ "Try for free until the end of the week"
```

### Formula 4: Social Proof + Action
```
[Proof] + [action]
→ "10,000 marketers are already using it — try it yourself"
→ "Join 500+ students in the course"
```

### Formula 5: Question + Action-Answer
```
[Question targeting a pain point] → [action as the solution]
→ "Tired of planning content manually? Try [product]"
→ "Don't know where to start? Download the roadmap"
```

### Formula 6: Identity + Action
```
[Who you are] → [action for people like you]
→ "For founders who value time — automate"
→ "If you're serious about growth — subscribe"
```

## Platform adaptation

| Platform | CTA format | Placement | Constraints | Quirks |
|-----------|-----------|------------|-------------|-------------|
| **Instagram (post)** | Text in caption | End of caption (after the value) | No clickable links in caption | "Link in bio", arrow ↑ to bio |
| **Instagram (stories)** | Link sticker, swipe up | Last slide or overlaid on visual | Sticker has limited size | Large text + arrow to sticker |
| **Telegram** | Text + inline button / link | End of post | Markdown links, bot inline buttons | Buttons perform better than text links |
| **Email** | Button (primary) + text link (fallback) | Above the fold + repeated at the end | Button ≤ 4-5 words, contrasting color | One primary CTA; button CTR > link CTR |
| **Landing page** | Button (hero) + repeated along page | Hero section + after each value block + footer | Button ≤ 5 words | Button color contrasts with background, repeat 3-5 times |
| **YouTube** | Verbal + text in description + cards | Verbal: at start (teaser) + at the end. Description: first 2 lines | Only first 2 lines of description show without "show more" | "Link in description", end screen |
| **LinkedIn** | Text in post | End of post | Links lower organic reach | CTA without a link in the post, link in the first comment |

## Protocol

### Step 1 — Context
1. Obtain input data: persona, funnel, platform, goal.
2. Determine which triggers are appropriate for this persona and funnel stage.
3. Check constraints (legal, stop-list, platform).

### Step 2 — Generating variants
1. Select **2-3 formulas** from the list above that fit the context.
2. Formulate a CTA for each formula using the chosen triggers.
3. Total: **3-5 CTA variants**.

### Step 3 — Evaluating variants
Check each variant against:

| Criterion | Description |
|----------|----------|
| Explicitness | Is it clear what will happen after the click/action? |
| Value | Is there a clear benefit for the user? |
| Brevity | ≤ 5-7 words for a button, ≤ 15 words for a text CTA? |
| Funnel alignment | Does the CTA fit the TOFU/MOFU/BOFU stage? |
| Persona alignment | Does the CTA speak the target audience's language? |
| Platform alignment | Is the format suited to the platform? |
| Non-manipulative | No more than 2 triggers, no deception? |

### Step 4 — Placement
1. Determine the **primary placement** — where to put the CTA within the content.
2. Determine **repeat placement** — if the format allows (landing page, long article, email).
3. Record the format: button / link / text / verbal / sticker.

### Step 5 — Recommendation
1. Select the **recommended variant** with a rationale.
2. Propose a **variant for an A/B test** (differing by trigger or formula).
3. Specify metrics for evaluating performance.

## Validation (Quality Gate)

A CTA is considered optimized if:

- [ ] There is a single primary target action (not two of equal weight)
- [ ] The CTA aligns with the funnel stage
- [ ] The CTA contains clear value for the user
- [ ] The CTA is explicit and understandable (the reader knows what will happen)
- [ ] The CTA is ≤ 5-7 words (button) or ≤ 15 words (text)
- [ ] The format and placement are adapted to the platform
- [ ] No more than 2 psychological triggers are used
- [ ] There are at least 2 variants for A/B testing
- [ ] There is no conflict with legal restrictions or the brand's stop-list

## Handoff

| Consumer | How it's used |
|-------------|---------------|
| `$content-brief` | The CTA is inserted into the CTA section of the brief |
| `$email-copywriting` | CTA for email campaigns |
| `$seo-copywriting` | CTA for articles and landing pages |
| `$social-media-formats` | CTA adapted to the platform format |
| `$content-review-checklist` | The Reviewer checks the CTA against items #15-17 |

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$audience-analysis` | **Source:** persona, pain points, triggers, customer's language |
| `$content-brief` | **Consumer:** CTA as part of the brief |
| `$tone-of-voice` | **Source:** the tone of the CTA must match the brand's ToV |
| `$platform-strategy` | **Source:** platform → CTA format and placement |
| `$content-review-checklist` | Reviewer checks the CTA for alignment with the brief and funnel |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Several equal CTAs | Attention is scattered → none work | One primary CTA + a maximum of one secondary |
| CTA precedes value | The reader is not yet motivated | Ask for action after establishing value |
| TOFU + "Buy now" | Funnel conflict — a cold audience won't buy | TOFU = subscribe/save, BOFU = buy |
| "Learn more" / "Click here" | No value, no explicitness | Specific verb + result |
| 3+ triggers in one CTA | Sounds manipulative, breeds distrust | Keep to 2 triggers maximum |
| Same CTA everywhere | Fails to account for platform and context | Adapt to platform and format |
| Not in the audience's tongue | "Submit an application" for Zoomers | Utilize the customer's language from `$audience-analysis` |
| No A/B variants | Impossible to optimize without data | Formulate at least 2 variants to compare |

## Output Template

```
### CTA Optimization — [Content / Campaign]

**Target action:** [what the user should do]
**Persona:** [from $audience-analysis]
**Funnel Stage:** [TOFU / MOFU / BOFU]
**Platform:** [platform]
**Content Type:** [post / email / landing page / article / video]

---

#### Context Analysis
- **Persona's pain points (relevant):** [from $audience-analysis]
- **Persona's triggers:** [what motivates them to act]
- **Customer's language:** [words and phrases used by the target audience]
- **Constraints:** [legal / stop-list / platform-specific]

#### Selected triggers
1. [Trigger 1] — [why it fits]
2. [Trigger 2] — [why it fits]

---

#### CTA Variants

| # | Formula | CTA | Triggers | Evaluation |
|---|---------|-----|----------|--------|
| A | Verb + Result | "[CTA]" | [triggers] | [strengths/weaknesses] |
| B | Value → Action | "[CTA]" | [triggers] | [strengths/weaknesses] |
| C | Social Proof + Action | "[CTA]" | [triggers] | [strengths/weaknesses] |

#### Recommendation

**Primary CTA:** Variant [X] — "[CTA]"
**Rationale:** [why this variant is best for the given persona, funnel stage, and platform]

**For A/B test:** Variant [Y] — "[CTA]"
**Hypothesis:** [what are we testing — a different trigger? different formula?]

**Secondary CTA (if needed):** "[CTA]"

---

#### Placement

| Placement | Format | Note |
|------------|--------|------------|
| [primary — where in the content] | [button / link / text / sticker / verbal] | [platform specific quirks] |
| [repeat — if applicable] | [format] | [note] |

#### Performance metrics

| Metric | Target | How to measure |
|---------|-----------------|-------------|
| CTR | [%] | [tool / platform] |
| Conversion rate | [%] | [tool / platform] |
| [additional metric] | [value] | [tool] |

**→ Next step:** Insert the CTA into the `$content-brief` / hand off to the Copywriter
```
