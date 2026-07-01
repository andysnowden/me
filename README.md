# andytsnowden.me

Personal site for Andy Snowden. First section live: **Travel** — trips told as an
interactive route map plus a stop-by-stop timeline. Professional pages come later.

Built with **Next.js 16** (App Router) · **Tailwind CSS 4** · **Supabase**
(Postgres + Storage) · **Leaflet** (OpenStreetMap/CARTO tiles, no API key). Deploys to
Vercel at `andytsnowden.me`.

## Getting started

```bash
nvm use            # Node 24 (see .nvmrc)
pnpm install
cp .env.example .env.local   # then paste your Supabase publishable key
pnpm dev           # http://localhost:3000
```

Without a Supabase key the app renders the local sample trip in
`src/data/sample-trip.ts`, so you can develop entirely offline. Add the key and it
reads live data from Supabase instead.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable (`sb_publishable_…`) key — safe in the browser; read-only via RLS |

## Data model

`trips → stops (cities) → activities → photos`

- **trips** — a journey (title, dates, optional `tour_operator`, `published` flag).
- **stops** — a city, with `lat`/`lng` for the map and an `order` along the route.
- **activities** — things done in a city (e.g. a day trip); `is_highlight` flags standouts.
- **photos** — attach to exactly one of a trip (cover), a stop, or an activity.

Only `published = true` trips are visible. Row Level Security allows **public read only**;
all writes go through the Supabase dashboard or the `service_role` key.

## Photos

Uploaded to the public **`trip-photos`** Storage bucket. A photo's `src` is either a path
within that bucket or an absolute URL; empty `src` renders a "photo coming soon"
placeholder. See `photoUrl()` in `src/lib/supabase.ts`.

## Database

SQL lives in `supabase/`:

- `migrations/` — schema + RLS (applied to the project).
- `seed.sql` — the sample "Across Eastern Europe" trip (idempotent; re-runnable).

Apply with the Supabase CLI (`supabase db push`) or paste into the SQL editor.

## Project layout

```
src/
  app/
    page.tsx                     # home
    vacations/page.tsx           # trip index
    vacations/[slug]/page.tsx    # trip detail (map + timeline)
  components/
    RouteMap.tsx                 # Leaflet map (client-only)
    Timeline.tsx                 # stops → activities → photos
    PhotoGallery.tsx / PhotoSlot.tsx
  lib/
    supabase.ts                  # client + photo URL helper
    trips.ts                     # data loaders (Supabase, sample fallback)
    types.ts  format.ts
  data/sample-trip.ts            # offline fallback content
```

## Deploy

Push to GitHub, import into Vercel, set the two env vars, and point `andytsnowden.me`
at the project. `pnpm build` prerenders each published trip as static HTML.
