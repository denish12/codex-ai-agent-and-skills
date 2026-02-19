---
name: security_baseline_dev
description: Basic security in implementation: validation at boundaries, authz, safe errors, prohibiting secrets in code/logs, dependency hygiene.
---

# Skill: Security Baseline (Dev)

## Rules
- Validation of input data at the border (API/forms)
- Authorization on the server (do not trust the client)
- No secrets in the repository or logs
- Errors without leaking internals
- Dependencies: updates and minimization of unnecessary packages

## See also
- Examples: `$dev_reference_snippets`