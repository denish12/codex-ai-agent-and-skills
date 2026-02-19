---
name: ux_discovery
description: Clarify UX introductory to PRD: roles, main flows, navigation, platforms (responsive), brand/references, localization, edge cases.
---

# Skill: UX Discovery

## Target
Collect the missing UX context before creating the UX Spec.

## When to use
- Immediately after receiving the PRD
- When requirements/roles/flows change

## Exit
- List of clarifying questions (5–15), sorted by criticality
- Assumptions, if you can’t move without them
- Draft list of screens/streams

## Questions (ask relevant ones)
### Platform and layout
- Is it desktop-first, mobile-first or equivalent to responsive?
- Key breakpoints/minimum sizes?

### Roles and rights
- What are the user roles? What is prohibited for each role?
- Do you need admin/moderation?

### Navigation and structure
- What are the main sections?
- Is there deep linking/link sharing?

### Brand/visual expectations
- Is there a design system/references?
- If not, do we use a “system UI” (for example, standard patterns of the selected framework)?

### Localization
- One language or several?
- Date/time/currency formats?

### UX edge cases
- What do we show if the data is empty?
- What do we do in case of network/validation errors?
- Which operations are potentially long (need progress/skeletons)?

## Rule
If the answer is critical for the architecture/routing/API, be sure to clarify.
If you can move forward with a safe assumption, make the assumption and celebrate.