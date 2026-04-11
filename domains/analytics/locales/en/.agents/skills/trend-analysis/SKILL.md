---
name: trend-analysis
description: Market trend identification and assessment — strength, impact, timeline, recommendations
---
# Trend Analysis — Market Trend Identification and Assessment

## When to Use
- During strategic planning — to understand where the market is heading over a 1-5 year horizon.
- When searching for new opportunities — to identify emerging trends before they become mainstream.
- When assessing risks — to identify trends that could undermine the current business model.
- When preparing investment materials — trends as justification for market timing.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Domain / industry | ✅ | The area in which to search for trends |
| Horizon | ✅ | Time horizon: 1 year / 3 years / 5 years |
| Product / business | ⬚ | For assessing trend impact on a specific business |
| Focus | ⬚ | Technology / Consumer behavior / Regulation / All |
| Geography | ⬚ | Global or specific regions |
| Known trends | ⬚ | What is already being tracked (to expand the list) |

> If required fields are not provided — **ask the user** before starting the analysis. Do not assume.

## Data Sources
1. **Web search** — recent analyst reports (McKinsey, BCG, Deloitte, CB Insights, a16z).
2. **Technology sources** — Gartner Hype Cycle, TechCrunch, Wired, MIT Tech Review.
3. **Industry reports** — specialized analytical agencies and associations.
4. **Academic publications** — university research and research labs.
5. **Social signals** — discussions on Reddit, HN, Twitter, industry conferences.
6. **Patent databases** — USPTO, EPO (for technology trends).

> For each trend — minimum 2 independent sources confirming its existence.

## Protocol

### Step 0 — Context Collection
Verify required data availability. Determine search breadth: narrow domain or broad overview. Set the horizon and geography.

### Step 1 — Define Domain and Horizon
- Clearly define the boundaries of the domain under investigation.
- Set the horizon: short-term (1 year), mid-term (2-3 years), long-term (5+ years).
- Define analysis layers: technology, consumer behavior, regulation, economics, society.

### Step 2 — Macro Trends (Mega Trends)
Through web search, identify global macro trends affecting the domain:
- Technological shifts (AI, blockchain, IoT, quantum, etc.).
- Demographic changes (aging, urbanization, migration).
- Economic factors (inflation, recession, EM growth).
- Regulatory changes (GDPR, AI Act, ESG requirements).
- Social shifts (remote work, sustainability, wellness).
- Select 3-5 macro trends most relevant to the domain.

### Step 3 — Industry Trends
Drill into the specific industry:
- Technological innovations within the industry.
- New business models and approaches.
- Changes in target audience behavior.
- Competitive dynamics (consolidation, new entrants, disruption).
- Select 5-10 industry trends.

### Step 4 — Validation (Multiple Sources)
For each trend, verify:
- At least 2 independent sources confirm the trend.
- Quantitative data exists (market size, adoption rate, investment).
- The trend is observed beyond a single region / company.
- Sources are current (no older than 12 months for rapidly changing areas).
- Filter out hype without substance (noise without real adoption).

### Step 5 — Trend Strength Assessment
Classify each trend by stage:
- **Emerging** — nascent, early signals, low adoption (<5%).
- **Growing** — gaining momentum, medium adoption (5-25%).
- **Mature** — mass adoption (>25%), stable growth.
- **Declining** — fading, being replaced by new trends.
- For each — evidence (data supporting the stage classification).

### Step 6 — Business Impact Assessment
If a specific product / business is indicated — assess the impact of each trend:
- **Impact** (1-10): how strongly it will affect the business.
- **Likelihood** (1-10): probability of realization within the given horizon.
- **Readiness** (1-10): how prepared the business is for this trend.
- Classify: threat / opportunity / neutral.

### Step 7 — Timeline and Adoption
For each key trend:
- Expected timeline for mass adoption.
- Key milestones (regulation, technological maturity, killer app).
- Acceleration and deceleration factors.
- Tipping points: what must happen for mass transition.

