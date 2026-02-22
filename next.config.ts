import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'portfoliomohit.vercel.app',
          },
        ],
        destination: 'https://mohitlakhara.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'portfoliomohitlakhara.vercel.app',
          },
        ],
        destination: 'https://mohitlakhara.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'lakharamohit.vercel.app',
          },
        ],
        destination: 'https://mohitlakhara.vercel.app/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'mohit.vercel.app',
          },
        ],
        destination: 'https://mohitlakhara.vercel.app/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
