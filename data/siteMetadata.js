const siteMetadata = {
  title: 'Fish Inventory',
  author: 'Shawn Mallon',
  headerTitle: 'Fish Inventory',
  description:
    'This system will track individual fish data over time, including measurements, locations, and other relevant details.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://fish-inventory.vercel.app/',
  siteRepo: 'https://github.com/lokisk1155/fish-inventory',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  github: 'https://github.com/lokisk1155',
  linkedin: 'https://www.linkedin.com/in/shawn-mallon/',
  locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
}

module.exports = siteMetadata
