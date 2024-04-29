/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "encrypted-tbn3.gstatic.com" },
      { protocol: "https", hostname: "media.istockphoto.com" }
    ],
  },
}

module.exports = nextConfig
