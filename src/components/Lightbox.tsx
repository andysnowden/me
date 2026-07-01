"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { photoUrl } from "@/lib/supabase";
import type { Photo } from "@/lib/types";

/**
 * Full-screen photo viewer. Operates on a list of photos that all have images
 * (the gallery filters out placeholders before opening). The image and its
 * caption are stacked in a column so the caption never overlaps the photo.
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
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
    >
      {/* Top bar: counter + close */}
      <div className="flex shrink-0 items-center justify-between px-4 py-3">
        <span className="text-sm text-white/60">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Image area (grows to fill remaining space) */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
        {count > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
          >
            ‹
          </button>
        )}

        <div
          className="relative h-full w-full max-w-5xl"
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
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
          >
            ›
          </button>
        )}
      </div>

      {/* Caption below the image (never overlaps it) */}
      {photo.caption && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 px-6 pb-6 pt-3"
        >
          <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-white/85">
            {photo.caption}
          </p>
        </div>
      )}
    </div>
  );
}
