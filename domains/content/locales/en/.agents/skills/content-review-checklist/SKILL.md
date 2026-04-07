---
name: content-review-checklist
description: System content review checklist — text quality, visuals, SEO, links, legals, accessibility — with severity mapping and suggested fixes
---
# Content Review Checklist

## When to Use
- At the **Reviewer** stage — the main content quality check before `$content-release-gate`.
- During **re-review** — after revisions based on previous feedback.
- During **self-check** by the copywriter — before handing over for review (reduces iterations).

## Area of Responsibility

This skill checks **content quality** — text, visuals, links, SEO, legals, accessibility.

> **Distinction from `$brand-compliance`:** Brand compliance checks adherence to brand guidelines (ToV, palette, logo, positioning). This checklist checks execution quality (grammar, facts, readability, links, SEO). The points overlap minimally — if there is a match, refer to the `$brand-compliance` result.

## Input

| Field | Required | Description |
|------|:-----------:|----------|
| Content for review | ✅ | Final text + visual from Copywriter / Visual Concept |
| Content brief | ✅ | From `$content-brief` — to verify goal, key messages, CTA, persona, volume |
| Brand guidelines | ✅ | From `$brand-guidelines` — to verify ToV and stop-list |
| `$brand-compliance` result | ⬚ | If already passed — refer to it, do not duplicate |
| `$fact-checking` result | ⬚ | If already passed — refer to it, do not re-verify |
| Platform specs | ⬚ | From `$platform-strategy` / `$platform-compliance` — sizes, limits |

> If the content brief is not provided — **ask the user for it**. Review without a reference = subjective opinion.

## Severity — Default Mapping

Each checklist item has a **default severity**. The reviewer can increase or decrease the severity with justification.

| Severity | Definition | Impact |
|----------|-------------|---------|
| 🔴 **Blocker** | Publication is impossible. Factual error, legal risk, complete mismatch with the brief. | REQUIRES CHANGES |
| 🟡 **Major** | Publication is undesirable. Noticeable quality issue. | REQUIRES CHANGES (if ≥ 3) |
| 🔵 **Minor** | Publication is possible. Cosmetic improvement. | Non-blocking |

### Decision Threshold

| Decision | Condition |
|---------|---------|
| **APPROVED** | 0 Blocker + ≤ 2 Major + any number of Minor |
| **REQUIRES CHANGES** | ≥ 1 Blocker OR ≥ 3 Major |

## Protocol

### Step 1 — Preparation
1. Obtain all required inputs.
2. If `$brand-compliance` and/or `$fact-checking` are already passed — load results, do not duplicate the check.
3. Open the content brief — record: goal, persona, key messages, CTA, volume, format.

### Step 2 — Checklist Execution
1. Go through **all items** sequentially by category (text → visual → SEO → links → legals → accessibility).
2. Mark each item: ✅ / ❌ / N/A.
3. For each ❌ — **mandatory**:
   - Specify severity (default from mapping, adjustable with justification).
   - Provide a specific quote / example of the problem.
   - Offer a **suggested fix** — a specific correction, not just "redo it".

### Step 3 — Decision Formation
1. Count 🔴 / 🟡 / 🔵.
2. Apply the decision threshold.
3. Formulate an action list (if REQUIRES CHANGES).

## Full Checklist with Severity Mapping

### Category: Text — Brief Compliance

| # | Criterion | Default severity |
|---|----------|-----------------|
| 1 | Topic matches the brief | 🔴 Blocker |
| 2 | Content goal is achieved (reader knows what to do) | 🔴 Blocker |
| 3 | Target audience persona — text speaks their language | 🟡 Major |
| 4 | All key messages from the brief are covered | 🟡 Major |
| 5 | Forbidden topics are not touched upon | 🔴 Blocker |
| 6 | Mandatory elements are present (facts, quotes, data) | 🟡 Major |

### Category: Text — Quality

| # | Criterion | Default severity |
|---|----------|-----------------|
| 7 | No spelling errors | 🟡 Major |
| 8 | No grammatical errors | 🟡 Major |
| 9 | Readability — sentences not overloaded, paragraphs ≤ 3-4 sentences | 🔵 Minor |
| 10 | Headline / hook grabs attention | 🟡 Major |
| 11 | Volume matches brief and platform | 🟡 Major |
| 12 | No forbidden words / clichés (from stop-list) | 🟡 Major |
| 13 | No repetitions, fluff, meaningless phrases | 🔵 Minor |
| 14 | Logical structure — from hook to CTA | 🔵 Minor |

### Category: Text — CTA

