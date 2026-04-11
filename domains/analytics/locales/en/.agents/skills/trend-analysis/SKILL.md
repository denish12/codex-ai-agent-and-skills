---
name: trend-analysis
description: Identification and assessment of market trends — strength, impact, timeline, recommendations
---
# Trend Analysis — Identification and Assessment of Market Trends

## When to use
- During strategic planning — to understand where the market is heading on a 1-5 year horizon.
- When searching for new opportunities — to spot emerging trends before they become mainstream.
- When assessing risks — to identify trends that could disrupt the current business model.
- When preparing investment materials — trends as justification for market timing.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Domain / industry | ✅ | Which area to look for trends in |
| Horizon | ✅ | Time horizon: 1 year / 3 years / 5 years |
| Product / business | ⬚ | To assess the impact of trends on a specific business |
| Focus | ⬚ | Technologies / Consumer behavior / Regulation / All |
| Geography | ⬚ | Global or specific regions |
| Known trends | ⬚ | What is already being tracked (to expand the list) |

> If mandatory fields are not provided — **ask the user** before starting the analysis. Do not invent.

## Data Sources
1. **Web Search** — recent analyst reports (McKinsey, BCG, Deloitte, CB Insights, a16z).
2. **Technological sources** — Gartner Hype Cycle, TechCrunch, Wired, MIT Tech Review.
3. **Industry reports** — specialized analytical agencies and associations.
4. **Academic publications** — research from universities and research labs.
5. **Social signals** — discussions on Reddit, HN, Twitter, specialized conferences.
6. **Patent databases** — USPTO, EPO (for technological trends).

> For each trend — a minimum of 2 independent sources. Data older than 12 months for fast-changing fields — mark with ⚠️.

### Connection with other skills
| Skill | What we take | When to call |
|------|-----------|----------------|
| `pest-analysis` | Macro factors (P/E/S/T/E/L) as a structured source of trends (step 2) | If a systemic overview of the macro environment is needed |
| `web-research` | Main tool for gathering trend data (steps 2-4) | At each step — for search and verification |
| `competitive-analysis` | Technological and strategic trends of competitors (step 3) | To understand who is already adapting |
| `tam-sam-som` | Size of markets created by trends, CAGR (step 6) | For quantitative impact assessment |
| `blue-ocean-strategy` | Trends creating new market spaces | If an emerging trend = potential Blue Ocean |
| `cohort-analysis` | Behavioral trends in retention / engagement (step 3) | For trends in consumer behavior |

## Protocol

### Step 0 — Collect Context
1. Check the availability of mandatory data.
2. Determine the breadth of search: narrow domain or broad overview.
3. Record the horizon and geography.
4. Define the layers of analysis:

   | Layer | Examples of trends | Sources |
   |------|----------------|-----------|
   | Technologies | AI, blockchain, IoT, quantum | Gartner, TechCrunch, patents |
   | Consumer behavior | Remote work, sustainability, wellness | McKinsey, Reddit, surveys |
   | Regulation | GDPR, AI Act, ESG requirements | Consultant Plus, EUR-Lex |
   | Economics | Inflation, recession, EM growth | IMF, World Bank, Central Banks |
   | Demographics | Aging, urbanization, migration | UN, Rosstat, Eurostat |

### Step 1 — Macro Trends (Mega Trends)
Via web search, identify 3-5 global macro trends most relevant to the domain:
- Technological shifts.
- Demographic changes.
- Economic factors.
- Regulatory changes.
- Social shifts.

> If `$pest-analysis` exists — use factors with a Score ≥ 12 as macro trend candidates.

### Step 2 — Industry Trends
Dive deep into a specific industry, identifying 5-10 trends:
- Technological innovations within the industry.
- New business models and approaches.
- Changes in the behavior of the target audience.
- Competitive dynamics (consolidation, new players, disruption).

### Step 3 — Validation (Multiple Sources)
For each trend, verify:

| Check | Criterion | Result |
|----------|----------|:---------:|
| Minimum 2 independent sources | Not from the same analytical company | ✅ / ❌ |
| Quantitative data | Adoption rate, investments, market growth | ✅ / ⚠️ |
| Geographical breadth | Observed in more than 1 region | ✅ / ⚠️ |
| Source recency | ≤ 12 months for fast-moving fields | ✅ / ⚠️ |
| Hype filter | Actual adoption, not just buzz | ✅ / ❌ |

