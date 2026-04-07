---
name: image-prompt-engineering
description: Промпт-инженерия для AI-изображений — шаблоны по инструментам, библиотека стилей, композиция, бренд-палитра, workaround'ы артефактов
---
# Image Prompt Engineering — Промпт-инженерия для AI-изображений

## Когда использовать
- При создании **AI-генерированных изображений** для контента (Midjourney, DALL-E, Stable Diffusion, Flux).
- При **итерации** — результат не соответствует ожиданиям, нужно уточнить промпт.
- Как часть **`$visual-brief`** — промпт создаётся на основе визуального брифа.

## Вход

| Поле | Обязательно | Описание |
|------|:-----------:|----------|
| Visual brief | ✅ | Из `$visual-brief` — что должно быть на изображении, настроение, стиль |
| Бренд-палитра | ✅ | Из `$brand-guidelines` — цвета (HEX), стиль фото/иллюстраций |
| Платформа | ✅ | Определяет соотношение сторон и стиль |
| Инструмент | ✅ | Midjourney / DALL-E 3 / Stable Diffusion / Flux — разный синтаксис |
| Настроение | ⬚ | Если не указано в visual brief — определить из контекста контента |
| Референсы | ⬚ | Примеры желаемого стиля — URL или описание |
| Текст на изображении | ⬚ | Если нужен текст — указать (или избежать генерации текста AI) |

> Если visual brief не предоставлен — **запросить** или направить на `$visual-brief`. Промпт без брифа = случайный результат.

## Анатомия промпта

Промпт строится из блоков, от конкретного к общему:

```
[1. Субъект] + [2. Действие/Поза] + [3. Окружение] + [4. Стиль/Медиум] + 
[5. Освещение] + [6. Цветовая палитра] + [7. Композиция/Ракурс] + 
[8. Настроение] + [9. Технические параметры]
```

| Блок | Описание | Примеры ключевых слов |
|------|----------|----------------------|
| **1. Субъект** | Кто/что в центре. Максимально конкретно. | «young woman in a navy blazer», «abstract geometric shapes», «coffee cup on marble table» |
| **2. Действие/Поза** | Что делает субъект | «working on laptop», «looking at camera», «floating in mid-air» |
| **3. Окружение** | Где находится, фон | «modern office», «white studio background», «autumn forest» |
| **4. Стиль/Медиум** | Как выглядит (см. библиотеку) | «editorial photography», «flat illustration», «3D render» |
| **5. Освещение** | Тип света | «soft natural light», «dramatic side lighting», «golden hour» |
| **6. Палитра** | Цвета (привязать к бренду) | «teal and coral color scheme», «monochrome blue tones» |
| **7. Композиция** | Ракурс и кадр (см. таблицу) | «close-up», «bird's eye view», «rule of thirds» |
| **8. Настроение** | Эмоция / атмосфера | «calm and professional», «energetic and bold», «minimalist and clean» |
| **9. Параметры** | Техническое (зависит от инструмента) | `--ar 4:5 --v 6.1 --q 2` (MJ), размер (DALL-E) |

## Библиотека стилей

### Фотография

| Стиль | Ключевые слова | Когда использовать |
|-------|---------------|-------------------|
| **Editorial** | editorial photography, magazine style, high fashion | Имиджевый контент, бренд |
| **Lifestyle** | lifestyle photography, candid, authentic, natural | Соцсети, everyday scenes |
| **Product** | product photography, studio lighting, clean background | E-commerce, товары |
| **Documentary** | documentary style, photojournalism, raw, unfiltered | Кейсы, behind the scenes |
| **Cinematic** | cinematic, anamorphic, film grain, shallow depth of field | YouTube thumbnails, hero images |
| **Minimal** | minimalist photography, negative space, clean composition | B2B, tech, premium |
| **Aerial** | drone shot, aerial view, bird's eye perspective | Landscapes, масштабные сцены |

### Иллюстрация

| Стиль | Ключевые слова | Когда использовать |
|-------|---------------|-------------------|
| **Flat** | flat illustration, vector style, clean lines, solid colors | UI, инфографика, tech |
| **Isometric** | isometric illustration, 3D isometric, technical | Диаграммы, процессы, tech |
| **Watercolor** | watercolor painting, soft edges, flowing colors | Lifestyle, wellness, premium |
| **Line art** | line drawing, ink illustration, hand-drawn | Минимализм, образование |
| **Retro/Vintage** | retro illustration, 70s style, vintage poster | Развлечение, ностальгия |
| **Cartoon** | cartoon style, character design, playful | Юмор, молодёжь, mascot |
| **Geometric** | geometric abstract, shapes, bauhaus style | Tech, modern, branding |

