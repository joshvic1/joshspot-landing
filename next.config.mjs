const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/:path*"
            : "https://joshspot-landing-backend-production.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
