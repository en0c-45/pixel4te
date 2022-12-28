/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flowbite.com", "ipfs.io"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
