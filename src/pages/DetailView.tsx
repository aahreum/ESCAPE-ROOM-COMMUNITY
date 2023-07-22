import { useParams } from "react-router-dom"
import useGetPostData from "../service/useGetPostData"
import NotFound from "./NotFound"
import ContentView from "../components/posting/PostingView/ContentView"
import useContentNameChange from "../service/useContentNameChange"
import Comments from "../components/posting/Comments/Comments"
import PostingContainer from "../components/posting/PostingContainer"
import ContentLoading from "../components/posting/PostingView/ContentLoading"

const DetailView = (): JSX.Element => {
  const { id } = useParams()
  const { getDataNameChange } = useContentNameChange()

  const { contentData, loading } = useGetPostData(getDataNameChange())
  const data = contentData?.find((contentData) => {
    return contentData.id === id
  })

  if (loading) {
    return <ContentLoading />
  }

  return (
    <>
      {!data ? (
        <NotFound />
      ) : (
        <PostingContainer>
          <ContentView
            id={data.id}
            state={data.state}
            title={data.title}
            content={data.content}
            nickname={data.nickname}
            people={data.people}
            createdTime={data.createdTime}
          />
          <Comments postId={data.id} />
        </PostingContainer>
      )}
    </>
  )
}

export default DetailView
