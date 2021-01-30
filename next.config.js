module.exports = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [16, 24, 32, 64],
    domains: ['s4.anilist.co'],
    path: '/_next/image',
    loader: 'default',
  },
  async redirects() {
    return [
      {
        source: '/api/auth/signin', // disable next-auth page
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/fonts/:file',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
