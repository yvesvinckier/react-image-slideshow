import React from 'react'
import styled from 'styled-components'
import BgImg from '../general/Background'
import { Link } from 'gatsby'

const PostPreview = styled.div`
  position: relative;
  width: 100%;
    .footer-next-image {
      min-height: 200px;
      max-height: 90vh;
        &::after {
            content: '';
            position: absolute;
            background: rgba(0, 0, 0, 0.3);
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transition: background-color 0.5s;
        }
    }
`

const FooterLinkOuterWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    h2 {
        font-size: 1.3em;
        line-height: 1.25;
        font-weight: 700;
    }
    h3 {
        line-height: 1.25;
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 3.95vw;
        font-weight: 200;
    }
    a {
        padding: 20px 0;
        display:flex;
        align-items: center;
        font-size: .875rem;
        line-height: 1.8;
        text-decoration: none;
        cursor: pointer;
        font-weight: 300;
        .footer-link-icon {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 1px solid hsla(0,0%,100%,.3);
            margin-left: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`

const FooterLinkInnerWrapper = styled.div`
    position: relative;
    width: 38.095238095238095%;
    margin-left: 14.285714285714285%;
`

const FooterLink = ({ postIndex, topic }) => {
    return (
        <>
            {postIndex.next && (
                <PostPreview>
                    <FooterLinkOuterWrapper>
                        <FooterLinkInnerWrapper>
                            <h2>{postIndex.next.title}</h2>
                            <h3>{postIndex.next.topic}</h3>
                            <Link to={'/' + postIndex.next.slug + '/'}>
                                <span> See the case</span>
                                <div className="footer-link-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 8" width="14" height="12.6" className="js-magnetic-content"><path fill="white" fillRule="evenodd" d="M-.005 3.298h14.827c-.714-1.301-1.071-2.149-1.107-3.304 1.626 1.992 3.737 3.029 6.29 4.006-2.553.934-4.572 2.073-6.29 4.005.11-1.256.405-2.015 1.129-3.395H-.005V3.298z" /></svg>

                                </div>
                            </Link>
                        </FooterLinkInnerWrapper>
                    </FooterLinkOuterWrapper>
                    <BgImg
                        className="footer-next-image"
                        height={'90vh'}
                        fluid={postIndex.next.cover.fluid}
                        alt={postIndex.next.cover.title}
                        title={postIndex.next.cover.title}
                        backgroundColor={'#ffffff'}
                    />

                </PostPreview>
            )}
        </>


    )
}

export default FooterLink