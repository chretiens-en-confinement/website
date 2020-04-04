import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Email = () => {
  return (
    <a href="mailto:contact@chretiens-en-confinement.org">
      contact@chretiens-en-confinement.org
    </a>
  )
}

const Github = () => {
  return (
    <a href="https://github.com/chretiens-en-confinement/website">
      chretiens-en-confinement
    </a>
  )
}

const ContributePage = () => {
  return (
    <Layout>
      <SEO title="Comment contribuer" />
      <h1>Comment contribuer ?</h1>
      <h2>Pour ajouter une messe</h2>
      <p>
        <strong>Notre solution préférée</strong> : sur notre Github <Github />.
      </p>
      <h2>Pour ajouter un contenu</h2>
      <p>
        Le principe de notre approche est de proposer une liste non-exhaustive
        de contenus de qualité. Par conséquent, nous devons faire des choix (que
        nous espérons aussi objectifs que possible) et ne pourrons inclure tous
        les contenus qui nous sont proposés. Nous voulons en effet que les
        utilisateurs de ces pages ne perdent pas de temps à trier les contenus.
      </p>
      <p>
        <strong>Notre solution préférée</strong> : allez sur notre Github{" "}
        <Github />. Ouvrez une pull request avec votre ajout dans le fichier{" "}
        <code>src/markdown-pages/index.md</code>.
      </p>
      <p>
        Autre solution : par email sur <Email />. Nous recevons de nombreuses
        demandes et serons un peu plus lent à vous répondre.{" "}
      </p>
    </Layout>
  )
}

export default ContributePage
