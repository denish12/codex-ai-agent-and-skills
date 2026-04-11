---
name: competitive-analysis
description: Competitor benchmarking — features, pricing, positioning, competitive advantages
---
# Competitive Analysis — Competitor Benchmarking

## When to use
- When entering a new market — to understand the competitive landscape.
- When developing a positioning strategy — differentiation from competitors.
- When pricing — benchmarking competitors' prices and packages.
- When discovering new competitors or due to changes in competitive dynamics.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Product / service | ✅ | What we are analyzing in a competitive context |
| Market / niche | ✅ | Which category we are competing in |
| Known competitors | ⬚ | List, if available; otherwise they will be determined |
| Key product features | ⬚ | To build a comparison matrix |
| Current pricing | ⬚ | Current pricing model for the benchmark |
| Target audience | ⬚ | From `$icp-buyer-persona`, if available |
| Analysis focus | ⬚ | Features / Pricing / Positioning / Full |

> If mandatory fields are not provided — **ask the user** before starting the analysis. Do not guess.

## Data Sources
1. **Web search** — competitor websites, reviews, ratings (G2, Capterra, TrustRadius, Product Hunt).
2. **Financial data** — public reports, funding rounds (Crunchbase, PitchBook).
3. **Marketing materials** — competitor landing pages, blogs, case studies.
4. **Social signals** — customer reviews, discussions on Reddit, HN, professional forums.
5. **Analytical reports** — Gartner Magic Quadrant, Forrester Wave, industry overviews.

> For each competitor — at least 2 independent sources of information. Every fact — indicating the source and date. Data older than 12 months — mark with ⚠️ and verify via `web-research`.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `web-research` | Data on competitors, pricing, features, reviews (steps 1-6) | Main collection tool — call at every step |
| `swot-analysis` | Strengths/weaknesses of our product for comparison (step 5) | If there is no internal S/W assessment |
| `tam-sam-som` | Market size, shares for assessing competitor scale (step 1) | If the market size is unknown |
| `blue-ocean-strategy` | Unoccupied positions, ERRC for differentiation (steps 4, 7) | If the analysis reveals an overcrowded zone |
| `icp-buyer-persona` | Target personas to assess competitive overlap | If there is no data on the target audience |

## Protocol

### Step 0 — Context collection
1. Check the availability of mandatory input data.
2. Determine the focus of the analysis:

   | Focus | Depth | Steps |
   |-------|---------|------|
   | Features | Feature matrix + implementation quality | 0-2, 5, 7 |
   | Pricing | Tiers + model + hidden costs | 0-1, 3, 7 |
   | Positioning | Map + messaging + audience | 0-1, 4, 7 |
   | Full | All of the above | 0-7 |

3. Request missing data from the user.
4. Determine the horizon: current snapshot + dynamics over the last 12 months.

### Step 1 — Identification of competitors
1. Classify competitors into three categories:
   - **Direct** — solve the same problem for the same segment in the same way (3-5).
   - **Indirect** — solve the same problem in a different way or for a different segment (2-3).
   - **Aspirational** — market leaders to look up to (1-2).
2. For each competitor, assemble a profile card:

   | Field | Description |
   |------|----------|
   | Name | Legal entity / brand |
   | Type | Direct / Indirect / Aspirational |
   | Year founded | Maturity |
   | Size | Employees, revenue (if public) |
   | Funding | Rounds, investors (if startup) |
   | Target segment | Who they sell to |
   | Key feature | Main differentiation |
   | Dynamics (12 mo) | Growing ↗ / Stable → / Declining ↘ |

### Step 2 — Feature matrix
1. Define 10-20 key features / criteria.
2. Group by categories (Core, Advanced, Integrations, Support).
3. Evaluate each competitor on the implementation quality scale:

   | Rating | Meaning |
   |:------:|----------|
   | ★★★ | Best in class — competitive advantage |
   | ★★ | Good implementation — at the market level |
   | ★ | Basic implementation — exists, but weak |
   | — | Missing |

4. Calculate the score: ★★★ = 3, ★★ = 2, ★ = 1, — = 0. Total for each competitor.
5. Highlight unique features of each competitor (found only in one).
6. Define table stakes — features that everyone has (mandatory minimum).

### Step 3 — Pricing analysis
1. Collect the public pricing tiers of all competitors.
2. Bring to a unified model for comparison:

   | Competitor | Model | $/mo (entry) | $/mo (average) | $/mo (enterprise) | Free tier | Strategy |
   |-----------|--------|:-----------------:|:---------------:|:-----------------:|:---------:|-----------|
   | [A] | Per seat | $XX | $XX | On request | Yes / No | Premium |

