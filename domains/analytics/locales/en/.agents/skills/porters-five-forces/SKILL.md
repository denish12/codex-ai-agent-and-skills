---
name: porters-five-forces
description: Industry competitive forces analysis — threat of new entrants, bargaining power of suppliers and buyers, threat of substitutes, and industry rivalry
---
# Porter's Five Forces — Industry Competitive Forces Analysis

## When to Use
- When evaluating **industry attractiveness** for entry or investment.
- When developing a **competitive strategy** — understanding the balance of power in the market.
- When analyzing **industry changes** — how new trends alter the balance of power.
- When preparing **M&A decisions** — evaluating the competitive environment of a target industry.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Industry / Segment | ✅ | Clear definition of the analyzed industry and its boundaries |
| Geographical Focus | ✅ | Country / region / global market |
| Company Position | ⬚ | Current or planned role in the industry |
| Key Competitors | ⬚ | List of main players for context |
| Analysis Horizon | ⬚ | Assessment period (default — current state + 2-3 years) |
| Analysis Goal | ⬚ | Market entry, strategy, investment, M&A |

> If mandatory fields are not provided — **request them from the user** before starting the analysis. Do not make assumptions.

## Data Sources
1. Industry reports — IBISWorld, Statista, industry associations.
2. Financial statements — annual reports of players, SEC filings.
3. Competitive intelligence — market shares, pricing, product lines.
4. Supplier and buyer data — concentration, switching costs.
5. Regulatory databases — barriers to entry, licensing, patents.

> Every fact must include a source and date. Data older than 12 months should be marked ⚠️ and verified via `web-research`.

### Relationship with Other Skills
| Skill | What We Take | When to Call |
|------|-----------|----------------|
| `competitive-analysis` | Competitor data, market shares, moats (step 5) | If there is no data on the competitive landscape |
| `pest-analysis` | Macro factors affecting the forces: regulatory barriers, technological trends (steps 1, 4) | If macro-environment context is needed |
| `tam-sam-som` | Market size and growth to evaluate rivalry (step 5) | If there is no data on the industry growth rate |
| `blue-ocean-strategy` | Strategy beyond the 5 forces, if the industry is unattractive (step 7) | If the average score is ≥ 3.5 — consider Blue Ocean |
| `web-research` | Verification of industry data, fresh reports | If data is missing or outdated (>12 months) |
| `swot-analysis` | 5 forces → Threats and Opportunities for SWOT | After the analysis — for strategy integration |

## Protocol

### Step 0 — Context Preparation
1. Clearly define the industry boundaries:

   | Parameter | Definition |
   |----------|-------------|
   | Product Boundaries | [What is included in the industry, what is not] |
   | Geographical Boundaries | [Country / region / globally] |
   | Price Segment | [Premium / Mid / Value / All] |
   | Lifecycle Phase | Growth / Maturity / Decline |

2. Identify key players: leaders, challengers, niche players.
3. Record the analysis goal and horizon.

### Step 1 — Threat of New Entrants (Threat of New Entrants)
Evaluate each sub-factor on a scale of 1-5 (1 = high barrier / low threat, 5 = low barrier / high threat):

| Sub-factor | Score (1-5) | Justification | Source |
|-----------|:------------:|-------------|----------|
| Economies of Scale | X | [Minimum efficient scale] | [Source] |
| Capital Requirements | X | [Volume of initial investments] | [Source] |
| Access to Distribution Channels | X | [Difficulty of getting on a shelf/platform] | [Source] |
| Patents and IP | X | [Presence of protection] | [Source] |
| Regulatory Barriers | X | [Licenses, certifications] | [Source] |
| Learning Curve Effect | X | [Experience curve of existing players] | [Source] |

**Final force score = average of sub-factors**, rounded to 0.5.

Additionally: the probability of new players appearing on the analysis horizon, expected reaction of incumbents.

### Step 2 — Bargaining Power of Suppliers (Supplier Power)
Evaluate each sub-factor (1 = weak power, 5 = high power):

| Sub-factor | Score (1-5) | Justification | Source |
|-----------|:------------:|-------------|----------|
| Supplier Concentration | X | [N suppliers vs N buyers] | [Source] |
| Resource Uniqueness | X | [Replaceable or not] | [Source] |
| Switching Costs | X | [Cost of changing supplier] | [Source] |
| Threat of Forward Integration | X | [Supplier → competitor] | [Source] |
| Availability of Resource Substitutes | X | [Alternative resources] | [Source] |

**Final score = average of sub-factors.**