### 3D и Digital

| Стиль | Ключевые слова | Когда использовать |
|-------|---------------|-------------------|
| **3D Render** | 3D render, octane render, cinema 4D, glossy | Tech, product, hero images |
| **Clay/Soft 3D** | clay render, soft 3D, pastel, rounded shapes | Friendly tech, SaaS, startup |
| **Glassmorphism** | frosted glass, translucent, glassmorphism | UI-стиль, modern tech |
| **Neon/Cyberpunk** | neon lights, cyberpunk, futuristic, dark | Gaming, nightlife, tech events |
| **Paper craft** | paper cut art, layered paper, shadow depth | Креативный, craft, eco |

## Композиция и ракурсы

| Приём | Ключевые слова | Эффект |
|-------|---------------|--------|
| **Close-up** | close-up shot, macro, detailed | Фокус на деталях, эмоция |
| **Medium shot** | medium shot, waist-up, half-body | Баланс субъекта и контекста |
| **Wide shot** | wide shot, full-body, establishing shot | Контекст, окружение |
| **Bird's eye** | bird's eye view, top-down, flat lay | Обзор, flat lay фото |
| **Low angle** | low angle shot, worm's eye view | Мощь, доминирование |
| **Rule of thirds** | rule of thirds composition, off-center | Динамика, профессионализм |
| **Symmetry** | symmetrical composition, centered | Порядок, премиум |
| **Negative space** | lots of negative space, minimalist | Место для текста, чистота |
| **Dutch angle** | dutch angle, tilted, dynamic | Напряжение, энергия |
| **Over the shoulder** | over the shoulder shot, POV | Вовлечение, перспектива |

## Структура промптов по инструментам

### Midjourney

```
[субъект], [действие], [окружение], [стиль], [освещение], [палитра], [композиция], [настроение] --ar [ratio] --v 6.1 --q 2 --s [stylize 0-1000]
```

| Параметр | Описание | Значения |
|----------|----------|----------|
| `--ar` | Соотношение сторон | `1:1`, `4:5`, `16:9`, `9:16` |
| `--v` | Версия модели | `6.1` (актуальная) |
| `--q` | Качество | `1` (стандарт), `2` (высокое) |
| `--s` | Стилизация | `0` (точно по промпту) — `1000` (максимально художественно) |
| `--no` | Negative prompt | `--no text, watermark, blur` |
| `--chaos` | Вариативность | `0` (предсказуемо) — `100` (хаотично) |

### DALL-E 3

```
Описательный текст на естественном языке. Подробное описание сцены, стиля, настроения.
Размер: 1024x1024, 1792x1024, 1024x1792.
```

**Особенности:**
- Принимает естественный язык (не теги).
- Описывать сцену целиком, как рассказ.
- Нет negative prompt — вместо этого явно указать «without text», «no people».
- Лучше справляется с текстом на изображениях (но не идеально).

### Stable Diffusion / Flux

```
[субъект], [действие], [окружение], [стиль], [освещение], [палитра], [качество теги]

Negative prompt: [что исключить]
Steps: 30-50, CFG: 7-12, Sampler: DPM++ 2M Karras
```

**Особенности:**
- Теги через запятую, качество-теги в конце: `masterpiece, best quality, 8k`.
- Negative prompt — отдельное поле, критически важен.
- Больше контроля через ControlNet, LoRA, img2img.

## Привязка к бренд-палитре

Как встроить цвета бренда из `$brand-guidelines`:

| Метод | Пример | Надёжность |
|-------|--------|------------|
| **Прямое указание HEX** | `color palette of #1A73E8 and #FFC107` | Средняя (AI интерпретирует приблизительно) |
| **Описание цвета** | `deep ocean blue and warm amber tones` | Высокая (AI лучше понимает описания) |
| **Референс настроения** | `corporate blue and gold, professional` | Высокая |
| **Ограничение палитры** | `monochrome using only shades of teal` | Высокая |
| **Негативный контроль** | `--no red, green, warm colors` (MJ) | Высокая |

> Лучший подход: **описание цвета + negative исключение** ненужных цветов.

