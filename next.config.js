/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Dev Mode with additional rerender
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
