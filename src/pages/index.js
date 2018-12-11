import React, { Component } from 'react'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

import Slider from '../components/Slider'
import Layout from '../components/layout'

class IndexPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.data.allContentfulGallery.edges,
      post: this.props.data.allContentfulGallery.edges[0].node
    }
  }
  componentDidMount() {
    this.mouseWheelListener = throttle(e => this.handleMouseWheel(e), 2000, {
      leading: true,
      trailing: false,
    })

    window.addEventListener('wheel', this.mouseWheelListener, { passive: true })
  }

  handleMouseWheel({ deltaY }) {
    const currentIndex = this.state.post.index
    const newIndex = deltaY > 0 ? currentIndex + 1 : currentIndex - 1
    this.handleProjectSwitch(newIndex)
  }

  handleProjectSwitch = debounce(
    newIndex => {
      const projectsDataCount = this.state.posts.length - 1
      let index = newIndex

      if (index > projectsDataCount) {
        index = 0
      } else if (index < 0) {
        index = projectsDataCount
      }

      this.setState({
        post: this.props.data.allContentfulGallery.edges[index].node
      })

    },
    350,
    { leading: true, trailing: false }
  )

  nextPost = () => {
    const newIndex = this.state.post.index + 1;
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
        <main className="site-wrapper">
          <div className="content content--fixed">
          </div>
          <div className="content">
            {/* {posts.map(({ node: post }) => (
                  <Slider key={post.id} post={post} />
                ))} */}
            <Slider key={post.id} post={post} />
            <button
              onClick={() => this.nextPost()}
              disabled={post.index === posts.length - 1}
            >Next</button>
            <button
              onClick={() => this.prevPost()}
              disabled={post.index === 0}
            >Prev</button>
          </div>
        </main>
      </Layout>
    )
  }
}

export const query = graphql`
  query HomeQuery {
    allContentfulGallery(limit: 8, sort: { fields:index, order: ASC}) {
      edges {
        node {
          title
          id
          slug
          index
          cover {
            title
            resize (width: 1920, quality: 100) {
              src
            }
          }
        }
      }
    }
  }
`

export default IndexPage
