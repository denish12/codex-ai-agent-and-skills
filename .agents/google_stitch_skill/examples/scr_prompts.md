# Stitch Prompts — Smart Cart Rescue

> Готовые промпты для генерации UI-экранов проекта Smart Cart Rescue.
> Копируй и адаптируй под конкретную задачу.

---

## Popup Templates

### Glassmorphism Discount Popup (default state)
```
Discount popup widget, 400×500px centered container, modal overlay.
Glassmorphism: frosted glass (rgba(255,255,255,0.15)), backdrop-filter blur(20px),
border 1px solid rgba(255,255,255,0.2), border-radius 24px.
Close button (×) top-right. Header image area (product/banner) at top.
Large discount badge: "20% OFF" in a glass-pill element.
Headline: "Special Offer!" (24px bold). Body: "Don't miss this deal" (14px).
Coupon code: monospace text in a bordered box with "Copy" button to the right.
Countdown timer: 4 segments (DD:HH:MM:SS) in frosted glass pill containers.
CTA: "Shop Now" full-width button, gradient purple-to-pink, rounded 12px.
Font: Inter. No external images. Dark semi-transparent overlay behind popup.
```

### Glassmorphism Discount Popup (coupon copied state)
```
Same glassmorphism popup as above, but coupon code state changed:
- Copy button text changed to "Copied!" with checkmark icon
- Copy button background: green (#22C55E)
- Coupon code area has subtle green glow border
- Small toast/badge "Copied to clipboard" appears briefly above coupon
All other elements remain identical.
```

### Neo-Brutalism Popup (default state)
```
Discount popup, 420×480px. Neo-brutalism style:
solid black borders (3px), no border-radius, bold drop shadow (4px 4px 0 #000).
Background: bright yellow (#FFE566). Accent: electric blue (#3B82F6).
Close button: thick × top-right. Headline: "BIG SALE" uppercase, black, Impact-like font.
Discount: large block "50% OFF" in black box with yellow text.
Coupon code: in a box with dashed black border, monospace.
CTA: "GRAB IT NOW" button, blue bg, black text, thick black border, shadow offset.
Timer: raw digits in monospace, separated by colons, no decoration.
Font: Inter Bold / Mono. No gradients, no rounded corners.
```

### Dark Luxury Gold Popup (default state)
```
Premium discount popup, 400×520px. Dark luxury aesthetic:
background #0A0A0A, gold accents (#D4AF37), subtle gold gradient border.
Close button: thin gold × top-right. Header: product image with dark overlay.
Headline: "Exclusive Offer" in thin serif font (Playfair Display style), gold color.
Discount: "30% OFF" large, gold text with subtle text-shadow glow.
Body: "For our valued customers" in light gray (#999), small caps.
Coupon: gold-bordered input, gold monospace text, "Copy" in outlined gold button.
Timer: elegant segments with thin gold borders, serif digits.
CTA: full-width gold button with dark text, subtle hover glow.
Overall feel: premium jewelry store. No stock illustrations.
```

---

## Dashboard Pages

### Widget Design Editor (main view)
```
Web admin dashboard, desktop, 1200px wide. SaaS-style panel.
Left sidebar (220px): nav links (Dashboard, Templates, Settings, Analytics),
each with icon + label, active state highlighted blue.
Main content: Widget Template Editor.
Top bar: template selector dropdown + template preview thumbnails row.
Center: split layout — left (40%): form controls stacked vertically
(color pickers, text inputs, dropdowns for font/size/position,
toggle switches for timer/coupon), right (60%): live preview of popup
rendered in a centered phone-sized frame (375×667).
Bottom bar: "Save" primary button (blue), "Reset" outlined secondary button.
BG: #FAFAFA. Sidebar: #1A1A2E. Accent: #4361EE. Font: Inter 14px.
Cards: white, 8px radius, subtle box-shadow. Loaded state.
```

### Template Gallery (selection view)
```
Web page, desktop, 1000px content width. Template selection gallery.
Header: "Choose a Template" (h1), subtitle "Select a design for your popup".
Grid: 3 columns of template cards. Each card: 280px wide,
thumbnail preview (200px tall), template name below, "Use Template" button.
12 cards total in 4 rows. Cards have 12px radius, subtle shadow on hover,
thin border (#E5E7EB). Active/selected card: blue border (#4361EE), checkmark badge.
Bottom: "Continue with Selected" primary button, "Preview" secondary.
Clean white background. Font: Inter. Minimal, no sidebar on this page.
```

---

## States (apply to any popup template above)

### Loading state
```
Same [template] popup but in loading state:
- All text replaced with skeleton placeholders (gray animated bars)
- Image area: gray rectangle with subtle pulse animation
- Button: gray skeleton bar, no text
- Timer: 4 gray skeleton blocks
- Overall popup structure visible but no real content
```

### Empty state (no coupon configured)
```
Same [template] popup but empty/unconfigured state:
- Coupon code area shows "No coupon set" in muted gray text
- Timer hidden (toggle off)
- CTA button shows default "Shop Now"
- Discount badge shows "--% OFF" placeholder
- Subtle dashed border around missing elements
```

### Error state (expired offer)
```
Same [template] popup but expired/error state:
- Timer shows "00:00:00:00" all zeros
- Red badge overlay: "Offer Expired"
- CTA button disabled (grayed out, no hover effect)
- Body text: "This offer has ended"
- Coupon code area: strikethrough text, "Copy" button disabled
```
