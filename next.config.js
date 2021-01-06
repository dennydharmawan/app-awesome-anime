// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: 'empty',
//         cheerio: 'empty',
//         got: 'empty',
//       };
//     }

//     return config;
//   },
// };

module.exports = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [16, 24, 32, 64],
    domains: ['s4.anilist.co'],
    path: '/_next/image',
    loader: 'default',
  },
};
