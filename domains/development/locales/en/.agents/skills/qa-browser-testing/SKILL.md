---
name: qa-browser-testing
description: Visual E2E testing via the built-in Antigravity Browser — Pre-Auth Handoff, browser_subagent, screenshots, visual parity, evidence collection.
last_verified: 2026-03-11
version: 1.0
---

# Skill: Antigravity Browser Testing

## Purpose

Testing via **the built-in Google Antigravity browser** (`browser_subagent`).
The main tool of the Tester agent for visual verification, UI parity, and DEMO gate.

> [!IMPORTANT]
> This skill is for **manual-automated** testing within Antigravity.
> For CI/CD automation (spec files, pipeline) → `$qa-e2e-playwright`.

---

## When to use

- Testing Wix Dashboard / Shopify Admin (closed environment)
- Visual parity: comparing implementation with the design source (Stitch / Figma / HTML-ref)
- DEMO gate: verifying DEV-xx slices
- Quick UI regression check
- Evidence collection (screenshots + video) for QA Report

## When NOT to use

- Automation in CI/CD pipeline is needed → `$qa-e2e-playwright`
- Unit/integration testing → Vitest
- API contract testing → `$qa-api-contract-tests`
- Computational logic → unit tests

---

## Tools

| Tool | What it does | When |
|-----------|-----------|-------|
| `browser_subagent` | Opens a page, clicks, enters text, checks UI | Main |
| `capture_browser_screenshot` | Takes a screenshot of the current page | Every verification step |
| `open_browser_url` | Navigates to a URL | Navigation |
| `read_browser_page` | Reads the DOM/text of the page | Content verification |
| `click_browser_element` | Clicks on an element | Interactive verification |

> [!NOTE]
> Every call to `browser_subagent` automatically records a `.webp` video.
> Video = evidence for the QA report and walkthrough.

---

## Pre-Auth Handoff (Wix / Shopify)

> **Trigger:** the user specifies **"Wix"** or **"Shopify"** when transitioning to the TEST gate.

### Protocol

**Step 1 — Request authorization:**
```
🌐 Pre-Auth Handoff: trigger [Wix/Shopify] detected.
Please:
1. Open the Antigravity browser
2. Login to [Wix Dashboard / Shopify Admin]
3. Navigate to the page that needs to be tested
4. Write: "Browser is ready"
```

**Step 2 — User authorizes and opens the relevant page.**

**Step 3 — Tester runs `browser_subagent` with strict rules:**
- ❌ DO NOT open new URLs (only work with the current page)
- ❌ DO NOT try to navigate to localhost
- ✅ Take a screenshot at EVERY verification step
- ✅ Click, toggle, verify UI
- ✅ Record video (`.webp`) for evidence

**Step 4 — Analyze screenshots and formulate findings.**

### Constraints

| Works ✅ | Doesn't work ❌ |
|------------|---------------|
| `manage.wix.com` | `localhost` |
| `admin.shopify.com` | Self-signed SSL |
| Any URL with a valid SSL | Wix sandbox iFrame API |
| Auth state persists | Session expires (~24h) |

---

## Visual Parity via Antigravity Browser

> [!IMPORTANT]
> **Source of truth is determined by the UX Designer** (mandatory question #2 Clarification Protocol).
> If not specified — request before verification.

### Algorithm

```
1. Get reference screenshot (depends on Source of Truth):
   (a) Stitch → get_screen() → download screenshot via browser_subagent
   (b) Figma → user provides PNG export
   (c) HTML-ref → open HTML file in browser_subagent → capture_screenshot

2. Get actual screenshot:
   → browser_subagent: open implementation → capture_screenshot

3. Visually compare (Tester analyzes both screenshots):
   → Structure: are elements in place?
   → Typography: font, size, color?
   → Spacing: do paddings/margins match?
   → Colors: is the palette correct?
   → States: are all implemented?

4. Format finding:
   → UX-PARITY-xx: PASS / FAIL + screenshot + description
```

### Example: Stitch as Source of Truth

```
Step 1: get_screen(projectId, screenId) → get screenshot URL
Step 2: browser_subagent → open screenshot URL → capture_screenshot → save as reference
Step 3: browser_subagent → open implementation (Wix Dashboard) → capture_screenshot → save as actual
Step 4: Compare reference vs actual → record discrepancies
```

### Example: Figma as Source of Truth

```
Step 1: User provides PNG export from Figma
Step 2: browser_subagent → open implementation → capture_screenshot
Step 3: Compare Figma PNG vs actual screenshot
Step 4: Format findings
```

### Example: HTML-ref as Source of Truth

```
Step 1: browser_subagent → open popup_templates/glassmorphism.html → capture_screenshot
Step 2: browser_subagent → open implementation → capture_screenshot
Step 3: Compare reference vs actual
Step 4: Format findings
```

---

## DEMO Gate via Browser

### DEMO-xx Protocol

```
1. Get DEMO instructions from Dev (DEMO-xx)
2. Pre-Auth (if Wix/Shopify) or open URL directly
3. browser_subagent: execute steps from DEMO
4. capture_screenshot at EVERY step
5. Record: PASS/FAIL + screenshot + description
6. Embed in walkthrough.md
```

### Evidence format

```markdown
### DEMO-01: Template Selection

![Step 1: Open editor](path/to/screenshot_step1.png)
Status: ✅ PASS — editor opened, templates loaded

![Step 2: Select Glassmorphism](path/to/screenshot_step2.png)
Status: ✅ PASS — preview updated correctly

![Step 3: Save changes](path/to/screenshot_step3.png)
Status: ❌ FAIL — toast did not appear after saving
```

---

## browser_subagent Best Practices

### Call rules

```
browser_subagent(
  Task: "Detailed description of what to check and what to return",
  TaskName: "Short descriptive name",
  RecordingName: "lowercase_with_underscores"
)
```

### What to include in Task

- **Specific elements** to check (data-testid, text, CSS)
- **Expected result** (what should be visible)
- **Return condition** (when to consider the task complete)
- **Screenshots** — exactly when to take them

### Example of a good Task

```
Navigate to the Widget Design page. Verify that:
1. Template selector shows at least 3 templates
2. Click on "Glassmorphism" template
3. Verify live preview updates with glassmorphism styling
4. Take a screenshot after each step.
Return: screenshot paths and PASS/FAIL status for each step.
```

### Example of a bad Task ❌

```
Check if the page works.
```

---

## Anti-patterns

- ❌ `browser_subagent` without specific steps — "check the page" is too vague
- ❌ Opening new URLs after Pre-Auth — will lose auth state
- ❌ Not taking screenshots — no evidence = no proof
- ❌ Visual verification without a reference — need a baseline (Stitch/Figma/HTML)
- ❌ Ignoring `.webp` recordings — that's ready-made evidence
- ❌ Testing business logic via browser — use unit tests

---

## Artifacts (Deliverables)

| Artifact | Format | Where |
|----------|--------|-----|
| Screenshots of steps | `.png` | Embed in walkthrough.md |
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
