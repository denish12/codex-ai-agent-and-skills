---
name: google_stitch
description: Generate UI screens with Google Stitch (AI) through direct StitchMCP access. Rapid ideation after an Approved UX Proposal, prompt engineering, and output quality control. Mapped to the UX/UI Designer gate.
last_verified: 2026-03-11
version: 3.0
mcp_server: StitchMCP
---

# Skill: Google Stitch — AI UI Generation (MCP-Integrated)

## Purpose

- for rapid first-pass screen generation from prompts,
- as a bridge between the approved UX proposal and Figma handoff,
- for frontend code scaffolding as a starting point for DEV.
- for generating frontend code as a starting point for DEV.

> [!IMPORTANT]
> It is a rapid prototyping tool, not the final source of truth.
> Every result still needs Figma polishing and parity review via `$design_parity_review`.
> Stitch — tool **strictly for prototyping**, not final design.
> Any output requires refinement in Figma and review via `$design_parity_review`.

---

- URL: https://stitch.withgoogle.com

Google Stitch — AI-tool from Google Labs (launched at Google I/O 2025, based on the acquired Galileo AI). Transforms text prompts into UI mockups with export to Figma and HTML/CSS/React code.

- `create_project`
**URL:** https://stitch.withgoogle.com
- `get_project`

---

## StitchMCP — API Reference

### Access tools

- `GEMINI_3_FLASH`: rapid exploration and early variants
|------|-----------|-------------------|
| `create_project` | Create new project | `title` |
| `list_projects` | List all projects | `filter` (owned/shared) |
| `get_project` | Details project | `name` (projects/{id}) |
| `list_screens` | List screens in project | `projectId` |
| `get_screen` | Details screen (code, metadata) | `projectId`, `screenId` |
| `generate_screen_from_text` | 🎯 **Generation screen by prompt** | `projectId`, `prompt`, `deviceType`, `modelId` |
| `edit_screens` | Editing existing screens | `projectId`, `selectedScreenIds[]`, `prompt` |
| `generate_variants` | Generation options screen | `projectId`, `selectedScreenIds[]`, `prompt`, `variantOptions` |

- After UX Proposal is Approved

- To generate multiple variants of one screen
|----|----------|-------------------|
| `GEMINI_3_FLASH` | Quick, more limit | First iterations, iteration options |
| `GEMINI_3_PRO` | High quality | Final options, complex layouts |

- Complex multi-screen flows where consistency across many screens is critical

- Motion-heavy or interaction-heavy design work
|----|----------|
| `DESKTOP` | Desktop UI (dashboards, admin panels) |
| `MOBILE` | Mobile UI (iOS/Android) |
| `TABLET` | Tablet layouts |
| `AGNOSTIC` | Universal (popups, widgets, modals) |

> [!TIP]
> For popup-templates SCR use `AGNOSTIC` — popups are not bound to a specific device.
> For dashboard-pages use `DESKTOP`.

---

5. Fetch screen code/metadata with `get_screen`.

| Mode | Model | When |
|-------|--------|-------|
| **Quick iteration** | `GEMINI_3_FLASH` | First options, layout exploration, quick iterations |
| **High-quality generation** | `GEMINI_3_PRO` | Final variant, complex layouts |

> [!WARNING]
> `generate_screen_from_text` and `edit_screens` can take **up to several minutes**.
- Constraints (what must not appear)
> Check result: `get_screen` or `list_screens`.

---

- Copy to Figma through the browser UI

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

- DoD: one layout direction selected and approved
- After retrieval **Approved** on UX Proposal — for quickly materializing flows into screens
### Existing Screen Iteration
- Model: `GEMINI_3_FLASH` -> `GEMINI_3_PRO`
- DoD: screen goes through 2+ feedback iterations and is approved

