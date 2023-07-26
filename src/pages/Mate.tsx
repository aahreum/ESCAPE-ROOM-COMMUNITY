import MainContainer from "../components/common/MainContainer"
import useGetPostData from "../service/useGetPostData"
import MateCardList from "../components/posting/Mate/MateCardList"
import TitleArea from "../components/posting/PostingCommon/TitleArea"


const Mate = (): JSX.Element => {
  const { contentData } = useGetPostData("mate")
  const limit = 6

  return (
    <MainContainer>
      <TitleArea content={contentData} />
      <MateCardList limit={limit} />
    </MainContainer>
  )
}

export default Mate
