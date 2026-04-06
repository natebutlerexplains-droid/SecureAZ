# Securaz Branding & Design Tokens

Complete branding guide and centralized design token reference for all visual and interactive elements.

## Brand Identity

**Name**: Securaz  
**Tagline**: Modern SOC 2 Compliance Dashboard  
**Mission**: Simplify security compliance with real-time insights and actionable intelligence

### Brand Values
- **Security**: Data protection and trust are paramount
- **Clarity**: Clear visualization of complex compliance data
- **Modern**: Contemporary design with cutting-edge UX
- **Accessible**: Inclusive design for all users
- **Professional**: Enterprise-grade reliability and aesthetics

## Visual Identity

### Logo
- Primary: [Logo file path] — use for headers, favicons
- Variant: Monochrome version for light backgrounds
- Minimum size: 40px × 40px
- Clear space: 8px minimum around logo

### Color Brand

#### Primary Palette
| Element | Color | Hex | Tailwind | Usage |
|---------|-------|-----|----------|-------|
| Accent | Cyan | #06B6D4 | cyan-400 | Primary CTA buttons, primary highlights |
| Secondary | Teal | #14B8A6 | teal-300 | Success states, positive indicators |
| Tertiary | Azure | #0EA5E9 | sky-400 | Supporting highlights, chart series |

**Brand Color Usage:**
- **Cyan** is the primary brand color — use for most interactive elements
- **Teal** conveys compliance success and positive progress
- **Azure** provides visual hierarchy in complex data displays

#### Extended Severity Palette
| Severity | Color | Hex | Tailwind | Meaning |
|----------|-------|-----|----------|---------|
| Critical | Red | #F87171 | red-400 | Immediate action required |
| High | Orange | #FB923C | orange-400 | Significant issue |
| Medium | Amber | #FBBF24 | amber-400 | Notable but not urgent |
| Low | Green | #4ADE80 | green-500 | Minor or informational |
| Info | Blue | #3B82F6 | blue-500 | Informational only |

#### Neutral Base Colors
| Purpose | Color | Hex | Tailwind | Usage |
|---------|-------|-----|----------|-------|
| Darkest background | Slate 900 | #0F172A | slate-900 | Main app background |
| Dark surface | Slate 800 | #1E293B | slate-800 | Cards, panels |
| Muted text | Slate 500 | #64748B | slate-500 | Secondary text |
| Normal text | Slate 300 | #CBD5E1 | slate-300 | Body text |
| Bright text | Slate 100 | #F1F5F9 | slate-100 | Emphasis, headings |

### Typography Brand

#### Font Stack
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
```

- System-native fonts for maximum compatibility and performance
- Familiar to all users regardless of platform
- Excellent readability and accessibility

#### Typeface Weights
- **Light (300)**: Not used (poor contrast)
- **Regular (400)**: Not used
- **Semibold (600)**: Body text, normal weight
- **Bold (700)**: Labels, emphasis, subheadings
- **Black (900)**: Headings, statistics, high emphasis

#### Type Hierarchy

| Level | Size | Weight | Usage | Example |
|-------|------|--------|-------|---------|
| Hero | 32px | 900 | Major page title | "SOC 2 Compliance Dashboard" |
| H1 | 24px | 900 | Page title | "Security Reports" |
| H2 | 18px | 700 | Widget title | "Compliance Matrix" |
| H3 | 16px | 700 | Section heading | "Resource Coverage" |
| Body | 14px | 600 | Main text | "This finding affects..." |
| Label | 11px | 700 | UI labels | "Severity: Critical" |
| Small | 10px | 600 | Secondary info | "2 hours ago" |
| Caption | 9px | 500 | Chart text | Axis labels, legends |
| Monospace | 12px | 400 | Code/resources | `api-gateway-01` |

## Design Token Reference

### Spacing Tokens
```
2px   → gap-0.5, p-0.5
4px   → gap-1, p-1
8px   → gap-2, p-2
12px  → gap-3, p-3
16px  → gap-4, p-4
20px  → gap-5, p-5
24px  → gap-6, p-6
```

**Rule**: Always use Tailwind spacing classes. Never hardcode pixel values.

### Border Radius Tokens
```
4px   → rounded (default)
8px   → rounded-lg (buttons, inputs)
12px  → rounded-xl (card sections)
16px  → rounded-2xl (main cards)
9999px → rounded-full (circles, pills)
```

### Shadow Tokens
```
No custom shadows — use opacity layers instead

