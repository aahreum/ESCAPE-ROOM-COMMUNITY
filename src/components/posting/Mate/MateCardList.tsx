import { styled } from "styled-components"
import useGetPostData, { DataType } from "../../../service/useGetPostData"
import MateCard from "./MateCard"
import NullContent from "../NullContent"
import SkeletonCard from "./SkeletonCard"
import Pagination from "../../common/Pagination"
import { useLocation } from "react-router-dom"
import { auth } from "../../../firebase/firebase"

const MateCardList = ({ limit }: { limit: number }): JSX.Element => {
  const { pathname } = useLocation()
  const { loading, contentData, page, setPage } = useGetPostData("mate")
  const offset = (page - 1) * limit
  const userData = contentData?.filter((item) => item.nickname === auth.currentUser?.displayName)

  const cardListView = () => {
    if (pathname === "/mypage") {
      return userData
        ?.slice(offset, offset + limit)
        .map((item: DataType) => (
          <MateCard
            id={item.id}
            key={item.id}
            state={item.state}
            title={item.title}
            nickname={item.nickname}
            people={item.people}
            createdTime={item.createdTime}
          />
        ))
    } else {
      return contentData
        ?.slice(offset, offset + limit)
        .map((item: DataType) => (
          <MateCard
            id={item.id}
            key={item.id}
            state={item.state}
            title={item.title}
            nickname={item.nickname}
            people={item.people}
            createdTime={item.createdTime}
          />
        ))
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
      ) : contentData === null || userData?.length === 0 ? (
        <NullContent name={"mate"} />
      ) : (
        <>
          <CardContainer>{cardListView()}</CardContainer>
          {pathname === "/" ? null : (
            <Pagination total={contentData.length} limit={limit} page={page} setPage={setPage} />
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
