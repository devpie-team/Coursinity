import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '185.254.96.236',
        port: '1337',
        pathname: '/uploads/**'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
