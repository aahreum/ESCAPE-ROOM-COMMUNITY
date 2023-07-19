import { useLocation, useParams } from "react-router-dom"
import useGetData from "../service/useGetData"
import NotFound from "./NotFound"
import ContentView from "../components/posting/PostingView/ContentView"
import { collection, doc, runTransaction } from "firebase/firestore"
import { db } from "../firebase/firebase"

const DetailView = (): JSX.Element => {
  const { id } = useParams()
  const { pathname } = useLocation()

  const { contentData, loading } = useGetData(pathname.includes("/mate/") ? "mate" : "review")
  const content = contentData?.find((contentData) => {
    return contentData.id === id
  })

  if (loading) {
    return <div>로딩중</div>
  }

  return (
    <>
      {!content ? (
        <NotFound />
      ) : (
        <>
          <ContentView
            id={content.id}
            state={content.state}
            title={content.title}
            content={content.content}
            nickname={content.nickname}
            people={content.people}
            createdTime={content.createdTime}
            views={content.views}
          />
        </>
      )}
    </>
  )
}

export default DetailView
