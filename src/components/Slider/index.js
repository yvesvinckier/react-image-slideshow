import React, { Component } from "react"
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { TimelineLite, CSSPlugin } from "gsap/all";

class Slider extends Component {
    constructor(props) {
        super(props);
        // post container
        this.postContainer = null;
        // post title
        this.postTitle = null;
        // post Image
        this.postImage = null;
        // post tween
        this.postTween = null;
    }

    componentDidMount() {
        // create post tween
        this.postTween = new TimelineLite()
            .fromTo(this.postImage, 0.85, { opacity: 0 }, { opacity: 1 })
            //.from(this.postImage, 3, { opacity: 0 })
            .from(this.postTitle, 1, { opacity: 0 }, "-=0.3")
    }

    componentDidUpdate(prevProps) {
        const actualTitle = this.props.post.title
        const prevTitle = this.prevProps.post.title
        console.log(actualTitle);
        console.log(prevTitle);

        if (prevProps.post.title !== this.props.post.title) {
            //this.postTween.play();
            //console.log(prevProps.post.title);
            console.log(actualTitle);
        }

    }

    render() {
        const { index, title, cover } = this.props.post
        return (
            <div id={`card-${index}`} className="card" ref={div => this.postContainer = div}>
                <div ref={div => this.postImage = div}>
                    <Img
                        sizes={cover.sizes}
                        alt={cover.title}
                        title={cover.title}
                        ref={cmp => this.postImage = cmp}
                    />
                </div>
                <div className="details">
                    <span className="index">{index + 1}</span>
                    <p className="location" ref={p => this.postTitle = p}>
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