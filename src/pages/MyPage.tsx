import { styled } from "styled-components"
import MainContainer from "../components/common/MainContainer"
import Title from "../components/common/Title"
import { auth } from "../firebase/firebase"
import MateCardList from "../components/posting/Mate/MateCardList"
import ReviewList from "../components/posting/Review/ReviewList"

const MyPage = (): JSX.Element => {
  const mateLimit = 6
  const ReviewLimit = 5

  return (
    <MainContainer>
      <Title>
        {auth.currentUser?.displayName} <Light>님이 작성한 글 보기</Light>
      </Title>
      <ContentArea>
        <div>
          <ContentTitle>메이트 구하기</ContentTitle>
          <MateCardList limit={mateLimit} />
        </div>
        <div>
          <ContentTitle>탈출후기</ContentTitle>
          <ReviewList limit={ReviewLimit} />
        </div>
      </ContentArea>
    </MainContainer>
  )
}

const Light = styled.span`
  font-weight: 300;
`

const ContentTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
`

const ContentArea = styled.section`
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  gap: 80px;
`

export default MyPage
