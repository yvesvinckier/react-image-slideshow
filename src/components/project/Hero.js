import React from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

import BgImg from '../general/Background'

const Wrapper = styled(animated.div)`
  text-align: center;
  position: relative;
  width: 100%;
  z-index: -1;
  height: 100vh;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    top: 0;
    position: fixed;
  }
  &::before {
    content: '';
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
`

const OverflowHeroTitle = styled.div`
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  padding: 0.5rem 0;
`
const HeroTitleH2 = styled(animated.div)`
  h2 {
    font-size: 0.6em;
    font-weight: 400;
    @media screen and (min-width: ${props => props.theme.responsive.small}) {
      font-size: 1em;
    }
  }
`

const Overflow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  padding: 0.5rem 0;
`

const OverflowCategory = styled.div`
  position: absolute;
  top: 63%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  padding: 0.5rem 0;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`
const OverflowCategoryAnim = styled(animated.div)`
  span:first-of-type {
    font-size: 0.7em;
    opacity: 0.7;
  }
  span:last-of-type {
    display: block;
    font-size: 0.9em;
    font-weight: 600;
    letter-spacing: 0;
    margin-top: 5px;
    text-transform: none;
  }
`

const Title = styled(animated.div)`
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 0 1.5rem;
  text-transform: uppercase;
  font-size: 2em;
  transform: translateY(50px);
  margin: 15px 0;

  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    padding: 0 3rem;
    font-size: 5em;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    font-size: 5em;
  }
  h1 {
    font-weight: 800;
    max-width: 1000px;
  }
`

function Hero(props) {
  const HeroTitleAnimProps = useSpring({
    config: config.slow,
    delay: 800,
    from: { opacity: 1, transform: 'translateY(4em)' },
    to: {
      opacity: 1,
      transform: 'translateY(0em)',
    },
  })

  const TitleAnimProps = useSpring({
    config: config.slow,
    delay: 900,
    from: { opacity: 1, transform: 'translateY(5em)' },
    to: {
      opacity: 1,
      transform: 'translateY(0em)',
    },
  })

  const OverflowCategoryAnimProps = useSpring({
    config: config.slow,
    delay: 1100,
    from: { transform: 'translateY(3em)' },
    to: {
      transform: 'translateY(0em)',
    },
  })

  const HeroAnimProps = useSpring({
    config: config.slow,
    delay: 2000,
    from: { height: '100vh' },
    to: { height: '80vh' },
  })

  return (
    <Wrapper style={HeroAnimProps}>
      <OverflowHeroTitle>
        <HeroTitleH2 style={HeroTitleAnimProps}>
          <h2>{props.herotitle} </h2>
        </HeroTitleH2>
      </OverflowHeroTitle>
      <Overflow>
        <Title style={TitleAnimProps}>
          <h1>{props.title}</h1>
        </Title>
      </Overflow>
      <OverflowCategory>
        <OverflowCategoryAnim style={OverflowCategoryAnimProps}>
          <span>secteurs</span>
          <span>{props.category.name}</span>
        </OverflowCategoryAnim>
      </OverflowCategory>
      <BgImg
        height={'100vh'}
        fluid={props.image.fluid}
        alt={props.image.title}
        title={props.image.title}
        backgroundColor={'#212121'}
      />
    </Wrapper>
  )
}

export default Hero
