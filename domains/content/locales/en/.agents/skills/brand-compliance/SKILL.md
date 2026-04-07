---
name: brand-compliance
description: Verification of content compliance with the brand — ToV, visual identity, messaging, legal — with severity levels and fix recommendations
---
# Brand Compliance

## When to use
- Upon **content review** prior to publication (Reviewer gate).
- Upon **visuals check** — banners, creatives, stories, video covers.
- Within **audit** of existing content for compliance with updated guidelines.
- During **onboarding of a new copywriter / designer** — calibration of initial materials.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Content for review | ✅ | Text, visual, or full post — what is being checked |
| Brand guidelines | ✅ | Result of `$brand-guidelines` or brand guidelines file/URL |
| ToV document | ✅ | Result of `$tone-of-voice` or description of the brand's tone |
| Platform | ✅ | Where it will be published (affects format specifications) |
| Content type | ⬚ | Post / article / email / banner / video / stories |
| Previous remarks | ⬚ | If this is a re-check — the list of prior violations |

> If brand guidelines or ToV are not provided — **request them from the user**. Verification is impossible without a benchmark.

## Severity Levels

| Level | Icon | Definition | Examples |
|---------|--------|-------------|---------|
| **Critical** | 🔴 | Publishing impossible. Legal risk, gross brand distortion, forbidden content. | Incorrect logo, legal disclaimer missing, offensive phrasing, copyright infringement |
| **Major** | 🟡 | Publishing undesirable. Noticeable deviation from the brand, requires fixing. | Incorrect ToV, use of forbidden words, colors outside the palette, messaging mismatching positioning |
| **Minor** | 🔵 | Publishing possible, but fixing is recommended. Cosmetic deviations. | Slightly different color shade, photo style differs slightly, minor stylistic discrepancies |

### Passing Threshold

| Result | Condition |
|-----------|---------|
| **COMPLIANT** | 0 Critical + 0 Major |
| **CONDITIONALLY COMPLIANT** | 0 Critical + 1-2 Major (publishing after fixing Major) |
| **NON-COMPLIANT** | ≥ 1 Critical OR ≥ 3 Major |

## Protocol

### Step 0 — Preparation
1. Retrieve all mandatory input data.
2. Load brand guidelines (`$brand-guidelines`) and ToV document (`$tone-of-voice`).
3. If this is a re-check — load the list of prior violations.

### Step 1 — Check Tone of Voice
1. Compare text formality / informality against the ToV document.
2. Check emotional coloring — does it align with the brand's character.
3. Check for forbidden words, clichés, stop-phrases.
4. Assess tone uniformity throughout the material.
5. Check customer language — are words/phrases used that the TA understands (from `$audience-analysis`).

### Step 2 — Check Visual Identity
1. Color palette — all colors are within the approved palette (HEX codes).
2. Typography — fonts, sizes, styles align with guidelines.
3. Logo — size, clear space, permissible variant, forbidden transformations.
4. Visual style — photos, illustrations, icons correspond to brand style.
5. Composition — paddings, alignment, elements hierarchy.
6. Platform specifications — sizes, aspect ratios, safe zones for the platform.

### Step 3 — Check Messaging
1. Value proposition — conveyed correctly, untampered.
2. Positioning — aligns with brand strategy.
3. CTA — lines up with approved phrasing, no brand discrepancies.
4. Consistency — no conflicts with other brand content on the same channel.
5. Key messages — priority brand theses are present (if applicable).

### Step 4 — Check Legal and Compliance Requirements
1. Legal disclaimer — present if required (advertising, finance, health).
2. Copyright — © and year mentioned correctly.
3. Disclaimer — if promises/guarantees are made.
4. User-generated content — if external content used, is there permission.
5. Brand hashtags — used approved ones, no forbidden ones.

### Step 5 — Forming the report
1. For each violation: severity + specific quote/example + recommendation to fix.
2. Calculate the outcome via the passing threshold.
3. Generate a summary and action list.

## Validation (Quality Gate)

Check is considered completed if:

- [ ] All 4 layers are verified (ToV, Visual, Messaging, Legal)
- [ ] Severity, quote, and suggested fix are specified for each violation
- [ ] Outcome reflects the passing threshold rules (not subjective)
- [ ] If `NON-COMPLIANT` or `CONDITIONALLY COMPLIANT` — an action list is generated
- [ ] If a re-check — prior violations are verified for fixes

## Handoff

