/** @type {import('next').NextConfig} */
const config = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: '*.base.ec' },
      { protocol: 'https', hostname: '*.imgix.net' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/contact', destination: 'https://thebase.com/inquiry/garbery-official-ec', permanent: false },
      { source: '/cart', destination: 'https://garbery.official.ec', permanent: false },
    ]
  },
}

export default config
