---
name: seo-copywriting
description: SEO copywriting — SERP analysis, E-E-A-T, Featured Snippets, internal linking, schema markup, image optimization
---
# SEO Copywriting

## When to Use
- When creating **content for a blog, website, landing page** — any indexable material.
- When **optimizing existing content** — the article is not ranking, needs a revamp.
- When **updating content** — the article is outdated, lost its positions.
- As part of **`$content-brief`** — the SEO block for text formats.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Primary Keyword | ✅ | From keyword research or the user |
| Search Volume | ✅ | Search volume/month — determines if it's worth writing about |
| Keyword Difficulty | ⬚ | Difficulty (0-100). Affects ranking chances |
| Search Intent | ✅ | Informational / Commercial / Transactional / Navigational |
| Target Audience Persona | ✅ | From `$audience-analysis` — who we are writing for |
| Current Content (if optimization) | ⬚ | URL, current position, current traffic |
| SERP Competitors | ⬚ | Top 3-5 URLs from search results (if not provided — agent analyzes) |

> If the keyword is not provided — **ask for it** or direct to keyword research. SEO without a keyword = text into the void.

## SERP Analysis (mandatory step)

Before writing — analyze the **top 3-5 results** for the target query:

| Parameter | What to Look For | Why |
|----------|-------------|-------|
| **Volume** | Average volume of top 5 (words) | Benchmark for our text (± 20%) |
| **Structure** | H2/H3 headings, sections | What topics they cover |
| **Format** | Listicle / how-to / guide / comparison | What format Google prefers |
| **Featured Snippet** | Is there a snippet? What type? | Opportunity to "hijack" it |
| **People Also Ask** | Questions in PAA | Additional H2/FAQs to cover |
| **Gaps** | What is NOT covered in top 5 | Our competitive advantage |
| **E-E-A-T Signals** | Author, date, sources, experience | What competitors do for trust |

> **Rule:** Our content must be **better** than the top 3, not a copy. Better = more comprehensive, fresher, unique angle, better structured.

## E-E-A-T — Experience, Expertise, Authoritativeness, Trustworthiness

Google evaluates content by E-E-A-T. How to integrate into text:

| Signal | How to Implement | Example |
|--------|----------------|--------|
| **Experience** | Show personal experience, cases, first-hand data | "We tested 15 tools over 3 months — here are the results" |
| **Expertise** | Author with qualifications, depth of topic coverage | Author's bio, job title, links to profiles |
| **Authoritativeness**| Links to authoritative sources, expert quotes | Links to studies, Tier 1-2 sources |
| **Trustworthiness**| Publication/update date, transparency, sources | "Updated: [date]", links to original sources |

### YMYL (Your Money Your Life)
For health, finance, and legal topics — E-E-A-T is **critically important**:
- The author must be a qualified professional.
- All claims must have sources.
- A disclaimer is mandatory.

## Search Intent — Content Structure

| Intent | What the user is looking for | Optimal Format | CTA |
|--------|----------------------|-------------------|-----|
| **Informational** | Learn, understand | How-to, guide, listicle, explainer | Subscribe, download, read to end |
| **Commercial** | Compare, choose | Comparison, review, "best X" | Demo, trial, consultation |
| **Transactional** | Buy, order | Landing page, product page, pricing | Purchase, checkout, request |
| **Navigational** | Find a specific page | About, pricing, login | Direct transition |

> Intent dictates the format. Writing a how-to guide for a transactional query misses the mark.

## Featured Snippets — Optimization

| Snippet Type | How to Get In | Format in Text |
|-------------|------------|-----------------|
| **Paragraph** | Clear answer in 40-60 words immediately after an H2 question | `## What is X?\n[Answer 40-60 words]` |
| **List** | Numbered or bulleted list | `## How to do X?\n1. Step 1\n2. Step 2` |
| **Table** | Structured data in a table | HTML `<table>` or Markdown table |
| **Video** | YouTube video with timestamps | Embed video + add text transcript |

