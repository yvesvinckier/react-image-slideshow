import React from 'react'
import { Link } from 'gatsby'
import { useSpring, animated } from 'react-spring'

const Menu = ({ opened }) => {
  const MenuAnimation = useSpring({
    transform: opened
      ? `translate3d(0,0,0) scale(1)`
      : `translate3d(100%,0,0) scale(0.6)`,
  })
  return (
    <animated.div style={MenuAnimation}>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/galeries/">Galeries</Link>
        </li>
        <li>
          <Link to="/contact/">Contact</Link>
        </li>
      </nav>
    </animated.div>
  )
}

export default Menu
