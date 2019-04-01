import React, { Component } from 'react'
import { Power2, TweenMax } from 'gsap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
import displacementImage from '../images/dmaps/2048x2048/ripple.jpg'

const InnerImage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  & canvas {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    top: 0;
    left: 0;
  }
`

class InnerCanvas extends Component {
  constructor(props) {
    super(props)
    this.postImage = null
    this.state = {
      playground: null,
      fullScreen: true,
      displaceAutoFit: false,
      displacementCenter: true,
    }
  }

  ImageFadeIn() {
    TweenMax.from(this.postImage, 1, { opacity: 0, ease: Power2.easeOut })
  }

  componentDidMount() {
    this.ImageFadeIn()

    /// ---------------------------
    //  PIXI VARIABLES
    /// ---------------------------
    // eslint-disable-next-line new-cap
    const renderer = new PIXI.autoDetectRenderer(1920, 1080, {
      transparent: true,
    })
    const stage = new PIXI.Container()
    var slidesContainer = new PIXI.Container()
    // eslint-disable-next-line new-cap
    const displacementSprite = new PIXI.Sprite.fromImage(displacementImage)
    const displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementSprite
    )

    /// ---------------------------
    //  INITIALISE PIXI
    /// ---------------------------

    // Add canvas to the postImage container
    this.postImage.appendChild(renderer.view)

    // Add child container to the main container
    stage.addChild(slidesContainer)

    // Enable Interactions
    stage.interactive = true

    // console.log(renderer.view.style);

    // Fit renderer to the screen
    if (this.state.fullScreen === true) {
      renderer.view.style.objectFit = 'cover'
      renderer.view.style.width = '100%'
      renderer.view.style.height = '100%'
      renderer.view.style.top = '50%'
      renderer.view.style.left = '50%'
      renderer.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)'
      renderer.view.style.transform = 'translate( -50%, -50% ) scale(1.2)'
    } else {
      renderer.view.style.maxWidth = '100%'
      renderer.view.style.top = '50%'
      renderer.view.style.left = '50%'
      renderer.view.style.webkitTransform = 'translate( -50%, -50% )'
      renderer.view.style.transform = 'translate( -50%, -50% )'
    }

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    /// ---------------------------
    //  LOAD IMAGES TO CANVAS
    /// ---------------------------
    const sprites = this.props.post.cover.resize.src

    const texture = PIXI.Texture.fromImage(sprites)
    const image = new PIXI.Sprite(texture)

    slidesContainer.addChild(image)

    // Set the filter to stage and set some default values for the animation
    stage.filters = [displacementFilter]

    displacementSprite.scale.x = 2
    displacementSprite.scale.y = 2

    // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
    displacementFilter.autoFit = this.state.displaceAutoFit

    stage.addChild(displacementSprite)
    /// ---------------------------
    //  CENTER DISPLACEMENT
    /// ---------------------------
    if (this.state.displacementCenter === true) {
      // center the sprite's anchor point
      displacementSprite.anchor.set(0.5)
      // move the sprite to the center of the screen
      displacementSprite.x = renderer.view.width / 2
      displacementSprite.y = renderer.view.height / 2
    }

    render()

    function render() {
      requestAnimationFrame(render)

      renderer.render(stage)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post.title !== this.props.post.title) {
      this.ImageFadeIn()
    }
  }

  render() {
    // const { title, cover } = this.props.post
    return (
      <InnerImage ref={div => (this.postImage = div)}>
        {/* <img src={cover.resize.src} alt={title} /> */}
      </InnerImage>
    )
  }
}
InnerCanvas.propTypes = {
  post: PropTypes.object.isRequired,
}
export default InnerCanvas
