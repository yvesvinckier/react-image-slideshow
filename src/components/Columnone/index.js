import React, { Component } from 'react'
import { Link } from 'gatsby'

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
            <div className="col1">
                {/* <img src={firstCircle} alt="" /> */}
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
                <div className="random">
                    <Link to="/">View Project</Link>
                    <span className="year">2018</span>
                </div>
            </div>
        )
    }
}
export default Columnone
