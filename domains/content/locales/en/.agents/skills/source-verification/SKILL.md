---
name: source-verification
description: Source verification — CRAAP framework, source types, bias checking, strictness levels, credibility rating
---
# Source Verification

## When to Use
- After **`$topic-research`** — before handing data over to the Copywriter.
- In parallel with **`$fact-checking`** — at the Reviewer stage.
- Whenever there is **doubt about a source** — check any source before using it.
- For **data-driven content** — all data sources must be verified.

> **Distinction from `$fact-checking`:** Source verification checks the **source** (who, when, how reliable). Fact checking checks the **claim** (is what is written true). Source verification → input for fact checking.

## Input

| Field | Required | Description |
|-------|:--------:|-------------|
| List of sources | ✅ | URLs, names, links — what is being checked |
| Content Type | ✅ | Determines the strictness level |
| Topic | ✅ | Context: in what domain the source is used |
| Where sources are from | ⬚ | From `$topic-research` / user / SERP / competitors |

## Strictness Levels

| Level | Content Types | Minimum Rating | Features |
|-------|---------------|----------------|----------|
| 🔴 **Maximum** | Medical, finance, legal, scientific topics (YMYL) | ⭐⭐⭐⭐ and above | Only peer-reviewed, gov statistics. Conflict of interest = rejection |
| 🟡 **Standard** | Articles, case studies, analytics, email, longreads | ⭐⭐⭐ and above | Authoritative media, industry reports are acceptable |
| 🔵 **Basic** | Social media, short posts, entertaining | ⭐⭐ and above (with cross-checking) | Blogs are acceptable if the fact is confirmed by a second source |

## CRAAP Framework

Every source is checked against 5 criteria:

| Criterion | Questions to check | Red flags |
|-----------|--------------------|-----------|
| **C — Currency** | When was it published? Updated? Is the data current for our topic? | Older than 2 years for tech/business. Older than 5 years for science. Links to even older sources |
| **R — Relevance** | Is the source on our topic? Needed depth? Target audience matches? | Adjacent topic passed off as direct. Scientific paper for a pop post (overkill) or blog for a scientific topic (insufficient) |
| **A — Authority** | Who is the author? Qualifications? Publication reputation? Peer-reviewed? | Unknown author. Publication without an editorial board. Self-published without verification |
| **A — Accuracy** | Is data confirmed by other sources? Methodology described? Links to primary sources? | No methodology. No primary sources. Data contradicts other reliable sources |
| **P — Purpose** | Why was it written? To inform? Sell? Persuade? Hidden agenda? | Promotional content disguised as research. Sponsored research without disclosure |

### CRAAP Scoring

Each criterion: **1 (poor) — 3 (average) — 5 (excellent)**

| Total (out of 25) | Interpretation |
|-------------------|----------------|
| 21-25 | Excellent source — use without restrictions |
| 16-20 | Good — use, but cross-check key data |
| 11-15 | Questionable — use only with cross-confirmation from ≥ 2 other sources |
| ≤ 10 | Unreliable — do not use |

## Source Types — Specific Criteria

### Scientific Study / Peer-reviewed Journal
| What to check | How |
|---------------|-----|
| Peer review | Peer-reviewed journal (not a preprint without review) |
| Sample size | Is N sufficient for conclusions? |
| Methodology | Described, reproducible? |
| Funding | Who sponsored? Is there a disclosure? |
| Retraction | Has the paper been retracted? (check Retraction Watch) |

### News Article / Media
| What to check | How |
|---------------|-----|
| Publication | Major / independent / tabloid? |
| Author | Journalist with a track record or "editorial team"? |
| Sources | Quotes from experts? Links to the original? |
| Date | Current? Not updated with new data? |
| Bias | Political / commercial bias of the publication? |

### Corporate Report / Press Release
| What to check | How |
|---------------|-----|
| Conflict of interest | Is the company promoting its product via "research"? |
| Methodology | Is it described? Or just conclusions? |
| Sample | Only company clients = biased sample |
| Cross-checking | Do independent sources confirm this? |

### Blog / Expert Post
| What to check | How |
|---------------|-----|
| Author | Real expert with verifiable qualifications? |
| Sources | Cites primary data or "in my experience"? |
| Bias | Affiliate? Promoting a product? |
| Cross-checking | Mandatory — a blog is not a self-sufficient source |

