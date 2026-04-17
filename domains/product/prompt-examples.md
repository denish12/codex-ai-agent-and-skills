# Примеры промптов — Product Management домен

## Когда использовать какой воркфлоу

| Задача | Воркфлоу |
|--------|----------|
| Новое направление, нужна стратегия + полный план → релиз + PDF | `/ship-right-thing` |
| Стратегия понятна, надо решить **что и сколько** включить в scope | `/shape-prioritize` |
| Написать PRD по готовому решению (стратегия + scope заданы) | `/spec` |
| Быстрая продуктовая оценка 1-2 часа | `/quick-pm` |

## Шаблоны вызова

### Full A — `/ship-right-thing`
```
/ship-right-thing

Context: B2B SaaS, [описание продукта, ARR, сегмент].
Question: Should we build [initiative]? For whom, why, what's the business case, and what's the full plan?

Attachments: [customer data, competitor info, revenue numbers]
```

### Full B — `/shape-prioritize`
```
/shape-prioritize

Context: [utverzhdennaya strategy + roadmap theme]
Question: What's the right MVP scope for [feature/initiative]? What do we cut?

Constraints: [team size, timeline, tech constraints]
```

### Spec — `/spec`
```
/spec

Initiative: [name]
Strategy context: [approved]
Scope decision: [approved]
Output: PRD with user stories, acceptance criteria, NFR, rollout plan
```

### Quick — `/quick-pm`
```
/quick-pm

Question: [focused PM question]
Depth: 1 session, no adversarial debate
```

## Примеры B2B SaaS запросов

1. **Discovery-heavy strategic:**
   > «Мы — B2B SaaS в HR-tech, $5M ARR, 120 clients (SMB + mid-market). Видим рост interest от enterprise. Стоит ли pivotнуться на enterprise, или углублять SMB? Нужен full план с discovery, альтернативами и PRD для первого шага.»
   → `/ship-right-thing`

2. **Scope debate:**
   > «Утвердили feature: native Slack integration. Backend оценил 3-6 спринтов. Нужно решить финальный scope для Q2-запуска, сохранив 5-недельный pipeline.»
   → `/shape-prioritize`

3. **PRD по готовому решению:**
   > «Scope утверждён: SSO через SAML + SCIM provisioning. Нужен PRD с user stories, acceptance criteria и план запуска.»
   → `/spec`

4. **Быстрая оценка:**
   > «Стоит ли добавить dark mode? Сколько клиентов просят, какой impact на retention?»
   → `/quick-pm`

## Anti-patterns

| Ошибка | Правильно |
|--------|-----------|
| Запускать `/ship-right-thing` для простого фикса | Использовать `/quick-pm` или сразу `/spec` |
| Пропускать Discovery и сразу писать PRD | Discovery даёт JTBD и assumptions — без них PRD в вакууме |
| Игнорировать adversarial результат | Mediator synthesis — обязательный input в PM-сессию |
| Смешивать Customer-vs-Business и Build-vs-Cut в одной сессии | Разные пайплайны, разные axes — запускать последовательно |
