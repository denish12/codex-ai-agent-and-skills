---
description: Launch the shortened 4-gate pipeline for bug fixes. Use instead of /start-task for bugfix tasks.
---

# /bugfix — Launch Bugfix Pipeline (4 gates)

> 🟢 **Mode:** Bugfix — for fixing bugs in existing functionality.
> Full pipeline: `/start-task`. Hotfix (trivial): `/hotfix`.

## When to use

- Bug in logic, API errors, broken validation, data issues
- Affects > 2 files or non-trivial blast radius
- Does NOT change UI layout, does NOT add new API, does NOT change data schema (otherwise → `/start-task`)

## Step 0: Load rules

Execute `/pipeline-rules` — read the rules BEFORE starting work.

## Step 1: CONDUCTOR — Classification

1. Execute `view_file` on `agents/conductor.md`
2. Confirm the task = bugfix (per Decision Tree)
3. Create Mini Checklist:
```
[ ] BF-DEV-01   Fix + TDD + Handoff Envelope
[ ] BF-REV-01   Code review + regression check + Handoff Envelope
[ ] BF-TEST-01  Verification + regression smoke + GO/NO-GO
```
4. `notify_user` → wait for **Approved**

## Step 2: DEV — TDD Fix

1. Execute `view_file` on `agents/senior_full_stack.md`
2. Follow the protocol (skipping §1 UX review and §6 DEMO):
   - §0: Context + read skills
   - §2: Analyze bug + root cause
   - §3: RED — write a failing test reproducing the bug
   - §4: GREEN — minimal code to make the test pass
   - §5: REFACTOR — improve without changing behavior
   - §7: JSDoc on modified functions
3. Restart affected services if applicable
4. Form Handoff Envelope → REV
5. `notify_user` → wait for **Approved**

## Step 3: REV — Code Review

1. Execute `view_file` on `agents/reviewer.md`
2. Review focus:
   - Does the test actually reproduce the bug (RED phase)?
   - Does the fix create side effects?
   - Is regression risk assessed?
   - Is JSDoc in place?
3. Form Handoff Envelope → TEST
4. `notify_user` → wait for **Approved**

## Step 4: TEST — Verification

1. Execute `view_file` on `agents/tester.md`
2. Verify:
   - Bug is fixed (per reproduction steps)
   - No regression (smoke on affected modules)
   - Tests pass (CI green)
3. Issue verdict: **GO ✅ / NO-GO ❌**
4. `notify_user` → wait for **Approved**

---

## On FAIL at REV or TEST

1. Agent produces FAIL Report + Handoff → DEV
2. DEV fixes → Handoff → REV → TEST (cycle repeats)
3. Approved is required at every gate

---

## Prompt template

```
@AGENTS.md /bugfix

Bug: [bug description, 1-2 sentences].
Reproduction: [steps, if known].
Files: [affected files, if known].

Rules:
1. Bugfix Pipeline: CONDUCTOR → DEV → REV → TEST
2. TDD is mandatory (RED → GREEN → REFACTOR)
3. Approved at every gate
```
