import Link from "next/link";
import type { Metadata } from "next";
import PhotoSlot from "@/components/PhotoSlot";
import { getTrips } from "@/lib/trips";
import { formatDateRange } from "@/lib/format";

export const metadata: Metadata = {
  title: "Travel",
  description: "Trips and journeys, mapped out and told stop by stop.",
};

// ISR: refresh from Supabase at most once a minute so new content/photos
// appear without a redeploy.
export const revalidate = 60;

export default async function VacationsPage() {
  const trips = await getTrips();

  return (
    <section className="mx-auto max-w-5xl px-5 py-14">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Travel
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Trips &amp; journeys
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Mapped out and told stop by stop, the places, the days, the photos.
        </p>
      </header>

      {trips.length === 0 ? (
        <p className="mt-12 text-muted">No trips published yet. Check back soon.</p>
      ) : (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {trips.map((trip) => {
            const dates = formatDateRange(trip.startDate, trip.endDate);
            const cover =
              trip.coverPhoto ?? {
                id: `${trip.id}-cover`,
                src: null,
                caption: null,
                sortOrder: 0,
              };
            return (
              <li key={trip.id}>
                <Link href={`/vacations/${trip.slug}`} className="group block">
                  <PhotoSlot
                    photo={cover}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />
                  <div className="mt-4">
                    {dates && (
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">
                        {dates}
                      </p>
                    )}
                    <h2 className="mt-1 font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-accent">
                      {trip.title}
                    </h2>
                    {trip.subtitle && (
                      <p className="mt-1 text-muted">{trip.subtitle}</p>
                    )}
                    <p className="mt-3 text-sm text-muted">
                      {trip.stops.length} stop{trip.stops.length === 1 ? "" : "s"}
                      {trip.tourOperator && ` · with ${trip.tourOperator}`}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
