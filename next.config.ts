import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.elevenxsolutions.com', // <--- ADDED THIS
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Keep this for fallbacks
      },
    ],
  },
  // removed experimental.appDir to satisfy types
};

export default nextConfig;
