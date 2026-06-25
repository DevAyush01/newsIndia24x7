/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newsindia24x7.tv",
      },
      {
        protocol: "https",
        hostname: "www.newsindia24x7.tv",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },


 async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'https://newsindia24x7.tv/graphql',
      },
    ];
  },
};

export default nextConfig;