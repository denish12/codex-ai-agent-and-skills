---
name: web-research
description: Mandatory web search and data verification — search protocol, cross-referencing, source auditing
---
# Web Research — Mandatory Web Search and Data Verification

## When to Use
- **Mandatory** for all Researcher gates (RES-xx) — no exceptions.
- For **any assertion** based on external data (market statistics, regulatory norms, competitive data).
- When **verifying** user-provided data — even if the user is confident in its accuracy.
- When **outdated data is detected** — updating and refreshing.

> **Absolute rule:** A Researcher CANNOT complete a gate without executing `$web-research`. Absence of web search is an automatic **Blocker** during `$gates` review.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| Research brief | ✅ | Research questions (from Interviewer) |
| Research topic | ✅ | Main topic / industry / company |
| User-provided data | ⬚ | Data provided by the user for verification |
| Search constraints | ⬚ | Geography, language, time period, exclusions |
| Minimum sources | ⬚ | Minimum number of sources per claim (default 3) |

## Data Confidence Levels

Every data point in the final report must have one of three levels:

| Level | Definition | Requirements |
|-------|-----------|--------------|
| **Verified** | Confirmed by 2+ independent sources | URLs of both sources, dates, data match |
| **Estimated** | One source or calculation based on several | Source URL, calculation methodology, caveat |
| **Assumed** | Assumption based on indirect data | Justification of the assumption, list of indirect sources |

> In the final report: **Verified** — can be stated as fact, **Estimated** — note "by estimates," **Assumed** — note "presumably."

## Data Recency Requirements

| Data Type | Maximum Age | Action When Outdated |
|-----------|------------|---------------------|
| Market statistics | 12 months | Search for fresh data or mark as Estimated |
| Regulatory / legal | Current version | Mandatory recency check |
| Company financials | Last reporting period | Indicate the reporting period |
| Technology trends | 6 months | Search for the most recent data |
| Demographic data | 24 months | Acceptable if no fresher data exists |

## Protocol

### Step 0 — Search Planning
1. Study the research brief — identify key questions.
2. For each question, define at least 3 search queries.
3. Include the year in queries to ensure recency (e.g., "market size SaaS 2025").
4. Plan counter-evidence queries.

### Step 1 — Search Execution
1. Execute search queries via WebSearch.
2. For each result: extract data via WebFetch.
3. Record URL, publication date, author / organization.
4. Minimum 3 queries per data point.

### Step 2 — Data Extraction and Structuring
1. From each source, extract specific data (numbers, facts, quotes).
2. Link data to questions from the research brief.
3. Assign a confidence level (Verified / Estimated / Assumed).
4. Timestamp each data point.

### Step 3 — Cross-Referencing
1. For each key data point — find confirmation in 2+ sources.
2. When data conflicts: record both values, cite sources, mark as a conflict.
3. On conflict — attempt to find a third source for resolution.
4. If the conflict is unresolved — pass both versions with a note "Conflict: [value A] vs [value B]."

### Step 4 — Counter-Evidence Search
1. For each key claim — deliberately search for refutations.
2. Formulate queries like: "[claim] criticism," "[claim] disadvantages," "[claim] risks."
3. Record counter-arguments found — they are needed for balanced analysis.
4. If no counter-evidence is found — record this as "counter-position not found."

### Step 5 — Audit Trail Formation
1. Record all search queries used.
2. Record all visited URLs (even if data was not used).
3. Record reasons for rejecting sources (if any).
4. Compile the final source table.

### Step 6 — Results Compilation
1. Structure data by research brief questions.
2. For each question: facts -> sources -> confidence level -> counter-position.
3. Highlight conflicts and unresolved questions.
4. Formulate conclusions for handoff to Data Analyst.

## Search Query Patterns

### Mandatory Patterns
| Pattern | Example | Purpose |
|---------|---------|---------|
| `[topic] [year]` | "SaaS market size 2025" | Current data |
| `[topic] statistics report` | "e-commerce Ukraine statistics report" | Official reports |
| `[topic] criticism risks` | "remote work criticism risks" | Counter-evidence |
| `[company] revenue financial results` | "Rozetka revenue 2024" | Financial data |
| `[topic] vs [alternative]` | "Shopify vs WooCommerce 2025" | Comparative data |
| `site:statista.com [topic]` | `site:statista.com cloud computing` | Specialized sources |

### Prohibited Patterns
| Pattern | Why | Alternative |
|---------|-----|------------|
| One general query for the entire topic | Superficial data | Minimum 3 queries per data point |
| Query without year | Outdated results | Always include the year |
| Only confirming queries | Confirmation bias | Must search for counter-evidence |
| Copying data without verification | Unreliable data | Cross-reference with 2+ sources |

## Validation (Quality Gate)

Web research is considered complete if:

- [ ] All research brief questions are covered with data
- [ ] WebSearch / WebFetch were used (not "from memory")
- [ ] Each data point has: source URL, date, confidence level
- [ ] Cross-referencing performed (2+ sources for key data)
- [ ] Counter-evidence was deliberately sought
- [ ] Data meets recency requirements per the table
- [ ] Audit trail is complete (all queries documented)
- [ ] Conflicting data is flagged and explained
- [ ] Minimum source threshold met (default >= 3 per claim)

## Handoff
The `$web-research` result serves as input for: Data Analyst (AN-xx) — verified data for analysis.

## Anti-patterns

| Mistake | Why It's Bad | How to Do It Right |
|---------|-------------|-------------------|
| Data "from memory" without search | May be outdated or inaccurate | Always execute WebSearch |
| One source = "fact" | No cross-referencing | 2+ sources for key data |
| No counter-evidence | Confirmation bias, one-sided analysis | Deliberately search for refutations |
| URL without date | Impossible to assess recency | Always record the publication date |
| All data marked Verified | Unrealistic, hides uncertainty | Honestly assign Estimated and Assumed |
| Queries without year | Outdated results | Include current or target year in the query |
| Skipping the audit trail | Impossible to verify research quality | Record all queries and URLs |
| Data from a single source type | One-sided picture | Diversity: reports, news, analysis, statistics |

## Output Template

```
### Web Research Report — [Topic]

**Researcher:** [RES-xx]
**Date:** [YYYY-MM-DD]
**Research brief:** [Reference to questions from INT-01]

---

#### Results by Question

##### Question 1: [Formulation from research brief]

| # | Fact / Data | Source | URL | Date | Confidence |
|---|------------|--------|-----|------|------------|
| 1 | [Value] | [Name] | [URL] | [YYYY-MM] | Verified |
| 2 | [Value] | [Name] | [URL] | [YYYY-MM] | Estimated |

**Counter-position:** [Counter-arguments found or "Not found"]
**Conflicts:** [Data discrepancies or "None"]

##### Question 2: [Formulation]
[same structure]

---

#### Confidence Summary

| Level | Data Points | Share |
|-------|------------|-------|
| Verified | [N] | [%] |
| Estimated | [N] | [%] |
| Assumed | [N] | [%] |

#### Unresolved Conflicts
| # | Data A | Source A | Data B | Source B | Comment |
|---|--------|---------|--------|---------|---------|

---

#### Audit Trail

| # | Query | Results | Used | Rejected (reason) |
|---|-------|---------|------|-------------------|
| 1 | [search query] | [N] | [N] | [N] ([reason]) |
| 2 | [search query] | [N] | [N] | [N] ([reason]) |

**Total queries:** [N]
**Total sources used:** [N]
**Total sources rejected:** [N]
```
