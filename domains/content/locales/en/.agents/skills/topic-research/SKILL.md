---
name: topic-research
description: Topic Research — types (quick/standard/deep), search methodology, content gap analysis, minimum requirements, adaptive freshness
---
# Topic Research

## When to Use
- When creating **expert-level content** — articles, longreads, data-driven carousels.
- When **filling out the `$content-brief`** — gathering facts, statistics, and quotes for a specific content piece.
- When **entering a new topic** — initial deep dive prior to planning the content strategy.
- When **updating old content** — checking if the data is still relevant and finding fresh insights.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Topic | ✅ | Specific research topic (not "marketing", but "ROI of email marketing in B2B SaaS 2025-2026") |
| Content Brief | ⬚ | From `$content-brief` — if the research is for a specific content piece |
| Research Type | ✅ | Quick / Standard / Deep Dive (see below) |
| Audience Persona| ✅ | From `$audience-analysis` — determines the depth and angle of the research |
| Platform | ⬚ | Influences depth: an Instagram post vs a longread |
| Key Questions | ⬚ | If the user / Strategist has already defined what needs to be answered |

> If the topic is too broad — **refine** the specific angle before starting. "Email marketing" is not a topic. "Why open rates are dropping in B2B SaaS" is a topic.

## Research Types

| Type | When to use | Depth | Time | Minimums |
|------|-------------|-------|------|----------|
| **Quick** | Short post, stories, data meme | Surface: 2-3 key facts | Fast | 3 facts, 2 sources, 0 experts |
| **Standard** | Post, carousel, email, Telegram | Medium: 5-10 facts, 1-2 experts | Medium| 7 facts, 5 sources, 1 expert |
| **Deep Dive** | Article, longread, video essay | Deep: 10+ facts, 3+ experts, all angles | Slow | 12 facts, 8 sources, 3 experts, discussion points |

## Search Methodology

### Where to Look

| Source | What to find | Queries/Tools |
|--------|--------------|---------------|
| **Academic Databases**| Peer-reviewed studies, meta-analyses | Google Scholar, PubMed, Semantic Scholar |
| **Industry Reports** | Statistics, trends, forecasts | Statista, Gartner, McKinsey, Deloitte, HubSpot Research |
| **News Media** | Recent events, reactions | Google News, Reuters, Bloomberg, industry media |
| **Expert Blogs** | Opinions, case studies, hands-on experience| Industry blogs, Medium, Substack, experts' personal sites |
| **Social Media** | Opinions, trends, discussions, hot takes | LinkedIn (thought leaders), Twitter/X, Reddit |
| **YouTube** | Expert breakdowns, conferences, podcasts | YouTube Search, niche podcasts |
| **Company Data** | Case studies, benchmarks, product data | Official blogs, case studies, press releases |
| **Gov. Statistics** | Demographics, economy, markets | Census Bureaus, BLS, Eurostat, World Bank |

### Search Strategy

1. **Start broad** — find 2-3 overview articles/reports to understand the landscape.
2. **Dive into the data** — from the overviews → find the primary statistical sources.
3. **Find the experts** — who writes/talks about this? What are their positions?
4. **Spot the contradictions** — are there alternative viewpoints? Ongoing debates?
5. **Check freshness** — ensure the data is the most recent available.

### Search Query Formulas

| Goal | Query Template |
|------|----------------|
| Statistics | `"[topic] statistics 2025"`, `"[topic] data report"` |
| Trends | `"[topic] trends 2026"`, `"future of [topic]"` |
| Expert opinions | `"[topic]" site:linkedin.com`, `"[expert]" "[topic]"` |
| Studies | `"[topic]" site:scholar.google.com`, `"[topic] study research"` |
| Case studies | `"[topic] case study"`, `"[topic] results"` |
| Contradictions | `"[topic] myth"`, `"[topic] wrong"`, `"[topic] debate"` |

## Adaptive Freshness

Do not hardcode "2 years" — the threshold depends on the topic:

