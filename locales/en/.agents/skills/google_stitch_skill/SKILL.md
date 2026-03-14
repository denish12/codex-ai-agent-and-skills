---
name: google_stitch_skill
description: Generating UI screens via Google Stitch (AI) with direct access via StitchMCP. Rapid ideation after Approved UX Proposal, prompt engineering, quality control. Tied to the UX/UI Designer gate.
last_verified: 2026-03-11
version: 3.0
mcp_server: StitchMCP
---

# Skill: Google Stitch — AI UI Generation (MCP-Integrated)

## Purpose

Describes **how and when** the UX/UI Designer uses Google Stitch:
- for fast generation of initial screen variants via prompts,
- as a rapid ideation tool between UX Proposal and handoff to Figma,
- for generating frontend code as a starting point for DEV.

> [!IMPORTANT]
> Since version 3.0, Stitch is available **directly via MCP** — the agent generates, iterates, and
> manages screens without manually copying to the browser.
> Stitch is a **rapid prototyping** tool, not for final design.
> Any output requires refinement in Figma and a review via `$design_parity_review`.

---

## What is Google Stitch

Google Stitch is an AI tool from Google Labs (launched at Google I/O 2025, based on the acquired Galileo AI). It turns text prompts into UI mockups with export to Figma and HTML/CSS/React code.

**Engine:** Gemini 3 Pro / Gemini 3 Flash.
**URL:** https://stitch.withgoogle.com
**Access:** Google account + StitchMCP server connected to the agent.

---

## StitchMCP — API Reference

### Available tools

| Tool | Purpose | Key parameters |
|------|-----------|-------------------|
| `create_project` | Create a new project | `title` |
| `list_projects` | List of all projects | `filter` (owned/shared) |
| `get_project` | Project details | `name` (projects/{id}) |
| `list_screens` | List of screens in a project | `projectId` |
| `get_screen` | Screen details (code, metadata) | `projectId`, `screenId` |
| `generate_screen_from_text` | 🎯 **Screen generation by prompt** | `projectId`, `prompt`, `deviceType`, `modelId` |
| `edit_screens` | Editing existing screens | `projectId`, `selectedScreenIds[]`, `prompt` |
| `generate_variants` | Generating screen variants | `projectId`, `selectedScreenIds[]`, `prompt`, `variantOptions` |

### Models (modelId)

| ID | Description | When to use |
|----|----------|-------------------|
| `GEMINI_3_FLASH` | Fast, higher limit | Initial iterations, exploring variants |
| `GEMINI_3_PRO` | High quality | Final variants, complex layouts |

### Device types (deviceType)

| ID | Description |
|----|----------|
| `DESKTOP` | Desktop UIs (dashboards, admin panels) |
| `MOBILE` | Mobile UIs (iOS/Android) |
| `TABLET` | Tablet layouts |
| `AGNOSTIC` | Universal (popups, widgets, modals) |

> [!TIP]
> For popup/modal/widget templates use `AGNOSTIC` — they are not tied to a specific device.
> For dashboard pages use `DESKTOP`.

---

## Work modes (via MCP)

| Mode | Model | When |
|-------|--------|-------|
| **Fast exploration** | `GEMINI_3_FLASH` | Initial variants, layout exploration, fast iterations |
| **High-quality generation** | `GEMINI_3_PRO` | Final variant, complex layouts |

> [!WARNING]
> `generate_screen_from_text` and `edit_screens` can take **up to a few minutes**.
> **DO NOT repeat the call** — wait for the response. Even on a connection error, generation may finish successfully.
> Check result: `get_screen` or `list_screens`.

---

## Stitch's place in the UX/UI workflow

```
PRD → UX Clarification → UX Proposal (Approved)
                                   ↓
                    [STITCH MCP: Rapid Ideation]
                    create_project → generate_screen_from_text
                    → edit_screens / generate_variants
                                   ↓
                     get_screen → Copy to Figma → Polish & Brand
                                   ↓
                        UX Spec + Screen Inventory
                                   ↓
                        Parity Review ($design_parity_review)
                                   ↓
                          Handoff → ARCH / DEV
```

