import React, { Component } from "react"
import PropTypes from 'prop-types'
// import Img from 'gatsby-image'
import { TimelineLite } from 'gsap/all'
import textureB from '../../images/2yYayZk.png'
import * as PIXI from 'pixi.js'



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
        this.state = {
            playground: null
        }
    }

    componentDidMount() {
        // create post tween
        this.postTween = new TimelineLite()
            .fromTo(this.postImage, 3, { opacity: 0 }, { opacity: 1 })
            //.from(this.postImage, 3, { opacity: 0 })
            .from(this.postTitle, 1, { opacity: 0 }, "-=2")

        const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true });
        this.postImage.appendChild(renderer.view);

        const stage = new PIXI.Container();

        const { cover } = this.props.post
        const texture = PIXI.Texture.fromImage(cover.resize.src);
        const logo = new PIXI.Sprite(texture);

        const displacementSprite = PIXI.Sprite.fromImage(textureB);

        // add
        const texture2 = PIXI.Texture.fromImage(textureB);
        texture2.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

        displacementSprite.scale.y = 0.38;
        displacementSprite.scale.x = 0.38;

        stage.addChild(displacementSprite);

        stage.addChild(logo);

        animate();

        function animate() {
            requestAnimationFrame(animate);

            displacementSprite.x += .21;
            displacementSprite.y += .21;

            stage.filters = [displacementFilter];
            renderer.render(stage);
        }
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
            <div
                id={`card-${index}`}
                className="card"
                ref={(div) => { this.postContainer = div }}>
                <div ref={(div) => { this.postImage = div }}>
                    <img src={cover.resize.src} />
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