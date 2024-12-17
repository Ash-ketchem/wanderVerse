/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "img.freepik.com"], // Add the domain here
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores all ESLint warnings during builds
  },
};

export default nextConfig;
