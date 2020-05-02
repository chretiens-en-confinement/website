import { toTheme } from "@theme-ui/typography"
import typographyTheme from "typography-theme-fairy-gates"
import merge from "deepmerge"

const color = `#1ca086`

const theme = merge(toTheme(typographyTheme), {
  colors: {
    text: "#000",
    background: "#fff",
    primary: color,
  },
})

export default theme
