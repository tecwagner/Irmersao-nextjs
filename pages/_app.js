import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
//Subistituir pelo db.theme
// const theme = {
//   colors: {
//     primary: '#0070f3',
//   },
// }

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
