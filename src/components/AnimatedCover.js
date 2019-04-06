import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withApp, Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

// import CoverImage from './CoverImage'

const centerAnchor = new PIXI.Point(0.5, 0.5)

class AnimatedCover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotation: 0,
    }
  }

  componentDidMount() {
    this.props.app.ticker.add(this.animate)
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate)
  }

  animate = delta => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent tranformation
    this.setState(state => ({
      ...state,
      // rotation: state.rotation + 0.1 * delta,
      rotation: state.rotation,
    }))
  }

  render() {
    // const post = this.props.post
    const CoverImage = this.props.post.cover.resize.src
    const bgTexture = PIXI.Texture.fromImage(CoverImage)
    return (
      // <CoverImage post={post} {...this.props} rotation={this.state.rotation} />
      <Sprite
        rotation={this.state.rotation}
        anchor={centerAnchor}
        texture={bgTexture}
        {...this.props}
      />
    )
  }
}
AnimatedCover.contextTypes = {
  app: PropTypes.object,
}

export default withApp(AnimatedCover)
