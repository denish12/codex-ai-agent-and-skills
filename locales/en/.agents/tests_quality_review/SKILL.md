---
name: tests_quality_review
description: Review of the quality of unit/integration tests: scenario coverage, boundaries, stability, absence of flakes and test “magic”.
---

# Skill: Tests Quality Review

## Check
- Tests check behavior, not implementation details
- There are happy + edge + error paths
- Integration tests actually test integration (API/DB/contracts), and are not “over-done”
- Tests are independent (no hidden order)
- Flakes: timings/random/external network → eliminated
- The names of the tests are readable, the structure is clear

## Exit
- Missing cases (list)
- Brittle tests (what to fix)
