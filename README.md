# WhatBit website

This repository contains the public WhatBit website and product pages.

## Production hosting

**Production is Vercel.** GitHub is the source repository and Vercel is the production deployment target for `whatbit.dev` / `www.whatbit.dev`.

Pushing to `main` triggers a Vercel production deployment through the connected `DaddysCoder/whatbit-web` Git repository. `www.whatbit.dev` is the primary site; the apex `whatbit.dev` redirects permanently to `www.whatbit.dev`.

Cloudflare remains the DNS provider and continues to host the separate product Workers on their existing subdomains. The main website is no longer deployed by the repository's former Cloudflare GitHub Actions workflow.

## Product links

Product application URLs are kept in `lib/products.ts` where possible. Current live product hosts include:

- Pace: `https://orbit.whatbit.tech` (legacy hostname retained for OAuth/session compatibility)
- Trace: `https://trace.whatbit.dev`
- Frame: Cloudflare Worker URL in `lib/products.ts`

The `/trace` product page describes Trace Free and Trace Pro; Trace itself is deployed separately from `DaddysCoder/fracta-flow-trace` to Cloudflare Workers.

## Contact form

The public `/contact` form posts to `/api/contact` and sends website enquiries to `hello@primitiveai.com.au` through Resend.

Required production runtime configuration:

- `RESEND_API_KEY` — secret Resend API key
- `CONTACT_FROM_EMAIL` — optional; defaults to `website@whatbit.dev`

Before enabling production delivery, verify the sender domain (`whatbit.dev`) in Resend. Never expose the Resend API key to browser-side code.

The form collects only name, email, reason and message, includes a honeypot field for basic bot filtering, and uses the visitor's address as the email Reply-To value so the business can reply normally from its inbox.

## AI Blueprint

`/ai-blueprint` is the WHATBIT marketing page for the paid AI-readiness assessment product, plus a marketing-only early-access waitlist (`/api/ai-blueprint/early-access`, Resend email notification only — no database).

The operational Blueprint application (assessment, reviewer/admin UI, assessment APIs, Stripe checkout webhook, Cloudflare D1/KV backend) lives in the standalone `DaddysCoder/blue-print-ai-app` codebase, prepared in `blue-print-ai-app/` for promotion to its own repository. WHATBIT links to it through the single `AI_BLUEPRINT_APP_URL` constant in `lib/products.ts` (configured via `NEXT_PUBLIC_AI_BLUEPRINT_APP_URL`; empty until the owner approves the domain).

WHATBIT production needs only `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` (shared with the contact form) for Blueprint marketing. Blueprint operational secrets (`CLOUDFLARE_*`, `AI_BLUEPRINT_ADMIN_*`, `AI_BLUEPRINT_STRIPE_WEBHOOK_SECRET`) belong to the standalone app and must not be set on WHATBIT.

## AI Blueprint separation (Phase A)

The operational AI Blueprint app extracts to `DaddysCoder/blue-print-ai-app`. WHATBIT keeps the marketing page (`/ai-blueprint`) plus the early-access signup (`/api/ai-blueprint/early-access`). No deploy, DNS, or Stripe changes are part of this task; the standalone app origin is configured via `NEXT_PUBLIC_AI_BLUEPRINT_APP_URL` (empty until the owner approves the domain).

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

A successful local build is not proof production has deployed. Check the latest Vercel production deployment for `whatbit-web` and confirm it is serving the current `main` commit.
