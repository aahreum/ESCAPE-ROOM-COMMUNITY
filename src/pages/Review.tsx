import useGetPostData from "../service/useGetPostData"
import MainContainer from "../components/common/MainContainer"
import TitleContainer from "../components/posting/TitleContainer"
import ReviewList from "../components/posting/Review/ReviewList"

const Review = (): JSX.Element => {
  const { contentData } = useGetPostData("review")
  const limit = 5

  return (
    <MainContainer>
      <TitleContainer content={contentData} />
      <ReviewList limit={limit} />
    </MainContainer>
  )
}

export default Review