### When to use Stitch ✅
- After receiving **Approved** on UX Proposal — for fast materialization of flows into screens
- To demonstrate to the client/PM "how it might look" before polishing in Figma
- For generating variants of a single screen (layout exploration)
- As a foundation for frontend code during fast prototyping

### When NOT to use Stitch ❌
- For final UI requiring strict adherence to a design system
- For complex multi-screen flows (Stitch struggles with consistency >2–3 screens)
- When a ready Figma with components already exists — it's easier to work directly
- For animations and complex interactive states
- When the design system is fully defined and pixel-perfect is needed — Figma directly

---

## Inputs

- Approved UX Proposal (mandatory — Stitch is forbidden without it)
- PRD / User Stories (feature context)
- Design tokens (colors, fonts, spacing) — to include in the prompt
- Previous Stitch screens (screenId — for `edit_screens` / `generate_variants`)

---

## Workflow algorithm (MCP)

### Step 1: Project preparation

```
IF the project already exists:
  → list_projects → find projectId
  → list_screens(projectId) → check existing screens

IF no new project exists:
  → create_project(title: "Project name")
  → remember projectId from response
```

### Step 2: Screen generation

```
generate_screen_from_text(
  projectId: "<id>",
  prompt: "<prompt using the checklist below>",
  deviceType: "DESKTOP" | "MOBILE" | "TABLET" | "AGNOSTIC",
  modelId: "GEMINI_3_FLASH"   // Flash for the first iteration
)
→ remember screenId from response
→ if output_components contains suggestions — show to the user
```

### Step 3: Iteration (edit_screens)

```
edit_screens(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Move the CTA button to bottom, change color to #4361EE",
  modelId: "GEMINI_3_FLASH"
)
```

### Step 4: Variants (generate_variants)

```
generate_variants(
  projectId: "<id>",
  selectedScreenIds: ["<screenId>"],
  prompt: "Generate layout variations",
  variantOptions: { numberOfVariants: 3 }
)
```

### Step 5: Getting the result

```
get_screen(
  projectId: "<id>",
  screenId: "<screenId>",
  name: "projects/<id>/screens/<screenId>"
)
→ receive code / metadata of the screen
```

---

## Prompt engineering for Stitch

### Structure of an effective prompt

```
[Screen type] + [Platform] + [Content/elements] + [Style] + [Constraints]
```

**Example of a bad prompt:**
> "Make a registration form"

**Example of a good prompt:**
> "Mobile registration screen for a fintech app. Include: email field, password field with show/hide toggle, 'Continue' primary button, 'Sign in' text link below. Dark background (#0F0F14), accent color teal (#00C9A7), Inter font, 16px body. Error state for invalid email shown inline below the field. No illustrations."

### Prompt elements (checklist)

- [ ] **Screen type:** Dashboard / Form / List / Detail / Onboarding / Modal / Popup / Widget
- [ ] **Platform:** Mobile (iOS/Android) / Web desktop / Tablet / Responsive / Wix iframe embed
- [ ] **Content:** List specific elements (fields, buttons, cards, charts)
- [ ] **State:** Default / Loading / Empty / Error / Success / Hover / Disabled
- [ ] **Style:** color scheme (hex), font, border radius, density, shadows
- [ ] **Constraints:** what is NOT needed ("No illustrations", "No sidebar", "No gradients on buttons")
- [ ] **Sizes (if embed):** exact viewport sizes (e.g. "400×500px container")

### Prompts for specific states

**Empty state:**
> "...empty state screen when user has no data yet. Show a simple icon (no illustrations), headline 'No items yet', subtext 'Create your first item to get started', and a primary CTA button."