### State Coverage
- Generate default, loading, empty, and error states for the same screen
- For complex multi-screen flows (Stitch poorly maintains consistency >2–3 screens)
### SCR Popup Template
- Device: `AGNOSTIC`
- Use template brief + style block + constraints

---

## Inputs

- Approved UX Proposal (mandatory — without it, Stitch is forbidden)
- PRD / User Stories (context features)
- Design tokens (colors, fonts, spacing) — for inclusion in the prompt
- Previous Stitch-screens (screenId — for `edit_screens` / `generate_variants`)

---

## Algorithm work (MCP)

### Step 1: Preparation project

```
If project already exists:
  → list_projects → find projectId
  → list_screens(projectId) → check existing screens

If new project no:
  → create_project(title: "Title project")
  → remember projectId from answer
```

### Step 2: Generation screen

```
generate_screen_from_text(
  projectId: "<id>",
  prompt: "<prompt by the checklist below>",
  deviceType: "DESKTOP" | "MOBILE" | "TABLET" | "AGNOSTIC",
  modelId: "GEMINI_3_FLASH"   // Flash for first iterations
)
→ remember screenId from answer
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

### Step 4: Options (generate_variants)

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
→ get code / metadata screen
```

---

## Prompt for Stitch

### Structure of an effective prompt

```
[Type screen] + [Platform] + [Content/elements] + [Style] + [Constraints]
```

**Example bad prompt:**
> "Make form registration"

**Example good prompt:**
> "Mobile registration screen for a fintech app. Include: email field, password field with show/hide toggle, 'Continue' primary button, 'Sign in' text link below. Dark background (#0F0F14), accent color teal (#00C9A7), Inter font, 16px body. Error state for invalid email shown inline below the field. No illustrations."

### Elements prompt (checklist)

- [ ] **Type screen:** Dashboard / Form / List / Detail / Onboarding / Modal / Popup / Widget
- [ ] **Platform:** Mobile (iOS/Android) / Web desktop / Tablet / Responsive / Wix iframe embed
- [ ] **Content:** List concrete elements (fields, button, card, charts)
- [ ] **State:** Default / Loading / Empty / Error / Success / Hover / Disabled
- [ ] **Style:** color scheme (hex), font, corner radius, density, shadows
- [ ] **Constraints:** what Not needed ("No illustrations", "No sidebar", "No gradients on buttons")
- [ ] **Sizes (if embed):** precise sizes viewport (e.g. "400×500px container")

### Prompts for specific states

**Empty state:**
> "...empty state screen when user has no data yet. Show a simple icon (no illustrations), headline 'No items yet', subtext 'Create your first item to get started', and a primary CTA button."

**Error state:**
> "...error/failure screen. Network error message in a toast/snackbar at the bottom, red (#FF4D4F), with retry action. Main content stays visible but dimmed."

**Loading state:**
> "...loading state with skeleton screens (gray animated placeholders) instead of content. No spinners."

---

## Iterations via edit_screens

After first generation use `edit_screens` for clarifications:

### Targeted edits (preferably)
```
prompt: "Move the CTA button to the bottom of the screen, fixed position."
prompt: "Change the card layout to 2 columns instead of 1."
prompt: "Replace the pie chart with a bar chart."
prompt: "Change background color to #0F0F14 and accent to #00C9A7."
```

### Template iterations
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
- Change the concept entirely (better new `generate_screen_from_text`)
- Prompt «make prettier» without specifics — Stitch will not guess
- More than 5 edits for one `edit_screens` call ? split into steps

---

## Export in Figma

### When export
After 2–3 iterations via `edit_screens`, when the layout is satisfactory.

### Process (via MCP)
1. `get_screen` → get data screen
2. Open Stitch UI in browser → **"Copy to Figma"**
3. Figma → `Cmd/Ctrl + V` → insert

> [!NOTE]
> Copy to Figma for now available only via UI. MCP gives code and metadata,
> but for insertions in Figma needed manual step via browser.

