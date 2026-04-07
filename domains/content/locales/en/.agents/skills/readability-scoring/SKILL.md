---
name: readability-scoring
description: Readability Scoring — adaptive norms per platform, readability indices, scanability, "fluff", suggested fixes
---
# Readability Scoring

## When to Use
- During the **Reviewer** phase — evaluating readability before approval.
- During the **Copywriter** phase (self-check) — before handing off for review.
- When **optimizing existing content** — content isn't engaging, completion rate is low.
- For **long-form formats** (longread, article, email) — especially critical.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Text to evaluate | ✅ | Final content text |
| Platform | ✅ | Determines readability norms (social media ≠ blog ≠ email) |
| Content Type | ✅ | Post / carousel / article / email / landing / video script |
| Target Audience Persona | ✅ | From `$audience-analysis` — expertise level determines acceptable complexity |
| Language | ⬚ | Russian / English — different formulas and norms |

> If persona is not provided — **request it**. Text for a CEO and for a student have different levels of acceptable complexity.

## Adaptive Norms by Platform

| Parameter | Social Media (Insta, TikTok, Twitter) | Telegram / LinkedIn | Email | Blog / Article | Landing Page |
|----------|--------------------------------------|--------------------|----|---------------|---------|
| **Avg. sentence length** | 8-15 words | 12-20 words | 12-18 words | 15-22 words | 10-15 words |
| **Max sentences per paragraph** | 2-3 | 3-4 | 3-4 | 4-5 | 2-3 |
| **Max sentence length** | 25 words | 30 words | 30 words | 35 words | 20 words |
| **Subheadings** | Not required (short form) | Desirable | Yes (every 2-3 paragraphs) | Mandatory (every 200-300 words) | Mandatory |
| **Bullets / lists** | Optional | Recommended | Recommended | Mandatory for enumerations | Mandatory |
| **Active voice** | > 90% | > 80% | > 85% | > 75% | > 90% |
| **Acceptable jargon** | Minimum (0-1 term) | Moderate (for B2B) | Minimum | Moderate (with explanations) | Minimum |

## Adaptation by Audience Level

| Audience Level | Acceptable Complexity | Notes |
|-------------|---------------------|------------|
| **Beginners** | Simple language, no jargon, short sentences | Explain every term |
| **Intermediate** | Moderate complexity, basic industry jargon | Complex terms — 1 explanation on first mention |
| **Experts** | High, professional jargon acceptable | Do not oversimplify — it insults their expertise |

## Readability Metrics

### Core Metrics (calculate for every text)

| Metric | How to Calculate | What it Shows |
|---------|------------|----------------|
| **Average sentence length** | Total words / total sentences | Overall text complexity |
| **Max sentence length** | Longest sentence (words) | "Bottlenecks" — where the reader gets lost |
| **Average paragraph length** | Sentences in paragraphs (average) | Visual density |
| **Active voice ratio** | Sentences with active voice / total × 100% | Text energy |
| **"Fluff" ratio** | Stop words and empty phrases / total words × 100% | Information density |
| **Scanability score** | Checklist of 6 points (see below) | Can the text be "scanned" in 10 seconds |

### Readability Indices

#### For Russian Language

| Index | Formula (Simplified) | Interpretation |
|--------|---------------------|---------------|
| **Flesch Index (adapted)** | 206.835 − 1.3 × (words/sentences) − 60.1 × (syllables/words) | 60-70: normal text. < 30: complex. > 80: very simple |
| **Average word length** | Total characters / total words | > 7 chars: complex text. < 5: simple |

> For Russian, Flesch-Kincaid formulas give an approximate estimate. The main guideline is **average sentence length + average word length**.

#### For English Language

| Index | Formula | Target Value |
|--------|---------|-----------------|
| **Flesch Reading Ease** | 206.835 − 1.015 × ASL − 84.6 × ASW | 60-70 (standard), 70-80 (easy) |
| **Flesch-Kincaid Grade** | 0.39 × ASL + 11.8 × ASW − 15.59 | 7-9 (Grade level, for wide audience) |
| **Gunning Fog** | 0.4 × (ASL + % complex words) | < 12 for wide audience |

> ASL = Average Sentence Length. ASW = Average Syllables per Word.

## Scanability — "Scannability" Check

Most readers **scan** rather than read. Verify:

