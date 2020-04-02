import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query Query {
      currentBuildDate {
        currentDate
      }
    }
  `)

  return (
    <footer>
      Dernière mise à jour le {data.currentBuildDate.currentDate} ©{" "}
      {new Date().getFullYear()}
    </footer>
  )
}

export default Footer
