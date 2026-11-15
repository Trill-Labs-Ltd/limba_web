/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        // Shared-routine links moved from /r/<code> to /shared-routine/<code>.
        // Links already sent keep working in the browser; with the app
        // installed they open it directly (both paths are in the AASA file).
        source: '/r/:code',
        destination: '/shared-routine/:code',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Apple requires the apple-app-site-association file (served without a
        // file extension from /.well-known) to have a JSON content type.
        source: '/.well-known/apple-app-site-association',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
      },
    ]
  },
}

module.exports = nextConfig

