import { styled } from "styled-components"
import useGetPostData from "../../../service/useGetPostData"
import MateCard from "./MateCard"
import SkeletonCard from "./SkeletonCard"
import Pagination from "../../common/Pagination"
import { useLocation } from "react-router-dom"
import { auth } from "../../../firebase/firebase"
import NullContent from "../PostingCommon/NullContent"

const MateCardList = ({ limit }: { limit: number }): JSX.Element => {
  const { pathname } = useLocation()
  const { loading, contentData, page, setPage } = useGetPostData("mate")
  const offset = (page - 1) * limit
  const userData = contentData?.filter((item) => item.nickname === auth.currentUser?.displayName)

  const cardListView = () => {
    const data = pathname === "/mypage" ? userData : contentData
    if (data === null || (Array.isArray(data) && data.length === 0)) {
      return <NullContent name="review" />
    } else if (data !== undefined) {
      return (
        <>
          <CardContainer>
            {data?.slice(offset, offset + limit).map((item) => (
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
          {pathname !== "/" && (
            <Pagination total={data.length} limit={limit} page={page} setPage={setPage} />
          )}
        </>
      )
    }
  }

  return (
    <>
      {loading ? (
        <CardContainer>
          {Array.from({ length: limit }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </CardContainer>
      ) : (
        <>{cardListView()}</>
      )}
    </>
  )
}

const CardContainer = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media ${(props) => props.theme.desktop} {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }
  @media ${(props) => props.theme.tablet} {
    margin-top: 16px;
  }
`

export default MateCardList
