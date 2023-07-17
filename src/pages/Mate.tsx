import { styled } from "styled-components"
import { useEffect, useState } from "react"
import { Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebase/firebase"
import MainContainer from "../components/common/MainContainer"
import MateCard from "../components/posting/Card/MateCard"
import TitleContainer from "../components/posting/TitleContainer"
import Pagination from "../components/common/Pagination"
import NullContent from "../components/posting/NullContent"
import SkeletonCard from "../components/posting/Card/SkeletonCard"

export interface DataType {
  title: string
  createdTime: Timestamp
  content: string
  nickname: string
  people: string
  state: string
}
const Mate = (): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [contentData, setContentData] = useState<DataType[] | null>(null)
  const [page, setPage] = useState(1)
  const limit = 6
  const offset = (page - 1) * limit

  useEffect(() => {
    const collectionRef = collection(db, "mateContents")
    const q = query(collectionRef, orderBy("createdTime", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setContentData(null)
        setLoading(false)
      } else {
        const data: DataType[] = []
        snapshot.forEach((doc) => {
          const item = doc.data() as DataType
          data.push(item)
        })
        setContentData(data)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <MainContainer>
      <TitleContainer content={contentData} />
      {loading ? (
        <CardContainer>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </CardContainer>
      ) : contentData === null ? (
        <NullContent />
      ) : (
        <>
          <CardContainer>
            {contentData.slice(offset, offset + limit).map((item, index) => (
              <MateCard
                key={`mateCard_${index}`}
                badgeText={item.state}
                listTitle={item.title}
                nickname={item.nickname}
                people={item.people}
                timestamp={item.createdTime}
              />
            ))}
          </CardContainer>
          <Pagination total={contentData.length} limit={limit} page={page} setPage={setPage} />
        </>
      )}
    </MainContainer>
  )
}

const CardContainer = styled.div`
  margin: 32px 0 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

export default Mate
