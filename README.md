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
