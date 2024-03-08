/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/conversation",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