| # | Criterion | Default severity |
|---|----------|-----------------|
| 15 | CTA is present | 🔴 Blocker |
| 16 | CTA is specific (single action, not "subscribe and buy and share") | 🟡 Major |
| 17 | CTA matches the funnel stage from the brief | 🟡 Major |

### Category: Facts

| # | Criterion | Default severity |
|---|----------|-----------------|
| 18 | All facts and figures are verified (or referenced to `$fact-checking`) | 🔴 Blocker |
| 19 | Sources are cited where required | 🟡 Major |

### Category: Visuals

| # | Criterion | Default severity |
|---|----------|-----------------|
| 20 | Visual matches text and topic | 🟡 Major |
| 21 | Dimensions match the platform | 🔴 Blocker |
| 22 | Text on image is readable (contrast, font size) | 🟡 Major |
| 23 | Visual style matches the brand (or referenced to `$brand-compliance`) | 🟡 Major |
| 24 | Logo is placed correctly (if required) | 🔵 Minor |
| 25 | No AI generation artifacts (extra fingers, trash text, distortions) | 🔴 Blocker |

### Category: SEO (for text formats)

| # | Criterion | Default severity |
|---|----------|-----------------|
| 26 | Main keyword is present in the headline | 🟡 Major |
| 27 | Keywords are distributed naturally throughout the text | 🔵 Minor |
| 28 | Meta title ≤ 60 characters | 🔵 Minor |
| 29 | Meta description ≤ 160 characters, contains CTA | 🔵 Minor |
> N/A for non-SEO formats (stories, reels, email).

### Category: Links and Meta

| # | Criterion | Default severity |
|---|----------|-----------------|
| 30 | All links are working (no 404s) | 🔴 Blocker |
| 31 | UTM tags are added (if there are links) | 🔵 Minor |
| 32 | Brand hashtags are used | 🔵 Minor |

### Category: Legals

| # | Criterion | Default severity |
|---|----------|-----------------|
| 33 | Disclaimer is present (if content is advertising / financial / medical) | 🔴 Blocker |
| 34 | Copyright © is indicated (if required) | 🟡 Major |
| 35 | No copyright violations (stolen photos, text, music) | 🔴 Blocker |

### Category: Accessibility

| # | Criterion | Default severity |
|---|----------|-----------------|
| 36 | Alt text added to images | 🔵 Minor |
| 37 | Text contrast is sufficient for reading | 🔵 Minor |
| 38 | Subtitles / text transcript for video (if applicable) | 🟡 Major |

## Validation (Quality Gate)

The review is considered complete if:

- [ ] All checklist items are completed (✅ / ❌ / N/A — no empty ones)
- [ ] For each ❌ specified: severity, quote/example, suggested fix
- [ ] Decision matches the threshold (not subjective, but rule-based)
- [ ] If REQUIRES CHANGES — an action list is formulated with priorities
- [ ] If there is a `$brand-compliance` / `$fact-checking` result — referenced, not duplicated

## Handoff

| Decision | Route |
|---------|---------|
| **APPROVED** | → `$content-release-gate` with checklist attached |
| **REQUIRES CHANGES** | → back to the assignee with a specific list of edits |

Return route by issue category:

| Issue Category | Return To |
|--------------------|-------------|
| Text (topic, key messages, CTA, quality) | → Copywriter |
| Facts | → Researcher → `$fact-checking` |
| Visual | → Visual Concept |
| SEO | → Copywriter (or SEO Specialist) |
| Legals | → Escalation to user |

When handing off — use `$handoff` attaching the checklist and the list of edits.

## Integration with Other Skills

| Skill | Interaction |
|------|----------------|
| `$content-brief` | **Reference:** verify goal, key messages, CTA, persona, volume |
| `$brand-guidelines` | **Reference:** ToV, stop-list |
| `$brand-compliance` | **Complement:** brand check — if passed, do not duplicate |
| `$fact-checking` | **Complement:** fact verification — if passed, do not duplicate |
| `$readability-scoring` | **Complement:** detailed readability assessment |
| `$platform-compliance` | **Complement:** platform rules check |
| `$content-release-gate` | **Consumer:** checklist result — input for Release Gate |
| `$board` | Update Reviewer gate status |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Review without a brief | Subjective "I don't like it" instead of criteria check | Always cross-check with `$content-brief` |
| ❌ without suggested fix | Author doesn't know what to fix | Every remark = specific proposal |
| Everything is a blocker | Author is demotivated, doesn't understand priorities | Severity by mapping, adjustable with justification |
| Duplicating `$brand-compliance` | Double work, potential contradictions | Refer to result, do not re-check |
| Skipping categories | "Text is OK" — but links are broken, no disclaimer | Go through all categories, mark N/A if inapplicable |
| Text-only review | Visual with AI artifacts slips through unnoticed | Visual is a mandatory category |
| Subjective remarks | "Weak headline" — but why? | Specifics: "Headline lacks benefit for target audience, suggest: [option]" |

