/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "0050cba.netsolhost.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "filecache.mediaroom.com",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    return {
      ...config,
      optimization: {
        ...config.optimization,
        minimize: false, // Disable minification for clearer error messages
      },
    };
  },
  reactStrictMode: true, // Strict mode enabled
};

export default nextConfig;
