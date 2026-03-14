# Stitch Prompts — Examples

> Готовые промпты для генерации UI-экранов через Google Stitch.
> Копируй и адаптируй под конкретную задачу.

---

## Modal / Overlay Components

### Glassmorphism Modal (default state)
```
Modal dialog, 400×500px centered container, semi-transparent overlay behind.
Glassmorphism: frosted glass (rgba(255,255,255,0.15)), backdrop-filter blur(20px),
border 1px solid rgba(255,255,255,0.2), border-radius 24px.
Close button (×) top-right. Header image area at top.
Headline: "Your Title Here" (24px bold). Body text (14px).
Action area: input field with "Copy" button to the right.
CTA: full-width button, gradient purple-to-pink, rounded 12px.
Font: Inter. No external images. Dark semi-transparent overlay behind modal.
```

### Neo-Brutalism Card
```
Card component, 420×480px. Neo-brutalism style:
solid black borders (3px), no border-radius, bold drop shadow (4px 4px 0 #000).
Background: bright yellow (#FFE566). Accent: electric blue (#3B82F6).
Close button: thick × top-right. Headline: uppercase, black, Impact-like font.
Content area: text in a box with dashed black border, monospace.
CTA: button, blue bg, black text, thick black border, shadow offset.
Font: Inter Bold / Mono. No gradients, no rounded corners.
```

### Dark Luxury Modal
```
Premium modal, 400×520px. Dark luxury aesthetic:
background #0A0A0A, gold accents (#D4AF37), subtle gold gradient border.
Close button: thin gold × top-right. Header: image with dark overlay.
Headline: thin serif font (Playfair Display style), gold color.
Body: light gray (#999), small caps.
Input area: gold-bordered input, gold monospace text, outlined gold button.
CTA: full-width gold button with dark text, subtle hover glow.
Overall feel: premium. No stock illustrations.
```

---

## Dashboard Pages

### Admin Settings Panel
```
Web admin dashboard, desktop, 1200px wide. SaaS-style panel.
Left sidebar (220px): nav links (Dashboard, Settings, Content, Analytics),
each with icon + label, active state highlighted blue.
Main content: Settings Editor.
Top bar: section selector tabs.
Center: split layout — left (40%): form controls stacked vertically
(text inputs, dropdowns, color pickers, toggle switches),
right (60%): live preview rendered in a centered frame.
Bottom bar: "Save" primary button (blue), "Reset" outlined secondary button.
BG: #FAFAFA. Sidebar: #1A1A2E. Accent: #4361EE. Font: Inter 14px.
Cards: white, 8px radius, subtle box-shadow. Loaded state.
```

### Content Gallery (selection view)
```
Web page, desktop, 1000px content width. Content selection gallery.
Header: "Choose a Template" (h1), subtitle "Select a design for your content".
Grid: 3 columns of cards. Each card: 280px wide,
thumbnail preview (200px tall), name below, "Use This" button.
12 cards total in 4 rows. Cards have 12px radius, subtle shadow on hover,
thin border (#E5E7EB). Active/selected card: blue border (#4361EE), checkmark badge.
Bottom: "Continue with Selected" primary button, "Preview" secondary.
Clean white background. Font: Inter. Minimal, no sidebar on this page.
```

### Data Table Page
```
Web admin page, 1200px wide. Data management view.
Top bar: page title "Items", search input, "Add New" primary button.
Table: 5 columns (Name, Status, Category, Date, Actions).
10 rows of data with alternating row backgrounds.
Status column: colored badges (green "Active", gray "Draft", red "Archived").
Actions column: edit (pencil icon), delete (trash icon) on hover.
Pagination bar at bottom: "1-10 of 42" text, prev/next buttons.
Empty state (alternate): illustration, "No items yet" heading, "Create your first item" CTA.
Font: Inter. BG: #FAFAFA. Cards: white, rounded.
```

---

## States (apply to any component above)

### Loading state
```
Same [component] but in loading state:
- All text replaced with skeleton placeholders (gray animated bars)
- Image area: gray rectangle with subtle pulse animation
- Button: gray skeleton bar, no text
- Counter elements: gray skeleton blocks
- Overall structure visible but no real content
```

### Empty state (no content configured)
```
Same [component] but empty/unconfigured state:
- Content area shows "No content set" in muted gray text
- Optional elements hidden
- CTA button shows default text
- Subtle dashed border around missing elements
```

### Error state
```
Same [component] but error state:
- Red/orange banner or badge: "Something went wrong"
- CTA button disabled (grayed out, no hover effect)
- Body text: "Please try again later"
- Retry button visible
```
