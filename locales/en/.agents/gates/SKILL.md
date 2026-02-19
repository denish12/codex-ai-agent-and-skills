---
name: gates
description: Control of process gates and Definition of Done: do not skip stages, check for the presence of artifacts and verification criteria, organize return cycles (Dev↔Reviewer↔Tester).
---

# Skill: Gates & DoD (conductor quality control)

## Goal
Avoid “pseudo-readiness”: each stage should end with an artifact and verification.

## Gates (general logic)
- You cannot move forward if the previous stage did not give an artifact.
- Any P0 comments = stop, return for revision.

## Minimum artifacts by stage (template)
- PM: PRD + acceptance criteria
- UX: UX Spec (flows/screens/states/a11y/components)
- ARCH: Architecture + key decisions (ADR) + task plan
- DEV: code + unit+integration tests + run instructions
- REV: review report (P0/P1/P2) + result approve/changes
- TEST: test plan + test report + bugs

## DoD (universal conductor check)
You can mark “☑ ready” only if:
- tests pass (unit + integration),
- no secrets in the code/logs,
- there are startup/check instructions,
- basic security is met (validation, authz, dependencies),
- UX/UI: implemented loading/empty/error/success states according to UX Spec,
- a11y minimum completed (keyboard/focus/labels/ARIA where needed).

## “Return” algorithm
1) Reviewer/Test found the problem → create task `DEV-xx Fix...`
2) Put `REV-xx`/`TEST-xx` in `⚠️` until fixed
3) After the fix: repeat the review/test, close the gate