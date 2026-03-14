---
name: qa_e2e_playwright
description: E2E testing via Playwright for CI/CD — automated spec files, page objects, visual regression, pipeline integration. For manual testing in Antigravity → $qa_browser_testing.
last_verified: 2026-03-11
version: 2.0
---

# Skill: E2E Playwright (CI/CD Automated)

## Purpose

Automated E2E regression suite via **Playwright** for CI/CD pipeline.
Page Objects, spec files, visual snapshot comparison, GitHub Actions.

> [!IMPORTANT]
> This skill is for **automated tests in CI/CD**.
> For interactive testing in Google Antigravity → `$qa_browser_testing`.

---

## When to use

- Project has grown to a CI/CD pipeline with an E2E gate
- Automatic regression is needed on every PR/deploy
- Visual regression: pixel-perfect comparison in CI
- Stable UI that won't be frequently flaky

## When NOT to use

- Testing within Antigravity → `$qa_browser_testing`
- Wix/Shopify sandbox (no access from CI) → `$qa_browser_testing`
- Unit/integration → Vitest
- First slice / unstable UI → tests will be flaky

---

## Project Stack (SCR)

| Component | Technology | Location |
|-----------|-----------|-------------|
| Unit/Integration | **Vitest** | `apps/*/vitest.config.js` |
| E2E | **Playwright** | `apps/dashboard/e2e/` (create) |
| Wix Test Utils | `@wix/wix-ui-test-utils` | In node_modules |
| Wix UniDriver | `@wix/unidriver-playwright` | In node_modules |

---

## Setup

### 1. Installation

```bash
cd apps/dashboard
npm init playwright@latest -- --yes --browser=chromium --lang=js
```

### 2. Configuration: `playwright.config.js`

```js
// apps/dashboard/playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL || 'https://manage.wix.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'wix-dashboard',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

### 3. Directory structure

```
apps/dashboard/e2e/
├── fixtures/
│   ├── auth.fixture.js      # Auth (storageState)
│   └── test-data.js          # Test data
├── pages/
│   ├── BasePage.js            # Base page object
│   ├── WidgetDesignPage.js    # Widget Design Editor
│   ├── RulesTriggersPage.js   # Rules & Triggers
│   └── CouponsPage.js         # Coupons Management
├── specs/
│   ├── widget-design.spec.js  # Widget editor E2E
│   ├── coupon-flow.spec.js    # Coupon CRUD
│   └── visual-parity.spec.js  # Screenshot comparison
└── screenshots/
    └── expected/              # Baseline screenshots
```

---

## Page Object Model

### BasePage

```js
/**
 * Base page object for all dashboard pages.
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Waits for the page to load.
   * @param {string} contentSelector - CSS selector of the main content.
   * @param {number} [timeout=10000] - wait timeout in ms.
   */
  async waitForPageLoad(contentSelector, timeout = 10_000) {
    await this.page.waitForSelector(contentSelector, {
      state: 'visible',
      timeout,
    });
  }

  /**
   * Takes a component screenshot for visual parity.
   * @param {string} name - screenshot name.
   * @returns {Promise<Buffer>} screenshot.
   */
  async takeScreenshot(name) {
    return this.page.screenshot({
      path: `e2e/screenshots/actual/${name}.png`,
      fullPage: true,
    });
  }
}
```

---

## Test Patterns

### Happy Path

```js
import { test, expect } from '@playwright/test';
import { WidgetDesignPage } from '../pages/WidgetDesignPage.js';

test.describe('Widget Design Editor', () => {
  test('should select template and save', async ({ page }) => {
    const editor = new WidgetDesignPage(page);
    await editor.waitForPageLoad('[data-testid="widget-editor"]');
    await editor.selectTemplate('Glassmorphism');
    await editor.fillFields({ headline: 'Special Offer!', coupon: 'SAVE20' });
    await editor.save();

    await expect(editor.livePreview).toContainText('Special Offer!');
  });
});
```

### Error Path

```js
test('should show validation error for empty coupon', async ({ page }) => {
  const editor = new WidgetDesignPage(page);
  await editor.waitForPageLoad('[data-testid="widget-editor"]');
  await editor.fillFields({ coupon: '' });
  await editor.save();

  const error = page.locator('[data-testid="coupon-error"]');
  await expect(error).toBeVisible();
});
```

### UI States

```js
test('should show empty state when no templates', async ({ page }) => {
  await page.route('**/api/templates', (route) =>
    route.fulfill({ status: 200, body: '[]', headers: { 'Content-Type': 'application/json' } }),
  );
  await page.reload();
  await expect(page.locator('[data-testid="empty-state"]')).toContainText('No templates');
});
```

---

## Visual Regression

> [!IMPORTANT]
> **Source of truth is determined by the UX Designer** (mandatory question #2).
> Baseline screenshots depend on the chosen source.

```js
test('visual parity: popup matches design', async ({ page }) => {
  await page.goto('/preview/glassmorphism');
  const popup = page.locator('[data-testid="popup-container"]');
  await expect(popup).toHaveScreenshot('glassmorphism-popup.png', {
    maxDiffPixelRatio: 0.05,
    threshold: 0.2,
  });
});
```

```bash
# Update baseline
npx playwright test --update-snapshots
```

---

## Naming Convention

```
[feature].spec.js             — tests
[feature].visual.spec.js      — visual regression
[PageName].js                  — page objects

# Test IDs (data-testid)
[component]-[element]          → popup-container
[component]-[element]-[state]  → save-button-disabled
```

> [!WARNING]
> DEV must add `data-testid` for all interactive elements.

---

## Execution

```bash
npx playwright test                              # All
npx playwright test e2e/specs/widget-design.spec.js  # One spec
npx playwright test --ui                         # Debug UI
npx playwright test --headed                     # Headed
npx playwright test --update-snapshots           # Update baseline
npx playwright show-report                       # Report
```

---

## CI/CD Pipeline

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
    - uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: playwright-report
        path: apps/dashboard/playwright-report/
```

---

## Anti-patterns

- ❌ CSS selectors (`.class-name`) — brittle, use only `data-testid`
- ❌ `page.waitForTimeout(3000)` — use `waitForSelector`
- ❌ E2E for logic covered by unit tests — redundant
- ❌ Tests depending on each other — each test is isolated
- ❌ Hard-coded data in specs — move to `fixtures/test-data.js`
- ❌ Ignoring flaky tests — stabilize or delete
- ❌ Screenshot of the whole page — screenshot the **specific component**

---

## Definition of Done

- [ ] Critical flows from Test Plan are covered by E2E
- [ ] Each test: happy path + ≥1 error path
- [ ] Page Objects for key pages
- [ ] `data-testid` added (DEV)
- [ ] Baseline screenshots approved
- [ ] No flaky tests (3 runs stable)
- [ ] CI pipeline configured
- [ ] Run command in README

---

## Deliverables

- Spec files: `apps/dashboard/e2e/specs/`
- Page Objects: `apps/dashboard/e2e/pages/`
- `playwright.config.js`
- CI/CD pipeline config
- List of `data-testid` (request from DEV)
