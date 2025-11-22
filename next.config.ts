import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spaceship-cdn.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
