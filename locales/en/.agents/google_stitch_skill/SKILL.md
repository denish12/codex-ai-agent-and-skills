---
name: google_stitch_skill
description: Generate UI screens with Google Stitch (AI) through direct StitchMCP access. Rapid ideation after an Approved UX Proposal, prompt engineering, and output quality control. Mapped to the UX/UI Designer gate.
last_verified: 2026-03-11
version: 3.0
mcp_server: StitchMCP
---

# Skill: Google Stitch — AI UI Generation (MCP-Integrated)

## Purpose
Explains how and when the UX/UI Designer should use Google Stitch:
- for rapid first-pass screen generation from prompts,
- as a bridge between the approved UX proposal and Figma handoff,
- for frontend code scaffolding as a starting point for DEV.

> [!IMPORTANT]
> Stitch 3.0 is available directly through MCP.
> It is a rapid prototyping tool, not the final source of truth.
> Every result still needs Figma polishing and parity review via `$design_parity_review`.

## What Stitch is
Google Stitch is an AI UI generation tool from Google Labs. It turns text prompts into UI mockups and can export to Figma and HTML/CSS/React code.

- Engine: Gemini 3 Pro / Gemini 3 Flash
- URL: https://stitch.withgoogle.com
- Access: Google account + StitchMCP server connected to the agent

## Available MCP tools
- `create_project`
- `list_projects`
- `get_project`
- `list_screens`
- `get_screen`
- `generate_screen_from_text`
- `edit_screens`
- `generate_variants`

## Model and device guidance
- `GEMINI_3_FLASH`: rapid exploration and early variants
- `GEMINI_3_PRO`: final candidate and complex layouts
- `DESKTOP`: dashboards/admin panels
- `MOBILE`: mobile UI
- `TABLET`: tablet layouts
- `AGNOSTIC`: popups, widgets, and modals

## Workflow position
PRD -> UX Clarification -> UX Proposal (Approved) -> Stitch MCP ideation -> Figma polish -> UX Spec + Screen Inventory -> Parity Review -> Handoff to ARCH/DEV

## When to use Stitch
- After UX Proposal is Approved
- To show PM/client how a flow could look before detailed design polish
- To generate multiple variants of one screen
- To bootstrap a quick frontend prototype

## When not to use Stitch
- Final pixel-perfect UI with a strict design system
- Complex multi-screen flows where consistency across many screens is critical
- Cases where polished Figma already exists
- Motion-heavy or interaction-heavy design work

## Inputs
- Approved UX Proposal
- PRD / User Stories
- Design tokens and brand hints for prompts
- Existing Stitch screen IDs for `edit_screens` / `generate_variants`

## MCP algorithm
1. Find or create a project.
2. Generate the first screen with `generate_screen_from_text`.
3. Refine with `edit_screens`.
4. Generate alternatives with `generate_variants` when needed.
5. Fetch screen code/metadata with `get_screen`.
6. Move approved direction to Figma for polish.

## Prompt checklist
- Screen type
- Platform / device context
- Required content and controls
- State (default/loading/empty/error/success)
- Style block (palette, typography, spacing, radius)
- Constraints (what must not appear)
- Exact container size for embedded UI

## Export and polish
- Use Stitch output as ideation or scaffold only
- Copy to Figma through the browser UI
- Replace fonts/colors/components with project design system assets
- Normalize spacing and accessibility before handoff

## Limitations
- Cross-screen consistency is weak without explicit prompt discipline
- No DS token support out of the box
- Complex flows over 3 screens lose coherence
- MCP generation can take minutes; do not spam retries
- Generated code is not production-ready

## Existing SCR projects
- Wix Native Style Popup — `9413055351550649236`
- Rules & Triggers Wix Redesign — `4150501200823065821`

## Workflow cards
### Rapid Screen Ideation
- Model: `GEMINI_3_FLASH`
- DoD: one layout direction selected and approved

### Existing Screen Iteration
- Model: `GEMINI_3_FLASH` -> `GEMINI_3_PRO`
- DoD: screen goes through 2+ feedback iterations and is approved

### State Coverage
- Generate default, loading, empty, and error states for the same screen

### SCR Popup Template
- Device: `AGNOSTIC`
- Use template brief + style block + constraints
- DoD: variant ready for Figma polish and parity review
