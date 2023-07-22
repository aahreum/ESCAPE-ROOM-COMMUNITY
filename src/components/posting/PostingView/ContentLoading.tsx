import { styled } from "styled-components"
import PostingContainer from "../PostingContainer"

const ContentLoading = () => {
  return (
    <PostingContainer>
      <TitleArea>
        <div />
        <div />
        <div />
      </TitleArea>
      <ContentArea>
        <div />
      </ContentArea>
    </PostingContainer>
  )
}

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > div {
    height: 30px;
    border-radius: 8px;
    background-color: var(--color-gray-600);
  }

  > div:first-child {
    width: 80px;
  }
`

const ContentArea = styled.div`
  margin-top: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--color-gray-300);
  border-bottom: 1px solid var(--color-gray-300);

  > div {
    height: 300px;
    border-radius: 8px;
    background-color: var(--color-gray-600);
  }
`

export default ContentLoading