### After insertions in Figma — mandatory steps
- [ ] Replace fonts on project (Stitch uses system)
- [ ] Map colors to design-system tokens
- [ ] Replace generated components with components from the design system
- [ ] Check spacing — bring to 4/8px grid
- [ ] Add missing states (loading/empty/error if not generated)
- [ ] Check a11y: contrast, sizes touch targets
- [ ] Add marker in layers: `[Stitch-generated]`

> [!WARNING]
> Stitch **Not** creates Figma components and DS-tokens — everything needs to be finished manually.

---

## Export code (via MCP)

`get_screen` returns HTML/CSS/React code. Use how:
- Reference structure for DEV
- A starting point for a quick prototype
- A check of your own understanding of the layout

### Algorithm retrieval code
```
get_screen(projectId, screenId, name)
→ response contains generated screen code
→ save in file with marker [Stitch-generated scaffold]
→ pass DEV
```

### What Not do
- Return Stitch-code how production-ready without review DEV
- Expecting components to comply with shadcn/WDS/another DS
- Copy inline-styles in production — replace on CSS-tokens

---

## Stitch constraints (know and account for them)

| Limitation | Impact | Mitigation |
|-------------|---------|------------|
| Consistency between screens is low | Different styles on different screens | Explicitly prompt the same style, use `generate_variants` |
| No animations and transitions | Cannot pass motion | Document separately in UX Spec |
| No support DS-tokens | No auto-apply brand | Manual replacement after retrieval code |
| Complex flows >3 screens are weak | Loss of consistency | Generate 1-2 screens per project |
| MCP generation is slow | Up to several minutes | Do not repeat the call, wait for the answer |
| Generation limits apply | The same account constraints | Plan the generation budget |
| Code not production-ready | inline-styles, no DS, no a11y | Only how scaffold, mandatory DEV-review |
| Copy to Figma — only via UI | MCP not supports Figma-export | Manual step via browser |

---

## Working with existing projects

### SCR projects in Stitch

| Project | Project ID | Screens | Description |
|--------|-----------|---------|----------|
| Wix Native Style Popup | `9413055351550649236` | 90+ | All 12 popup-templates + dashboard + onboarding |
| Rules & Triggers Wix Redesign | `4150501200823065821` | 7 | Rules & Triggers UI |

### Named screens project Popups

| Screen Label | Screen ID |
|-------------|-----------|
| Glassmorphism Discount Popup | `ada37869e954466fa52ae67535fed7b8` |
| Wix Native Style Popup | `a3be200e2ce24baba1b408210baeffa0` |
| Neo-Brutalism Discount Popup | `a10d36f0214e499097abad2e44f6bab0` |
| Bento Grid Offer Popup | `c04e2fb6067741bb88071d1fe749a409` |
| Claymorphism Bubble Popup | `d4c124cc2aba4cc18615f52df07cc641` |
| Dopamine Brights Popup | `b266d0ceaff9409e8c4cb72044285ff2` |
| Eco-Minimalist Serif Popup | `ea8fc205640943caa7cfb8e0939047b7` |
| Gamified Scratch-Off Popup | `14b19a7bd8dc4867a587afb25203cf7c` |
| Dark Luxury Gold Popup | `492cfed962a34393add5fddc101ddc2b` |
| Campaign Onboarding Guide | `29f94b8297fe4da88dd0adece73f185c` |

> [!TIP]
> Use these IDs for `edit_screens` and `generate_variants` ? there is no need to create screens again.
> Example: `edit_screens(projectId: "9413055351550649236", selectedScreenIds: ["ada37869..."], prompt: "...")`

---

## Workflow-card (MCP-scenarios)

### Scenario 1: Rapid Screen Ideation
```
Goal: Quickly show 2–3 variant screen for approval
Model: GEMINI_3_FLASH
Steps:
1. create_project(title) or choose existing
2. generate_screen_from_text(prompt, GEMINI_3_FLASH) → screenId
3. generate_variants(screenId, prompt, { numberOfVariants: 3 })
4. Show options to the user (get_screen for each)
5. Choose → edit_screens for clarifications
DoD: Layout selected and agreed
```

