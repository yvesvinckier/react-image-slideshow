import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'

const Outer = styled.div`
  .inner_h2 {
    position: absolute;
    margin: 20px 0 0 -3px;
    color: #fff;
    h2 {
      font-weight: 300;
      font-size: 9.16vw;
      line-height: 100px;
      @media screen and (min-width: ${props => props.theme.responsive.small}) {
        line-height: 8vw;
      }
    }
  }
`

const TitleTransition = ({ title, slug }) => {
    const transition = useTransition({
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })
    return (
        <Outer>
            <Link to={`/${slug}/`} className="inner_h2">
                {transition.map(
                    ({ item, key, props }) =>
                        item && (
                            <animated.h2 className="title" key={key} style={props}>
                                {title}
                            </animated.h2>
                        )
                )}
            </Link>
        </Outer>

    )
}

export default TitleTransition