import { toTheme } from "@theme-ui/typography"
import typographyTheme from "typography-theme-fairy-gates"
import Typography from "typography"
import { merge } from "lodash"

export const color = `#1ca086`

const theme = merge(toTheme(typographyTheme), {
  colors: {
    text: "rgba(0, 0, 0, 0.8)",
    background: "#fff",
    primary: color,
  },
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body",
  },
  styles: {
    a: {
      color: "primary",
    },
  },
})

export const typography = new Typography(typographyTheme)
export default theme
