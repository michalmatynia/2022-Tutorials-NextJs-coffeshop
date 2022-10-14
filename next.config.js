/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // TRUE: Dev Mode runs with additional rerender
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
