---
name: state_rtk_beast_practices
description: Redux Toolkit: предсказуемый state для сложных приложений, slices, async thunks, нормализация, селекторы, тестируемость.
---

# Skill: RTK Beast Practices

## Когда выбирать RTK
- Сложные домены, много событий, сложная синхронизация UI/данных

## Правила
- slices по доменам
- нормализация сущностей
- селекторы и мемоизация
- side effects — через thunks/мидлвары, не в компонентах
