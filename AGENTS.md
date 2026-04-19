# AGENTS.md — Оркестр веб-разработки

> [!CAUTION]
> **🔴 АБСОЛЮТНОЕ ПРАВИЛО №1:** Пайплайн запрещено пропускать. Без исключений.
> Полный протокол: [pipeline-rules.md](.agents/workflows/pipeline-rules.md)
> Каждый гейт → читать агента → deliverable → HANDOFF → **User sign-off** → следующий гейт.

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
- $golden-canon-grid
- $google-stitch-skill

### Architecture
- $current-state-analysis
- $system-design-checklist
- $architecture-doc
- $architecture-compliance-review
- $lava-flow-legacy-detection
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
- $react-15-3-wix-iframe (условно, только если Wix iFrame / React 15.3)

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
- $design-systems
- $tooling-bun-biome
- $node-express-beast-practices
- $go-beast-practices
- $security-baseline-dev
- $lava-flow-legacy-detection
- $observability-logging
- $dev-reference-snippets
- $mongodb-mongoose-best-practices
- $n8n-pinecone-qdrant-supabase
- $wix-self-hosted-embedded-script
- $wix-iframe-sdk
- $react-15-3-wix-iframe (условно, только если Wix iFrame / React 15.3)
- $tailwind-beast-practices

### Review (Best Practices + Security)
- $code-review-checklist
- $api-contract-compliance-review
- $architecture-compliance-review
- $tests-quality-review
- $security-review
- $security-review-baseline
- $cloud-infrastructure-security
- $dependency-supply-chain-review
- $observability-review
- $performance-review-baseline
- $lava-flow-legacy-detection
- $review-reference-snippets

### DevOps / Infrastructure
- $deployment-ci-plan
- $docker-kubernetes-architecture
- $k8s-manifests-conventions
- $cloud-infrastructure-security
- $observability-logging
- $security-baseline-dev
- $compass-mongodb

### Cross-cutting / Quality (все агенты, все домены)
- $karpathy-guidelines

### Testing (QA)
- $qa-test-plan
- $qa-manual-run
- $qa-browser-testing
- $qa-api-contract-tests
- $qa-security-smoke-tests
- $qa-ui-a11y-smoke
- $qa-e2e-playwright
- $qa-regression-baseline

> [!IMPORTANT]
> **Аудит скиллов:** при проверке синхронизации скиллов между агентами и AGENTS.md **всегда** использовать `view_file` для чтения секции «Используемые skills» в каждом агенте. Не полагаться на `grep` с паттерном `$` — символ `$` некорректно обрабатывается ripgrep/PowerShell, а лимит в 50 результатов может отсечь часть агентов.

---

## Гейты (Pipeline) — 3 режима

### 🔵 Full Pipeline (фичи, рефакторинг) — `/start-task`
PM(PRD) → UX(UX Spec) → ARCH(Architecture/ADR/Contracts) → DEV(TDD) → REV(Security/Best) → OPS(Build/Deploy) → TEST(Test plan/report) → RG(Release Gate)

### 🟢 Bugfix Pipeline (баги) — `/bugfix`
CONDUCTOR → DEV(TDD) → REV(Review) → TEST(Verification + GO/NO-GO)

### 🟡 Hotfix Pipeline (мелочи, blast radius ≈ 0) — `/hotfix`
CONDUCTOR → DEV+TEST(Fix + self-check + GO/NO-GO)

> **Выбор режима:** Conductor определяет по Decision Tree (см. `agents/conductor.md`).
> Approved обязателен на **каждом** гейте, в любом режиме.

---

## Обязательное правило качества (Karpathy Guidelines)

**$karpathy-guidelines обязателен для всех агентов во всех доменах.** Перед любой нетривиальной задачей:
1. **Сначала думай, потом делай** — явно называй предположения, спрашивай при неопределённости.
2. **Делай только то, что просили** — минимум, решающий задачу. Ничего лишнего.
3. **Правь точечно** — трогай только то, что необходимо для задачи.
4. **Работай от результата** — определи проверяемые критерии успеха до начала работы.

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

---

## Обязательное правило перезагрузки Docker-контейнеров
- Для всех изменений в кодовой базе DevOps обязан автоматически перезапускать затронутый сервис в Docker до передачи в REVIEW/TEST.
- Базовое правило команд:
  - Изменения только runtime-кода: `docker compose restart <service>`.
  - Изменения `Dockerfile`/зависимостей/сборки/compose-конфига: `docker compose up -d --build <service>`.
- При изменениях в прокси/шлюзе/общей маршрутизации дополнительно перезапускать `gateway`.
- DevOps обязан приложить в отчёт доказательства:
  - какие сервисы перезапущены,
  - какие команды выполнены,
  - результат health/smoke после перезапуска.

---

## Обязательное подтверждение команд
- **Never auto-run commands that modify files. Always ask for confirmation.**
- Любая команда, изменяющая файлы (запись, удаление, перемещение, установка зависимостей, сборка), должна выполняться с `SafeToAutoRun: false`.

