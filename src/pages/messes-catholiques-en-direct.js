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
              {m.communaute}
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
      <ContributeMessage />
      <h2>Bien suivre la messe</h2>
      <p>
        <a href="/">Consultez notre liste collaborative.</a>
      </p>
      <h2>Autres listes</h2>
      <p>Vous trouverez d'autres listes ici :</p>
      <ul>
        <li>
          Voir la liste sur KTO :{" "}
          <a href="https://www.ktotv.com/page/quelles-sont-les-paroisses-qui-diffusent-la-messe-dominicale-en-video">
            Où suivre la messe en direct sur Internet ?
          </a>
          .
        </li>
        <li>
          Retrouvez également une liste probablement exhaustive des messes sur
          Internet grâce au groupe Facebook{" "}
          <a href="https://www.facebook.com/Messe-en-direct-108221737482184/">
            Messes en direct
          </a>
        </li>{" "}
      </ul>
      <h2>Messes</h2>
      <p>
        ⚠️ Cette liste est en construction. Nous travaillons avec le groupe
        messes en direct pour l'améliorer et faciliter l'ajout de messes. ⚠️
      </p>
      <p>
        Nous remercions tout particulièrement le groupe{" "}
        <a href="https://docs.google.com/spreadsheets/d/1EDgu6afQ3aq7Bh8l1hAvQlQE3DIVTO2e20yDIOWuxlE/edit#gid=1308810296">
          Messes en direct
        </a>
        pour la mise à disposition des horaires des messes.
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
