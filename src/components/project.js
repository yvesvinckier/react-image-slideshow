import React from 'react'
import { graphql, Link} from 'gatsby'
import SEO from '../components/general/SEO'
import find from 'lodash.find'
import styled from 'styled-components'

import BgImg from '../components/general/Background'
import Hero from '../components/project/Hero'
import ProjectDetails from '../components/project/ProjectDetails'
import TabletTwo from '../components/project/TabletTwo'
import StickySection from '../components/project/StickySection'

const PostPreview = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  a {
    text-decoration: none;
    div {
      min-height: 200px;
      max-height: 375px;
      &::after {
        content: '';
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: background-color 0.5s;
      }
    }
    &:hover {
      div::after {
        background: rgba(0, 0, 0, 0.4);
      }
    }
  }
`

const PostPreviewNext = styled.h4`
  font-size: 1em;
  letter-spacing: 0.3em;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  color: ${props => props.theme.colors.white};
  padding-top: 2.2em;
  padding-inline-start: 5px;
  border: solid 4px ${props => props.theme.colors.white};
  position: absolute;
  border-radius: 100%;
  width: 90px;
  height: 90px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  z-index: 1;
`

const PostPreviewTitle = styled.h3`
  font-size: 1.1em;
  font-weight: 500;
  position: absolute;
  line-height: 1.3em;
  top: 80%;
  left: 50%;
  color: ${props => props.theme.colors.white};
  z-index: 1;
  transform: translate(-50%, -67%);
  letter-spacing: 0.1em;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    top: 70%;
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
      {postIndex.next && (
                    <PostPreview>
                        <Link to={'/' + postIndex.next.slug + '/'}>
                            <PostPreviewNext> Next</PostPreviewNext>
                            <PostPreviewTitle>— {postIndex.next.title} —</PostPreviewTitle>
                            <BgImg
                                height={'50vh'}
                                fluid={postIndex.next.cover.fluid}
                                alt={postIndex.next.cover.title}
                                title={postIndex.next.cover.title}
                                backgroundColor={'#ffffff'}
                            />
                        </Link>
                    </PostPreview>
                )}
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
      sort: { fields:createdAt, order: DESC }
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
