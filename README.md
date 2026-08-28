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
