import { useParams } from "react-router-dom"
import useGetData from "../service/useGetData"
import NotFound from "./NotFound"
import ContentView from "../components/posting/PostingView/ContentView"
import useContentNameChange from "../service/useContentNameChange"

const DetailView = (): JSX.Element => {
  const { id } = useParams()
  const { getDataNameChange } = useContentNameChange()

  const { contentData, loading } = useGetData(getDataNameChange())
  const data = contentData?.find((contentData) => {
    return contentData.id === id
  })

  if (loading) {
    return <div>로딩중</div>
  }

  return (
    <>
      {!data ? (
        <NotFound />
      ) : (
        <>
          <ContentView
            id={data.id}
            state={data.state}
            title={data.title}
            content={data.content}
            nickname={data.nickname}
            people={data.people}
            createdTime={data.createdTime}
            views={data.views}
          />
        </>
      )}
    </>
  )
}

export default DetailView
