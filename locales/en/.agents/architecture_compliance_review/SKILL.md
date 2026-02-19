---
name: architecture_compliance_review
description: Checking code compliance with architecture/ADR: module boundaries, layers, dependencies, conventions, red flags.
---

#Skill: Architecture Compliance Review

## Check
- Compliance with modular boundaries (controller/service/repo or similar)
- Direction of dependencies (UI does not pull data directly, etc.)
- Lack of red flags: Big Ball of Mud, God Object, Tight Coupling, Magic
- New “solutions” are issued ADR (if they affect the database/cache/auth/contracts/integrations)

## Exit
- Findings (P0/P1/P2)
- Recommendations for refactoring (pointwise)
- Is ADR required? (yes/no what to describe)