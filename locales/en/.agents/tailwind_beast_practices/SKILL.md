---
name: tailwind_beast_practices
description: Tailwind CSS best practices for senior-level work: class organization, component approach, theme customization, responsive/dark mode, performance (purge/JIT), typical patterns and DO/DON'T. Use this skill whenever a task concerns styling via Tailwind ? writing classes, structuring config, working with design, avoiding className chaos, or integrating with React/Next.js.
---

# Skill: Tailwind Beast Practices

Concrete DO/DON'T patterns for clean, scalable Tailwind without className soup.

**Sections:**
1. [Organization classes](#1-organize)
2. [Component approach: cva + cn](#2-component-approach)
3. [Theme customization](#3-theme-customization)
4. [Responsive and dark mode](#4-responsive-and-dark-mode)
5. [Typical UI-patterns](#5-typeui-patterns)
6. [Performance and config](#6-performance)
7. [DO/DON'T: common errors](#7-common errors)

---

## 1. Organization classes

### ? DO: fixed group order (Prettier plugin enforces this automatically)
```
Layout → Flexbox/Grid → Spacing → Sizing → Typography → Colors → Borders → Effects → States
```

```tsx
// ? Readable: each group is in its own place
<div className="flex items-center gap-4 px-6 py-3 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />

// ? Multiline for complex components ? use clsx/cn
<div className={cn(
  "flex items-center gap-4",        // layout
  "px-6 py-3",                      // spacing
  "text-sm font-medium text-gray-900", // typography
  "bg-white border border-gray-200 rounded-lg shadow-sm", // decoration
  "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500", // states
)} />
```

### ✅ DO: utility cn (clsx + tailwind-merge)
```ts
// lib/utils.ts — mandatory file in any Tailwind-project
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ? twMerge resolves conflicts: cn("px-4", "px-6") ? "px-6", not "px-4 px-6"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage:
cn("px-4 py-2", isActive && "bg-blue-500", className)
// clsx handles conditions, twMerge resolves class conflicts
```

### ? DON'T: concatenate lines for conditional classes
```tsx
// ? Bad: Tailwind purge does not see dynamically assembled classes
const color = "blue";
<div className={`text-${color}-500`} /> // class will not end up in the bundle

// ? Correct: full class names in code
const colorClass = isActive ? "text-blue-500" : "text-gray-500";
<div className={colorClass} />
```

---

## 2. Component approach

### ✅ DO: cva (class-variance-authority) for variant components
```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // ? base ? always applied
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
      className={cn(buttonVariants({ variant, size }), className)} // ? className last ? overrides
      {...props}
    />
  );
}

// Usage:
// <Button variant="destructive" size="sm">Delete</Button>
// <Button variant="ghost" size="icon"><Icon /></Button>
```

### ? DO: @layer components for repeated patterns
```css
/* globals.css */
@layer components {
  /* ? Extract into @layer only what really repeats everywhere */
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

### ❌ DON'T: @apply for all in a row
```css
/* ? Bad: we lose the benefits of Tailwind, create regular CSS */
.button {
  @apply flex items-center px-4 py-2 bg-blue-500 text-white rounded;
}
/* ? Correct: keep classes in JSX or use cva */
```

---

## 3. Customization themes

### ? DO: extend the theme via extend, do not replace it
```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ? extend ? add to the default values
      colors: {
        brand: {
          50:  "#eff6ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
        // ✅ Semantic tokens instead of specific colors
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

### ✅ DO: CSS-variables for dynamic themes (dark mode)
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

### ? DON'T: hardcode colors bypassing the theme
```tsx
// ? Bad: color is not controlled by the theme, not overridable
<div className="text-[#3b82f6]" />

// ? Correct: via theme tokens
<div className="text-brand-500" />
// or semantic:
<div className="text-primary" />
```

---

## 4. Responsive and Dark Mode

### ✅ DO: mobile-first breakpoints
```tsx
// ✅ Tailwind breakpoints: sm(640) md(768) lg(1024) xl(1280) 2xl(1536)
// Without a prefix = all sizes. With a prefix = from that breakpoint and above.

<div className={cn(
  "grid grid-cols-1 gap-4",        // mobile: 1 column
  "sm:grid-cols-2",                 // ?640px: 2 columns
  "lg:grid-cols-3",                 // ?1024px: 3 columns
  "xl:gap-6",                       // ?1280px: larger gap
)} />

// ✅ Text
<h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl" />

// ? Show/hide
<nav className="hidden lg:flex" />           // hidden on mobile
<button className="lg:hidden" />             // hidden on desktop
```

### ✅ DO: dark mode via class-strategy
```ts
// tailwind.config.ts
export default {
  darkMode: "class", // ? controlled programmatically via the .dark class
  // darkMode: "media" ? only system settings, less control
} satisfies Config;
```

```tsx
// ? dark: prefix for dark themes
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-50" />
<button className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800" />

// ? Theme switcher
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return <button onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</button>;
}
```

### ? DO: state grouping via group and peer
```tsx
// ? group: style a child element from the parent's hover/focus state
<div className="group relative cursor-pointer">
  <img className="rounded-lg transition-transform group-hover:scale-105" src={src} />
  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 rounded-lg" />
  <span className="opacity-0 transition-opacity group-hover:opacity-100">View</span>
</div>

// ? peer: style a sibling based on the element state
<label className="flex items-center gap-2">
  <input type="checkbox" className="peer sr-only" />
  {/* visual checkbox changes when input is checked */}
  <div className="h-5 w-5 rounded border border-gray-300 peer-checked:bg-blue-500 peer-checked:border-blue-500" />
  <span className="peer-checked:text-blue-600 peer-checked:font-medium">Enable</span>
</label>
```

---

## 5. Typical UI-patterns

### ? DO: card with a hover effect
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

### ? DO: form with states
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
      // ✅ State errors via aria-invalid
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

// Usage:
<div className="space-y-3">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-10 w-full" />
</div>
```

### ✅ DO: badge/chip component
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

## 6. Performance and config

### ✅ DO: correct content glob — only needed files
```ts
// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{ts,tsx}",          // ✅ only src
    "./components/**/*.{ts,tsx}",
    // ? Do not add node_modules ? huge scan without meaning
  ],
} satisfies Config;
```

### ✅ DO: safelist for dynamic classes
```ts
export default {
  safelist: [
    // ? Classes assembled from data (not statically visible in code)
    { pattern: /^(bg|text|border)-(red|green|blue|yellow)-(400|500|600)$/ },
    "animate-spin",
    "animate-pulse",
  ],
} satisfies Config;
```

### ✅ DO: plugins for repeated utilities
```ts
import plugin from "tailwindcss/plugin";

export default {
  plugins: [
    require("@tailwindcss/forms"),       // ✅ reset styles forms
    require("@tailwindcss/typography"),  // ✅ prose for markdown-content
    require("@tailwindcss/line-clamp"),  // ✅ line-clamp utilities

    // ✅ Custom plugin for project
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

### ? DO: Prettier plugin for automatic class sorting
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

## 7. Common errors

### ❌ DON'T: dynamic collect names classes
```tsx
// ? JIT/purge does not see these classes ? they will not get into the bundle
const size = "lg";
<div className={`text-${size}`} />         // ❌
<div className={`p-${padding}`} />         // ❌
<div className={`grid-cols-${cols}`} />    // ❌

// ? Mapping of full class names
const sizeClasses = { sm: "text-sm", md: "text-base", lg: "text-lg" };
<div className={sizeClasses[size]} />
```

### ❌ DON'T: use inline styles there where is arbitrary values
```tsx
// ❌ Bad: inline style innot systems Tailwind
<div style={{ marginTop: "13px" }} />

// ? Arbitrary value ? stays within the system, works with responsive/dark
<div className="mt-[13px]" />
<div className="mt-[13px] lg:mt-[20px] dark:mt-[15px]" />
```

### ❌ DON'T: !important via !prefix without reasons
```tsx
// ? Hides a specificity problem instead of solving it
<div className="!text-red-500" />

// ? Resolve conflicts via structured rules or twMerge
```

### ❌ DON'T: duplicate classes in different variant component
```tsx
// ❌ Bad: base-classes repeat in each variant
const classes = isError
  ? "flex items-center px-4 py-2 rounded text-red-600 bg-red-50"
  : "flex items-center px-4 py-2 rounded text-gray-600 bg-gray-50";

// ✅ Correctly: cva with base + variants
const alertVariants = cva("flex items-center px-4 py-2 rounded", {
  variants: {
    type: {
      error:   "text-red-600 bg-red-50",
      default: "text-gray-600 bg-gray-50",
    },
  },
});
```

### ? DON'T: forget about class conflicts without twMerge
```tsx
// ? Without twMerge both classes apply ? whichever comes later in CSS wins (unpredictable)
function MyBtn({ className }) {
  return <button className={`px-4 ${className}`} />; // className="px-8" ? both px remain
}

// ? With cn/twMerge ? the last class always wins
function MyBtn({ className }) {
  return <button className={cn("px-4", className)} />; // className="px-8" → only px-8
}
```

---

## See also
- `react_beast_practices` — component patterns (Compound Components, Container/Presenter)
- `dev_reference_snippets` ? TDD, API, forms with validation
