import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 95],
  },
  allowedDevOrigins: ["192.168.1.13", "localhost", "127.0.0.1"],
};

export default nextConfig;
