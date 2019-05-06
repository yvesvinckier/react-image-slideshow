import React from 'react'
import styled from 'styled-components'

const Toggle = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  margin-top: 7.14vw;
  mix-blend-mode: difference;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-right: 7.142857142857142%;
  perspective: 200px;
  transform: translateZ(0);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
`
const ToggleLabel = styled.span`
  font-size: 1rem;
  font-weight: 700;
  height: 100%;
  color: ${props => props.theme.colors.white};
  display: none;
  opacity: 0;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    display: block;
    opacity: 1;
  }
`
const ToggleIcon = styled.div`
  position: relative;
  width: 24px;
  height: 5px;
  margin-left: 20px;
  span {
    position: absolute;
    display: block;
    background: ${props => props.theme.colors.white};
    width: 100%;
    height: 1px;
    transform: translateZ(0);
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      bottom: 0;
    }
  }
`

function Hambuger() {
  return (
    <Toggle>
      <ToggleLabel>oui will</ToggleLabel>
      <ToggleIcon>
        <span />
        <span />
      </ToggleIcon>
    </Toggle>
  )
}

export default Hambuger
