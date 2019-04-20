import React, { useState, useCallback, useMemo } from 'react'
import * as THREE from 'three'
import { XFadeShader } from '../shaders/XFaderShader'
import { useSpring, animated as anim } from 'react-spring/three'

import { Canvas } from 'react-three-fiber'

import Layout from '../components/general/layout'

import img1 from '../img/Img1.jpg'
import img2 from '../img/Img2.jpg'
import disp from '../img/displacement/10.jpg'

function Image({ url1, url2, disp, ...props }) {
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])
  const { progress } = useSpring({ progress: hovered ? 1 : 0 })
  const [texture1, texture2, dispTexture] = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return [loader.load(url1), loader.load(url2), loader.load(disp)]
  }, [url1, url2, disp])
  return (
    <mesh {...props} onHover={hover} onUnhover={unhover}>
      <planeBufferGeometry name="geometry" args={[5, 5]} />
      <anim.shaderMaterial
        name="material"
        args={[XFadeShader]}
        uniforms-texture-value={texture1}
        uniforms-texture2-value={texture2}
        uniforms-disp-value={dispTexture}
        uniforms-dispFactor-value={progress}
      />
    </mesh>
  )
}

function TestPage() {
  return (
    <Layout>
      <Canvas className="canvas">
        <Image url1={img1} url2={img2} disp={disp} />
      </Canvas>
    </Layout>
  )
}

export default TestPage
