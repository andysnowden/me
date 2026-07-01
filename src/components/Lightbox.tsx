"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { photoUrl } from "@/lib/supabase";
import type { Photo } from "@/lib/types";

/**
 * Full-screen photo viewer. Operates on a list of photos that all have images
 * (the gallery filters out placeholders before opening).
 */
export default function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const count = photos.length;
  const go = useCallback(
    (delta: number) => onNavigate((index + delta + count) % count),
    [index, count, onNavigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll while open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, go]);

  const photo = photos[index];
  const url = photoUrl(photo.src);
  if (!url) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      <div className="absolute left-4 top-4 text-sm text-white/60">
        {index + 1} / {count}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        ✕
      </button>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label="Previous photo"
          className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full text-3xl text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
        >
          ‹
        </button>
      )}

      {/* Image — clicking it should not close the viewer. */}
      <div
        className="relative h-[85vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={url}
          alt={photo.caption ?? ""}
          fill
          sizes="90vw"
          quality={90}
          priority
          className="object-contain"
        />
      </div>

      {count > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label="Next photo"
          className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full text-3xl text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
        >
          ›
        </button>
      )}

      {photo.caption && (
        <div className="absolute bottom-5 left-1/2 max-w-[90vw] -translate-x-1/2 text-center text-sm text-white/80">
          {photo.caption}
        </div>
      )}
    </div>
  );
}
