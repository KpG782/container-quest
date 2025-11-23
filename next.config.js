/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Optimize for production
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
