---
name: ux_spec
description: Generate UX Spec: user flows, IA, list of screens, specification of each screen (actions/sections/validations/states), UX quality criteria for development and testing.
---

# Skill: UX Spec (Flows + Screens + States)

## Target
Make a specification according to which the UI can be implemented without “speculation”.

## Exit
UX Spec in structure:

## 1) Users & Roles
- Roles:
- Rights/restrictions:

## 2) Key User Flows
For each thread:
- Trigger (where to start)
- Steps (1..n)
- Success outcome
- Failure/edge outcomes

## 3) Information Architecture (IA)
- Navigation map (sections/screens)
- Access rules (if the role affects visibility)

## 4) Screens Spec (for each screen)
### Screen: <Name>
- Purpose:
- Primary actions:
- Sections/components:
- Forms & validation (if available):
- States:
  - Loading:
  - Empty:
  - Error:
  - Success:
- Notifications (toasts/modals):
- Permissions notes:
- Analytics events (if needed):
- Notes:

## 5) UI Rules (minimal)
- Conventions: primary/secondary buttons, destructive actions, confirmations
- Tables/lists: sorting/filters/pagination (if applicable)
- Forms: inline errors, disabled submit, required markers

## Quality (checklist)
- No “holes”: every critical scenario from the PRD is covered by a flow + screen
- For screens, the loading/empty/error/success states are described
- Validation of forms is specific
- There are rules for destructive actions (confirm/undo)
- All sections/components on the screen are indicated (there is no “and there will be ...”)
- All user actions are indicated (clicks, navigation, forms)