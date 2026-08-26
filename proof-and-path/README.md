# Proof & Path

Consumer-facing web app for organising purchase problems — understand what happened, gather evidence, prepare correspondence, and track responses. Australia-only, accessibility-first.

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

Sign in with any email — in development, the magic link is shown on screen (no email provider required).

## Build

```bash
npm run build
npm start
```

## Architecture

Standalone Next.js 16 app (separate from the WhatBit marketing site at `/workspace`).

| Layer | Implementation |
|-------|----------------|
| UI | Next.js App Router, React 19, CSS Modules + design tokens |
| Auth | Magic-link tokens + JWT session cookie (`jose`) |
| Database | SQLite via Drizzle ORM (`.data/proof-and-path.db`) — portable; swap to Postgres for production |
| File storage | Local filesystem (`.data/uploads/`) — abstracted for S3/R2 |
| Drafts | Template generation from confirmed case facts |
| Export | PDF via `@react-pdf/renderer` |

## Routes

**Public:** `/`, `/how-it-works`, `/accessibility`, `/privacy`, `/sign-in`, `/auth/verify`

**Authenticated:** `/dashboard`, `/cases/new`, `/cases/[id]/*` (evidence, guidance, draft, timeline, escalation, support, delete, export)

## Environment variables

| Variable | Purpose |
|----------|---------|
| `SESSION_SECRET` | JWT signing secret (required in production) |
| `DATABASE_URL` | Reserved for future Postgres migration |

## Project structure

```
proof-and-path/
├── app/                     # Routes (public + authenticated)
├── components/              # UI, layout, screen components
├── db/                      # Drizzle schema + SQLite connection
├── lib/
│   ├── actions/             # Server actions
│   ├── auth/                # Session + magic link
│   ├── content/             # Static guidance, evidence templates
│   ├── services/            # Case CRUD, drafts, export
│   └── storage/             # File upload + mock OCR
└── middleware.ts            # Auth gate for protected routes
```

## Design tokens

Colours, typography, spacing, and radii live in `lib/tokens.css`. Large-text mode scales via `html[data-large-text="true"]` (persisted in localStorage and user profile when signed in).

Primary palette: emerald `#0F9D74`, ink `#1C2430`, page background `#F1F2F4`. Typography: Source Sans 3.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint
