---
name: qa_browser_testing
description: Visual E2E testing through the built-in Antigravity Browser — Pre-Auth Handoff, browser_subagent, screenshots, visual parity, and evidence collection.
last_verified: 2026-03-11
version: 1.0
---

# Skill: Antigravity Browser Testing

## Purpose

Testing via **embedded browser Google Antigravity** (`browser_subagent`).
Main tool Tester agent for visual checks, UI parity and DEMO gate.

> [!IMPORTANT]
> For CI/CD automation use `$qa_e2e_playwright`.
> For CI/CD automation (spec-files, pipeline) → `$qa_e2e_playwright`.

---

## When to use

- Testing Wix Dashboard / Shopify Admin (closed environment)
## When not to use
- CI/CD pipeline automation -> `$qa_e2e_playwright`
- Unit/integration testing -> Vitest
- API contract testing -> `$qa_api_contract_tests`

- First unstable slice of UI -> tests will be flaky

- Needed automation in CI/CD pipeline → `$qa_e2e_playwright`
- `capture_browser_screenshot`: capture evidence on every step
- API contract testing → `$qa_api_contract_tests`
- `read_browser_page`: inspect DOM/text

---

> Every `browser_subagent` call records a `.webp` video automatically.

## Pre-Auth Handoff
|-----------|-----------|-------|
| `browser_subagent` | Opens a page, clicks, enters text, checks the UI | Main |
| `capture_browser_screenshot` | Does screenshot current pages | Each step checks |
| `open_browser_url` | Navigates to a URL | Navigation |
| `read_browser_page` | Reads DOM/text pages | Check content |
| `click_browser_element` | Clicks an element | Interactive check |

> [!NOTE]
> Each call `browser_subagent` automatically records a `.webp` video.
## Visual parity algorithm

---

## Pre-Auth Handoff (Wix / Shopify)

3. Compare structure, typography, spacing, colors, and states.

### Protocol

- Running browser checks without concrete steps
```
- mark visual verification as `MANUAL ? delegated to user`,
- provide a manual checklist,
- do not fabricate evidence.
2. Log in to [Wix Dashboard / Shopify Admin]
---
- Step screenshots (`.png`)
```

- UX Parity Results table

**Step 3 — Tester runs `browser_subagent` with strict rules:**
## Output format
- $qa_security_smoke_tests
| Step | Action | Expected | Actual | Screenshot | Status |
---
- ✅ Record video (`.webp`) for evidence

### UX Parity Results

What to do: ...

| Works ✅ | Not works ❌ |
|------------|---------------|
| `manage.wix.com` | `localhost` |
| `admin.shopify.com` | Self-signed SSL |
| ... | 5/5 | none | PASS |
| Auth state is preserved | Session expires (~24h) |

---

## Visual Parity via Antigravity Browser

> [!IMPORTANT]
> **Source of truth is determined UX Designer** (mandatory question #2 Clarification Protocol).
> If not specified, request it before the check.

### Algorithm

```
1. Get reference-screenshot (depends from Source of Truth):
   (a) Stitch → get_screen() → download a screenshot via browser_subagent
   (b) Figma → user provides export PNG
   (c) HTML-ref → open HTML-file in browser_subagent → capture_screenshot

2. Get actual-screenshot:
   → browser_subagent: open implementation → capture_screenshot

3. Visual compare (Tester analysis both screenshot):
   → Structure: elements on places?
   → Type: font, size, color?
   → Spacing: spacing matches?
   → Colors: palette is correct?
   → States: all are implemented?

4. Format finding:
   → UX-PARITY-xx: PASS / FAIL + screenshot + description
```

### Example: Stitch how Source of Truth

```
Step 1: get_screen(projectId, screenId) → get screenshot URL
Step 2: browser_subagent → open screenshot URL → capture_screenshot → save how reference
Step 3: browser_subagent → open implementation (Wix Dashboard) → capture_screenshot → save how actual
Step 4: Compare reference vs actual → record discrepancies
```

### Example: Figma how Source of Truth

```
Step 1: User provides PNG export from Figma
Step 2: browser_subagent → open implementation → capture_screenshot
Step 3: Compare Figma PNG vs actual screenshot
Step 4: Format findings
```

### Example: HTML-ref how Source of Truth

```
Step 1: browser_subagent → open popup_templates/glassmorphism.html → capture_screenshot
Step 2: browser_subagent → open implementation → capture_screenshot
Step 3: Compare reference vs actual
Step 4: Format findings
```

---

## DEMO Gate via Browser

### Protocol DEMO-xx

```
1. Get DEMO-instructions from Dev (DEMO-xx)
2. Pre-Auth (if Wix/Shopify) or open URL directly
3. browser_subagent: execution steps from DEMO
4. capture_screenshot on Each step
5. Record: PASS/FAIL + screenshot + description
6. Embed in walkthrough.md
```

### Format evidence

```markdown
### DEMO-01: Template Selection

![Step 1: Open editor](path/to/screenshot_step1.png)
Status: ✅ PASS — the editor opened, templates loaded

![Step 2: Select Glassmorphism](path/to/screenshot_step2.png)
Status: ✅ PASS — the preview updated correctly

![Step 3: Save changes](path/to/screenshot_step3.png)
Status: ❌ FAIL — toast not appeared after saving
```

---

## browser_subagent Best Practices

### Invocation rules

```
browser_subagent(
  Task: "Detailed description of what to check and what to return",
  TaskName: "Short descriptive name",
  RecordingName: "lowercase_with_underscores"
)
```

### What specify in Task

- **Concrete elements** for checks (data-testid, text, CSS)
- **Expected result** (what should be visible)
- **Return condition** (when consider task completed)
- **Screenshots** — when exactly them do

### Example good Task

```
Navigate to the Widget Design page. Verify that:
1. Template selector shows at least 3 templates
2. Click on "Glassmorphism" template
3. Verify live preview updates with glassmorphism styling
4. Take a screenshot after each step.
Return: screenshot paths and PASS/FAIL status for each step.
```

### Example bad Task ❌

```
Check if the page works.
```

---

## Anti-patterns

- ❌ `browser_subagent` without specific steps — «check page» too vague
- ❌ Open a new URL after Pre-Auth — we will lose the auth state
- ❌ Not do screenshots — no evidence = no proof
- ❌ Visual check without reference — needed baseline (Stitch/Figma/HTML)
- ❌ Ignore `.webp` records — this is ready-made evidence
- ❌ Test business logic via browser — use unit-tests

---

## Artifacts (Deliverables)

| Artifact | Format | Where |
|----------|--------|-----|
| Screenshots steps | `.png` | Embed in walkthrough.md |
| Video recordings | `.webp` | Embed in walkthrough.md |
| DEMO Results | Table | In QA Report |
| UX Parity Results | Table | In QA Report |
| Findings | P0/P1/P2 blocks | In QA Report |

---

## Output (format)

### Browser Test Summary
| Step | Action | Expected | Actual | Screenshot | Status |
|------|--------|----------|--------|------------|--------|
| 1 | ... | ... | ... | 📸 link | PASS/FAIL |

### UX Parity Results
| UX-PARITY-xx | Screen | Source of Truth | Findings | Status |
|--------------|--------|----------------|----------|--------|
| ... | ... | Stitch / Figma / HTML-ref | ... | PASS/FAIL |

### DEMO Results
| DEMO-xx | Steps verified | Issues | Status |
|---------|---------------|--------|--------|
| ... | 5/5 | none | ✅ PASS |
