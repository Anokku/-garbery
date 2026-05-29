/** @type {import('next').NextConfig} */
const config = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
}

export default config