**Error state:**
> "...error/failure screen. Network error message in a toast/snackbar at the bottom, red (#FF4D4F), with retry action. Main content stays visible but dimmed."

**Loading state:**
> "...loading state with skeleton screens (gray animated placeholders) instead of content. No spinners."

---

## Iterations via edit_screens

After the first generation, use `edit_screens` for refinements:

### Targeted fixes (preferred)
```
prompt: "Move the CTA button to the bottom of the screen, fixed position."
prompt: "Change the card layout to 2 columns instead of 1."
prompt: "Replace the pie chart with a bar chart."
prompt: "Change background color to #0F0F14 and accent to #00C9A7."
```

### Iteration template
```
Alignment fix: "[Element] should be [position/alignment]"
Color fix:     "Change [element] color to [hex]"
Layout fix:    "Switch [layout A] to [layout B]"
Content fix:   "Replace [old text/element] with [new text/element]"
Size fix:      "Make [element] [larger/smaller], [exact px if known]"
Remove:        "Remove [element] entirely"
Add:           "Add [element] at [position]"
```

### Forbidden in iterations
- Changing the concept entirely (better a new `generate_screen_from_text`)
- Prompting "make it beautiful" without details — Stitch won't guess
- More than 5 edits in one `edit_screens` — split into steps

---

## Export to Figma

### When to export
After 2–3 iterations via `edit_screens`, when the layout is satisfactory.

### Process (via MCP)
1. `get_screen` → get screen data
2. Open Stitch UI in the browser → **"Copy to Figma"**
3. Figma → `Cmd/Ctrl + V` → paste

> [!NOTE]
> Copy to Figma is currently only available via UI. MCP provides code and metadata,
> but pasting into Figma requires a manual step via the browser.

### After pasting into Figma — mandatory steps
- [ ] Replace fonts with project fonts (Stitch uses system ones)
- [ ] Bind colors to design system tokens
- [ ] Replace generated components with components from the DS
- [ ] Check spacing — snap to 4/8px grid
- [ ] Add missing states (loading/empty/error if not generated)
- [ ] Check a11y: contrast, touch target sizes
- [ ] Add a markup in layers: `[Stitch-generated]`

> [!WARNING]
> Stitch **DOES NOT** create Figma components and DS tokens — everything must be finalized manually.

---

## Code Export (via MCP)

`get_screen` returns HTML/CSS/React code. Use as:
- Structure reference for DEV
- Starting point for a fast prototype
- Checking your own understanding of the layout

### Code retrieval algorithm
```
get_screen(projectId, screenId, name)
→ response contains generated screen code
→ save to a file with the mark [Stitch-generated scaffold]
→ pass to DEV
```

### What NOT to do
- Pass Stitch-code as production-ready without DEV review
- Expect components to match shadcn/WDS/other DS
- Copy inline styles to production — replace with CSS tokens

---

## Stitch Constraints (know and account for)

| Constraint | Impact | Mitigation |
|-------------|---------|------------|
| Low consistency between screens | Different styles on different screens | Prompt the identical style explicitly, use `generate_variants` |
| No animation and transitions | Motion cannot be conveyed | Document separately in UX Spec |
| No DS-token support | No auto-apply brand | Manual replacement after retrieving code |
| Complex flows >3 screens — poorly | Loss of consistency | Generate 1–2 screens per project |
| MCP generation is slow | Up to several minutes | Do not repeat the call, wait for response |
| Gen limits apply | Same account limits | Plan generation budget |
| Code is not production-ready | inline-styles, no DS, no a11y | Only as a scaffold, mandatory DEV-review |
| Copy to Figma — UI only | MCP does not support Figma export | Manual step via browser |

---

## Working with existing projects

### Projects in Stitch

Use `list_projects` to find existing projects and `list_screens(projectId)` for screens.

> [!TIP]
> If a screen already exists — use `edit_screens` and `generate_variants` instead of creating a new one.
> Example: `edit_screens(projectId: "<id>", selectedScreenIds: ["<screenId>"], prompt: "...")`

