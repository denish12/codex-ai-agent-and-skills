---
name: content-release-gate
description: Final gate prior to publication — artifact check, blocker/non-blocker checklist, publication package, rollback, post-publish
---
# Content Release Gate

## When to use
- After **passing all pipeline gates** (Reviewer yielded APPROVED).
- Preceding the **final publication** of any content unit.
- During **re-publication** after a HOLD — verifying that blockers have been resolved.

## Input

| Field | Required | Source |
|------|:-----------:|----------|
| Final text (APPROVED) | ✅ | Copywriter → Reviewer |
| Visual brief / final visual | ✅ | Visual Concept → Reviewer |
| AI-prompts for images | ⬚ | Visual Concept (if generated via AI) |
| `$brand-compliance` result | ✅ | Reviewer — status COMPLIANT |
| `$fact-checking` result | ✅ | Reviewer — status VERIFIED |
| `$readability-scoring` result | ⬚ | Reviewer — if applicable to the format |
| `$platform-compliance` result | ✅ | Reviewer — compliance with platform rules |
| Content brief (ID) | ✅ | `$content-brief` — to verify goal, CTA, persona |
| Publication date | ✅ | `$content-calendar` |

> If any required artifact is missing or possesses a status other than APPROVED/COMPLIANT/VERIFIED — the Release Gate **cannot be initiated**. Return it to the appropriate gate.

## Protocol

### Step 1 — Artifact Collection and Verification
1. Ensure **all mandatory artifacts** from the table above have been procured.
2. Verify the **status of each**: APPROVED / COMPLIANT / VERIFIED.
3. If anything is missing → mark it as a blocker, do not proceed.

### Step 2 — Final Checklist
Walk through all checklist items (see template). Every item carries a severity level:
- **🔴 Blocker** — publication is impossible until amended.
- **🟡 Warning** — publication is possible, but amendment is recommended.

### Step 3 — Status Determination

| Status | Condition |
|--------|---------|
| **READY TO PUBLISH** | 0 blockers · 0 or more warnings (logged, user is aware) |
| **HOLD** | ≥ 1 blocker · publication is forbidden until resolved |

### Step 4 — Formulating the Publication Package
If `READY TO PUBLISH` — assemble the entire package (see template):
1. Final text (copy-pasteable, in platform format).
2. Hashtags (if applicable).
3. Links with UTM trackers (if applicable).
4. Visual — file or AI-prompt for generation.
5. Platform settings — dimensions, alt-text, thumbnail.
6. Schedule — exact publication time.

### Step 5 — User Sign-Off
Present to user:
- The final checklist with results.
- The publication package.
- Anticipate an explicit **"Approved"**.

### Step 6 — Post-publish Actions
Upon receiving Approved and publishing:
1. Update `$board` — Release Gate → `[✓] Finished`.
2. Update `$content-calendar` — content unit → status `Done`.
3. Log the outcome into the domain's `CONTEXT.md`.
4. Schedule monitoring (if determined): tracking metrics after 24h / 48h / 7 days.

## Rollback Protocol

When in **HOLD** status — the rollback routing depends on the blocker type:

| Blocker type | Return to | Action |
|-------------|-------------|------------|
| Text is not approved / errors in text | → Copywriter | Amend → repeat Reviewer |
| Brand compliance NON-COMPLIANT | → Copywriter / Visual Concept | Resolve violations from `$brand-compliance` report |
| Facts unverified | → Researcher | Double-check/replace facts → `$fact-checking` |
| Visual non-compliant | → Visual Concept | Amend → repeat Reviewer |
| Platform compliance violated | → Copywriter / Visual Concept | Adapt to the rules of the platform |
| CTA mismatches brief | → Copywriter | Rework CTA taking `$content-brief` into account |
| Legal blocker | → User | Escalation: disclaimer, copyright, permissions |

Upon rollback:
1. Update `$board` — current gate `[↩] Rollback`, target gate `[→] In progress`.
2. Handoff via `$handoff` — explicitly indicating the blockers and what to amend.
3. After amendment — **repeat Release Gate** (do not skip).

## Validation (Quality Gate)

A Release Gate is deemed successfully traversed if:

- [ ] All mandatory artifacts are gathered and hold the requisite status
- [ ] Checklist is processed completely — every item is marked ✅ or ❌ along with an explanation
- [ ] No unresolved blockers exist (🔴 = 0)
- [ ] Warnings are logged and the user has been notified
- [ ] Publication package is thoroughly fashioned (text + visual + meta)
- [ ] User sign-off acquired
- [ ] Post-publish activities are complete (board, calendar, CONTEXT.md)

## Integration with other skills

