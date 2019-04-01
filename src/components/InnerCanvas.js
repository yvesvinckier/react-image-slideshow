import React, { Component } from 'react'
import { Power2, TweenLite } from 'gsap'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'

const InnerImage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  & canvas {
    position: fixed;
    pointer-events: none;
    z-index: -1;
    opacity: 1;
    top: 0;
    left: 0;
  }
`

class InnerCanvas extends Component {
  constructor(props) {
    super(props)
    this.postImage = null
  }

  ImageFadeIn() {
    TweenLite.from(this.postImage, 3, { opacity: 0, ease: Power2.easeOut })
  }

  componentDidMount() {
    this.ImageFadeIn()

    // 1. Create a Pixi renderer and define size and a background color
    var renderer = PIXI.autoDetectRenderer(
      window.innerWidth,
      window.innerHeight,
      {
        // create transparent canvas
        transparent: !0,
      }
    )

    // 2. Append canvas element to the body
    this.postImage.appendChild(renderer.view)

    // 3. Create a container that will hold your scene
    var stage = new PIXI.Container()

    // create a PIXI sprite from an image path
    const { cover } = this.props.post
    var hawaii = PIXI.Sprite.fromImage(cover.resize.src)
    console.log(hawaii)
    hawaii.anchor.x = 0.5
    hawaii.anchor.y = 0.5
    hawaii.position.x = 200
    hawaii.position.y = 200

    stage.addChild(hawaii)

    /* TUTORIAL DisplacementFilter CODE GOES HERE ------ */

    // add stage to the canvas
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
    const { title, cover } = this.props.post
    return (
      <InnerImage ref={div => (this.postImage = div)}>
        {/* <img src={cover.resize.src} alt={title} /> */}
      </InnerImage>
    )
  }
}
export default InnerCanvas