---

## Workflow cards (MCP scenarios)

### Scenario 1: Rapid Screen Ideation
```
Goal: Quickly show 2–3 screen variants for approval
Model: GEMINI_3_FLASH
Steps:
1. create_project(title) or select existing
2. generate_screen_from_text(prompt, GEMINI_3_FLASH) → screenId
3. generate_variants(screenId, prompt, { numberOfVariants: 3 })
4. Show variants to the user (get_screen for each)
5. Select → edit_screens for refinements
DoD: Layout chosen and approved
```

### Scenario 2: Iterating an existing screen
```
Goal: Improve an existing screen based on feedback
Model: GEMINI_3_FLASH → GEMINI_3_PRO for final
Steps:
1. list_screens(projectId) → find screenId
2. get_screen → see current state
3. edit_screens(screenId, prompt with edits, GEMINI_3_FLASH)
4. Repeat 2–3 times
5. Final iteration with GEMINI_3_PRO
DoD: Screen passed 2+ iterations, user approved
```

### Scenario 3: State Coverage
```
Goal: Cover all states of the screen (loading/empty/error/success)
Model: GEMINI_3_FLASH
Steps:
1. generate_screen_from_text → default state
2. generate_screen_from_text → "Same screen but loading state with skeletons"
3. generate_screen_from_text → "Same screen but empty state"
4. generate_screen_from_text → "Same screen but error state with inline message"
5. All 4 screenId → document in Screen Inventory
DoD: 4 states generated
```

### Scenario 4: Component Template
```
Goal: Generate/update UI component by design specification
Model: GEMINI_3_FLASH → GEMINI_3_PRO
Device: AGNOSTIC (for modal/popup/widget) or DESKTOP (for dashboard)
Steps:
1. Take Template Brief / Design Spec
2. Extract: unique elements, colors, style
3. generate_screen_from_text(prompt with component + visual elements, deviceType)
   OR edit_screens(existing screenId) if updating
4. edit_screens → 2–3 iterations on edits
5. get_screen → get code for DEV
6. Verification against $design_parity_review
DoD: Component visually matches specification, all elements visible
```

---

## Prompt examples

> Full collection of ready-made prompts: `examples/scr_prompts.md`

### Glassmorphism Modal
```
Modal dialog, 400×500px container, centered overlay on a page.
Glassmorphism style: frosted glass background (rgba(255,255,255,0.15)),
backdrop-filter: blur(20px), border: 1px solid rgba(255,255,255,0.2).
Elements: close button (top-right, ×), header image area (top),
headline "Your Title" (24px bold), body text (14px),
content area with action button,
CTA button (full width, gradient accent, rounded 12px).
Font: Inter. No external illustrations. Dark overlay behind modal.
Default state.
```

### Dashboard — Admin Settings Editor
```
Web admin dashboard, desktop. SaaS-style panel.
Left sidebar: navigation links (Dashboard, Content, Settings, Analytics).
Main content area: Settings editor with live preview.
Top: section selector (tabs), page title.
Center: split layout — left: form controls (color pickers, text inputs,
dropdowns for font/size/position, toggle switches),
right: live preview of content in a centered frame.
Bottom: "Save" primary button, "Reset" secondary button.
Color: white background (#FAFAFA), sidebar dark (#1A1A2E), accent (#4361EE).
Font: Inter 14px. Border-radius: 8px. Subtle shadow on cards.
Loaded state with sample data filled in.
```

---

## Anti-patterns when working with Stitch MCP

