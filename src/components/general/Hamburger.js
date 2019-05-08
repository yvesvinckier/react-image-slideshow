import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

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
  .topbar {
    position: absolute;
    display: block;
    /* background: ${props => props.theme.colors.white}; */
    width: 100%;
    height: 1px;
    top:0;
    transition: transform .6s cubic-bezier(.165,.84,.44,1);
&::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      opacity: .99;
      transform-origin: right;
      transition: transform .6s cubic-bezier(.165,.84,.44,1) .2s;
      transform: scaleX(1) translateZ(0);
    }
    &::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      opacity: .99;
      transform-origin: left;
      transform: scaleX(0) translateZ(0);
    }
  }
  .bottombar {
    position: absolute;
    display: block;
    /* background: ${props => props.theme.colors.white}; */
    width: 100%;
    height: 1px;
    bottom:0;
&::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      opacity: .99;
      transform-origin: left;
      transition: transform .6s cubic-bezier(.165,.84,.44,1) .2s;
      transform: scaleX(1) translateZ(0);
    }
    &::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      opacity: .99;
      transform-origin: right;
      transition: transform .6s cubic-bezier(.165,.84,.44,1);
      transform: scaleX(0) translateZ(0);
    }
  }
  &:hover {
    .topbar::before {
      transform: scaleX(0) translateZ(0);
    }
    .topbar::after {
      transform: scaleX(1) translateZ(0);
    }
    .bottombar::before {
      transform: scaleX(0) translateZ(0);
    }
    .bottombar::after {
      transform: scaleX(1) translateZ(0);
    }
  }
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
`

function Hambuger({ toggle, opened }) {
  const BarOneAnimation = useSpring({
    transform: opened
      ? `rotate(-45deg) translateY(3px)`
      : `rotate(0deg) translateY(0px)`,
  })
  const BarTwoAnimation = useSpring({
    transform: opened
      ? `rotate(45deg) translateY(-3px)`
      : `rotate(0deg) translateY(0px)`,
  })
  return (
    <Toggle onClick={toggle}>
      <ToggleLabel>oui will</ToggleLabel>
      <ToggleIcon>
        <animated.span className="topbar" style={BarOneAnimation} />
        <animated.span className="bottombar" style={BarTwoAnimation} />
      </ToggleIcon>
    </Toggle>
  )
}

export default Hambuger
