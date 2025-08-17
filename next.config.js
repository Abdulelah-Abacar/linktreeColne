/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.googleusercontent.com",
      },
      {
        hostname: "linklist-files.s3.amazonaws.com",
      },
      {
        hostname: "cobyosxitq3rome6.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
