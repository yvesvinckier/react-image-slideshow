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
  padding: 2em 1em 4em;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .gatsby-image-wrapper {
    margin: 1em 1em 1em 1em;
    height: 500px;
  }
  li {
    background: white;
    div {
      transition: transform 0.5s;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }

    position: relative;
    flex: 0 0 49.45%;
    margin: 0.5vw 0;
  }
  h2 {
    padding-top: 18px;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
    letter-spacing: 0.02em;
    font-size: 20px;
    color: ${props => props.theme.colors.white};
  }
  h4 {
    font-size: 12px;
    color: ${props => props.theme.colors.grey};
    font-weight: 300;
    line-height: 1.46667;
    letter-spacing: 0.05em;
    text-align: center;
    padding-bottom: 65px;
  }
`
const BlackBackgroung = styled.div`
  position: relative;
  background: ${props => props.theme.colors.base};;
  width: 100%;
  padding-bottom: 60px;
  > h2{
        color: ${props => props.theme.colors.white};
        font-size: 5em;
        font-weight: 700;
        padding-top: 120px;
        padding-left: 120px;
        text-transform: uppercase;
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

            <li key={card.id}>
              <Card>
                <Link to={`/${card.slug}/`}>
                  <Img
                    fluid={card.cover.fluid}
                    alt={card.cover.title}
                    title={card.cover.title}
                    backgroundColor={'#f1f1f1'}
                  />
                  <h2>{card.title}</h2>
                  <h4>{card.category.name}</h4>
                </Link>
              </Card>
            </li>
          ))}
        </HomeList>
      </BlackBackgroung>
    </>
  )
}

export const query = graphql`
  query {
    allContentfulGallery(limit: 1000, sort: { fields: createdAt, order: DESC }) {
        edges{
            node{
                id
                slug
                title
                cover{
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
  }`

export default WorkPage