| Outcome | Routing |
|------|---------|
| **COMPLIANT** | → `$content-release-gate` (final gate before publishing) |
| **CONDITIONALLY COMPLIANT** | → back to assignee (Copywriter / Visual Concept) with a specific list of Major fixes → re-check |
| **NON-COMPLIANT** | → back to assignee with the complete list → update `$board` status to `[↩] Return` → re-check |

When handing off — use `$handoff` with the full report attached.

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$brand-guidelines` | **Benchmark source** — visual identity, logo, palette, typography |
| `$tone-of-voice` | **Benchmark source** — tone, style, forbidden words |
| `$audience-analysis` | Customer language — check that text speaks in the TA's language |
| `$content-review-checklist` | Complementary skill — `$brand-compliance` checks the brand, `$content-review-checklist` checks content quality |
| `$platform-compliance` | Complementary skill — `$brand-compliance` checks the brand, `$platform-compliance` checks platform rules |
| `$board` | Update gate status by the check outcome |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Verification without guidelines | Subjective opinion, not compliance | Always vet against specific benchmarks |
| All violations equally leveled | Trivialities block publication | Apply severity: Critical / Major / Minor |
| "A violation exists" without quote | Assignee clueless on what to fix | Always quote the specific place |
| Violation without suggested fix | Feedback lacks resolution | Serve a recommendation per violation |
| Text-only check | Visuals might breach the brand worse | Check all 4 layers |
| Skipping legal | Penalties, bans, lawsuits | Always check disclaimer, copyright, permissions |

## Output Template

```
### Brand Compliance — [Content / Publication]

**Platform:** [platform]
**Content type:** [type]
**Benchmark:** [link to brand guidelines + ToV]
**Re-check:** [Yes (iteration N) / No]

---

#### 1. Tone of Voice

| Aspect | Requirement | Fact | Status |
|--------|-----------|------|--------|
| Formality | [level from ToV] | [observation + quote] | ✅/❌ |
| Emotionality | [level from ToV] | [observation + quote] | ✅/❌ |
| Forbidden words | None | [present/absent + quote] | ✅/❌ |
| Tone uniformity | Consistent throughout | [observation] | ✅/❌ |
| Customer language | [words from audience-analysis] | [observation] | ✅/❌ |

#### 2. Visual Identity

| Element | Requirement | Fact | Status |
|---------|-----------|------|--------|
| Color palette | [HEX-codes from guidelines] | [used colors] | ✅/❌ |
| Typography | [font, size, style] | [used ones] | ✅/❌ |
| Logo | [size, clear space, variant] | [fact] | ✅/❌ |
| Visual style | [style for photos/art] | [fact] | ✅/❌ |
| Composition | [paddings, hierarchy] | [fact] | ✅/❌ |
| Platform specs | [sizes for platform] | [fact] | ✅/❌ |

#### 3. Messaging

| Aspect | Requirement | Fact | Status |
|--------|-----------|------|--------|
| Value proposition | [from strategy] | [observation] | ✅/❌ |
| Positioning | [from strategy] | [observation] | ✅/❌ |
| CTA | [approved phrasings] | [fact] | ✅/❌ |
| Consistency | No conflicts | [observation] | ✅/❌ |

#### 4. Legal and Compliance

| Aspect | Required | Fact | Status |
|--------|-----------|------|--------|
| Disclaimer | [Yes/No] | [present/absent] | ✅/❌/N/A |
| Copyright © | [Yes/No] | [present/absent] | ✅/❌/N/A |
| Brand hashtags | [list] | [used ones] | ✅/❌/N/A |
| UGC Permissions | [Yes/No] | [present/absent] | ✅/❌/N/A |

---

### Violations

| # | Severity | Layer | Description | Quote / Example | Suggested Fix |
|---|----------|------|----------|-----------------|---------------|
| 1 | 🔴 Critical | Legal | [description] | "[quote]" | [how to fix] |
| 2 | 🟡 Major | ToV | [description] | "[quote]" | [how to fix] |
| 3 | 🔵 Minor | Visual | [description] | [example] | [how to fix] |

**Summary:** 🔴 [N] Critical · 🟡 [N] Major · 🔵 [N] Minor

---

### Outcome: [ COMPLIANT / CONDITIONALLY COMPLIANT / NON-COMPLIANT ]

**Justification:** [why such outcome — via the passing threshold rules]

**Action list (if not COMPLIANT):**
1. [Fix Critical #1 — ...]
2. [Fix Major #2 — ...]

**Next step:** [→ $content-release-gate / → back to Copywriter / → back to Visual Concept]
```
