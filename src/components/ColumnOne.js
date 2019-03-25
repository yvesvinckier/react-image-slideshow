import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const ColOne = styled.div`
  padding: calc(40vh - 35px) 0 0 26%;
  display: inline-block;
  vertical-align: top;
  line-height: 0;
  flex: 0 1 44%;
  svg {
    display: block;
    transition: all 2s linear;

    --dashActive: 158.333;
  }
  #cercle_blanc {
    stroke-dashoffset: var(--dashActive);
    stroke-dasharray: 190;
    position: absolute;
    top: calc(40vh - 35px);
    stroke-linecap: round;
  }
`

const Random = styled.div`
  font-weight: 400;
  font-size: 13px;
  margin-top: 136px;
  display: inline-block;
  margin-left: -12px;
  & span {
    font-size: 12px;
    display: block;
    text-align: right;
    margin-top: 35px;
  }
`

class Columnone extends Component {
  render() {
    const { post, posts } = this.props
    const radius = 30
    const postIndex = post.index + 1
    const circumference = 2 * Math.PI * radius
    const postLength = posts.length
    const circleValue =
      2 * Math.PI * radius - (circumference * postIndex) / postLength
    const dashStyle = {
      '--dashActive': circleValue,
    }
    return (
      <ColOne>
        <svg
          width="62px"
          height="62px"
          viewBox="-1 -1 62 62"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
        >
          <circle
            strokeWidth="2"
            fill="none"
            stroke="#FFFFFF"
            opacity="0.5"
            cx="30"
            cy="30"
            r="30"
          />
        </svg>
        <svg
          id="cercle_blanc"
          width="62px"
          height="62px"
          viewBox="-1 -1 62 62"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xlinkHref="http://www.w3.org/1999/xlink"
          style={dashStyle}
        >
          <circle
            id="Oval"
            strokeWidth="2"
            fill="none"
            stroke="#FFFFFF"
            opacity="1"
            cx="30"
            cy="30"
            r="30"
          />
        </svg>
        <Random>
          <Link to="/">View Project</Link>
          <span className="year">2018</span>
        </Random>
      </ColOne>
    )
  }
}
export default Columnone