### People Also Ask (PAA)
- Collect 5-10 questions from PAA.
- Each question → a separate H2 or FAQ section.
- The answer — directly below the heading, 40-60 words (paragraph snippet format).

## On-Page SEO Checklist

### Meta Data

| Element | Requirement | Example |
|---------|-----------|--------|
| **Title tag** | ≤ 60 characters. Keyword at the beginning. Brand at the end (optional) | "SEO Copywriting: Full Guide 2026 — [Brand]" |
| **Meta Description**| 120-155 characters. Keyword + CTA + value | "Learn how to write SEO texts that rank in the top 3. Step-by-step guide + checklist." |
| **URL slug** | Short, with keyword, separated by hyphens | `/seo-copywriting-guide` |
| **H1** | One per page. Contains keyword. ≠ Title (can be longer) | "SEO Copywriting: Step-by-Step Guide to Creating Texts That Rank" |

### Keywords

| Element | Recommendation |
|---------|-------------|
| **Primary KW** | In Title, H1, first 100 words, 1-2 × in H2, conclusion |
| **LSI Words** (3-7)| Evenly throughout text, in H2/H3 headings |
| **KW Density** | 1-2% for primary. Do not force — naturalness is more important |
| **Synonym variations**| Use synonyms — Google understands semantics |

### Content Structure

| Element | Requirement |
|---------|-----------|
| **H2** | Every 200-300 words. Informative, contain LSI words |
| **H3** | Subsections within H2. Do not skip levels (no H1 → H3) |
| **Paragraphs** | ≤ 150 words, 3-4 sentences |
| **Lists** | For enumerations — numbered or bulleted |
| **Table of Contents** | For articles > 1500 words — TOC with anchor links |

## Internal Linking — Strategy

| Rule | Description |
|---------|----------|
| **Quantity** | 3-5 internal links per 1000 words |
| **Anchor text**| Descriptive, with target page keywords. Not "click here" |
| **Relevance** | Link must be useful to the reader, not just for SEO |
| **Hub-and-spoke**| Pillar page (main) → cluster pages (subtopics) → interlinked |
| **Updating old** | When publishing new content — add links to it from old articles |

## Image Optimization

| Element | Requirement |
|---------|-----------|
| **Alt text** | Descriptive, with keyword (if natural). ≤ 125 characters |
| **File name** | `seo-copywriting-checklist.jpg`, not `IMG_2847.jpg` |
| **Format** | WebP (best compression) or JPG. PNG for charts/infographics |
| **Size** | ≤ 200 KB for photos, ≤ 500 KB for infographics |
| **Lazy loading** | `loading="lazy"` for images below the fold |
| **Responsive** | `srcset` for different resolutions |

## Schema Markup — Structured Data

| Type | When to Use | Result in SERP |
|-----|-------------------|-----------------|
| **Article** | Blog posts, articles | Date, author, thumbnail |
| **FAQ** | Q&A pages | Expandable questions below the result |
| **HowTo** | Step-by-step instructions | Steps with images |
| **Breadcrumb**| All pages | Navigation instead of URL |
| **Product** | Product pages | Price, rating, availability |
| **Review** | Reviews | Star ratings |

> Schema does not directly affect ranking, but **increases CTR** in SERP by 20-30%.

## Content Volume by Intent

| Intent | Recommended Volume | Justification |
|--------|--------------------|----|
| **Informational (how-to)** | 1500-3000 words | Deep topic coverage |
| **Informational (listicle)** | 1000-2500 words | Depends on the number of items |
| **Commercial (comparison)** | 2000-4000 words | Detailed comparison |
| **Transactional (landing)** | 500-1500 words | Focus on conversion, not length |

> Benchmark: average volume of top 5 ± 20%. Do not bloat for length — quality > quantity.

## Protocol

### Step 1 — Keyword and Intent
1. Record primary keyword, search volume, KD.
2. Determine search intent.
3. Select 3-7 LSI words and synonyms.

