import React, { useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring';

function Card({ children }) {
    // We add this ref to card element and use in onMouseMove event ...
    // ... to get element's offset and dimensions.
    const ref = useRef()
    // Keep track of whether card is hovered so we can increment ...
    // ... zIndex to ensure it shows up above other cards when animation causes overlap.
    const [isHovered, setHovered] = useState(false)

    const [animatedProps, setAnimatedProps] = useSpring({
        // Array containing [rotateX, rotateY, and scale] values.
        // We store under a single key (xys) instead of separate keys ...
        // ... so that we can use animatedProps.xys.interpolate() to ...
        // ... easily generate the css transform value below.
        xys: [0, 0, 1],
        // Setup physics
        config: { mass: 10, tension: 400, friction: 30, precision: 0.00001 }
    })

    return (
        <animated.div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={({ clientX, clientY }) => {
                console.log(clientX, clientY)
            }}
        >
            {children}
        </animated.div>
    )
}

export default Card