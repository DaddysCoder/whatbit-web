# Proof & Path

Consumer-facing web app for organising purchase problems — understand what happened, gather evidence, prepare correspondence, and track responses. Australia-only, accessibility-first.

This is Phase 1 scaffolding: design system, layout shell, shared types, and hooks. Page content is implemented in later phases.

## Requirements

- Node.js 20+
- npm

## Run locally

```bash
cd proof-and-path
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project structure

```
proof-and-path/
├── app/                  # Next.js App Router (layout, globals, pages)
├── components/
│   ├── layout/           # AppHeader, ContentColumn, LogoMark
│   ├── providers/        # AppProviders (large text + demo case context)
│   └── ui/               # Design system components
├── lib/
│   ├── hooks/            # useLargeText, useResponsive
│   ├── tokens.css        # Design tokens (incl. large-text scaling)
│   └── types/            # Shared domain types
```

## Design tokens

Colours, typography, spacing, and radii live in `lib/tokens.css`. Large-text mode scales via `html[data-large-text="true"]` (persisted in localStorage by `useLargeText`).

Primary palette: emerald `#0F9D74`, ink `#1C2430`, page background `#F1F2F4`. Typography: Source Sans 3.

## Key exports for other agents

Import from these paths:

| Path | Exports |
|------|---------|
| `@/components/ui` | `Button`, `Card`, `Badge`, `FormField`, `Input`, `Textarea`, `Checkbox`, `StepIndicator`, `SectionCard` |
| `@/components/layout` | `AppHeader`, `ContentColumn`, `LogoMark` |
| `@/components/providers` | `AppProviders`, `useLargeTextContext`, `useDemoCaseContext` |
| `@/lib/types` | `Case`, `EvidenceItem`, `TimelineEvent`, `Draft`, `SupportPermissions`, etc. |
| `@/lib/hooks/useLargeText` | `useLargeText` |
| `@/lib/hooks/useResponsive` | `useResponsive`, `DESKTOP_BREAKPOINT` |

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
