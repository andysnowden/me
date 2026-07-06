import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; a stray lockfile in the home dir confuses inference.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Trip photos are uploaded once and never change, so cache each optimized
    // variant for 31 days instead of Next's 4-hour default. This is the biggest
    // lever against repeat CDN transformations: without it, every variant
    // expires every 4 hours and the next request re-generates (and re-bills) it.
    minimumCacheTTL: 2678400, // 31 days
    // One format = one transformation per size. This is also Next's default;
    // pinned so it can't silently gain AVIF and double the transformation count.
    formats: ["image/webp"],
    // Lock the quality allowlist to exactly the two values the app uses (75 for
    // galleries/slots, 90 for the lightbox) so no other quality variants get
    // generated. No visual change from today.
    qualities: [75, 90],
    // scripts/upload-photos.mjs caps sources at a 2560px long edge, so 3840 is
    // wasted. Trim the width ladder to the breakpoints this layout renders
    // (100/50/33vw grids, 90vw lightbox) to cut distinct transforms per photo.
    deviceSizes: [640, 828, 1080, 1920, 2560],
    imageSizes: [256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bpanebopdbmpxiguynnb.supabase.co",
        // Only optimize our photo bucket, not any public storage object.
        pathname: "/storage/v1/object/public/trip-photos/**",
      },
    ],
  },
};

export default nextConfig;
