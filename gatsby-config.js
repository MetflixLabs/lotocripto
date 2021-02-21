require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: `LotoCripto`,
    description: `Minere e concorra!`,
    author: `@MetflixLabs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `LotoCripto`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icons/lotoCripto.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`roboto`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `UA-161435848-2`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn:
          'https://c835e643a7a449f7aff221a0f496fae6@o527851.ingest.sentry.io/5644649',
        sampleRate: 0.7,
        tracesSampleRate: 0.7,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  developMiddleware: app => {
    app.use(
      createProxyMiddleware('/api', {
        target: 'http://localhost:3333',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      }),
      createProxyMiddleware('/ws', {
        target: 'http://localhost:4000',
        ws: true,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      })
    );
  },
};
