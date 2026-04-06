# Securaz Design System

Complete design system specification for Securaz dashboard. All components must adhere to these standards.

## Color Palette

### Primary Colors
| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Cyan | #06B6D4 | `cyan-400` | Primary CTA, highlights |
| Teal | #14B8A6 | `teal-300` | Secondary highlights, positive states |
| Azure | #0EA5E9 | `sky-400` | Tertiary accents |

### Severity Colors
| Severity | Hex | Tailwind | Usage |
|----------|-----|----------|-------|
| Critical | #F87171 | `red-400` | Critical findings, high priority |
| High | #FB923C | `orange-400` | High priority issues |
| Medium | #FBBF24 | `amber-400` | Medium priority |
| Low | #4ADE80 | `green-500` | Low priority, passing |
| Info | #3B82F6 | `blue-500` | Informational |

### Neutral Colors
| Level | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Darkest | #0F172A | `slate-900` | Backgrounds |
| Dark | #1E293B | `slate-800` | Card backgrounds |
| Medium | #64748B | `slate-500` | Muted text |
| Light | #CBD5E1 | `slate-300` | Body text |
| Lightest | #F1F5F9 | `slate-100` | High contrast text |

### Opacity System
- Full opacity: No modifier (100%)
- High opacity: `/70`, `/75`, `/80` (for hover states)
- Medium opacity: `/50`, `/55`, `/60` (for secondary elements)
- Low opacity: `/15`, `/20` (for backgrounds)
- Minimal opacity: `/5`, `/8` (for subtle backgrounds)

**Examples:**
```
bg-red-500/15    → Background with low opacity
text-white/55    → Muted text
border-cyan-400/30 → Subtle borders
```

## Typography

### Font Family
- Primary: System UI stack (system-ui, -apple-system, sans-serif)
- Monospace: `font-mono` (for code, resource names)

### Font Weights
| Weight | Class | Usage |
|--------|-------|-------|
| 600 | `font-semibold` | Body text, normal weight |
| 700 | `font-bold` | Labels, uppercase |
| 900 | `font-black` | Headings, stats values |

### Type Scale

#### Headings
```tsx
// H1 - Page title
className="text-2xl font-black text-white tracking-tight"

// H2 - Widget title
className="text-lg font-bold text-white"

// H3 - Section heading
className="text-base font-bold text-white"
```

#### Body
```tsx
// Body text
className="text-sm text-slate-300"

// Muted text
className="text-sm text-slate-400"

// Small text (labels)
className="text-[11px] text-slate-400"
```

#### Labels
```tsx
// Uppercase label (always use with semibold/bold)
className="text-[10px] uppercase tracking-widest font-bold text-slate-400"

// Uppercase badge
className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded border"
```

#### Monospace
```tsx
// Code/resource name
className="text-xs font-mono text-slate-300"

// Metadata chip
className="text-[11px] font-mono border border-white/10 bg-white/6 px-2 py-0.5 rounded-lg"
```

## Spacing System

### Gap/Padding Scale
Based on Tailwind's spacing scale (4px base unit):

```
gap-1  = 4px
gap-2  = 8px
gap-3  = 12px
gap-4  = 16px
gap-5  = 20px
gap-6  = 24px
```

**Pattern:** Use `gap-*` for flex containers, `p-*` for padding, `m-*` for margin.

**Never use custom margins or padding.** If needed spacing isn't available, adjust component structure.

### Common Layouts
```tsx
// Flex row with gap
className="flex items-center gap-3"

// Grid with gap
className="grid grid-cols-2 gap-3"

// Card with padding
className="rounded-xl border border-white/10 bg-white/6 p-3"

// Widget with padding
className="flex flex-col gap-3 p-3"
```

## Border Radius

| Size | Pixels | Usage |
|------|--------|-------|
| `rounded-lg` | 8px | Buttons, input fields |
| `rounded-xl` | 12px | Card sub-sections |
| `rounded-2xl` | 16px | Main card panels |
| `rounded-full` | 50% | Circular elements, pills |

## Borders & Strokes

### Border Styling
```tsx
// Standard glass card border
className="border border-white/10"

// Highlighted border (hover/active)
className="border border-cyan-400/60"

// Subtle divider
className="border-t border-white/5"
```

### Stroke Width
- Default: `stroke-1` or `strokeWidth="1"`
- Thicker: `stroke-2` or `strokeWidth="2"`
- Bold: `stroke-3` or `strokeWidth="3"`

## Shadow & Backdrop Effects

### Backdrop Blur
```tsx
// Standard glass effect
className="backdrop-blur-xl"

// Slightly less blur
className="backdrop-blur-lg"

// Minimal blur
className="backdrop-blur-md"
```

### Box Shadow
```tsx
// Subtle elevation
className="shadow-sm"

// Standard elevation
className="shadow-md"

// No custom shadows - use opacity layers instead
```

### Layering Pattern
```tsx
// Glass card formula
className="rounded-2xl border border-white/10 bg-black/15 backdrop-blur-xl"

// Sub-panel formula
className="rounded-xl border border-white/10 bg-white/6 p-3"

// Darkest background layer
className="bg-black/20"
```

## Interactive States

### Buttons
```tsx
// Primary CTA (cyan)
className="border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 transition-colors"

// Secondary (white/ghost)
className="border border-white/10 bg-white/6 text-white hover:bg-white/10 transition-colors"

// Disabled state (any button)
className="disabled:opacity-60 disabled:cursor-not-allowed"
```

