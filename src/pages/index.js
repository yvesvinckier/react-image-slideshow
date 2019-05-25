import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import styled from 'styled-components'
import { Stage, Sprite, TilingSprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'
import displacementImage from '../images/dmaps/gradient4.png'

import WhiteHeader from '../components/home/WhiteHeader'
import Social from '../components/home/Social'
import ColumnTwo from '../components/home/ColumnTwo'
import ColumnOne from '../components/home/ColumnOne'
import SEO from '../components/general/SEO'
import NumLetter from '../components/home/NumLetter'

const displacementTexture = PIXI.Texture.fromImage(displacementImage)

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
      filters: [],
      x: 0,
    }
    this.displacementSprite = React.createRef()
    this.overlaySprite = React.createRef()
  }
  componentDidMount() {
    this.mouseWheelListener = throttle(e => this.handleMouseWheel(e), 2000, {
      leading: true,
      trailing: false,
    })

    window.addEventListener('wheel', this.mouseWheelListener, { passive: true })

    this.setState({
      filters: [
        new PIXI.filters.DisplacementFilter(this.displacementSprite.current),
      ],
    })
    // PIXI.ticker.shared.add(this.move, this);
  }

  // componentWillUnmount() {
  //   PIXI.ticker.shared.remove(this.move, this);
  // }

  // move() {
  //   this.displacementSprite.current.x += 1
  //   this.displacementSprite.current.y += 1
  // }

  _onMouseMove = e => {
    const width = window.innerWidth
    const oX = (e.nativeEvent.offsetX / width) * 100

    console.log(Math.floor(oX))
    const updateDisplacementSpritePositionX = (this.displacementSprite.current.x += oX)
    this.setState({
      x: updateDisplacementSpritePositionX,
    })
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
    const bgTexture = PIXI.Texture.fromImage(post.cover.resize.src)

    return (
      <>
        <SEO />
        <Helmet />
        <div onMouseMove={this._onMouseMove}>
          <WhiteHeader />
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
          <Stage
            options={OPTIONS}
            width={width}
            height={height}
            filters={this.state.filters}
          >
            <TilingSprite
              ref={this.displacementSprite}
              texture={displacementTexture}
            />
            <Sprite
              ref={this.overlaySprite}
              texture={bgTexture}
              width={width}
              height={height}
            />
            <TilingSprite
              ref={this.displacementSprite}
              texture={displacementTexture}
            />
          </Stage>
        </div>
      </>
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
