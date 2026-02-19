---
name: release_gate_checklist_template
description: Generates a visible checklist RG-01...RG-xx (Evidence/DoD/Security/Ops/Post-deploy/Rollback) and status rules before release.
---

# Skill: Release Gate Checklist Template (RG-01…RG-xx)

## Goal
Before each release, create an **identical** release checklist so that the conductor can:
- collect evidence (reports/CI),
- check DoD,
- record risks,
- perform post-deploy smoke,
- provide a rollback plan.

## When to use
- Every time before the final decision on release (Release Gate).

## Inputs
- Release scope (what is releaseable)
- Version/tag/commit (if any)
- Links to environments (staging/prod) if available

## Exit
- Visible checklist **RG-01…RG-xx** with statuses:
  - TODO / IN-PROGRESS / BLOCKED / DONE
- Brief Evidence section (links/commits)
- Mini-summary “What else needs to be closed before GO”

## Template (create as is)
### Release Gate Checklist
- [ ] RG-01 (Evidence) Specify the release scope + version/tag/commit
- [ ] RG-02 (Evidence) CI green: unit tests PASS
- [ ] RG-03 (Evidence) CI green: integration tests PASS
- [ ] RG-04 (Evidence) Lint/format PASS (if available in CI)
- [ ] RG-05 (Evidence) Dependency/SCA audit PASS or risks are recorded
- [ ] RG-06 (Evidence) Reviewer report received (P0=0) + link to the report
- [ ] RG-07 (Evidence) Tester report received (P0=0) + PASS/FAIL/BLOCKED + link

- [ ] RG-08 (DoD) Secrets were not included in the code/logs (checks/scan/manual verification)
- [ ] RG-09 (DoD) There are startup/check instructions (runbook) that are up to date
- [ ] RG-10 (DoD) Basic safety confirmed: input validation + authz + hygiene

- [ ] RG-11 (Contracts) API conforms to contracts (error codes/formats/validation)
- [ ] RG-12 (Data) Data migrations/changes: application plan + reversibility (if any)
- [ ] RG-13 (Ops) Observability: request_id/trace_id and secure logs (no PII/secrets)
- [ ] RG-14 (Ops) Rate limiting / WAF / security headers (if applicable and provided)

- [ ] RG-15 (Release) Release notes/changes prepared
- [ ] RG-16 (Release) Feature flags/rollout strategy (if used) defined
- [ ] RG-17 (Rollback) Rollback plan is described and understandable
- [ ] RG-18 (Rollback) Backup/restore requirements are met (if there is a database/critical data)

- [ ] RG-19 (Post-deploy) Smoke test scenarios defined (minimum P0 flows)
- [ ] RG-20 (Post-deploy) Smoke test performed on the target environment (PASS)
- [ ] RG-21 (Post-deploy) Monitoring/alerts checked (errors/latency)

- [ ] RG-22 (Decision) Final decision: GO / NO-GO (+ reasons and conditions)

## Status rules
- If any point RG-02/03/06/07/08/09/10 fails → set BLOCKED and release = NO-GO.
- P0 from Reviewer or Tester → BLOCKED and release = NO-GO.
- P1 are allowed only with an explicit “Accepted Risks” with owner+deadline.

## Response format
### Release Gate Checklist (RG-xx) - with statuses
### Evidence Links
### What's Missing to Go