### Hover Effects
```tsx
// Scale up (cards, KPIs)
className="group transition-all hover:scale-105 active:scale-95"

// Background change
className="hover:bg-white/8 transition-colors"

// Border change
className="hover:border-white/20 transition-colors"

// Icon rotation
className="transition-transform group-hover:rotate-180"
```

## Component Patterns

### Glass Card (Universal Container)
```tsx
import { GlassCard } from '@/components/ui/GlassCard'

<GlassCard className="flex flex-col gap-3">
  {/* content */}
</GlassCard>
```

### Widget Header Pattern
```tsx
<div className="flex items-center justify-between">
  <div>
    <h2 className="text-lg font-bold text-white">Widget Title</h2>
    <p className="text-[11px] text-slate-400 mt-0.5">Subtitle or description</p>
  </div>
  <button type="button" className="p-1.5 hover:bg-white/8 rounded-lg transition-colors">
    <MoreHorizontal className="w-5 h-5 text-slate-300" />
  </button>
</div>
```

### Inner Panel Pattern
```tsx
<div className="rounded-2xl border border-white/10 bg-black/15 backdrop-blur-xl p-3">
  {/* content */}
</div>
```

### Sub-panel Pattern
```tsx
<div className="rounded-xl border border-white/10 bg-white/6 p-3">
  {/* content */}
</div>
```

### SVG Chart Pattern
```tsx
const W = 460, H = 120, PAD_X = 8, PAD_Y = 10
const MIN = 50, MAX = 100

function toX(i: number) {
  return PAD_X + (i / (n - 1)) * (W - PAD_X * 2)
}
function toY(v: number) {
  return PAD_Y + (1 - (v - MIN) / (MAX - MIN)) * (H - PAD_Y * 2)
}

<svg viewBox={`0 0 ${W} ${H}`} className="w-full">
  {/* chart elements */}
</svg>
```

### Data Point Dot Pattern
```tsx
// Double-circle dot (for charts)
<g>
  <circle cx={x} cy={y} r="4.5" fill="rgba(0,0,0,0.4)" />
  <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.85)" />
</g>

// With hover state
<circle
  cx={x}
  cy={y}
  r={hovered ? 6 : 4.5}
  fill={hovered ? 'rgba(34,211,238,0.6)' : 'rgba(0,0,0,0.4)'}
/>
```

### Table/Grid Pattern
```tsx
// Header row
className="grid grid-cols-[20px_minmax(0,2fr)_80px] gap-px bg-black/40"

// Data row
className="grid grid-cols-[20px_minmax(0,2fr)_80px] gap-px group hover:bg-white/4 transition-colors"

// Cell
className="py-3 px-3 bg-black/20 group-hover:bg-transparent transition-colors"
```

## Animations

### Built-in Tailwind
```tsx
// Fade in + slide from top
className="animate-in fade-in slide-in-from-top-2 duration-300"

// Smooth transitions
className="transition-colors"  // color changes
className="transition-opacity" // fade
className="transition-all"     // all properties
className="transition-transform" // rotate, scale, translate

// Duration
className="duration-200" // 200ms
className="duration-300" // 300ms
```

### Custom Animations
For complex animations, define in `globals.css`:
```css
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
```

## Responsive Breakpoints

Follow Tailwind's breakpoints:
```
sm  640px
md  768px
lg  1024px
xl  1280px
2xl 1536px
```

**Mobile-first approach:** Start with mobile layout, add `md:`, `lg:` prefixes for larger screens.

```tsx
// 2 columns on mobile, 4 on large screens
className="grid grid-cols-2 lg:grid-cols-4 gap-3"

// Stack on mobile, flex row on tablet+
className="flex flex-col md:flex-row items-start md:items-center"
```

## Accessibility

### ARIA Labels
```tsx
// Button without text
<button aria-label="Close modal">
  <X className="w-5 h-5" />
</button>

// Hidden decorative elements
<span aria-hidden="true">•</span>
```

### Contrast
- Minimum WCAG AA: 4.5:1 ratio
- All text meets standard: white (`text-white`) on dark backgrounds

### Keyboard Navigation
- All buttons and links clickable via Tab
- Use `focus:outline-none focus:ring-2 focus:ring-cyan-400` for focus indicators

## Dark Mode

**Current implementation:** Dark mode only. Light mode is not supported.

All colors are optimized for dark backgrounds (#0F172A `slate-900`).

If light mode is added in future:
1. Create light mode color palette
2. Add `dark:` prefixes to existing Tailwind classes
3. Use `prefers-color-scheme` media query in CSS

---

## Implementation Checklist

When building new components, verify:

- [ ] Uses `<GlassCard>` wrapper
- [ ] Typography follows scale guidelines
- [ ] Colors from approved palette only
- [ ] Spacing uses Tailwind scale (no hardcoded px)
- [ ] Borders use `border-white/10` or approved colors
- [ ] Hover states use consistent patterns
- [ ] Responsive breakpoints tested (mobile/tablet/desktop)
- [ ] Accessibility: labels, contrast, keyboard nav
- [ ] No custom CSS (except animations)
- [ ] No external icon packs (use lucide-react)

---

**Design System Version**: 1.0
**Last Updated**: 2026-04-06
**Maintainer**: Security Team
