import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/general/SEO'
import find from 'lodash.find'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

import Hero from '../components/project/Hero'
import ProjectDetails from '../components/project/ProjectDetails'
import TabletTwo from '../components/project/TabletTwo'
import StickySection from '../components/project/StickySection'
import FooterLink from '../components/project/FooterLink'

const TransparentDiv = styled(animated.div)`
  position: relative;
  height: 100vh;
  background: transparent;
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

  const WrapperPageAnimProps = useSpring({
    config: config.slow,
    delay: 2000,
    from: { height: '100vh' },
    to: { height: '80vh' },
  })

  return (
    <>
      <SEO title={title} image={cover} description={content} />
      <>
        <TransparentDiv style={WrapperPageAnimProps} />
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
      </>
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
