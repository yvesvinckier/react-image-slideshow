import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/general/SEO'
import Hero from '../components/general/Hero'
import ProjectDetails from '../components/project/ProjectDetails'

const ProjectTemplate = ({ data, pageContext }) => {
  const { title, content, cover, herotitle, category } = data.contentfulGallery

  // const previous = pageContext.prev
  // const next = pageContext.next

  return (
    <>
      <SEO title={title} image={cover} description={content} />
      <Hero
        image={cover}
        title={title}
        herotitle={herotitle}
        category={category}
      />
      <ProjectDetails description={content} />
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
      category {
        name
        categoryslug
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
      content {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN)
        }
      }
    }
  }
`
export default ProjectTemplate
