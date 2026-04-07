---
name: tailwind-beast-practices
description: Tailwind CSS best practices для Senior-уровня: организация классов, компонентный подход, кастомизация темы, responsive/dark mode, производительность (purge/JIT), типичные паттерны и DO/DON'T. Используй этот скилл всегда когда задача касается стилизации через Tailwind — написание классов, структура конфига, работа с дизайн-системой, избегание className-хаоса, или интеграция с React/Next.js.
---

# Skill: Tailwind Beast Practices

Конкретные DO/DON'T паттерны для чистого, масштабируемого Tailwind без className-супа.

**Разделы:**
1. [Организация классов](#1-организация-классов)
2. [Компонентный подход: cva + cn](#2-компонентный-подход)
3. [Кастомизация темы](#3-кастомизация-темы)
4. [Responsive и dark mode](#4-responsive-и-dark-mode)
5. [Типичные UI-паттерны](#5-типичные-ui-паттерны)
6. [Производительность и конфиг](#6-производительность-и-конфиг)
7. [DO/DON'T: частые ошибки](#7-частые-ошибки)

---

## 1. Организация классов

### ✅ DO: фиксированный порядок групп (Prettier plugin enforces это автоматически)
```
Layout → Flexbox/Grid → Spacing → Sizing → Typography → Colors → Borders → Effects → States
```

```tsx
// ✅ Читаемо: каждая группа на своём месте
<div className="flex items-center gap-4 px-6 py-3 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />

// ✅ Многострочно для сложных компонентов — используй clsx/cn
<div className={cn(
  "flex items-center gap-4",        // layout
  "px-6 py-3",                      // spacing
  "text-sm font-medium text-gray-900", // typography
  "bg-white border border-gray-200 rounded-lg shadow-sm", // decoration
  "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500", // states
)} />
```

### ✅ DO: утилита cn (clsx + tailwind-merge)
```ts
// lib/utils.ts — обязательный файл в любом Tailwind-проекте
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ twMerge разрешает конфликты: cn("px-4", "px-6") → "px-6", не "px-4 px-6"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Использование:
cn("px-4 py-2", isActive && "bg-blue-500", className)
// clsx обрабатывает условия, twMerge разрешает конфликты классов
```

### ❌ DON'T: конкатенация строк для условных классов
```tsx
// ❌ Плохо: Tailwind purge не видит динамически собранные классы
const color = "blue";
<div className={`text-${color}-500`} /> // класс НЕ попадёт в бандл

// ✅ Правильно: полные имена классов в коде
const colorClass = isActive ? "text-blue-500" : "text-gray-500";
<div className={colorClass} />
```

---

## 2. Компонентный подход

### ✅ DO: cva (class-variance-authority) для вариантных компонентов
```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // ✅ base — всегда применяется
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:     "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        secondary:   "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        ghost:       "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400",
        outline:     "border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-400",
      },
      size: {
        sm:   "h-8  px-3 text-xs",
        md:   "h-10 px-4",
        lg:   "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
  & VariantProps<typeof buttonVariants>
  & { asChild?: boolean };

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)} // ✅ className последний — переопределяет
      {...props}
    />
  );
}

// Использование:
// <Button variant="destructive" size="sm">Delete</Button>
// <Button variant="ghost" size="icon"><Icon /></Button>
```

### ✅ DO: @layer components для повторяющихся паттернов
```css
/* globals.css */
@layer components {
  /* ✅ Выносить в @layer только то, что реально повторяется везде */
  .form-input {
    @apply w-full rounded-md border border-gray-300 px-3 py-2 text-sm
           shadow-sm placeholder:text-gray-400
           focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
           disabled:cursor-not-allowed disabled:opacity-50;
  }

  .card {
    @apply rounded-xl border border-gray-200 bg-white p-6 shadow-sm;
  }
}
```

### ❌ DON'T: @apply для всего подряд
```css
/* ❌ Плохо: теряем преимущества Tailwind, создаём обычный CSS */
.button {
  @apply flex items-center px-4 py-2 bg-blue-500 text-white rounded;
}
/* ✅ Правильно: оставить классы в JSX или использовать cva */
```

---

## 3. Кастомизация темы

### ✅ DO: расширять тему через extend, не заменять
```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ✅ extend — добавляем к дефолтным значениям
      colors: {
        brand: {
          50:  "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
        // ✅ Семантические токены вместо конкретных цветов
        surface:  "hsl(var(--surface))",
        "on-surface": "hsl(var(--on-surface))",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in":    "fadeIn 150ms ease-out",
        "slide-up":   "slideUp 200ms ease-out",
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0" },              to: { opacity: "1" } },
        slideUp: { from: { transform: "translateY(8px)", opacity: "0" }, to: { transform: "translateY(0)", opacity: "1" } },
      },
    },
  },
} satisfies Config;
```

### ✅ DO: CSS-переменные для динамической темы (dark mode)
```css
/* globals.css */
@layer base {
  :root {
    --surface:       0 0% 100%;
    --on-surface:    222 47% 11%;
    --border:        214 32% 91%;
    --ring:          221 83% 53%;
  }

  .dark {
    --surface:       222 47% 11%;
    --on-surface:    210 40% 98%;
    --border:        217 33% 17%;
    --ring:          213 94% 68%;
  }
}
```

### ❌ DON'T: хардкодить цвета минуя тему
```tsx
// ❌ Плохо: цвет не управляется темой, не переопределяется
<div className="text-[#3b82f6]" />

// ✅ Правильно: через токен темы
<div className="text-brand-500" />
// или семантически:
<div className="text-primary" />
```

---

## 4. Responsive и Dark Mode

### ✅ DO: mobile-first breakpoints
```tsx
// ✅ Tailwind breakpoints: sm(640) md(768) lg(1024) xl(1280) 2xl(1536)
// Без префикса = все размеры. С префиксом = от этого размера и выше.

<div className={cn(
  "grid grid-cols-1 gap-4",        // мобайл: 1 колонка
  "sm:grid-cols-2",                 // ≥640px: 2 колонки
  "lg:grid-cols-3",                 // ≥1024px: 3 колонки
  "xl:gap-6",                       // ≥1280px: больший gap
)} />

// ✅ Текст
<h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl" />

// ✅ Показ/скрытие
<nav className="hidden lg:flex" />           // скрыт на мобайле
<button className="lg:hidden" />             // скрыт на десктопе
```

### ✅ DO: dark mode через class-стратегию
```ts
// tailwind.config.ts
export default {
  darkMode: "class", // ✅ управляем программно через добавление класса .dark
  // darkMode: "media" — только системные настройки, меньше контроля
} satisfies Config;
```

```tsx
// ✅ dark: префикс для тёмной темы
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50" />
<button className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800" />

// ✅ Переключатель темы
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return <button onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</button>;
}
```

### ✅ DO: группировка состояний через group и peer
```tsx
// ✅ group: стилизовать дочерний элемент при hover/focus родителя
<div className="group relative cursor-pointer">
  <img className="rounded-lg transition-transform group-hover:scale-105" src={src} />
  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 rounded-lg" />
  <span className="opacity-0 transition-opacity group-hover:opacity-100">View</span>
</div>

// ✅ peer: стилизовать сиблинг на основе состояния элемента
<label className="flex items-center gap-2">
  <input type="checkbox" className="peer sr-only" />
  {/* визуальный чекбокс меняется когда input checked */}
  <div className="h-5 w-5 rounded border border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500" />
  <span className="peer-checked:text-blue-600 peer-checked:font-medium">Enable</span>
</label>
```

---

## 5. Типичные UI-паттерны

### ✅ DO: карточка с hover-эффектом
```tsx
<article className={cn(
  "group relative overflow-hidden",
  "rounded-xl border border-gray-200 bg-white p-6",
  "shadow-sm transition-all duration-200",
  "hover:shadow-md hover:-translate-y-0.5",
  "dark:border-gray-800 dark:bg-gray-900",
)}>
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
</article>
```

### ✅ DO: форма с состояниями
```tsx
<div className="space-y-1">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
    Email
  </label>
  <input
    className={cn(
      "w-full rounded-md border px-3 py-2 text-sm shadow-sm",
      "placeholder:text-gray-400",
      "focus:outline-none focus:ring-2 focus:ring-offset-1",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60",
      // ✅ Состояние ошибки через aria-invalid
      "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500",
    )}
    aria-invalid={!!error}
  />
  {error && (
    <p className="text-xs text-red-600 dark:text-red-400" role="alert">{error}</p>
  )}
</div>
```

### ✅ DO: skeleton loader
```tsx
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
      className
    )} />
  );
}

// Использование:
<div className="space-y-3">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-10 w-full" />
</div>
```

### ✅ DO: badge/chip компонент
```tsx
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      color: {
        gray:   "bg-gray-50  text-gray-600  ring-gray-500/10  dark:bg-gray-800 dark:text-gray-400",
        blue:   "bg-blue-50  text-blue-700  ring-blue-700/10  dark:bg-blue-900/30 dark:text-blue-400",
        green:  "bg-green-50 text-green-700 ring-green-600/10 dark:bg-green-900/30 dark:text-green-400",
        red:    "bg-red-50   text-red-700   ring-red-600/10   dark:bg-red-900/30 dark:text-red-400",
        yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/10 dark:bg-yellow-900/30 dark:text-yellow-400",
      },
    },
    defaultVariants: { color: "gray" },
  }
);
```

---

## 6. Производительность и конфиг

### ✅ DO: правильный content glob — только нужные файлы
```ts
// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{ts,tsx}",          // ✅ только src
    "./components/**/*.{ts,tsx}",
    // ❌ НЕ добавляй node_modules — огромный скан без смысла
  ],
} satisfies Config;
```

### ✅ DO: safelist для динамических классов
```ts
export default {
  safelist: [
    // ✅ Классы, собираемые из данных (не видны статически в коде)
    { pattern: /^(bg|text|border)-(red|green|blue|yellow)-(400|500|600)$/ },
    "animate-spin",
    "animate-pulse",
  ],
} satisfies Config;
```

### ✅ DO: plugins для повторяющихся утилит
```ts
import plugin from "tailwindcss/plugin";

export default {
  plugins: [
    require("@tailwindcss/forms"),       // ✅ сброс стилей форм
    require("@tailwindcss/typography"),  // ✅ prose для markdown-контента
    require("@tailwindcss/line-clamp"),  // ✅ line-clamp утилиты

    // ✅ Кастомный плагин для проекта
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": { display: "none" },
        },
        ".text-balance": { "text-wrap": "balance" },
      });
    }),
  ],
} satisfies Config;
```

### ✅ DO: Prettier plugin для автосортировки классов
```bash
npm i -D prettier-plugin-tailwindcss
```
```json
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindConfig": "./tailwind.config.ts"
}
```

---

## 7. Частые ошибки

### ❌ DON'T: динамически собирать имена классов
```tsx
// ❌ JIT/purge не видит эти классы — они не попадут в бандл
const size = "lg";
<div className={`text-${size}`} />         // ❌
<div className={`p-${padding}`} />         // ❌
<div className={`grid-cols-${cols}`} />    // ❌

// ✅ Маппинг полных имён классов
const sizeClasses = { sm: "text-sm", md: "text-base", lg: "text-lg" };
<div className={sizeClasses[size]} />
```

### ❌ DON'T: использовать inline styles там где есть arbitrary values
```tsx
// ❌ Плохо: inline стиль вне системы Tailwind
<div style={{ marginTop: "13px" }} />

// ✅ Arbitrary value — остаётся в системе, работает с responsive/dark
<div className="mt-[13px]" />
<div className="mt-[13px] lg:mt-[20px] dark:mt-[15px]" />
```

### ❌ DON'T: !important через !prefix без причины
```tsx
// ❌ Скрывает проблему специфичности вместо решения
<div className="!text-red-500" />

// ✅ Решай конфликт через правильную структуру или twMerge
```

### ❌ DON'T: дублировать классы в разных вариантах компонента
```tsx
// ❌ Плохо: base-классы повторяются в каждом варианте
const classes = isError
  ? "flex items-center px-4 py-2 rounded text-red-600 bg-red-50"
  : "flex items-center px-4 py-2 rounded text-gray-600 bg-gray-50";

// ✅ Правильно: cva с base + variants
const alertVariants = cva("flex items-center px-4 py-2 rounded", {
  variants: {
    type: {
      error:   "text-red-600 bg-red-50",
      default: "text-gray-600 bg-gray-50",
    },
  },
});
```

### ❌ DON'T: забывать про конфликты классов без twMerge
```tsx
// ❌ Без twMerge оба класса применятся — победит тот, что дальше в CSS (непредсказуемо)
function MyBtn({ className }) {
  return <button className={`px-4 ${className}`} />; // className="px-8" → оба px останутся
}

// ✅ С cn/twMerge — последний всегда побеждает
function MyBtn({ className }) {
  return <button className={cn("px-4", className)} />; // className="px-8" → только px-8
}
```

---

## См. также
- `react-beast-practices` — компонентные паттерны (Compound Components, Container/Presenter)
- `dev-reference-snippets` — TDD, API, формы с валидацией
