import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div className="header">
    <h2 className="andy">
      <Link to="/">{siteTitle}</Link>
    </h2>
    <div className="all_works point">
      <span>
        <Link to="/">All Works</Link>
      </span>
      <div className="trait1" />
      <div className="trait2" />
    </div>
  </div>
)

export default Header
