---
name: qa_e2e_playwright
description: E2E testing with Playwright for critical user journeys: happy path, edge cases, network failures, selector stability, test data, and run artifacts. Use when end-to-end UI flow coverage must be designed, implemented, or verified.
---

# Skill: QA E2E Playwright

## Purpose
Design and execute reliable end-to-end verification for critical user journeys with Playwright.

## When to use
- A critical user flow needs end-to-end coverage.
- A regression must be reproduced at the UI and integration level.
- A release gate needs an E2E smoke or regression suite.

## Workflow
1. Define the critical scenarios, risks, and expected outcomes.
2. Lock preconditions: environment, test data, roles, and feature flags.
3. Design stable selectors and steps without coupling tests to fragile markup.
4. Implement happy path, error path, and key edge cases.
5. Collect run artifacts: trace, screenshot, video, and console or network evidence on failures.
6. Return the result with coverage, failures, flake risk, and release impact.

## Deliverables
- Playwright test cases for critical scenarios.
- Preconditions and test data setup notes.
- Run report with artifacts, failures, and risks.

## Boundaries / Non-goals
- Do not replace E2E coverage with unit or integration tests.
- Do not rely on fragile selectors when roles, labels, or test ids are available.
- Do not hide flaky behavior; call it out explicitly.

## Done criteria
- Critical scenarios are reproducible and checked reliably.
- Failures include enough artifacts for diagnosis.
- The final result is strong enough to support a release decision.
