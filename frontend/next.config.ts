import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
  // Correct way to disable source maps:
  productionBrowserSourceMaps: false, // Disables source maps for production browser bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Optional: remove console logs in production
  },
  // Remove the experimental.disableSourceMaps entirely
};

export default nextConfig;