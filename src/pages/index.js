import React, { Component } from 'react'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import styled from 'styled-components'

import WhiteHeader from '../components/WhiteHeader'
import Slider from '../components/Slider'
import Columnone from '../components/ColumnOne'
import Layout from '../components/layout'

import SVGArrowPrev from '../images/arrow-prev.svg'
import SVGArrowNext from '../images/arrow-next.svg'

const InnerCol = styled.section`
  color: #fff;
  font-size: 0;
  display: flex;
`
const ColTwo = styled.div`
  position: relative;
  padding: calc(40vh - 70px) 14vw 0 0;
  display: inline-block;
  flex: 0 1 56%;
  height: 100vh;
  vertical-align: top;
`
const PrevNext = styled.div`
  position: absolute;
  bottom: calc(7vw - 17px);
  left: -17px;
  line-height: 0;
  font-size: 0;
  .to_prev {
    opacity: 0.44;
    padding: 17px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    transition: opacity 0.5s;
    &:hover {
      opacity: 1;
    }
    svg {
      pointer-events: none;
    }
  }
  .to_next {
    opacity: 0.44;
    padding: 17px;
    position: relative;
    display: inline-block;
    cursor: pointer;
    transform: rotate(180deg);
    transition: opacity 0.5s;
    &:hover {
      opacity: 1;
    }
    svg {
      pointer-events: none;
    }
  }
`

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
    return (
      <Layout>
        <WhiteHeader />
        <InnerCol>
          <Columnone posts={posts} post={post} />
          <ColTwo>
            {/* {posts.map(({ node: post }) => (
                  <Slider key={post.id} post={post} />
                ))} */}

            <Slider key={post.id} post={post} />
            <PrevNext>
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
              {/* <Columnone posts={posts} post={post} /> */}
            </PrevNext>
          </ColTwo>
        </InnerCol>
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
