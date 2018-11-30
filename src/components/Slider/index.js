import React, { Component } from "react"
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { TimelineLite, CSSPlugin } from "gsap/all";

class Slider extends Component {
    constructor(props) {
        super(props);
        // post container
        this.postContainer = null;
        // post tween
        this.postTween = null;
    }

    componentDidMount() {
        // create post tween
        this.postTween = new TimelineLite()
            .from(this.postContainer, 2, { x: 500 })
            .from(this.postContainer, 1, { rotation: 360, transformOrigin: "center" });
    }

    render() {
        const { index, title, cover } = this.props.post
        return (
            <div id={`card-${index}`} className="card" ref={div => this.postContainer = div}>
                <Img
                    sizes={cover.sizes}
                    alt={cover.title}
                    title={cover.title}
                />
                <div className="details">
                    <span className="index">{index + 1}</span>
                    <p className="location">
                        {title}
                    </p>
                </div>
            </div>
        )
    }
}

Slider.propTypes = {
    post: PropTypes.object.isRequired
}

export default Slider