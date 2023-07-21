import MainContainer from "../components/common/MainContainer"
import TitleContainer from "../components/posting/TitleContainer"
import useGetPostData from "../service/useGetPostData"
import MateCardList from "../components/posting/Mate/MateCardList"

const Mate = (): JSX.Element => {
  const { contentData } = useGetPostData("mate")
  const limit = 6

  return (
    <MainContainer>
      <TitleContainer content={contentData} />
      <MateCardList limit={limit} />
    </MainContainer>
  )
}

export default Mate