### Step 3 — Bargaining Power of Buyers (Buyer Power)
Evaluate each sub-factor (1 = weak power, 5 = high power):

| Sub-factor | Score (1-5) | Justification | Source |
|-----------|:------------:|-------------|----------|
| Buyer Concentration | X | [Share of TOP-10 clients in revenue] | [Source] |
| Buyer Switching Costs | X | [Cost of switching to a competitor] | [Source] |
| Price Sensitivity | X | [How much price = the main criterion] | [Source] |
| Buyer Information | X | [Do they know prices and alternatives] | [Source] |
| Threat of Backward Integration | X | [Buyer manufactures themselves] | [Source] |
| Product Standardization | X | [Commodity vs differentiation] | [Source] |

**Final score = average of sub-factors.**

### Step 4 — Threat of Substitutes (Threat of Substitutes)
Evaluate each sub-factor (1 = low threat, 5 = high threat):

| Sub-factor | Score (1-5) | Justification | Source |
|-----------|:------------:|-------------|----------|
| Availability of Substitutes from Other Industries | X | [Which ones, how many] | [Source] |
| Price/Performance Ratio of Substitute | X | [Better/worse/equal] | [Source] |
| Switching Costs to Substitute | X | [Easy to switch?] | [Source] |
| Buyer Propensity to Substitute | X | [Are they ready to change] | [Source] |
| Technological Trends | X | [Are they creating new substitutes] | [Source] |

> **Important:** substitutes are products **from another industry** solving **the same need**. Uber and taxis = competitors (same industry). Zoom and airlines for business meetings = substitutes (different industries, same need).

**Final score = average of sub-factors.**

### Step 5 — Industry Rivalry (Industry Rivalry)
Evaluate each sub-factor (1 = weak rivalry, 5 = intense rivalry):

| Sub-factor | Score (1-5) | Justification | Source |
|-----------|:------------:|-------------|----------|
| Number and Size of Competitors | X | [Fragmentation vs concentration] | [Source] |
| Industry Growth Rate | X | [Stagnation = tougher] | [Source] |
| Product Differentiation | X | [Commodity vs uniqueness] | [Source] |
| Fixed Costs / Excess Capacity | X | [Pressure on prices] | [Source] |
| Exit Barriers | X | [Reasons to stay in an unprofitable industry] | [Source] |
| Strategic Stakes | X | [Are players ready to fight for the market] | [Source] |

**Final score = average of sub-factors.**

### Step 6 — Overall Industry Attractiveness
1. Calculate the average score across the 5 forces.
2. Determine the dominant force — the one that most strongly affects profitability.
3. Evaluate attractiveness:

   | Average Score | Attractiveness | Recommendation |
   |:------------:|-------------------|-------------|
   | 1.0-2.0 | 🟢 High | Enter / invest |
   | 2.1-3.0 | 🟡 Medium | Enter with a clear differentiation strategy |
   | 3.1-3.5 | 🟠 Low | Enter only with a strong competitive advantage |
   | 3.6-5.0 | 🔴 Unattractive | Do not enter, or consider `$blue-ocean-strategy` |

### Step 7 — Force Dynamics and Scenarios
1. For each force, forecast the change over a 2-3 year horizon:

   | Force | Now | In 2-3 years | Δ | Driver of Change |
   |------|:------:|:--------------:|:-:|-------------------|
   | New Entrants | X.X | X.X | ±X.X | [What will change] |
   | Suppliers | X.X | X.X | ±X.X | [What will change] |
   | Buyers | X.X | X.X | ±X.X | [What will change] |
   | Substitutes | X.X | X.X | ±X.X | [What will change] |
   | Rivalry | X.X | X.X | ±X.X | [What will change] |
   | **Average** | **X.X** | **X.X** | **±X.X** | |

2. Determine whether industry attractiveness is improving or deteriorating.
3. Record trigger points: under what conditions attractiveness will change sharply.

### Step 8 — Strategic Recommendations
1. For each force — a specific action:

   | Force | Score | Strategic Action | Priority |
   |------|:----:|------------------------|:---------:|
   | [Force] | X.X | [What to do to strengthen position] | P1/P2/P3 |

2. Identify the Key Success Factors (KSF) in the industry.
3. Formulate the verdict: enter / invest / defend / exit / create Blue Ocean.

## Example — SaaS CRM for SMB, IT Market

**Context:** SaaS CRM market for small and medium businesses, IT, 2026-2029 horizon. Goal: evaluating attractiveness for entry.

### Sub-factor Scoring

**1. Threat of New Entrants — 3.7/5**

