-- Initial schema for the travel/vacations section.
-- Model: trips → stops (cities) → activities → photos.
--
-- Access model: content is public and READ-ONLY via the Data API.
-- Reads are allowed for anon + authenticated. There are NO write policies:
-- content is managed via the dashboard or the service_role key (which bypasses
-- RLS), so the public anon key can never mutate data.

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.trips (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  subtitle      text,
  summary       text,
  tour_operator text,
  start_date    date,
  end_date      date,
  published     boolean not null default false,
  created_at    timestamptz not null default now()
);

create table if not exists public.stops (
  id         uuid primary key default gen_random_uuid(),
  trip_id    uuid not null references public.trips (id) on delete cascade,
  slug       text not null,
  city       text not null,
  country    text not null,
  lat        double precision not null,
  lng        double precision not null,
  "order"    integer not null default 1,
  nights     integer,
  date_from  date,
  date_to    date,
  summary    text,
  unique (trip_id, slug)
);

create table if not exists public.activities (
  id           uuid primary key default gen_random_uuid(),
  stop_id      uuid not null references public.stops (id) on delete cascade,
  title        text not null,
  description  text,
  is_highlight boolean not null default false,
  sort_order   integer not null default 1
);

create table if not exists public.photos (
  id          uuid primary key default gen_random_uuid(),
  activity_id uuid references public.activities (id) on delete cascade,
  stop_id     uuid references public.stops (id) on delete cascade,
  trip_id     uuid references public.trips (id) on delete cascade,
  -- Path within the `trip-photos` storage bucket, or an absolute URL.
  src         text,
  caption     text,
  width       integer,
  height      integer,
  sort_order  integer not null default 1,
  -- A photo must attach to exactly one level.
  constraint photos_one_parent check (
    (activity_id is not null)::int
    + (stop_id is not null)::int
    + (trip_id is not null)::int = 1
  )
);

-- ── Indexes ─────────────────────────────────────────────────────────────────

create index if not exists stops_trip_id_idx on public.stops (trip_id);
create index if not exists activities_stop_id_idx on public.activities (stop_id);
create index if not exists photos_activity_id_idx on public.photos (activity_id);
create index if not exists photos_stop_id_idx on public.photos (stop_id);
create index if not exists photos_trip_id_idx on public.photos (trip_id);

-- ── Row Level Security ────────────────────────────────────────────────────────

alter table public.trips      enable row level security;
alter table public.stops      enable row level security;
alter table public.activities enable row level security;
alter table public.photos     enable row level security;

-- Public read of published trips and everything hanging off them.
create policy "Published trips are readable"
  on public.trips for select
  to anon, authenticated
  using (published = true);

create policy "Stops of published trips are readable"
  on public.stops for select
  to anon, authenticated
  using (exists (
    select 1 from public.trips t
    where t.id = stops.trip_id and t.published = true
  ));

create policy "Activities of published trips are readable"
  on public.activities for select
  to anon, authenticated
  using (exists (
    select 1 from public.stops s
    join public.trips t on t.id = s.trip_id
    where s.id = activities.stop_id and t.published = true
  ));

create policy "Photos of published trips are readable"
  on public.photos for select
  to anon, authenticated
  using (
    (trip_id is not null and exists (
      select 1 from public.trips t where t.id = photos.trip_id and t.published = true))
    or (stop_id is not null and exists (
      select 1 from public.stops s join public.trips t on t.id = s.trip_id
      where s.id = photos.stop_id and t.published = true))
    or (activity_id is not null and exists (
      select 1 from public.activities a
      join public.stops s on s.id = a.stop_id
      join public.trips t on t.id = s.trip_id
      where a.id = photos.activity_id and t.published = true))
  );

-- ── Data API grants (read-only for public roles) ─────────────────────────────

grant select on public.trips      to anon, authenticated;
grant select on public.stops      to anon, authenticated;
grant select on public.activities to anon, authenticated;
grant select on public.photos     to anon, authenticated;

-- ── Storage: public bucket for trip photos ───────────────────────────────────
-- A public bucket serves objects via their public URL without any SELECT policy
-- on storage.objects, so we intentionally add none — adding a broad one would
-- also let clients *list* the whole bucket. Uploads happen via the dashboard or
-- the service_role key.

insert into storage.buckets (id, name, public)
values ('trip-photos', 'trip-photos', true)
on conflict (id) do nothing;
