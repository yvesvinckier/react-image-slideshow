import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Header = styled.div`
  z-index: 12;
  position: fixed;
  width: 100%;
  h2 {
    font-weight: 500;
    font-size: 16px;
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

const AllWorks = styled.div`
  z-index: 20;
  top: calc(7vw - 6px);
  right: calc(7vw - 6px);
  font-weight: 400;
  font-size: 13px;
  position: absolute;
  cursor: pointer;
  line-height: 0;
  padding: 14px 6px 14px 6px;
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
  span {
    padding-right: 30px;
  }
`
const VerticalPlus = styled.div`
  position: absolute;
  width: 2px;
  height: 10px;
  background: #fff;
  top: 8px;
  right: 11px;
  transform-origin: 0 50%;
`

const HorizontalPlus = styled.div`
  position: absolute;
  width: 10px;
  height: 2px;
  background: #fff;
  top: 12px;
  right: 7px;
  transform-origin: 100 % 0;
`

const WhiteHeader = () => (
  <Header>
    <h2>
      <Link to="/">YVNK.AD</Link>
    </h2>
    <AllWorks>
      <span>
        <Link to="/">All Works</Link>
      </span>
      <VerticalPlus />
      <HorizontalPlus />
    </AllWorks>
  </Header>
)

export default WhiteHeader
