---
name: design_intake
description: Find and analyze provided design materials (files/links), determine the “source of truth” for the UI and extract verifiable rules (screens, components, tokens, states).
---

# Skill: Design Intake (collection of design sources)

## Goal
Capture which design artifacts are the source of truth and extract testable rules from them for UX Spec and development.

## When to use
- Design files (PDF/PNG/SVG/FIG, etc.) have been added to the repository
- The user provided a link to Figma/other layouts
- Before preparing the UX Spec or before the final UI verification

## Inputs
- Paths to files in the repository (if any)
- Links (if available, for example Figma)
- PRD/UX Spec (if already exist)

## Search for design artifacts (heuristics)
Check availability (if the repository is available):
- Folders: `design/`, `docs/design/`, `assets/design/`, `.figma/`, `ui/`
- Files: `*.fig`, `*.pdf`, `*.png`, `*.jpg`, `*.jpeg`, `*.svg`
- Documents: `README.md`, `docs/*` for the presence of the word “Figma” and links

## Algorithm
1) **Collect sources**:
   - list of files/folders (paths)
   - list of links (if given)
2) **Define the “source of truth”** (Source of Truth):
   - main page/file for MVP screens
   - separate pages/sections for components/tokens (if any)
3) **Extract the specification**:
   - list of screens and their purpose
   - screen structure (main sections)
   - components and options (primary/secondary, sizes, states)
   - states: loading/empty/error/success (if reflected)
   - key content rules (errors, tips, button texts)
4) **Gather a Design Reference Map**:
   - Screen → where described (file/page/frame)
   - Component → where described
5) **Create a “Design Rules Summary”**:
   - 5–20 rules that can be checked (without subjectivity)

## Exit (Deliverables)
###Design Sources
- Files:
- Links:

###Source of Truth
- Screens:
- Components:
- Tokens/Guidelines:

### Design Reference Map
- Screens:
- Components:

### Design Rules Summary
- Rule 1:
- Rule 2:
...

## Response format
### Summary
### Deliverables (Design Sources + Reference Map + Rules)
###Decisions
###Risks/Blockers
### Open Questions
### Next Actions (IDs: UX-xx)