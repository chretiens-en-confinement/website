import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const { markdownRemark } = data
  const { html, tableOfContents } = markdownRemark

  return (
    <Layout>
      <SEO title="Chrétiens en confinement : une liste collaborative pour vivre le confinement autrement !" />
      <h1>
        Les meilleurs ressources du web pour vivre le confinement chrétiennement
        !
      </h1>

      <p>
        Grâce à cette liste, nous vous proposons de vivre le confinement en
        chrétien, c'est-à-dire de chercher à grandir dans notre foi, notre
        espérance et notre charité.
      </p>

      <p>
        Cette liste est nécessairement limitée, nous avons choisi de ne pas être
        exhaustif mais de vous proposer uniquement des contenus de grande
        qualité.
      </p>

      <p>
        Cette liste est collaborative, n'hésitez pas à nous contacter pour
        ajouter vos idées :{" "}
        <a href="mailto:contact@chretiens-en-confinement.org">
          contact@chretiens-en-confinement.org
        </a>
        .
      </p>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: tableOfContents }}
      />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
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
