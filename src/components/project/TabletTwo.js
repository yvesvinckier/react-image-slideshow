import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const OuterWrapper = styled.div`
  position: relative;
`
const TabletBcg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30vh;
  background: rgb(28, 29, 28);
`

const TabletTwoWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  width: 100%;
  padding-bottom: 30vh;
  padding-top: 30px;
  background: rgb(28, 29, 28);
`
const TabletTwoTitleWrapper = styled.div`
  margin-left: 19.047619047619047%;
  width: 100%;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: 0 1 26.19047619047619%;
  }
  h2 {
    line-height: 1.25;
    font-size: 8.26vw;
    margin: 0;
    font-weight: 300;
    @media screen and (min-width: ${props => props.theme.responsive.small}) {
      font-size: 3.95vw;
    }
  }
`

const TabletTwoDescWrapper = styled.div`
  width: 100%;
  margin-left: 14.285714285714285%;
  font-size: 1.5625rem;
  line-height: 1.8;
  font-weight: 200;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    flex: 0 1 21.428571428571427%;
  }
`

function TabletTwo({ tabletTwo, tabletTwoTitle, tabletTwoDesc }) {
  return (
    <>
      <OuterWrapper>
        <TabletBcg />
        <Img
          fluid={tabletTwo.fluid}
          alt={tabletTwo.title}
          title={tabletTwo.title}
          backgroundColor={'#212121'}
        />
      </OuterWrapper>
      <TabletTwoWrapper>
        <TabletTwoTitleWrapper>
          <h2>{tabletTwoTitle}</h2>
        </TabletTwoTitleWrapper>
        <TabletTwoDescWrapper
          dangerouslySetInnerHTML={{
            __html: tabletTwoDesc.childMarkdownRemark.html,
          }}
        />
      </TabletTwoWrapper>
    </>
  )
}
export default TabletTwo
