/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Use standalone output to avoid middleware issues during build
  output: 'standalone',
  // Optimize for development
  experimental: {
    optimizePackageImports: ['@radix-ui'],
  },
}

export default nextConfig