## Типичные проблемы AI и Workaround'ы

| Проблема | Симптом | Workaround |
|----------|---------|------------|
| **Руки / пальцы** | 6 пальцев, деформация | Спрятать руки: «hands behind back», «hands in pockets», «close-up of face only» |
| **Текст на изображении** | Мусорный текст, искажённые буквы | Добавить в negative: `--no text, letters, words`. Текст добавлять в редакторе. Для DALL-E 3: можно попробовать, но проверять |
| **Лица** | Uncanny valley, несимметричные | Уточнить: `natural facial features, photorealistic portrait`. Или отвернуть: `back view, silhouette` |
| **Симметрия** | Асимметричные объекты | Добавить: `perfectly symmetrical, mirror symmetry` |
| **Слишком буквально** | AI трактует метафору как объект | Добавить: `artistic interpretation, conceptual` |
| **Перенасыщенность** | Слишком яркие, кислотные цвета | Добавить: `muted tones, desaturated, soft palette`. Negative: `--no oversaturated, neon` |
| **Слишком много деталей** | Хаотичная композиция | Добавить: `minimalist, clean, simple composition, negative space` |
| **Не тот стиль** | AI не понимает стиль | Использовать референс: `in the style of [конкретный стиль]`, добавить 2-3 стилевых тега |
| **AI-артефакты** | Размытые области, артефакты сжатия | Upscale, inpaint проблемные области, или regenerate с `--q 2` |

## Протокол

### Шаг 1 — Сбор контекста
1. Получить visual brief (`$visual-brief`) — что изображать, настроение, стиль.
2. Загрузить бренд-палитру (`$brand-guidelines`) — цвета, стиль.
3. Определить платформу → соотношение сторон.
4. Определить инструмент генерации.

### Шаг 2 — Сборка промпта
1. Заполнить все 9 блоков анатомии промпта.
2. Выбрать стиль из библиотеки.
3. Выбрать композицию/ракурс.
4. Встроить бренд-палитру (описание + negative).
5. Добавить технические параметры инструмента.

### Шаг 3 — Negative prompt
1. Базовый набор: `ugly, blurry, low quality, watermark, distorted, deformed`.
2. Добавить контекстные исключения: нежелательные цвета, объекты, стили.
3. Добавить workaround'ы (текст, руки — если актуально).

### Шаг 4 — Варианты
1. Создать **3 варианта** с разными акцентами:
   - Вариант A — основной (точно по брифу).
   - Вариант B — другой стиль (альтернативный медиум).
   - Вариант C — другая композиция (другой ракурс).
2. Если нужна версия для другого инструмента — адаптировать синтаксис.

### Шаг 5 — Pre-generation чеклист
Перед генерацией проверить:
1. Субъект конкретен? (не «человек», а «young woman in navy blazer, short dark hair»)
2. Стиль определён? (не «красиво», а «editorial photography, soft natural light»)
3. Палитра соответствует бренду?
4. Соотношение сторон правильное для платформы?
5. Negative prompt адекватен?
6. Нет запроса на текст (если инструмент плохо с ним справляется)?

## Валидация (Quality Gate)

Промпт считается готовым если:

- [ ] Все 9 блоков анатомии заполнены (или осознанно пропущены)
- [ ] Стиль выбран из библиотеки и соответствует `$brand-guidelines`
- [ ] Палитра привязана к бренду (описание + negative)
- [ ] Соотношение сторон соответствует платформе
- [ ] Negative prompt включает базовый набор + контекстные исключения
- [ ] Создано ≥ 3 варианта с разными акцентами
- [ ] Pre-generation чеклист пройден
- [ ] Промпт адаптирован под конкретный инструмент (синтаксис, параметры)

## Handoff