### Social Media / Reddit / Quora
| What to check | How |
|---------------|-----|
| Author | Verified account? Real expert? |
| Evidence | Are there links, screenshots, data? |
| Consensus | Opinion of one person or confirmed by others? |
| **Rule** | Do not use as a sole source. Only as an illustration + cross-confirmation |

## Bias Checking

| Bias Type | How to detect | Example |
|-----------|---------------|---------|
| **Commercial** | Source sells a product related to the conclusions | "Our study showed our product is the best" |
| **Sponsored** | Study paid for by an interested party | Pharma company sponsors study of its own drug |
| **Selection bias** | Sample is not representative | Survey only among clients = biased results |
| **Confirmation bias** | Data cherry-picked to fit the conclusion | Showing only confirming facts |
| **Survivorship bias** | Only successful cases considered | "All successful startups do X" (failed ones did too) |
| **Ideological** | Publication has a political stance | Politically biased media on business regulation |

> If bias is detected — **do not automatically reject**, but lower the rating + note the bias + require cross-confirmation.

## Rating Scale (Extended)

| Rating | Source Type | Examples | Acceptability |
|--------|-------------|----------|---------------|
| ⭐⭐⭐⭐⭐ | Primary / academic | Peer-reviewed journals (Nature, Lancet, JAMA), gov statistics (BLS, Eurostat), SEC filings, patents | All strictness levels |
| ⭐⭐⭐⭐ | Authoritative secondary | Major editorial media (Reuters, Bloomberg, BBC), reports from analytical companies (McKinsey, Gartner, Statista), official major company blogs | All strictness levels |
| ⭐⭐⭐ | Reliable secondary | Industry media (TechCrunch, The Verge), expert books, corporate reports with methodology, major editorial blogs | 🟡 Standard and below |
| ⭐⭐ | User-generated content | Personal expert blogs, podcasts, professional YouTube channels, Reddit (verified), Quora (with credentials) | 🔵 Basic (with cross-checking) |
| ⭐ | Unreliable | Anonymous sources, content farms, affiliate sites, tabloids, unverifiable data | ❌ Do not use |

### Edge Cases

| Situation | Decision |
|-----------|----------|
| Corporate report (McKinsey) vs corporate blog (NoName SaaS) | McKinsey = ⭐⭐⭐⭐ (methodology, reputation). NoName SaaS = ⭐⭐⭐ (possible bias) |
| Wikipedia | ⭐⭐ — NOT a standalone source. Use Wikipedia links → find and verify primary sources |
| Preprint (not peer-reviewed) | ⭐⭐⭐ — lower by 1 star from the journal. Note "preprint, not peer-reviewed" |
| Survey with small sample (N < 100) | Lower by 1 star. Note "small sample: N = [number]" |

## Protocol

### Step 1 — Preparation
1. Receive list of sources and content type.
2. Determine strictness level (🔴 / 🟡 / 🔵).
3. Determine the minimum acceptable rating.

### Step 2 — CRAAP Assessment
For each source:
1. Go through **5 CRAAP criteria** (Currency, Relevance, Authority, Accuracy, Purpose).
2. Score each 1-5 points.
3. Calculate total (out of 25).

### Step 3 — Source Type
1. Classify: scientific / media / corporate / blog / social.
2. Apply **specific criteria** for the type.
3. For scientific: check retraction, methodology, funding.
4. For corporate: check conflict of interest.

### Step 4 — Bias Check
1. Check for 6 types of bias.
2. If bias is found — lower rating + flag it + require cross-confirmation.

### Step 5 — Rating and Decision
1. Assign **rating** (⭐ — ⭐⭐⭐⭐⭐).
2. Compare with the minimum acceptable for the strictness level.
3. Decision: ✅ Accepted / ⚠️ Conditional (requires cross-check) / ❌ Rejected.

### Step 6 — Primary Sources
1. For each secondary source — **find the primary source**.
2. If the primary source is unavailable — flag it and lower the rating.

## Validation (Quality Gate)

Verification is considered complete if:

- [ ] All sources from the list are checked (none skipped)
- [ ] CRAAP score conducted for every source
- [ ] Type of every source is determined, specific criteria applied
- [ ] Bias check performed
- [ ] Rating assigned and matches the strictness level
- [ ] Primary sources found for secondary ones (or marked "not found")
- [ ] Rejected sources have justification + replacement recommendation
- [ ] All accepted sources ≥ minimum rating for the strictness level

## Handoff

