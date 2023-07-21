import { Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore"
import usePathname from "./usePathname"
import { useEffect, useState } from "react"
import { CommentsProps } from "../components/posting/Comments/Comments"
import { db } from "../firebase/firebase"

export interface CommentDataType {
  id: string
  comment: string
  nickname: string
  createdTime: Timestamp
}

const useGetCommentsData = ({ postId }: CommentsProps) => {
  const { includesMateSlash } = usePathname()
  const [loading, setLoading] = useState(true)
  const [commentsData, setCommentsData] = useState<CommentDataType[] | null>(null)
  const [commentSize, setCommentSize] = useState(0)

  useEffect(() => {
    const postCollectionName = () => {
      if (includesMateSlash) return "mateContents"
      else return "reviewContents"
    }

    const commentsRef = collection(db, postCollectionName(), postId, "comments")
    const q = query(commentsRef, orderBy("createdTime", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setCommentsData(null)
        setLoading(false)
        setCommentSize(snapshot.size)
      } else {
        setCommentSize(snapshot.size)
        const commentData: CommentDataType[] = []
        snapshot.forEach((doc) => {
          const item = doc.data() as CommentDataType
          item.id = doc.id
          commentData.push(item)
        })
        setCommentsData(commentData)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [includesMateSlash, postId])

  return { loading, commentsData, commentSize }
}

export default useGetCommentsData
