---
name: current_state_analysis
description: Анализ текущей архитектуры репозитория: конвенции, паттерны, техдолг, узкие места масштабирования, риски безопасности и консистентность.
---

# Skill: Current State Analysis

## Цель
Понять текущую систему, чтобы новые решения не ломали конвенции и реально снижали техдолг.

## Когда использовать
- Проект уже существует / есть репозиторий с кодом
- Есть legacy или частично реализованные фичи

## Выход (Deliverables)
- Current Architecture Summary
- Patterns & Conventions
- Technical Debt (top 5–15)
- Scalability limitations
- Security baseline issues (если видны)
- Recommendations (quick wins + strategic)

## Алгоритм
1) Обзор структуры репо (папки, слои, boundaries)
2) Определи ключевые паттерны (FE/BE/data) и стиль
3) Найди “узкие места”:
   - statefulness
   - N+1/медленные запросы
   - сильная связность
   - отсутствие кэширования (если нужно)
   - отсутствие наблюдаемости
4) Зафиксируй техдолг и риски
5) Предложи план исправлений: quick wins vs позже

## Формат ответа
### Summary
### Deliverables
### Findings
- Patterns/Conventions
- Tech Debt
- Scalability Limits
- Security Notes
### Recommendations
### Next Actions (IDs: ARCH-xx)
