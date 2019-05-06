import React, { useState } from 'react'
import Hamburger from './Hamburger'

function Nav() {
  const [opened, setOpened] = useState(false)

  const toggle = () => {
    setOpened(!opened)
  }

  return (
    <header>
      <Hamburger opened={opened} toggle={toggle} />
    </header>
  )
}
export default Nav