### Step 2 — SERP Analysis
1. Analyze **top 5 results** across 7 parameters.
2. Determine the format Google prefers.
3. Collect PAA questions.
4. Find gaps — what is not covered by competitors.

### Step 3 — Structure
1. Write an **outline**: H1 → H2 → H3.
2. Include PAA questions as H2/FAQs.
3. Determine volume (via SERP analysis + intent).
4. Plan Featured Snippet blocks.

### Step 4 — Meta Data
1. Title tag (≤ 60, KW at beginning).
2. Meta Description (120-155, KW + CTA).
3. URL slug (short, with KW).
4. H1 (KW, ≠ Title).

### Step 5 — Writing the Text
1. Primary KW in the first 100 words.
2. LSI words in H2/H3 and throughout text.
3. Density 1-2%, naturally.
4. E-E-A-T signals: experience, sources, date, author.
5. Featured Snippet blocks in paragraph/list/table format.

### Step 6 — Internal Linking
1. 3-5 internal links per 1000 words.
2. Descriptive anchor text.
3. Hub-and-spoke: connection with pillar page.

### Step 7 — Image Optimization
1. Alt text with KW.
2. Descriptive file names.
3. WebP format, ≤ 200 KB.
4. Lazy loading for below the fold.

### Step 8 — Schema Markup
1. Determine appropriate type (Article, FAQ, HowTo).
2. Prepare JSON-LD or recommendations for developer.

### Step 9 — Technical Checklist
1. Mobile-friendly (responsive).
2. Page speed (Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1).
3. HTTPS.
4. Canonical URL.

## Validation (Quality Gate)

SEO optimization is considered complete if:

- [ ] Primary KW and LSI defined, intent recorded
- [ ] SERP analysis conducted (top 5 competitors)
- [ ] Title ≤ 60 chars, KW at the beginning
- [ ] Meta Description 120-155 chars, with CTA
- [ ] H1 contains KW, one per page
- [ ] KW in the first 100 words
- [ ] KW density 1-2%
- [ ] H2 every 200-300 words, contain LSI
- [ ] Internal links: 3-5 per 1000 words, descriptive anchor
- [ ] Alt text for all images
- [ ] E-E-A-T signals present (author, date, sources)
- [ ] Featured Snippet optimization (if there is a snippet in SERP)
- [ ] Schema markup defined
- [ ] Volume matches SERP analysis (± 20% of top 5 average)

## Handoff

| Consumer | How it's Used |
|-------------|---------------|
| `$content-brief` | SEO block as part of the brief (keywords, meta, structure) |
| Copywriter (agent)| Writes text according to SEO structure |
| `$headline-formulas` | Title tag and H1 from headline formulas |
| `$content-review-checklist` | Reviewer checks SEO against points #26-29 |
| `$content-release-gate` | SEO checklist as part of final check |
| Developer | Schema markup, technical parameters |

## Integration with Other Skills

| Skill | Interaction |
|------|----------------|
| `$content-brief` | **Consumer:** SEO block in the brief |
| `$headline-formulas` | **Source:** formulas for Title and H1 |
| `$audience-analysis` | **Source:** persona → tone and difficulty level |
| `$data-storytelling` | **Source:** data for E-E-A-T (unique studies) |
| `$fact-checking` | **Complement:** data verification for E-E-A-T trustworthiness |
| `$readability-scoring` | **Complement:** readability affects dwell time → ranking |
| `$topic-research` | **Source:** LSI words, PAA questions, gaps |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Keyword stuffing | Google penalizes for spamming | Density 1-2%, natural usage |
| Writing for Google, not people | Low dwell time → loss of rankings | Value for reader first, SEO second |
| Ignoring intent | How-to guide for a transactional query — won't rank | Content format = format Google shows |
| Copying competitor's structure | No uniqueness, Google won't show duplicate | Cover the same + add unique angle/data |
| Thin content (< 500 words) | Not deep enough to rank | Volume according to SERP analysis |
| No internal links | Page is isolated, bot doesn't find it | 3-5 links per 1000 words |
| Alt text = "image1" | Lost SEO opportunity + bad for accessibility | Descriptive alt with KW |
| No date/author | Low E-E-A-T, Google doesn't trust | Author with bio + publish/update date |
| Old content without updates | Loses rankings over time | Update every 6-12 months |

