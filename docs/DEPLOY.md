# Deploying to Vercel

Checklist for shipping this site to **andytsnowden.me**. One-time setup takes ~15 minutes;
after that every push to `main` deploys automatically.

## 0. Pre-flight (local)

- [ ] `pnpm build` passes locally with no errors.
- [ ] `.env.local` exists and is **not** committed (it's gitignored). The publishable key is
      the only secret, and it's safe to expose — but keep the file out of git anyway.
- [ ] Latest work is pushed to `main`.

## 1. Import the repo

- [ ] Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
- [ ] Import **andysnowden/me**.
- [ ] Vercel auto-detects **Next.js** + **pnpm** — leave Framework Preset, Build Command
      (`next build`), and Output as their defaults. No overrides needed.
- [ ] **Root Directory:** leave as `./` (the app is at the repo root).

## 2. Node version

- [ ] In **Project → Settings → Build & Deployment → Node.js Version**, pick **22.x or 24.x**
      (the repo pins Node 24 via `.nvmrc`; `package.json` requires `>=22`). If a build fails
      on the Node version, drop it to 22.x.

## 3. Environment variables

Add these under **Project → Settings → Environment Variables**, scoped to **Production**
(and Preview, if you want branch previews to show live data). Values are in `.env.example`.

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bpanebopdbmpxiguynnb.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | your `sb_publishable_…` key (Supabase → Project Settings → API) |

- [ ] Both added. They're `NEXT_PUBLIC_`, so they're read at **build time** — a redeploy is
      needed if you change them.
- [ ] Trigger the first deploy (Vercel does this automatically on import).

## 4. Verify the deploy

- [ ] Open the `*.vercel.app` URL. Check `/`, `/vacations`, and `/vacations/eastern-europe`.
- [ ] The route map renders and the timeline shows the six cities — confirms Supabase reads
      work with the publishable key through RLS.
- [ ] Photo slots show "photo coming soon" (expected until images are uploaded).

## 5. Custom domain — andytsnowden.me

- [ ] **Project → Settings → Domains → Add** `andytsnowden.me` (and add `www.andytsnowden.me`;
      set one to redirect to the other — apex is the usual canonical).
- [ ] Vercel shows the exact DNS records to create. At your domain registrar, add **the records
      Vercel displays** — don't hardcode IPs from memory, they change. Typically:
  - Apex `andytsnowden.me` → an **A record** to the IP Vercel gives you.
  - `www` → a **CNAME** to `cname.vercel-dns.com`.
- [ ] Wait for DNS to propagate (minutes to a couple hours). Vercel auto-issues the HTTPS
      certificate once it verifies the records — the domain flips to "Valid Configuration."

## 6. After go-live

- **Publishing content:** trips only appear when `published = true`. Pages use ISR
  (`revalidate = 60`), so edits and new photos appear within ~1 minute — no redeploy needed
  for data changes. Redeploy only for code or env-var changes.
- **Preview deploys:** every PR gets its own preview URL automatically.
- **Adding photos:** upload to the `trip-photos` Storage bucket and set each photo's `src`
  (see the README); the image domain is already allow-listed in `next.config.ts`.

## Gotchas

- **Stale content after a local reseed:** Next caches the Supabase read in `.next/cache`
  between local builds. If you change DB content and rebuild locally, run `rm -rf .next`
  first. (Vercel builds are always fresh, so this only affects local dev.)
- **Build fails on a dependency build script** (`sharp`): the repo already allow-lists it in
  `pnpm-workspace.yaml` (`onlyBuiltDependencies`). Leave that file in place.
