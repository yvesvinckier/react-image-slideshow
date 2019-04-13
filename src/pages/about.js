import React, { useState, useCallback } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three/src/Three'
import data from '../components/data'

const loader = new THREE.TextureLoader()

function ImageWebgl() {
  return console.log(loader), null
}

function Image(props) {
  // the setHover function update the hovered vlue and the initial value is false
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])

  return (
    <div
      className="item"
      onMouseEnter={hover}
      onMouseLeave={unhover}
      onTouchStart={hover}
      onTouchEnd={unhover}
      onTouchCancel={unhover}
    >
      <Canvas
        className="canvas"
        invalidateFrameloop
        props={{ antialias: false, stencil: false }}
      >
        <ImageWebgl {...props} hovered={hovered} />
      </Canvas>
      <img src={props.url1} />
    </div>
  )
}

const AboutPage = () => (
  <div className="grid">
    {data.map(([url1, url2, disp, intensity], index) => (
      <Image
        key={index}
        url1={url1}
        url2={url2}
        disp={disp}
        intensity={intensity}
      />
    ))}
  </div>
)

export default AboutPage
