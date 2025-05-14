/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me'
      },
      {
        protocol: 'https',
        hostname: 'fdn2.gsmarena.com'
      },
      {
        protocol: 'https',
        hostname: 'southeast-asia.pro.infinixmobility.com'
      }

    ]
  }

}

module.exports = nextConfig