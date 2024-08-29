import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
