---
name: go_beast_practices
description: Go best practices: простота, ошибки как значения, интерфейсы, контекст, конкурентность, структура проекта, линтеры и тестирование (TDD).
---

# Skill: Go Beast Practices

## Принципы
- Читаемость > “умность”
- Ошибки оборачивать контекстом, не игнорировать
- Context первым параметром (timeouts/cancel)
- Маленькие интерфейсы, DI вместо глобального состояния
- Аккуратная конкурентность: worker pools, errgroup, graceful shutdown

## Tooling
- gofmt/goimports
- go test (race, cover)
- golangci-lint (набор линтеров по проекту)

## Тестирование
- table-driven tests
- helper functions с t.Helper()
- изоляция тестов, t.Cleanup()