3. Determine pricing strategies: premium / value / freemium / usage-based.
4. Identify hidden costs (onboarding, support, integrations, minimum contract).
5. Calculate the pricing index: `our price / average of competitors × 100`.

### Step 4 — Positioning map
1. Choose axes based on market priorities:

   | Popular axis pairs | When to use |
   |---------------------|--------------------|
   | Price × Features | Classic value vs features comparison |
   | Simplicity × Power | For products with different UX approaches |
   | Verticalization × Horizontality | Niche vs universal solutions |
   | Self-serve × Sales-led | Distribution model |

2. Place all competitors on the map (score 1-10 on each axis).
3. Identify clusters of competitors (concentration zones).
4. Identify empty zones (unoccupied positions — potential for differentiation).
5. Determine the recommended position for our product.

### Step 5 — Strengths and weaknesses
For each competitor:

| Aspect | Strengths | Weaknesses | Source |
|--------|----------------|----------------|----------|
| Technology | [+] | [-] | [Source, date] |
| UX / design | [+] | [-] | [Source, date] |
| Brand / reputation | [+] | [-] | [Source, date] |
| Price / value | [+] | [-] | [Source, date] |
| Ecosystem / integrations | [+] | [-] | [Source, date] |
| Support / service | [+] | [-] | [Source, date] |

> Support each thesis with data: review, rating, fact. Not "good UX", but "4.7/5 on G2 (234 reviews), +0.3 vs category average".

### Step 6 — Competitive Moats and threats
1. Identify the sustainable advantages of each competitor:

   | Moat type | Description | Examples |
   |---------|----------|---------|
   | Network effects | Value grows with the number of users | Marketplaces, social networks |
   | Switching costs | High migration cost | ERP, CRM with deep integration |
   | Brand | Awareness and trust | Enterprise brands |
   | Technological barrier | Patents, unique technology | AI models, proprietary data |
   | Economies of scale | Cost drops with growth | Infrastructure products |
   | Ecosystem | Lock-in through integrations and plugins | Platforms with app store |

2. Evaluate moat strength: weak / medium / strong.
3. **Threat score** — rank competitors by aggregate threat:

   | Criterion | Weight | Scale |
   |----------|:---:|:-----:|
   | Audience overlap | 0.25 | 1-10 |
   | Feature overlap | 0.20 | 1-10 |
   | Moat strength | 0.20 | 1-10 |
   | Growth dynamics | 0.20 | 1-10 |
   | Resources (funding, team) | 0.15 | 1-10 |

   `Threat Score = Σ(weight × score)`. Rank: **≥ 7.0 High**, **4.0-6.9 Medium**, **< 4.0 Low**.

### Step 7 — Dynamics and trends (12 months)
1. For each key competitor, record changes over the last 12 months:

   | Competitor | Feature changes | Price changes | New segments | Funding | Strategic pivot |
   |-----------|:-------------:|:-------------:|:--------------:|:--------------:|:----------------------:|
   | [A] | +3 major features | 15% increase | Entry into enterprise | Series C, $50M | No |

2. Identify trends: where the market as a whole is heading.
3. Identify potential new threats: startups, big tech, adjacent markets.

### Step 8 — Strategic recommendations
Based on the analysis:
1. **Positioning** — recommended position on the map, messaging.
2. **Table stakes** — features mandatory for competition (possessed by all direct competitors).
3. **Differentiation** — a unique advantage based on the weaknesses of competitors and empty zones.
4. **Pricing** — recommended strategy and level relative to the market.
5. **Risky bets** — what competitors can copy / improve, what to bet on.
6. **Recommended actions:**

   | # | Action | Purpose | Against whom | Priority | Deadline |
   |---|----------|------|-------------|:---------:|------|
   | 1 | [What to do] | [What effect] | [Competitor] | P1/P2/P3 | [When] |

## Example — CRM for the SMB segment

**Context:** A new CRM platform for small business, the Russian market. Pricing model: per seat. Focus: full analysis.

### Competitive landscape

| Competitor | Type | Segment | Year | Size | Dynamics |
|-----------|-----|---------|-----|--------|:--------:|
| amoCRM | Direct | SMB-Mid | 2009 | ~600 emp. | → |
| Bitrix24 | Direct | SMB-Ent | 2012 | ~1500 emp. | ↗ |
| Megaplan | Direct | SMB | 2008 | ~200 emp. | ↘ |
| HubSpot | Aspirational | SMB-Ent (global) | 2006 | 7000+ emp. | ↗ |
| Notion | Indirect | SMB (PM→CRM) | 2013 | ~500 emp. | ↗ |

