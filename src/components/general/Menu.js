import React from 'react'
import { Link } from 'gatsby'
import { animated, useTrail } from 'react-spring'
import styled from 'styled-components'
import content from './NavContent'

const NavWrapper = styled.nav`
  z-index: 888;
  height: 90vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row wrap;
  color: ${props => props.theme.colors.base};
`

const NavLeft = styled(animated.div)`
  position: relative;
  padding-top: 7.14vw;
  padding-bottom: 7.14vw;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.white};
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: 0 1 50%;
  }
`

const NavRight = styled(animated.div)`
  position: relative;
  padding-top: 3vw;
  padding-bottom: 7.14vw;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.secondary};
  padding-left: 5%;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: 0 1 50%;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    overflow: hidden;
    margin-top: 30px;
  }
  .trails-text {
    will-change: transform;
  }
  a {
    position: relative;
    display: inline-block;
    padding-bottom: 7px;
    font-size: 2.9em;
    text-decoration: none;
    cursor: pointer;
    margin: 0;
    color: ${props => props.theme.colors.base};
    font-weight: 200;
    line-height: 1;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${props => props.theme.colors.base};
      transform-origin: left;

      /* transform: scaleX(0) translateZ(0); */
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
  }
`
const MailToContainer = styled.p`
  z-index: 1;
  font-weight: 400;
  transform: translateZ(0);
  margin-left: 14%;
  color: ${props => props.theme.colors.grey};
  line-height: 1.8;
  font-size: 0.95rem;
  a {
    margin-left: 30px;
    color: ${props => props.theme.colors.base};
    position: relative;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
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
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.3s;
    }
  }
`
const config = { mass: 5, tension: 2000, friction: 200 }

const Menu = ({ opened }) => {
  // const NavLeftAnimation = useSpring({
  //   transform: opened
  //     ? `translate3d(0,0,0) scaleY(1)`
  //     : `translate3d(0,-100%,0) scaleY(0)`,
  //   config: config.slow,
  //   delay: 50,
  // })
  // const NavRightAnimation = useSpring({
  //   transform: opened
  //     ? `translate3d(0,0,0) scaleY(1)`
  //     : `translate3d(0,-100%,0) scaleY(0)`,
  //   config: config.slow,
  //   delay: 150,
  // })
  const items = content.nav.links
  const trail = useTrail(items.length, {
    config,
    transform: opened ? `translate3d(0,0,0)` : `translate3d(0,100%,0)`,
  })
  return (
    <NavWrapper>
      <NavLeft>
        <MailToContainer>
          Start a conversation
          <a href="mailto:hello@andy.com">hello@andy.com</a>
        </MailToContainer>
      </NavLeft>
      <NavRight>
        {trail.map((animation, index) => (
          <ul key={items[index].to}>
            <animated.li>
              <animated.div className="trails-text" style={animation}>
                <Link to={items[index].to}>{items[index].text}</Link>
              </animated.div>
            </animated.li>
          </ul>
        ))}
      </NavRight>
    </NavWrapper>
  )
}

export default Menu
