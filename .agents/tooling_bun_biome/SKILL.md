---
name: tooling_bun_biome
description: Tooling — Biome (lint/format) и Bun (runtime/package manager). biome.json конфиг, ключевые правила, Bun scripts, pre-commit hooks, CI pipeline, миграция с ESLint+Prettier. Активируй при настройке tooling, добавлении линтера, или при вопросах «как настроить Biome/Bun».
---

# Skill: Tooling (Bun + Biome) Beast Practices

Конкретные конфиги, команды и DO/DON'T для Biome (lint + format) и Bun (runtime + package manager).

**Разделы:**
1. [Biome: setup и конфиг](#1-biome-setup)
2. [Biome: ключевые правила](#2-ключевые-правила)
3. [Bun: runtime и package manager](#3-bun)
4. [Scripts (package.json)](#4-scripts)
5. [Pre-commit hooks](#5-pre-commit-hooks)
6. [CI Pipeline](#6-ci-pipeline)
7. [Миграция с ESLint + Prettier](#7-миграция)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Biome: setup

### Установка

```bash
# Через npm
npm install --save-dev --save-exact @biomejs/biome

# Через Bun
bun add --dev --exact @biomejs/biome

# Инициализация конфига
npx @biomejs/biome init
```

### ✅ DO: полный biome.json

```jsonc
// biome.json — корень проекта
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",

  "organizeImports": {
    "enabled": true
  },

  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,

      // Стиль
      "style": {
        "useConst": "error",
        "noVar": "error",
        "useTemplate": "warn",
        "noNonNullAssertion": "warn",
        "useImportType": "error"
      },

      // Подозрительный код
      "suspicious": {
        "noExplicitAny": "warn",
        "noConsoleLog": "warn",
        "noDebugger": "error",
        "noDoubleEquals": "error",
        "noFallthroughSwitchClause": "error",
        "noImplicitAnyLet": "warn"
      },

      // Производительность
      "performance": {
        "noAccumulatingSpread": "warn",
        "noDelete": "warn"
      },

      // Сложность
      "complexity": {
        "noForEach": "warn",
        "useFlatMap": "warn",
        "useOptionalChain": "error"
      },

      // Корректность
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error",
        "useExhaustiveDependencies": "warn",
        "useHookAtTopLevel": "error"
      },

      // Безопасность
      "security": {
        "noDangerouslySetInnerHtml": "error"
      },

      // a11y (JSX)
      "a11y": {
        "useButtonType": "error",
        "useAltText": "error",
        "noBlankTarget": "error"
      }
    }
  },

  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100,
    "lineEnding": "lf"
  },

  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "all",
      "semicolons": "always",
      "arrowParentheses": "always",
      "bracketSpacing": true,
      "jsxQuoteStyle": "double"
    }
  },

  "json": {
    "formatter": {
      "trailingCommas": "none"
    }
  },

  "files": {
    "ignore": [
      "node_modules",
      "dist",
      "build",
      ".next",
      "coverage",
      "*.min.js",
      "*.bundle.js"
    ],
    "maxSize": 1048576
  },

  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  }
}
```

### Monorepo конфиг

```jsonc
// biome.json (root)
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "linter": { "rules": { "recommended": true } },
  "formatter": { "indentStyle": "space", "indentWidth": 2 }
}

// apps/dashboard/biome.json (extends root)
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "extends": ["../../biome.json"],
  "linter": {
    "rules": {
      "suspicious": {
        "noConsoleLog": "off"  // разрешить console.log в dashboard
      }
    }
  }
}
```

---

## 2. Ключевые правила

### Правила по категориям

| Правило | Уровень | Почему важно |
|---------|---------|-------------|
| `useConst` | error | Не мутируемые переменные = `const` |
| `noVar` | error | `var` — hoisting баги |
| `noDoubleEquals` | error | `==` — неявные преобразования типов |
| `noUnusedVariables` | error | Мёртвый код |
| `noUnusedImports` | error | Чистый import tree |
| `noConsoleLog` | warn | Не оставлять debug логи (продакшн) |
| `noExplicitAny` | warn | TypeScript строгость |
| `useExhaustiveDependencies` | warn | React hooks deps |
| `useHookAtTopLevel` | error | Hooks rules |
| `noDangerouslySetInnerHtml` | error | XSS prevention |
| `useButtonType` | error | a11y: кнопка без type = submit |
| `useOptionalChain` | error | `?.` вместо `&&` chains |

### ✅ DO: настроить ignore для конкретного кода

```js
// ✅ Точечный ignore с обоснованием
// biome-ignore lint/suspicious/noConsoleLog: Intentional debug output for dev
console.log('Startup config:', config);

// ❌ Не игнорировать массово без причины
// biome-ignore lint: TODO fix later  ← ❌ нет причины
```

---

## 3. Bun

### Когда Bun vs npm

| Критерий | Bun ✅ | npm ✅ |
|---------|--------|-------|
| Скорость | ~25x install, ~3x runtime | Стандарт, гарантированная совместимость |
| Built-in test runner | `bun test` (Jest-compatible) | Нужен vitest/jest |
| Built-in bundler | `bun build` | Нужен webpack/vite |
| Совместимость | 99%+ npm compatible | 100% |
| CI/CD | Нужна установка Bun | Предустановлен |
| Production | Растёт, но npm стабильнее | Стандарт индустрии |

> [!IMPORTANT]
> Используй Bun только если разрешено проектом. Для продакшна → npm.
> Bun отлично для dev-loop: install, test, scripts.

### ✅ DO: основные Bun команды

```bash
# Package management
bun install                     # Install all deps (lockfile: bun.lockb)
bun add react @types/react      # Add dependency
bun add --dev vitest             # Add devDependency
bun remove lodash                # Remove dependency

# Scripts
bun run dev                      # Run script from package.json
bun run test                     # Run tests
bun run build                    # Build

# Direct execution
bun run src/server.js            # Run file directly
bun --watch src/server.js        # Run with watch mode

# Built-in test runner (Jest-compatible)
bun test                         # Run all tests
bun test --coverage              # With coverage
bun test src/utils.test.js       # Run specific test
```

### Bun vs npm commands mapping

| Задача | npm | Bun |
|--------|-----|-----|
| Install all | `npm install` | `bun install` |
| Add dep | `npm install react` | `bun add react` |
| Add devDep | `npm install -D vitest` | `bun add --dev vitest` |
| Remove | `npm uninstall lodash` | `bun remove lodash` |
| Run script | `npm run dev` | `bun run dev` |
| Execute | `npx vitest` | `bunx vitest` |
| Lockfile | `package-lock.json` | `bun.lockb` |

---

## 4. Scripts

### ✅ DO: стандартные scripts в package.json

```jsonc
{
  "scripts": {
    // Development
    "dev": "vite",
    "dev:debug": "vite --debug",

    // Build
    "build": "vite build",
    "preview": "vite preview",

    // Testing
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",

    // Quality
    "lint": "biome lint .",
    "lint:fix": "biome lint --write .",
    "format": "biome format --write .",
    "check": "biome check .",
    "check:fix": "biome check --write .",

    // All-in-one
    "quality": "biome check --write . && vitest run",

    // CI (no auto-fix, strict mode)
    "ci:lint": "biome ci .",
    "ci:test": "vitest run --reporter=junit --outputFile=test-results.xml"
  }
}
```

### Biome CLI commands explained

| Команда | Что делает | Когда |
|---------|-----------|-------|
| `biome check .` | Lint + Format + Import sorting (check only) | CI, pre-commit |
| `biome check --write .` | Lint fix + Format fix + Import sorting | Dev, save |
| `biome lint .` | Только lint (check) | Review |
| `biome lint --write .` | Lint с автофиксом | Dev |
| `biome format --write .` | Только format | Dev |
| `biome ci .` | Strict mode для CI (error on warnings) | CI pipeline |

---

## 5. Pre-commit hooks

### ✅ DO: lefthook (быстрее husky + lint-staged)

```bash
# Установка
npm install --save-dev lefthook
npx lefthook install
```

```yaml
# lefthook.yml
pre-commit:
  commands:
    biome:
      glob: "*.{js,jsx,ts,tsx,json,css}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true {staged_files}
      stage_fixed: true   # re-stage fixed files

    typecheck:
      glob: "*.{ts,tsx}"
      run: npx tsc --noEmit
```

### ✅ DO: альтернатива — husky + lint-staged

```bash
npm install --save-dev husky lint-staged
npx husky init
```

```jsonc
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json,css}": [
      "biome check --write --no-errors-on-unmatched --files-ignore-unknown=true"
    ]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged
```

---

## 6. CI Pipeline

### ✅ DO: GitHub Actions с Biome

```yaml
# .github/workflows/quality.yml
name: Quality Check

on:
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci

      # Biome: lint + format + import sorting (strict CI mode)
      - name: Biome CI
        run: npx @biomejs/biome ci .

      # TypeScript check
      - name: TypeScript
        run: npx tsc --noEmit

      # Tests
      - name: Tests
        run: npm run test -- --coverage

      # Upload coverage
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage
          path: coverage/
```

### ✅ DO: CI с Bun (если используется)

```yaml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - run: bun install --frozen-lockfile
      - run: bun run ci:lint
      - run: bun test --coverage
```

---

## 7. Миграция с ESLint + Prettier

### Пошаговый план

```bash
# 1. Установить Biome
npm install --save-dev --save-exact @biomejs/biome

# 2. Мигрировать конфиг
npx @biomejs/biome migrate eslint --write       # ESLint → Biome
npx @biomejs/biome migrate prettier --write     # Prettier → Biome

# 3. Проверить результат
npx @biomejs/biome check .

# 4. Исправить все ошибки
npx @biomejs/biome check --write .

# 5. Удалить старые зависимости
npm uninstall eslint prettier eslint-config-prettier eslint-plugin-react \
  eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 6. Удалить старые конфиги
rm -f .eslintrc* .prettierrc* .eslintignore .prettierignore

# 7. Обновить scripts в package.json
# "lint": "biome lint ."
# "format": "biome format --write ."

# 8. Обновить pre-commit hooks (если есть)

# 9. Обновить CI pipeline

# 10. Коммит
git add -A && git commit -m "chore: migrate from ESLint+Prettier to Biome"
```

### Маппинг ESLint → Biome

| ESLint правило | Biome эквивалент |
|----------------|-----------------|
| `no-unused-vars` | `correctness/noUnusedVariables` |
| `no-console` | `suspicious/noConsoleLog` |
| `eqeqeq` | `suspicious/noDoubleEquals` |
| `prefer-const` | `style/useConst` |
| `no-var` | `style/noVar` |
| `react-hooks/exhaustive-deps` | `correctness/useExhaustiveDependencies` |
| `react-hooks/rules-of-hooks` | `correctness/useHookAtTopLevel` |

---

## 8. Anti-patterns

| ❌ Anti-pattern | ✅ Решение |
|----------------|-----------|
| ESLint + Prettier + Biome одновременно | Выбрать одно: Biome заменяет оба |
| `biome-ignore` без причины | Всегда указывать причину после `:` |
| Разные formatter settings в IDE и CI | Единый `biome.json`, IDE reader |
| `npm run lint:fix` в CI | CI: `biome ci .` (без fix, strict mode) |
| Игнорировать warnings | Warning → error в CI через `biome ci` |
| Несколько lockfile (package-lock.json + bun.lockb) | Один package manager, один lockfile |
| `bun` в production без тестов совместимости | npm для prod, Bun для dev-loop |

---

## Краткая шпаргалка

| Задача | Команда |
|--------|---------|
| Init config | `npx @biomejs/biome init` |
| Check all | `npx @biomejs/biome check .` |
| Fix all | `npx @biomejs/biome check --write .` |
| Lint only | `npx @biomejs/biome lint .` |
| Format only | `npx @biomejs/biome format --write .` |
| CI strict | `npx @biomejs/biome ci .` |
| Migrate ESLint | `npx @biomejs/biome migrate eslint --write` |
| Migrate Prettier | `npx @biomejs/biome migrate prettier --write` |

---

## VS Code интеграция

```jsonc
// .vscode/settings.json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  },
  "[javascript]": { "editor.defaultFormatter": "biomejs.biome" },
  "[typescript]": { "editor.defaultFormatter": "biomejs.biome" },
  "[json]": { "editor.defaultFormatter": "biomejs.biome" },
  "[jsonc]": { "editor.defaultFormatter": "biomejs.biome" }
}
```

```jsonc
// .vscode/extensions.json
{
  "recommendations": ["biomejs.biome"]
}
```

---

## См. также
- `$es2025_beast_practices` — современный JavaScript (правила совпадают с Biome rules)
- `$testing_strategy_js` — Vitest конфигурация
- `$dev_reference_snippets` — примеры кода