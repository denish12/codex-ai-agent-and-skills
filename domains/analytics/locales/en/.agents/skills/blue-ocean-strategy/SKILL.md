---
name: blue-ocean-strategy
description: Strategy Canvas analysis — ERRC framework, value curve, three tiers of noncustomers
---
# Blue Ocean Strategy — Creating Uncontested Market Space

## When to use
- When searching for **new market spaces** beyond existing competition.
- When needing to **differentiate radically** from competitors through value innovation.
- When developing a **new product or service** from scratch — without being tied to current industry standards.
- When preparing a **growth strategy** — when the red ocean is exhausted or unprofitable.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Industry / market | ✅ | Current market (red ocean) for analysis |
| Product / service | ✅ | Current offering or new concept |
| Competitors | ✅ | 3-5 key players to build the strategy canvas |
| Customer segments | ⬚ | Current customers and their needs |
| Factors of competition | ⬚ | Known parameters on which the industry competes (5-8) |
| Price range | ⬚ | Current price levels in the industry |
| Noncustomer data | ⬚ | Who doesn't buy and why |

> If mandatory fields are not provided — **ask** the user, do not generate assumptions.

## Data Sources
1. Competitive analysis — offerings, prices, positioning of key players.
2. Customer research — needs, pain points, jobs-to-be-done.
3. Industry reports — standard competitive factors, industry norms.
4. Noncustomers — why they don't buy, barriers to entry for consumption.
5. Adjacent industries — alternative solutions for the same tasks.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `competitive-analysis` | Competitive factors, positioning, moats (step 0, 1) | If there's no data on competitors and competitive factors |
| `tam-sam-som` | Size of noncustomer space, new market potential (step 3, 6) | To estimate the TAM of the blue ocean |
| `web-research` | Verification of data on noncustomers, adjacent industries | If data is missing or outdated (>12 months) |
| `ansoff-matrix` | Diversification strategy, if Blue Ocean = new product + new market | After forming the offering — for integration into the growth portfolio |
| `swot-analysis` | Internal competencies to assess feasibility (step 7) | If it's unclear whether there are resources for implementation |

## Protocol

### Step 0 — Prepare Context
1. Define the current "red ocean" — the industry and its key players (3-5).
2. Identify 5-8 competitive factors on which players compete.
3. Collect data on current customers and their satisfaction.
4. Document industry "sacred cows" — assumptions that no one questions.

> Every fact about the market — with indication of source and date. Data older than 12 months — mark with ⚠️ and verify via `web-research`.

### Step 1 — Strategy Canvas — AS-IS
1. Define the axes: horizontal — competitive factors, vertical — offering level (1-5, where 1 = low, 5 = high).
2. Draw value curves for each key competitor.
3. Draw value curve for the analyzed company / product.
4. Identify clusters: where all players are the same (convergence zone), where there is differentiation.
5. Document: on which factors the industry competes excessively (over-served), on which — insufficiently (under-served).

### Step 2 — Buyer Utility Map
1. Define 6 stages of the buyer experience cycle:

   | Stage | Description |
   |--------|----------|
   | Purchase | The process of choosing and buying |
   | Delivery | Receiving the product / activating the service |
   | Use | Core usage experience |
   | Supplements | Accompanying goods / services |
   | Maintenance | Support, repair, updates |
   | Disposal | End of use, migration |

2. For each stage — assess 6 utility levers:

   | | Purchase | Delivery | Use | Supplements | Maintenance | Disposal |
   |--|:------:|:--------:|:-------------:|:----------:|:------------:|:----------:|
   | **Customer Productivity**| | | ★ | | | |
   | **Simplicity** | | | | | | |
   | **Convenience** | ★ | | | | | |
   | **Risk** | | | | | | |
   | **Fun & Image** | | | | | | |
   | **Environmental Friendliness**| | | | | | |

   ★ = industry focus. Empty cells = white spaces (opportunities).

3. Determine: where the industry focuses (≤ 3-4 cells) and where the white spaces are (the remaining 32-33 cells).
4. Select **at least 2 white spaces** with the greatest potential for creating new value.

### Step 3 — Three Tiers of Noncustomers
1. **First tier — "Soon-to-be"**: customers on the edge of the market, use minimally, searching for alternatives.
   - Why are they on the edge? What dissatisfies them?
