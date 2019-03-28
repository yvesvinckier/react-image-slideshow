import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const NumLetterContainer = styled.ul`
  position: absolute;
  bottom: calc(7vw - 6px);
  left: calc(7vw - 4px);
  font-size: 0;
  z-index: 2;
`

const ChangeProject = styled.li`
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  width: 22px;
  height: 54px;
  cursor: pointer;
  overflow: hidden;
  & ::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 100%;
    background: #fff;
    opacity: 0.44;
    position: absolute;
    bottom: 6px;
    left: 9px;
    transition: opacity 0.2s;
  }
  & ::after {
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
  & :hover::after {
    transform: scaleY(1);
  }
`

const Letter = styled.div`
  font-weight: 600;
  font-size: 15px;
  position: absolute;
  bottom: -3px;
  width: 100%;
  text-align: center;

  /* transform: rotate(-90deg) translateY(-100%); */

  height: 22px;
  padding-top: 3px;
`

class NumLetter extends Component {
  render() {
    const { post, posts, currentIndex } = this.props
    const { index, title } = this.props.post

    return (
      <>
        <NumLetterContainer>
          {posts.map(({ node: post }) => (
            <ChangeProject key={post.id}>
              <Letter>{post.title.toLowerCase().slice(0, 1)}</Letter>
            </ChangeProject>
          ))}
        </NumLetterContainer>
      </>
    )
  }
}
export default NumLetter
