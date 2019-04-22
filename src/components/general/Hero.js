import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useSpring, animated, config } from 'react-spring'

const Wrapper = styled(animated.div)`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  color: #fff;
  margin: 0 0 2rem;
  height: 100vh;
`

const BgImg = styled(Img)`
  width: 100%;
  z-index: -1;
  max-height: 600px;
  
  & > img {
    object-fit: cover !important;
    object-position: 50% 50% !important;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
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
  font-family: spectral,Times New Roman,Times,serif;
    font-size: 1em;
    font-style: italic;
    font-weight: 300;
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
  letter-spacing: .5px;
  text-transform: uppercase;
`
const OverflowCategoryAnim = styled(animated.div)`
  span:first-of-type {
    font-size: 0.7em;
    opacity: .7;
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
      opacity: 1, transform: 'translateY(0em)'
    },
  })

  const TitleAnimProps = useSpring({
    config: config.slow,
    delay: 900,
    from: { opacity: 1, transform: 'translateY(5em)' },
    to: {
      opacity: 1, transform: 'translateY(0em)'
    },
  })

  const OverflowCategoryAnimProps = useSpring({
    config: config.slow,
    delay: 1100,
    from: { transform: 'translateY(3em)' },
    to: {
      transform: 'translateY(0em)'
    },
  })

  const HeroAnimProps = useSpring({
    config: config.slow,
    delay: 1200,
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
        fluid={props.image.fluid}
        alt={props.image.title}
        title={props.image.title}
        backgroundColor={'#212121'}
      />
    </Wrapper>
  )
}

export default Hero
