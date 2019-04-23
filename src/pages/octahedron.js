import * as THREE from 'three'
import React from 'react'
import { Canvas } from 'react-three-fiber'
import styled from 'styled-components'

import Layout from '../components/general/layout'

const Wrapper = styled.div`
position: relative;
`

function Octahedron() {
    const vertices = [[-1, 0, 0], [0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]]
    return (
        <group ref={ref => console.log('we have access to the instance')}>
            <line>
                <geometry
                    attach="geometry"
                    vertices={vertices.map(v => new THREE.Vector3(...v))}
                    onUpdate={self => (self.verticesNeedUpdate = true)}
                />
                <lineBasicMaterial attach="material" color="white" />
            </line>
            <mesh onClick={e => console.log('click')} onPointerOver={e => console.log('hover')} onPointerOut={e => console.log('unhover')}>
                <octahedronGeometry attach="geometry" />
                <meshBasicMaterial attach="material" color="peachpuff" opacity={0.5} transparent />
            </mesh>
        </group>
    )
}

function OctahedronPage() {
    return (
        <Layout>
            < Wrapper>
                <Canvas>
                    <Octahedron />
                </Canvas>
            </ Wrapper>
        </Layout>
    )
}

export default OctahedronPage