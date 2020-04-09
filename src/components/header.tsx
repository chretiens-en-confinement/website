import { Link } from "gatsby"
import React from "react"

import { color } from "../utils/typography"

const Menu = () => {
  const menuItems = [
    { url: "/", name: "Liste" },
    { url: "/messes-catholiques-en-direct/", name: "Messes en direct" },
    { url: "/comment-contribuer/", name: "Contribuer" },
  ]
  return (
    <div style={{ marginTop: 16 }}>
      {menuItems.map(i => {
        return (
          <span
            style={{
              marginRight: 24,
              color: `white`,
            }}
          >
            <Link
              to={i.url}
              style={{
                textShadow: "none",
                color: `white`,
              }}
              activeStyle={{
                color: `#ccc`,
              }}
            >
              {i.name}
            </Link>
          </span>
        )
      })}
    </div>
  )
}

const Header = ({ siteTitle }) => {
  return (
    <header
      style={{
        background: color,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
              textShadow: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <Menu />
      </div>
    </header>
  )
}

export default Header
