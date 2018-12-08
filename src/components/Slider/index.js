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
            .fromTo(this.postImage, 0.85, { opacity: 0 }, { opacity: 1 })
            //.from(this.postImage, 3, { opacity: 0 })
            .from(this.postTitle, 1, { opacity: 0 }, "-=0.3")

        // 1. Create a Pixi renderer and define size and a background color
        const renderer = PIXI.autoDetectRenderer(256, 256, {

            // create transparent canvas
            transparent: true

        });
        // 2. Append canvas element to the body
        //document.body.appendChild(renderer.view);
        this.postContainer.appendChild(renderer.view);
        // console.log(renderer.view);

        // 3. Create a container that will hold your scene
        const stage = new PIXI.Container();

        // create a PIXI sprite from an image path
        const { cover } = this.props.post
        const hawaii = PIXI.Sprite.fromImage(cover.resize.src);


        stage.addChild(hawaii);
        console.log(stage);


        // Filter
        //const displacementTexture = PIXI.Texture.fromImage(textureB);
        const displacementTexture = PIXI.Texture.fromImage("http://i.imgur.com/2yYayZk.png");
        console.log(displacementTexture);
        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementTexture);
        console.log(displacementFilter);
        // Apply Filter
        stage.filters = [displacementFilter];

        // add stage to the canvas
        render();

        let count = 0.5;


        function render() {
            requestAnimationFrame(render);

            displacementFilter.scale.x = 5 * Math.sin(count * 1);
            displacementFilter.scale.y = 5 * Math.sin(count * 1.2);

            count += 0.05;

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
                <div ref={div => this.postImage = div}>
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