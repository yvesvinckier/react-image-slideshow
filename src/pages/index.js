import React, { Component } from 'react'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import styled from 'styled-components'
import { Stage } from 'react-pixi-fiber'

import AnimatedCover from '../components/AnimatedCover'
import WhiteHeader from '../components/WhiteHeader'
import ContactLink from '../components/ContactLink'
import Social from '../components/Social'
import ColumnTwo from '../components/ColumnTwo'
import ColumnOne from '../components/ColumnOne'
// import InnerCanvas from '../components/InnerCanvas'
import Layout from '../components/layout'
import NumLetter from '../components/NumLetter'

const InnerCol = styled.section`
  color: #fff;
  font-size: 0;
  display: flex;
`

const height = window.innerHeight
const width = window.innerWidth
const OPTIONS = {
  backgroundColor: 0x000000,
}

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
    const index = this.state.post.index
    const activeIndex = deltaY > 0 ? index + 1 : index - 1
    this.handleProjectSwitch(activeIndex)
  }

  handleProjectSwitch = debounce(
    activeIndex => {
      const projectsDataCount = this.state.posts.length - 1
      let index = activeIndex

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

  render() {
    const { post, posts } = this.state
    const goToNextSlide = e => {
      e.preventDefault()

      const projectsDataCount = this.state.posts.length - 1
      const activeIndex = this.state.post.index + 1
      let index = activeIndex
      if (index > projectsDataCount) {
        index = 0
      } else if (index < 0) {
        index = projectsDataCount
      }
      this.setState({
        post: this.props.data.allContentfulGallery.edges[index].node,
      })
    }

    const goToPrevSlide = e => {
      e.preventDefault()

      const projectsDataCount = this.state.posts.length - 1
      const activeIndex = this.state.post.index - 1
      let index = activeIndex
      if (index > projectsDataCount) {
        index = 0
      } else if (index < 0) {
        index = projectsDataCount
      }
      this.setState({
        post: this.props.data.allContentfulGallery.edges[index].node,
      })
    }

    const goToSlide = index => {
      this.setState({
        post: this.props.data.allContentfulGallery.edges[index].node,
      })
    }

    let index = this.state.post.index

    return (
      <Layout>
        <WhiteHeader />
        <ContactLink />
        <NumLetter
          posts={posts}
          post={post}
          goToSlide={goToSlide}
          index={index}
        />
        <Social />
        <InnerCol>
          <ColumnOne posts={posts} post={post} />
          <ColumnTwo
            key={post.id}
            post={post}
            posts={posts}
            goToNextSlide={goToNextSlide}
            goToPrevSlide={goToPrevSlide}
          />
        </InnerCol>
        {/* <InnerCanvas post={post} /> */}
        <Stage options={OPTIONS} width={width} height={height}>
          <AnimatedCover post={post} x={width / 2} y={height / 2} />
        </Stage>
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
