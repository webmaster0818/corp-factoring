import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: '/Users/jiro.hasegawa/.openclaw/workspace/projects/corp-factoring/factoring-site',
  },
};

export default nextConfig;
