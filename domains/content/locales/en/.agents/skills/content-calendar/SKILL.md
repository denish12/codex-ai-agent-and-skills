---
name: content-calendar
description: Complete content calendar — topics, personas, funnel, content mix, recurring pillars, deadlines, cross-posting, balance check
---
# Content Calendar

## When to use
- During **strategic planning** — weekly, monthly, quarterly, or for a campaign.
- During **content scaling** — shifting from chaotic posting to a system.
- During **strategy revision** — rebalancing after metrics analysis or shifting priorities.
- After **`$audience-analysis`**, **`$platform-strategy`**, **`$competitor-content-analysis`** — the calendar aggregates their findings into an action plan.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Planning horizon | ✅ | Week / month / quarter / campaign (with dates) |
| TA Personas | ✅ | From `$audience-analysis` — for distribution across posts |
| Platforms and frequency | ✅ | From `$platform-strategy` — where and how much to post |
| Brand guidelines | ✅ | From `$brand-guidelines` — ToV, visual style |
| Business goals for the period | ✅ | What the business expects from content (launch, leads, awareness) |
| Newsjacks / events | ⬚ | Holidays, industry events, product launches, seasons |
| Competitor analysis recommendations | ⬚ | From `$competitor-content-analysis` — gaps and opportunities |
| `$trend-research` results | ⬚ | Current trends to embed |
| Recurring pillars | ⬚ | If already defined — repeating formats |
| Previous calendar + metrics | ⬚ | For iteration: what worked, what didn't |

> If personas or platforms are not provided — **request them from the user** or direct them to `$audience-analysis` / `$platform-strategy`.

## Key Definitions

### Content Types (Content Mix)

| Type | Description | Example |
|-----|----------|--------|
| Educational | How-to, tips, breakdowns, guides | "5 email-marketing mistakes" |
| Sales | Offers, case studies, reviews, demos | "Client increased conversion by 40%" |
| Entertainment | Memes, trends, interactive | Meme about deadlines + poll |
| Image | Mission, team, behind the scenes | "How we run a retro" |
| Community | UGC, Q&A, challenges | "Show us your workspace" |

### Funnel Stages

| Stage | Goal | KPI |
|------|------|-----|
| **TOFU** | Awareness — attract new audience | Reach, followers |
| **MOFU** | Consideration — build trust | Engagement, saves, read time |
| **BOFU** | Decision — convert | Clicks, leads, sales |

## Protocol

### Step 1 — Period Framework
1. Record the **horizon** (start and end dates).
2. Note the **period's key events**: holidays, industry events, launches, seasonal triggers.
3. Define **business priorities**: what's most crucial (awareness / leads / sales).

### Step 2 — Recurring Pillars
1. Determine **recurring pillars** (if any are present or needed):
   - Fixed day + format (e.g., Monday = Tip, Wednesday = Case, Friday = Meme).
   - Series (e.g., "Industry Myths", "Tool of the Week").
2. Pillars should fill ~40-60% of slots. The rest is situational content.

### Step 3 — Topic Distribution
For each slot in the calendar determine:
1. **Topic** — a specific angle (not "marketing", but "why UTM tracking breaks in email").
2. **Persona** — which persona from `$audience-analysis` this is for.
3. **Funnel stage** — TOFU / MOFU / BOFU.
4. **Content type** — educational / sales / entertainment / image / community.
5. **Format** — post / carousel / reel / article / email / thread / stories.
6. **Platform** — main channel.

Topic sources:
- Personas' pain points and triggers (from `$audience-analysis`).
- Competitor gaps (from `$competitor-content-analysis`).
- Trends (from `$trend-research`).
- Period events.
- Recurring pillars.

### Step 4 — Cross-posting
For each content unit, determine:
1. Is it suitable for adaptation on other platforms?
2. What changes are required (format, length, CTA, visuals)?
3. Add cross-posting rows to the calendar (marked as `↳ adaptation`).

### Step 5 — Production Deadlines
For each content unit — a countdown from the publication date:

| Stage | Offset | Responsible |
|------|----------|---------------|
| Brief ready | Publication − N days | Strategist |
| Text ready | Publication − N days | Copywriter |
| Visual ready | Publication − N days | Visual Concept |
| Review passed| Publication − N days | Reviewer |
| Ready to post| Publication − 1 day | — |

> Specific offsets depend on volume and complexity. Agree with the user upon the first planning session, then use as a standard.

### Step 6 — Balance Check
Review the calendar across 4 axes:

1. **Content Mix** — proportions by type:
   - Recommended balance (adapt to business): Educational 30-40% · Sales 15-25% · Entertainment 15-20% · Image 10-15% · Community 10-15%.
   - If > 40% sales — the calendar "pressures" the audience.

2. **Funnel** — stage coverage:
   - TOFU 40-50% · MOFU 30-35% · BOFU 15-25%.
   - There shouldn't be a week without TOFU (no influx of new audience).

3. **Personas** — even coverage:
   - Priority persona → more content, but others shouldn't be abandoned.

4. **Formats** — variety:
   - No more than 50% of an identical format (all posts = text without visuals = boring).

### Step 7 — ID Assignment
Assign a unique ID to every content unit:
```
[Platform]-[YYYYMMDD]-[sequence number]
Example: IG-20260415-01, TG-20260415-02
```
This ID is utilized in `$content-brief` to link the brief to the calendar unit.

## Validation (Quality Gate)

The calendar is considered ready if:

