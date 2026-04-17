#!/usr/bin/env node
/**
 * Generator for Phase 1a product-domain skill scaffolding.
 * Creates 32 skill directories, each with SKILL.md skeleton + 6 per-model config files.
 * Idempotent: writes fresh files each run (overwrites).
 *
 * Usage (from repo root):
 *   node scripts/gen-product-skills.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(REPO, "domains", "product", ".agents", "skills");

/** @typedef {{display_name: string, description: string, triggers: string[], category: string, protocol_steps?: string[]}} SkillMeta */

/** @type {Record<string, SkillMeta>} */
const SKILLS = {
  // ===== Discovery (5) =====
  "user-interview-script": {
    display_name: "Скрипт пользовательского интервью (B2B)",
    description: "Структурированный скрипт для B2B интервью — разграничение buyer и end-user, pain-discovery без leading questions",
    triggers: ["user-interview-script", "user interview", "пользовательское интервью", "B2B interview", "customer discovery"],
    category: "Discovery",
  },
  "jtbd-canvas": {
    display_name: "Jobs-to-be-Done Canvas",
    description: "JTBD-канва для B2B продуктов — functional, emotional, social jobs отдельно для buyer и end-user",
    triggers: ["jtbd-canvas", "JTBD", "jobs to be done", "работа на которую нанимают"],
    category: "Discovery",
  },
  "opportunity-solution-tree": {
    display_name: "Opportunity-Solution Tree",
    description: "Дерево возможностей-решений по Терезе Торрес — desired outcome → opportunities → solutions → experiments",
    triggers: ["opportunity-solution-tree", "OST", "дерево возможностей", "Teresa Torres"],
    category: "Discovery",
  },
  "problem-statement": {
    display_name: "Problem Statement",
    description: "Формулировка проблемы продукта — actor, context, pain, root cause, evidence",
    triggers: ["problem-statement", "problem framing", "формулировка проблемы"],
    category: "Discovery",
  },
  "assumption-mapping": {
    display_name: "Assumption Mapping",
    description: "Карта допущений по осям value / usability / feasibility / viability — приоритизация гипотез для тестирования",
    triggers: ["assumption-mapping", "assumption mapping", "карта допущений", "гипотезы"],
    category: "Discovery",
  },
  // ===== Strategy (5) =====
  "product-vision": {
    display_name: "Product Vision",
    description: "Видение продукта — for whom / why / what's unique / 2-3 year horizon / guiding principles",
    triggers: ["product-vision", "product vision", "видение продукта"],
    category: "Strategy",
  },
  "okr-framework": {
    display_name: "OKR Framework",
    description: "Objectives & Key Results для B2B продуктовых команд — квартальный цикл, measurable key results",
    triggers: ["okr-framework", "OKR", "objectives key results"],
    category: "Strategy",
  },
  "north-star-metric": {
    display_name: "North Star Metric",
    description: "Выбор NSM для B2B SaaS — баланс leading/lagging, alignment с customer value и business outcome",
    triggers: ["north-star-metric", "north star", "NSM", "ведущая метрика"],
    category: "Strategy",
  },
  "product-roadmap": {
    display_name: "Product Roadmap",
    description: "Дорожная карта по темам — Now / Next / Later, без жёстких дат, attached к OKR",
    triggers: ["product-roadmap", "roadmap", "дорожная карта", "now next later"],
    category: "Strategy",
  },
  "kano-model": {
    display_name: "Kano Model",
    description: "Классификация фич — must-have / performance / delighters / indifferent / reverse",
    triggers: ["kano-model", "kano", "модель Кано"],
    category: "Strategy",
  },
  // ===== Prioritization (3) =====
  "rice-scoring": {
    display_name: "RICE Scoring",
    description: "Приоритизация по Reach × Impact × Confidence / Effort",
    triggers: ["rice-scoring", "RICE", "reach impact confidence effort"],
    category: "Prioritization",
  },
  "moscow-prioritization": {
    display_name: "MoSCoW Prioritization",
    description: "Приоритизация по Must / Should / Could / Won't — для coarse scope cuts",
    triggers: ["moscow-prioritization", "MoSCoW", "must should could"],
    category: "Prioritization",
  },
  "wsjf-scoring": {
    display_name: "WSJF Scoring",
    description: "Weighted Shortest Job First — SAFe-style приоритизация для enterprise B2B (cost of delay / job size)",
    triggers: ["wsjf-scoring", "WSJF", "weighted shortest job first", "SAFe"],
    category: "Prioritization",
  },
  // ===== Specification (4) =====
  "prd-template": {
    display_name: "PRD Template",
    description: "Шаблон Product Requirements Document для B2B SaaS — problem, solution, stories, AC, NFR, metrics, risks, rollout",
    triggers: ["prd-template", "PRD", "product requirements document", "спецификация продукта"],
    category: "Specification",
  },
  "user-story": {
    display_name: "User Story",
    description: "Написание user stories по INVEST — As a / I want / So that, разделение buyer/end-user",
    triggers: ["user-story", "user story", "пользовательская история", "INVEST"],
    category: "Specification",
  },
  "acceptance-criteria": {
    display_name: "Acceptance Criteria",
    description: "Критерии приёмки — Gherkin (Given / When / Then) или scenario-based",
    triggers: ["acceptance-criteria", "acceptance criteria", "критерии приёмки", "Gherkin"],
    category: "Specification",
  },
  "epic-breakdown": {
    display_name: "Epic Breakdown",
    description: "Декомпозиция эпика на stories с зависимостями, size estimates (S/M/L/XL), critical path",
    triggers: ["epic-breakdown", "epic breakdown", "декомпозиция эпика"],
    category: "Specification",
  },
  // ===== UX (2) =====
  "design-brief": {
    display_name: "Design Brief",
    description: "Бриф для UX/UI дизайнера — context, goals, users, constraints, references, tone",
    triggers: ["design-brief", "design brief", "бриф дизайнера"],
    category: "UX",
  },
  "user-flow": {
    display_name: "User Flow",
    description: "Документация пользовательских флоу — шаги, decision points, happy path + error states",
    triggers: ["user-flow", "user flow", "пользовательский сценарий"],
    category: "UX",
  },
  // ===== Experimentation / Metrics (4) =====
  "hypothesis-template": {
    display_name: "Hypothesis Template",
    description: "Тестируемая гипотеза — We believe / Will result in / We'll know when [metric] reaches [threshold]",
    triggers: ["hypothesis-template", "hypothesis", "гипотеза"],
    category: "Experimentation",
  },
  "ab-test-design": {
    display_name: "A/B Test Design",
    description: "Дизайн A/B-теста — primary metric, MDE, sample size, duration, guardrails, critical region",
    triggers: ["ab-test-design", "A/B test", "сплит-тест", "experiment design"],
    category: "Experimentation",
  },
  "saas-metrics": {
    display_name: "SaaS Metrics",
    description: "B2B SaaS метрики — MRR/ARR, gross/net churn, NRR, LTV/CAC, Payback, Rule of 40, Magic Number",
    triggers: ["saas-metrics", "SaaS metrics", "MRR", "ARR", "churn", "LTV", "CAC", "NRR"],
    category: "Metrics",
  },
  "aarrr-metrics": {
    display_name: "AARRR Metrics (B2B adapted)",
    description: "Pirate metrics — Acquisition, Activation, Retention, Referral, Revenue — адаптация под B2B",
    triggers: ["aarrr-metrics", "AARRR", "pirate metrics", "funnel metrics"],
    category: "Metrics",
  },
  // ===== Release (3) =====
  "launch-checklist": {
    display_name: "Launch Checklist",
    description: "Чеклист запуска — внутренний (dogfooding, training, rollback) + внешний (GTM, customer comms)",
    triggers: ["launch-checklist", "launch checklist", "чеклист запуска"],
    category: "Release",
  },
  "gtm-brief": {
    display_name: "Go-to-Market Brief",
    description: "GTM-бриф — positioning, ICP, messaging, launch channels, sales enablement, pricing hooks",
    triggers: ["gtm-brief", "GTM", "go-to-market", "product launch"],
    category: "Release",
  },
  "release-notes": {
    display_name: "Release Notes (B2B)",
    description: "B2B customer-facing release notes — what's new, why it matters, breaking changes, migration steps",
    triggers: ["release-notes", "release notes", "changelog", "что нового"],
    category: "Release",
  },
  // ===== Shared (5) — copies of analytics-equivalents, retargeted to PM =====
  "board": {
    display_name: "Доска задач",
    description: "Управление pipeline-доской — состояния гейтов, переходы, блокеры, эскалация",
    triggers: ["board", "доска задач", "pipeline board"],
    category: "Shared",
  },
  "handoff": {
    display_name: "Handoff",
    description: "Передача артефактов между гейтами и сессиями — структурированный формат с decision context",
    triggers: ["handoff", "передача", "session handoff"],
    category: "Shared",
  },
  "gates": {
    display_name: "Gates",
    description: "Контроль качества на гейтах — acceptance, rejection, severity (P0/P1/Note), escalation",
    triggers: ["gates", "gate control", "quality gate"],
    category: "Shared",
  },
  "session-prompt-generator": {
    display_name: "Session Prompt Generator",
    description: "Генерация ready-to-paste промпта для следующей сессии — контекст, роль, задачи, входы, ожидаемые выходы",
    triggers: ["session-prompt-generator", "session prompt", "next session prompt"],
    category: "Shared",
  },
  "html-pdf-report": {
    display_name: "HTML→PDF Report",
    description: "Генерация PRD или Product Review Deck из HTML/CSS в PDF — self-contained, print-ready",
    triggers: ["html-pdf-report", "HTML PDF", "PRD PDF", "product review deck"],
    category: "Shared",
  },
  // ===== Visual (1) — copy of analytics report-design, retargeted =====
  "report-design": {
    display_name: "Report Design (PRD / Review Deck)",
    description: "Проектирование макета PRD или Product Review Deck — структура, навигация, визуальная иерархия",
    triggers: ["report-design", "report design", "PRD design", "deck design"],
    category: "Visual",
  },
};

