import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
  // productionBrowserSourceMaps: false, // Disables source maps for production browser bundles
  devIndicators: {
    buildActivity: false,
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: process.env.NODE_ENV === 'production', // Optional: remove console logs in production
  }
};

export default nextConfig;