---
name: web-research
description: Mandatory web search and data verification — search protocol, cross-checking, source audit
---
# Web Research — Mandatory web search and data verification

## When to Use
- **Mandatory** for all Researcher gates (RES-xx) — no exceptions.
- For **any claim** based on external data (market statistics, regulatory norms, competitive data).
- When **verifying** data provided by the user — even if the user is confident in its accuracy.
- When **outdated data is discovered** — updating and refreshing.

> **Absolute rule:** A Researcher CANNOT complete a gate without executing `$web-research`. Absence of web search is an automatic **Blocker** during the `$gates` check.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Research brief | ✅ | Research questions (from the Interviewer) |
| Research topic | ✅ | Main topic / industry / company |
| User-provided data | ⬚ | Data provided by the user for verification |
| Search constraints | ⬚ | Geography, language, period, exclusions |
| Minimum sources | ⬚ | Minimum number of sources per thesis (default is 3) |

### Relationship with Other Skills
| Skill | Interaction | When |
|------|----------------|-------|
| `$gates` (RES-xx) | Absence of web-research = automatic Blocker | During the gate check of each RES gate |
| `$handoff` | Web-research results are handed off to the Data Analyst | After completing the research |
| `tam-sam-som` | Market data: TAM, CAGR, market shares | When the Data Analyst applies TAM/SAM/SOM |
| `competitive-analysis` | Competitor data: features, pricing, shares | When the Data Analyst applies competitive analysis |
| `pest-analysis` | Macro data: regulation, economics, demographics | When the Data Analyst applies PEST/PESTEL |
| `trend-analysis` | Trends: adoption rates, investments, forecasts | When the Data Analyst applies trend analysis |
| `cohort-analysis` | Industry retention benchmarks | If there is no real cohort data |
| `unit-economics` | Industry benchmarks for CAC, LTV, churn | If there are no real unit economics |
| All framework skills | Any external data required by the framework | Always, when the framework references `$web-research` |

> `$web-research` is a **service skill**: it serves all analytical skills by providing verified data.

## Source Tiering

| Tier | Source Type | Examples | Reliability | Usage |
|:----:|---------------|---------|:----------:|---------------|
| **T1** | Official reports, government statistics, peer-reviewed | Statista, Gartner, McKinsey, World Bank, SEC filings | High | Foundation for Verified. 1 T1 source = sufficient for Estimated |
| **T2** | Industry media, analytics, corporate blogs | TechCrunch, CB Insights, company blogs | Medium | Confirmation for T1 or foundation for Estimated. 2× T2 = Verified |
| **T3** | Forums, social networks, personal opinions, aggregators | Reddit, HN, Quora, expert blogs, Telegram channels | Low | Only for signals and hypotheses. Cannot be Verified. Maximum Assumed |

**Rules:**
- Verified = 1× T1 + 1× T1/T2, or 3× T2 with data matching.
- Estimated = 1× T1, or 2× T2.
- Assumed = T3, or indirect calculation, or extrapolation.
- **T3 is never counted as Verified or Estimated.**

## Data Confidence Levels

| Level | Marker | Definition | Requirements | In the Report |
|---------|:------:|-------------|------------|----------|
| **Verified** | ✅ | Confirmed by 2+ independent sources (T1/T2) | URLs of both, dates, data match | Can be stated as fact |
| **Estimated** | ⚠️ | One T1/T2 source or calculation | URL, methodology, caveat | "Estimated at..." |
| **Assumed** | 🔮 | Assumption, indirect data, T3 | Rationale, indirect sources | "Presumably..." |

## Data Currency Requirements

| Data Type | Maximum Age | Action When Outdated |
|-----------|:--------------------:|--------------------------|
| Market statistics | 12 months | Search for fresh data or mark as ⚠️ Estimated |
| Regulatory / legal | Current version | Must verify currency |
| Company financials | Latest reporting period | Indicate the reporting period |
| Technology trends | 6 months | Search for the most current |
| Demographic data | 24 months | Acceptable if no fresher data exists |