- ❌ Repeating `generate_screen_from_text` if the first call "hung" — wait
- ❌ Using `GEMINI_3_PRO` for initial experiments — start with `GEMINI_3_FLASH`
- ❌ Handing Stitch code to DEV without the "scaffold only" mark
- ❌ Generating 20+ screens in one project without structuring
- ❌ Prompting "make it beautiful" without details — result is unpredictable
- ❌ Accepting the first generation without `edit_screens` — always 2–3 iterations
- ❌ Using Stitch BEFORE getting Approved on UX Proposal
- ❌ Copying Stitch inline-styles to production instead of replacing with DS-tokens
- ❌ Comparing the implementation with Stitch-output — compare with Figma-final
- ❌ Deleting/re-creating screens instead of `edit_screens` — iteration history is lost

---

## Definition of Done (Stitch MCP output → Figma)

Stitch-material is considered ready for handoff to Figma when:

- [ ] A final variant is chosen (not a draft)
- [ ] Passed ≥2 iterations via `edit_screens`
- [ ] All key screen states covered (default + loading/empty/error/success)
- [ ] Prompt saved (in deliverables for reproducibility)
- [ ] `get_screen` confirms correct output
- [ ] Screen ID is documented in Screen Inventory

## Definition of Done (Figma refinement after Stitch)

Figma-material is considered ready for Handoff when:

- [ ] Fonts → project ones (Inter / SF Pro / project specific)
- [ ] Colors → bound to DS-tokens
- [ ] Spacing → 4/8px grid
- [ ] Components → replaced with DS components (if DS exists)
- [ ] `[Stitch-generated]` mark in Figma layers for tracking
- [ ] a11y baseline: contrast ≥4.5:1, touch targets ≥44px
- [ ] Passed verification via `$design_parity_review` → ≤0 P0

---

## Connection with other skills and pipeline

| UX/UI Stage | Stitch MCP Role | Related skill |
|------------|-----------------|-----------------|
| Clarification (step 2) | **Do not use** — no Approved yet | — |
| UX Proposal (step 3) | Optional: `generate_screen_from_text` for fast wireframe variants | — |
| Screen Inventory | `generate_screen_from_text` for each screen → `get_screen` | `$design_intake` |
| Handoff → DEV | `get_screen` → code as scaffold + Figma-final | — |
| Parity Review | Compare implementation with **Figma**, not Stitch-output | `$design_parity_review` |

> [!CAUTION]
> **Source of truth is determined by the user** at the UX Clarification stage (mandatory question #2).
> Options: **(a) Stitch** — parity review against Stitch screenshots via MCP,
> **(b) Figma** — parity review against Figma mockups, **(c) HTML reference** — parity review against repository files.
> If the source of truth is not defined — consider it a 🔴 P0 BLOCKER, query the user.

---

## Outputs (Deliverables)

### Stitch Output Package
- **Project ID** and **Screen IDs** (for reproducibility and iterations)
- **Prompt** (saved)
- **Iteration list** (which `edit_screens` were executed)
- **State coverage:** which states are covered (screenId for each)

### DEV Handoff (if code)
- **HTML/CSS scaffold** from `get_screen` marked "Stitch-generated, needs DS integration"
- **Layout reference:** sections, ordering, responsive breakpoints
- **DO NOT pass:** inline styles as final, colors without tokens

---

## Response format

### Summary
Brief outcome: what was generated, how many variants, which was chosen. Project ID and Screen IDs.

### Deliverables
- Stitch Output Package (Screen IDs / code / Figma-export)
- Prompt (for reproducibility)

### Decisions
Which variant was chosen and why.

### Risks/Blockers
- Generation limits (remaining budget)
- Consistency (if >3 screens)

### Open Questions
Unresolved questions regarding layout/styling.

### Next Actions (IDs: UX-xx)
- UX-xx: refinement in Figma
- UX-xx: verification via `$design_parity_review`

---

## Resources

- **Stitch:** https://stitch.withgoogle.com
- **Google Blog:** https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/
- **MCP Server:** StitchMCP (connected to the agent)
- **Prompt examples:** `examples/scr_prompts.md`
- **Generation budget:** `resources/budget_planner.md`
- **Related skills:** `$design_intake`, `$design_parity_review`
