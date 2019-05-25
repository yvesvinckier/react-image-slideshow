import React, { Component } from 'react'
import styled from 'styled-components'

const NumLetterContainer = styled.ul`
  position: absolute;
  bottom: calc(7vw - 6px);
  left: calc(7vw - 4px);
  font-size: 0;
  z-index: 2;
  .carousel__indicator {
    position: relative;
    display: inline-block;
    vertical-align: bottom;
    width: 22px;
    height: 54px;
    cursor: pointer;
    overflow: hidden;
    &::before {
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background: #fff;
      opacity: 0.44;
      position: absolute;
      bottom: 6px;
      left: 9px;
      transition: opacity 0.4s;
    }
    &::after {
      content: '';
      height: 20px;
      width: 2px;
      background: #fff;
      position: absolute;
      bottom: 22px;
      left: 10px;
      transform: scaleY(0);
      transition: 0.2s cubic-bezier(0.17, 0.67, 0, 0.99);
      transform-origin: 0 0;
    }
    &:hover::after {
      transform: scaleY(1);
    }
    &--active {
      &::after {
        transform: scaleY(1);
      }
      &::before {
        opacity: 0;
      }
    }
  }
  .letter {
    font-weight: 600;
    font-size: 15px;
    position: absolute;
    bottom: -3px;
    width: 100%;
    text-align: center;
    transform: rotate(-90deg) translateY(0);
    height: 22px;
    padding-top: 3px;
    transition: 0.2s ease-out 0.4s;
    &--active {
      transform: rotate(-90deg) translateY(-100%);
    }
  }
`

class NumLetter extends Component {
  render() {
    const { posts, goToSlide, index } = this.props

    return (
      <>
        <NumLetterContainer>
          {posts.map(({ node: post }) => (
            <li
              className={
                post.index === index
                  ? 'carousel__indicator carousel__indicator--active'
                  : 'carousel__indicator'
              }
              key={post.id}
              onClick={() => {
                goToSlide(post.index)
              }}
            >
              <div
                className={
                  post.index === index ? 'letter' : 'letter letter--active'
                }
              >
                {post.title.toLowerCase().slice(0, 1)}
              </div>
            </li>
          ))}
        </NumLetterContainer>
      </>
    )
  }
}
export default NumLetter
