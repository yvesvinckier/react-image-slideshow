import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Header = styled.div`
  z-index: 12;
  position: fixed;
  width: 100%;
  & > a {
    font-weight: 700;
    font-size: 20px;
    position: absolute;
    top: calc(7vw - 6px);
    left: calc(7vw - 7px);
    transform-origin: 100% 0%;
    transform: translateX(-100%) rotate(-90deg);
    padding: 6px;
    z-index: 20;
    &::after {
      content: '';
      width: 3px;
      height: 3px;
      background: #fff;
      border-radius: 100%;
      position: absolute;
      top: calc(100% + 12px);
      left: 7px;
      pointer-events: none;
      opacity: 0;
      transform-origin: 0 100%;
      transform: scaleY(5);
      transition: opacity 0.1s, transform 0.1s;
    }
    &:hover::after {
      opacity: 1;
      transform: scaleY(1);
    }
    & > div {
      overflow: hidden;
      height: 26px;
    }
  }
  h2 {
    font-size: 1rem;
    font-weight: 700;
    position: absolute;
    top: 7vw;
    left: calc(26vw - 6px);
    z-index: 1;
    a {
      padding: 6px;
      position: relative;
      &::after {
        content: '';
        width: 3px;
        height: 3px;
        background: #fff;
        position: absolute;
        top: calc(100% + 12px);
        left: 7px;
        pointer-events: none;
        opacity: 0;
        transform-origin: 0 100%;
        transform: scaleY(5);
        transition: opacity 0.1s, transform 0.1s;
      }
      &:hover::after {
        opacity: 1;
        transform: scaleY(1);
      }
    }
  }
`

const WhiteHeader = () => (
  <Header>
    <h2>
      <Link to="/">blow-up</Link>
    </h2>
  </Header>
)

export default WhiteHeader
