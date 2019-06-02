import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../../styles/global'
import theme from '../../styles/theme'

import Nav from '../general/Nav'
import Footer from './Footer'

class Layout extends React.Component {
  render() {
    const children = this.props.children
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Helmet>
            <html lang="fr" />
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Helmet>
          <Nav />
          <section role="main">
            {children}
            <Footer />
          </section>
          <GlobalStyle />
        </div>
      </ThemeProvider>
    )
  }
}

export default Layout
