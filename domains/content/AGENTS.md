# Оркестратор контент-домена

## Обзор
Контент-домен — система агентов для производства контента: социальные сети, email, блоги, визуальные концепции.

## Пайплайн
```
CONDUCTOR → STRATEGIST → RESEARCHER → COPYWRITER → VISUAL_CONCEPT → REVIEWER → RELEASE GATE
```

## Агенты

| Роль | Файл | Зона ответственности |
|------|-------|---------------------|
| Conductor | agents/conductor.md | Оркестрация, роутинг задач, гейт-контроль |
| Strategist | agents/strategist.md | Контент-стратегия, календарь, аудитория |
| Researcher | agents/researcher.md | Тренды, факт-чекинг, источники |
| Copywriter | agents/copywriter.md | Тексты, ToV, заголовки, CTA |
| Visual Concept | agents/visual_concept.md | Визуальная концепция, AI-промпты, бренд |
| Reviewer | agents/reviewer.md | Качество, факт-чек, compliance |

## Воркфлоу

| Команда | Режим | Гейты |
|---------|-------|-------|
| /start-content | Full Pipeline | CONDUCTOR → STRATEGIST → RESEARCHER → COPYWRITER → VISUAL_CONCEPT → REVIEWER → RG |
| /edit-content | Edit Pipeline | CONDUCTOR → COPYWRITER → REVIEWER |
| /quick-post | Quick Pipeline | CONDUCTOR → COPYWRITER+REVIEWER |

## Скилы

### Conductor
- $board — управление доской задач
- $handoff — передача между гейтами
- $gates — контроль гейтов
- $content-release-gate — финальный гейт перед публикацией

### Strategist
- $content-calendar — контент-календарь
- $audience-analysis — анализ целевой аудитории
- $platform-strategy — стратегия по платформам
- $competitor-content-analysis — анализ контента конкурентов
- $content-brief — бриф на создание контента

### Researcher
- $trend-research — исследование трендов
- $topic-research — глубокое исследование темы
- $source-verification — верификация источников
- $data-storytelling — data-driven нарративы

### Copywriter
- $tone-of-voice — тон голоса бренда
- $headline-formulas — формулы заголовков
- $social-media-formats — форматы соцсетей
- $email-copywriting — email-копирайтинг
- $storytelling-framework — фреймворк сторителлинга
- $cta-optimization — оптимизация CTA
- $seo-copywriting — SEO-копирайтинг

### Visual Concept
- $visual-brief — визуальный бриф
- $brand-guidelines — гайдлайны бренда
- $image-prompt-engineering — промпт-инженерия для изображений
- $platform-visual-specs — спецификации визуалов по платформам
- $moodboard — мудборд

### Reviewer
- $content-review-checklist — чеклист ревью контента
- $brand-compliance — соответствие бренду
- $fact-checking — факт-чекинг
- $readability-scoring — оценка читаемости
- $platform-compliance — соответствие требованиям платформ

### Cross-cutting / Quality (все агенты домена)
- $karpathy-guidelines — обязателен перед любой нетривиальной задачей