## Output Template

```markdown
### SEO Optimization — [Topic]

**Primary Keyword:** [KW]
**Search Volume:** [N/mo]
**Keyword Difficulty:** [0-100]
**Search Intent:** [Informational / Commercial / Transactional / Navigational]
**LSI Words:** [list of 3-7 words]

---

#### SERP Analysis

| # | URL | Volume (words) | Format | What's Good | Gaps |
|---|-----|-------------|--------|-----------|------|
| 1 | [url] | [N] | [listicle/guide/...] | [strengths] | [what's not covered] |
| 2 | [url] | [N] | [format] | [strengths] | [gaps] |
| 3 | [url] | [N] | [format] | [strengths] | [gaps] |

**Top 5 Average Volume:** [N] words
**Featured Snippet:** [yes — paragraph/list/table / no]
**PAA Questions:** [list of 5-10 questions]

**Our Advantage:** [unique angle / data / completeness]

---

#### Meta Data

| Element | Value | Chars |
|---------|----------|----------|
| **Title** | [SEO Title] | [≤ 60] |
| **Meta Description** | [description with CTA] | [120-155] |
| **URL slug** | /[slug] | — |
| **H1** | [heading with KW] | — |

---

#### Content Structure

` ` `
H1: [Headline]
  H2: [Subsection 1 — LSI] 
    H3: [Sub-point]
    H3: [Sub-point]
  H2: [Subsection 2 — LSI]
  H2: [PAA question 1]
  H2: [Subsection 3]
  H2: [FAQ / PAA questions]
` ` `

**Recommended Volume:** [N words] (top 5 average: [N] ± 20%)
**Format:** [listicle / guide / comparison / how-to]

---

#### Keyword Placement

| Position | What to Place |
|---------|---------------|
| First 100 words | Primary KW |
| H2 headings | LSI words (2-3 of 5-7) |
| Body text | Primary KW × 2-3, LSI evenly |
| Conclusion | Primary KW |
| Alt texts | Primary KW + LSI |

**Primary KW Density:** [N]% (target: 1-2%)

---

#### E-E-A-T

| Signal | Implementation |
|--------|-----------|
| Experience | [case / firsthand data / testing] |
| Expertise | [author: name, title, bio] |
| Authoritativeness | [links to Tier 1-2 sources] |
| Trustworthiness | [publish date, data transparency] |

---

#### Featured Snippet (if applicable)

| Type | Position in text | Format |
|-----|------------------|--------|
| [paragraph/list/table] | [after H2: "[question]"] | [answer 40-60 words / numbered list / table] |

---

#### Internal Linking

| Anchor text | Target page | Position in text |
|-------------|-----------------|-----------------|
| [descriptive anchor] | [URL] | [in which section] |
| [anchor] | [URL] | [section] |

---

#### Image Optimization

| Image | Alt text | File name | Format | Size |
|-------------|----------|-----------|--------|--------|
| [description] | [alt with KW] | [name-with-hyphens.webp] | WebP | [≤ 200KB] |

---

#### Schema Markup

**Type:** [Article / FAQ / HowTo / Review]
**Implementation:** [JSON-LD recommendation or ready code]

---

#### Technical Checklist

| Parameter | Status |
|----------|--------|
| Mobile-friendly | ✅/❌ |
| HTTPS | ✅/❌ |
| Canonical URL | ✅/❌ |
| Core Web Vitals (LCP < 2.5s) | ✅/❌ |

**→ Next step:** forward to `$content-brief` (SEO block) / Copywriter / `$content-review-checklist`
```
