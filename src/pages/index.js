import React from 'react'
import { graphql } from 'gatsby'

import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Slider from '../components/Slider'

import Layout from '../components/layout'

class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    const { data } = this.props
    this.state = {
      posts: data.allContentfulGallery.edges,
      post: data.allContentfulGallery.edges[0]
    }

  }

  nextPost = () => {
    console.log('next');
    const { data } = this.props;
    const newIndex = this.state.post.node.index + 1;
    console.log(newIndex);
    this.setState({
      post: data.allContentfulGallery.edges[newIndex]
    })
  }

  prevPost = () => {
    const { data } = this.props;
    const newIndex = this.state.post.node.index;
    // console.log(newIndex);
    this.setState({
      post: data.allContentfulGallery.edges[newIndex]
    })
  }

  render() {

    const { post } = this.state;
    const { data } = this.props;

    const posts = data.allContentfulGallery.edges

    return (
      <Layout>
        <div className="App">
          <button
            onClick={() => this.nextPost()}
            disabled={post.index === posts.length - 1}
          >Next</button>
          <button
            onClick={() => this.prevPost()}
            disabled={post.index === 0}
          >Prev</button>
          <div className="page">
            <Slider post={post} />
          </div>
          {/* <ul className="featured__list">
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
          </ul> */}
        </div>
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
          index
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