**If ❌ for any criterion — the trend is marked as "unconfirmed" and moved to the Watch-list.**

### Step 4 — Trend Strength Assessment
Classify each trend by stage:

| Stage | Adoption | Signs | Example |
|--------|:--------:|----------|--------|
| **Emerging** | <5% | Early signals, R&D, pilots, venture investments | Quantum computing for business |
| **Growing** | 5-25% | Gaining momentum, first commercial products, rising investments | AI content generation |
| **Mature** | >25% | Mass adoption, steady growth, commoditization | Cloud computing |
| **Declining** | Decreasing | Replaced by new trends, declining investments | On-premise CRM |

For each — evidence (data confirming the stage).

### Step 5 — Impact Assessment and Scoring
If a specific product / business is specified — assess the impact of each trend:

| Criterion | Weight | Scale | Description |
|----------|:---:|:-----:|----------|
| Impact | 0.35 | 1-10 | How strongly it will affect the business |
| Likelihood | 0.30 | 1-10 | Probability of realization within the given horizon |
| Readiness | 0.20 | 1-10 | How ready the business is for the trend (inverted: 10 = not ready) |
| Speed | 0.15 | 1-10 | Speed of onset (10 = sudden) |

`Trend Score = Σ(weight × score)`

| Threshold | Category | Action |
|:-----:|-----------|----------|
| ≥ 7.0 | 🔴 **Must-act** | Immediate actions, budget, team |
| 5.0-6.9 | 🟡 **Must-watch** | Monitoring, trigger for action |
| 3.0-4.9 | 🔵 **Experiment** | Pilot experiments, low-cost tests |
| < 3.0 | ⚪ **Ignore** | Irrelevant for the given business |

**Impact on business metrics** (for the top 5 trends):

| Trend | Metric | Current | Forecast (with trend) | Δ |
|-------|---------|:-------:|:-------------------:|:-:|
| [Trend 1] | TAM | $XB | $XB | +X% |
| [Trend 1] | Margin | XX% | XX% | ±Xpp |
| [Trend 2] | CAC | $XX | $XX | ±X% |

### Step 6 — Timeline and Adoption
For each key trend (Score ≥ 5.0):

| Element | Description |
|---------|----------|
| Current adoption | XX% in [region] |
| Forecast adoption | XX% in [N years] |
| Key milestones | [Event 1 → year], [Event 2 → year] |
| Tipping point | [What needs to happen for a mass transition] |
| Accelerating factors| [What will speed up the trend] |
| Decelerating factors| [What will slow it down] |
| Window of opportunity | [When to enter so as not to be late] |

### Step 7 — Recommendations
Based on scoring and timeline:

| Category | Trends | Specific actions |
|-----------|--------|---------------------|
| 🔴 **Must-act** | [Trends with Score ≥ 7.0] | [Action + budget + deadline + owner] |
| 🟡 **Must-watch** | [Score 5.0-6.9] | [What to monitor + trigger to transition to Must-act] |
| 🔵 **Experiment** | [Score 3.0-4.9] | [Experiment + budget + success metric] |
| ⚪ **Ignore** | [Score < 3.0] | [Why irrelevant + condition for review] |

## Example — EdTech corporate learning market, RF, 3-year horizon

**Context:** AI-powered corporate learning platform, B2B SaaS, RF.

### Macro Trends

| # | Trend | Layer | Stage | Evidence |
|---|-------|------|:------:|---------|
| M1 | AI transformation of all industries | Technologies | Growing (15-20%) | $184B AI market by 2030, CAGR 37% (Grand View Research, 2025) ✅ |
| M2 | Shortage of qualified personnel | Demographics | Mature (>30%) | 2.5M unfilled vacancies in RF (HH.ru, Q1 2026) ✅ |
| M3 | AI and data regulation | Regulation | Emerging (<5%) | EU AI Act took effect, RF preparing analog (Kommersant, 2026) ⚠️ |

### Industry Trends

