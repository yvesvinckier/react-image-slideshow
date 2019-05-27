import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { TimelineLite, Power2 } from 'gsap'
import styled from 'styled-components'

import SVGArrowPrev from '../../images/arrow-prev.svg'
import SVGArrowNext from '../../images/arrow-next.svg'

const ColTwo = styled.div`
  position: relative;
  padding: calc(40vh - 70px) 14vw 0 0;
  display: inline-block;
  flex: 0 1 56%;
  height: 100vh;
  vertical-align: top;
  .inner_h2 {
    position: absolute;
    margin: 20px 0 0 -3px;
    color: #fff;
    h2 {
      font-weight: 300;
      font-size: 9.16vw;
      line-height: 100px;
      @media screen and (min-width: ${props => props.theme.responsive.small}) {
        line-height: 8vw;
      }
    }
  }
`
const Category = styled.h3`
  font-weight: 500;
  font-size: 14px;
  position: absolute;
  top: calc(40vh - 96px);
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

const Num = styled.div`
  font-weight: 800;
  font-size: 15px;
  position: absolute;
  bottom: 13vw;
  left: 24vw;
  .slash {
    transform: scaleY(0.8) translateY(-1px);
    display: inline-block;
    margin-right: 2px;
  }
  .work {
    font-weight: 400;
    font-size: 9px;
    margin-left: 10px;
    transform: translateY(-2px);
    display: inline-block;
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
    const { goToNextSlide, goToPrevSlide } = this.props
    const { index, title, slug } = this.props.post

    return (
      <ColTwo>
        <Category ref={h3 => (this.postCategory = h3)}>
          [ UI, Web Design ]
        </Category>
        {/* <TitleTransition slug={slug} title={title} /> */}
        <Link to={`/${slug}/`} className="inner_h2">
          <h2 className="title" ref={h2 => (this.postTitle = h2)}>
            {title}
          </h2>
        </Link>
        <PrevNext>
          <button className="to_prev" onClick={goToPrevSlide}>
            <img src={SVGArrowPrev} alt="" />
          </button>
          <button className="to_next" onClick={goToNextSlide}>
            <img src={SVGArrowNext} alt="" />
          </button>
        </PrevNext>
        <Num
          ref={div => {
            this.postNumber = div
          }}
        >
          <span className="slash">/ </span>
          <span className="num_project">0{index + 1}</span>
          <span className="work"> [ work ]</span>
        </Num>
      </ColTwo>
    )
  }
}

Slider.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Slider
