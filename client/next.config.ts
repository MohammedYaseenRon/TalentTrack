import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com",'picsum.photos'], // Allow Cloudinary images
  },
};

export default nextConfig;
