import React, { Component } from 'react'
import { Power2, TweenLite } from 'gsap'
import styled from 'styled-components'

const InnerImage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  & > img {
    width: 100%;
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
        <img src={cover.resize.src} alt={title} />
      </InnerImage>
    )
  }
}
export default InnerCanvas
