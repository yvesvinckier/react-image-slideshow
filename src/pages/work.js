import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import SEO from '../components/general/SEO'

import Card from '../components/work/Card'

const HomeList = styled.ul`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto 2em;
  padding: 2em 1em 12em;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .gatsby-image-wrapper {
    height: 250px;
  }
  .card {
    position: relative;
    flex: 0 0 45%;
    margin: 0.5vw 0;
    will-change: transform;
  }
  li {
    /* background: white; */
  }
  h2 {
    font-weight: 600;
    text-transform: uppercase;
    text-align: left;
    line-height: 1.2;
    letter-spacing: 0.02em;
    font-size: 26px;
    color: ${props => props.theme.colors.white};
  }
  h4 {
    padding-top: 18px;
    font-size: 12px;
    color: ${props => props.theme.colors.grey};
    font-weight: 500;
    line-height: 1.46667;
    letter-spacing: 0.05em;
    text-align: left;
    padding-bottom: 10px;
  }
`
const BlackBackgroung = styled.div`
  position: relative;
  background: ${props => props.theme.colors.base};
  width: 100%;
  > h2 {
    margin: 0 auto;
    max-width: 1140px;
    color: ${props => props.theme.colors.white};
    font-size: 4em;
    font-weight: 700;
    padding-top: 120px;
    text-transform: uppercase;
    padding-bottom: 20px;
  }
`

const WorkPage = ({ data }) => {
  const cards = data.allContentfulGallery.edges
  return (
    <>
      <SEO />
      <BlackBackgroung>
        <h2>Projets</h2>
        <HomeList>
          {cards.map(({ node: card }) => (
            <Card key={card.id}>
              <li>
                <Link to={`/${card.slug}/`}>
                  <Img
                    fluid={card.cover.fluid}
                    alt={card.cover.title}
                    backgroundColor={'#f1f1f1'}
                  />
                  <h4>{card.category.name}</h4>
                  <h2>{card.title}</h2>
                </Link>
              </li>
            </Card>
          ))}
        </HomeList>
      </BlackBackgroung>
    </>
  )
}

export const query = graphql`
  query {
    allContentfulGallery(
      limit: 1000
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          id
          slug
          title
          cover {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          category {
            name
            categoryslug
          }
        }
      }
    }
  }
`

export default WorkPage
