---
name: qa_e2e_playwright
description: E2E-тестирование через Playwright для CI/CD — автоматизированные spec-файлы, page objects, visual regression, pipeline интеграция. Для ручного тестирования в Antigravity → $qa_browser_testing.
last_verified: 2026-03-11
version: 2.0
---

# Skill: E2E Playwright (CI/CD Automated)

## Назначение

Автоматизированный E2E regression suite через **Playwright** для CI/CD pipeline.
Page Objects, spec-файлы, visual snapshot comparison, GitHub Actions.

> [!IMPORTANT]
> Этот скил — для **автоматизированных тестов в CI/CD**.
> Для интерактивного тестирования в Google Antigravity → `$qa_browser_testing`.

---

## Когда использовать

- Проект дорос до CI/CD pipeline c E2E gate
- Нужен автоматический regression на каждый PR/deploy
- Visual regression: pixel-perfect сравнение в CI
- Стабильный UI, который не будет часто flaky

## Когда НЕ использовать

- Тестирование внутри Antigravity → `$qa_browser_testing`
- Wix/Shopify sandbox (нет доступа из CI) → `$qa_browser_testing`
- Unit/integration → Vitest
- Первый срез / нестабильный UI → тесты будут flaky

---

## Стек проекта (SCR)

| Компонент | Технология | Расположение |
|-----------|-----------|-------------|
| Unit/Integration | **Vitest** | `apps/*/vitest.config.js` |
| E2E | **Playwright** | `apps/dashboard/e2e/` (создать) |
| Wix Test Utils | `@wix/wix-ui-test-utils` | В node_modules |
| Wix UniDriver | `@wix/unidriver-playwright` | В node_modules |

---

## Setup

### 1. Установка

```bash
cd apps/dashboard
npm init playwright@latest -- --yes --browser=chromium --lang=js
```

### 2. Конфигурация: `playwright.config.js`

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

### 3. Структура директории

```
apps/dashboard/e2e/
├── fixtures/
│   ├── auth.fixture.js      # Auth (storageState)
│   └── test-data.js          # Тестовые данные
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
    └── expected/              # Baseline скриншоты
```

---

## Page Object Model

### BasePage

```js
/**
 * Базовый page object для всех страниц dashboard.
 */
export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page instance.
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Ожидает загрузку страницы.
   * @param {string} contentSelector - CSS-селектор основного контента.
   * @param {number} [timeout=10000] - таймаут ожидания в мс.
   */
  async waitForPageLoad(contentSelector, timeout = 10_000) {
    await this.page.waitForSelector(contentSelector, {
      state: 'visible',
      timeout,
    });
  }

  /**
   * Делает скриншот компонента для visual parity.
   * @param {string} name - имя скриншота.
   * @returns {Promise<Buffer>} скриншот.
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

## Тест-паттерны

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
> **Source of truth определяется UX Designer** (обязательный вопрос #2).
> Baseline-скриншоты зависят от выбранного источника.

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
# Обновить baseline
npx playwright test --update-snapshots
```

---

## Naming Convention

```
[feature].spec.js             — тесты
[feature].visual.spec.js      — visual regression
[PageName].js                  — page objects

# Test IDs (data-testid)
[component]-[element]          → popup-container
[component]-[element]-[state]  → save-button-disabled
```

> [!WARNING]
> DEV обязан добавить `data-testid` для всех интерактивных элементов.

---

## Запуск

```bash
npx playwright test                              # Все
npx playwright test e2e/specs/widget-design.spec.js  # Один spec
npx playwright test --ui                         # Debug UI
npx playwright test --headed                     # Headed
npx playwright test --update-snapshots           # Обновить baseline
npx playwright show-report                       # Отчёт
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

- ❌ CSS-селекторы (`.class-name`) — хрупко, только `data-testid`
- ❌ `page.waitForTimeout(3000)` — использовать `waitForSelector`
- ❌ E2E для логики, покрытой unit-тестами — избыточно
- ❌ Зависимость тестов друг от друга — каждый тест изолирован
- ❌ Hard-coded данные в спеках — выносить в `fixtures/test-data.js`
- ❌ Игнорировать flaky — стабилизировать или удалить
- ❌ Скриншот всей страницы — скриншотить **конкретный компонент**

---

## Definition of Done

- [ ] Critical flows из Test Plan покрыты E2E
- [ ] Каждый тест: happy path + ≥1 error path
- [ ] Page Objects для ключевых страниц
- [ ] `data-testid` добавлены (DEV)
- [ ] Baseline-скриншоты согласованы
- [ ] Нет flaky (3 прогона стабильно)
- [ ] CI pipeline настроен
- [ ] Команда запуска в README

---

## Deliverables

- Spec-файлы: `apps/dashboard/e2e/specs/`
- Page Objects: `apps/dashboard/e2e/pages/`
- `playwright.config.js`
- CI/CD pipeline config
- Список `data-testid` (запрос к DEV)
