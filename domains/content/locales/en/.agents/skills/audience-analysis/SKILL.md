---
name: audience-analysis
description: Deep target audience analysis with validation — segments, personas, pain points, triggers, platforms
---
# Audience Analysis

## When to use
- At the start of a content strategy — prior to `$content-calendar`, `$platform-strategy`, `$tone-of-voice`.
- When entering a new market / launching a new product / rebranding.
- When there is a noticeable discrepancy between engagement metrics and expectations (audience review).

## Input
The agent **must** receive from the user or the previous gate:

| Field | Required | Description |
|------|:-----------:|----------|
| Product / brand | ✅ | What we are promoting |
| Niche / industry | ✅ | What industry we operate in |
| Geo | ✅ | Target markets (countries / regions) |
| Business model | ✅ | B2B / B2C / B2B2C / DTC |
| Current channels | ⬚ | Where presence already exists |
| Existing analytics | ⬚ | GA, social networks, CRM data, surveys |
| Audience hypotheses | ⬚ | Who the user considers as the TA |

> If mandatory fields are not provided — **request them from the user** prior to starting the analysis. Do not invent details.

## Data Sources
The agent must rely on verifiable data, not guesswork:

1. **Web search** — industry reports, demographic research, platform statistics.
2. **Competitors** — analysis of competitors' followers, comments, reviews (intersects with `$competitor-content-analysis`).
3. **Platform analytics** — if the user has provided access to GA / Meta Insights / Telegram Stats.
4. **Reviews and forums** — Reddit, Trustpilot, thematic communities, YouTube comments.
5. **CRM / survey data** — if provided by the user.

> For each persona, specify at least 2 sources confirming its existence.

## Protocol

### Step 0 — Context collection
Check for the presence of all mandatory input data. If anything is missing — request it from the user.

### Step 1 — Segmentation
Define **2-5 audience segments** based on input data and research. Segmentation criteria depend on the business model:
- **B2C:** demographics + behavior + motivation.
- **B2B:** company size + decision-maker role + maturity stage.
- **B2B2C:** both layers (business client + end consumer).

### Step 2 — Building personas
For each segment — create a persona with a full profile (see output template).

### Step 3 — Journey and Jobs-to-be-Done map
For each persona:
- **Functional jobs** — what the person is trying to accomplish.
- **Emotional jobs** — how they want to feel.
- **Social jobs** — how they want to look in the eyes of others.
- **Pain points** — what prevents them from accomplishing the jobs.
- **Current alternatives** — how they solve the problem now.

### Step 4 — Triggers and barriers
- **Triggers** — events / circumstances that push towards action.
- **Barriers** — what hinders conversion (price, trust, complexity).

### Step 5 — Platforms and formats
- Where each persona spends time.
- What content formats they consume.
- At what time they are most active.

### Step 6 — Tone and language
- Which tone resonates (formal / friendly / expert / provocative).
- What words and phrases the audience itself uses (customer language).
- What trigger words work / what repels them.

### Step 7 — Prioritization
Rank personas by criteria:
- Segment size (reach).
- Solvency / LTV.
- Accessibility via content channels.
- Strategic importance for the business.

## Validation (Quality Gate)
The analysis is considered complete **only** if all points are fulfilled:

- [ ] All mandatory input data has been received
- [ ] 2-5 personas defined (no more, no fewer)
- [ ] Personas differ from each other (no duplication of segments)
- [ ] For each persona, ≥ 2 data sources are specified
- [ ] Pain points and triggers are specific and actionable (not "wants the best", but "doesn't have time to create content due to manual scheduling")
- [ ] Platforms and formats are specified for each persona
- [ ] Priority segment is determined with justification
- [ ] No internal contradictions between personas

> If validation is not passed — rework until successful, do not pass it further.

## Handoff
The result of this skill is the input for:
- `$platform-strategy` — choosing channels based on the platform preferences of the personas.
- `$tone-of-voice` — building the tone based on the language and tone of each segment.
- `$content-brief` — choosing a persona for a specific unit of content.
- `$content-calendar` — planning topics around pain points and triggers of specific personas.

When handing off — use `$handoff` specifying all personas and the priority segment.

## Anti-patterns
| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Personas without sources | Fantasy, not analysis | Every persona is backed by data |
| "Everyone 18-65" | Useless segmentation | Narrow, distinguishable segments |
| Demographics only | People of the same age behave differently | Add behavior, motivation, JTBD |
| Copying competitors | No differentiation | Find unoccupied audience niches |
| 10+ personas | Impossible to create content for everyone | Maximum 5, prioritize |
| Abstract pain points | "Wants the best" — not actionable | Specific problems with context |

## Output Template
```
### Audience Analysis — [Brand / Campaign]

**Business model:** [B2B / B2C / B2B2C]
**Geo:** [markets]
**Data sources:** [list of used sources]

---

#### Persona 1: [Name] ⭐ Priority
- **Demographics:** [age, gender, geo, income]
- **Profession:** [title, industry, company size]
- **Description:** [2-3 sentences — who this is, what they live by]

**Jobs-to-be-Done:**
- Functional: [list]
- Emotional: [list]
- Social: [list]

**Pain points:**
1. [Specific pain point] — *Source: [how we know]*
2. [Specific pain point] — *Source: [how we know]*

**Triggers:** [events motivating action]
**Barriers:** [what hinders conversion]
**Current alternatives:** [how they solve the problem now]

**Content preferences:**
- Platforms: [where they spend time]
- Formats: [what they consume]
- Activity time: [when online]
- Tone: [how to speak]
- Customer language: [keywords and phrases they use]
- Trigger words: [what attracts] | Stop words: [what repels]

---

#### Persona 2: [Name]
[Similar structure]

---

### Prioritization Matrix

| Persona | Reach | LTV | Accessibility | Strategic Importance | Total |
|---------|-------|-----|-------------|---------------------|-------|
| [Persona 1] | High | High | High | High | ⭐ 1 |
| [Persona 2] | Medium | High | Medium | Medium | 2 |

**Priority segment:** [Persona X] — [1-2 sentence justification]

### Recommendations for Next Stages
- **→ $platform-strategy:** [key takeaway for platform selection]
- **→ $tone-of-voice:** [key takeaway for tone]
- **→ $content-calendar:** [key takeaway for topics]
```
