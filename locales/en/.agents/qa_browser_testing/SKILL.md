---
name: qa_browser_testing
description: Visual E2E testing through the built-in Antigravity Browser — Pre-Auth Handoff, browser_subagent, screenshots, visual parity, and evidence collection.
last_verified: 2026-03-11
version: 1.0
---

# Skill: Antigravity Browser Testing

## Purpose
Testing through the built-in Google Antigravity browser (`browser_subagent`).
This is the primary Tester skill for visual verification, UI parity, and DEMO gate checks.

> [!IMPORTANT]
> This skill is for interactive manual-assisted testing inside Antigravity.
> For CI/CD automation use `$qa_e2e_playwright`.

## When to use
- Wix Dashboard / Shopify Admin testing in closed environments
- Visual parity against Stitch, Figma, or HTML reference
- DEMO gate verification for DEV slices
- Quick UI regression and evidence collection

## When not to use
- CI/CD pipeline automation -> `$qa_e2e_playwright`
- Unit/integration testing -> Vitest
- API contract testing -> `$qa_api_contract_tests`
- Pure business logic validation -> unit tests

## Tools
- `browser_subagent`: open, click, type, and inspect UI
- `capture_browser_screenshot`: capture evidence on every step
- `open_browser_url`: navigate when allowed
- `read_browser_page`: inspect DOM/text
- `click_browser_element`: targeted interaction checks

> [!NOTE]
> Every `browser_subagent` call records a `.webp` video automatically.

## Pre-Auth Handoff
Trigger when the user explicitly says `Wix` or `Shopify` for the TEST gate.

Protocol:
1. Ask the user to open Antigravity browser, log in, open the page, and reply `Browser ready`.
2. Work only with the already opened page.
3. Do not open new URLs and do not navigate to localhost.
4. Capture screenshots on every validation step.
5. Keep `.webp` recordings as evidence.

## Visual parity algorithm
1. Obtain the reference screenshot:
   - Stitch -> `get_screen()` screenshot URL
   - Figma -> exported PNG from user
   - HTML reference -> open local HTML and capture screenshot
2. Capture the actual implementation screenshot.
3. Compare structure, typography, spacing, colors, and states.
4. Record `UX-PARITY-xx: PASS / FAIL` with evidence.

## Anti-patterns
- Running browser checks without concrete steps
- Opening new URLs after Pre-Auth and losing auth state
- Skipping screenshots and video evidence
- Running parity without an approved reference baseline
- Using browser checks for business logic better covered by unit tests

## Deliverables
- Step screenshots (`.png`)
- Video recordings (`.webp`)
- DEMO Results table
- UX Parity Results table
- Findings grouped by P0/P1/P2

## Output format
### Browser Test Summary
| Step | Action | Expected | Actual | Screenshot | Status |
|------|--------|----------|--------|------------|--------|
| 1 | ... | ... | ... | link | PASS/FAIL |

### UX Parity Results
| UX-PARITY-xx | Screen | Source of Truth | Findings | Status |
|--------------|--------|----------------|----------|--------|
| ... | ... | Stitch / Figma / HTML-ref | ... | PASS/FAIL |

### DEMO Results
| DEMO-xx | Steps verified | Issues | Status |
|---------|---------------|--------|--------|
| ... | 5/5 | none | PASS |
