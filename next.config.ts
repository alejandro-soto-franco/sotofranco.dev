import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep your existing experimental flags if needed; MDX has been disabled.
  pageExtensions: ['ts', 'tsx'],
};

export default nextConfig;
