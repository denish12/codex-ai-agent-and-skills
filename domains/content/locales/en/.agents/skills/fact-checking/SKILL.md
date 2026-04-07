---
name: fact-checking
description: Fact verification — typology, source hierarchy, severity, checking methods, PASS/FAIL threshold
---
# Fact Checking

## When to Use
- At the **Reviewer** stage — before final approval of content containing data and claims.
- When **creating data-driven content** — in parallel with `$data-storytelling`.
- During **audit of existing content** — checking the relevance of old publications.
- Whenever there is **any doubt** about the authenticity of a fact — it is better to check once.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Text for checking | ✅ | Content containing factual claims |
| Content Type | ✅ | Determines the level of strictness (see below) |
| Author's Sources | ⬚ | If the author provided their sources — check them |
| Result of `$source-verification` | ⬚ | If already passed — use it, do not duplicate |

> If the text contains no factual claims (purely opinion, humor) — the skill **is not applied**. Mark as N/A.

## Strictness Levels

The strictness of the check depends on the content type and risks:

| Level | Content Types | Requirements | Example |
|---------|--------------|------------|--------|
| 🔴 **Maximum** | Medical, financial, legal, scientific claims | Only peer-reviewed / official sources. 0 unverified. | Article about medications, investment review |
| 🟡 **Standard** | Articles, case studies, analytics, email, longreads | Reliable sources (Tier 1-2). ≤ 1 unverified (Minor). | Blog post with data, carousel with statistics |
| 🔵 **Basic** | Social media, short posts, entertaining content | Common sense + check key figures. Common knowledge facts without links are acceptable. | Meme with a number, post saying "according to research" |

> The level determines how many checks are needed and what sources are acceptable.

## Fact Typology

| Fact Type | What to check | Checking Method | Example |
|-----------|--------------|----------------|--------|
| **Statistics / numbers** | Number, sample, year, methodology | Find original research | "87% of marketers use AI" |
| **Quote** | Accuracy, context, authorship | Find the primary source of the quote | "Steve Jobs said: ..." |
| **Date / chronology** | Correctness of the date, order of events | Several independent sources | "The company was founded in 2015" |
| **Name / job title** | Correct spelling, current job title | Official website, LinkedIn | "Google CEO Sundar Pichai" |
| **Scientific claim** | Scientific consensus, has it been refuted | Peer-reviewed journals, meta-analyses | "Coffee reduces the risk of diabetes" |
| **Legal claim** | Current legislation, jurisdiction | Official legal databases | "By Russian law, advertising must be labeled" |
| **Causal relationship** | Correlation ≠ causation | Check research methodology | "Content marketing increases sales by 30%" |
| **Common knowledge** | Check if it is really common knowledge | Quick check if there are doubts | "The Earth revolves around the Sun" |

## Source Hierarchy

| Tier | Source Type | Reliability | Examples |
|------|--------------|------------|---------|
| **Tier 1** | Primary / academic | Maximum | Peer-reviewed journals, state statistics (Rosstat, BLS), SEC filings, patents |
| **Tier 2** | Authoritative secondary | High | Industry reports (McKinsey, Gartner, Statista), major media (Reuters, Bloomberg), official company blogs |
| **Tier 3** | Reliable secondary | Medium | Industry media, expert books, TED talks, major editorial blogs |
| **Tier 4** | User-generated content | Low | Personal blogs, social media posts, Reddit, Quora, Wikipedia (without checking the primary source) |
| **Tier 5** | Unreliable | Minimum | Anonymous sources, content farms, yellow press, affiliate sites |

### Rules by Strictness Level
- 🔴 **Maximum:** Tier 1-2 only. Tier 3 is allowed for context, but not for key claims.
- 🟡 **Standard:** Tier 1-3. Tier 4 is allowed for illustrations, but not for numbers.
- 🔵 **Basic:** Tier 1-4. Tier 5 is not allowed under any level.