## Protocol

### Step 0 — Search Planning
1. Study the research brief — identify key questions.
2. For each question, define at least 3 search queries.
3. Include the year in queries to ensure currency.
4. Plan queries for counter-evidence.
5. Define the priority of sources: T1 → T2 → T3.

### Step 1 — Execute Search
1. Execute search queries via WebSearch.
2. For each result: extract data via WebFetch.
3. Record: URL, publication date, author / organization, **Source Tier**.
4. Minimum 3 queries per data point.

### Step 2 — Data Extraction and Structuring
1. From each source, extract specific data (numbers, facts, quotes).
2. Link data to questions from the research brief.
3. Assign a confidence level (Verified / Estimated / Assumed) based on tiering rules.
4. Timestamp each data point.

### Step 3 — Cross-Checking
1. For each key data point — find confirmation in 2+ sources.
2. When data conflicts: record both values, cite sources, flag as a conflict.
3. On conflict — attempt to find a third source for resolution.
4. If the conflict is unresolved — pass both versions with a "Conflict: [value A] vs [value B]" notation.

### Step 4 — Counter-Evidence Search
1. For each key thesis — deliberately search for refutations.
2. Formulate queries like: "[thesis] criticism", "[thesis] disadvantages", "[thesis] risks".
3. Record found counter-arguments.
4. If no counter-evidence is found — record this as "counter-position not found".

### Step 5 — Audit Trail Formation
1. Record all search queries used.
2. Record all URLs visited (even if data was not used).
3. Record reasons for rejecting sources (outdated, T3, irrelevant, conflicts).
4. Form the final source table.

### Step 6 — Research Quality Assessment
Calculate quality metrics:

| Metric | Formula | Value | Threshold |
|---------|---------|:--------:|:-----:|
| **Verified %** | Verified / Total × 100 | XX% | ≥ 50% — good |
| **Coverage** | Questions covered / Total questions × 100 | XX% | 100% — mandatory |
| **Source diversity** | Unique sources / Data points | X.X | ≥ 1.5 — good |
| **Counter-evidence rate**| Theses with counter-search / Total theses × 100 | XX% | 100% — mandatory |
| **Conflict rate** | Unresolved conflicts / Total data points × 100 | XX% | ≤ 10% — acceptable |

**Research Quality:**

| Verified % | Assessment | Action |
|:----------:|--------|----------|
| ≥ 70% | 🟢 High | Ready to hand off to the Data Analyst |
| 50-69% | 🟡 Medium | Hand off with a caveat, recommend additional search |
| < 50% | 🔴 Low | Rework: find more T1/T2 sources |

### Step 7 — Results Compilation
1. Structure data by research brief questions.
2. For each question: facts → sources (with Tier) → confidence level → counter-position.
3. Highlight conflicts and unresolved questions.
4. Attach quality metrics.
5. Formulate conclusions for handoff to the Data Analyst.

## Search Query Patterns

### Mandatory Patterns
| Pattern | Example | Purpose |
|---------|--------|------|
| `[topic] [year]` | "SaaS market size 2025" | Current data |
| `[topic] statistics report` | "e-commerce Russia statistics report" | Official reports (T1) |
| `[topic] criticism risks` | "remote work criticism risks" | Counter-evidence |
| `[company] revenue financial results` | "Skillbox revenue 2025" | Financial data |
| `[topic] vs [alternative]` | "Bitrix24 vs amoCRM 2025" | Comparative data |
| `site:statista.com [topic]` | `site:statista.com cloud computing` | T1 sources |
| `[topic] research [industry]` | "retention benchmarks SaaS B2B" | Industry benchmarks |

