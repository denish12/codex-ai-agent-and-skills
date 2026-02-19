---
name: code_review_checklist
description: Universal review checklist: code quality, readability, testability, security, contracts, DoD.
---

# Skill: Code Review Checklist

## Goal
Quickly evaluate PR for completeness and compliance with standards.

## Checklist
### Code Quality
- [ ] Clear names, small functions/modules
- [ ] No duplication without reason
- [ ] No “magic” (unobvious side effects)
- [ ] Boundaries of layers/modules are respected

### Architecture
- [ ] Corresponds to Architecture Doc / ADR
- [ ] No Tight Coupling / God Object / Big Ball of Mud
- [ ] New solutions are recorded by ADR if necessary

### API & Data
- [ ] Contracts are met (schemas, codes, errors)
- [ ] Validation at the border
- [ ] Data/migration model is consistent

###Tests
- [ ] Unit + Integration tests added/updated
- [ ] Covered happy + edge + error paths
- [ ] No flakes/dependencies of tests on each other

###Security
- [ ] AuthZ on the server
- [ ] No secrets in code/logs
- [ ] Safe errors (no stack/SQL/PII)
- [ ] Dependency hygiene

### Observability & Ops
- [ ] request_id/trace_id correlation (if applicable)
- [ ] Logs are structured, without PII/secrets
- [ ] Startup/check instructions present

## Exit
- PASS: ...
- MISSING: ...
- Findings P0/P1/P2