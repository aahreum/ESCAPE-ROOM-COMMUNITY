import { styled } from "styled-components"
import useGetData from "../../../service/useGetData"
import MateCard from "./MateCard"
import NullContent from "../NullContent"
import SkeletonCard from "./SkeletonCard"

const MateCardList = ({ limit }: { limit: number }) => {
  const { loading, contentData, page } = useGetData("mate")
  const offset = (page - 1) * limit

  return (
    <>
      {loading ? (
        <CardContainer>
          {Array.from({ length: limit }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </CardContainer>
      ) : contentData === null ? (
        <NullContent name={"mate"} />
      ) : (
        <CardContainer>
          {contentData.slice(offset, offset + limit).map((item, index) => (
            <MateCard
              key={`mate_${index}`}
              state={item.state}
              title={item.title}
              nickname={item.nickname}
              people={item.people}
              createdTime={item.createdTime}
            />
          ))}
        </CardContainer>
      )}
    </>
  )
}

const CardContainer = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

export default MateCardList
