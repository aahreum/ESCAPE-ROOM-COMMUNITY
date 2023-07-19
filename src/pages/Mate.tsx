import MainContainer from "../components/common/MainContainer"
import TitleContainer from "../components/posting/TitleContainer"
import useGetData from "../service/useGetData"
import MateCardList from "../components/posting/Mate/MateCardList"

const Mate = (): JSX.Element => {
  const { contentData } = useGetData("mate")
  const limit = 6

  return (
    <MainContainer>
      <TitleContainer content={contentData} />
      <MateCardList limit={limit} />
    </MainContainer>
  )
}

export default Mate