2. **Second tier — "Refusing"**: consciously chose not to use the industry's products.
   - What needs are unmet? What are the barriers?
3. **Third tier — "Unexplored"**: never considered the industry's products as an option.
   - What need do they solve differently? What offering would attract them?
4. Assess for each tier:

   | Tier | Size | Key Barrier | Conversion Potential | Data Source |
   |---------|:------:|-----------------|:-------------------:|-----------------|
   | 1. "Soon-to-be" | [N / $XM] | [Barrier] | High / Medium / Low | [Source] |
   | 2. "Refusing" | [N / $XM] | [Barrier] | ... | [Source] |
   | 3. "Unexplored" | [N / $XM] | [Barrier] | ... | [Source] |

5. If there is no data — use `tam-sam-som` to estimate size and `web-research` to investigate barriers.

### Step 4 — ERRC Framework (Eliminate-Reduce-Raise-Create)
1. **Eliminate**: Which of the factors that the industry takes for granted should be eliminated?
   - Factors that do not create value for the buyer.
   - Factors existing out of inertia or to imitate competitors.
2. **Reduce**: Which factors should be reduced well below the industry's standard?
   - Factors with excessive offering levels (over-engineering).
3. **Raise**: Which factors should be raised well above the industry's standard?
   - Factors where the current level does not satisfy buyers.
4. **Create**: Which factors should be created that the industry has never offered?
   - New sources of value from the analysis of noncustomers and the Buyer Utility Map.
5. Fill out a card for each action:

   | Action | Factor | Was (AS-IS) | Became (TO-BE) | Cost Effect | Value Effect | Justification |
   |----------|--------|:------------:|:-------------:|:-----------------:|:------------------:|-------------|
   | Eliminate | [A] | Average | — | -$XXK/yr | 0 | [Why not needed] |
   | Reduce | [B] | High | Low | -$XXK/yr | -insignificant | [Why excessive] |
   | Raise | [C] | Low | Very high | +$XXK/yr | +significant | [Why important] |
   | Create | [D] | — | High | +$XXK/yr | +significant | [What problem it solves] |

6. Check the balance: **savings (E + R) must offset costs (Ra + C)**, forming value innovation — simultaneous cost reduction and value growth for the buyer.

### Step 5 — New Value Curve (Strategy Canvas — TO-BE)
1. Draw the new value curve factoring in ERRC.
2. Compare with competitors' curves — there should be visible divergence.
3. Validate three characteristics of a good strategy:

   | Criterion | Test | Result |
   |----------|------|:---------:|
   | **Focus** | Curve does not mimic competitors, resources are concentrated | Yes / No |
   | **Divergence** | ≥ 3 factors differ by ≥ 2 levels from the industry average | Yes / No |
   | **Compelling Tagline** | Can be described in one phrase understandable to the buyer | "[Tagline]" |

4. **If at least one criterion = No — return to step 4 and strengthen ERRC.**

### Step 6 — Price Corridor of the Mass
1. Define three pricing clusters:

   | Cluster | Products / Alternatives | Price Range | Audience Size |
   |---------|------------------------|:----------------:|:----------------:|
   | Same form | Direct competitors in the industry | $XX — $XX | [N] |
   | Same function | Alternative solutions for the same task | $XX — $XX | [N] |
   | Same objective | Products with the same end objective | $XX — $XX | [N] |

2. Determine the upper and lower boundaries of the price corridor of the mass.
3. Select a price level based on the degree of defensibility:
   - **High defensibility** (patents, network effects, exclusive resources) → upper boundary.
   - **Medium defensibility** (hard-to-copy competencies) → middle of the corridor.
   - **Low defensibility** (easily copied) → lower boundary.

### Step 7 — Evaluation and Scenario Analysis
1. Estimate the blue ocean economics:

   | Metric | Value | Source |
   |---------|:--------:|----------|
   | TAM of new space (noncustomers) | $XXM | `tam-sam-som` / estimate |
   | Savings from E + R (annual) | -$XXK | Calculation from ERRC |
   | Investments in Ra + C (annual) | +$XXK | Calculation from ERRC |
   | **Net effect on unit economics** | ±$XX | Savings − Investments |
   | Target price | $XX | Price corridor of the mass |
   | Target margin | XX% | Price − cost |
   | Time to imitation by competitors | X-X years | Defensibility estimate |
   | Implementation investments (total) | $XM | Resource estimate |
   | Time to break-even | X mo | Financial model |

