---
name: tooling-bun-biome
description: Tooling — Biome (lint/format) and Bun (runtime/package manager). biome.json config, key rules, Bun scripts, pre-commit hooks, CI pipeline, migration from ESLint+Prettier. Activate when setting up tooling, adding a linter, or for questions "how to set up Biome/Bun".
---

# Skill: Tooling (Bun + Biome) Beast Practices

Specific configs, commands and DO/DON'T for Biome (lint + format) and Bun (runtime + package manager).

**Sections:**
1. [Biome: setup and config](#1-biome-setup)
2. [Biome: key rules](#2-key-rules)
3. [Bun: runtime and package manager](#3-bun)
4. [Scripts (package.json)](#4-scripts)
5. [Pre-commit hooks](#5-pre-commit-hooks)
6. [CI Pipeline](#6-ci-pipeline)
7. [Migration from ESLint + Prettier](#7-migration)
8. [Anti-patterns](#8-anti-patterns)

---

## 1. Biome: setup

### Installation

```bash
# Via npm
npm install --save-dev --save-exact @biomejs/biome

# Via Bun
bun add --dev --exact @biomejs/biome

# Init config
npx @biomejs/biome init
```

### ✅ DO: full biome.json

```jsonc
// biome.json — project root
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",

  "organizeImports": {
    "enabled": true
  },

  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,

      // Style
      "style": {
        "useConst": "error",
        "noVar": "error",
        "useTemplate": "warn",
        "noNonNullAssertion": "warn",
        "useImportType": "error"
      },

      // Suspicious code
      "suspicious": {
        "noExplicitAny": "warn",
        "noConsoleLog": "warn",
        "noDebugger": "error",
        "noDoubleEquals": "error",
        "noFallthroughSwitchClause": "error",
        "noImplicitAnyLet": "warn"
      },

      // Performance
      "performance": {
        "noAccumulatingSpread": "warn",
        "noDelete": "warn"
      },

      // Complexity
      "complexity": {
        "noForEach": "warn",
        "useFlatMap": "warn",
        "useOptionalChain": "error"
      },

      // Correctness
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error",
        "useExhaustiveDependencies": "warn",
        "useHookAtTopLevel": "error"
      },

      // Security
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

### Monorepo config

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
        "noConsoleLog": "off"  // allow console.log in dashboard
      }
    }
  }
}
```

---

## 2. Key rules

### Rules by category

| Rule | Level | Why it's important |
|---------|---------|-------------|
| `useConst` | error | Immutable variables = `const` |
| `noVar` | error | `var` — hoisting bugs |
| `noDoubleEquals` | error | `==` — implicit type conversions |
| `noUnusedVariables` | error | Dead code |
| `noUnusedImports` | error | Clean import tree |
| `noConsoleLog` | warn | Do not leave debug logs (production) |
| `noExplicitAny` | warn | TypeScript strictness |
| `useExhaustiveDependencies` | warn | React hooks deps |
| `useHookAtTopLevel` | error | Hooks rules |
| `noDangerouslySetInnerHtml` | error | XSS prevention |
| `useButtonType` | error | a11y: button without type = submit |
| `useOptionalChain` | error | `?.` instead of `&&` chains |

### ✅ DO: ignore for specific code

```js
// ✅ Specific ignore with justification
// biome-ignore lint/suspicious/noConsoleLog: Intentional debug output for dev
console.log('Startup config:', config);

// ❌ Do not ignore massively without reason
// biome-ignore lint: TODO fix later  ← ❌ no reason
```

---

## 3. Bun

### When Bun vs npm

| Criterion | Bun ✅ | npm ✅ |
|---------|--------|-------|
| Speed | ~25x install, ~3x runtime | Standard, guaranteed compatibility |
| Built-in test runner | `bun test` (Jest-compatible) | Needs vitest/jest |
| Built-in bundler | `bun build` | Needs webpack/vite |
| Compatibility | 99%+ npm compatible | 100% |
| CI/CD | Needs Bun installation | Pre-installed |
| Production | Growing, but npm is more stable | Industry standard |

> [!IMPORTANT]
> Use Bun only if allowed by the project. For production → npm.
> Bun is great for dev-loop: install, test, scripts.

### ✅ DO: basic Bun commands

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

| Task | npm | Bun |
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

### ✅ DO: standard scripts in package.json

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

| Command | What it does | When |
|---------|-----------|-------|
| `biome check .` | Lint + Format + Import sorting (check only) | CI, pre-commit |
| `biome check --write .` | Lint fix + Format fix + Import sorting | Dev, save |
| `biome lint .` | Lint only (check) | Review |
| `biome lint --write .` | Lint with autofix | Dev |
| `biome format --write .` | Format only | Dev |
| `biome ci .` | Strict mode for CI (error on warnings) | CI pipeline |

---

## 5. Pre-commit hooks

### ✅ DO: lefthook (faster than husky + lint-staged)

```bash
# Installation
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

### ✅ DO: alternative — husky + lint-staged

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

### ✅ DO: GitHub Actions with Biome

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

### ✅ DO: CI with Bun (if used)

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

## 7. Migration from ESLint + Prettier

### Step-by-step plan

```bash
# 1. Install Biome
npm install --save-dev --save-exact @biomejs/biome

# 2. Migrate config
npx @biomejs/biome migrate eslint --write       # ESLint → Biome
npx @biomejs/biome migrate prettier --write     # Prettier → Biome

# 3. Check result
npx @biomejs/biome check .

# 4. Fix all errors
npx @biomejs/biome check --write .

# 5. Remove old dependencies
npm uninstall eslint prettier eslint-config-prettier eslint-plugin-react \
  eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 6. Remove old configs
rm -f .eslintrc* .prettierrc* .eslintignore .prettierignore

# 7. Update scripts in package.json
# "lint": "biome lint ."
# "format": "biome format --write ."

# 8. Update pre-commit hooks (if setup)

# 9. Update CI pipeline

# 10. Commit
git add -A && git commit -m "chore: migrate from ESLint+Prettier to Biome"
```

### ESLint → Biome mapping

| ESLint rule | Biome equivalent |
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

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| ESLint + Prettier + Biome together | Choose one: Biome replaces both |
| `biome-ignore` without reason | Always specify reason after `:` |
| Different formatter settings in IDE and CI | Universal `biome.json`, IDE reader |
| `npm run lint:fix` in CI | CI: `biome ci .` (without fix, strict mode) |
| Ignore warnings | Warning → error in CI via `biome ci` |
| Multiple lockfiles (package-lock.json + bun.lockb) | One package manager, one lockfile |
| `bun` in production without compatibility tests | npm for prod, Bun for dev-loop |

---

## Quick Cheat Sheet

| Task | Command |
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

## VS Code integration

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

## See also
- `$es2025-beast-practices` — modern JavaScript (rules match Biome rules)
- `$testing-strategy-js` — Vitest configuration
- `$dev-reference-snippets` — code examples