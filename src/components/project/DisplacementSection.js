import React from 'react'
import styled from 'styled-components'

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

function Image(props) {
    console.log(props)
    return (
        <>
            <div>Hello DisplacementSection</div>
            <img src={props.url1.resize.src} />
            <img src={props.url2.resize.src} />
            <img src={props.disp.resize.src} />
            <div>{props.intensity}</div>
        </>
    )
}

function DisplacementSection({ url1, url2, disp, intensity }) {
    return (
        <>
            <Grid>

                <Image
                    url1={url1}
                    url2={url2}
                    disp={disp}
                    intensity={intensity}
                />
            </Grid>
        </>
    )
}
export default DisplacementSection