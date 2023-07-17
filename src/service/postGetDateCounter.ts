import { Timestamp } from "firebase/firestore"

export const postTimeCalculation = (timestamp: Timestamp) => {
  const today = new Date()
  const createdTime = timestamp.toDate()
  const timeDiff = today.getTime() - createdTime.getTime()

  // 방금 전 (분 초)
  if (timeDiff < 60 * 1000) {
    return "방금 전"
  }

  // 1시간 이내 (시 분 초)
  if (timeDiff < 60 * 60 * 1000) {
    const minutes = Math.floor(timeDiff / (60 * 1000))
    return `${minutes}분 전`
  }

  // 24시간 이내
  if (timeDiff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDiff / (60 * 60 * 1000))
    return `${hours}시간 전`
  }

  // 7일 전
  if (timeDiff <= 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000))
    return `${days}일 전`
  }

  // 이후 YYYY-MM-DD
  const year = createdTime.getFullYear()
  const month = String(createdTime.getMonth() + 1).padStart(2, "0")
  const day = String(createdTime.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
