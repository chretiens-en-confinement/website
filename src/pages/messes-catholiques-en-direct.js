import * as React from "react"
import { graphql } from "gatsby"
import groupBy from "lodash/fp/groupBy"
import join from "lodash/fp/join"
import sortBy from "lodash/fp/sortBy"
import { Badge, BaseStyles, Styled } from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContributeMessage from "../components/ContributeMessage"

const WEEKDAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]

const HD = () => {
  return <Badge>HQ</Badge>
}

const Masses = ({ masses }) => {
  return sortBy("nom")(masses).map((m) => {
    return (
      <tr key={m.id}>
        <td>
          {m.nom} {m.is_hd && <HD />}
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
      <BaseStyles>
        <SEO title="Messes et offices" />
        <h1>Messes et offices en ligne</h1>
        <ContributeMessage />
        <p>
          Pour bien suivre la messe (notamment avec des enfants), consultez la{" "}
          <a href="/">page d'accueil</a>.
        </p>
        <h3>
          Haute qualité <HD />
        </h3>
        <p>
          Nous avons créé un indicateur pour les messes filmées en « haute
          qualité », pour lesquelles nous avons créé trois critères :
          l'enregistrement en haute définition, le son continu et de très bonne
          qualité, le changement de prise de vue pendant la messe.
        </p>
        <h2>Liste des messes</h2>
        <table>
          <RowHeader />
          <tbody>
            {Object.entries(groupBy("groupe")(messes)).map(
              ([groupe, masses]) => {
                return (
                  <React.Fragment key={groupe}>
                    <tr>
                      {!!groupe && (
                        <td colSpan="4">
                          <h3>{groupe}</h3>
                        </td>
                      )}
                    </tr>
                    <Masses masses={masses} />
                  </React.Fragment>
                )
              }
            )}
          </tbody>
        </table>
        <h2>Autres listes</h2>
        <p>Vous trouverez d'autres listes ici :</p>
        <ul>
          <li>
            <a href="https://messes.info/">Messes Info</a> qui propose une
            recherche spéciale pour la{" "}
            <a href="https://messes.info/horaires/semaineste">Semaine Sainte</a>{" "}
            ainsi que les horaires d’offices de la liturgie des heures
            retransmis en direct.
          </li>
          <li>
            <a href="http://bougetoneglise.fr/recherche/live/">
              Bouge ton Église
            </a>
          </li>
        </ul>
        <p>
          Nous remercions tout particulièrement le groupe Messes en direct pour
          la mise à disposition initiale des horaires des messes.
        </p>
      </BaseStyles>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allDataYaml {
      nodes {
        messes {
          id
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
          is_hd
        }
      }
    }
  }
`
