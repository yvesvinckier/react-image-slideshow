import React from 'react'
import styled from 'styled-components'

const FooterOuter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  display: flex;
  align-items: center;
  color: #000;
  z-index: 1;
  width: 100%;
  height: 100vh;
`

const FooterWrapper = styled.div`
  position: relative;
  width: 76.19047619047619%;
  margin-left: 11.904761904761905%;
  h3 {
    font-size: 4.3vw;
    margin: 0;
    font-weight: 300;
    line-height: 1;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: #000;
  }
  strong {
    font-weight: 500;
  }
`

const Footer = () => (
  <FooterOuter>
    <FooterWrapper>
      <h3>
        Don't be shy,
        <br />
        <a href="mailto:blah@blah.com">
          <strong>say hi.</strong>
        </a>
      </h3>
    </FooterWrapper>
  </FooterOuter>
)

export default Footer
