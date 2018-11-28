import React, { Component } from 'react';
import { graphql } from 'gatsby'

import Slider from '../components/Slider'
import data from '../data/data'
import logo from '../images/logo.svg'

import Layout from '../components/layout'

class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.data.allContentfulGallery.edges,
      post: this.props.data.allContentfulGallery.edges[0].node
    }

  }


  nextPost = () => {
    const newIndex = this.state.post.index + 1;
    console.log(newIndex);
    this.setState({
      post: this.props.data.allContentfulGallery.edges[newIndex].node
    })
  }

  prevPost = () => {
    const newIndex = this.state.post.index - 1;
    this.setState({
      post: this.props.data.allContentfulGallery.edges[newIndex].node
    })
  }

  render() {

    const { post, posts } = this.state
    //console.log(post);
    //console.log(posts);
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
            <section>
              <img src={logo} className="App-logo" alt="logo" />
              <h1>Image slideshow React tutorial.</h1>
            </section>

            <Slider post={post} />

          </div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query HomeQuery {
    allContentfulGallery(limit: 8) {
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
