---
name: tdd_workflow
description: Development strictly according to TDD (RED-GREEN-REFACTOR) with unit+integration tests and target coverage; e2e for critical flows as needed.
---

# Skill: TDD Workflow

## Target
Ensure reliability of changes and confident refactoring.

## Rules
- Tests are written BEFORE the code (RED → GREEN → REFACTOR).
- Tests test behavior, not implementation details.
- Minimum: unit + integration. E2E - for critical user flows (by decision of the conductor/architect).

## Exit
- A set of tests for the feature + implementation + coverage/risk report.

## Algorithm
1) Formulate the user journey (role → action → value).
2) Generate test cases (happy path + edge cases + error paths).
3) Run the tests (they should fail).
4) Implement the minimum code to the green.
5) Refactoring (readability, DRY, architectural boundaries).
6) Check coverage (project threshold) and absence of flakes.

## Mistakes to avoid
- Tests for internal state instead of external behavior
- Fragile selectors
- Dependence of tests on each other
- Skip error-path tests

## See also
- For code examples see $dev_reference_snippets