import useGetData from "../service/useGetData"
import MainContainer from "../components/common/MainContainer"
import TitleContainer from "../components/posting/TitleContainer"
import Pagination from "../components/common/Pagination"
import ReviewList from "../components/posting/Review/ReviewList"

const Review = (): JSX.Element => {
  const { contentData, setPage, page } = useGetData("reivew")
  const limit = 5

  return (
    <MainContainer>
      <TitleContainer content={contentData} />
      <ReviewList limit={limit} />
      {contentData !== null && (
        <Pagination total={contentData.length} limit={limit} page={page} setPage={setPage} />
      )}
    </MainContainer>
  )
}

export default Review