| Topic Type | Max Data Age | Examples |
|------------|--------------|----------|
| **Tech / Digital Mktg** | ≤ 1 year | AI, social media algorithms, SaaS metrics |
| **Business / Markets** | ≤ 2 years | Market size, consumer behavior |
| **Science / Med** | ≤ 5 yrs (basics), ≤ 2 yrs (breakthroughs)| Medical guidelines, scientific discoveries |
| **History / Culture** | No limit (but interpretations should be fresh)| Historical facts, cultural trends |
| **Legal** | Current legislation (check the date) | Laws, regulations — they could have changed |

> If the data is older than the threshold — **look for fresher data**. If none exists — use it with a disclaimer: "Data from [year], no recent updates found."

## Content Gap Analysis

Before writing — check what already exists:

| Step | Action | Why |
|------|--------|-----|
| 1 | Google the topic → examine the top-10 | What is already written? |
| 2 | Analyze the structure of the top 3-5 | Which subtopics are covered? |
| 3 | Find **gaps** — what's missing / poorly covered | Our unique contribution |
| 4 | Check PAA (People Also Ask) | Questions that lack good answers |
| 5 | Check Reddit / Quora | What questions are real people asking? |

> **Rule:** If the topic is thoroughly covered — find a unique angle: fresh data, a different audience, practical experience, or an unconventional format.

## Protocol

### Step 1 — Preparation
1. Receive the topic, define the research type (Quick / Standard / Deep Dive).
2. Refine the angle: narrow and specific.
3. Formulate **5-10 key questions** the research must answer.
4. Define the persona → translates to the depth and angle of the research.

### Step 2 — Content Gap Analysis
1. Check what already exists on the topic (Google Top-10, PAA, Reddit).
2. Find the gaps — establish our unique contribution.
3. Document: what we will do better / differently / deeper.

### Step 3 — Fact and Data Gathering
1. Use the search methodology to gather facts, statistics, and data.
2. For each fact — document: the value + the source + the year.
3. Adhere to the freshness threshold based on the topic type.
4. Reach the minimums defined by the research type.

### Step 4 — Expert Opinions
1. Find **experts** in the field — who writes, speaks, or researches this.
2. Collect **quotes** with full attribution (name, title, source).
3. For a Deep Dive — find at least 3 experts with differing perspectives.

### Step 5 — Discussion Points and Contradictions
1. Are there **alternative opinions** on the subject?
2. Are there **myths** we can debunk?
3. Document: Position A vs Position B — including arguments for both sides.

### Step 6 — Structuring
1. Group the data by **talking points/theses** (3-7 key points).
2. Attach supporting facts / statistics / quotes to each point.
3. Identify the **strongest fact** — this will be the hook / headline base.
4. Draft an **outline for the copywriter**.

### Step 7 — Handoff for Verification
1. Transfer all sources to `$source-verification`.
2. Wait for the verification results.
3. Replace rejected sources or remove unverified facts.

## Validation (Quality Gate)

The research is complete if:

- [ ] Key questions are formulated and all have been answered
- [ ] Content Gap Analysis is done (what exists, our unique angle)
- [ ] Minimums for the research type are met (facts, sources, experts)
- [ ] All data is within the freshness threshold (based on topic type)
- [ ] Expert opinions have proper attribution (name, title, source)
- [ ] Discussion points identified (for Standard and Deep Dive)
- [ ] Data is structured by talking points + the hook fact is highlighted
- [ ] Sources handed over to `$source-verification`
- [ ] Rejected sources are replaced or facts are removed

## Handoff

| Consumer | How it is used |
|----------|----------------|
| `$source-verification` | **Mandatory:** verifies all gathered sources |
| `$data-storytelling` | Facts and data → turned into a narrative |
| `$content-brief` | Facts, points, the hook → appended to the brief |
| Copywriter (agent) | Outline + facts → used to write the copy |
| `$fact-checking` | During the review phase — verifies the facts from the research |
| `$seo-copywriting` | LSI keywords, PAA questions from the gap analysis |

When transferring — use `$handoff` with the full report attached.

## Integration with other skills

