# Contributing to Securaz

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and professional. We're building a welcoming community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/securaz.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start dev server: `npm run dev`

## Development Workflow

### Branch Strategy

- **Main** (`main`): Production-ready code
- **QA** (`qa`): Tested features ready for staging
- **Dev** (`dev`): Active development, integration branch

Create feature branches from `dev`:
```bash
git checkout dev
git checkout -b feature/your-feature
```

### Commit Messages

Follow conventional commits format:

```
type(scope): short description

Longer explanation if needed.

Fixes #123
```

**Types**: feat, fix, docs, style, refactor, test, chore
**Scope**: Feature area (e.g., `reports`, `dashboard`, `ui`)

Examples:
- `feat(reports): add export PDF functionality`
- `fix(charts): resolve SVG coordinate mapping issue`
- `docs(readme): update setup instructions`

### Code Style

- **Formatting**: Prettier (configured in project)
- **Linting**: ESLint with Next.js/React rules
- **TypeScript**: Strict mode enabled

Run before committing:
```bash
npm run lint
```

### Component Guidelines

#### Creating New Components

1. **Location**: Place in appropriate subdirectory
   - Page components: `app/`
   - Dashboard widgets: `components/dashboard/`
   - Reusable UI: `components/ui/`
   - Layout: `components/layout/`

2. **Structure**: Follow existing patterns
   ```tsx
   'use client'  // Only if state/effects needed

   import { useState } from 'react'
   import { GlassCard } from '@/components/ui/GlassCard'

   export function MyComponent() {
     // Component implementation
   }
   ```

3. **Styling**: Use Tailwind classes
   - No inline styles
   - Reuse color tokens from design system
   - Use `gap-*`, `p-*` for spacing (never custom margins)

4. **Naming**: PascalCase for components, camelCase for functions

#### Design System

All components must use:
- **Card wrapper**: `<GlassCard>` for consistent styling
- **Typography**: Predefined classes for headings, body, labels
- **Colors**: From the palette (cyan, teal, red, orange, yellow, green, blue, slate)
- **Spacing**: Tailwind scale (no hardcoded dimensions)

### Testing

- Visual testing via `test-*.js` files
- Manual testing in dev mode
- Responsive testing (desktop, tablet, mobile)
- No automated test suite required yet

Test before submitting PR:
```bash
npm run dev
# Test in browser at http://localhost:3000
```

### Pull Request Process

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

2. **Create PR** with:
   - Clear title describing the change
   - Description of what was changed and why
   - Reference to related issues (fixes #123)
   - Screenshots for UI changes

3. **PR Template** (auto-generated):
   ```markdown
   ## Description
   Brief explanation of changes

   ## Type of Change
   - [ ] Feature
   - [ ] Bug fix
   - [ ] Docs
   - [ ] Styling

   ## Testing
   How to test the changes

   ## Screenshots (if UI change)
   [Include relevant screenshots]
   ```

4. **Review Process**
   - At least one maintainer review required
   - CI checks must pass
   - Address requested changes
   - Rebase before merge (keep history clean)

## Environment Setup

### Required Tools
- Node.js 18+ (recommend 20 LTS)
- Git
- Text editor (VS Code recommended)

### VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

### Environment Variables
None required for local development. Mock data is used by default.

## Common Tasks

### Adding a New Dashboard Widget

1. Create component file: `components/dashboard/MyWidget.tsx`
2. Wrap in `<GlassCard>`
3. Add widget header with title and MoreHorizontal button
4. Use mock data from `lib/mock-data.ts`
5. Import and add to main layout
6. Test responsive behavior

### Adding a New Page

1. Create directory: `app/my-page/`
2. Add `page.tsx` with layout
3. Import `Header` with correct `activeTab`
4. Add navigation link in Header if needed

### Updating Colors

Edit `tailwind.config.ts` or component classes directly. Colors are used via Tailwind classes (e.g., `text-cyan-400`, `bg-red-500/15`).

### Creating SVG Charts

Use coordinate mapping pattern:
```tsx
const W = 460, H = 120
const toX = (i: number) => PAD_X + (i / (n - 1)) * (W - PAD_X * 2)
const toY = (v: number) => PAD_Y + (1 - (v - min) / (max - min)) * (H - PAD_Y * 2)
```

## Questions?

- Open an issue for bugs
- Discuss features in GitHub discussions
- Ask in pull request comments

---

Thanks for contributing to Securaz!
