import { doc, increment, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { db } from "../../../firebase/firestore"

interface IncreaseViewsProps {
  collectionName: string
  postId: string
}

const IncreaseViews = ({ collectionName, postId }: IncreaseViewsProps) => {
  const [views, setViews] = useState(0)
  const [isViewedToday, setIsViewedToday] = useState(false)

  const handleIncreaseViews = async () => {
    const postRef = doc(db, collectionName, postId)
    const userId = sessionStorage.getItem("userId") // 사용자 식별을 위한 세션 데이터

    try {
      if (!isViewedToday && !userId) {
        await updateDoc(postRef, {
          views: increment(1),
        })
        setViews(views + 1)
        setIsViewedToday(true)
        sessionStorage.setItem("userId", "visited")
        console.log("조회수가 성공적으로 증가되었습니다.")
      } else {
        console.log("이미 조회한 사용자입니다.")
      }
    } catch (error) {
      console.error("조회수 증가 중 오류가 발생했습니다:", error)
    }
  }

  useEffect(() => {
    const userId = sessionStorage.getItem("userId")
    if (userId) {
      setIsViewedToday(true)
    }
  }, [])

  return (
    <div>
      <p>조회수: {views}</p>
      <button onClick={handleIncreaseViews}>조회수 증가</button>
    </div>
  )
}

const Views = styled.p``

export default IncreaseViews
