import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image'

const Slider = ({ post }) => {
    const { index, title, cover } = post;
    return (
        <div id={`card-${index}`} className="card">
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

Slider.propTypes = {
    post: PropTypes.object.isRequired
}

export default Slider;