2. Scenario analysis:

   | Scenario | TAM | Noncustomer Conversion | Time to Imitation | Revenue (3 years) | Probability |
   |----------|:---:|:--------------------:|:----------------:|:----------------:|:-----------:|
   | Optimistic | $XXM | XX% | > X years | $XXM | XX% |
   | Base | $XXM | XX% | X years | $XXM | XX% |
   | Pessimistic | $XXM | XX% | < X years | $XXM | XX% |

3. Define kill conditions: under which scenario to not launch / fold.
4. Assess feasibility:

   | Resource | Have | Need | Gap | How to Close |
   |--------|:----:|:-----:|:---:|-----------------|
   | Competencies | [Which] | [Which] | [What is missing] | Hire / partner / train |
   | Technologies | [Which] | [Which] | [What is missing] | Develop / license |
   | Budget | $XM | $XM | $XM | Reallocate / request funding |
   | Time | — | X mo | — | [Constraints] |

### Step 8 — Synthesis and Roadmap
1. Formulate the strategic blue ocean offering (1-2 paragraphs).
2. Finalize the target business model (price, channels, key metrics).
3. Prepare a roadmap:

   | Period | Action | Key Metric | Go/No-go gate | Owner |
   |--------|----------|:----------------:|---------------|---------------|
   | Month 1-3 | [What] | [KPI] | [Condition] | [Who] |
   | Month 4-6 | [What] | [KPI] | [Condition] | [Who] |
   | Month 7-12| [What] | [KPI] | [Condition] | [Who] |

4. Define KPIs for monitoring: noncustomer conversion, retention, NPS, unit economics.

## Example — Online Fitness vs Traditional Gyms

**Context:** Fitness services market in RF. Red ocean: gym chains (World Class, X-Fit, DDX). Task — find a blue ocean.

### Strategy Canvas — AS-IS

| Factor | World Class | X-Fit | DDX | Industry Average |
|--------|:----------:|:-----:|:---:|:--------------:|
| Equipment | 5 | 4 | 3 | 4.0 |
| Location (prestige) | 5 | 3 | 2 | 3.3 |
| Personal trainers | 4 | 4 | 3 | 3.7 |
| Group programs | 4 | 4 | 4 | 4.0 |
| Pool / spa | 5 | 3 | 1 | 3.0 |
| Price (inverted) | 1 | 3 | 4 | 2.7 |
| Schedule flexibility| 2 | 2 | 3 | 2.3 |
| Community / gamification | 1 | 1 | 1 | 1.0 |

**"Sacred cows":** physical presence, expensive equipment, fixed schedule.

### ERRC Grid

| Eliminate | Reduce |
|:---------:|:------:|
| Prestigious location (-$XXK/mo rent) | Equipment: from 4.0 to 1.5 (basics + resistance bands only) |
| Pool / spa (-$XXK/mo) | Personal trainers: from 3.7 to 2.0 (AI + pre-recorded) |

| Raise | Create |
|:-----:|:------:|
| Schedule flexibility: from 2.3 to 5.0 (24/7, anywhere) | Community + gamification: 0 → 5.0 (leaderboards, challenges) |
| Price (accessibility): from 2.7 to 5.0 (×5 cheaper) | AI personalization: 0 → 4.5 (adaptive programs) |

**Balance:** Savings (E+R) = -$2.8M/yr. Investments (Ra+C) = +$1.1M/yr. **Net: -$1.7M/yr in costs** → value innovation ✅.

### Three Tiers of Noncustomers

| Tier | Who | Size | Barrier |
|---------|-----|:------:|--------|
| 1. "Soon-to-be" | Bought pass, visit 1-2 times/mo | ~2M ppl | Too far, inconvenient schedule |
| 2. "Refusing" | Know about gyms, think it's too pricey/uncomfortable | ~8M ppl | Price, fear of judgment |
| 3. "Unexplored" | Residents of small towns without gyms | ~15M ppl | No infrastructure |

### Strategy Validation
- **Focus:** ✅ — resources allocated to AI, community, accessibility. Not spread thin across equipment and locations.
- **Divergence:** ✅ — 5 factors differ by ≥ 2 levels.
- **Tagline:** "Personal trainer in your pocket for 500₽/mo".

