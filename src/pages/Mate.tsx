import MainContainer from "../components/common/MainContainer"
import TitleContainer from "../components/posting/TitleContainer"
import useGetData from "../service/useGetData"
import MateCardList from "../components/posting/Mate/MateCardList"
import Pagination from "../components/common/Pagination"

const Mate = (): JSX.Element => {
  const { contentData, setPage, page } = useGetData("mate")
  const limit = 6

  return (
    <MainContainer>
      <TitleContainer content={contentData} />
      <MateCardList limit={limit} />
      {contentData !== null && (
        <Pagination total={contentData.length} limit={limit} page={page} setPage={setPage} />
      )}
    </MainContainer>
  )
}

export default Mate
