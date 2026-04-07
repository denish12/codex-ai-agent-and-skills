---
name: platform-compliance
description: Checking content compliance against platform rules — requirements registry, algorithmic risks, severity, and remediation recommendations
---
# Platform Compliance

## When to use
- During the **Reviewer** stage — verification before `$content-release-gate`.
- During **cross-posting** — adapting content for another platform.
- When facing **reach problems** — auditing for algorithmic risks.
- For **sponsored content** — checking a platform's advertising policies.

## Inputs

| Field | Required | Description |
|-------|:--------:|-------------|
| Content to check | ✅ | Text + visuals / video — what we are evaluating |
| Platform | ✅ | Where it will be published |
| Content Format | ✅ | Post / carousel / reel / story / article / video |
| Publication Type | ✅ | Organic / Paid (ads) — different rules apply |
| Content Brief | ⬚ | For cross-referencing with technical specs from the brief |

> If the platform is not specified — **request it**. Requirements for Instagram and LinkedIn are fundamentally different.

## Severity

| Level | Definition | Impact |
|---------|-------------|---------|
| 🔴 **Blocker** | Publication is impossible or will be removed/banned | NON-COMPLIANT |
| 🟡 **Risk** | Publication is possible, but the algorithm will reduce reach or there's a risk of a warning | COMPLIANT WITH RISKS |
| 🔵 **Note** | Recommendation for optimization, not a violation | COMPLIANT |

### Passing Threshold

| Result | Condition |
|-----------|---------|
| **COMPLIANT** | 0 Blockers + 0 Risks |
| **COMPLIANT WITH RISKS** | 0 Blockers + 1-2 Risks (documented, user notified) |
| **NON-COMPLIANT** | ≥ 1 Blocker OR ≥ 3 Risks |

## Platform Requirements Registry

### Instagram

**Technical:**

| Format | Size | Ratio | Text Limit | Other |
|--------|--------|-------|-------------|--------|
| Feed (photo) | 1080×1080 / 1080×1350 | 1:1 / 4:5 | 2200 char caption | ≤ 30 hashtags |
| Carousel | 1080×1080 / 1080×1350 | 1:1 / 4:5 | 2200 characters | ≤ 10 slides |
| Reels | 1080×1920 | 9:16 | 2200 characters | 15-90 sec (recommended ≤ 60) |
| Stories | 1080×1920 | 9:16 | — | 15 sec per slide |

**Community Guidelines:**
- 🔴 No: nudity, violence, hate speech, sale of restricted goods, minor endangerment
- 🔴 No: copyright infringement (music, photos, videos)
- 🔴 Ad labeling mandatory (Paid Partnership / "Ad" disclosure)
- 🟡 Engagement bait penalty: "like if...", "comment + below" — decreases reach
- 🟡 Links in captions are not clickable — put link in bio or use a Stories sticker

**Algorithmic Risks:**
- 🟡 Reusing TikTok content with a watermark — reach penalty
- 🟡 Posting too frequently (> 2/day) — reach cannibalization
- 🟡 Banned hashtags (check the current list of banned hashtags)
- 🔵 The first 30-60 minutes post-publication are critical for the algorithm — timing matters

### LinkedIn

**Technical:**

| Format | Size | Ratio | Text Limit | Other |
|--------|--------|-------|-------------|--------|
| Post (photo) | 1200×627 / 1080×1080 | 1.91:1 / 1:1 | 3000 characters | — |
| Carousel (PDF)| 1080×1080 / 1920×1080 | 1:1 / 16:9 | — | PDF, ≤ 300 pages |
| Video | 256×144 — 4096×2304 | any | — | 3 sec — 10 min |
| Article | — | — | no limit | Native editor |

**Community Guidelines:**
- 🔴 No: hate speech, harassment, spam, fake accounts, misleading content
- 🔴 Professional context — LinkedIn is stricter about off-topic content
- 🟡 Links within the post lower reach (the algorithm prefers native content)
- 🟡 Tagging people who do not engage — treated as spam

**Algorithmic Risks:**
- 🟡 External links in the post body — reach ↓ 40-50%. Put the link in the first comment
- 🟡 Engagement bait: "agree? hit like" — penalty
- 🟡 Editing a post within the first hour — resets the algorithmic boost
- 🔵 Dwell time is important — long, well-formatted posts perform better

### Telegram

**Technical:**

| Format | Size | Ratio | Text Limit | Other |
|--------|--------|-------|-------------|--------|
| Post (text) | — | — | 4096 characters | Markdown / HTML formatting |
| Post (photo) | recommended 800×400+ | 2:1 recommended | 1024 char caption | ≤ 10 photos per album |
| Video | — | any | 1024 char caption | ≤ 2 GB |

