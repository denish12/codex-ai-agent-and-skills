<!-- code-ai: target=gpt-codex; asset=orchestrator; normalized_hints=none -->
<!-- codex: reasoning=medium; note="auto-adapted default" -->
# AGENTS.md — Оркестр веб-разработки

## Источник правды по ролям
Роли описаны в:
- agents/conductor.md
- agents/product_manager.md
- agents/ux_ui_designer.md
- agents/architect.md
- agents/devops.md
- agents/senior_full_stack.md
- agents/reviewer.md
- agents/tester.md

При работе следуй этим ролям. Если нужно — открывай соответствующий файл роли и применяй.

---

## Skills (явно вызывай)
Используй skills (папки с `SKILL.md`). Полный список:

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
- $google_stitch_skill

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
- $n8n_pinecone_qdrant_supabase
- $wix_self_hosted_embedded_script
- $wix_iframe_sdk
- $react_15_3_wix_iframe (условно, только если Wix iFrame / React 15.3)

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
- $n8n_pinecone_qdrant_supabase
- $wix_self_hosted_embedded_script
- $wix_iframe_sdk
- $react_15_3_wix_iframe (условно, только если Wix iFrame / React 15.3)

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
- $qa_browser_testing
- $qa_security_smoke_tests
- $qa_ui_a11y_smoke
- $qa_e2e_playwright

---

## Гейты (Pipeline)
PM(PRD) → UX(UX Spec) → ARCH(Architecture/ADR/Contracts) → DEV(TDD) → REV(Security/Best) → TEST(Test plan/report) → RG(Release Gate)

---

## Обязательное правило документации функций
- Для всех функций в кодовой базе использовать JSDoc-блок в формате:

```js
/**
 * Считает сумму двух чисел.
 * @param {number} a - Первое число.
 * @param {number} b - Второе число.
 * @returns {number} Сумма a и b.
 */
function add(a, b) {
    return a + b;
}
```

- Требование обязательное для DEV и REV этапов.

## Обязательное правило TDD
- Для всех задач разработки применять TDD-цикл: RED → GREEN → REFACTOR.
- Требование обязательное для DEV и REV этапов (наравне с JSDoc).
