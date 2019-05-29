import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

const FeaturedContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 1em;
  margin-bottom: 2em;
  background: rgb(51, 49, 49);
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    margin-bottom: 0;
    padding-top: 30vh;
    flex-flow: row;
  }
  ul {
    width: 100%;
    z-index: 2;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    margin-right: 8%;
    @media screen and (min-width: ${props => props.theme.responsive.small}) {
      width: 51.5%;
    }
    li {
      position: relative;
      margin-bottom: 22%;
      width: 100%;

      /* &:last-child {
        margin-bottom: 0;
      } */

      /* &:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7) {
        display: none;
        @supports (position: sticky) or (position: -webkit-sticky) {
          display: block;
        }
      } */
    }
  }
`

const FeaturedDescStycky = styled.div`
  width: 100%;
  margin-bottom: 1em;
  position: relative;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    width: 27%;
    @supports (position: sticky) or (position: -webkit-sticky) {
      position: sticky;
      top: 12.25em;
      height: 90vh;

      /* top: 5vh; */
    }

    margin-bottom: 0;
  }
  h2 {
    font-size: 1.1rem;
    line-height: 1.25;
    font-weight: 200;
    color: ${props => props.theme.colors.white};
    z-index: 1;
    position: absolute;
    top: -1.75em;
    text-align: left;
    width: 100%;
    @media screen and (min-width: ${props => props.theme.responsive.small}) {
      top: 1.55em;
      left: 3.9em;
    }
  }
  p {
    line-height: 1.8;
    font-size: 0.98rem;
    font-weight: 200;
    color: ${props => props.theme.colors.white};
    z-index: 1;
    position: absolute;
    top: 3.75em;
    text-align: left;
    width: 100%;
    @media screen and (min-width: ${props => props.theme.responsive.small}) {
      padding: 0.5em;
      top: 4.75em;
      left: 3.75em;
    }
  }
`

function StickySection({ stickyImage }) {
  return (
    <FeaturedContainer>
      <FeaturedDescStycky>
        <h2>Art Direction</h2>
        <p>
          Projects are prominently featured on the homepage with scroll
          triggered interactions. Imagery of beautiful interiors are
          highlighted, shown against a bold, modernly ornate serif.
        </p>
      </FeaturedDescStycky>
      <ul className="featured__list">
        {stickyImage &&
          stickyImage.map((stickyImage, index) => (
            <li key={index}>
              <Img
                fluid={stickyImage.fluid}
                alt={stickyImage.title}
                title={stickyImage.title}
                backgroundColor={'#f1f1f1'}
              />
            </li>
          ))}
        {/* {stickyImage.slice(1).map(({ stickyImage, index }) => (
                    <li key={index}>

                        <Img fluid={stickyImage.fluid} alt={stickyImage.title} title={stickyImage.title} backgroundColor={"#f1f1f1"} />
                        <h3>View Gallery</h3>

                    </li>
                ))} */}
      </ul>
    </FeaturedContainer>
  )
}

export default StickySection
