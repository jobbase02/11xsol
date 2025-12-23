import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.elevenxsolutions.com', // <--- ADDED THIS
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
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
