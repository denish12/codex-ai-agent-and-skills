---
name: data-storytelling
description: Turning data into narratives — data story types, persuasion techniques, data-driven visualization, platform adaptation
---
# Data Storytelling — Data-Driven Narratives

## When to use
- After **gathering facts and statistics** (`$topic-research`, `$source-verification`) — to structure them into a story.
- When creating **analytical content** — articles, carousels, infographics, reports.
- When **justifying a position** — case studies, comparisons, predictions.
- To **reinforce any content** with data — even 1-2 numbers make a post more persuasive.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Data / facts | ✅ | Numbers, statistics, research findings — the building blocks of the story |
| Data sources | ✅ | Where the data comes from: research, analytics, API, report, `$source-verification` |
| Topic / context | ✅ | What we are talking about — mapping to the content topic |
| Target persona | ✅ | From `$audience-analysis` — dictates depth and language |
| Platform | ✅ | Determines volume, visualization format, and depth |
| Content goal | ⬚ | To inform / persuade / engage / convert |
| Data story type | ⬚ | If omitted — the agent determines it based on the data's character |

> If data is absent — **ask the user** or redirect to `$topic-research` / `$source-verification`. Do not fabricate numbers.

## Data Story Types

| Type | When to use | Question it answers | Example |
|-----|-------------------|----------------------------|--------|
| **Trend** | Data shows change over time | "What's happening and where is it heading?" | "The market for AI agents grew by 340% in a year" |
| **Comparison** | Comparing 2+ subjects or periods | "Who is better / what has changed?" | "Email vs Telegram: Marketing channel ROI" |
| **Anomaly** | An unexpected fact, an outlier, a contradiction | "Why is this strange?" | "87% of companies use AI, but only 12% see ROI" |
| **Correlation** | Connection between two factors | "What is linked to what?" | "Companies with a content strategy generate 6× more leads" |
| **Forecast** | Data allows for extrapolation | "What happens next?" | "By 2027, 50% of content will be AI-generated" |
| **Scale** | Showcasing the magnitude of a phenomenon | "Just how big/small is this?" | "7.5M blog posts are published daily — that's 87 posts a second" |

> The type dictates the narrative structure and choice of visualization.

## Narrative structures by type

### Trend
```
Context (what was) → Inflection point → Trend (data) → What it means → Forecast/CTA
```

### Comparison
```
Broad context → Subject A (data) → Subject B (data) → Key differentiator → Conclusion
```

### Anomaly
```
Expectation (what everyone thinks) → Reality (data) → Why it's the case → Insight → Conclusion
```

### Correlation
```
Observation → Connection (data A + data B) → Cause/mechanism → What to do about it
```

### Forecast
```
Current state (data) → Growth/decline factors → Forecast → What to do right now
```

### Scale
```
Abstract number → Scaling (translating to relatable terms) → Why it matters → Conclusion
```

## Persuasion techniques

| Technique | Description | Example |
|---------|----------|--------|
| **Scaling** | Translating an abstract number into something relatable | "$3.5 trillion — that's more than the UK's GDP" |
| **Simile / Comparison** | Juxtaposing with something familiar | "It's as if every third resident of London..." |
| **Antithesis** | Contrasting expectation and reality | "Everyone thinks X. In reality — Y" |
| **Metaphor** | Converting data into imagery | "Email marketing is like fishing: 95% of the catch depends on the bait (subject line)" |
| **Personalization** | Bringing it down to a single person's level | "The average marketer spends 6 hours a week planning content" |
| **Before/After** | Showing the state before and after | "Before automation: 3 days. After: 15 minutes" |
| **Rule of Three** | Three facts are remembered best | "Faster. Cheaper. More efficient." |
| **Q&A** | Asking a question, answering with data | "How much does a lead cost? $5 on Instagram vs $50 on LinkedIn" |

> Use 1-3 techniques per data story. Any more results in overload.

## Visualization by data type

