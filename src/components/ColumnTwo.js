import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { TimelineLite, Power2 } from 'gsap'
import styled from 'styled-components'

import SVGArrowPrev from '../images/arrow-prev.svg'
import SVGArrowNext from '../images/arrow-next.svg'

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

class Slider extends Component {
  constructor(props) {
    super(props)
    // post container
    this.postContainer = null
    // post title
    this.postTitle = null
    // post Number
    this.postNumber = null
    // post Category
    this.postCategory = null
    // post tween
    this.postTween = new TimelineLite({ paused: true })
  }

  componentDidMount() {
    // create post tween
    this.postTween
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
    const { post, posts, nextPost, prevPost } = this.props
    const { index, title } = this.props.post

    return (
      <ColTwo>
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

        <PrevNext>
          <button
            className="to_prev"
            onClick={prevPost}
            disabled={post.index === 0}
          >
            <img src={SVGArrowPrev} alt="" />
          </button>
          <button
            className="to_next"
            onClick={nextPost}
            disabled={post.index === posts.length - 1}
          >
            <img src={SVGArrowNext} alt="" />
          </button>
        </PrevNext>
      </ColTwo>
    )
  }
}

Slider.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Slider