/**
 * Generates SKILL.md skeleton markdown.
 * @param {string} slug
 * @param {SkillMeta} meta
 * @returns {string}
 */
function renderSkillMd(slug, meta) {
  return `---
name: ${slug}
description: ${meta.description}
---
# ${meta.display_name}

> **Категория:** ${meta.category}  ·  **Slug:** \`${slug}\`

## Когда использовать

- [Сценарий 1 — placeholder for Phase 1b expansion]
- [Сценарий 2]
- [Сценарий 3]

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| [Поле] | ✅ | [Описание] |

## Источники данных

1. [Источник 1]
2. [Источник 2]

## Связь с другими скилами

| Скил | Что берём | Когда вызывать |
|------|-----------|----------------|
| \`[skill]\` | [что] | [когда] |

## Протокол

### Шаг 0 — Подготовка

[Placeholder]

### Шаг 1 — [Название шага]

[Placeholder]

## Валидация (Quality Gate)

- [ ] [Критерий]

## Handoff

Результат \`$${slug}\` является входом для:
- [Агент / Скил]

Формат передачи: [описание]. При передаче — использовать \`$handoff\`.

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| [ошибка] | [причина] | [правильный подход] |
`;
}

/**
 * Generates per-model claude/copilot/gemini/qwen JSON.
 * @param {string} slug
 * @param {SkillMeta} meta
 * @returns {object}
 */
