import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color_mode: "dark" | "light"
  }
}