## Severity — Error Levels

| Severity | Definition | Examples | Impact |
|----------|-------------|---------|---------|
| 🔴 **Critical** | Factual error that misleads, legal/medical risk | Incorrect medication dosage, false statistics, non-existent law | FAIL |
| 🟡 **Major** | Noticeable inaccuracy that undermines trust | Outdated figure (2019 instead of 2025), wrong job title, distorted quote | FAIL if ≥ 2 |
| 🔵 **Minor** | Minor inaccuracy not affecting the core message | Rounding (87% instead of 86.7%), inexact date (March instead of April) | Does not block |

### PASS / FAIL Threshold

| Result | Condition |
|-----------|---------|
| **VERIFIED** | 0 Critical + 0 Major + 0 unverified (🔴 strictness level) |
| **PASS** | 0 Critical + ≤ 1 Major + ≤ 1 unverified Minor |
| **PASS WITH NOTES** | 0 Critical + ≤ 1 Major (with correction) + ≤ 2 unverified Minor |
| **FAIL** | ≥ 1 Critical OR ≥ 2 Major OR ≥ 3 unverified |

## Verification Methods

| Method | When to use | How |
|-------|-------------------|-----|
| **Primary source search** | Statistics, scientific claims | Find original study/report, not a summary |
| **Cross-checking** | Dates, names, events | ≥ 2 independent sources match |
| **Reverse quote search** | Quotes attributed to famous people | Web search exact quote + name → check attribution |
| **Wayback Machine** | Data from deleted/modified pages | web.archive.org → snapshot on date |
| **Methodology check** | Statistics with unusual conclusions | Who conducted? What sample? Who sponsored? |
| **Relevance check** | Any data | Source publication date ≤ 2 years (for fast-paced markets ≤ 1 year) |
| **Context check** | Quotes taken out of context | Read the original more broadly — 2-3 paragraphs around the quote |
| **Calculator / common sense** | Numbers that "don't add up" | Recalculate: percentages, ratios, orders of magnitude |

## Protocol

### Step 0 — Preparation
1. Receive text and determine the content type.
2. Determine strictness level (🔴 / 🟡 / 🔵).
3. Load `$source-verification` result, if available.

### Step 1 — Fact Extraction
1. Read the text entirely.
2. Highlight **all** factual claims — each on a separate line.
3. Classify each by typology (statistics / quote / date / name / scientific / legal / causation / common knowledge).
4. Determine the **criticality** of each fact to the core of the content (key / supporting / illustrative).

### Step 2 — Verification
For each claim:
1. Select verification method based on fact type.
2. Find source (adhering to hierarchy by strictness level).
3. Check accuracy: number, date, name, context.
4. Check relevance: is the data outdated?
5. Assign status: ✅ Correct / ❌ Incorrect / ⚠️ Unverified.

### Step 3 — Error Evaluation
For each ❌ and ⚠️:
1. Assign severity (Critical / Major / Minor).
2. For ❌ — indicate the correct version with a source.
3. For ⚠️ — recommendation: find source / remove / replace with verified fact.

### Step 4 — Verdict
1. Count by severity.
2. Apply PASS / FAIL threshold.
3. Form a list of mandatory edits and recommended removals.

## Validation (Quality Gate)

Fact-checking is considered complete if:

- [ ] All factual claims extracted from text
- [ ] Each claim classified by type
- [ ] Each claim verified (✅ / ❌ / ⚠️ — none empty)
- [ ] For each ❌ specified: severity, correct version, source
- [ ] For each ⚠️ specified recommendation (find / remove / replace)
- [ ] Sources match strictness level
- [ ] Verdict matches threshold (not subjective)
- [ ] List of mandatory edits formed

## Handoff

