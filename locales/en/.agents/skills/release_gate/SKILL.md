---
name: release_gate
description: Final release gate — collect Reviewer+Tester+CI reports, check DoD, classify risks, make GO/NO-GO decision, and form a closure plan.
---

# Skill: Release Gate

Final decision GO / NO-GO / GO-with-conditions.

**Sections:**
1. [Workflow](#1-workflow)
2. [Inputs](#2-inputs)
3. [Decision Matrix](#3-decision)
4. [NO-GO Criteria](#4-nogo)
5. [DoD Checklist](#5-dod)
6. [Post-Release Verification](#6-post)
7. [Example: Release Report](#7-example)
8. [Output Template](#8-output)

---

## 1. Workflow

```
1. Prereq: Generate RG checklist ($release_gate_checklist_template)
2. Collect inputs (section 2)
3. Fill RG checklist statuses
4. Run DoD checklist (section 5)
5. Apply decision matrix (section 3)
6. Generate Release Report (section 8)
7. Submit to user for GO / NO-GO sign-off
8. If GO → post-release verification (section 6)
```

---

## 2. Inputs

| Input | Source | Required |
|-------|--------|:--------:|
| Reviewer Report | REV gate | ✅ |
| Tester Report | TEST gate | ✅ |
| CI Results (tests, lint) | CI pipeline / terminal | ✅ |
| RG Checklist (filled) | $release_gate_checklist_template | ✅ |
| Release scope (what's shipping) | Board / backlog | ✅ |
| Version / tag / commit | Git | ✅ |
| Rollback plan | OPS gate | ✅ |

---

## 3. Decision Matrix

| Condition | Decision |
|-----------|----------|
| All RG checks DONE + 0 P0 + 0 P1 | **✅ GO** |
| All RG checks DONE + 0 P0 + P1 with tracked tasks | **⚠️ GO with conditions** |
| Any P0 from Reviewer or Tester | **❌ NO-GO** |
| CI tests fail | **❌ NO-GO** |
| Secrets in code/logs | **❌ NO-GO** |
| Critical UX flow broken | **❌ NO-GO** |
| No runbook / deploy instructions | **❌ NO-GO** |
| API contract violation (breaking) | **❌ NO-GO** |

### GO with conditions rules

```markdown
Allowed ONLY when ALL of:
1. Zero P0 issues
2. P1 issues have:
   - [ ] Workaround documented
   - [ ] Fix task created with owner + deadline
   - [ ] Risk accepted by user
3. No security P1 (security P1 = treat as P0)
```

---

## 4. NO-GO Criteria (hard stops)

| # | Criterion | How to check |
|---|----------|-------------|
| NG-01 | P0 from Reviewer | Review report: P0 count > 0 |
| NG-02 | P0 from Tester | Test report: P0 bugs open |
| NG-03 | Unit/Integration tests fail | CI output |
| NG-04 | Secrets in code | grep: password, apiKey, token in source |
| NG-05 | Secrets in logs | grep: password, token in log output |
| NG-06 | No runbook | Missing deploy/verify instructions |
| NG-07 | Critical flow blocked | TEST: P0 test case BLOCKED |
| NG-08 | Breaking API change | API contract compliance: P0 mismatch |

---

## 5. DoD Checklist

| # | Check | Source | Status |
|---|-------|--------|--------|
| RG-DoD-01 | Unit tests PASS | CI | ☐ |
| RG-DoD-02 | Integration tests PASS | CI | ☐ |
| RG-DoD-03 | Lint/format PASS | CI | ☐ |
| RG-DoD-04 | 0 P0 from Reviewer | REV report | ☐ |
| RG-DoD-05 | 0 P0 from Tester | TEST report | ☐ |
| RG-DoD-06 | No secrets in code/logs | Security scan | ☐ |
| RG-DoD-07 | Runbook exists and is current | docs/ | ☐ |
| RG-DoD-08 | API matches contracts | API compliance | ☐ |
| RG-DoD-09 | Containers built + healthy | OPS report | ☐ |
| RG-DoD-10 | RG checklist complete | RG-01..RG-22 | ☐ |

---

## 6. Post-Release Verification

After GO decision and deploy:

| # | Check | How | Status |
|---|-------|-----|--------|
| POST-01 | Service is running | Health endpoint returns 200 | ☐ |
| POST-02 | P0 flows work end-to-end | Quick manual smoke | ☐ |
| POST-03 | No error spike in logs | Check last 5min of logs | ☐ |
| POST-04 | Response times normal | Check latency (< 500ms) | ☐ |
| POST-05 | Rollback tested (if first deploy) | Know how to roll back | ☐ |

---

## 7. Example: Release Report

```markdown
# Release Report: SaaS Admin Panel v1.0

## Decision: ⚠️ GO with conditions

**Version:** v1.0.0
**Commit:** abc1234
**Date:** 2026-03-13
**Scope:** Settings CRUD + Products CRUD + Content Widget

## Evidence
| Source | Status | Details |
|--------|:------:|---------|
| CI: Unit tests | ✅ PASS | 42/42 pass |
| CI: Integration | ✅ PASS | 8/8 pass |
| CI: Lint | ✅ PASS | 0 errors |
| Reviewer | ✅ PASS | 0 P0, 2 P1 |
| Tester | ✅ PASS | 0 P0, 1 P1 |
| Security scan | ✅ PASS | No secrets found |
| API compliance | ✅ PASS | All endpoints match |

## DoD: 10/10 PASS

## P1 Accepted (conditions)
| # | Finding | Owner | Fix by | Workaround |
|---|---------|-------|--------|-----------|
| 1 | Timer NaN for 0 sec | DEV | v0.9.1 | Set min=1 |
| 2 | Font preview missing | DEV | v0.9.1 | — (cosmetic) |
| 3 | Empty state no illustration | UX | v0.9.1 | Has text CTA |

## Rollback Plan
- `docker compose down && git checkout v0.8 && docker compose up -d --build`

## Post-Release
- [ ] Health check OK
- [ ] Settings CRUD works
- [ ] Widget renders
```

---

## 8. Output Template

```markdown
# Release Report: <Project> <Version>

## Decision: ✅ GO / ⚠️ GO with conditions / ❌ NO-GO

**Version:** <tag/commit>
**Date:** YYYY-MM-DD
**Scope:** <what's shipping>

## Evidence
| Source | Status | Details |
|--------|:------:|---------|
| CI: Unit | ✅/❌ | X/Y pass |
| CI: Integration | ✅/❌ | X/Y pass |
| Reviewer | ✅/❌ | P0: X, P1: Y |
| Tester | ✅/❌ | P0: X, P1: Y |
| Security | ✅/❌ | ... |
| API Compliance | ✅/❌ | ... |

## DoD Status
<section 5 checklist — X/10 PASS>

## Blocking Issues (if NO-GO)
| # | Issue | Owner | Fix plan |
|---|-------|-------|---------|
| 1 | ... | ... | ... |

## Accepted Risks (if GO with conditions)
| # | Risk | Owner | Fix by | Workaround |
|---|------|-------|--------|-----------|
| 1 | ... | ... | ... | ... |

## Rollback Plan
<commands to rollback>

## Post-Release Verification
<section 6 checklist>
```

---

## See also
- `$release_gate_checklist_template` — RG checklist (generate before this)
- `$gates` — gate definitions
- `$board` — project board tracking
