import { styled } from "styled-components"
import useGetPostData from "../../../service/useGetPostData"
import ReviewItem from "./ReviewItem"
import SkeletonItem from "./SkeletonItem"
import NullContent from "../NullContent"
import Pagination from "../../common/Pagination"
import { useLocation } from "react-router-dom"
import { auth } from "../../../firebase/firebase"

const ReviewList = ({ limit }: { limit: number }): JSX.Element => {
  const { pathname } = useLocation()
  const { loading, contentData, page, setPage } = useGetPostData("review")
  const offset = (page - 1) * limit
  const userData = contentData?.filter((item) => item.nickname === auth.currentUser?.displayName)

  const ReviewListView = () => {
    const data = pathname === "/mypage" ? userData : contentData
    if (data === null || (Array.isArray(data) && data.length === 0)) {
      return <NullContent name="review" />
    } else if (data !== undefined) {
      return (
        <>
          <ListContainer>
            {data?.slice(offset, offset + limit).map((item) => (
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
        <ListContainer>
          {Array.from({ length: limit }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </ListContainer>
      ) : (
        <>{ReviewListView()}</>
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

export default ReviewList
