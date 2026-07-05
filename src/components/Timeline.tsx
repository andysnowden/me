import PhotoGallery from "@/components/PhotoGallery";
import { formatDateRange, nightsLabel } from "@/lib/format";
import type { Stop } from "@/lib/types";

export default function Timeline({ stops }: { stops: Stop[] }) {
  return (
    <ol className="relative">
      {stops.map((stop, i) => (
        <StopBlock key={stop.id} stop={stop} isLast={i === stops.length - 1} />
      ))}
    </ol>
  );
}

function StopBlock({ stop, isLast }: { stop: Stop; isLast: boolean }) {
  const dates = formatDateRange(stop.dateFrom, stop.dateTo);
  const nights = nightsLabel(stop.nights);

  return (
    <li id={stop.slug} className="relative scroll-mt-24 pb-12 pl-12 last:pb-0">
      {/* Rail */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[13px] top-8 bottom-0 w-px bg-line"
        />
      )}
      {/* Numbered node (matches the map markers) */}
      <span
        aria-hidden
        className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-accent text-[13px] font-semibold text-white shadow"
      >
        {stop.order}
      </span>

      <header className="mb-3">
        <h3 className="font-display text-2xl font-semibold leading-tight">
          {stop.city}
          <span className="text-muted">, {stop.country}</span>
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {dates && <span>{dates}</span>}
          {dates && nights && <span aria-hidden>·</span>}
          {nights && <span>{nights}</span>}
        </p>
        {stop.summary && (
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/80">
            {stop.summary}
          </p>
        )}
      </header>

      {stop.activities.length > 0 && (
        <div className="mt-5 space-y-6">
          {stop.activities.map((activity) => (
            <div key={activity.id}>
              <div className="flex items-baseline gap-2">
                <h4 className="font-medium">
                  {activity.title}
                </h4>
                {activity.isHighlight && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent">
                    Highlight
                  </span>
                )}
              </div>
              {activity.description && (
                <p className="mt-1 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-muted">
                  {activity.description}
                </p>
              )}
              {activity.photos.length > 0 && (
                <div className="mt-3">
                  <PhotoGallery photos={activity.photos} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