| # | Trend | Stage | Adoption | Evidence | Sources |
|---|-------|:------:|:--------:|---------|-----------|
| I1 | AI personalization of learning | Growing | 12% | Duolingo +40% retention with AI (TechCrunch, 2025) | TechCrunch, Gartner ✅ |
| I2 | LLM generation of learning content | Emerging | 3% | Course cost reduction ×5 (a16z, 2026) | a16z, CB Insights ✅ |
| I3 | Micro-certifications instead of diplomas | Growing | 18% | Google, IBM, Amazon drop diploma requirement | McKinsey, LinkedIn ✅ |
| I4 | VR/AR for practical learning | Emerging | 2% | Walmart trains 1M emp. via VR (Forbes, 2025) | Forbes, Gartner ⚠️ |
| I5 | Cohort-based learning (CBC) | Growing | 8% | Maven, Reforge — $100M+ GMV (CB Insights) | CB Insights ✅ |

### Scoring

| # | Trend | Impact | Likelih. | Readiness (inv.) | Speed | **Score** | Category |
|---|-------|:------:|:--------:|:-----------------:|:-----:|:---------:|:---------:|
| I1 | AI personalization | 9 | 8 | 3 | 6 | **7.2** | 🔴 Must-act |
| M2 | Personnel shortage | 8 | 9 | 5 | 4 | **7.0** | 🔴 Must-act |
| I2 | LLM content generation | 8 | 7 | 7 | 8 | **7.5** | 🔴 Must-act |
| I3 | Micro-certifications | 6 | 7 | 6 | 4 | **5.9** | 🟡 Must-watch |
| M3 | AI regulation | 7 | 5 | 8 | 3 | **6.0** | 🟡 Must-watch |
| I4 | VR/AR learning | 5 | 3 | 9 | 2 | **4.8** | 🔵 Experiment |
| I5 | CBC | 4 | 6 | 4 | 3 | **4.3** | 🔵 Experiment |

### Impact on business metrics (top-3)

| Trend | Metric | Current | With trend (3 years) | Δ |
|-------|---------|:-------:|:------------------:|:-:|
| I1: AI personalization | Retention M6 | 48% | 62% | +14pp |
| I2: LLM generation | Cost per course | $5K | $1K | -80% |
| M2: Personnel shortage | TAM corp. learning | $1.8B | $2.7B | +50% |

### Recommendations

| Category | Trend | Action | Budget | Deadline |
|:---------:|-------|----------|:------:|------|
| 🔴 Must-act | I1: AI personalization | Launch adaptive learning paths | $200K | Q2 2026 |
| 🔴 Must-act | I2: LLM generation | MVP of course generator on GPT-4 | $80K | Q3 2026 |
| 🔴 Must-act | M2: Personnel shortage | Position as "ROI on upskilling" | $30K | Q2 2026 |
| 🟡 Must-watch | I3: Micro-certifications | Monitor adoption in RF. Trigger: >25% of companies accept | — | Quarterly |
| 🟡 Must-watch | M3: AI regulation | Track draft law. Trigger: first reading in Duma | — | Monthly |
| 🔵 Experiment | I4: VR/AR | Pilot with 1 client (VR module for safety training) | $20K | Q4 2026 |

## Validation (Quality Gate)

- [ ] Identified at least 3 macro trends and 5 industry trends
- [ ] For each trend — minimum 2 independent sources; unvalidated ones moved to Watch-list
- [ ] Each trend classified by stage (Emerging / Growing / Mature / Declining) with adoption %
- [ ] Trend Score calculated by formula (Impact × 0.35 + Likelihood × 0.30 + Readiness × 0.20 + Speed × 0.15)
- [ ] Trends categorized: must-act (≥7.0) / must-watch (5.0-6.9) / experiment (3.0-4.9) / ignore (<3.0)
- [ ] For must-act trends: impact on specific business metrics (TAM, margin, CAC, retention)
- [ ] Timeline and tipping points defined for trends with Score ≥ 5.0
- [ ] Hype filter passed: trends without actual adoption filtered out
- [ ] Recommendations are specific: action + budget + deadline (must-act), trigger (must-watch), experiment (experiment)
- [ ] Sources are current (≤ 12 months for fast-moving fields); outdated marked ⚠️

> If validation fails — iterate until it passes, do not hand off further.

## Handoff
The output of `$trend-analysis` acts as input for:
- **Strategist / Mediator** — trends as context for strategic decisions.
- **`tam-sam-som`** — market growth based on trends (CAGR, drivers).
- **`competitive-analysis`** — trends shaping competitive dynamics.
- **`pest-analysis`** — enriching macro factors with trend data.
- **`jtbd-analysis`** — new Jobs spawned by trends.
- **`blue-ocean-strategy`** — emerging trends as a source of new market spaces.

