---
name: state_zustand_beast_practices
description: Zustand: простой глобальный state без prop drilling, модульность стора, селекторы, избегание лишних ререндеров.
---

# Skill: Zustand Beast Practices

## Правила
- Небольшие стооры по доменам, а не один “бог-стор”
- Селекторы и shallow сравнение для производительности
- Логику — в actions, UI — в компоненты