### Scenario 2: Iteration existing screen
```
Goal: Improve existing screen by feedback
Model: GEMINI_3_FLASH ? GEMINI_3_PRO for the final pass
Steps:
1. list_screens(projectId) → find screenId
2. get_screen ? see the current state
3. edit_screens(screenId, prompt with edits, GEMINI_3_FLASH)
4. Repeat 2-3 times
5. Final iteration with GEMINI_3_PRO
DoD: Screen passed 2+ iterations, the user approved it
```

### Scenario 3: State Coverage
```
Goal: Coverage all states screen (loading/empty/error/success)
Model: GEMINI_3_FLASH
Steps:
1. generate_screen_from_text → default state
2. generate_screen_from_text → "Same screen but loading state with skeletons"
3. generate_screen_from_text → "Same screen but empty state"
4. generate_screen_from_text → "Same screen but error state with inline message"
5. All 4 screenId → document in Screen Inventory
DoD: 4 states generated
```

### Scenario 4: SCR Popup Template
```
Goal: Generate/update a popup template for Smart Cart Rescue
Model: GEMINI_3_FLASH → GEMINI_3_PRO
Device: AGNOSTIC
Steps:
1. Take the Template Brief from agents_documentation/popup_description/
2. Extract: unique elements, colors, style from section 3–6
3. generate_screen_from_text(prompt with popup + prop-elements, AGNOSTIC)
   Or edit_screens(existing screenId) if update
4. edit_screens ? 2-3 iterations based on edits
5. get_screen → get code for DEV
6. Comparison with $design_parity_review
DoD: Popup visual matches HTML-reference, all prop-elements visible
```

---

## Example prompts for Smart Cart Rescue

> Full collection prompt: `examples/scr_prompts.md`

### Glassmorphism Discount Popup
```
Discount popup widget, 400×500px container, centered overlay on a page.
Glassmorphism style: frosted glass background (rgba(255,255,255,0.15)),
backdrop-filter: blur(20px), border: 1px solid rgba(255,255,255,0.2).
Elements: close button (top-right, ×), header image (product photo, top),
headline "Special Offer!", body text "Don't miss this deal",
discount badge (large, "20% OFF"), coupon code area with copy button,
countdown timer (DD:HH:MM:SS segments in glass-pill style),
CTA button ("Shop Now", gradient purple-to-pink, full width, rounded 12px).
Font: Inter. No external illustrations. Dark overlay behind popup.
Default state, coupon not yet copied.
```

### Dashboard — Widget Design Editor
```
Web admin dashboard, desktop. SaaS-style Wix app panel.
Left sidebar: navigation links (Dashboard, Templates, Settings, Analytics).
Main content area: Template editor with live preview.
Top: template selector (dropdown + thumbnails), template name.
Center: split layout — left: form controls (color pickers, text inputs,
dropdowns for font/size/position), right: live preview of popup widget
in a phone-sized frame. Form fields: Coupon Code, Headline, Body Text,
CTA Text, Background Color, Accent Color, Timer toggle.
Bottom: "Save" primary button, "Reset" secondary button.
Color: white background (#FAFAFA), sidebar dark (#1A1A2E), accent (#4361EE).
Font: Inter 14px. Border-radius: 8px. Subtle shadow on cards.
Loaded state with sample data filled in.
```

---

## Anti-patterns with work with Stitch MCP

