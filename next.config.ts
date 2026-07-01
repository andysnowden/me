import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; a stray lockfile in the home dir confuses inference.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bpanebopdbmpxiguynnb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
