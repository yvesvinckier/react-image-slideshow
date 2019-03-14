import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { TimelineLite, TweenMax, Power2 } from 'gsap'
// import displacementImage from '../images/dmaps/2048x2048/clouds.jpg'
import displacementImage from '../images/dmaps/2048x2048/ripple.jpg'
import * as PIXI from 'pixi.js'

class Slider extends Component {
  constructor(props) {
    super(props)
    // post container
    this.postContainer = null
    // post title
    this.postTitle = null
    // post Image
    this.postImage = null
    // post Number
    this.postNumber = null
    // post Category
    this.postCategory = null
    // post tween
    this.postTween = new TimelineLite({ paused: true })
    this.state = {
      playground: null,
      fullScreen: true,
      displaceAutoFit: false,
      displacementCenter: true,
    }
  }

  componentDidMount() {
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
    // animate();

    // function animate() {
    //     requestAnimationFrame(animate);
    //     displacementSprite.x += 2.14;
    //     displacementSprite.y += 22.24;
    //     renderer.render(stage);
    // }
    const ticker = new PIXI.ticker.Ticker()
    ticker.autoStart = true

    ticker.add(function(delta) {
      displacementSprite.x += 10 * delta
      displacementSprite.y += 3

      renderer.render(stage)
    })
    /// ---------------------------
    //  INTERACTIONS
    /// ---------------------------
    slidesContainer.interactive = true
    const mouseEventHandler = function(mouseData) {
      const mouseX = mouseData.data.global.x / 40
      console.log(mouseX / 100)
      const mouseY = mouseData.data.global.y / 40
      console.log(mouseY)
      // TweenMax.to(displacementFilter.scale, 1, { x: '+=' + Math.sin(mouseX) * 100 + '', y: '+=' + Math.cos(mouseY) * 100 + '' });
      // TweenMax.to(displacementFilter.scale, 1, { x: '+=' + Math.sin(mouseX) * 100 + '' });
      TweenMax.to(displacementFilter.scale, 1, { x: '+=' + mouseX / 100 + '' })
    }
    slidesContainer.on('mousemove', mouseEventHandler)

    // create post tween
    this.postTween
      .from(this.postImage, 1, { opacity: 0, ease: Power2.easeOut })
      .from(
        this.postTitle,
        1,
        { x: '-=40px', opacity: 0, ease: Power2.easeOut },
        '-=0.4'
      )
      .from(
        this.postCategory,
        1,
        { x: '-=40px', opacity: 0, ease: Power2.easeOut },
        '-=0.5'
      )
      .from(
        this.postNumber,
        1,
        { x: '-=40px', opacity: 0, ease: Power2.easeOut },
        '-=0.75'
      )
    this.postTween.play()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post.title !== this.props.post.title) {
      this.postTween.play()
    }
  }

  render() {
    const { index, title } = this.props.post
    return (
      <div>
        <h3 className="category" ref={h3 => (this.postCategory = h3)}>
          [ UI, Web Design ]
        </h3>
        <Link to="/" className="inner_h2">
          <h2 className="title" ref={h2 => (this.postTitle = h2)}>
            {title}
          </h2>
        </Link>
        <div
          className="num random"
          ref={div => {
            this.postNumber = div
          }}
        >
          <span className="slash">/ </span>
          <span className="num_project">0{index + 1}</span>
          <span className="work"> [ work ]</span>
        </div>

        <div ref={div => (this.postImage = div)}>
          {/* <img src={cover.resize.src} alt={title} /> */}
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Slider
