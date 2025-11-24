import './src/env.mjs';
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
      /* vzrcy5vcsuuocnf3.public.blob.vercel-storage.com */
      {
        protocol: 'https',
        hostname: 'vzrcy5vcsuuocnf3.public.blob.vercel-storage.com',
      },
      /* doingdoit.vercel.app */
      {
        protocol: 'https',
        hostname: 'doingdoit.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn0.iconfinder.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 't0gqytzvlsa2lapo.public.blob.vercel-storage.com',
      },
    ],
  },
  reactStrictMode: false,

  // Optimize for Vercel deployment
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },

  // Suppress Webpack deprecation warnings
  webpack: (config, { dev, isServer }) => {
    // Suppress Module.updateHash deprecation warnings
    config.infrastructureLogging = {
      level: 'error',
    };
    
    // Optimize for memory usage
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              maxSize: 244000,
            },
          },
        },
      };
    }
    
    // Additional webpack config
    if (!dev && !isServer) {
      // Optimize for production
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    
    return config;
  },

  // time zone for korea time
  env: {
    TZ: 'Asia/Seoul',
  },

};

export default nextConfig;
