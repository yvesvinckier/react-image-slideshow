import React from 'react'
import { Sprite } from 'react-pixi-fiber'
import * as PIXI from 'pixi.js'

// const bunny = 'https://i.imgur.com/IaUrttj.png'
const centerAnchor = new PIXI.Point(0.5, 0.5)

function Bunny(props) {
  const CoverImage = props.post.cover.resize.src
  console.log(CoverImage)
  return (
    <Sprite
      anchor={centerAnchor}
      texture={PIXI.Texture.fromImage(CoverImage)}
      {...props}
    />
  )
}

export default Bunny