**Rules:**
- 🔴 No: calls to violence, extremism, sensitive minor content
- 🔴 Ad-labeling according to regional laws (if targeted)
- 🟡 Spam complaints — the channel can be restricted from recommendations
- 🔵 No algorithmic feed (it's chronological) — timing is critical

### YouTube

**Technical:**

| Format | Size | Ratio | Limit | Other |
|--------|--------|-------|-------|--------|
| Video | 1920×1080 recommended | 16:9 | — | Recommended > 8 min for mid-roll ads |
| Shorts | 1080×1920 | 9:16 | — | ≤ 60 sec |
| Thumbnail | 1280×720 | 16:9 | — | ≤ 2 MB, JPG/PNG |
| Title | — | — | 100 characters (≤ 70 recommended)| — |
| Description | — | — | 5000 characters | First 2 lines are visible |

**Rules:**
- 🔴 No: misleading metadata (clickbait title doesn't match video), spam, harassment
- 🔴 No: reused content (reused content penalty — uploading the exact same clip twice)
- 🔴 Copyright: Content ID automatically detects music and video
- 🟡 Made for Kids — restricts comments, notifications, and personalization

**Algorithmic Risks:**
- 🟡 Thumbnail CTR < 4% — the video gets fewer impressions
- 🟡 Retention < 40% — the algorithm stops recommending it
- 🔵 The first 24-48 hours — critical for the algorithm

### Twitter/X

**Technical:**

| Format | Size | Ratio | Text Limit | Other |
|--------|--------|-------|-------------|--------|
| Post | — | — | 280 characters (free) / 25000 (Premium) | — |
| Image | 1600×900 recommended | 16:9 | — | ≤ 4 photos |
| Video | 1920×1200 max | any | — | ≤ 2:20 min (free) |

**Rules:**
- 🔴 No: hate speech, harassment, manipulated media, spam
- 🟡 Links decrease reach (the algorithm prefers native content)
- 🟡 Automated cross-posting (identical text) — penalty

### TikTok

**Technical:**

| Format | Size | Ratio | Text Limit | Other |
|--------|--------|-------|-------------|--------|
| Video | 1080×1920 | 9:16 | 2200 char caption | 15 sec — 10 min |
| Photo carousel| 1080×1920 | 9:16 | 2200 characters | ≤ 35 photos |

**Rules:**
- 🔴 No: dangerous acts, harassment, hate speech, misleading content, minor safety
- 🔴 No: copyright infringement (music — must use the TikTok library)
- 🟡 Watermarks from other platforms — reach reduction
- 🟡 18+ content gets restricted from the For You page

**Algorithmic Risks:**
- 🟡 First 3 seconds = hook. No hook → scroll away → algorithm stops pushing
- 🟡 Completion rate is critical — shorter = better for engagement
- 🔵 Trending sounds increase reach

## Protocol

### Step 1 — Context Definition
1. Determine the platform, content format, and type (organic/paid).
2. Load platform requirements from the registry.

### Step 2 — Technical Check
1. Verify **all technical parameters** against the platform table:
   - Visual dimensions (does it match the ratio?).
   - Text length (within the limit?).
   - File format (supported?).
   - Hashtags (within limits? no banned tags?).
   - Video length (within limits?).
2. For each ❌ — indicate severity and suggested fix.

### Step 3 — Community Guidelines
1. Check content against the **platform rules**.
2. Check **copyright**: images, music, video — license/permission.
3. If paid — check the platform's **advertising policies**.
4. Check **ad labeling** (if applicable).

### Step 4 — Algorithmic Risks
1. Check content for **algorithmic penalties**:
   - Engagement bait?
   - External links in the post?
   - Watermarks from another platform?
   - Reused content?
2. Log risks as 🟡 Risk.

### Step 5 — Verdict
1. Tally Blocker / Risk / Note.
2. Apply the passing threshold.
3. For each violation / risk — provide a suggested fix.

## Validation (Quality Gate)

The check is considered complete if:

- [ ] Platform is defined, requirements loaded from the registry
- [ ] All technical parameters verified (dimensions, limits, formats)
- [ ] Community guidelines checked
- [ ] Copyright verified (music, photos, video)
- [ ] Ad labeling verified (if paid / sponsored)
- [ ] Algorithmic risks evaluated
- [ ] For every ❌ and ⚠️ — severity and suggested fix
- [ ] The verdict matches the threshold calculation

## Handoff

| Result | Route |
|-----------|---------|
| **COMPLIANT** | → `$content-release-gate` |
| **COMPLIANT WITH RISKS** | → `$content-release-gate` highlighting risks (user decides) |
| **NON-COMPLIANT** | → back to Copywriter / Visual Concept with specific fixes |

When handing off — use `$handoff` and attach the full report.

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$platform-strategy` | **Source:** platforms, formats |
| `$platform-visual-specs` | **Complement:** visual specs = technical requirements for visuals, this skill = full compliance |
| `$content-review-checklist` | **Complement:** review checklist checks quality, platform compliance checks platform rules |
| `$brand-compliance` | **Complement:** brand = brand rules, platform = platform rules |
| `$content-release-gate` | **Consumer:** COMPLIANT is mandatory for the Release Gate |
| `$content-brief` | **Source:** technical requirements from the brief for reconciliation |

## Anti-patterns

| Mistake | Why it's bad | How to do it right |
|--------|-------------|---------------|
| One checklist for all platforms| Instagram ≠ LinkedIn ≠ TikTok | Use the platform-specific requirements registry |
| Ignoring algorithmic risks | Content is compliant, but reach is 0 | Audit engagement bait, links, watermarks |
| Cross-posting without adapting | A TikTok video on Instagram with a sticker = penalty | Adapt for each platform |
| No copyright checks | Content ID / DMCA strike → ban | Always check licenses for music, photos, video |
| Sponsored content without labeling| Fines, deletion, bans | Labeling is mandatory by law and platform rules |
| "Banned hashtags" not checked | Shadow ban, reduced reach | Screen hashtags prior to publication |
| Editing immediately after posting| On LinkedIn/Instagram — resets the algorithmic boost | Double-check everything BEFORE publishing |

## Output Template

```
### Platform Compliance — [Platform]

**Content:** [description / ID from $content-brief]
**Format:** [post / carousel / reel / story / video / article]
**Type:** [Organic / Paid]

---

#### 1. Technical Requirements

| Parameter | Platform Requirement | Actual | Sev | Status |
|----------|---------------------|------|-----|--------|
| Image Size | [W×H] | [W×H] | 🔴 | ✅/❌ |
| Ratio | [ratio] | [ratio] | 🔴 | ✅/❌ |
| Text Length | ≤ [N] characters | [N] characters | 🔴 | ✅/❌ |
| File Format | [JPG/PNG/MP4] | [format] | 🔴 | ✅/❌ |
| Hashtags | ≤ [N] | [N] | 🔵 | ✅/❌ |
| Video Duration| [min-max] | [duration] | 🔴 | ✅/❌/N/A |

#### 2. Community Guidelines

| Rule | Sev | Status | Comment |
|---------|-----|--------|-------------|
| No prohibited content (violence, hate speech, nudity) | 🔴 | ✅/❌ | |
| No spam or artificial inflation | 🔴 | ✅/❌ | |
| Correct mentions (@) | 🟡 | ✅/❌ | |
| Copyright (photos, music, video)| 🔴 | ✅/❌ | |
| Ad labeling | 🔴 | ✅/❌/N/A | |
| [Platform-specific rule] | [sev] | ✅/❌ | |

#### 3. Algorithmic Risks

| Risk | Sev | Status | Suggested Fix |
|------|-----|--------|---------------|
| Engagement bait | 🟡 | ✅ No / ⚠️ Yes | [how to fix] |
| External links in post | 🟡 | ✅/⚠️ | [link in comment / bio] |
| Watermark from other platform | 🟡 | ✅/⚠️ | [remove / reshoot] |
| Banned hashtags | 🟡 | ✅/⚠️ | [replace with safe ones] |
| Reused content | 🟡 | ✅/⚠️ | [adapt / make unique] |
| [Platform-specific risk] | [sev] | ✅/⚠️ | [fix] |

---

#### Summary

| Severity | Count | Items |
|----------|-----------|--------|
| 🔴 Blocker | [N] | [list] |
| 🟡 Risk | [N] | [list] |
| 🔵 Note | [N] | [list] |

### Verdict: [ COMPLIANT / COMPLIANT WITH RISKS / NON-COMPLIANT ]

**Reasoning:** [base on threshold rules]

**Violations and Fixes (if any):**

| # | Violation | Sev | Suggested Fix |
|---|-----------|-----|---------------|
| 1 | [description] | 🔴/🟡 | [specific fix] |

**→ Next step:** [→ $content-release-gate / → back to Copywriter / Visual Concept with fixes]
```