### Step 8 — Recommendations
Based on the analysis, produce:
- **Must-watch** — trends that need continuous monitoring.
- **Must-act** — trends requiring immediate action.
- **Experiment** — trends for pilot experiments.
- **Ignore** — trends irrelevant to this business.
- Specific steps for each category.

## Validation (Quality Gate)

- [ ] At least 3 macro trends and 5 industry trends identified
- [ ] For each trend — minimum 2 independent sources
- [ ] Each trend is classified by stage (Emerging/Growing/Mature/Declining)
- [ ] Business impact assessed (if a product is specified)
- [ ] Timeline and key milestones defined for top trends
- [ ] Recommendations are specific: must-watch / must-act / experiment / ignore
- [ ] Sources are current (no older than 12 months for fast-moving areas)
- [ ] Hype without substance has been filtered out

> If validation fails — rework until passing, do not hand off further.

## Handoff
The `$trend-analysis` result serves as input for:
- **Strategist / Mediator** — trends as context for strategic decisions.
- `$tam-sam-som` — market growth based on trends (CAGR, drivers).
- `$competitive-analysis` — trends shaping competitive dynamics.
- `$jtbd-analysis` — new Jobs spawned by trends.
- `$unit-economics` — trend impact on CAC, LTV, margin.

On handoff — use `$handoff` with a ranked trend matrix and recommendations.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| One source per trend | Risk of mistaking hype for a trend | Minimum 2 independent sources |
| No stage classification | Unclear how to respond | Emerging / Growing / Mature / Declining |
| Trends without quantitative data | Impossible to assess scale | Adoption rate, investment volume, market size |
| Only technology trends | Missing regulatory and social shifts | Analyze all layers: technology, regulation, society |
| No timeline | Unclear when to act | For each trend — expected horizon |
| All trends = must-act | No prioritization, paralysis | Clear categorization: watch / act / experiment / ignore |
| Outdated sources | Trends change rapidly | Sources no older than 12 months |

## Output Template

```
### Trend Analysis — [Domain / Industry]

**Horizon:** [1 / 3 / 5 years]
**Geography:** [global / regions]
**Focus:** [technology / behavior / regulation / all]
**Analysis date:** [date]

---

#### Trend Matrix

| # | Trend | Layer | Stage | Impact (1-10) | Likelihood (1-10) | Timeline | Action |
|---|-------|-------|-------|---------------|-------------------|----------|--------|
| 1 | [trend] | Technology | Growing | [X] | [X] | [year] | Must-act |
| 2 | [trend] | Regulation | Emerging | [X] | [X] | [year] | Must-watch |
| 3 | [trend] | Behavior | Mature | [X] | [X] | [year] | Experiment |
| 4 | [trend] | Economics | Growing | [X] | [X] | [year] | Must-watch |

---

#### Macro Trends

##### 1. [Trend Name] — [Stage]
- **Description:** [2-3 sentences]
- **Evidence:** [data, figures]
- **Sources:** [source 1], [source 2]
- **Timeline:** [expected horizon for mass adoption]
- **Business impact:** [threat / opportunity — description]

##### 2. [Trend Name] — [Stage]
[Same structure]

---

#### Industry Trends

##### 1. [Trend Name] — [Stage]
- **Description:** [2-3 sentences]
- **Evidence:** [data, figures]
- **Sources:** [source 1], [source 2]
- **Adoption:** [current % adoption, forecast]
- **Key players:** [who is driving the trend]
- **Tipping point:** [what must happen]

---

#### Business Impact Map

| Trend | Impact Type | Readiness | Recommendation |
|-------|------------|-----------|----------------|
| [trend 1] | Opportunity | Low | [specific action] |
| [trend 2] | Threat | Medium | [specific action] |
| [trend 3] | Neutral | High | Monitoring |

---

#### Recommendations

**Must-act (immediate actions):**
1. [trend] — [specific action + justification]

**Must-watch (monitoring):**
1. [trend] — [what to track + action trigger]

**Experiment (pilots):**
1. [trend] — [experiment + success metrics]

**Ignore (irrelevant):**
1. [trend] — [why irrelevant]

---

#### Data Sources
1. [Source] — [year, link]
2. [Source] — [year, link]
```