Output format: trend matrix with Trend Score + impact on metrics + recommendations by categories. When handing off — use `$handoff`.

## Anti-patterns

| Mistake | Why it hurts | How to do it right |
|--------|-------------|---------------|
| One source per trend | Risk of mistaking hype for a trend | Minimum 2 independent sources; 1 = ⚠️ |
| No stage classification | Unclear how to react | Emerging / Growing / Mature / Declining + adoption % |
| Trends without quantitative data | Impossible to assess scale | Adoption rate, investments, market growth |
| Only technological trends | Missed regulatory and social ones | 5 layers: tech, behavior, regulation, economics, demographics |
| No timeline | Unclear when to act | Timeline + tipping point + window of opportunity |
| All trends = must-act | No prioritization, paralysis | Scoring → 4 categories with thresholds |
| Outdated sources | Trends change quickly | ≤ 12 months for fast-moving fields |
| Impact without metrics | "Strong impact" is not actionable | Impact on TAM (±X%), margin (±Xpp), CAC (±X%) |
| Hype without substance | Buzz ≠ trend | Hype filter: real adoption, 2+ sources, >1 region |

## Output Template

```
### Trend Analysis — [Domain / Industry]

**Horizon:** [1 / 3 / 5 years]
**Geography:** [global / regions]
**Focus:** [tech / behavior / regulation / all]
**Assessment Date:** [date]

---

#### Trend Matrix

| # | Trend | Layer | Stage | Adoption | Impact | Likelih. | Readiness | Speed | **Score** | Category |
|---|-------|------|:------:|:--------:|:------:|:--------:|:---------:|:-----:|:---------:|:---------:|
| 1 | [trend] | [layer] | [stage] | XX% | X | X | X | X | **X.X** | 🔴/🟡/🔵/⚪ |

Thresholds: 🔴 Must-act (≥7.0) | 🟡 Must-watch (5.0-6.9) | 🔵 Experiment (3.0-4.9) | ⚪ Ignore (<3.0)

---

#### Macro Trends

##### 1. [Name] — [Stage]
- **Description:** [2-3 sentences]
- **Evidence:** [data, numbers]
- **Sources:** [source 1 ✅], [source 2 ✅]
- **Timeline:** [mass adoption by what year]
- **Impact:** [threat / opportunity — description]

---

#### Industry Trends

##### 1. [Name] — [Stage]
- **Description:** [2-3 sentences]
- **Adoption:** [current % → forecast %]
- **Key players:** [who is driving the trend]
- **Tipping point:** [what needs to happen]
- **Window of opportunity:** [when to enter]
- **Sources:** [source 1], [source 2]

---

#### Impact on Business Metrics (top-5)

| Trend | Metric | Current | With trend | Δ |
|-------|---------|:-------:|:---------:|:-:|
| [trend] | [TAM / margin / CAC / retention] | [value] | [value] | [±X%/pp] |

---

#### Recommendations

**🔴 Must-act:**
| # | Trend | Action | Budget | Deadline | Owner |
|---|-------|----------|:------:|------|---------------|
| 1 | [trend] | [action] | $XK | [when] | [who] |

**🟡 Must-watch:**
| # | Trend | What to monitor | Trigger for Must-act |
|---|-------|----------------|----------------------|
| 1 | [trend] | [metric / event] | [condition] |

**🔵 Experiment:**
| # | Trend | Experiment | Budget | Success metric |
|---|-------|-------------|:------:|----------------|
| 1 | [trend] | [pilot] | $XK | [what to measure] |

**⚪ Ignore:**
| # | Trend | Why | Review condition |
|---|-------|-------|---------------------|
| 1 | [trend] | [reason] | [when to review] |

---

#### Sources and Assumptions

| # | Fact / Assumption | Source | Date | Confidence |
|---|-------------------|----------|------|:-------------:|
| 1 | [Fact] | [Source] | [Date] | ✅ / ⚠️ / 🔮 |

Legend: ✅ Verified (2+ sources) | ⚠️ Estimated (1 source) | 🔮 Assumed (expert estimate)
```