| Result | Route |
|--------|-------|
| All sources verified | → Copywriter (with ratings) + `$fact-checking` (to verify facts from the sources) |
| Some rejected, replacement found | → Researcher (to replace) → repeat verification of replacements |
| Some rejected, replacement not found | → Researcher (find alternatives) or → user (decision: remove the fact or find a source) |

When handing off — use `$handoff` with the full report attached.

## Integration with other skills

| Skill | Interaction |
|-------|-------------|
| `$topic-research` | **Source:** list of sources for verification |
| `$fact-checking` | **Consumer:** verified sources → input for fact checking |
| `$data-storytelling` | **Source:** data from verified sources |
| `$content-review-checklist` | **Consumer:** item #19 (sources cited) |
| `$content-release-gate` | **Consumer:** verification mandatory for Release Gate |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|---------|--------------|--------------------|
| Wikipedia as a source | Wikipedia = ⭐⭐, may contain errors | Use links from Wikipedia → find primary source |
| "According to studies" without link | Unverifiable, no trust | Specific source: who, when, methodology |
| One authoritative source = enough | Even Nature has retractions | Cross-check for key data |
| Corporate report = objective | Conflict of interest | Check bias, find independent confirmation |
| Retelling instead of primary source | Data distortion through summary chain | Always look for the primary source |
| All sources given same rating | No differentiation | CRAAP scoring for each, rating ⭐-⭐⭐⭐⭐⭐ |
| Rejecting for any bias | Bias ≠ falsehood, sometimes biased source has true data | Lower rating + cross-check, don't auto-reject |
| Old data without verification | World has changed | Currency: ≤ 2 years (tech), ≤ 5 years (science) |

## Output Template

```markdown
### Source Verification — [Topic]

**Content Type:** [article / post / email]
**Strictness Level:** [🔴 Maximum / 🟡 Standard / 🔵 Basic]
**Minimum Acceptable Rating:** [⭐⭐⭐⭐ / ⭐⭐⭐ / ⭐⭐]
**Total Sources:** [N]

---

#### Verification Results

| # | Source | Type | Author | Date | CRAAP Score | Rating | Bias | Status | Comment |
|---|--------|------|--------|------|-------------|--------|------|--------|---------|
| 1 | [name + URL] | Peer-reviewed | [author] | [date] | [N]/25 | ⭐⭐⭐⭐⭐ | None | ✅ Accepted | — |
| 2 | [name + URL] | Media | [author] | [date] | [N]/25 | ⭐⭐⭐⭐ | None | ✅ Accepted | Cross-confirmed |
| 3 | [name + URL] | Corporate | [company] | [date] | [N]/25 | ⭐⭐⭐ | 🟡 Commercial | ⚠️ Conditional | Cross-check required |
| 4 | [name + URL] | Blog | [author] | [date] | [N]/25 | ⭐⭐ | None | ❌ Rejected | Below min rating for 🟡 |

---

#### CRAAP Details (for ⚠️ and ❌)

| # | Source | C (1-5) | R (1-5) | A (1-5) | A (1-5) | P (1-5) | Total | Weak Point |
|---|--------|---------|---------|---------|---------|---------|-------|------------|
| 3 | [name] | [N] | [N] | [N] | [N] | [N] | [N]/25 | Purpose: commercial bias |
| 4 | [name] | [N] | [N] | [N] | [N] | [N] | [N]/25 | Authority: unknown author |

---

#### Bias Report (if detected)

| # | Source | Bias Type | Description | Impact on Rating |
|---|--------|-----------|-------------|------------------|
| 3 | [name] | Commercial | [company promotes its product] | ⭐⭐⭐⭐ → ⭐⭐⭐ |

---

#### Summary

| Status | Amount | Sources |
|--------|--------|---------|
| ✅ Accepted | [N] | #[list] |
| ⚠️ Conditional | [N] | #[list] — require cross-check |
| ❌ Rejected | [N] | #[list] |

**Require Replacement:**
| # | Rejected | Reason | Replacement Recommendation |
|---|----------|--------|----------------------------|
| 4 | [name] | [below min rating] | Find: [source type] on [topic] |

**Primary Sources:**
| # | Secondary Source | Primary Source Found? | Primary Source URL |
|---|------------------|-----------------------|--------------------|
| 2 | [name] | ✅ | [URL] |
| 3 | [name] | ❌ Not found | — (rating lowered) |

**→ Next Step:** → Copywriter (with ratings) + `$fact-checking` (check facts from accepted sources)
```
