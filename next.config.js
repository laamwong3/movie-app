/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org", "www.movienewz.com"],
  },
};

module.exports = nextConfig;