- ? Repeat `generate_screen_from_text` if the first call appears stuck ? wait
- ? Use `GEMINI_3_PRO` for first experiments ? start with `GEMINI_3_FLASH`
- ? Return Stitch code to DEV without the note "scaffold only"
- ❌ Generate 20+ screens in one project without structured
- ? Prompt "make it prettier" without details ? the result is unpredictable
- ? Accept the first generation without `edit_screens` ? always do 2-3 iterations
- ❌ Use Stitch To retrieval Approved on UX Proposal
- ❌ Copy Stitch inline-styles in production instead of replace on DS-tokens
- ? Compare implementation with the Stitch output ? compare with the final Figma instead
- ? Delete/recreate screens instead of `edit_screens` ? iteration history is lost

---

## Definition of Done (Stitch MCP output → Figma)

Stitch material is considered ready for handoff to Figma when:

- [ ] A final variant is selected (not a draft)
- [ ] >=2 iterations via `edit_screens` are completed
- [ ] All key states screen covered (default + loading/empty/error/success)
- [ ] The prompt is saved (in deliverables for reproducibility)
- [ ] `get_screen` confirmation returns correct output
- [ ] Screen ID documented in Screen Inventory

## Definition of Done (Figma-follow-up after Stitch)

Figma-material is considered ready to Handoff, when:

- [ ] Fonts → project (Inter / SF Pro / project)
- [ ] Colors → bound to DS-tokens
- [ ] Spacing → 4/8px grid
- [ ] Components → replace on DS components (if is DS)
- [ ] Mark `[Stitch-generated]` in Figma layers for traceability
- [ ] a11y baseline: contrast ≥4.5:1, touch targets ≥44px
- [ ] Comparison via `$design_parity_review` is completed ? <=0 P0

---

## Connection with other skills and the pipeline

| UX/UI stage | Stitch MCP role | Related skill |
|------------|-----------------|-----------------|
| Clarification (step 2) | **Not use** — still no Approved | — |
| UX Proposal (step 3) | Optionally: `generate_screen_from_text` for quick wireframe options | ? |
| Screen Inventory | `generate_screen_from_text` for each screen → `get_screen` | `$design_intake` |
| Handoff ? DEV | `get_screen` ? code as scaffolding + final Figma | ? |
| Parity Review | Compare implementation with **Figma**, not with Stitch-output | `$design_parity_review` |

> [!CAUTION]
> **The source of truth is determined by the user** during the UX Clarification stage (mandatory question #2).
> Options: **(a) Stitch** ? parity review by Stitch screenshots via MCP,
> **(b) Figma** ? parity review by Figma mockups, **(c) HTML reference** ? parity review by files from the repository.
> If the source of truth is not defined ? consider it a ?? P0 BLOCKER and ask the user.

---

## Exit (Deliverables)

### Stitch Output Package
- **Project ID** and **Screen IDs** (for reproducibility and iterations)
- **Prompt** (saved)
- **List of iterations** (which `edit_screens` calls were executed)
- **State coverage:** which states covered (screenId for each)

### Handoff DEV (if code)
- **HTML/CSS scaffold** from `get_screen` with marker "Stitch-generated, needs DS integration"
- **Layout reference:** which sections, order, responsive breakpoints
- **Not pass:** inline-styles how final, colors without tokens

---

## Response format

### Summary
Short result: what was generated, how many options, which one was selected. Project ID and Screen IDs.

### Deliverables
- Stitch Output Package (Screen IDs / code / Figma-export)
- Prompt (for reproducibility)

### Decisions
Which variant selected and why.

### Risks/Blockers
- Generation limits (remaining budget)
- Consistency (if >3 screens)

### Open Questions
Unresolved questions about layout/style.

### Next Actions (IDs: UX-xx)
- UX-xx: follow-up in Figma
- UX-xx: comparison via `$design_parity_review`

---

## Resources

- **Stitch:** https://stitch.withgoogle.com
- **Google Blog:** https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/
- **MCP Server:** StitchMCP (connected to the agent)
- **SCR prompts:** `examples/scr_prompts.md`
- **Generation budget:** `resources/budget_planner.md`
- **Related skills:** `$design_intake`, `$design_parity_review`
