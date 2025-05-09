/** @type {import('next').NextConfig} */
const nextConfig = {
  
  async redirects() {
    return [
      {
        source: '/heaps',
        destination: '/',
        permanent: true
      },   
      {
        source: '/nooks',
        destination: '/',
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [{
      hostname: 'cdn.sanity.io'
    }]
  }
}

module.exports = nextConfig
