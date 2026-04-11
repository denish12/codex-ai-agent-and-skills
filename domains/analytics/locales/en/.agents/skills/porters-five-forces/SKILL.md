---
name: porters-five-forces
description: Industry competitive forces analysis — threat of entry, supplier and buyer power, substitutes, industry rivalry
---
# Porter's Five Forces — Industry Competitive Forces Analysis

## When to Use
- When assessing **industry attractiveness** for entry or investment.
- When developing a **competitive strategy** — understanding the balance of market forces.
- When analyzing **industry changes** — how new trends shift the balance of forces.
- When preparing **M&A decisions** — evaluating the competitive environment of a target industry.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Industry / segment | ✅ | Clear definition of the analyzed industry and its boundaries |
| Geographic focus | ✅ | Country / region / global market |
| Company position | ⬚ | Current or planned role in the industry |
| Key competitors | ⬚ | List of major players for context |
| Analysis horizon | ⬚ | Assessment period (default — current state + 2-3 years) |
| Analysis objective | ⬚ | Market entry, strategy, investment, M&A |

## Data Sources
1. Industry reports — IBISWorld, Statista, industry associations.
2. Financial reporting — annual reports of players, SEC filings.
3. Competitive intelligence — market shares, pricing, product lines.
4. Supplier and buyer data — concentration, switching costs.
5. Regulatory databases — entry barriers, licensing, patents.

## Protocol

### Step 0 — Context Preparation
1. Clearly define industry boundaries (product, geographic, price segments).
2. Identify key players: leaders, challengers, niche players.
3. Determine the current phase of the industry lifecycle (growth, maturity, decline).
4. Record the analysis objective and horizon.

### Step 1 — Threat of New Entrants
1. Assess entry barriers:
   - Economies of scale — minimum efficient scale.
   - Capital intensity — initial investment required.
   - Access to distribution channels — difficulty of reaching the shelf / platform.
   - Patents and intellectual property — existence of protection.
   - Regulatory barriers — licenses, certifications, permits.
   - Learning effect — experience curve of incumbent players.
2. Evaluate the likelihood of the threat materializing on the analysis horizon.
3. Analyze incumbents' reaction to new entrants.
4. Assign score: 1 (low threat) — 5 (high threat).

### Step 2 — Supplier Power
1. Assess supplier concentration vs number of buyers.
2. Analyze the uniqueness of the supplier's resource / component.
3. Determine switching costs when changing suppliers.
4. Evaluate the threat of forward integration (supplier becomes a competitor).
5. Analyze the availability of substitutes for key resources.
6. Assign score: 1 (weak power) — 5 (high power).

### Step 3 — Buyer Power
1. Assess buyer concentration and share of revenue.
2. Analyze switching costs for buyers.
3. Determine buyer price sensitivity.
4. Evaluate buyer awareness of prices and alternatives.
5. Analyze the threat of backward integration (buyer produces internally).
6. Evaluate product standardization (commodity vs differentiation).
7. Assign score: 1 (weak power) — 5 (high power).

### Step 4 — Threat of Substitutes
1. Identify products / services from other industries solving the same problem.
2. Evaluate the price/quality ratio of substitutes vs current products.
3. Analyze switching costs for transitioning to a substitute.
4. Assess buyer propensity to switch.
5. Analyze technology trends creating new substitutes.
6. Assign score: 1 (low threat) — 5 (high threat).

### Step 5 — Industry Rivalry
1. Assess the number and size of competitors (fragmentation vs concentration).
2. Analyze industry growth rates (in stagnating markets, competition is fiercer).
3. Evaluate the level of product differentiation.
4. Analyze fixed costs and excess capacity.
5. Evaluate exit barriers — reasons to stay in an unprofitable industry.
6. Analyze the strategic importance of the industry to key players.
7. Assign score: 1 (weak rivalry) — 5 (intense rivalry).

### Step 6 — Overall Industry Attractiveness
1. Calculate the average score across all 5 forces.
2. Identify the dominant force — the one most affecting profitability.
3. Form the overall attractiveness assessment:
   - 1.0-2.0: High attractiveness.
   - 2.1-3.0: Medium attractiveness.
   - 3.1-4.0: Low attractiveness.
   - 4.1-5.0: Unattractive industry.
4. Analyze dynamics: how forces will change over 2-3 years.

### Step 7 — Synthesis and Conclusions
1. Formulate strategic implications for each of the 5 forces.
2. Identify strategic actions to strengthen positioning.
3. Record key success factors in the industry.
4. Prepare recommendations: enter / invest / defend / exit.

## Validation (Quality Gate)

- [ ] All 5 forces analyzed with specific factors (at least 3 per force)
- [ ] Each force has a score from 1 to 5 with justification
- [ ] Factors supported by data (market shares, concentration, barriers)
- [ ] Industry boundaries clearly defined
- [ ] Overall attractiveness assessment calculated and justified
- [ ] Strategic recommendations are specific and tied to forces
- [ ] Force dynamics accounted for on the analysis horizon
- [ ] Dominant force identified

## Handoff
Result -> Strategist / Mediator for competitive strategy formulation, investment decision, or market entry strategy.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Overly broad industry boundaries | "Technology industry" is 100 different markets | Specific segment: "SaaS CRM for SMB in Europe" |
| Force analysis without scores | Description without assessment provides no priorities | Each force — score 1-5 with justification |
| Ignoring dynamics | Static analysis becomes outdated | Evaluate each force's trend over a 2-3 year horizon |
| Confusing "competitors" and "substitutes" | Uber and taxis — competitors; Zoom and airlines — substitutes | Substitutes — different industry, same need |
| No strategic implications | Analysis for analysis' sake | Each force → strategic action |
| Identical scores for all forces | No differentiation | Use the full scale, find the dominant force |

## Output Template

```
## Porter's Five Forces: [Industry / Segment]
**Region:** [geography]  |  **Horizon:** [period]  |  **Date:** [date]

### Competitive Forces Summary Table

| # | Force | Score (1-5) | Trend | Key Factors |
|---|-------|:----------:|:-----:|-------------|
| 1 | Threat of New Entrants | [X] | [↑/↓/→] | [Entry barriers, capital intensity...] |
| 2 | Supplier Power | [X] | [↑/↓/→] | [Concentration, uniqueness...] |
| 3 | Buyer Power | [X] | [↑/↓/→] | [Concentration, switching costs...] |
| 4 | Threat of Substitutes | [X] | [↑/↓/→] | [Alternatives, price/quality...] |
| 5 | Industry Rivalry | [X] | [↑/↓/→] | [Fragmentation, market growth...] |
| — | **Average Score** | **[X.X]** | — | — |

### Industry Attractiveness Assessment

| Parameter | Value |
|-----------|-------|
| Average score | [X.X] out of 5.0 |
| Attractiveness | [High / Medium / Low / Unattractive] |
| Dominant force | [Force name] |
| Dynamics (2-3 years) | [Improving / Stable / Deteriorating] |

### Detailed Analysis by Force

#### 1. Threat of New Entrants — [X]/5
| Factor | Assessment | Comment |
|--------|-----------|---------|
| Economies of scale | [High/Medium/Low] | [Explanation] |
| Capital intensity | ... | ... |
| Regulatory barriers | ... | ... |

[Same structure for the remaining 4 forces]

### Strategic Recommendations

| Force | Strategic Action | Priority |
|-------|-----------------|----------|
| [Force 1] | [Recommendation] | [High/Medium/Low] |
| [Force 2] | [Recommendation] | ... |

### Verdict
[1-2 paragraphs: overall assessment, key success factors, entry/investment recommendation]
```
