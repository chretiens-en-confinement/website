const siteName = "Chrétiens en confinement"

module.exports = {
  siteMetadata: {
    title: siteName,
    description: `Une liste collaborative de qualité pour vivre le confinement en chrétiens.`,
    author: `@charlax`,
    siteUrl: "https://www.chretiens-en-confinement.org",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        name: siteName,
        short_name: `CeC`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true,
        formatting: {
          format: "dddd D MMMM YYYY à HH:mm",
          utc: false,
        },
        locale: "fr",
      },
    },
    "gatsby-plugin-theme-ui",
  ],
}
