import MainContainer from "../components/common/MainContainer"
import { styled } from "styled-components"
import { MATE_LIMIT, REVIEW_LIMIT } from "../constants/listLimitView"
import MateSearchList from "../components/posting/search/MateSearchList"
import ReviewSearchList from "../components/posting/search/ReviewSearchList"
import useSearch from "../service/useSearch"

const SearchView = () => {
  const { searchQuery } = useSearch()

  return (
    <MainContainer>
      <SearchResults>
        <span>'{searchQuery}'</span>에 해당하는 검색결과
      </SearchResults>
      <SearchResultsList>
        <ContentArea>
          <p>메이트구하기</p>
          <MateSearchList limit={MATE_LIMIT} />
        </ContentArea>
        <ContentArea>
          <p>탈출후기</p>
          <ReviewSearchList limit={REVIEW_LIMIT} />
        </ContentArea>
      </SearchResultsList>
    </MainContainer>
  )
}

const SearchResults = styled.div`
  padding: 40px 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  font-size: 20px;
  background-color: var(--color-gray-600);

  > span {
    color: var(--color-primary-500);
    font-weight: 700;
  }
`

const SearchResultsList = styled.section`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const ContentArea = styled.div`
  > p {
    font-size: 22px;
    font-weight: 700;
  }
`

export default SearchView
