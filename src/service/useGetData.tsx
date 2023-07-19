import { Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/firebase"

export interface listDataType {
  id: string
  title: string
  createdTime: Timestamp
  nickname: string
  people: string
  state: string
}

export interface DataType extends listDataType {
  content: string
  views: number
}

const useGetData = (name: string) => {
  const [loading, setLoading] = useState(true)
  const [contentData, setContentData] = useState<DataType[] | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const contentName = () => {
      if (name === "mate") return collection(db, "mateContents")
      else return collection(db, "reviewContents")
    }

    const collectionRef = contentName()
    const q = query(collectionRef, orderBy("createdTime", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setContentData(null)
        setLoading(false)
      } else {
        const data: DataType[] = []
        snapshot.forEach((doc) => {
          const item = doc.data() as DataType
          item.id = doc.id
          data.push(item)
        })
        setContentData(data)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [name])

  return { loading, setLoading, contentData, setContentData, page, setPage }
}

export default useGetData
