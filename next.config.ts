import type { NextConfig } from "next";

/**
 * Photography lives in Supabase Storage rather than in the repository, so the
 * image optimiser has to be told that host is allowed. Derived from the same
 * environment variable the app uses, so pointing at a different Supabase
 * project needs no change here.
 */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