function renderModelJson(slug, meta) {
  return {
    name: slug,
    display_name: meta.display_name,
    description: meta.description,
    default_prompt: `Используй $${slug}, когда задача относится к навыку "${meta.display_name}".`,
    triggers: meta.triggers,
    capabilities: [slug],
    tools: [],
    implicit_invocation: true,
  };
}

/**
 * Generates openai YAML config.
 * @param {string} slug
 * @param {SkillMeta} meta
 * @returns {string}
 */
function renderOpenaiYaml(slug, meta) {
  const shortDesc = meta.description.length > 80 ? meta.description.slice(0, 80) : meta.description;
  return `interface:
  display_name: "${meta.display_name}"
  short_description: "${shortDesc}"
  default_prompt: "Используй $${slug}, когда задача относится к навыку \\"${meta.display_name}\\"."
dependencies:
  tools: []
policy:
  allow_implicit_invocation: true
`;
}

/**
 * Generates skill.yaml.
 * @param {string} slug
 * @param {SkillMeta} meta
 * @returns {string}
 */
function renderSkillYaml(slug, meta) {
  const triggersYaml = meta.triggers.map((t) => `  - "${t}"`).join("\n");
  return `version: 1
name: "${slug}"
display_name: "${meta.display_name}"
description: "${meta.description}"
default_prompt: "Используй $${slug}, когда задача относится к навыку \\"${meta.display_name}\\"."
triggers:
${triggersYaml}
capabilities:
  - "${slug}"
tools: []
invocation:
  explicit: true
  implicit: true
localization:
  default_locale: "ru"
  available_locales:
    - "ru"
`;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, "utf8");
}

let count = 0;
for (const [slug, meta] of Object.entries(SKILLS)) {
  const skillDir = path.join(SKILLS_DIR, slug);
  const agentsDir = path.join(skillDir, "agents");

  writeFile(path.join(skillDir, "SKILL.md"), renderSkillMd(slug, meta));

  const modelJson = renderModelJson(slug, meta);
  const modelJsonStr = JSON.stringify(modelJson, null, 2) + "\n";
  for (const model of ["claude", "copilot", "gemini", "qwen"]) {
    writeFile(path.join(agentsDir, `${model}.json`), modelJsonStr);
  }
  writeFile(path.join(agentsDir, "openai.yaml"), renderOpenaiYaml(slug, meta));
  writeFile(path.join(agentsDir, "skill.yaml"), renderSkillYaml(slug, meta));

  count++;
  console.log(`✓ ${slug}`);
}

console.log(`\nGenerated ${count} skills × 7 files = ${count * 7} files`);
