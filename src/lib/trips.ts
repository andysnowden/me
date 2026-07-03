import "server-only";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { sampleTrips } from "@/data/sample-trip";
import type { Activity, Photo, Stop, Trip } from "@/lib/types";

// Data access for trips. When Supabase is configured we read published trips
// from the database; otherwise we fall back to local sample data so the site
// renders during development.

// Shape of the nested select we run against Supabase.
type Row = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string | null;
  tour_operator: string | null;
  start_date: string | null;
  end_date: string | null;
  photos: PhotoRow[];
  stops: StopRow[];
};
type StopRow = {
  id: string;
  slug: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  order: number;
  nights: number | null;
  date_from: string | null;
  date_to: string | null;
  summary: string | null;
  activities: ActivityRow[];
};
type ActivityRow = {
  id: string;
  title: string;
  description: string | null;
  is_highlight: boolean;
  sort_order: number;
  photos: PhotoRow[];
};
type PhotoRow = {
  id: string;
  src: string | null;
  video_src: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  sort_order: number;
};

const TRIP_SELECT = `
  id, slug, title, subtitle, summary, tour_operator, start_date, end_date,
  photos ( id, src, video_src, caption, width, height, sort_order ),
  stops (
    id, slug, city, country, lat, lng, "order", nights, date_from, date_to, summary,
    activities (
      id, title, description, is_highlight, sort_order,
      photos ( id, src, video_src, caption, width, height, sort_order )
    )
  )
`;

function mapPhoto(p: PhotoRow): Photo {
  return {
    id: p.id,
    src: p.src,
    videoSrc: p.video_src,
    caption: p.caption,
    width: p.width,
    height: p.height,
    sortOrder: p.sort_order,
  };
}

const bySort = <T extends { sortOrder: number }>(a: T, b: T) =>
  a.sortOrder - b.sortOrder;

function mapActivity(a: ActivityRow): Activity {
  return {
    id: a.id,
    title: a.title,
    description: a.description,
    isHighlight: a.is_highlight,
    sortOrder: a.sort_order,
    photos: (a.photos ?? []).map(mapPhoto).sort(bySort),
  };
}

function mapStop(s: StopRow): Stop {
  return {
    id: s.id,
    slug: s.slug,
    city: s.city,
    country: s.country,
    lat: s.lat,
    lng: s.lng,
    order: s.order,
    nights: s.nights,
    dateFrom: s.date_from,
    dateTo: s.date_to,
    summary: s.summary,
    activities: (s.activities ?? []).map(mapActivity).sort(bySort),
  };
}

function mapTrip(r: Row): Trip {
  // The trip cover is the trip-level photo with the lowest sort order, if any.
  const cover = (r.photos ?? []).map(mapPhoto).sort(bySort)[0] ?? null;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle,
    summary: r.summary,
    tourOperator: r.tour_operator,
    startDate: r.start_date,
    endDate: r.end_date,
    coverPhoto: cover,
    stops: (r.stops ?? []).map(mapStop).sort((a, b) => a.order - b.order),
  };
}

export async function getTrips(): Promise<Trip[]> {
  const supabase = getSupabase();
  if (!supabase) return sampleTrips;

  const { data, error } = await supabase
    .from("trips")
    .select(TRIP_SELECT)
    .eq("published", true)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("[trips] getTrips failed, using sample data:", error.message);
    return sampleTrips;
  }
  return (data as Row[]).map(mapTrip);
}

export async function getTrip(slug: string): Promise<Trip | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return sampleTrips.find((t) => t.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("trips")
    .select(TRIP_SELECT)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    console.error("[trips] getTrip failed, using sample data:", error.message);
    return sampleTrips.find((t) => t.slug === slug) ?? null;
  }
  return data ? mapTrip(data as Row) : null;
}

export { isSupabaseConfigured };
