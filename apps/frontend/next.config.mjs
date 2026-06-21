/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mahjozly/shared'],
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
