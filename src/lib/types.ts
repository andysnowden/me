// Domain types for the site. These mirror the Supabase schema in
// supabase/migrations, but the app can also render from local sample data
// (src/data) when the database isn't configured yet.

export type Photo = {
  id: string;
  /** Storage path within the `trip-photos` bucket, or an absolute URL. */
  src: string | null;
  /**
   * Optional playable video (storage path or URL). When set, `src` is the
   * poster still and the lightbox plays this file instead of showing an image.
   */
  videoSrc?: string | null;
  caption: string | null;
  /** Optional intrinsic dimensions, used to reserve layout space. */
  width?: number | null;
  height?: number | null;
  sortOrder: number;
};

export type Activity = {
  id: string;
  title: string;
  description: string | null;
  /** Marks a standout activity (e.g. a memorable day trip). */
  isHighlight: boolean;
  sortOrder: number;
  photos: Photo[];
};

export type Stop = {
  id: string;
  slug: string;
  city: string;
  country: string;
  /** City-level coordinates used for the route map. */
  lat: number;
  lng: number;
  /** 1-based order along the route. */
  order: number;
  nights: number | null;
  dateFrom: string | null; // ISO date
  dateTo: string | null; // ISO date
  summary: string | null;
  activities: Activity[];
};

export type Trip = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string | null;
  /** Guided tour operator, if any (e.g. "Globus"). Stated factually, not as a review. */
  tourOperator: string | null;
  startDate: string | null; // ISO date
  endDate: string | null; // ISO date
  coverPhoto: Photo | null;
  stops: Stop[];
};