**Price Corridor of the Mass:** Same form (gyms) = 2000-8000₽/mo. Same function (YouTube, apps) = 0-500₽/mo. Same objective (health) = 500-3000₽/mo. → Price = 499₽/mo (lower bound, medium defensibility: AI models can be copied in 1-2 years).

## Validation (Quality Gate)

- [ ] Strategy Canvas AS-IS contains at least 3 competitors and 5-8 factors with numerical levels
- [ ] Buyer Utility Map 6×6 is populated, at least 2 white spaces identified
- [ ] Three tiers of noncustomers analyzed with size and barriers estimated
- [ ] ERRC grid populated: at least 1 action in each quadrant with cost and value effect
- [ ] ERRC balance checked: savings (E+R) offset investments (Ra+C)
- [ ] New value curve visibly diverges from competitor curves
- [ ] Three characteristics of strategy passed (focus, divergence, tagline)
- [ ] Price corridor of the mass defined (3 clusters: form, function, objective)
- [ ] Blue ocean economics justified: TAM, unit economics, break-even
- [ ] Scenario analysis conducted (optimistic / base / pessimistic)
- [ ] Kill conditions defined
- [ ] Feasibility assessed: competencies, tech, budget, time
- [ ] Data sources cited; data older than 12 mo marked ⚠️

## Handoff
Result output goes to:
- **Strategist / Mediator** — for integration into a growth strategy or business plan for a new product.
- **`ansoff-matrix`** — if Blue Ocean = diversification (new product + new market), integrate into growth portfolio.
- **`unit-economics`** — for precise unit economics calculation of the new offering.
- **`tam-sam-som`** — to clarify the blue ocean size, if rough estimates were used.
- **`competitive-analysis`** — for monitoring competitor reactions and imitation speed.

Output format: filled output template + ERRC with economics + scenario analysis + roadmap.

## Anti-patterns

| Mistake | Why it hurts | How to do it right |
|--------|-------------|---------------|
| ERRC without strategy canvas | No baseline to compare against, actions occur "in a vacuum" | First AS-IS canvas, then ERRC, then TO-BE |
| Focusing only on Create | Increases costs without optimization — no value innovation | Balance: E + R lower costs, Ra + C increase value |
| Ignoring noncustomers | The main source of blue ocean is lost | All three tiers are mandatory with size and barriers estimated |
| Curve = competitor + 1 factor | This is not a blue ocean, it's incremental innovation | Divergence: ≥ 3 factors differ by ≥ 2 levels |
| Unfeasible offering | A beautiful strategy without resources is useless | Feasibility assessment: competencies, tech, budget, time |
| Lack of a compelling tagline | Hard to communicate, meaning there is no focus | One phrase, clear to the buyer — or return to ERRC |
| ERRC without economic estimates | Unclear if value innovation actually works | Every action — with expected cost and value effect |
| Buyer Utility Map skipped | Hidden opportunities in the 32+ cells are missed | 6×6 matrix is mandatory, at least 2 white spaces |
| Cost-plus pricing | Ignores alternatives and mass appeal | Price corridor of the mass: 3 clusters (form, function, objective) |

## Output Template

