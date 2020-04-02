import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContributeMessage from "../components/ContributeMessage"

const IndexPage = ({ data }) => {
  const { allDataYaml } = data
  const messes = allDataYaml.nodes[0].messes

  return (
    <Layout>
      <SEO title="Messes et offices" />
      <h1>Messes et offices en ligne</h1>
      <ContributeMessage />
      <h2>Messes</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Diocèse</th>
            <th scope="col">Ville</th>
            <th scope="col">Lieu</th>
            <th scope="col">Périodicité</th>
            <th scope="col">Lien</th>
          </tr>
        </thead>
        <tbody>
          {messes.map(m => {
            return (
              <tr>
                <td>{m.diocese}</td>
                <td>{m.ville}</td>
                <td>{m.lieu}</td>
                <td>{m.periodicite}</td>
                <td>
                  <a href={m.lien}>Lien</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allDataYaml {
      nodes {
        messes {
          diocese
          lieu
          ville
          periodicite
          lien
        }
      }
    }
  }
`