| Sub-factor | Score | Justification |
|-----------|:------:|-------------|
| Economies of Scale | 3 | Medium threshold: cloud infrastructure scales |
| Capital Requirements | 2 | Low: MVP for $200K-500K, cloud |
| Access to Channels | 4 | Hard: marketplace is overcrowded, SEO is competitive |
| Patents and IP | 5 | None: SaaS CRM is not protected by patents |
| Regulatory Barriers | 2 | Low: GDPR (personal data), but standard |
| Learning Curve Effect | 4 | Medium: HubSpot and Salesforce = 10+ years on the market |

**2. Bargaining Power of Suppliers — 2.0/5**

| Sub-factor | Score | Justification |
|-----------|:------:|-------------|
| Concentration | 2 | Low: AWS/GCP/Azure — 3+ providers |
| Uniqueness | 1 | Cloud infrastructure = commodity |
| Switching Costs | 3 | Medium: migration between clouds takes ~2-4 weeks |
| Forward Integration | 2 | Low: cloud providers do not make CRMs |
| Resource Substitutes | 2 | Yes: on-premise as an alternative |

**3. Bargaining Power of Buyers — 3.8/5**

| Sub-factor | Score | Justification |
|-----------|:------:|-------------|
| Concentration | 2 | Low: thousands of SMBs, none > 1% of revenue |
| Switching Costs | 4 | Low: CRM migration in 1-2 weeks, data is exportable |
| Price Sensitivity | 5 | High: SMB counts every dollar |
| Buyer Information | 4 | High: G2, reviews, comparisons are easily accessible |
| Backward Integration | 1 | No: SMB will not write their own CRM |
| Standardization | 4 | High: basic CRM = commodity |

**4. Threat of Substitutes — 3.4/5**

| Sub-factor | Score | Justification |
|-----------|:------:|-------------|
| Availability | 4 | Notion, Excel, Telegram bots, Google Sheets |
| Price/Performance | 3 | Worse in functionality, but free |
| Switching Costs | 4 | Low: from Excel to CRM and back is easy |
| Propensity | 3 | Medium: SMBs are used to the "free" option |
| Tech Trends | 3 | AI assistants may replace part of CRM functions |

**5. Rivalry — 4.2/5**

| Sub-factor | Score | Justification |
|-----------|:------:|-------------|
| Competitor Count | 5 | HubSpot, Salesforce, Pipedrive, Notion + 20 minor ones |
| Industry Growth | 3 | Moderate: +12% YoY (not enough for everyone) |
| Differentiation | 3 | Medium: basic features are the same, differentiation via UX/AI |
| Fixed Costs | 4 | High R&D, pressure on prices |
| Exit Barriers | 4 | High: client base, reputation, team |
| Strategic Stakes | 5 | High: CRM = ecosystem core for all players |

### Summary

| Force | Score | Trend (2-3y) | Driver |
|------|:----:|:------------:|---------|
| New Entrants | 3.7 | ↑ 4.0 | AI lowers MVP cost |
| Suppliers | 2.0 | → 2.0 | Cloud market is stable |
| Buyers | 3.8 | ↑ 4.0 | Growing awareness, more alternatives |
| Substitutes | 3.4 | ↑ 3.8 | AI assistants are coming |
| Rivalry | 4.2 | → 4.2 | Consolidation offsets growth |
| **Average** | **3.4** | **3.6** | |

**Attractiveness:** 🟠 Low (3.4). In 2-3 years: 🔴 Unattractive (3.6).
**Dominant Force:** Rivalry (4.2) — intense competition, 5+ serious players.

### Recommendations

| Force | Action | Priority |
|------|----------|:---------:|
| Rivalry (4.2) | Differentiation via AI — the only unoccupied factor | P1 |
| Buyers (3.8) | Increase switching costs: deep integrations, custom workflows | P1 |
| Substitutes (3.4) | Position CRM as "more than Excel": analytics, automation | P2 |
| New Entrants (3.7) | Build brand and community — a barrier you can't buy | P2 |

**Verdict:** Enter only with strong differentiation (AI-first CRM). Without a unique advantage, the market is too competitive. Consider `$blue-ocean-strategy` to find unoccupied space.

## Validation (Quality Gate)

- [ ] All 5 forces are analyzed with sub-factors (minimum 5 per force)
- [ ] Each sub-factor is evaluated 1-5 with justification and a source
- [ ] Final force score = average of sub-factors (not subjective)
- [ ] Industry boundaries are clearly defined (product, geo, segment, phase)
- [ ] Overall attractiveness is calculated, dominant force is identified
- [ ] Dynamics of forces on a 2-3 year horizon with drivers and trigger points
- [ ] Substitutes are from another industry (do not confuse with competitors)
- [ ] Strategic recommendations are tied to specific forces and prioritized
- [ ] Verdict: enter / invest / defend / exit / Blue Ocean
- [ ] Data sources are specified; data older than 12 months is marked ⚠️

