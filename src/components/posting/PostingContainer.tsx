import { ReactNode } from "react"
import { styled } from "styled-components"

const PostingContainer = ({ children }: { children: ReactNode }): JSX.Element => {
  return <PostingContainerEl>{children}</PostingContainerEl>
}

const PostingContainerEl = styled.div`
  margin: 60px auto 40px;
  max-width: 1048px;
  padding: 0 24px;

  @media ${(props) => props.theme.tablet} {
    margin-top: 32px;
  }
`

export default PostingContainer
