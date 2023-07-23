import { styled } from "styled-components"
import useGetPostData, { DataType } from "../../../service/useGetPostData"
import Pagination from "../../common/Pagination"
import MateCard from "../Mate/MateCard"
import SkeletonCard from "../Mate/SkeletonCard"
import EmptySearchResult from "./EmptySearchResult"
import useSearch from "../../../service/useSearch"

const MateSearchList = ({ limit }: { limit: number }): JSX.Element => {
  const { loading, contentData, page, setPage } = useGetPostData("mate")
  const offset = (page - 1) * limit
  const { searchQuery } = useSearch()
  const searchResults = contentData?.filter((item) => item.title.includes(searchQuery))

  return (
    <>
      {loading ? (
        <CardContainer>
          {Array.from({ length: limit }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </CardContainer>
      ) : (
        <>
          {searchResults && searchResults.length > 0 ? (
            <>
              <CardContainer>
                {searchResults.slice(offset, offset + limit).map((item: DataType) => (
                  <MateCard
                    id={item.id}
                    key={item.id}
                    state={item.state}
                    title={item.title}
                    nickname={item.nickname}
                    people={item.people}
                    createdTime={item.createdTime}
                  />
                ))}
              </CardContainer>
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

const CardContainer = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

export default MateSearchList
