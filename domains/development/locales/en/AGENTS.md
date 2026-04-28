<!-- code-ai: target=gpt-codex; asset=orchestrator; normalized_hints=none -->
<!-- codex: reasoning=medium; note="auto-adapted default" -->
# AGENTS.md - Web Development Orchestra

## Source of truth by roles
Roles are described in:
- agents/conductor.md
- agents/product_manager.md
- agents/ux_ui_designer.md
- agents/architect.md
- agents/devops.md
- agents/senior_full_stack.md
- agents/reviewer.md
- agents/tester.md

Follow these roles during work. If needed, open the corresponding role file and apply it.

---

## Skills (explicitly call)
Use skills (folders with `SKILL.md`). Full list:

### Core / Orchestration
- $board
- $handoff
- $memory
- $gates
- $release-gate
- $release-gate-checklist-template

### Product Management
- $pm-interview
- $pm-prd
- $pm-backlog

### UX/UI / Design
- $ux-discovery
- $ux-spec
- $ui-inventory
- $a11y-baseline
- $design-intake
- $design-parity-review
- $design-systems
- $ui-a11y-smoke-review
- $google-stitch-skill

### Architecture
- $current-state-analysis
- $system-design-checklist
- $architecture-doc
- $architecture-compliance-review
- $design-patterns-reference
- $adr-log
- $api-contracts
- $data-model
- $threat-model-baseline
- $observability-plan
- $deployment-ci-plan
- $docker-kubernetes-architecture
- $k8s-manifests-conventions
- $n8n-pinecone-qdrant-supabase
- $wix-self-hosted-embedded-script
- $wix-iframe-sdk
- $react-15-3-wix-iframe (conditional, only for Wix iFrame / React 15.3)

### Development (Senior Full Stack)
- $tdd-workflow
- $testing-strategy-js
- $tests-quality-review
- $es2025-beast-practices
- $typescript-beast-practices
- $react-beast-practices
- $tanstack-beast-practices
- $state-zustand-beast-practices
- $state-rtk-beast-practices
- $styling-css-stack
- $tooling-bun-biome
- $node-express-beast-practices
- $go-beast-practices
- $security-baseline-dev
- $observability-logging
- $dev-reference-snippets
- $mongodb-mongoose-best-practices
- $n8n-pinecone-qdrant-supabase
- $wix-self-hosted-embedded-script
- $wix-iframe-sdk
- $tailwind-beast-practices
- $react-15-3-wix-iframe (conditional, only for Wix iFrame / React 15.3)

### Review (Best Practices + Security)
- $code-review-checklist
- $api-contract-compliance-review
- $security-review
- $security-review-baseline
- $cloud-infrastructure-security
- $dependency-supply-chain-review
- $observability-review
- $performance-review-baseline
- $review-reference-snippets

### Cross-cutting / Quality (all agents, all domains)
- $karpathy-guidelines — mandatory before any non-trivial task

### Testing (QA)
- $qa-test-plan
- $qa-manual-run
- $qa-api-contract-tests
- $qa-browser-testing
- $qa-security-smoke-tests
- $qa-ui-a11y-smoke
- $qa-e2e-playwright

---

## Gates (Pipeline)
PM(PRD) -> UX(UX Spec) -> ARCH(Architecture/ADR/Contracts) -> DEV(TDD) -> REV(Security/Best) -> OPS(Infrastructure/CI-CD) -> TEST(Test plan/report) -> RG(Release Gate)

---

## Mandatory function documentation rule
- For all functions in the codebase, use a JSDoc block in this format:

```js
/**
 * Calculates the sum of two numbers.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} Sum of a and b.
 */
function add(a, b) {
    return a + b;
}
```

- This requirement is mandatory for DEV and REV stages.

## Mandatory TDD rule
- Apply the TDD cycle to all development tasks: RED -> GREEN -> REFACTOR.
- This requirement is mandatory for DEV and REV stages (same as JSDoc).
