/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://joshspot-landing-backend-production.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
