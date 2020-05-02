import { toTheme } from "@theme-ui/typography"
import typographyTheme from "typography-theme-fairy-gates"
import Typography from "typography"
import { merge } from "lodash"

export const color = `#1ca086`

const theme = merge(toTheme(typographyTheme), {
  colors: {
    text: "#000",
    background: "#fff",
    primary: color,
  },
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body",
  },
})

export const typography = new Typography(typographyTheme)
export default theme
