import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const ContactContainer = styled.ul`
  li:first-child {
    top: 50vh;
    transform-origin: 50% 0%;
    left: calc(7vw - 30px);
    transform: rotate(-90deg);
    font-weight: 400;
    font-size: 13px;
    position: fixed;
    padding: 6px;
    z-index: 2;
    transition: 0.1s;
    transition-property: top;
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
  }
  li:last-child {
    top: 50vh;
    right: calc(7vw - 36px);
    transform: rotate(90deg);
    transform-origin: 50% 0%;
    font-weight: 400;
    font-size: 13px;
    position: fixed;
    padding: 6px;
    z-index: 2;
    transition: 0.1s;
    transition-property: top;
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
  }
`

function Contact() {
  return (
    <>
      <ContactContainer>
        <li>
          <Link to="/about/">about</Link>
        </li>
        <li>
          <a href="mailto:yves.vinckier@live.fr">contact</a>
        </li>
      </ContactContainer>
    </>
  )
}
export default Contact