| Skill | Interaction |
|-------|-------------|
| `$source-verification` | **Consumer:** reviews all sources |
| `$data-storytelling` | **Consumer:** receives facts → narrative |
| `$content-brief` | **Consumer:** populates the brief with research data |
| `$competitor-content-analysis`| **Complement:** overlapping context during gap analysis |
| `$audience-analysis` | **Source:** persona dictates the angle/depth of research |
| `$trend-research` | **Complement:** topic research = deep facts, trend = what's hot right now |
| `$fact-checking` | **Consumer:** checks the facts during the review stage |
| `$seo-copywriting` | **Consumer:** uses LSI words, PAA → SEO |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|---------|--------------|--------------------|
| Topic is too broad | "Marketing" yields 1M results, lacks focus | Narrow the angle: "ROI of email marketing in B2B SaaS 2026" |
| Stopping at Google Page 1 | 80% of top articles are rewrites of each other | Dig deeper: Scholar, Reddit, experts, primary sources |
| Facts without sources | Unverifiable, strips trust from content | Every fact = source + year |
| Old data without a disclaimer | Readers assume it's current | Note the year, always seek fresh data |
| No Content Gap Analysis | Writing the exact same thing others have | Check top-10, identify gaps |
| Only providing "Pro" points | One-sided content lacks depth | Present both sides, debunk myths |
| Deep Dive for an IG post | Overkill, wastes time | Research type = content type |
| Skipping verification | Unverified facts end up in the text | Always route through `$source-verification` |

## Output Template

```markdown
### Topic Research — [Topic]

**Type:** [Quick / Standard / Deep Dive]
**Angle:** [specific angle of the research]
**Persona:** [from $audience-analysis]
**Platform / Format:** [where the data will be used]
**Date of Research:** [YYYY-MM-DD]

---

#### Key Questions

| # | Question | Status |
|---|----------|--------|
| 1 | [question] | ✅ Answered / ⚠️ Partially / ❌ Not Found |
| 2 | [question] | ✅/⚠️/❌ |
| 3 | [question] | ✅/⚠️/❌ |

---

#### Content Gap Analysis

**What already exists (Top-5):**
| # | Source | Volume | What is Covered | What is NOT Covered |
|---|--------|--------|-----------------|---------------------|
| 1 | [URL/name] | [N words]| [topics] | [gaps] |
| 2 | [URL] | [N] | [topics] | [gaps] |

**PAA Questions without good answers:**
1. [question]
2. [question]

**Our unique contribution:** [what we will do better / differently / deeper]

---

#### Key Facts

| # | Fact | Value | Source | Year | Freshness |
|---|------|-------|--------|------|-----------|
| 1 | [fact] | [data] | [source] | [year] | ✅/⚠️ |
| 2 | [fact] | [data] | [source] | [year] | ✅/⚠️ |

**Hook-fact (for headline):** Fact #[N] — [why it is the strongest]

---

#### Statistics

| # | Statistic | Value | Source | Year |
|---|-----------|-------|--------|------|
| 1 | [desc.] | [num/%]| [source] | [year] |
| 2 | [desc.] | [num/%]| [source] | [year] |

---

#### Expert Opinions

| # | Expert | Title | Quote | Source |
|---|--------|-------|-------|--------|
| 1 | [name] | [title, firm] | "[quote]" | [link / pub] |
| 2 | [name] | [title] | "[quote]" | [source] |

---

#### Discussion Points

| # | Position A | Position B | Arguments A | Arguments B |
|---|------------|------------|-------------|-------------|
| 1 | [opinion] | [opinion] | [data] | [data] |

**Myths on the subject (if any):**
1. **Myth:** [common misconception]
   **Reality:** [the truth + source]

---

#### Copywriter's Outline

| # | Talking Point | Support | Type |
|---|---------------|---------|------|
| 1 | [point] | Fact #[N] | Statistic |
| 2 | [point] | Expert #[N] | Quote |
| 3 | [point] | Fact #[N] + Stat #[N] | Data + interpretation |
| 4 | [point] | Discussion #[N] | Contradiction |

---

#### Sources (for $source-verification)

| # | Source | URL | Type | Year | Verification Status |
|---|--------|-----|------|------|---------------------|
| 1 | [name] | [URL]| [journal/media/blog/report] | [year] | [pending / ✅ / ❌] |

**Total:** [N] sources | **Verified:** [N] | **Rejected:** [N] | **Pending:** [N]

**→ Next Step:** → `$source-verification` (verification) → Copywriter / `$data-storytelling` / `$content-brief`
```
