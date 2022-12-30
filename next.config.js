/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "imagedelivery.net",
      "customer-yq2roy9h6pwmuhnd.cloudflarestream.com",
    ],
  },
  env: {
    NEXT_PUBLIC_CLOUDFLARE_CLIENT_ID: process.env.CLOUDFLARE_CLIENT_ID,
    NEXT_PUBLIC_CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
  },
};

module.exports = nextConfig;
