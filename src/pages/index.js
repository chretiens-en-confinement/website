import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { html } = markdownRemark

  return (
    <Layout>
      <SEO title="Home" />
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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
