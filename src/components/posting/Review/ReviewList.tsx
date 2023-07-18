import { styled } from "styled-components"
import useGetData from "../../../service/useGetData"
import ReviewItem from "./ReviewItem"
import SkeletonItem from "./SkeletonItem"
import NullContent from "../NullContent"

const ReviewList = ({ limit }: { limit: number }) => {
  const { loading, contentData, page } = useGetData("review")
  const offset = (page - 1) * limit

  return (
    <>
      {loading ? (
        <ListContainer>
          {Array.from({ length: limit }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </ListContainer>
      ) : contentData === null ? (
        <NullContent name="review" />
      ) : (
        <ListContainer>
          {contentData.slice(offset, offset + limit).map((item, index) => (
            <ReviewItem
              key={`Reivew_${index}`}
              state={item.state}
              title={item.title}
              nickname={item.nickname}
              people={item.people}
              createdTime={item.createdTime}
            />
          ))}
        </ListContainer>
      )}
    </>
  )
}

const ListContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`

export default ReviewList
