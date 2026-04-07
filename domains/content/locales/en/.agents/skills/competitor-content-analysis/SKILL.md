---
name: competitor-content-analysis
description: Deep analysis of competitor content — content mix, funnel, ER, gaps, comparative matrix, recommendations for differentiation
---
# Competitor Content Analysis 

## When to use
- During **content strategy development** — prior to `$content-calendar` and `$platform-strategy`.
- When **entering a new platform** — understanding what works for competitors on this channel.
- Upon a **drop in metrics** — finding out what competitors do better.
- During **quarterly/monthly review** — updating the competitive landscape.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Brand / product | ✅ | Whose content is analyzed in comparison (our brand) |
| Niche / industry | ✅ | To search for competitors if none are supplied |
| Competitor list | ⬚ | 3-5 competitors. If unsupplied — agent proposes and agrees with the user |
| Platforms for analysis | ⬚ | If unspecified — derived from `$platform-strategy` or determined by competitor presence |
| Analysis period | ⬚ | Default 30 days. Adapt: seasonal business → 90 days, launch → 14 days |
| Existing analytics | ⬚ | The brand's own metrics for comparison (ER, reach, frequency) |

> If competitors are not provided — the agent proposes a list by criteria: **direct** (same product, same TA), **indirect** (different product, same pain point), **aspirational** (niche leaders we aspire to). The list must be **approved by the user** before starting the analysis.

## Data Sources and Methodology

### Where to gather data
1. **Social networks directly** — competitor profiles: feed, stories, reels, highlights, pinned posts.
2. **Web search** — competitor blogs, guest posts, PR, YouTube.
3. **Comments and reviews** — what the audience says under competitor posts.
4. **Tools** (if user access is granted) — SimilarWeb, SEMrush, Social Blade, Brand24.
5. **Telegram channels** — content, reposts, reactions.

### ER (Engagement Rate) Formula
Use a uniform formula to ensure a valid comparison:

```
ER (%) = (Likes + Comments + Reposts + Saves) / Followers × 100
```

- If exact data is unavailable — use an **estimation** marked with `≈` and indicate the method (visual estimation, sampling N posts).
- For Telegram: `ER = Views / Subscribers × 100` (reactions as a bonus).
- For YouTube: `ER = (Likes + Comments) / Views × 100`.

## Protocol

### Step 0 — Preparation
1. Obtain all mandatory input data.
2. If competitors are missing — propose 3-5 by criteria (direct / indirect / aspirational) and get approval.
3. Define the analysis period (adapt to context).
4. Identify platforms for analysis.

### Step 1 — Profile of each competitor
For each competitor, collect:
1. Presence platforms and audience size on each.
2. Publishing frequency (posts/week per platform).
3. Top-5 posts by engagement over the period — log the topic, format, ER.
4. ToV and visual style — description + 2-3 characteristic examples.
5. ER — via formula or estimation (indicate method).

### Step 2 — Content Mix
Determine the proportions of content types for each competitor:

| Type | Description |
|-----|----------|
| Educational | How-to, tips, breakdowns, guides |
| Sales | Offers, case studies, reviews, demos |
| Entertainment | Memes, trends, interactive |
| Brand / Image | Mission, team, behind the scenes, values |
| Community | UGC, questions, polls, Q&A |

Record rough % splits and identify which type yields the best ER.

### Step 3 — Funnel Analysis
Assess how competitors cover the funnel stages with content:

| Stage | Goal | Content Examples |
|------|------|------------------|
| **TOFU** (Awareness) | Capture attention | Viral content, trends, broad topics |
| **MOFU** (Consideration) | Build trust | Case studies, comparisons, expert content |
| **BOFU** (Decision) | Convert | Offers, demos, reviews, CTA |

Determine: which stages are oversaturated and which are empty (gaps).

### Step 4 — Gaps and Opportunities
1. **Content gaps** — topics that no competitor covers, or covers poorly.
2. **Format gaps** — formats not utilized (podcasts, carousels, threads, etc.).
3. **Funnel gaps** — funnel stages lacking content.
4. **Platform gaps** — platforms where competitors are absent but the TA exists.
5. **ToV gaps** — an unoccupied tone (e.g., everyone is serious → opportunity for humor).

### Step 5 — Comparative Matrix
Assemble a side-by-side comparison of all competitors + our brand (if data exists):
- Audience, frequency, ER, content mix, funnel, ToV.
- Visually highlight where our brand is stronger / weaker.

### Step 6 — Differentiation Recommendations
Based on gaps and the matrix — 3-5 specific actionable recommendations:
- What to do (format, topic, platform).
- Why it will work (gap + data).
- Priority (High / Medium / Low).

## Validation (Quality Gate)

The analysis is considered complete if:

