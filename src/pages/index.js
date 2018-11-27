import React from 'react'
import { graphql } from 'gatsby'

import Link from 'gatsby-link'
import Img from 'gatsby-image'

import Layout from '../components/layout'

class IndexPage extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    const { data } = this.props
    const posts = data.allContentfulGallery.edges

    return (
      <Layout>
        <ul className="featured__list">
          {posts.map(({ node: post }) => (
            <li key={post.id}>
              <Link to={post.slug + '/'}>
                <Img
                  sizes={post.cover.sizes}
                  alt={post.cover.title}
                  title={post.cover.title}
                  backgroundColor={'#f1f1f1'}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export const query = graphql`
  query HomeQuery {
    allContentfulGallery(limit: 8, sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          title
          id
          slug
          cover {
            title
            sizes(maxWidth: 1800) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
        }
      }
    }
  }
`

export default IndexPage
