import { styled } from "styled-components"
import useGetPostData, { DataType } from "../../service/useGetPostData"
import SkeletonItem from "../posting/Review/SkeletonItem"
import EmptySearchResult from "./EmptySearchResult"
import ReviewItem from "../posting/Review/ReviewItem"
import Pagination from "../common/Pagination"
import useSearch from "../../service/useSearch"

const ReviewSearchList = ({ limit }: { limit: number }): JSX.Element => {
  const { loading, contentData, page, setPage } = useGetPostData("review")
  const offset = (page - 1) * limit
  const { searchQuery } = useSearch()
  const searchResults = contentData?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      {loading ? (
        <ListContainer>
          {Array.from({ length: limit }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </ListContainer>
      ) : (
        <>
          {searchResults && searchResults.length > 0 ? (
            <>
              <ListContainer>
                {searchResults.slice(offset, offset + limit).map((item: DataType) => (
                  <ReviewItem
                    id={item.id}
                    key={item.id}
                    state={item.state}
                    title={item.title}
                    nickname={item.nickname}
                    people={item.people}
                    createdTime={item.createdTime}
                  />
                ))}
              </ListContainer>
              <Pagination
                total={searchResults.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </>
          ) : (
            <EmptySearchResult />
          )}
        </>
      )}
    </>
  )
}

const ListContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.desktop} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.tablet} {
    margin-top: 16px;
  }
`

export default ReviewSearchList
