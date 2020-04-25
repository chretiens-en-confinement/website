import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContributeMessage from "../components/ContributeMessage"

const IndexPage = ({ data }) => {
  const { markdownRemark, currentBuildDate } = data
  const { html, tableOfContents } = markdownRemark

  return (
    <Layout>
      <SEO title="Chrétiens en confinement : une liste collaborative pour vivre le confinement autrement !" />
      <h1>
        Les ressources utiles du web pour vivre le confinement chrétiennement !
      </h1>

      <p>
        Grâce à cette liste, nous vous proposons de vivre le confinement en
        chrétien, c'est-à-dire de chercher à grandir dans notre foi, notre
        espérance et notre charité.
      </p>

      <p>
        Cette liste est nécessairement limitée, nous avons choisi de ne pas être
        exhaustif mais de vous proposer uniquement des contenus de grande
        qualité. Elle est mise à jour en permanence, sa dernière mise à jour a
        eu lieu le {currentBuildDate.currentDate}.
      </p>

      <p>
        Déjà consultée par près de 7 000 personnes, cette liste est faite pour
        être partagée avec votre famille, vos proches, vos paroisses et vos
        diocèses !
      </p>

      <ContributeMessage />

      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: tableOfContents }}
      />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <ContributeMessage />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    currentBuildDate {
      currentDate
    }
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
      tableOfContents(maxDepth: 2, absolute: false)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