| # | Criterion | Description | Status |
|---|----------|----------|--------|
| 1 | **F-pattern** | First words of each paragraph carry meaning (not "However", "In addition") | ✅/❌ |
| 2 | **Subheadings** | Every 200-300 words (for longreads) — informative, not decorative | ✅/❌ |
| 3 | **Bullets** | Enumerations are formatted as lists, not a "wall of text" | ✅/❌ |
| 4 | **Highlighting key points** | Bold / italic for key thoughts (no more than 10% of text) | ✅/❌ |
| 5 | **Visual breathing room** | Short paragraphs, empty lines between sections | ✅/❌ |
| 6 | **Hook → Main → CTA** | Text follows pattern: capture → value → action | ✅/❌ |

**Scanability score:** [N/6] — ≥ 5 = good, 3-4 = needs work, ≤ 2 = restructure.

## "Fluff" Check (Wordiness)

### What is Considered "Fluff"

| Category | Examples | What to do |
|-----------|---------|-----------|
| **Bureaucratese/Legalese** | "implement", "currently", "is considered to be", "given" | Replace with simple words: "do", "now", "is", "this" |
| **Filler introductory phrases** | "As is well known", "It's worth noting that", "It is no secret that" | Delete — they add nothing |
| **Empty intensifiers** | "Very", "really", "absolutely", "maximally" | Delete or replace with specifics |
| **Tautology** | "Absolute best", "advance preview", "unfilled vacancy" | Remove duplication |
| **Verbal nouns** | "Implementation of the optimization process" | → "To optimize" |
| **Adjective chains** | "Innovative, unique, high-quality product" | Leave 1 specific one |

### "Fluff" Norms

| Platform | Acceptable "Fluff" |
|-----------|------------------|
| Social Media | ≤ 5% |
| Email / Telegram | ≤ 10% |
| Blog / article | ≤ 15% |
| Academic text | ≤ 20% |

## Scoring and Threshold

### Scoring Scale

| Score | Meaning | Condition |
|--------|----------|---------|
| **A — Excellent** | Text is light, clear, engaging | All metrics ✅, scanability ≥ 5/6, "fluff" within norm |
| **B — Good** | Text is readable, minor remarks | 1-2 metrics ⚠️, scanability ≥ 4/6 |
| **C — Satisfactory** | Text is heavy, needs work | 3+ metrics ⚠️ or 1 ❌, scanability 3/6 |
| **D — Poor** | Text is difficult to read | 2+ metrics ❌, scanability ≤ 2/6 |

### Decision Threshold

| Decision | Condition |
|---------|---------|
| **PASS** | Score A or B |
| **NEEDS IMPROVEMENT** | Score C or D |

## Protocol

### Step 1 — Preparation
1. Receive text, platform, content type, persona.
2. Select **adaptive norms** based on platform and audience.

### Step 2 — Metrics
1. Calculate **all core metrics** (avg/max sentence length, paragraphs, active voice).
2. Calculate **readability index** (Flesch or avg word length).
3. Compare with norms — mark ✅ / ⚠️ / ❌.

### Step 3 — Scanability
1. Go through **6-point checklist**.
2. Calculate scanability score.

### Step 4 — "Fluff"
1. Identify **bureaucratese, fillers, empty words, tautologies**.
2. Calculate **% "fluff"**.
3. Compare with platform norm.

### Step 5 — Problem Areas
For each problem:
1. **Quote** — specific sentence/paragraph.
2. **Problem** — what's wrong (too long / passive / jargon / fluff).
3. **Suggested fix** — specific rewritten version.

### Step 6 — Scoring and Decision
1. Determine score (A/B/C/D).
2. Apply threshold (PASS / NEEDS IMPROVEMENT).
3. If NEEDS IMPROVEMENT — prioritize fixes.

## Validation (Quality Gate)

Readability scoring is considered complete if:

- [ ] All core metrics calculated and compared against adaptive norms
- [ ] Readability index calculated
- [ ] Scanability checklist passed (6/6 points)
- [ ] "Fluff" checked and calculated in %
- [ ] Problem areas identified with specific quotes
- [ ] For every problem — a suggested fix (rewritten version) provided
- [ ] Score (A-D) and decision (PASS/NEEDS IMPROVEMENT) align with rules

## Handoff