### Feature matrix (fragment)

| Criterion | Our product | amoCRM | Bitrix24 | Megaplan | HubSpot |
|----------|:-----------:|:------:|:---------:|:--------:|:-------:|
| Sales funnel | ★★ | ★★★ | ★★ | ★ | ★★★ |
| Email integration | ★★ | ★★ | ★★ | ★ | ★★★ |
| Telephony | ★ | ★★★ | ★★ | ★★ | ★ |
| AI assistant | ★★★ | — | ★ | — | ★★ |
| Mobile app | ★★ | ★★ | ★ | ★ | ★★★ |
| Automations | ★★ | ★★ | ★★★ | ★ | ★★★ |
| **Score** | **12** | **12** | **11** | **6** | **15** |

**Table stakes:** sales funnel, email, mobile app.
**Our unique feature:** AI assistant (★★★, only we have it at this level).

### Threat Score

| Competitor | Audience overlap | Feature overlap | Moat | Dynamics | Resources | **Score** | **Rank** |
|-----------|:-----------------:|:-----------:|:---:|:--------:|:-------:|:---------:|:--------:|
| amoCRM | 9 | 8 | 7 | 5 | 6 | **7.2** | 🔴 High |
| Bitrix24 | 7 | 7 | 8 | 7 | 8 | **7.3** | 🔴 High |
| Megaplan | 8 | 5 | 3 | 3 | 3 | **4.8** | 🟡 Medium |
| HubSpot | 4 | 9 | 9 | 8 | 10 | **7.6** | 🔴 High |
| Notion | 3 | 3 | 6 | 8 | 7 | **4.9** | 🟡 Medium |

**Main threats:** HubSpot (score 7.6, strong moat + resources), Bitrix24 (7.3, ecosystem), amoCRM (7.2, maximum overlap).

### Recommendations

