<!-- code-ai: target=gpt-codex; asset=orchestrator; normalized_hints=none -->
<!-- codex: reasoning=medium; note="auto-adapted default" -->
# AGENTS.md - Web Development Orchestra

## Source of truth by roles
Roles are described in:
- agents/conductor.md
- agents/product_manager.md
- agents/ux_ui_designer.md
- agents/architect.md
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
- $release_gate
- $release_gate_checklist_template

### Product Management
- $pm_interview
- $pm_prd
- $pm_backlog

### UX/UI / Design
- $ux_discovery
- $ux_spec
- $ui_inventory
- $a11y_baseline
- $design_intake
- $design_parity_review
- $design_systems
- $ui_a11y_smoke_review

### Architecture
- $current_state_analysis
- $system_design_checklist
- $architecture_doc
- $architecture_compliance_review
- $adr_log
- $api_contracts
- $data_model
- $threat_model_baseline
- $observability_plan
- $deployment_ci_plan
- $docker_kubernetes_architecture
- $k8s_manifests_conventions
- $wix_self_hosted_embedded_script
- $wix_iframe_sdk
- $react_15_3_wix_iframe (conditional, only for Wix iFrame / React 15.3)

### Development (Senior Full Stack)
- $tdd_workflow
- $testing_strategy_js
- $tests_quality_review
- $es2025_beast_practices
- $typescript_beast_practices
- $react_beast_practices
- $tanstack_beast_practices
- $state_zustand_beast_practices
- $state_rtk_beast_practices
- $styling_css_stack
- $tooling_bun_biome
- $node_express_beast_practices
- $go_beast_practices
- $security_baseline_dev
- $observability_logging
- $dev_reference_snippets
- $mongodb_mongoose_best_practices
- $wix_self_hosted_embedded_script
- $wix_iframe_sdk
- $react_15_3_wix_iframe (conditional, only for Wix iFrame / React 15.3)

### Review (Best Practices + Security)
- $code_review_checklist
- $api_contract_compliance_review
- $security_review
- $security_review_baseline
- $cloud_infrastructure_security
- $dependency_supply_chain_review
- $observability_review
- $performance_review_baseline
- $review_reference_snippets

### Testing (QA)
- $qa_test_plan
- $qa_manual_run
- $qa_api_contract_tests
- $qa_security_smoke_tests
- $qa_ui_a11y_smoke
- $qa_e2e_playwright

---

## Gates (Pipeline)
PM(PRD) -> UX(UX Spec) -> ARCH(Architecture/ADR/Contracts) -> DEV(TDD) -> REV(Security/Best) -> TEST(Test plan/report) -> RG(Release Gate)

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
