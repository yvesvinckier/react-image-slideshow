import React, { Component } from 'react'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

import Slider from '../components/Slider'
import Layout from '../components/layout'
import SVGArrowPrev from '../images/arrow-prev.svg'
import SVGArrowNext from '../images/arrow-next.svg'
import firstCircle from '../images/circle.svg'
import animateCircle from '../images/circle-animate.svg'

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.data.allContentfulGallery.edges,
      post: this.props.data.allContentfulGallery.edges[0].node,
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
        post: this.props.data.allContentfulGallery.edges[index].node,
      })
    },
    350,
    { leading: true, trailing: false }
  )

  nextPost = () => {
    const newIndex = this.state.post.index + 1
    console.log(newIndex)
    this.setState({
      post: this.props.data.allContentfulGallery.edges[newIndex].node,
    })
  }

  prevPost = () => {
    const newIndex = this.state.post.index - 1
    this.setState({
      post: this.props.data.allContentfulGallery.edges[newIndex].node,
    })
  }

  render() {
    const { post, posts } = this.state
    const radius = 30
    const postIndex = this.state.post.index + 1
    const circumference = 2 * Math.PI * radius
    const postLength = posts.length
    // const circleValue = this.state.post.index  1+ * (100 / posts.length)
    const circleValue =
      2 * Math.PI * radius - (circumference * postIndex) / postLength
    console.log(postIndex)
    console.log(circleValue)
    const dashStyle = {
      '--dashActive': circleValue,
    }
    //console.log(posts);
    return (
      <Layout>
        <section className="inner_col">
          <div className="col1">
            <img src={firstCircle} alt="" />
            <svg
              id="cercle_blanc"
              width="62px"
              height="62px"
              viewBox="0 0 62 62"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xlinkHref="http://www.w3.org/1999/xlink"
              style={dashStyle}
            >
              <circle
                id="Oval"
                strokeWidth="2"
                fill="none"
                stroke="#FFFFFF"
                opacity="1"
                cx="30"
                cy="30"
                r="30"
              />
            </svg>
          </div>
          <div className="col2">
            {/* {posts.map(({ node: post }) => (
                  <Slider key={post.id} post={post} />
                ))} */}

            <Slider key={post.id} post={post} />
            <div className="prev_next">
              <button
                className="to_prev"
                onClick={() => this.prevPost()}
                disabled={post.index === 0}
              >
                <img src={SVGArrowPrev} alt="" />
              </button>
              <button
                className="to_next"
                onClick={() => this.nextPost()}
                disabled={post.index === posts.length - 1}
              >
                <img src={SVGArrowNext} alt="" />
              </button>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export const query = graphql`
  query HomeQuery {
    allContentfulGallery(limit: 8, sort: { fields: index, order: ASC }) {
      edges {
        node {
          title
          id
          slug
          index
          cover {
            title
            resize(width: 1920, quality: 100) {
              src
            }
          }
        }
      }
    }
  }
`

export default IndexPage
