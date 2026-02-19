---
name: go_beast_practices
description: Go best practices: simplicity, errors as values, interfaces, context, concurrency, project structure, linters and testing (TDD).
---

#Skill: Go Beast Practices

## Principles
- Readability > “cleverness”
- Wrap errors in context, do not ignore them
- Context as the first parameter (timeouts/cancel)
- Small interfaces, DI instead of global state
- Gentle competition: worker pools, errgroup, graceful shutdown

##Tooling
- gofmt/goimports
- go test (race, cover)
- golangci-lint (a set of linters for the project)

## Testing
- table-driven tests
- helper functions with t.Helper()
- test isolation, t.Cleanup()