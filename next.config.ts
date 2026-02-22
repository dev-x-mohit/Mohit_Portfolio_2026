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
    const alternateDomains = [
      'portfoliomohit.vercel.app',
      'portfolio-mohit.vercel.app',
      'portfoliomohitlakhara.vercel.app',
      'portfolio-mohit-lakhara.vercel.app',
      'lakharamohit.vercel.app',
      'lakhara-mohit.vercel.app',
      'mohit.vercel.app',
      'lakhara.vercel.app',
      'mohit-lakhara.vercel.app',
      'mohitportfolio.vercel.app',
      'mohit-portfolio.vercel.app',
      'mohitlakharaportfolio.vercel.app',
      'mohit-lakhara-portfolio.vercel.app',
      'mlakhara.vercel.app',
      'm-lakhara.vercel.app'
    ];

    return alternateDomains.map(domain => ({
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: domain,
        },
      ],
      destination: 'https://mohitlakhara.vercel.app/:path*',
      permanent: true,
    }));
  },
};

export default nextConfig;
