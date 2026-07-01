import PhotoSlot from "@/components/PhotoSlot";
import type { Photo } from "@/lib/types";

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map((p) => (
        <PhotoSlot key={p.id} photo={p} />
      ))}
    </div>
  );
}