| Потребитель | Как использует |
|-------------|---------------|
| `$visual-brief` | Промпт как часть визуального брифа |
| Visual Concept (агент) | Генерирует изображения по промптам |
| `$content-review-checklist` | Ревьюер проверяет результат генерации (пункт #25 — AI-артефакты) |
| `$content-release-gate` | AI-промпты приложены к пакету публикации |

## Интеграция с другими скилами

| Скил | Взаимодействие |
|------|----------------|
| `$visual-brief` | **Источник:** ЧТО изображать → промпт описывает КАК |
| `$brand-guidelines` | **Источник:** палитра, стиль фото/иллюстраций |
| `$platform-visual-specs` | **Источник:** размеры и соотношения сторон |
| `$moodboard` | **Источник:** референсы настроения и стиля |
| `$content-review-checklist` | **Потребитель:** проверка результата на AI-артефакты |

## Anti-patterns

| Ошибка | Почему плохо | Как правильно |
|--------|-------------|---------------|
| «Beautiful image of marketing» | Слишком абстрактно, AI не знает что генерировать | Конкретный субъект: «woman presenting data on screen in modern office» |
| Промпт из 3 слов | Недостаточно контекста | Заполнить все 9 блоков анатомии |
| Промпт из 200 слов | AI теряет фокус, результат хаотичный | 40-80 слов — оптимум для MJ/SD |
| Игнорирование negative prompt | Артефакты, текст, водяные знаки | Всегда добавлять базовый + контекстный negative |
| Запрос текста на картинке | AI плохо генерирует текст (кроме DALL-E 3) | Текст добавлять в графическом редакторе |
| Бренд-цвета через HEX | AI интерпретирует приблизительно | Описывать цвет словами + negative для ненужных |
| Один промпт без вариантов | Нет выбора, первый результат может не подойти | ≥ 3 варианта с разными акцентами |
| Копировать промпт между инструментами | Разный синтаксис — MJ ≠ DALL-E ≠ SD | Адаптировать под каждый инструмент |

## Соотношения сторон по платформам

| Платформа | Формат | Ratio | MJ параметр |
|-----------|--------|-------|-------------|
| Instagram Feed | Квадрат | 1:1 | `--ar 1:1` |
| Instagram Feed | Портрет | 4:5 | `--ar 4:5` |
| Instagram Stories/Reels | Вертикальный | 9:16 | `--ar 9:16` |
| LinkedIn Post | Горизонтальный | 1.91:1 | `--ar 191:100` |
| YouTube Thumbnail | Горизонтальный | 16:9 | `--ar 16:9` |
| Twitter/X Post | Горизонтальный | 16:9 | `--ar 16:9` |
| Telegram Post | Горизонтальный | 2:1 | `--ar 2:1` |
| Pinterest | Вертикальный | 2:3 | `--ar 2:3` |
| OG Image (Web) | Горизонтальный | 1.91:1 | `--ar 191:100` |

## Шаблон вывода

```
### AI Image Prompts — [Название контента]

**Visual brief:** [ссылка / краткое описание из $visual-brief]
**Инструмент:** [Midjourney / DALL-E 3 / Stable Diffusion / Flux]
**Платформа:** [платформа]
**Размер:** [ratio]
**Бренд-палитра:** [цвета из $brand-guidelines — описательно]

---

#### Анатомия промпта

| Блок | Значение |
|------|----------|
| Субъект | [конкретное описание] |
| Действие/Поза | [что делает] |
| Окружение | [где, фон] |
| Стиль | [из библиотеки] |
| Освещение | [тип света] |
| Палитра | [описание цветов бренда] |
| Композиция | [ракурс, приём] |
| Настроение | [эмоция, атмосфера] |

---

#### Вариант A — Основной (точно по брифу)

**Midjourney:**
```
[полный промпт] --ar [ratio] --v 6.1 --q 2 --s [value]
```

**Negative:** `--no [исключения]`

**DALL-E 3:**
"[описательный промпт на естественном языке]"

---

#### Вариант B — Альтернативный стиль

**Midjourney:**
```
[полный промпт с другим стилем] --ar [ratio] --v 6.1 --q 2
```

---

#### Вариант C — Альтернативная композиция

**Midjourney:**
```
[полный промпт с другим ракурсом] --ar [ratio] --v 6.1 --q 2
```

---

#### Workaround'ы (если нужны)
| Потенциальная проблема | Применённый workaround |
|-----------------------|----------------------|
| [руки / текст / лица] | [что добавлено в промпт] |

#### Советы по итерации
- Если слишком буквально → добавить «artistic interpretation, conceptual»
- Если не тот стиль → уточнить: «in the style of [стиль]», добавить 2-3 стилевых тега
- Если перенасыщено → добавить «muted tones, desaturated» + negative `--no oversaturated`
- Если хаотично → добавить «minimalist, simple composition, negative space»

**→ Следующий шаг:** генерация → проверка по `$content-review-checklist` (#25) → `$content-release-gate`
```
