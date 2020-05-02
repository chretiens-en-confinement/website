import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DefaultPageLayout = ({ children, pageContext }) => {
  return (
    <Layout>
      <SEO title={pageContext.frontmatter.description} />
      {children}
    </Layout>
  )
}

export default DefaultPageLayout
