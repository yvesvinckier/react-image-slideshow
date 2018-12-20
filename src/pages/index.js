import React, { Component } from 'react'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

import Slider from '../components/Slider'
import Layout from '../components/layout'
// import arrowLeft from '../images/arrow-left'

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
          <div className="content">
            {/* {posts.map(({ node: post }) => (
                  <Slider key={post.id} post={post} />
                ))} */}
            <Slider key={post.id} post={post} />
            <div className="prev_next">
              <button
                className="to_prev"
                onClick={() => this.prevPost()}
                disabled={post.index === 0}>
                <svg width="12px" height="8px" viewBox="0 0 12 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Artboard-Copy-5" transform="translate(-569.000000, -625.000000)" stroke="#FFFFFF" strokeWidth="2">
                      <g id="Group-6" transform="translate(570.000000, 623.000000)">
                        <polyline id="Rectangle-2" transform="translate(4.949747, 8.949747) scale(-1, -1) rotate(-45.000000) translate(-4.949747, -8.949747) " points="8.44974747 12.4497475 1.44974747 12.4497475 1.44974747 5.44974747 1.44974747 5.44974747"></polyline>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
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
          allContentfulGallery(limit: 8, sort: {fields: index, order: ASC}) {
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
