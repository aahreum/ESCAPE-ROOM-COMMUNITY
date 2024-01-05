import { styled } from "styled-components"
import MainContainer from "../components/common/MainContainer"
import Title from "../components/common/Title"
import MateCardList from "../components/posting/Mate/MateCardList"
import { Link } from "react-router-dom"
import ReviewList from "../components/posting/Review/ReviewList"

const Index = (): JSX.Element => {
  const limit = 3

  return (
    <MainContainer>
      <Mate>
        <Title>같이 탈출할 사람 구해요!😆</Title>
        <ContentContainer>
          <MateCardList limit={limit} />
          <ViewMoreButton to={"/mate"}>더보기→</ViewMoreButton>
        </ContentContainer>
      </Mate>
      <Review>
        <Title>탈출후기!🥳</Title>
        <ContentContainer>
          <ReviewList limit={limit} />
          <ViewMoreButton to={"/review"}>더보기→</ViewMoreButton>
        </ContentContainer>
      </Review>
    </MainContainer>
  )
}

const Mate = styled.section`
  margin-bottom: 72px;
`
const Review = styled.section``

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 32px;
`
const ViewMoreButton = styled(Link)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 4px;

  width: 162px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-gray-600);
  border: 1px solid var(--color-gray-100);
  border-radius: 8px;
`

export default Index
