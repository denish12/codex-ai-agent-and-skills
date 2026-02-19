---
name: react_beast_practices
description: React best practices: composition, container/presenter, hooks, context, performance (memo/useMemo/useCallback), code splitting, error boundaries, a11y.
---

#Skill: React Beast Practices

## Component patterns
- Composition over inheritance
- Compound components (where appropriate)
- Container/Presenter (separation of data and display)
- Custom hooks for reusable stateful logic

## Performance
- useMemo/useCallback to the point
- React.memo for pure components
- Code splitting/lazy for heavy parts
- Virtualization of long lists (via TanStack Virtual)

## Reliability
- Error boundary to prevent the entire UI from crashing
- Focus controls, keyboard navigation, aria attributes (a11y baseline)

## Forms
- controlled components + validation
- errors and form states - explicit and testable

## See also
- Examples: `$dev_reference_snippets`