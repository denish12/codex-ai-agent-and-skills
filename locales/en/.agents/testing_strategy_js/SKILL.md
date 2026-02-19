---
name: testing_strategy_js
description: Testing strategy for JS/TS projects: unit (vitest/jest), integration (API/DB), e2e (playwright) + organization of files and mocks of external services.
---

# Skill: Testing Strategy (JS/TS)

## Unit
- Pure functions, utilities, hooks/component logic
- For UI: test user behavior

## Integration
- API routes/handlers
- Repositories/DB (or test container/emulator)
- Integrations via mocks/contracts

## E2E (Playwright)
- Only critical flows (login/key CRUD/payment/search) - by task

## Organization
- Tests next to the code (unit)
- Integration next to the route/module
- E2E in a separate folder (e2e/)

## Moki
- Mock external services (OpenAI/Redis/Supabase/HTTP)
- Don’t mock everything: preserve the meaning of integration tests

## See also
- Examples: `$dev_reference_snippets`