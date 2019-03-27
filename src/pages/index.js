import React, { Component } from 'react'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import styled from 'styled-components'

import WhiteHeader from '../components/WhiteHeader'
import ContactLink from '../components/ContactLink'
import Social from '../components/Social'
import ColumnTwo from '../components/ColumnTwo'
import ColumnOne from '../components/ColumnOne'
import InnerCanvas from '../components/InnerCanvas'
import Layout from '../components/layout'
import NumLetter from '../components/NumLetter';

const InnerCol = styled.section`
  color: #fff;
  font-size: 0;
  display: flex;
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

  render() {
    const { post, posts } = this.state
    const nextPost = () => {
      const newIndex = this.state.post.index + 1
      console.log(newIndex)
      this.setState({
        post: this.props.data.allContentfulGallery.edges[newIndex].node,
      })
    }

    const prevPost = () => {
      const newIndex = this.state.post.index - 1
      this.setState({
        post: this.props.data.allContentfulGallery.edges[newIndex].node,
      })
    }
    const currentIndex = this.state.post.index
    return (
      <Layout>
        <WhiteHeader />
        <ContactLink />
        <NumLetter currentIndex={currentIndex} posts={posts} post={post} />
        <Social />
        <InnerCol>
          <ColumnOne posts={posts} post={post} />
          <ColumnTwo
            key={post.id}
            post={post}
            posts={posts}
            nextPost={nextPost}
            prevPost={prevPost}
          />
        </InnerCol>
        <InnerCanvas post={post} />
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
