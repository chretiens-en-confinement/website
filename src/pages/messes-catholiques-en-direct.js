import * as React from "react"
import { graphql } from "gatsby"
import groupBy from "lodash/fp/groupBy"
import join from "lodash/fp/join"
import sortBy from "lodash/fp/sortBy"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContributeMessage from "../components/ContributeMessage"

const WEEKDAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]

const Masses = ({ masses }) => {
  return sortBy("nom")(masses).map(m => {
    return (
      <tr>
        <td>
          {m.nom}
          {m.communaute && (
            <>
              <br />
              <em>{m.communaute}</em>
            </>
          )}
          {m.forme === "Extraordinaire" && (
            <>
              <br />
              <em>Forme extraordinaire</em>
            </>
          )}
        </td>
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
          {m.youtube && (
            <a
              href={m.youtube}
              target="_blank"
              style={{ marginRight: 6 }}
              rel="noopener noreferrer"
            >
              Youtube
            </a>
          )}
          {m.facebook && (
            <a
              href={m.facebook}
              target="_blank"
              style={{ marginRight: 6 }}
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          )}
          {m.site && (
            <a href={m.site} target="_blank" rel="noopener noreferrer">
              Site
            </a>
          )}
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
      <ContributeMessage />
      <h2>Messes</h2>
      <p>
        Pour bien suivre la messe (notamment avec des enfants), consultez la{" "}
        <a href="/">page d'accueil</a>.
      </p>
      <p>
        Nous remercions tout particulièrement le groupe Messes en direct pour la
        mise à disposition des horaires des messes.
      </p>
      <table class="table">
        <RowHeader />
        <tbody>
          {Object.entries(groupBy("groupe")(messes)).map(([groupe, masses]) => {
            return (
              <>
                <tr>
                  {!!groupe && (
                    <td colspan="4">
                      <h3>{groupe}</h3>
                    </td>
                  )}
                </tr>
                <Masses masses={masses} />
              </>
            )
          })}
        </tbody>
      </table>
      <h2>Autres listes</h2>
      <p>Vous trouverez d'autres listes ici :</p>
      <ul>
        <li>
          <a href="https://messes.info/">Messes Info</a> qui propose une
          recherche spéciale pour la{" "}
          <a href="https://messes.info/horaires/semaineste">Semaine Sainte</a>{" "}
          ainsi que les horaires d’offices de la liturgie des heures retransmis
          en direct.
        </li>
        <li>
          <a href="http://bougetoneglise.fr/recherche/live/">
            Bouge ton Église
          </a>
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allDataYaml {
      nodes {
        messes {
          groupe
          nom
          communaute
          forme
          lundi
          mardi
          mercredi
          jeudi
          vendredi
          samedi
          dimanche
          youtube
          facebook
          site
        }
      }
    }
  }
`
