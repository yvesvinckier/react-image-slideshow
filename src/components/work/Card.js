import React, { useRef } from 'react'
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function Card({ children }) {
    // We add this ref to card element and use in onMouseMove event ...
    // ... to get element's offset and dimensions.
    const ref = useRef();

    // Keep track of whether card is hovered so we can increment ...
    // ... zIndex to ensure it shows up above other cards when animation causes overlap.

    const [animatedProps, setAnimatedProps] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))

    return (
        <animated.div
            ref={ref}
            className="card"
            onMouseMove={({ clientX: x, clientY: y }) => setAnimatedProps({ xys: calc(x, y) })}
            onMouseLeave={() => setAnimatedProps({ xys: [0, 0, 1] })}
            style={{ transform: animatedProps.xys.interpolate(trans) }}
        >
            {children}
        </animated.div>
    );
}

export default Card