### Prohibited Patterns
| Pattern | Why | Alternative |
|---------|--------|-------------|
| One general query for the entire topic | Superficial data | Minimum 3 queries per data point |
| Query without a year | Outdated results | Always include the year |
| Only confirming queries | Confirmation bias | Must search for counter-evidence |
| Copying data without verification | Unreliable data | Cross-check with 2+ sources |
| Only T3 sources | Low reliability | Priority: T1 → T2 → T3 as a supplement |

## Example — Web Research for "EdTech Market Russia, Corporate Training"

**Research brief (from INT-01):** 4 of 12 questions (fragment).

### Question 1: What is the size of the Russian EdTech market (TAM)?

| # | Fact | Source | Tier | URL | Date | Confidence |
|---|------|----------|:----:|-----|------|:-------------:|
| 1 | Russian EdTech = $4.2B (2026) | Smart Ranking | T1 | smart-ranking.ru/... | 2026-01 | ✅ Verified |
| 2 | Russian EdTech = $3.9-4.5B (2026) | HSE, ISSEK | T1 | hse.ru/... | 2025-11 | ✅ Verified |
| 3 | Corp. training = 43% of EdTech | HSE | T1 | hse.ru/... | 2025-11 | ⚠️ Estimated |

**Counter-position:** Smart Ranking notes that 30% of the market is the shadow sector (private tutors), which may inflate TAM. Source: smart-ranking.ru/methodology.
**Conflicts:** None (a spread of $3.9-4.5B is normal for different methodologies).

### Question 3: What technological trends are reshaping the market?

