import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import RouteMap from "@/components/RouteMap";
import Timeline from "@/components/Timeline";
import { getTrip, getTrips } from "@/lib/trips";
import { formatDateRange } from "@/lib/format";

// ISR: refresh from Supabase at most once a minute so new content/photos
// appear without a redeploy.
export const revalidate = 60;

export async function generateStaticParams() {
  const trips = await getTrips();
  return trips.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) return { title: "Trip not found" };
  return {
    title: trip.title,
    description: trip.summary ?? trip.subtitle ?? undefined,
  };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) notFound();

  const dates = formatDateRange(trip.startDate, trip.endDate);
  const mapStops = trip.stops.map((s) => ({
    id: s.id,
    city: s.city,
    country: s.country,
    lat: s.lat,
    lng: s.lng,
    order: s.order,
  }));

  return (
    <article>
      {/* Hero */}
      <header className="border-b border-line bg-ink-950 text-white">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <Link
            href="/vacations"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            ← All travels
          </Link>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {trip.title}
          </h1>
          {trip.subtitle && (
            <p className="mt-4 max-w-2xl text-lg text-white/70">{trip.subtitle}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
            {dates && <span>{dates}</span>}
            {dates && <span aria-hidden>·</span>}
            <span>
              {trip.stops.length} stop{trip.stops.length === 1 ? "" : "s"}
            </span>
            {trip.tourOperator && (
              <>
                <span aria-hidden>·</span>
                <span>Guided tour with {trip.tourOperator}</span>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5">
        {trip.summary && (
          <p className="max-w-2xl py-10 text-lg leading-relaxed text-ink/80">
            {trip.summary}
          </p>
        )}

        {/* Route map */}
        {mapStops.length > 0 && (
          <section className="overflow-hidden rounded-2xl border border-line shadow-sm">
            <RouteMap stops={mapStops} />
          </section>
        )}

        {/* Stop quick-nav */}
        {trip.stops.length > 0 && (
          <nav className="mt-6 flex flex-wrap gap-2">
            {trip.stops.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink/80 transition-colors hover:border-accent hover:text-accent"
              >
                <span className="text-muted">{s.order}.</span> {s.city}
              </a>
            ))}
          </nav>
        )}

        {/* Timeline */}
        <section className="py-14">
          <Timeline stops={trip.stops} />
        </section>
      </div>
    </article>
  );
}
