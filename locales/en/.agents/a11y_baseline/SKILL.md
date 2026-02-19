---
name: a11y_baseline
description: Minimum baseline accessibility for web UI: keyboard navigation, focus management, form labels, ARIA for interactive components, error messages.
---

#Skill: A11y Baseline (minimum)

## Goal
Set minimum accessibility requirements that can be tested and implemented in the MVP.

## Exit
List of a11y requirements for the project + notes on key components.

## Minimum Requirements (MVP)
1) **Keyboard navigation**
- All interactive elements are accessible from the keyboard
- Tab order is logical
- No trick traps

2) **Focus states**
- Visible focus for all interactive elements
- In modals: focus moves inside and returns back when closed

3) **Forms**
- Each field has a label (visible or aria-label)
- Errors are assigned to a field (the error description is read by assistive technologies)
- Required fields are marked and clear

4) **ARIA (where needed)**
- Dialog: role="dialog" + aria-modal
- Tabs, dropdowns, comboboxes - correct roles/attributes (if we use custom ones)

5) **Error messaging**
- Errors are clear, without “unknown error”
- There are actions: retry/close/fix

## Receipt for tester
- You can go through key flows without a mouse
- In modal, focus does not leak
- Forms announce label/errors
- Custom components have ARIA and work with assistive technologies