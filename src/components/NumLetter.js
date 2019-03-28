import React, { Component } from 'react'
import styled from 'styled-components'

const NumLetterContainer = styled.ul`
  position: absolute;
  bottom: calc(7vw - 6px);
  left: calc(7vw - 4px);
  font-size: 0;
  z-index: 2;
  & li {
    position: relative;
    display: inline-block;
    vertical-align: bottom;
    width: 22px;
    height: 54px;
    cursor: pointer;
    overflow: hidden;
  }
  & li::before {
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
  & li::after {
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
  & li:hover::after {
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
  transform: rotate(-90deg) translateY(-50%);
  height: 22px;
  padding-top: 3px;
`

class NumLetter extends Component {

    render() {

        const { posts, post } = this.props
        const currentIndex = post.index
        console.log(currentIndex)

        return (
            <>
                <NumLetterContainer>
                    {posts.map(({ node: post }) => (
                        <li key={post.id} >
                            <Letter>{post.title.toLowerCase().slice(0, 1)}{post.index}</Letter>
                        </li>
                    ))}
                </NumLetterContainer>
            </>
        )
    }
}
export default NumLetter