| Skill | Interaction |
|------|----------------|
| `$brand-compliance` | **Input:** review result — COMPLIANT is mandatory |
| `$fact-checking` | **Input:** result — VERIFIED is mandatory |
| `$readability-scoring` | **Input:** result — if applicable to the format |
| `$platform-compliance` | **Input:** adherence to platform rules |
| `$content-brief` | **Input:** comparing CTA, goal, persona against the final content |
| `$content-calendar` | **Input:** publication date · **Update:** status → Done |
| `$board` | **Update:** gate → `[✓]` or `[↩]` |
| `$handoff` | For rollback — handoff denoting blockers |
| `$content-review-checklist` | Complementary: review checklist must be passed prior to Release Gate |

## Anti-patterns

| Error | Why it's bad | How to do it right |
|--------|-------------|---------------|
| Release Gate without Reviewer APPROVED | Unverified content gets published | Mandatory verification of Reviewer status |
| Checklist items carry identical weight | A triviality blocks, a criticality passes | Blocker / Warning stratification |
| HOLD without a rollback route | Unclear who amends what | Rollback table providing specific routing |
| Package devoid of UTMs / hashtags | Analytics lost, brand disrupted | Complete package with metadata intact |
| Publishing sans user sign-off | The user hasn't seen the final version | Always wait for explicit Approved |
| Lack of post-publish updates | Board and calendar desync | Update board, calendar, CONTEXT.md |
| Reiterating release minus repeating checklist | A blocker might endure | Full checklist executed during each pass |

## Output Template

```
### Content Release Gate — [Content unit ID]

**Publication Date:** [date from $content-calendar]
**Platform:** [platform]
**Format:** [format]
**Persona:** [from $content-brief]
**Responsible for publishing:** [who]
**Repeat pass:** [No / Yes (iteration N — blockers from preceding: [list])]

---

#### 1. Artifact Verification

| Artifact | Source | Status | Blocker? |
|----------|----------|--------|----------|
| Final text | Copywriter → Reviewer | ✅ APPROVED / ❌ | 🔴 |
| Visual | Visual Concept → Reviewer | ✅ APPROVED / ❌ | 🔴 |
| AI-prompts | Visual Concept | ✅ / N/A | — |
| Brand compliance | `$brand-compliance` | ✅ COMPLIANT / ❌ | 🔴 |
| Fact checking | `$fact-checking` | ✅ VERIFIED / ❌ | 🔴 |
| Readability | `$readability-scoring` | ✅ / N/A | 🟡 |
| Platform compliance | `$platform-compliance` | ✅ / ❌ | 🔴 |

---

#### 2. Final Checklist

**Text:**
- [ ] 🔴 Text conforms to the brief (topic, theses, persona) 
- [ ] 🔴 CTA aligns with the brief and funnel stage
- [ ] 🔴 ToV aligns with `$brand-guidelines`
- [ ] 🔴 Free from grammatical / orthographic errors
- [ ] 🟡 Readability score falls within permissible bounds

**Visual:**
- [ ] 🔴 Dimensions align with the platform
- [ ] 🔴 Visual conforms to `$brand-guidelines`
- [ ] 🟡 Alt-text is appended (for accessibility)

**Meta and Links:**
- [ ] 🔴 Links are functional (verified)
- [ ] 🟡 UTM trackers appended (if any links exist)
- [ ] 🟡 Brand hashtags deployed
- [ ] 🔴 Disclaimer / © present (if mandated)

**Platform:**
- [ ] 🔴 Format meets platform requirements (character-count, dimensions, duration)
- [ ] 🟡 Publication time is optimal (from `$platform-strategy`)
- [ ] 🔴 Platform rules are not violated

---

#### 3. Result

**Blockers (🔴):** [N] — [list, if any]
**Warnings (🟡):** [N] — [list, if any]

### Status: [ READY TO PUBLISH / HOLD ]

**Rationale:** [reason for the status]

---

#### 4. Publication Package (if READY TO PUBLISH)

**Text:**
```
[Final text — copy-pasteable]
```

**Hashtags:** [list]

**Links:**
| Link | UTM | Destination |
|--------|-----|------------|
| [URL] | [utm_source=...&utm_medium=...] | [where it leads] |

**Visual:**
- File / prompt: [link or AI-prompt]
- Size: [WxH px]
- Alt-text: [text]

**Schedule:**
- Date: [YYYY-MM-DD]
- Time: [HH:MM] [time zone]
- Platform: [platform]

**Cross-posting:** [platforms + what's adapted / "No"]

---

#### 5. Routing (if HOLD)

| Blocker | Type | Return to | What to amend |
|--------|-----|-------------|---------------|
| [blocker 1] | [text / visual / legal] | → [agent] | [specific action] |

→ Put through a repeat Release Gate after amendment.

---

→ Awaiting final "Approved" for publication

#### 6. Post-publish (after Approved)
- [ ] `$board` — Release Gate → `[✓] Finished`
- [ ] `$content-calendar` — ID [X] → status `Done`
- [ ] `CONTEXT.md` — log publication 
- [ ] Monitoring scheduled: [24h / 48h / 7 days — metrics from $content-brief]
```