| Result | Route |
|-----------|---------|
| **VERIFIED / PASS** | → `$content-review-checklist` (item #18 — link to this result) → `$content-release-gate` |
| **PASS WITH NOTES** | → Copywriter (fix Major + replace/remove ⚠️) → repeated fact-checking |
| **FAIL** | → Copywriter / Researcher (fix Critical/Major) → mandatory repeated fact-checking |

When handing off — use `$handoff` attaching the full report.

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$source-verification` | **Complement:** source verification → used as input for fact-checking |
| `$data-storytelling` | **Source:** data from data story is checked by fact-checking |
| `$topic-research` | **Source:** facts from topic research — check before use |
| `$content-review-checklist` | **Consumer:** item #18 links to fact-checking result |
| `$content-release-gate` | **Consumer:** VERIFIED/PASS is mandatory for Release Gate |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Checking only "suspicious" facts | Obvious facts can also be wrong | Check all factual claims |
| Wikipedia as sole source | Wikipedia is Tier 4, may contain errors | Wikipedia → find primary source from footnotes |
| "According to research" without link | Unverifiable claim | Specific source: who, when, where, sample |
| Old data without checking | "In 2020 the market was..." → what about 2026? | Check relevance, look for fresh data |
| Correlation = causation | "Companies with blogs grow faster" ≠ blog → growth | Explicitly state: correlation, causation not proven |
| Checking against summary instead of original | Summary might have distorted data | Always look for the primary source |
| One source = verified | Source can be wrong | For key facts — ≥ 2 independent sources |
| Fact is correct, but outdated | World has changed since publication | Relevance: ≤ 2 years, for fast markets ≤ 1 year |

## Output Template

```
### Fact Checking — [Content Title]

**Content Type:** [article / post / email / longread]
**Strictness Level:** [🔴 Maximum / 🟡 Standard / 🔵 Basic]
**Iteration:** [1 / 2 / N]

---

#### Extracted Claims

| # | Claim | Type | Criticality | Source | Tier | Status | Sev | Comment |
|---|------------|-----|-------------|----------|------|--------|-----|-------------|
| 1 | "[quote]" | Statistics | Key | [source, year] | Tier 1 | ✅ Correct | — | |
| 2 | "[quote]" | Quote | Supporting | [source] | Tier 2 | ✅ Correct | — | Context verified |
| 3 | "[quote]" | Statistics | Key | [source, year] | Tier 3 | ❌ Incorrect | 🟡 Major | Correct: [correct number + source] |
| 4 | "[quote]" | Date | Illustrative | Not found | — | ⚠️ Unverified | 🔵 Minor | Recommendation: find source or remove |
| 5 | "[quote]" | Causation | Key | [source] | Tier 2 | ⚠️ Correlation | 🟡 Major | Rephrase: correlation, not causation |

---

#### Summary

| Status | Amount | Items |
|--------|-----------|--------|
| ✅ Verified | [N] | #[list] |
| ❌ Incorrect | [N] | #[list] |
| ⚠️ Unverified | [N] | #[list] |

| Severity | Amount | Items |
|----------|-----------|--------|
| 🔴 Critical | [N] | #[list] |
| 🟡 Major | [N] | #[list] |
| 🔵 Minor | [N] | #[list] |

---

### Verdict: [ VERIFIED / PASS / PASS WITH NOTES / FAIL ]

**Justification:** [by threshold rules]

---

#### Mandatory Edits (❌)

| # | Claim | Sev | Correct Version | Source |
|---|------------|-----|--------------------|----------|
| 3 | "[quote]" | 🟡 | [correct version] | [source, year, Tier] |
| 5 | "[quote]" | 🟡 | Rephrase: "[variant]" | [source] |

#### Recommended Actions (⚠️)

| # | Claim | Sev | Recommendation |
|---|------------|-----|-------------|
| 4 | "[quote]" | 🔵 | Find source or remove |

**→ Next step:** [→ $content-review-checklist (ref:$fact-checking) / → Copywriter with edits / → repeated fact-checking after fixes]
```