| # | Action | Against whom | Priority |
|---|----------|-------------|:---------:|
| 1 | Strengthen the AI assistant as the main differentiator | amoCRM, Bitrix24 (no AI) | P1 |
| 2 | Pricing strategy: value (lower than amoCRM, higher than Megaplan) | amoCRM | P1 |
| 3 | 1C integration (table stakes in RF, we don't have it yet) | Bitrix24 | P2 |
| 4 | Positioning: "AI-first CRM for small businesses" | All | P1 |

## Validation (Quality Gate)

- [ ] Identified at least 3 direct + 2 indirect competitors with profile cards
- [ ] Feature matrix contains at least 10 criteria with quality score (★/★★/★★★)
- [ ] Table stakes and unique features explicitly identified
- [ ] Pricing brought to a unified model for comparison
- [ ] Positioning map built along 2 axes with clusters and empty zones
- [ ] Strengths and weaknesses provided for each competitor with sources and dates
- [ ] Competitive moats identified for key competitors with a strength rating
- [ ] Threat score calculated, competitors ranked by threat level
- [ ] 12 mo dynamics recorded: changes in features, prices, strategy
- [ ] Recommendations are specific, prioritized, and linked to competitors
- [ ] For each competitor — at least 2 independent sources
- [ ] Data sources indicated; data older than 12 mo marked with ⚠️

> If validation fails — rework until passing, do not pass further.

## Handoff
The output of `$competitive-analysis` is input for:
- **Strategist / Mediator** — competitive landscape for strategic decisions.
- **`tam-sam-som`** — competitor market shares for assessing SOM.
- **`bcg-matrix`** — relative market share (our share / leader's share) for BU classification.
- **`blue-ocean-strategy`** — competition factors for the AS-IS strategy canvas.
- **`ansoff-matrix`** — entry barriers in new markets (step 2, market development).
- **`icp-buyer-persona`** — positioning affects the choice of target personas.
- **`jtbd-analysis`** — competing solutions for each Job.

Handoff format: competitive landscape + feature matrix + threat score + key recommendations. When handing off — use `$handoff`.

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Only direct competitors | Missing threats from adjacent markets | Include indirect and aspirational competitors |
| Copying the leader's features | "Feature race" without a strategy | Differentiate, do not copy; focus on the weaknesses of competitors |
| Analysis without sources | Subjective assessments without evidence | Every thesis — with data: rating, review, fact |
| Outdated prices | Competitors change pricing often | Verify on the competitor's site, mark ⚠️ if >6 mo |
| Focus only on features | Features are not the only axis of competition | Analyze UX, brand, ecosystem, support, moats |
| Too many competitors | Loss of focus, superficial analysis | 5-8 key ones, the rest — a brief overview |
| Without recommendations | Analysis for the sake of analysis | Conclude with an actionable strategy with priorities |
| Binary feature matrix (✅/⬚) | Quality is invisible: "exists" is not "well implemented" | ★/★★/★★★ scale with score |
| Static snapshot | Cannot see where competitors are moving | 12 mo dynamics: features, prices, funding, strategy |

## Output Template

```markdown
### Competitive Analysis — [Product / Service]

**Market:** [niche]
**Geography:** [regions]
**Focus:** [Features / Pricing / Positioning / Full]
**Analysis Date:** [date]

---

#### Competitive Landscape

| Competitor | Type | Segment | Year | Size | Funding | Key Feature | Dynamics (12 mo) |
|-----------|-----|---------|-----|--------|---------------|---------------|:-----------------:|
| [A] | Direct | [segment] | [year] | [size] | [round / —] | [feature] | ↗ / → / ↘ |

---

#### Feature Matrix

| Category | Criterion | Our Product | [A] | [B] | [C] |
|-----------|----------|:-----------:|:---:|:---:|:---:|
| Core | [Feature 1] | ★★ | ★★★ | ★★ | ★ |
| Core | [Feature 2] | ★★★ | ★★ | ★ | — |
| Advanced | [Feature 3] | ★ | — | ★★ | ★★★ |
| | **Score** | **XX** | **XX** | **XX** | **XX** |

Scale: ★★★ = best in class (3) | ★★ = market level (2) | ★ = basic implementation (1) | — = missing (0)

**Table stakes:** [features mandatory for competition]
**Unique features:** [our product: X], [competitor A: Y], [competitor B: Z]

---

#### Pricing

| Competitor | Model | Entry Price | Average Plan | Enterprise | Free Tier | Hidden Costs | Strategy |
|-----------|--------|:--------------:|:------------:|:----------:|:---------:|-----------------|-----------|
| [A] | [model] | $XX/mo | $XX/mo | On request | Yes / No | [what] | [strategy] |

**Pricing index:** our price / average = [X]% (lower / on par / higher market)

---

#### Positioning Map

**Axes:** [Axis X] × [Axis Y]

| Competitor | [Axis X] (1-10) | [Axis Y] (1-10) | Cluster |
|-----------|:--------------:|:--------------:|---------|
| [A] | X | X | [Premium / Value / Niche] |
| **Our Product** | X | X | [Recommended position] |

**Clusters:** [cluster descriptions]
**Unoccupied zones:** [description of empty positions — differentiation opportunities]

---

#### Strengths and Weaknesses

| Competitor | Strengths | Weaknesses | Source |
|-----------|----------------|----------------|----------|
| [A] | [+ with data: rating, fact] | [- with data] | [Source, date] |

---

#### Competitive Moats

| Competitor | Moat Type | Description | Strength |
|-----------|---------|----------|:---------:|
| [A] | [Type] | [Details] | Strong / Medium / Weak |

---

#### Threat Score

| Competitor | Aud. overlap (0.25) | Feat. overlap (0.20) | Moat (0.20) | Dynamics (0.20) | Resources (0.15) | **Score** | **Rank** |
|-----------|:--------------------:|:-------------------:|:----------:|:---------------:|:--------------:|:---------:|:--------:|
| [A] | X | X | X | X | X | **X.X** | 🔴/🟡/🟢 |

Rank: 🔴 High (≥7.0) | 🟡 Medium (4.0-6.9) | 🟢 Low (<4.0)

---

#### Dynamics (12 months)

| Competitor | Feature changes | Price changes | New segments | Funding | Strategic Pivot |
|-----------|:-------------:|:-------------:|:--------------:|:--------------:|:-----------------:|
| [A] | [What was added] | [±X%] | [Where to] | [Round, $XM] | [Yes / No] |

**Market trends:** [where the market is heading overall]
**Potential new threats:** [startups, big tech, adjacent markets]

---

#### Strategic Recommendations

1. **Positioning:** [recommended position + messaging]
2. **Table stakes (mandatory features):** [list]
3. **Differentiation:** [unique advantage + justification]
4. **Pricing:** [strategy + level]
5. **Risky bets:** [what competitors might copy, window of opportunity]

| # | Action | Purpose | Against whom | Priority | Deadline |
|---|----------|------|-------------|:---------:|------|
| 1 | [What to do] | [Effect] | [Competitor] | P1 | [When] |

---

#### Sources and Assumptions

| # | Competitor | Fact / assumption | Source | Date | Reliability |
|---|-----------|-------------------|----------|------|:-------------:|
| 1 | [A] | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert assessment)
```
