---
name: competitive-analysis
description: Competitor benchmarking — features, pricing, positioning, competitive advantages
---
# Competitive Analysis — Competitor Benchmarking

## When to Use
- When entering a new market — to understand the competitive landscape.
- When developing a positioning strategy — differentiation from competitors.
- When setting pricing — benchmarking competitor prices and packages.
- When new competitors emerge or competitive dynamics shift.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Product / Service | ✅ | What we are analyzing in a competitive context |
| Market / Niche | ✅ | Which category we compete in |
| Known Competitors | ⬚ | List, if available; otherwise will be identified |
| Key Product Features | ⬚ | For building a comparison matrix |
| Current Pricing | ⬚ | Current pricing model for benchmarking |
| Target Audience | ⬚ | From `$icp-buyer-persona`, if available |
| Analysis Focus | ⬚ | Features / Pricing / Positioning / Full |

> If required fields are not provided — **ask the user** before starting the analysis. Do not assume.

## Data Sources
1. **Web Search** — competitor websites, reviews, ratings (G2, Capterra, TrustRadius, Product Hunt).
2. **Financial Data** — public filings, funding rounds (Crunchbase, PitchBook).
3. **Marketing Materials** — landing pages, blogs, case studies from competitors.
4. **Social Signals** — customer reviews, discussions on Reddit, HN, industry forums.
5. **Analyst Reports** — Gartner Magic Quadrant, Forrester Wave, industry reviews.

> For each competitor — a minimum of 2 independent information sources.

## Protocol

### Step 0 — Context Gathering
Verify the availability of required input data. Determine the focus and depth of analysis. Request any missing information from the user.

### Step 1 — Competitor Identification
Classify competitors into three categories:
- **Direct** — solve the same problem for the same segment in the same way.
- **Indirect** — solve the same problem in a different way or for a different segment.
- **Aspirational** — market leaders worth benchmarking against (even if in a different category).
- Total: 3-5 direct + 2-3 indirect + 1-2 aspirational.

### Step 2 — Feature Matrix
Build a comparative table of key features:
- Identify 10-20 key features / criteria.
- Group by category (Core, Advanced, Integrations, Support).
- Rate each competitor: yes / no / partial / best-in-class.
- Highlight unique features of each competitor.

### Step 3 — Pricing Analysis
- Collect public pricing from all competitors.
- Normalize to a single model for comparison ($/month, $/user, $/transaction).
- Identify pricing strategies: premium / value / freemium / usage-based.
- Uncover hidden costs (onboarding, support, integrations).

### Step 4 — Positioning Map
Build positioning along two key axes:
- Select axes based on market priorities (price vs features, simplicity vs power, etc.).
- Place all competitors on the map.
- Identify empty zones (unoccupied positions).
- Identify competitor clusters.

### Step 5 — Strengths and Weaknesses
For each competitor:
- **Strengths** — what they do better (technology, brand, price, UX, ecosystem).
- **Weaknesses** — what they do worse (limitations, complaints, technical debt).
- **Sources** — where data comes from (reviews, testing, public information).

### Step 6 — Competitive Moats
Identify sustainable advantages of each competitor:
- Network effects, switching costs, brand.
- Technology barrier, patents, exclusive data.
- Economies of scale, integration ecosystem.
- Assess moat strength: weak / medium / strong.

### Step 7 — Strategic Recommendations
Based on the analysis — recommendations for positioning:
- Where to differentiate (unoccupied niches, competitor weaknesses).
- Which features are critical for competition (table stakes).
- Pricing strategy relative to the market.
- Risks: what competitors could copy / improve.

## Validation (Quality Gate)

- [ ] At least 3 direct + 2 indirect competitors identified
- [ ] Feature matrix contains at least 10 criteria
- [ ] Pricing normalized to a single model for comparison
- [ ] Positioning map built along 2 axes
- [ ] Strengths and weaknesses with sources listed for each competitor
- [ ] Competitive moats identified for key competitors
- [ ] Positioning recommendations are specific and actionable
- [ ] No outdated data (all pricing and feature data is current)

> If validation fails — refine until passing, do not hand off incomplete work.

## Handoff
The output of `$competitive-analysis` serves as input for:
- **Strategist / Mediator** — competitive landscape for strategic decisions.
- `$tam-sam-som` — competitor market shares for SOM estimation.
- `$icp-buyer-persona` — positioning influences target persona selection.
- `$jtbd-analysis` — competing solutions for each Job.

When handing off — use `$handoff` with the competitor matrix and key recommendations.

## Anti-patterns

| Mistake | Why It's Bad | Best Practice |
|---------|-------------|---------------|
| Only direct competitors | Misses threats from adjacent markets | Include indirect and aspirational competitors |
| Copying leader's features | "Feature race" without strategy | Differentiate rather than copy |
| Analysis without sources | Subjective assessments without evidence | Support every claim with data |
| Outdated pricing | Competitors change pricing frequently | Verify currency on competitor's website |
| Focus only on features | Features are not the only competitive axis | Analyze UX, brand, ecosystem, support |
| Too many competitors | Loss of focus, superficial analysis | 5-8 key ones, brief overview for the rest |
| No recommendations | Analysis for analysis' sake | Conclude with an actionable strategy |

## Output Template

```
### Competitive Analysis — [Product / Service]

**Market:** [niche]
**Geography:** [regions]
**Focus:** [Features / Pricing / Positioning / Full]
**Analysis Date:** [date]

---

#### Competitive Landscape

| Competitor | Type | Segment | Year Founded | Size | Key Feature |
|------------|------|---------|--------------|------|-------------|
| [Competitor A] | Direct | [segment] | [year] | [size] | [feature] |
| [Competitor B] | Direct | [segment] | [year] | [size] | [feature] |
| [Competitor C] | Indirect | [segment] | [year] | [size] | [feature] |

---

#### Feature Matrix

| Criterion | Our Product | Competitor A | Competitor B | Competitor C |
|-----------|-------------|--------------|--------------|--------------|
| [Feature 1] | ✅ | ✅ | ⬚ | ✅ |
| [Feature 2] | ✅ | ✅ | ✅ | ⬚ |
| [Feature 3] | ⬚ | ✅ | ✅ | ✅ |
| **Total** | [X]/[N] | [X]/[N] | [X]/[N] | [X]/[N] |

---

#### Pricing

| Competitor | Model | Starting Price | Mid Plan | Enterprise | Strategy |
|------------|-------|---------------|----------|------------|----------|
| [Competitor A] | [model] | $[X]/mo | $[X]/mo | On request | [strategy] |
| [Competitor B] | [model] | $[X]/mo | $[X]/mo | $[X]/mo | [strategy] |

---

#### Positioning Map

| Competitor | [X-Axis: label] | [Y-Axis: label] | Position |
|------------|-----------------|-----------------|----------|
| [Competitor A] | High | High | Premium |
| [Competitor B] | Medium | Low | Value |
| **Our Product** | [?] | [?] | [recommendation] |

**Unoccupied Zones:** [description]

---

#### Strengths and Moats

| Competitor | Strengths | Weaknesses | Moat | Strength |
|------------|-----------|------------|------|----------|
| [Competitor A] | [list] | [list] | [type] | Strong |
| [Competitor B] | [list] | [list] | [type] | Medium |

---

#### Strategic Recommendations
1. **Positioning:** [recommendation]
2. **Features (table stakes):** [required features]
3. **Differentiation:** [unique advantage]
4. **Pricing:** [strategy]
5. **Risks:** [what could change]
```
