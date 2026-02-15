/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // <- Kita izinin domain ini
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;