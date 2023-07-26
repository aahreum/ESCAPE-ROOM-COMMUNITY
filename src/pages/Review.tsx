import useGetPostData from "../service/useGetPostData"
import MainContainer from "../components/common/MainContainer"
import ReviewList from "../components/posting/Review/ReviewList"
import TitleArea from "../components/posting/PostingCommon/TitleArea"

const Review = (): JSX.Element => {
  const { contentData } = useGetPostData("review")
  const limit = 5

  return (
    <MainContainer>
      <TitleArea content={contentData} />
      <ReviewList limit={limit} />
    </MainContainer>
  )
}

export default Review