Example:
bg-black/15    → Subtle shadow effect
border-white/10 → Subtle border
```

### Opacity Scale
```
100%  → (no modifier)   text-white
75%   → /75             text-white/75
70%   → /70             text-white/70
60%   → /60             text-white/60
55%   → /55             text-white/55
50%   → /50             text-white/50
30%   → /30             border-cyan-400/30
20%   → /20             bg-black/20
15%   → /15             bg-red-500/15
10%   → /10             bg-white/10
8%    → /8              bg-white/8
6%    → /6              bg-white/6
5%    → /5              bg-cyan-500/5
3%    → /3              bg-white/3
2%    → /2              (rarely used)
```

## Component Design Tokens

### Cards (GlassCard)
```
Padding: p-3 or p-4
Border: border border-white/10
Background: bg-black/15 or bg-white/6
Border radius: rounded-2xl (main), rounded-xl (sub)
Backdrop: backdrop-blur-xl
Shadow: None (opacity handles visual weight)
```

### Buttons

#### Primary (Cyan CTA)
```
Border: border border-cyan-500/30
Background: bg-cyan-500/5
Text: text-cyan-300
Hover: hover:bg-cyan-500/10
Disabled: disabled:opacity-60
Padding: px-4 py-2 (standard), px-2.5 py-1.5 (compact)
Radius: rounded-xl
```

#### Secondary (White/Ghost)
```
Border: border border-white/10
Background: bg-white/6
Text: text-white
Hover: hover:bg-white/10
Disabled: disabled:opacity-60
Padding: px-4 py-2
Radius: rounded-xl
```

#### Danger (Red)
```
Border: border border-red-500/30
Background: bg-red-500/5
Text: text-red-300
Hover: hover:bg-red-500/10
```

### Badges

#### Severity Badge
```
Text: text-[10px] font-black uppercase
Padding: px-1.5 py-0.5
Border radius: rounded
Border: border [color]-400/25
Background: bg-[color]-500/15
Text color: text-[color]-300
Colors: red, orange, yellow, green, blue
```

#### Metric Badge
```
Example: "2 open"
Text: text-[10px] font-black
Padding: px-1.5 py-0.5
Radius: rounded
Border: border red-400/25
Background: bg-red-500/15
Text: text-red-300
```

### Links
```
Text: text-[color]-300 (cyan-300 default)
Underline: underline
Hover: hover:text-[color]-200
External link icon: ExternalLink (lucide-react)
```

### Input Fields
```
Border: border border-white/10
Background: bg-white/6
Text: text-white
Padding: px-3 py-2
Radius: rounded-lg
Focus: focus:outline-none focus:border-cyan-400/50
Placeholder: placeholder:text-slate-500
```

### Dividers
```
Horizontal: border-t border-white/5 or border-white/10
Vertical: border-l border-white/5 or border-white/10
No margins — rely on gap/padding for spacing
```

## Animation Tokens

### Transitions
```
Color fade: transition-colors duration-200
Opacity: transition-opacity duration-300
Transform: transition-transform duration-300
All: transition-all duration-300
```

### Animations
```
Fade in: animate-in fade-in duration-300
Slide up: animate-in fade-in slide-in-from-top-2 duration-300
Bounce: hover:scale-105 active:scale-95
Pulse: animate-pulse (for loading states)
```

### Timing
```
Fast: duration-200 (200ms)
Normal: duration-300 (300ms)
Slow: duration-500 (500ms)
```

## Interactive States

### Hover States
| Element | Default | Hover |
|---------|---------|-------|
| Button | bg-cyan-500/5 | bg-cyan-500/10 |
| Card | border-transparent | border-white/20 |
| Row | bg-black/20 | bg-white/4 |
| Icon | text-slate-300 | text-white |
| Text link | text-cyan-300 | text-cyan-200 |

### Active/Focus States
| Element | Active |
|---------|--------|
| Button | active:scale-95 (press feedback) |
| Tab | bg-white/20 (highlighted) |
| Input | focus:border-cyan-400/50 focus:outline-none |
| Checkbox | focus:ring-2 focus:ring-cyan-400 |

### Disabled States
| Element | Disabled |
|---------|----------|
| Button | disabled:opacity-60 disabled:cursor-not-allowed |
| Input | disabled:opacity-50 disabled:cursor-not-allowed |
| Link | opacity-50 cursor-not-allowed |

## Responsive Design Tokens

### Breakpoints
```
sm   640px   Tablets
md   768px   Small laptops
lg   1024px  Laptops
xl   1280px  Large screens
2xl  1536px  Extra large
```

### Mobile-First Patterns
```
Columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
Stack: flex-col md:flex-row
Text size: text-sm md:text-base
Padding: p-3 md:p-4
Gap: gap-2 md:gap-3
```

## Accessibility Tokens

### Color Contrast
- **Minimum WCAG AA**: 4.5:1
- **Minimum WCAG AAA**: 7:1
- **All text**: Meets AA standard minimum

### Focus Indicators
```
Visible focus ring: focus:outline-none focus:ring-2 focus:ring-cyan-400
Not relying on color alone for meaning
High contrast indicators
```

### Motion
```
Reduced motion: prefers-reduced-motion: reduce
Animations: Can be disabled via accessibility settings
No flashing content (>3 flashes per second)
```

## Theming

### Current Theme
- **Name**: Dark Mode
- **Background**: Slate 900 (#0F172A)
- **Surfaces**: Slate 800 (#1E293B) with opacity layers
- **Text**: Slate 300-100 for hierarchy

### Future Theme Support
When light mode is added:
```
-- Light background
-- Light surfaces
-- Dark text
-- Updated color palette
```

## Asset Guidelines

### Icons (Lucide React)
```
Size: w-4 h-4 (16px default), w-5 h-5 (20px emphasis)
Color: Inherit from text or explicit color class
Stroke width: 2px (default, don't change)
No custom icon modifications
```

### Imagery
```
Format: SVG for scalability (wallpapers, logos)
JPEG/PNG: Only for photographs, optimized for web
Compression: Minimize file size without quality loss
Dark backgrounds: Ensure contrast in dark mode
```

### Wallpapers
```
Format: SVG (preferred) or JPEG
Resolution: 1920×1080 minimum for desktop
Opacity: ~0.03-0.05 to not interfere with content
Position: background-fixed for parallax effect
```

## Dark Mode Implementation

### Current Support
- **Dark Mode**: ✅ Fully supported
- **Light Mode**: ❌ Not supported
- **System preference**: Set dark-mode only

### Future Light Mode
```css
@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #FFFFFF;
    --bg-secondary: #F8FAFC;
    --text-primary: #0F172A;
    --text-secondary: #64748B;
  }
}
```

Then add `dark:` prefixes to Tailwind classes.

## Whitespace & Layout

### Standard Spacing
```
Between sections: gap-6
Between cards: gap-4
Between elements within card: gap-3
Between text lines: line-height based on size
Column padding: p-3 or p-4
Row padding: py-3 px-3
```

### Grid Layouts
```
2-column (mobile): grid-cols-2 gap-3
4-column (desktop): lg:grid-cols-4 gap-3
Flexible: grid-cols-[20px_minmax(0,2fr)_80px] gap-px
```

## Quality Assurance

### Design Compliance Checklist
- [ ] Uses approved color palette only
- [ ] Typography follows hierarchy rules
- [ ] Spacing uses Tailwind scale
- [ ] All borders are white/10 or severity colors
- [ ] Hover states use consistent patterns
- [ ] Responsive breakpoints tested
- [ ] Contrast meets WCAG AA
- [ ] No custom CSS outside animations
- [ ] Icons from lucide-react only
- [ ] No hardcoded pixel values

---

**Branding Version**: 1.0  
**Last Updated**: 2026-04-06  
**Maintained By**: Design & Security Team
