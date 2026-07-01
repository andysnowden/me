import Image from "next/image";
import { photoUrl } from "@/lib/supabase";
import type { Photo } from "@/lib/types";

/**
 * Renders a photo, or a labelled placeholder when the image hasn't been
 * uploaded yet. Placeholders make it obvious where real photos will land.
 */
export default function PhotoSlot({
  photo,
  className = "",
  priority = false,
}: {
  photo: Photo;
  className?: string;
  priority?: boolean;
}) {
  const url = photoUrl(photo.src);

  return (
    <figure
      className={`group relative overflow-hidden rounded-xl border border-line bg-accent-soft ${className}`}
    >
      <div className="relative aspect-4/3 w-full">
        {url ? (
          <Image
            src={url}
            alt={photo.caption ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            priority={priority}
            className="object-cover"
          />
        ) : (
          <Placeholder caption={photo.caption} />
        )}
      </div>
      {photo.caption && photo.caption !== "(placeholder)" && (
        <figcaption className="px-3 py-2 text-xs text-muted">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Placeholder({ caption }: { caption: string | null }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent-soft to-[#f6e4d4] text-accent/70">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span className="text-[11px] font-medium uppercase tracking-wide">
        Photo coming soon
      </span>
    </div>
  );
}
