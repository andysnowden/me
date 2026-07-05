# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal site for Andy Snowden (`andytsnowden.me`). The live section is **Travel**: each trip is
told as an interactive Leaflet route map plus a stop-by-stop timeline. Next.js 16 (App Router) ·
React 19 · Tailwind CSS 4 · Supabase (Postgres + Storage) · Leaflet. Deploys to Vercel.

## Commands

```bash
nvm use            # Node 24 (.nvmrc); package.json requires >=22
pnpm install
pnpm dev           # dev server (Turbopack) at http://localhost:3000
pnpm build         # next build — prerenders published trips
pnpm lint          # eslint
```

There is no test suite. `pnpm build` + `pnpm lint` are the checks before shipping.

## Architecture

**Data flows one direction: Supabase (or sample fallback) → server loaders → server components → client islands.**

- **`src/lib/trips.ts`** is the single data-access layer (`server-only`). `getTrips()` / `getTrip(slug)`
  run one nested Supabase select (`TRIP_SELECT`) and map snake_case rows into the camelCase domain
  types in `src/lib/types.ts`. They filter to `published = true` and sort everything by `sort_order`
  (photos/activities) or `order` (stops) in JS after fetching.
- **Sample fallback is load-bearing, not a test fixture.** When Supabase is unconfigured *or a query
  errors*, the loaders return `sampleTrips` from `src/data/sample-trip.ts` so the site always renders.
  Keep `sample-trip.ts` shaped like the real data when you change the schema or domain types.
- **`src/lib/supabase.ts`** owns the shared read-only client and `photoUrl()`, which resolves a stored
  `src` to a URL: `null` → placeholder, absolute URL → as-is, otherwise a public URL in the
  `trip-photos` bucket. Accepts either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `..._PUBLISHABLE_KEY`.
- **Rendering:** `src/app/vacations/[slug]/page.tsx` is a server component using ISR
  (`revalidate = 60`) and `generateStaticParams()`, so new content/photos appear within ~1 min without
  a redeploy. `RouteMap.tsx` is the only true client island — Leaflet is dynamically imported inside a
  `useEffect` so nothing touches `window` during SSR.

## Data model

`trips → stops (cities) → activities → photos`. A **photo** attaches to exactly one of a trip (cover),
stop, or activity. If `video_src` is set, `src` is the poster still and the lightbox plays the video.
RLS allows **public read only**; all writes go through the Supabase dashboard or the `service_role` key.

## Database & photos

- SQL lives in `supabase/`: `migrations/` (schema + RLS) and `seed.sql` (the sample trip; idempotent).
  Apply via `supabase db push` or the SQL editor. There is also a Supabase MCP server (`.mcp.json`).
- **Upload photos** with `scripts/upload-photos.mjs` — resizes to a 2560px long edge, strips EXIF/GPS,
  natural-sorts by filename, upserts to `trip-photos/<prefix>/<name>-NN.jpg`, and prints a JSON
  manifest. Needs `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (anon key is read-only):
  `node --env-file=.env.local scripts/upload-photos.mjs <sourceDir> <bucketPrefix> [namePrefix]`
- New Supabase Storage hostnames must be added to `images.remotePatterns` in `next.config.ts`.

## Conventions

- **Copy Andy reads must not use em-dashes** (they read as AI-generated). Use commas, colons, or
  parentheses instead. This applies to trip/stop/activity text, not code comments.
- **A tour operator (e.g. Globus) is stated factually, never as a review or endorsement.** See the
  note on `Trip.tourOperator` in `types.ts`.
- Design tokens (colors like `ink`, `accent`, `line`; `font-display` serif) are defined in
  `src/app/globals.css` under `@theme`. Use those Tailwind classes rather than raw hex values.
- **Local stale content:** Next caches the Supabase read in `.next/cache`. After reseeding the DB
  locally, `rm -rf .next` before rebuilding (Vercel builds are always fresh).

Deploy details and gotchas: `docs/DEPLOY.md`.