- [ ] 3-5 competitors analyzed (approved by the user)
- [ ] For each competitor: profile, top-5 posts, ER, ToV
- [ ] Content mix is defined for each competitor (% by type)
- [ ] Funnel analyzed (TOFU / MOFU / BOFU coverage)
- [ ] Gaps identified across at least 2 categories (content, format, funnel, platform, ToV)
- [ ] Comparative matrix includes all competitors
- [ ] Recommendations are specific and actionable (3-5 items with priorities)
- [ ] All ERs calculated by a single formula or marked as `≈ estimation`
- [ ] No confirmation bias — competitor strengths are also recorded

## Handoff

The result of this skill serves as input for:

| Consumer | How it's used |
|-------------|---------------|
| `$platform-strategy` | Platform gaps → channel selection |
| `$content-calendar` | Topic and format gaps → content planning |
| `$audience-analysis` | Competitor audience → refining personas |
| `$tone-of-voice` | ToV gaps → picking an unoccupied tone |
| `$content-brief` | Recommendations → specific content briefs |

When handing off — use `$handoff` attaching the comparative matrix and the top-3 recommendations.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Analysis without approving the competitor list | You might analyze irrelevant ones | Agree with the user prior to starting |
| Confirmation bias | Hunting only for competitor weaknesses | Record their strengths too |
| Surface scrolling | "They post memes" — not an analysis | Top-5 posts, ER, content mix in % |
| Mismatched periods | Competitor A over 30 days vs B over 7 | Unified period for everyone |
| ER without methodology | "Engagement is high" — subjective | Unified formula, numbers, method |
| Only one competitor | Fails to show the market picture | Minimum 3 to detect patterns |
| Recommendations without data | "We need more reels" — why? | Every recommendation is tied to a specific gap |

## Output Template

```
### Competitor Analysis — [Niche / Brand]

**Period:** [start date] — [end date] ([N days])
**Platforms:** [list]
**Data sources:** [how collected — manually / tools]
**ER method:** [formula]

---

#### Competitor 1: [Name]
- **Type:** [direct / indirect / aspirational]
- **Platforms and audience:**
  | Platform | Followers | Frequency (posts/wk) | ER |
  |-----------|------------|--------------------|----|
  | [platform] | [number] | [number] | [%] |

- **Top-5 posts:**
  | # | Platform | Topic | Format | ER | Why it worked |
  |---|-----------|------|--------|----|-----------------|
  | 1 | [platform] | [topic] | [format] | [%] | [reason] |

- **Content mix:**
  | Type | % | ER of this type | Example |
  |-----|---|---------------|--------|
  | Educational | [%] | [%] | [example] |
  | Sales | [%] | [%] | [example] |
  | Entertainment | [%] | [%] | [example] |
  | Image | [%] | [%] | [example] |
  | Community | [%] | [%] | [example] |

- **Funnel:** TOFU [strong/medium/weak] · MOFU [strong/medium/weak] · BOFU [strong/medium/weak]
- **ToV:** [description + 2-3 characteristic examples]
- **Visual style:** [description]
- **Strengths:** [list]
- **Weaknesses:** [list]

---

#### Competitor 2: [Name]
[Similar structure]

---

### Comparative Matrix

| Metric | [Our brand] | [Competitor 1] | [Competitor 2] | [Competitor 3] |
|---------|-------------|---------------|---------------|---------------|
| Followers (main platform) | [number] | [number] | [number] | [number] |
| Frequency (posts/wk) | [number] | [number] | [number] | [number] |
| ER | [%] | [%] | [%] | [%] |
| Dominant format | [format] | [format] | [format] | [format] |
| Content mix (leading type) | [type] | [type] | [type] | [type] |
| Funnel (strongest stage) | [stage] | [stage] | [stage] | [stage] |
| ToV | [description] | [description] | [description] | [description] |

---

### Gaps and Opportunities

| # | Gap type | Description | Opportunity for us | Priority |
|---|---------|----------|---------------------|-----------|
| 1 | Content | [topic uncovered] | [how to leverage] | High |
| 2 | Format | [format unused] | [how to leverage] | Medium |
| 3 | Funnel | [stage sans content] | [how to fill it] | High |
| 4 | Platform | [platform without presence] | [how to claim it] | Low |
| 5 | ToV | [tone unoccupied] | [how to differentiate] | Medium |

---

### Differentiation Recommendations

| # | Recommendation | Based on gap | Why it will work | Priority |
|---|-------------|---------------|------------------|-----------|
| 1 | [what to do] | Gap #[N] | [data / logic] | High |
| 2 | [what to do] | Gap #[N] | [data / logic] | High |
| 3 | [what to do] | Gap #[N] | [data / logic] | Medium |

**→ Next step:** hand over to `$platform-strategy` (channel selection) and `$content-calendar` (topic planning)
```
