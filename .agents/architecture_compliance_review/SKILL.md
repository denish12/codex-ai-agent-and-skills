---
name: architecture_compliance_review
description: Проверка соответствия кода архитектуре/ADR: границы модулей, слои, зависимости, конвенции, red flags.
---

# Skill: Architecture Compliance Review

## Проверить
- Соответствие модульным границам (controller/service/repo или аналог)
- Направление зависимостей (UI не тянет data напрямую и т.п.)
- Отсутствие red flags: Big Ball of Mud, God Object, Tight Coupling, Magic
- Новые “решения” оформлены ADR (если затрагивают БД/кэш/auth/контракты/интеграции)

## Выход
- Findings (P0/P1/P2)
- Рекомендации по рефакторингу (точечно)
- Требуется ADR? (да/нет, что описать)
