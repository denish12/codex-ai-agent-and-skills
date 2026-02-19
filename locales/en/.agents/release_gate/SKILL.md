---
name: release_gate
description: Final release gate: collect Reviewer+Tester+CI reports, check DoD, classify risks, make a GO/NO-GO decision and form a closure plan.
---

#Skill: Release Gate

## Goal
Make a release decision (GO/NO-GO) based on DoD, review/testing reports and CI/CD status.

## Required condition
Before starting the release gate, the conductor must generate a checklist via: $release_gate_checklist_template

## Inputs
- Reviewer report (P0/P1/P2 + suggested fixes)
- Tester report (PASS/FAIL/BLOCKED + bugs P0/P1/P2 + evidence)
- CI results (unit/integration, lint/format, security/dependency checks if available)
- Release notes / list of changes (what is being released)
- General DoD
- Release Gate Checklist (RG-01…RG-xx) with statuses

## Release Criteria (strict)
### NO-GO (release prohibited)
- There is **P0** from Reviewer or Tester
- Unit or Integration tests DO NOT pass
- There is a risk of leaking secrets/PII in code/logs
- No runbook instructions for changes
- Critical UX flow is broken or blocked (BLOCKED without bypass)
- API non-compliance with contracts, breaking the client (P0)

### GO with conditions (only allowed if agreed upon in advance)
- There are P1/P2, but:
  - there are workaround/mitigation measures,
  - there are established tasks with priority and owner,
  - the risk is described and accepted.

## DoD Checklist (required)
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Secrets are not included in the code/logs
- [ ] There are run/check instructions (local/CI)
- [ ] Basic security: input validation, authorization, dependency hygiene

## Process (steps)
1) Make sure that the RG checklist ($release_gate_checklist_template) has been created and the statuses have been entered.
2) Collect input artifacts: Reviewer report, Tester report, CI status.
3) Combine Findings into a single list: P0/P1/P2, owner, task link, status.
4) Run the DoD checklist and mark PASS/MISSING.
5) Make a GO/NO-GO decision (or GO-with-conditions if used).
6) Generate a Release Report and update RG-22 (Decision).

## Output: Release Report (template)
###Release Decision
- Decision: GO / NO-GO / GO-with-conditions
- Version/Tag: <if available>
- Scope: <briefly what we are releasing>

### Evidence
- CI: PASS/FAIL (link/commit)
- Reviewer: PASS/MISSING + P0/P1/P2 count
- Tester: PASS/FAIL/BLOCKED + bugs P0/P1/P2 count

###DoD Status
- Checklist: PASS/MISSING (with missing list)

### Blocking Issues (if NO-GO)
- [ ] ID / Description / Owner / How to reproduce / Fix plan

### Accepted Risks (if GO-with-conditions)
- Risk → impact → mitigation → owner → deadline

###Next Actions
- RG-01...
- RG-02...

## See also
- Checklist template: $release_gate_checklist_template