## Output Template

```markdown
### Content Review Checklist — [Content Title]

**ID:** [from $content-brief]
**Reviewer:** [agent / role]
**Iteration:** [1 / 2 / N]
**Review Date:** [YYYY-MM-DD]

**References:**
- Brief: [link / ID]
- Brand compliance: [passed ✅ / failed / not conducted]
- Fact checking: [passed ✅ / failed / not conducted]

---

#### Text — Brief Compliance
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 1 | Topic matches the brief | 🔴 | ✅/❌ | |
| 2 | Content goal achieved | 🔴 | ✅/❌ | |
| 3 | Target audience persona — language, pain points | 🟡 | ✅/❌ | |
| 4 | Key messages covered | 🟡 | ✅/❌ | |
| 5 | Forbidden topics untouched | 🔴 | ✅/❌ | |
| 6 | Mandatory elements present | 🟡 | ✅/❌ | |

#### Text — Quality
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 7 | Spelling | 🟡 | ✅/❌ | |
| 8 | Grammar | 🟡 | ✅/❌ | |
| 9 | Readability | 🔵 | ✅/❌ | |
| 10 | Hook / headline | 🟡 | ✅/❌ | |
| 11 | Volume | 🟡 | ✅/❌ | |
| 12 | Stop words / clichés | 🟡 | ✅/❌ | |
| 13 | No fluff / repetitions | 🔵 | ✅/❌ | |
| 14 | Logical structure | 🔵 | ✅/❌ | |

#### Text — CTA
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 15 | CTA is present | 🔴 | ✅/❌ | |
| 16 | CTA is specific (single action) | 🟡 | ✅/❌ | |
| 17 | CTA matches funnel stage | 🟡 | ✅/❌ | |

#### Facts
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 18 | Facts are verified | 🔴 | ✅/❌/ref:$fact-checking | |
| 19 | Sources cited | 🟡 | ✅/❌/N/A | |

#### Visuals
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 20 | Matches text and topic | 🟡 | ✅/❌ | |
| 21 | Dimensions for platform | 🔴 | ✅/❌ | |
| 22 | Text on image readable | 🟡 | ✅/❌ | |
| 23 | Brand style | 🟡 | ✅/❌/ref:$brand-compliance | |
| 24 | Logo is correct | 🔵 | ✅/❌/N/A | |
| 25 | No AI artifacts | 🔴 | ✅/❌/N/A | |

#### SEO (N/A for stories, reels, email)
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 26 | Keyword in headline | 🟡 | ✅/❌/N/A | |
| 27 | Keywords distributed | 🔵 | ✅/❌/N/A | |
| 28 | Meta title ≤ 60 | 🔵 | ✅/❌/N/A | |
| 29 | Meta description ≤ 160 | 🔵 | ✅/❌/N/A | |

#### Links and Meta
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 30 | Links are working | 🔴 | ✅/❌/N/A | |
| 31 | UTM tags | 🔵 | ✅/❌/N/A | |
| 32 | Brand hashtags | 🔵 | ✅/❌/N/A | |

#### Legals
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 33 | Disclaimer (if ad/fin/med) | 🔴 | ✅/❌/N/A | |
| 34 | Copyright © | 🟡 | ✅/❌/N/A | |
| 35 | No copyright violation | 🔴 | ✅/❌ | |

#### Accessibility
| # | Criterion | Sev | Status | Comment / Suggested Fix |
|---|----------|-----|--------|----------------------------|
| 36 | Alt text | 🔵 | ✅/❌/N/A | |
| 37 | Text contrast | 🔵 | ✅/❌/N/A | |
| 38 | Subtitles for video | 🟡 | ✅/❌/N/A | |

---

#### Summary

| Severity | Count | Items |
|----------|-----------|--------|
| 🔴 Blocker | [N] | #[list] |
| 🟡 Major | [N] | #[list] |
| 🔵 Minor | [N] | #[list] |

### Decision: [ APPROVED / REQUIRES CHANGES ]

**Justification:** [per threshold rules: 0 blocker + ≤ 2 major = APPROVED]

**Action List (if REQUIRES CHANGES):**
| Priority | Item | Assignee | Suggested Fix |
|-----------|-------|-------------|---------------|
| 🔴 | #[N] | [Copywriter / Visual Concept / Researcher] | [Specific fix] |
| 🟡 | #[N] | [Assignee] | [Specific fix] |

**→ Next step:** [→ $content-release-gate / → back to [Assignee] with edits]
```
