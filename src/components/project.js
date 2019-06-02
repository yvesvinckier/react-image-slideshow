import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/general/SEO'
import find from 'lodash.find'
import styled from 'styled-components'

import Hero from '../components/project/Hero'
import ProjectDetails from '../components/project/ProjectDetails'
import TabletTwo from '../components/project/TabletTwo'
import StickySection from '../components/project/StickySection'
import FooterLink from '../components/project/FooterLink'

const WrapperPage = styled.div`
  z-index: 2;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    position: relative;
    &::before {
      content: '';
      display: block;
      z-index: -2;
      width: 0;
      height: 75vh;
      max-height: 750px;
      background: transparent;
    }
    &::after {
      content: '';
      display: block;
      z-index: -2;
      width: 0;
      height: 100vh;
      background: transparent;
    }
  }
`

const ProjectTemplate = ({ data, pageContext }) => {
  const {
    id,
    title,
    content,
    cover,
    herotitle,
    category,
    projectDescription,
    projectParagraph,
    tabletTwo,
    tabletTwoTitle,
    tabletTwoDesc,
    stickyImage,
    topic,
  } = data.contentfulGallery

  // const previous = pageContext.prev
  // const next = pageContext.next

  const postIndex = find(
    data.allContentfulGallery.edges,
    ({ node: post }) => post.id === id
  )

  return (
    <>
      <SEO title={title} image={cover} description={content} />
      <WrapperPage>
        <Hero
          image={cover}
          title={title}
          herotitle={herotitle}
          category={category}
        />
        <ProjectDetails
          projectDescription={projectDescription}
          projectParagraph={projectParagraph}
          content={content}
        />
        <TabletTwo
          tabletTwo={tabletTwo}
          tabletTwoTitle={tabletTwoTitle}
          tabletTwoDesc={tabletTwoDesc}
        />
        <StickySection stickyImage={stickyImage} />
        <FooterLink postIndex={postIndex} topic={topic} />
      </WrapperPage>
    </>
  )
}
export const query = graphql`
  query($slug: String!) {
    contentfulGallery(slug: { eq: $slug }) {
      title
      id
      slug
      herotitle
      tabletTwoTitle
      tabletTwoDesc {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN)
        }
      }
      category {
        name
        categoryslug
      }
      projectDescription {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN)
        }
      }
      projectParagraph {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN)
        }
      }
      cover {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }
      stickyImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      tabletTwo {
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      content {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN)
        }
      }
    }
    allContentfulGallery(
      filter: { node_locale: { eq: "fr-FR" } }
      limit: 1000
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          id
        }
        previous {
          slug
          title
        }
        next {
          slug
          title
          topic
          cover {
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
export default ProjectTemplate
