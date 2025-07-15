import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Recommended approach for Next.js 12+
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**', // Allows all paths under this domain
      },
    ],
  },
  // Other Next.js configuration options can go here
};

export default nextConfig;