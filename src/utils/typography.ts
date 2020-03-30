import Typography from "typography"
import theme from "typography-theme-fairy-gates"

const typography = new Typography(theme)

const color = `#1ca086`

// Export helper functions
export const { scale, rhythm, options } = typography
export { color }
export default typography