- [ ] All slots are filled (no empty dates given the frequency from `$platform-strategy`)
- [ ] Each unit has: topic, persona, funnel, type, format, platform
- [ ] Each unit has a unique ID
- [ ] Content mix sits within acceptable proportions (no skew > 40% of one type)
- [ ] The funnel is balanced (there's TOFU + MOFU + BOFU every week)
- [ ] All personas are covered (priority gets more, others not forgotten)
- [ ] Key events are factored in (holidays, launches, seasons)
- [ ] Cross-posting is marked (adaptations appropriately flagged)
- [ ] Production deadlines are set
- [ ] Balance check passed across all 4 axes
- [ ] Approved by the user

## Handoff

| Outcome | Routing |
|------|---------|
| Calendar approved | → `$content-brief` for each content unit (by ID) |
| Research needed before brief | → `$topic-research` / `$trend-research` → then `$content-brief` |
| Strategy revision needed | → back to `$audience-analysis` / `$platform-strategy` |

When handing off — use `$handoff` attaching the calendar and the balance summary.

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$audience-analysis` | **Source:** personas, pain points, triggers → topics |
| `$platform-strategy` | **Source:** platforms, frequency, formats, timing |
| `$competitor-content-analysis` | **Source:** gaps → topics and formats |
| `$trend-research` | **Source:** trends → situational content |
| `$tone-of-voice` | **Source:** tone for each persona |
| `$content-brief` | **Consumer:** each calendar unit → brief by ID |
| `$board` | Update content production progress |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Everything is sales | Audience gets tired, unfollows | Sales content ≤ 25% |
| No TOFU | No new audience acquisition | TOFU 40-50% every week |
| Topics without an angle | "SEO" is not a topic | A specific angle: "Why alt-tags beat meta titles" |
| No persona attached | Content "for everyone" = for no one | Every post is for a specific persona |
| Calendar without a buffer | One sick day breaks the chain | 1-2 slots a week = buffer / situational |
| Forgotten holidays | Competitors celebrate, you fall silent | Jot down key events prior to planning |
| No cross-posting | Content is made 1 time for 1 platform | One piece of content → 2-3 adaptations |
| Identical formats | Everything is text zero visuals | Alternate formats, ≤ 50% of one type |
| Missing deadlines | Content won't be ready for publish date | Backward countdown from publish date |

## Output Template

```
### Content Calendar — [Period: date — date]

**Horizon:** [week / month / quarter / campaign]
**Business priority for the period:** [awareness / leads / sales / launch]
**Platforms:** [list]
**Personas:** [list from $audience-analysis]

---

#### Period Events
| Date | Event | Type | Relevance |
|------|-----------|-----|---------------|
| [date] | [event] | [holiday / industry / product / season] | [high / medium] |

#### Recurring Pillars
| Day | Pillar | Format | Content type | Persona |
|------|---------|--------|-------------|---------|
| Mon | [pillar name] | [format] | [type] | [persona] |
| Wed | [pillar name] | [format] | [type] | [persona] |
| Fri | [pillar name] | [format] | [type] | [persona] |

---

#### Calendar

| ID | Date | Day | Topic | Persona | Funnel | Type | Format | Platform | Cross-posting | Text Deadline | Visual Deadline | Status |
|----|------|------|------|---------|---------|-----|--------|-----------|---------------|----------------|-----------------|--------|
| IG-20260407-01 | 04/07 | Mon | [topic] | [persona] | TOFU | Educational | Carousel | Instagram | TG (adaptation) | 04/04 | 04/05 | [ ] |
| TG-20260407-01 | 04/07 | Mon | ↳ adaptation IG-20260407-01 | [persona] | TOFU | Educational | Post | Telegram | — | 04/05 | — | [ ] |
| IG-20260409-01 | 04/09 | Wed | [topic] | [persona] | MOFU | Sales | Reel | Instagram | — | 04/06 | 04/07 | [ ] |

---

#### Balance Summary

**Content Mix:**
| Type | Count | % | Norm | Status |
|-----|-----------|---|-------|--------|
| Educational | [N] | [%] | 30-40% | ✅/⚠️ |
| Sales | [N] | [%] | 15-25% | ✅/⚠️ |
| Entertainment | [N] | [%] | 15-20% | ✅/⚠️ |
| Image | [N] | [%] | 10-15% | ✅/⚠️ |
| Community | [N] | [%] | 10-15% | ✅/⚠️ |

**Funnel:**
| Stage | Count | % | Norm | Status |
|------|-----------|---|-------|--------|
| TOFU | [N] | [%] | 40-50% | ✅/⚠️ |
| MOFU | [N] | [%] | 30-35% | ✅/⚠️ |
| BOFU | [N] | [%] | 15-25% | ✅/⚠️ |

**Personas:**
| Persona | Count | % | Priority | Status |
|---------|-----------|---|-----------|--------|
| [Persona 1] | [N] | [%] | ⭐ Priority | ✅/⚠️ |
| [Persona 2] | [N] | [%] | Secondary | ✅/⚠️ |

**Formats:**
| Format | Count | % | Status (≤50%) |
|--------|-----------|---|---------------|
| [format] | [N] | [%] | ✅/⚠️ |

---

**Total for the period:**
- Publications: [N] (of which [M] cross-posting)
- Platforms: [list]
- Buffer slots: [N]

**→ Next step:** create a `$content-brief` for each unit, beginning with the closest dates
```