## Handoff
The output of `$porters-five-forces` is an input for:
- **Strategist / Mediator** — competitive environment for strategic decisions.
- **`competitive-analysis`** — rivalry data for detailed competitive analysis.
- **`swot-analysis`** — 5 forces → Threats (high forces) and Opportunities (low forces).
- **`blue-ocean-strategy`** — if the industry is unattractive (≥ 3.5) — search for Blue Ocean.
- **`ansoff-matrix`** — attractiveness of current vs new industries for growth strategy.

Handoff format: summary table of forces with scores + sub-factors + dynamics + recommendations. When transferring — use `$handoff`.

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Excessively wide boundaries | "Tech industry" — 100 different markets | Specific segment: "SaaS CRM for SMB in the US" |
| Force score "by eye" | Subjective evaluation, not reproducible | Score = average of sub-factors (each 1-5 with justification) |
| Ignoring dynamics | Static analysis becomes obsolete | Forecast for each force for 2-3 years + trigger points |
| Confusing competitors / substitutes | Uber and taxis = competitors; Zoom and airlines = substitutes | Substitutes — different industry, same need |
| Lack of strategic implications | Analysis for the sake of analysis | Each force → specific strategic action |
| Equal scores for all forces | No differentiation | Full 1-5 scale, dominant force |
| Sub-factors without data | Evaluations hang in the air | Each sub-factor — with a source |
| Attractiveness without a verdict | A number without a recommendation is useless | Clear verdict: enter / defend / Blue Ocean |

## Output Template

```markdown
## Porter's Five Forces: [Industry / Segment]
**Region:** [Geography]  |  **Horizon:** [Period]  |  **Goal:** [Entry / Strategy / M&A]  |  **Date:** [Date]

### Industry Boundaries

| Parameter | Definition |
|----------|-------------|
| Product | [What is included, what is not] |
| Geography | [Country / region] |
| Price Segment | [Premium / Mid / Value] |
| Lifecycle Phase | [Growth / Maturity / Decline] |

### Competitive Forces Summary Table

| # | Force | Score (1-5) | Trend (2-3y) | Δ | Dominant Sub-factor |
|---|------|:----------:|:------------:|:-:|----------------------|
| 1 | Threat of New Entrants | X.X | X.X | ±X.X | [Sub-factor] |
| 2 | Bargaining Power of Suppliers | X.X | X.X | ±X.X | [Sub-factor] |
| 3 | Bargaining Power of Buyers | X.X | X.X | ±X.X | [Sub-factor] |
| 4 | Threat of Substitutes | X.X | X.X | ±X.X | [Sub-factor] |
| 5 | Industry Rivalry | X.X | X.X | ±X.X | [Sub-factor] |
| — | **Average Score** | **X.X** | **X.X** | **±X.X** | |

### Attractiveness Evaluation

| Parameter | Value |
|----------|---------|
| Average Score | X.X out of 5.0 |
| Attractiveness | 🟢 High / 🟡 Medium / 🟠 Low / 🔴 Unattractive |
| Dominant Force | [Name] (X.X) |
| Dynamics (2-3 years) | Improvement / Stability / Deterioration (X.X → X.X) |

### Detailed Force Analysis

#### 1. Threat of New Entrants — X.X/5

| Sub-factor | Score (1-5) | Justification | Source |
|-----------|:------------:|-------------|----------|
| Economies of Scale | X | [Explanation] | [Source] |
| Capital Requirements | X | [Explanation] | [Source] |

[Similarly for the other 4 forces]

### Force Dynamics (2-3 years)

| Force | Now | Forecast | Δ | Driver of Change |
|------|:------:|:-------:|:-:|-------------------|
| [Force] | X.X | X.X | ±X.X | [What will change] |

**Trigger points:** [Under what condition attractiveness will change sharply]

### Strategic Recommendations

| Force | Score | Strategic Action | Priority |
|------|:----:|------------------------|:---------:|
| [Force] | X.X | [What to do] | P1/P2/P3 |

**Key Success Factors (KSF):** [3-5 factors]

### Verdict
[1-2 paragraphs: overall evaluation of attractiveness, dominant force, recommendation on entry/strategy, link to Blue Ocean if unattractive]

### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Reliability |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert evaluation)
```
