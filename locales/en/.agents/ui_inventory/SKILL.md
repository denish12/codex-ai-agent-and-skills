---
name: ui_inventory
description: Compile an inventory of UI components and rules for reuse: basic components, compositional components, patterns (forms, tables, dialogs), design tokens (minimum).
---

# Skill: UI Components Inventory

## Target
Reduce development costs and maintain UI consistency.

## Exit
List of components in catalog form:

## 1) Basic (atoms)
- Button (variants: primary/secondary/ghost/destructive, sizes)
- Input / Textarea
- Select / Combobox
- Checkbox / Radio / Switch
- Badge / Tag
- Spinner / Skeleton
- Icon
- Tooltip

## 2) Compounds (molecules/organisms)
- FormField (label + control + help + error)
- Modal / Dialog
- Toast / Notification
- Table (sorting/filter/pagination if necessary)
- EmptyState (icon + text + CTA)
- ErrorState (message + retry)
- Pagination
- Navbar / Sidebar
- Breadcrumbs (if needed)

## 3) Patterns
- Loading strategy (skeleton vs spinner)
- Empty vs zero-results
- Bugs: levels (inline/page/toast)
- Confirmation of destructive actions
- Processing long operations (progress, optimistic UI)

## 4) Minimum design tokens (if there is no design system)
- Spacing scale (for example: 4/8/12/16/24/32)
- Border radius levels
- Typography: headings/text/captions
- State colors: success/warn/error/info (without specific hex, if not specified)

## Rule
If there is a ready-made design system, inventory is tied to its components/options.
If not, describe components with minimal parameters sufficient for implementation and testing of UX Spec.