---
name: qa_e2e_playwright
description: Playwright-based E2E testing for CI/CD — automated spec files, page objects, visual regression, and pipeline integration. For manual testing inside Antigravity use $qa_browser_testing.
last_verified: 2026-03-11
version: 2.0
---

# Skill: E2E Playwright (CI/CD Automated)

## Purpose
Automated E2E regression suite using **Playwright** for the CI/CD pipeline.
Page Objects, spec files, visual snapshot comparison, and GitHub Actions integration.

> [!IMPORTANT]
> This skill is for automated CI/CD tests.
> For interactive testing inside Google Antigravity use `$qa_browser_testing`.

## When to use
- The project is mature enough for an E2E gate in CI/CD
- You need automated regression on each PR or deploy
- You need visual regression with baseline screenshots in CI
- The UI is stable enough to avoid chronic flakiness

## When not to use
- Interactive testing inside Antigravity -> `$qa_browser_testing`
- Wix/Shopify sandbox flows unavailable in CI -> `$qa_browser_testing`
- Unit/integration testing -> Vitest
- First unstable slice of UI -> tests will be flaky

## Project stack (SCR)
| Component | Technology | Location |
|-----------|-----------|----------|
| Unit/Integration | **Vitest** | `apps/*/vitest.config.js` |
| E2E | **Playwright** | `apps/dashboard/e2e/` |
| Wix Test Utils | `@wix/wix-ui-test-utils` | node_modules |
| Wix UniDriver | `@wix/unidriver-playwright` | node_modules |

## Setup
1. Install:
```bash
cd apps/dashboard
npm init playwright@latest -- --yes --browser=chromium --lang=js
```
2. Add `playwright.config.js` with trace/screenshot/video in CI.
3. Create `fixtures/`, `pages/`, `specs/`, and `screenshots/expected/` inside `apps/dashboard/e2e/`.

## Page Object Model
Use page objects for key pages and keep selectors stable.
Prefer `data-testid` over fragile CSS selectors.

## Test patterns
- Happy path: critical flow succeeds end to end
- Error path: validation and failure states are asserted
- UI state coverage: loading / empty / error / success
- Visual regression: compare key components with approved baselines

Example visual assertion:
```js
await expect(page.locator('[data-testid="popup-container"]')).toHaveScreenshot('glassmorphism-popup.png', {
  maxDiffPixelRatio: 0.05,
  threshold: 0.2,
});
```

## Run commands
```bash
npx playwright test
npx playwright test e2e/specs/widget-design.spec.js
npx playwright test --ui
npx playwright test --headed
npx playwright test --update-snapshots
npx playwright show-report
```

## CI/CD pipeline
```yaml
# .github/workflows/e2e.yml
e2e-tests:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20 }
    - run: npm ci
      working-directory: apps/dashboard
    - run: npx playwright install --with-deps chromium
      working-directory: apps/dashboard
    - run: npx playwright test
      working-directory: apps/dashboard
```

## Anti-patterns
- CSS selectors instead of `data-testid`
- `page.waitForTimeout(...)` instead of proper waits
- E2E for logic already covered by unit tests
- Shared state between tests
- Hard-coded data inside specs
- Ignoring flaky tests instead of stabilizing or removing them
- Full-page screenshots when component-level snapshots are enough

## Definition of Done
- [ ] Critical flows from Test Plan are covered
- [ ] Each test has a happy path and at least one error path
- [ ] Page Objects exist for key pages
- [ ] `data-testid` is added for interactive elements
- [ ] Baseline screenshots are approved
- [ ] No flaky failures across 3 consecutive runs
- [ ] CI pipeline is configured
- [ ] Run command is documented in README

## Deliverables
- Spec files in `apps/dashboard/e2e/specs/`
- Page Objects in `apps/dashboard/e2e/pages/`
- `playwright.config.js`
- CI/CD pipeline config
- Requested `data-testid` inventory for DEV
