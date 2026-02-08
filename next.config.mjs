/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Image formats supported
    formats: ["image/avif", "image/webp"],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Disable static image imports if needed
    // disableStaticImages: false,

    // If you're using external images from CDN
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'your-cdn-domain.com',
    //     port: '',
    //     pathname: '/images/**',
    //   },
    // ],
  },
};

export default nextConfig;
