---
name: code_review_checklist
description: Universal review checklist — code quality, readability, testability, security, contracts, Definition of Done.
---

# Skill: Universal Code Review Checklist

Checklist for the Reviewer Agent or self-review before handoff.

**Sections:**
1. [When to use](#1-when-to-use)
2. [Checklist](#2-checklist)
3. [Reviewer's Output Format](#3-reviewer-output)
4. [Anti-patterns](#4-anti-patterns)

---

## 1. When to use

Use this checklist *after* the Senior Full Stack developer has finished coding, but *before* passing the task to QA (Tester) or closing it.

The Reviewer Agent uses this checklist as the primary framework.

---

## 2. Checklist

### 2.1 Definition of Done (DoD)

| # | Check | Severity | Status |
|---|-------|----------|--------|
| REV-01 | PRD requirements are met (no missing scope) | 🔴 P0 | ☐ |
| REV-02 | Code runs without crashing (no obvious syntax errors) | 🔴 P0 | ☐ |
| REV-03 | UX Spec visually matched (no missing UI elements) | 🔴 P0 | ☐ |
| REV-04 | No `console.log` or debug code left behind | 🟠 P1 | ☐ |

### 2.2 Architecture & Contracts

| # | Check | Severity | Status |
|---|-------|----------|--------|
| REV-05 | Code follows `$architecture_doc` layers | 🔴 P0 | ☐ |
| REV-06 | API implementation matches `$api_contracts` exactly | 🔴 P0 | ☐ |
| REV-07 | New data model (if any) is documented | 🟠 P1 | ☐ |
| REV-08 | ADR created if a significant architectural choice was made | 🟠 P1 | ☐ |

### 2.3 Code Quality & Best Practices

| # | Check | Severity | Status |
|---|-------|----------|--------|
| REV-09 | ESLint / Type checking passes (no red squiggles) | 🔴 P0 | ☐ |
| REV-10 | Meaningful variable/function naming (no `data1`, `temp`) | 🟠 P1 | ☐ |
| REV-11 | JSDoc present for all functions | 🔴 P0 | ☐ |
| REV-12 | Functions are short and focused (< 40 lines ideally) | 🟠 P1 | ☐ |
| REV-13 | No magic numbers or hardcoded strings | 🟠 P1 | ☐ |
| REV-14 | React: No useless re-renders, correct memoization | 🟠 P1 | ☐ |
| REV-15 | Go: correct error handling (`if err != nil`), no hidden panics | 🔴 P0 | ☐ |

### 2.4 Error Handling & Logging

| # | Check | Severity | Status |
|---|-------|----------|--------|
| REV-16 | Errors are caught (try/catch or `.catch()`) and handled | 🔴 P0 | ☐ |
| REV-17 | Error format follows contract (`{ error: { code, message } }`) | 🔴 P0 | ☐ |
| REV-18 | Structured logging used for significant events (not just `console.error`) | 🟠 P1 | ☐ |

### 2.5 Security Basics

| # | Check | Severity | Status |
|---|-------|----------|--------|
| REV-19 | Inputs are validated against boundary schemas (e.g., Zod) | 🔴 P0 | ☐ |
| REV-20 | Protected routes check Auth properly | 🔴 P0 | ☐ |
| REV-21 | No secrets (API keys, passwords) in code or frontend bundle | 🔴 P0 | ☐ |
| REV-22 | Safe HTML rendering (dangerouslySetInnerHTML only if sanitized) | 🔴 P0 | ☐ |

### 2.6 Testing

| # | Check | Severity | Status |
|---|-------|----------|--------|
| REV-23 | Unit tests written or updated for new logic | 🔴 P0 | ☐ |
| REV-24 | Tests pass successfully | 🔴 P0 | ☐ |
| REV-25 | Edge cases and error paths tested | 🟠 P1 | ☐ |

---

## 3. Reviewer's Output Format

If passing the review:

```markdown
# Code Review: Approved

All checks passed.
- **DoD:** Met
- **Code Quality:** Good, proper TDD cycle used.
- **Contracts:** API matches spec perfectly.

**Next Action:** Handoff to Tester Agent.
```

If requesting changes:

```markdown
# Code Review: Changes Requested

## P0 Blockers (Must Fix)
- **REV-11 (JSDoc):** `calculateTotal()` in `src/utils/cart.js:45` is missing JSDoc.
- **REV-19 (Security):** `POST /checkout` is missing Zod body validation.

## P1 Recommendations (Should Fix)
- **REV-13 (Code Quality):** Hardcoded tax rate `0.2` in `cart.js:52`. Extract to constant.
- **REV-14 (React):** Define `fetchData` outside `useEffect` or wrap in `useCallback` in `Cart.tsx:20`.

**Next Action:** Return to Senior Full Stack to fix P0/P1 issues.
```

---

## 4. Anti-patterns

| ❌ Anti-pattern | ✅ Solution |
|----------------|-----------|
| **Rubber stamping** | Actually run `npm run test` or check the code logic. Don't just say "LGTM". |
| **Nitpicking without P0/P1 labels** | Clearly separate blockers (P0) from stylistic suggestions (P2). |
| **Ignoring the contract** | The code might be beautiful but if it returns HTTP 200 instead of 201 as per `$api_contracts`, it's a bug. |
| **Skipping security checks** | Always check for input validation and auth boundaries. |

---

## See also
- `$api_contract_compliance_review` — Deeper dive into API contracts.
- `$architecture_compliance_review` — Deeper dive into layer boundaries.
- `$security_review` — Deeper dive into AppSec.
- `$tests_quality_review` — Deeper dive into test quality.
