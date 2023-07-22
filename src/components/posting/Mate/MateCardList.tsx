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
        <>
          <CardContainer className={`${pathname === "/mypage" && "mypage"}`}>
            {pathname === "/mypage"
              ? contentData
                  .filter((item) => item.nickname === auth.currentUser?.displayName)
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
              : contentData
                  .slice(offset, offset + limit)
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
                  ))}
          </CardContainer>
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
`

export default MateCardList
