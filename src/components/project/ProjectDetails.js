import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  padding: 1rem 0 2rem 0;
  font-size: 1em;
  line-height: 1.6;
  background: white;
  color: black;
  width: 100%;
  height: 100vh;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    font-size: 1.1em;
    line-height: 1.5;
  }
`

const ProjectDetails = props => {
  return (
    <Description
      dangerouslySetInnerHTML={{
        __html: props.description.childMarkdownRemark.html,
      }}
    />
  )
}
export default ProjectDetails
