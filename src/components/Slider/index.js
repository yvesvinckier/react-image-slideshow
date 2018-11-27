import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image'

const Slider = ({ post }) => {
    const { cover, title, index } = post.node;
    // console.log(post);
    return (
        <div id={`card-${index}`} className="card">
            <span className="index">{index + 1}</span>
            <Img
                sizes={cover.sizes}
                alt={cover.title}
                title={cover.title}
                backgroundColor={'#f1f1f1'}
            />
            <div className="details">
                <span className="index"></span>
                <p className="location">
                    {title}
                </p>
            </div>
        </div>
    )
}

Slider.propTypes = {
    post: PropTypes.object.isRequired
}

export default Slider;