| # | Fact | Source | Tier | URL | Date | Confidence |
|---|------|----------|:----:|-----|------|:-------------:|
| 1 | AI personalization: 12% adoption in EdTech| Gartner | T1 | gartner.com/... | 2025-09 | ✅ Verified |
| 2 | AI personalization: Duolingo +40% retention | TechCrunch | T2 | techcrunch.com/... | 2025-07 | ✅ Verified (with #1) |
| 3 | LLM reduces course cost ×5 | a16z | T2 | a16z.com/... | 2026-02 | ⚠️ Estimated |
| 4 | "AI in learning is overhyped for the corp. sector" | HBR | T1 | hbr.org/... | 2025-10 | ✅ Counter-position |

**Counter-position:** HBR argues that corporate training requires human-in-the-loop and AI-only solutions do not work for soft skills.

### Quality Metrics

| Metric | Value | Threshold | Assessment |
|---------|:--------:|:-----:|:------:|
| Verified % | 62% (18/29) | ≥ 50% | 🟡 Medium |
| Coverage | 100% (12/12 questions) | 100% | 🟢 |
| Source diversity | 1.7 (48 sources / 29 points) | ≥ 1.5 | 🟢 |
| Counter-evidence rate| 100% (12/12 theses) | 100% | 🟢 |
| Conflict rate | 7% (2/29) | ≤ 10% | 🟢 |

**Quality: 🟡 Medium** (Verified 62% — hand off with a caveat, recommend additional T1 search for ⚠️ data).

### Audit Trail (fragment)

| # | Query | Results | Used | Rejected |
|---|--------|:-----------:|:------------:|:---------:|
| 1 | "EdTech market Russia 2025 2026" | 23 | 4 | 19 (outdated: 8, irrelevant: 11) |
| 2 | "corporate training market Russia report" | 15 | 3 | 12 (T3: 5, duplicates: 4, outdated: 3) |
| 3 | "EdTech Russia criticism risks 2025" | 9 | 2 | 7 (irrelevant) |

**Total:** 38 queries, 112 results, 48 sources used, 64 rejected.

## Validation (Quality Gate)

Web research is considered complete if:

- [ ] All research brief questions are covered by data (Coverage = 100%)
- [ ] WebSearch / WebFetch are used (not "from memory")
- [ ] Each data point has: URL, date, source Tier, confidence level
- [ ] Cross-checking is performed (2+ sources per key data point)
- [ ] Counter-evidence is deliberately searched for each thesis (Counter-evidence = 100%)
- [ ] Data is current per the requirements table
- [ ] Audit trail is completed (all queries, URLs, rejection reasons)
- [ ] Conflicting data is flagged and explained (Conflict rate ≤ 10%)
- [ ] Minimum number of sources is met (default ≥ 3 per thesis)
- [ ] Verified % ≥ 50% (if < 50% — rework or hand off with a 🔴 caveat)
- [ ] T3 sources are not used as Verified or Estimated

## Handoff
The `$web-research` result is input for:
- **Data Analyst (AN-xx)** — verified data for applying frameworks.
- **All framework skills** — via the Data Analyst: data feeds into TAM/SAM/SOM, Competitive Analysis, PEST, SWOT, etc.
- **`$gates` (RES-xx)** — the gate check verifies the presence and quality of the web-research.

Handoff format: a structured report (based on the research brief questions) + source table (with Tier and confidence) + quality metrics + audit trail. When handing off — use `$handoff`.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|--------|-------------|---------------|
| Data "from memory" without search | May be outdated or inaccurate | Always execute WebSearch |
| One source = "fact" | No cross-checking | 2+ sources (T1/T2) for key data |
| No counter-evidence | Confirmation bias, one-sided analysis | Deliberately search for refutations (100%) |
| URL without date and Tier | Impossible to assess currency and reliability | Always: URL + date + Tier (T1/T2/T3) |
| All data marked Verified | Unrealistic, hides uncertainty | Honestly: Verified / Estimated / Assumed |
| Queries without a year | Outdated results | Include the current year in the query |
| Skipping the audit trail | Impossible to verify research quality | Record all queries, URLs, rejection reasons |
| Only T3 sources | Low reliability, cannot be Verified | Priority T1 → T2; T3 only as a signal |
| Verified < 50% without rework | Majority of data is unreliable | Rework: find T1/T2 or hand off with a 🔴 caveat |

## Output Template

```markdown
### Web Research Report — [Topic]

**Researcher:** [RES-xx]
**Date:** [YYYY-MM-DD]
**Research brief:** [N questions from INT-01]

---

#### Quality Metrics

| Metric | Value | Threshold | Assessment |
|---------|:--------:|:-----:|:------:|
| Verified % | XX% | ≥ 50% | 🟢/🟡/🔴 |
| Coverage | XX% | 100% | 🟢/🔴 |
| Source diversity | X.X | ≥ 1.5 | 🟢/🟡 |
| Counter-evidence rate| XX% | 100% | 🟢/🔴 |
| Conflict rate | XX% | ≤ 10% | 🟢/🟡 |

**Research Quality:** 🟢 High / 🟡 Medium / 🔴 Low

---

#### Results by Question

##### Question 1: [Formulation from research brief]

| # | Fact / Data | Source | Tier | URL | Date | Confidence |
|---|--------------|----------|:----:|-----|------|:-------------:|
| 1 | [Value] | [Name] | T1/T2/T3 | [URL] | [YYYY-MM] | ✅ / ⚠️ / 🔮 |

**Counter-position:** [Found counter-arguments or "None found"]
**Conflicts:** [Discrepancies or "None"]

##### Question 2: [Formulation]
[same structure]

---

#### Confidence Summary

| Level | Count | Share |
|---------|:------:|:----:|
| ✅ Verified | [N] | XX% |
| ⚠️ Estimated | [N] | XX% |
| 🔮 Assumed | [N] | XX% |

#### Unresolved Conflicts

| # | Data A | Source A (Tier) | Data B | Source B (Tier) | Comment |
|---|---------|:-----------------:|---------|:-----------------:|-------------|
| 1 | [Data] | [Source] | [Data] | [Source] | [Comment] |

---

#### Audit Trail

| # | Query | Results | Used | Rejected (reason) |
|---|--------|:-----------:|:------------:|---------------------|
| 1 | [query] | [N] | [N] | [N] ([reasons]) |

**Total:** [N] queries, [N] results, [N] used, [N] rejected
```
