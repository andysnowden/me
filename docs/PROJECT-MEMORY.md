# Project memory — andytsnowden.me

Portable snapshot of what a previous Claude instance learned about this project, for handing
to a fresh instance. These are point-in-time observations (captured Jul 1–3 2026), not live
state: verify any file path, column, or code claim against the current repo before relying on it.

## 1. The project (what & where)

`~/me` (github.com/andysnowden/me) is Andy Snowden's personal + professional website, hosted at
**andytsnowden.me**. Stack: Next.js 16 (App Router) + Tailwind 4 + Supabase + Leaflet; deploy
target Vercel. The **Travel/vacations** section is being built first; professional pages come later.

- Supabase project ref: `bpanebopdbmpxiguynnb`.
- Data model: `trips → stops → activities → photos`, public read-only RLS, photos in the public
  `trip-photos` Storage bucket. See the repo README and `supabase/` for details.
- First trip (real data seeded): Globus "The Best of Eastern Europe" (Tour RO 60620),
  Jun 19 – Jul 3 2026, slug `eastern-europe`. Route: Berlin → Warsaw → Kraków (Auschwitz) →
  Budapest → Vienna → Prague → Berlin, six countries. Sourced from two Globus PDFs (itinerary +
  excursions).
- Pages use ISR (`export const revalidate = 60`).

**Gotcha:** Next's persistent Data Cache (`.next/cache`) can serve a stale Supabase read across
local rebuilds after reseeding. Run `rm -rf .next` before rebuilding when DB content changed
locally. (Vercel builds are always fresh.)

## 2. Editorial constraint — Globus (tour operator)

The Eastern Europe trip was a guided **Globus** tour. Globus may be mentioned **factually**
(e.g. "guided tour with Globus") but **never as a review or endorsement** of the company.

- **Why:** Andy wants the site to describe his experience, not read as marketing or a critique
  of the operator.
- **How to apply:** State the operator neutrally; keep the focus on places and experiences.

## 3. Editorial constraint — no em-dashes

Do **not** use em-dashes (—) in any prose Andy will read (site copy, captions, descriptions, docs).
He finds they "feel too much like AI."

- **Why:** Wants the writing to read as human / his own, not machine-generated.
- **How to apply:** Use commas, colons, periods, or parentheses instead. En-dashes in
  numeric/date ranges (e.g. "1961–1989") are fine.

## 4. Photo upload workflow

The reusable uploader script takes a source-dir argument, resizes images to a 2560px long edge,
strips EXIF/GPS via `sharp`, and uploads to the public `trip-photos` bucket. It needs
`SUPABASE_SERVICE_ROLE_KEY` (the anon key is read-only; granting anon write is correctly blocked).
After uploading, wire `photos.src` in the DB + `seed.sql` + `sample-trip.ts` to the storage paths.

> **Corrected since the memory was written:** the script is now `scripts/upload-photos.mjs`
> (the memory calls it `upload-berlin-photos.mjs`). Invoke it as:
> `node --env-file=.env.local scripts/upload-photos.mjs <sourceDir> <bucketPrefix> [namePrefix]`

Gotchas:
- macOS filenames are NFD-normalized, so hardcoded name literals fail — discover folders/files
  dynamically.
- The Bash sandbox reads `~/Desktop` but blocks network; sandbox-off has network. Stage photos
  into the workspace before a network-enabled run.

## 5. Video in galleries

Galleries support videos alongside photos. A `photos` row can set `video_src` (storage path to an
mp4); then `src` is the poster still shown in the grid (with a play badge), and the lightbox plays
the video when enlarged. Column added in migration `20260703120000_add_photo_video.sql`; the domain
type field is `Photo.videoSrc`.

**Import pipeline for an iPhone .MOV** (HEVC, often portrait with rotation metadata):

1. Transcode to web mp4:
   ```
   ffmpeg -i in.MOV -vf "scale=-2:1280" -c:v libx264 -profile:v high -pix_fmt yuv420p \
     -crf 24 -preset veryfast -c:a aac -b:a 128k -movflags +faststart out.mp4
   ```
   (`brew install ffmpeg`)
2. Poster still at a representative moment:
   ```
   ffmpeg -ss <sec> -i in.MOV -frames:v 1 -q:v 2 poster.jpg
   ```
3. Upload the poster (through `sharp` like other photos) and the mp4 raw with contentType
   `video/mp4`. Large uploads (20MB+) can fail with "fetch failed" over slow wifi — retry the
   video a few times.
4. Wire the DB row (`src` = poster, `video_src` = mp4) and mirror in `seed.sql` + `sample-trip.ts`.

First use: Poznań Town Hall noon goats.
