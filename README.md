# WhatBit website

This repository contains the public WhatBit website and product pages.

## Production hosting

**Production is Cloudflare.** GitHub is the source repository and Cloudflare is the production deployment target for `whatbit.dev` / `www.whatbit.dev`.

A Vercel project may still create automatic preview builds from this repository, but those previews are not the WhatBit production source of truth.

## Product links

Product application URLs are kept in `lib/products.ts` where possible. Current live product hosts include:

- Pace: `https://orbit.whatbit.tech` (legacy hostname retained for OAuth/session compatibility)
- Trace: `https://trace.whatbit.dev`
- Frame: Cloudflare Worker URL in `lib/products.ts`

The `/trace` product page describes Trace Free and Trace Pro; Trace itself is deployed separately from `DaddysCoder/fracta-flow-trace` to Cloudflare Workers.

## Contact form

The public `/contact` form posts to `/api/contact` and sends website enquiries to `hello@primitiveai.com.au` through Cloudflare Email Service.

Required production runtime configuration:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_EMAIL_API_TOKEN` — secret with the minimum Email Sending permission required
- `CONTACT_FROM_EMAIL` — optional; defaults to `website@whatbit.dev`

Before enabling production delivery, onboard the sender domain in Cloudflare Email Service and verify the business inbox as a destination where required by the Cloudflare account/plan. Never expose the email API token to browser-side code.

The form collects only name, email, reason and message, includes a honeypot field for basic bot filtering, and uses the visitor's address as the email Reply-To value so the business can reply normally from its inbox.

## AI Blueprint

`/ai-blueprint` is a paid AI-readiness assessment product. The public pages (`/ai-blueprint`, `/success`, `/assessment`, `/submitted`, `/terms`, `/privacy`) and the internal review tooling (`/admin/ai-blueprint`, `/admin/ai-blueprint/[id]`) are backed by a Cloudflare D1 database (`ai-blueprint`) and a Cloudflare KV namespace (`ai-blueprint-admin-sessions`), both queried over Cloudflare's REST API (same pattern as the contact form's Cloudflare Email Service call — no Workers bindings required, so this runs on any Next.js hosting target).

Required production runtime configuration:

- `CLOUDFLARE_ACCOUNT_ID` — shared with the contact form
- `CLOUDFLARE_AI_BLUEPRINT_API_TOKEN` — secret scoped to D1 Edit + Workers KV Storage Edit for the `ai-blueprint` database and `ai-blueprint-admin-sessions` namespace only
- `CLOUDFLARE_EMAIL_API_TOKEN` / `CONTACT_FROM_EMAIL` — shared with the contact form; used to send assessment-invite, submission-notification and delivery emails
- `AI_BLUEPRINT_STRIPE_WEBHOOK_SECRET` — the signing secret for a Stripe webhook subscribed to `checkout.session.completed`, pointed at `/api/ai-blueprint/checkout-webhook`
- `AI_BLUEPRINT_ADMIN_PASSWORD` — shared password for `/admin/ai-blueprint` sign-in (a lightweight gate; there is no per-reviewer account system yet)
- `AI_BLUEPRINT_ADMIN_SESSION_SECRET` — random secret used to HMAC-sign the admin session cookie
- `NEXT_PUBLIC_AI_BLUEPRINT_CHECKOUT_URL` — optional; a Stripe Payment Link for the "Become a Founding Client" CTA. Until set, CTAs fall back to the on-page offer section.

Without `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_AI_BLUEPRINT_API_TOKEN`, the AI Blueprint API routes return a `503` rather than erroring, matching how `/api/contact` degrades when its own Cloudflare credentials are absent.

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

Keep production-hosting changes Cloudflare-compatible and do not treat a successful Vercel preview as proof that the Cloudflare production site has deployed.
