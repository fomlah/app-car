import type { NextConfig } from "next";

const nextConfig = {
  output: process.env.NEXT_OUTPUT_EXPORT === '1' ? 'export' : undefined,
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
