import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withApp } from 'react-pixi-fiber'
import CoverImage from './CoverImage'

// http://pixijs.io/examples/#/basics/basic.js
class RotatingBunny extends Component {
  state = {
    rotation: 0,
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
      rotation: state.rotation + 0.1 * delta,
    }))
  }

  render() {
    const post = this.props.post
    return (
      <CoverImage post={post} {...this.props} rotation={this.state.rotation} />
    )
  }
}
RotatingBunny.contextTypes = {
  app: PropTypes.object,
}

export default withApp(RotatingBunny)
