"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import PhotoSlot from "@/components/PhotoSlot";
import { photoUrl } from "@/lib/supabase";
import type { Photo } from "@/lib/types";

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  // Only photos with an actual image are clickable / navigable in the lightbox.
  const viewable = photos.filter((p) => photoUrl(p.src));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((p) => {
          const url = photoUrl(p.src);
          if (!url) return <PhotoSlot key={p.id} photo={p} />;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() =>
                setOpenIndex(viewable.findIndex((v) => v.id === p.id))
              }
              aria-label={p.caption ? `View: ${p.caption}` : "View photo"}
              className="group relative aspect-4/3 w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-accent-soft"
            >
              <Image
                src={url}
                alt={p.caption ?? ""}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              {p.caption && (
                <span
                  aria-hidden
                  title="Has a note — click to read"
                  className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-xs font-semibold text-white/90 backdrop-blur-sm"
                >
                  i
                </span>
              )}
            </button>
          );
        })}
      </div>

      {openIndex !== null && openIndex >= 0 && (
        <Lightbox
          photos={viewable}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