```
## Blue Ocean Strategy: [Analysis Object]
**Industry (red ocean):** [industry]  |  **Date:** [date]
**Industry "sacred cows":** [2-3 assumptions being challenged]

### Strategy Canvas — AS-IS

| Competitive Factor | [Competitor 1] | [Competitor 2] | [Competitor 3] | [Our Product] | Average |
|-------------------|:------------:|:------------:|:------------:|:-------------:|:------:|
| [Factor 1] | X | X | X | X | X.X |
| [Factor 2] | X | X | X | X | X.X |

Scale: 1 = low, 5 = high

### Buyer Utility Map

| | Purchase | Delivery | Use | Supplements | Maintenance | Disposal |
|--|:------:|:--------:|:-------------:|:----------:|:------------:|:----------:|
| **Customer Productivity**| | | ★ | | | |
| **Simplicity** | | 🔵 | | | | 🔵 |
| **Convenience** | ★ | | | | | |
| **Risk** | | | | | 🔵 | |
| **Fun & Image** | | | | 🔵 | | |
| **Environmental Friendliness**| | | | | | |

★ = industry focus | 🔵 = identified white space (opportunity)

### ERRC Grid

| Action | Factor | Was | Became | Cost (Δ) | Value (Δ) | Justification |
|----------|--------|:----:|:-----:|:-----------:|:------------:|-------------|
| Eliminate | [A] | X | — | -$XXK | 0 | [Why] |
| Reduce | [B] | X | X | -$XXK | −insig. | [Why] |
| Raise | [C] | X | X | +$XXK | +signif. | [Why] |
| Create | [D] | — | X | +$XXK | +signif. | [Why] |

**Balance:** Savings (E+R) = -$XXK | Investments (Ra+C) = +$XXK | **Net: [±$XXK]** → [Value Innovation ✅ / Imbalance ⚠️]

### Strategy Canvas — TO-BE

| Competitive Factor | Industry Avg | New Offering | Δ | ERRC Action |
|-------------------|:--------------:|:-----------------:|:-:|:-------------:|
| [Factor 1] | X.X | — | -X.X | Eliminate |
| [Factor 2] | X.X | X | -X.X | Reduce |
| [Factor 3] | X.X | X | +X.X | Raise |
| [New Factor] | — | X | +X | Create |

### Strategy Validation

| Criterion | Test | Result |
|----------|------|:---------:|
| **Focus** | Resources are concentrated, curve doesn't smear | Yes / No |
| **Divergence** | ≥ 3 factors differ by ≥ 2 levels | Yes / No |
| **Compelling Tagline** | One phrase, clear to the buyer | "[Tagline]" |

⚠️ If at least one = No — return to ERRC.

### Three Tiers of Noncustomers

| Tier | Who | Size | Key Barrier | Conversion Potential | Source |
|---------|-----|:------:|-----------------|:-------------------:|----------|
| 1. "Soon-to-be" | [Who, why] | [N / $XM] | [Barrier] | High / Medium | [Source] |
| 2. "Refusing" | [Who, why] | [N / $XM] | [Barrier] | ... | [Source] |
| 3. "Unexplored"| [Who, why] | [N / $XM] | [Barrier] | ... | [Source] |

### Price Corridor of the Mass

| Cluster | Examples | Price Range | Audience Size |
|---------|---------|:------------:|:----------------:|
| Same form | [Direct competitors] | $XX — $XX | [N] |
| Same function | [Alternative solutions] | $XX — $XX | [N] |
| Same objective| [Other ways to achieve goal] | $XX — $XX | [N] |

**Corridor:** $XX — $XX | **Target Price:** $XX | **Defensibility:** High / Medium / Low

### Blue Ocean Economics

| Metric | Value | Source |
|---------|:--------:|----------|
| TAM of new space | $XXM | [Source] |
| Savings from E + R | -$XXK/yr | ERRC Calculation |
| Investments in Ra + C | +$XXK/yr | ERRC Calculation |
| Net effect on unit economics | ±$XX | Savings − Investments |
| Target price | $XX | Price corridor |
| Target margin | XX% | Price − Cost |
| Time to imitation | X-X years | Defensibility estimate |
| Implementation investments | $XM | Resource estimate |
| Time to break-even | X mo | Financial model |

### Scenario Analysis

| Scenario | TAM | Conversion | Time to imitation | Revenue (3Y) | Probability |
|----------|:---:|:---------:|:-----------------:|:------------:|:-----------:|
| Optimistic | $XXM | XX% | > X years | $XXM | XX% |
| Base | $XXM | XX% | X years | $XXM | XX% |
| Pessimistic | $XXM | XX% | < X years | $XXM | XX% |

**Kill conditions:** [Under what scenario to not launch / fold]

### Feasibility Assessment

| Resource | Have | Need | Gap | How to Close |
|--------|:----:|:-----:|:---:|-----------------|
| Competencies | [Which] | [Which] | [Gap] | [How to close] |
| Technologies | [Which] | [Which] | [Gap] | [How to close] |
| Budget | $XM | $XM | $XM | [Source] |
| Time | — | X mo | — | [Constraints] |

### Strategic Offering
[1-2 paragraphs: the essence of the blue ocean, why it's a value innovation, for whom, business model]

### Roadmap

| Period | Action | Key Metric | Go/No-go gate | Owner |
|--------|----------|:----------------:|---------------|---------------|
| Mo 1-3 | [What] | [KPI] | [Condition] | [Who] |
| Mo 4-6 | [What] | [KPI] | [Condition] | [Who] |
| Mo 7-12| [What] | [KPI] | [Condition] | [Who] |

### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Confidence |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert estimate)
```
