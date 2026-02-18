---
name: react_15_3_wix_iframe
description: Legacy режим для Wix iFrame приложений: React 15.3 (класс-компоненты), lifecycle, PropTypes/defaultProps, ограничения без hooks; работа через Wix iFrame SDK.
---

# Skill: React 15.3 + Wix iFrame

## Когда активировать
- Явно сказано: Wix iFrame app / Wix iFrame SDK
- Проект/кодовая база использует React 15.3

## Правила React 15.3
- Использовать class components и lifecycle методы
- setState через корректные паттерны (включая функциональные обновления где нужно)
- PropTypes + defaultProps
- Избегать “новых” API React (hooks, suspense и т.п.)

## Wix iFrame
- Взаимодействие с окружением через Wix iFrame SDK
- Соблюдать ограничения платформы и размеры/позиционирование