| Data / Story type | Recommended visualization | When NOT to use |
|--------------------|--------------------------|-----------------------|
| **Trend** (time) | Line chart, Area chart | Pie chart (lacks a time axis) |
| **Comparison** (categories) | Bar chart (horizontal), Grouped bar | Line chart (implies continuity) |
| **Proportions** (parts of whole)| Pie chart (≤ 5 segments), Stacked bar | Pie chart with 10+ segments |
| **Correlation** (two vars) | Scatter plot, Bubble chart | Bar chart (doesn't show connection) |
| **Scale** (one big fact) | Big number + context, Pictogram | Complex graph (kills the impact) |
| **Ranking** (order) | Horizontal bar (sorted) | Pie chart (no inherent order) |
| **Process** (stages) | Funnel chart, Sankey diagram | Pie chart |
| **For social media** | Carousel w/ 1 graph per slide, infographics | Complex dashboards |

> If data is sparse (1-3 numbers) — visualization is unnecessary. A prominent number within the text suffices.

## Data Validation (mandatory)

Prior to building a narrative — verify the data:

| Criterion | Question | Risk if unverified |
|----------|--------|----------------------|
| **Recency** | When was the data gathered? | Outdated statistics = false conclusions |
| **Source** | Who conducted the research? Is there a methodology? | Unreliable source = zero trust |
| **Sample size** | How many respondents / data points? | Small sample = mere coincidence |
| **Context** | Is the data cherry-picked? | Cherry-picking = manipulation |
| **Causation vs Correlation**| Is the link causal or coincidental? | False causality = erroneous takeaway |
| **Completeness** | Are both "pro" AND "con" data shown? | One-sidedness = bias |

> If data fails validation — discard it. Fewer, yet reliable numbers are vastly superior.

## Platform adaptation

| Platform | Depth | Number of facts | Visualization | Format |
|-----------|---------|-------------------|-------------|--------|
| **LinkedIn** | High — comprehensive analysis | 5-10 facts | Infographics, carousel, graph screenshot | Long post / article |
| **Instagram** | Medium — 1 insight + 2-3 facts | 2-4 facts | Carousel (1 fact = 1 slide), infographics | Carousel / reel |
| **Telegram** | Medium-to-High | 3-7 facts | Embedded tables, link to full report | Well-formatted post |
| **Twitter/X** | Low — 1 hook-fact | 1-2 facts | Graph screenshot / big number | Thread or standalone tweet |
| **YouTube** | High — visual narrative | 5-15 facts | Animated graphs, B-roll w/ data | Video essay / teardown |
| **Blog / article** | Maximum | 10+ facts | Inline graphs, tables, interactives| Longread |
| **Email** | Medium — 1 core insight | 2-3 facts | Big number, mini-infographic | Digest / newsletter |

## Protocol

### Step 0 — Data gathering and validation
1. Procure input data: facts, sources, topic, persona, platform.
2. Undergo **data validation** via the 6 criteria.
3. Weed out unreliable data — work exclusively with verified figures.

### Step 1 — Determining the data story type
1. Analyze the character of the data — trend? comparison? anomaly?
2. Select the type (or a combo of 2 types).
3. Select the narrative structure fitting that type.

### Step 2 — The Core Insight
1. From the pile of data — abstract **one core insight** (the main idea).
2. Formulate it within a single sentence.
3. Check: is the insight **non-obvious**? If it's common knowledge — it's not an insight.

### Step 3 — Hook-Fact
1. Select the **strongest / most unexpected fact** from the data.
2. This serves as the headline, hook, or opening sentence.
3. Check: does the fact evoke a "really?!" or "I had no idea" reaction?

### Step 4 — Constructing the narrative
1. Distribute the data across the chosen type's narrative structure.
2. Apply **1-3 persuasion techniques**.
3. For each fact — spell out "what it means" (not merely a digit, but an interpretation).
4. Conclusion — **takeaway + CTA** (what to do with this newly acquired knowledge).

### Step 5 — Visualization
1. Decide if visualization is even requisite (skip if only 1-3 numbers).
2. Select visualization type based on the mapping table.
3. Describe the visualization (for `$visual-brief` or the designer).

### Step 6 — Platform adaptation
1. Ascertain depth and number of facts from the platform table.
2. Adapt the format (longread vs carousel vs thread).
3. Adapt the voice/diction to the target persona.

### Step 7 — Final Review
Run through the filter:
1. Does the story make sense **without numbers**? (numbers should confirm, not supplant the story).
2. Do the numbers make sense **without context**? If not — apply scaling.
3. Is the insight **non-obvious**?
4. Is the data **free of misleading elements**?

## Validation (Quality Gate)

A data story is ready if:

- [ ] All data passed validation (6 criteria)
- [ ] A data story type is designated
- [ ] The core insight is formulated (1 sentence, non-obvious)
- [ ] A Hook-fact is appointed (evokes a reaction)
- [ ] The narrative mimics the targeted type's structure
- [ ] 1-3 persuasion techniques are harnessed
- [ ] Each fact carries an interpretation ("what it means")
- [ ] Visualization chosen (or lack thereof justified)
- [ ] Adapted for platform and persona
- [ ] Final review cleared (4 questions)

## Handoff

| Consumer | How it's used |
|-------------|---------------|
| `$content-brief` | Data story serves as the core of a specific content piece |
| `$social-media-formats` | Adapting a data story into social media formats |
| `$visual-brief` | Outlines visualization specs for the designer |
| `$seo-copywriting` | Data story anchors an SEO-driven article |
| `$email-copywriting` | Hook-fact + insight embedded into an email |
| Copywriter (agent) | Narrative framework guides the draft |

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$topic-research` | **Source:** data and facts pertinent to the topic |
| `$source-verification` | **Source:** verified statistical data |
| `$audience-analysis` | **Source:** persona → dictates depth and tone |
| `$platform-strategy` | **Source:** platform → dictates volume and format |
| `$fact-checking` | **Consumer:** verifies data assertions in the final draft |
| `$visual-brief` | **Consumer:** receives spec for visualizations |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Contextless numbers | "A $4.2T market" — so what? Is that a lot? | Scaling: "That's bigger than Germany's GDP" |
| Data eclipsing story | A laundry list of facts sans narrative | Structure first, data as confirmation second |
| Cherry-picking | Showcasing only the "pretty" data | Display the full picture, "ugly" facts included |
| Correlation = Causation | "Ice cream → drownings" | Explicitly note: correlation, not causation |
| Fossilized data | "A 2019 study" in 2026 | Keep data ≤ 2 years old (≤ 1 year for fast-moving markets) |
| Fact spam | 15 facts crammed into one post | 2-5 facts for social; save the rest for longreads |
| No insight | Everyone already knew it | Insight = a non-obvious deduction drawn from data |
| Fabricated data | The agent hallucinates "statistics" | Utilize strictly verified sources |

## Output Template

```
### Data Story — [Topic]

**Type:** [Trend / Comparison / Anomaly / Correlation / Forecast / Scale]
**Persona:** [from $audience-analysis]
**Platform:** [platform]
**Data sources:** [list w/ years]

---

#### Core Insight
[One sentence — the central, non-obvious deduction derived from the data]

#### Hook-Fact (Headline material)
[The most potent / surprising fact — evocative of a reaction]

---

#### Narrative

**Context:** [Why this matters right now — 1-2 sentences]

**[Structure dictated by data story type]:**

| Fact | Source | What it means |
|------|----------|---------------|
| [Fact 1 — specific number] | [source, year] | [interpretation tailored to persona] |
| [Fact 2 — specific number] | [source, year] | [interpretation tailored to persona] |
| [Fact 3 — specific number] | [source, year] | [interpretation tailored to persona] |

**Insight:** [Non-obvious deduction — the connective tissue between the isolated numbers]

**Takeaway / CTA:** [What to do with this info → tied to the content's objective]

---

#### Persuasion Techniques
1. [Technique 1] — application: "[excerpt from text]"
2. [Technique 2] — application: "[excerpt from text]"

#### Visualization

| Element | Visual type | Data | Platform specs |
|---------|------------|--------|---------------------|
| [what's being visualized] | [line chart / bar / big number / ...] | [what data] | [dimensions, style] |

> N/A — if data is scant (1-3 facts) and visualization is unwarranted.

#### Data Validation

| Criterion | Status | Note |
|----------|--------|------------|
| Recency (≤ 2 years) | ✅/❌ | [data year] |
| Reliable source | ✅/❌ | [who conducted it] |
| Sufficient sample | ✅/❌ | [N respondents/points] |
| Not out of context | ✅/❌ | |
| Causation vs Correlation | ✅/❌ | |
| Complete (no cherry-picking) | ✅/❌ | |

---

#### Platform Adaptation
- **Depth:** [high / medium / low]
- **Number of facts:** [N]
- **Format:** [carousel / post / thread / longread / video]
- **Language:** [adaptations specific to persona]

**→ Next step:** forward to `$content-brief` / `$visual-brief` / Copywriter
```