| Decision | Route |
|---------|---------|
| **PASS** | → `$content-review-checklist` (item #9 — link to result) → `$content-release-gate` |
| **NEEDS IMPROVEMENT** | → Copywriter with specific suggested fixes → re-evaluation |

## Integration with Other Skills

| Skill | Interaction |
|------|----------------|
| `$content-review-checklist` | **Consumer:** item #9 (readability) links to this result |
| `$content-brief` | **Source:** platform, persona → determine norms |
| `$audience-analysis` | **Source:** target audience expertise level → acceptable complexity |
| `$tone-of-voice` | **Complement:** tone = how we speak, readability = how clear it is |
| `$content-release-gate` | **Consumer:** PASS required for Release Gate |

## Anti-patterns

| Mistake | Why it's Bad | How to do it Right |
|--------|-------------|---------------|
| Same norms for all platforms | Instagram post ≠ blog longread | Adaptive norms per platform |
| "Text is complex" without specifics | Copywriter doesn't know what to fix | Specific quotes + suggested fix |
| Oversimplification to point of banality | Experts feel talked down to | Adapt to target audience level |
| Only sentence length | Short sentences ≠ readable text (can be choppy, dry) | Balance: metrics + scanability + clarity + style |
| Ignoring "fluff" | Text is formally readable, but empty | Check % fluff, remove bureaucratese |
| No scanability check | Text is a "wall" — no one will finish reading | F-pattern, subheadings, bullets, highlights |
| Single pass without iteration | The first fix might create new problems | After edits — re-evaluate |

## Output Template

```
### Readability Scoring — [Content Title]

**Platform:** [platform]
**Type:** [post / article / email / landing]
**Persona:** [from $audience-analysis]
**Audience Level:** [Beginner / Intermediate / Expert]
**Language:** [Russian / English]
**Norms:** [adapted for platform + target audience]

---

#### 1. Core Metrics

| Parameter | Value | Norm | Status |
|----------|----------|-------|--------|
| Avg sentence length | [N] words | [N-N] | ✅/⚠️/❌ |
| Max sentence length | [N] words | ≤ [N] | ✅/⚠️/❌ |
| Avg paragraph length | [N] sentences | [N-N] | ✅/⚠️/❌ |
| Active voice ratio | [N]% | > [N]% | ✅/⚠️/❌ |
| "Fluff" | [N]% | ≤ [N]% | ✅/⚠️/❌ |

#### 2. Readability Index

| Index | Value | Interpretation |
|--------|----------|---------------|
| Avg word length | [N] characters | [simple / average / complex] |
| Flesch (adapted) | [N] | [normal / complex / simple] |

#### 3. Scanability

| # | Criterion | Status |
|---|----------|--------|
| 1 | F-pattern (first words of paragraphs are informative) | ✅/❌ |
| 2 | Subheadings (every 200-300 words) | ✅/❌/N/A |
| 3 | Bullets (enumerations formatted as lists) | ✅/❌ |
| 4 | Highlighting key points (bold/italic ≤ 10%) | ✅/❌ |
| 5 | Visual breathing room (short paragraphs) | ✅/❌ |
| 6 | Hook → Main → CTA (structure) | ✅/❌ |

**Scanability score:** [N]/6

---

#### 4. Problem Areas

| # | Quote | Problem | Sev | Suggested Fix |
|---|--------|----------|-----|---------------|
| 1 | "[long sentence from text]" | Length: [N] words (norm ≤ [N]) | ⚠️ | "[rewritten version]" |
| 2 | "[sentence with passive voice]" | Passive voice | ⚠️ | "[active version]" |
| 3 | "[bureaucratese]" | Fluff: bureaucratese | 🔵 | "[simple replacement]" |
| 4 | "[jargon term]" | Jargon: target audience won't understand | ⚠️ | "[explanation or replacement]" |

#### 5. "Fluff" (top findings)

| Word / Phrase | Category | Occurrences | Replacement |
|---------------------|-----------|------------|--------|
| ["implement"] | Bureaucratese | [N] | ["do"] |
| ["It is worth noting that"] | Filler | [N] | [delete] |
| ["very"] | Empty intensifier | [N] | [delete / specify] |

---

### Score: [A / B / C / D] — [Excellent / Good / Satisfactory / Poor]

### Decision: [ PASS / NEEDS IMPROVEMENT ]

**Justification:** [based on rules: A/B = PASS, C/D = NEEDS IMPROVEMENT]

**Fix Priority (if NEEDS IMPROVEMENT):**
1. [Most critical — what to fix first]
2. [Second most important]
3. [Third]

**→ Next step:** [→ $content-review-checklist (ref) / → Copywriter with suggested fixes]
```
