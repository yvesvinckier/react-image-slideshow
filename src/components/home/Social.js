import React from 'react'
import styled from 'styled-components'

const SocialLink = styled.ul`
  font-size: 13px;
  font-weight: 400;
  position: absolute;
  bottom: 7vw;
  right: calc(7vw - 6px);
  z-index: 2;
  display: flex;
  a {
    padding: 6px;
    color: #fff;
    margin-left: 24px;
    position: relative;

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

function Social() {
  return (
    <>
      <SocialLink>
        <li>
          <a
            href="https://twitter.com/YVNKAD"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tw
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/yvesvinckier"
            target="_blank"
            rel="noopener noreferrer"
          >
            In
          </a>
        </li>
        <li>
          <a
            href="https://github.com/yvesvinckier"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Gh
          </a>
        </li>
      </SocialLink>
    </>
  )
}
export default Social
