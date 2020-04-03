import * as React from "react"
import { graphql } from "gatsby"
import groupBy from "lodash/fp/groupBy"
import join from "lodash/fp/join"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContributeMessage from "../components/ContributeMessage"

const WEEKDAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]

const Masses = ({ masses }) => {
  return masses.map(m => {
    return (
      <tr>
        <td>{m.nom}</td>
        <td>{m.dimanche}</td>
        <td>
          {join(", ")(
            WEEKDAYS.reduce((acc, current) => {
              if (!m[current]) {
                return acc
              }
              return [...acc, `${current} ${m[current]}`]
            }, [])
          )}
        </td>
        <td>
          {m.youtube && <a href={m.youtube}>Youtube</a>}&nbsp;
          {m.facebook && <a href={m.facebook}>Facebook</a>}
        </td>
      </tr>
    )
  })
}

const RowHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col" width="30%">
          Nom
        </th>
        <th scope="col">Dimanche</th>
        <th scope="col">Semaine</th>
        <th scope="col">Lien</th>
      </tr>
    </thead>
  )
}

const IndexPage = ({ data }) => {
  const { allDataYaml } = data
  const messes = allDataYaml.nodes[0].messes

  return (
    <Layout>
      <SEO title="Messes et offices" />
      <h1>Messes et offices en ligne</h1>
      <p>
        Nous remercions tout particulièrement le groupe « Messes en direct »
        pour la mise à disposition des horaires des messes.
      </p>
      <ContributeMessage />
      <h2>Messes</h2>
      <table class="table">
        <RowHeader />
        <tbody>
          {Object.entries(groupBy("diocese")(messes)).map(
            ([diocese, masses]) => {
              return (
                <>
                  <tr>
                    <td colspan="4">
                      <h3>Diocèse de {diocese}</h3>
                    </td>
                  </tr>
                  <Masses masses={masses} />
                </>
              )
            }
          )}
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
          nom
          lundi
          mardi
          mercredi
          jeudi
          vendredi
          samedi
          dimanche
          youtube
          facebook
        }
      }
    }
  }
`
