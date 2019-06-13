import React, { useState, useCallback, useMemo } from 'react'
import * as THREE from 'three/src/Three'
import styled from 'styled-components'
import Layout from '../components/general/layout'

import { vertexShader, fragmentShader } from '../shaders/XFadeShader2'

import { Canvas, useThree } from 'react-three-fiber'
import { useSpring, animated } from 'react-spring/three'

import data from '../components/data'

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  .item {
    position: relative;
    width: 100vw;
    height: 100vw;
    @media screen and (min-width: ${props => props.theme.responsive.small}) {
      width: 50vw;
      height: 50vw;
    }
  }
`

const loader = new THREE.TextureLoader()

function ImageWebgl({ url1, url2, disp, intensity, hovered }) {
  const { progress } = useSpring({ progress: hovered ? 1 : 0 })
  const { invalidate } = useThree()
  const args = useMemo(() => {
    const texture1 = loader.load(url1, invalidate)
    const texture2 = loader.load(url2, invalidate)
    const dispTexture = loader.load(disp, invalidate)

    dispTexture.wrapS = dispTexture.wrapT = THREE.RepeatWrapping
    texture1.magFilter = texture2.magFilter = THREE.LinearFilter
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter

    return {
      uniforms: {
        effectFactor: { type: 'f', value: intensity },
        dispFactor: { type: 'f', value: 0 },
        texture: { type: 't', value: texture1 },
        texture2: { type: 't', value: texture2 },
        disp: { type: 't', value: dispTexture },
      },
      vertexShader,
      fragmentShader,
    }
  }, [url1, url2, disp, intensity, invalidate])

  return (
    <mesh>
      <planeBufferGeometry name="geometry" args={[8, 8]} />
      <animated.shaderMaterial
        name="material"
        args={[args]}
        uniforms-dispFactor-value={progress}
      />
    </mesh>
  )
}

function Image(props) {
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
    </div>
  )
}

function AboutPage() {

  return (
    <Layout>
      <Grid>
        {data.map(([url1, url2, disp, intensity], index) => (
          <Image
            key={index}
            url1={url1}
            url2={url2}
            disp={disp}
            intensity={intensity}
          />
        ))}
      </Grid>
    </Layout>
  )
}

export default AboutPage
