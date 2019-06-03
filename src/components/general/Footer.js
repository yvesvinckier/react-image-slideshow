import React from 'react'
import styled from 'styled-components'

const FooterOuter = styled.footer`
  position: relative;
  background: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  color: #000;
  z-index: 2;
  width: 100%;
  height: 100vh;
`

const FooterWrapper = styled.div`
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

const FooterInfoWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 100px;
`

const FooterEmail = styled.div`
  width: 100%;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: 0 1 33%;
  }
  h4 {
    font-weight: 300;
    color: #7f7f7f;
    line-height: 1.8;
    font-size: 1rem;
  }
  a {
    position: relative;
    margin-top: 10px;
    display: inline-block;
    font-size: 1.25rem;
    line-height: 1.8;
    text-decoration: none;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.02em;
      min-height: 1px;
      background: ${props => props.theme.colors.base};
      transform-origin: right;
      transform: scaleX(1) translateZ(0);
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.02em;
      min-height: 1px;
      background: ${props => props.theme.colors.base};
      transform-origin: left;
      transform: scaleX(0) translateZ(0);
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
    }
    &:hover::before {
      transform: scaleX(0) translateZ(0);
    }
    &:hover::after {
      transform: scaleX(1) translateZ(0);
    }
  }
`
const FooterSocial = styled.div`
  width: 100%;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: 0 1 33%;
  }
  li {
    margin-bottom: 4px;
    a {
      line-height: 1.8;
      font-size: 1rem;
      display: inline;
      position: relative;
      text-decoration: none;
      cursor: pointer;
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.02em;
        min-height: 1px;
        background: ${props => props.theme.colors.base};
        transform-origin: right;
        transform: scaleX(1) translateZ(0);
        transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.02em;
        min-height: 1px;
        background: ${props => props.theme.colors.base};
        transform-origin: left;
        transform: scaleX(0) translateZ(0);
        transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
      }
      &:hover::before {
        transform: scaleX(0) translateZ(0);
      }
      &:hover::after {
        transform: scaleX(1) translateZ(0);
      }
    }
  }
`

const Footer = () => (
  <FooterOuter>
    <FooterWrapper>
      <h3>
        Don't be shy,
        <br />
        <a href="mailto:blah@blah.com">
          <strong>say hello.</strong>
        </a>
      </h3>
      <FooterInfoWrapper>
        <FooterEmail>
          <h4>Start a conversation</h4>
          <a href="mailto:hello@blowup.design">
            <strong>Hello@blowup.design</strong>
          </a>
        </FooterEmail>
        <FooterSocial>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/jeanemmanuelrode/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/jeanemmanuelrode/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/jeanemmanuelrode/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </FooterSocial>
      </FooterInfoWrapper>
    </FooterWrapper>
  </FooterOuter>
)

export default Footer
