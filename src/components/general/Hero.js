import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { useSpring, animated, config } from 'react-spring'

const Wrapper = styled(animated.div)`
  position: relative;
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
    background: linear-gradient(
      rgba(18, 18, 18, 0) 0%,
      rgba(18, 18, 18, 0.1) 70%,
      rgba(18, 18, 18, 0.7) 85%,
      rgba(18, 18, 18, 0.8) 90%,
      rgba(18, 18, 18, 0.9) 95%,
      rgba(18, 18, 18, 1) 100%
    );
  }
`

const Overflow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  overflow: hidden;
  padding: 0.5rem 0;
`

const Title = styled(animated.div)`
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 0 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
  color: white;
  font-size: 2em;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
  transform: translateY(50px);

  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    padding: 0 3rem;
    font-size: 2.5em;
  }
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    font-size: 3em;
  }
  h2 {
    max-width: 1000px;
  }
`

function Hero(props) {

  const HeroAnimProps = useSpring({
    config: config.slow,
    delay: 600,
    from: { height: '100vh' },
    to: { height: '80vh' },
  })

  const TitleAnimProps = useSpring({
    config: config.slow,
    delay: 800,
    from: { opacity: 1, transform: 'translateY(4rem)' },
    to: {
      opacity: 1, transform: 'translateY(0rem)'
    },
  })

  return (

    <Wrapper style={HeroAnimProps}>
      
      <Overflow>
        <h4>{props.herotitle}</h4>
        <Title style={TitleAnimProps}>
          <h2>{props.title}</h2>
        </Title>
        <h3>{props.category.name}</h3>
      </Overflow>
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
