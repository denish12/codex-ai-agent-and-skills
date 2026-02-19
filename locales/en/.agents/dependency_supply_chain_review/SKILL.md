---
name: dependency_supply_chain_review
description: Dependency review: minimization, updates, vulnerability audit, licenses, banning of unsafe packages.
---

#Skill: Dependency & Supply Chain Review

## Check
- New dependencies are really needed (no unnecessary ones)
- Versions are not outdated/vulnerable (according to available reports/project audit)
- Lockfile updated correctly
- No “questionable” packages for critical functions
- Licenses are acceptable (if the project requires)

## Exit
- List of suspicious/unnecessary packages
- Recommendations: delete/replace/fix version

## See also
- Examples and anti-examples: $review_reference_snippets