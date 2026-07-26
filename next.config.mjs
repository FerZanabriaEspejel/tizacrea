/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "192.168.1.17",
    "172.21.96.1",
    "localhost",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "rokpnqnnedkuuxasmrtp.supabase.co",
      },
    ],
  },
}

export default nextConfig