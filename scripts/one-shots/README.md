# One-shot scripts

Scripts in this folder are **one-shot scaffolding generators** used once during domain bootstrap. They are kept for reference and as a pattern for future domains, but are **not expected to be re-run**.

If you re-run them: they are idempotent (overwrite), but the current content of the generated files may be significantly ahead of the scaffold — you will lose work.

## Index

| Script | Purpose | Ran during | Output |
|--------|---------|------------|--------|
| `gen-product-skills.mjs` | Scaffold 32 product-domain skill directories (SKILL.md + 6 per-model config files each) | Phase 1a of product-domain rollout (v2.3.0 release) | `domains/product/.agents/skills/*/` |

## Why keep them?

- **Reference pattern** — when scaffolding a new domain, adapt one of these scripts rather than writing from scratch.
- **Traceability** — the commit history shows exactly what was generated vs. hand-written.
- **Dry-run safety** — if a skill folder is accidentally deleted, the script can regenerate the skeleton (content still needs to be restored from git).

## Future direction

A generic `scripts/domain-scaffolder.mjs` that takes a domain spec (YAML) and generates the full skeleton would replace these one-shots. Not prioritized yet — happens when a 5th domain is added.
