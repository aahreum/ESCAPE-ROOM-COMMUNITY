import { Timestamp, collection, deleteDoc, doc } from "firebase/firestore"
import { styled } from "styled-components"
import { CommentsProps } from "./Comments"
import useGetCommentsData, { CommentDataType } from "../../../service/useGetCommentsData"
import { db } from "../../../firebase/firebase"

const CommentList = ({ postId }: CommentsProps) => {
  const { loading, commentsData } = useGetCommentsData({ postId })

  const formattedTime = (timestamp: Timestamp) => {
    const createdTime = timestamp.toDate()
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
    return createdTime.toLocaleString("ko-KR", options)
  }

  const deleteContent = (commentId: string) => {
    const postRef = collection(db, "mateContents")
    const postDoc = doc(postRef, postId)
    const commentsRef = collection(postDoc, "comments")
    deleteDoc(doc(commentsRef, commentId))
  }

  return (
    <>
      {commentsData === null ? null : loading ? (
        <div>로딩중</div>
      ) : (
        <Container>
          {commentsData.map((item: CommentDataType) => (
            <CommentItem key={item.id}>
              <CommentArea>
                <CommentTopArea>
                  <Nickname>{item.nickname}</Nickname>
                  <Time>{formattedTime(item.createdTime)}</Time>
                </CommentTopArea>
                <CommentText>{item.comment}</CommentText>
              </CommentArea>
              <CommentButtonArea>
                <button type="button">수정</button>
                <button type="button" onClick={() => deleteContent(item.id)}>
                  삭제
                </button>
              </CommentButtonArea>
            </CommentItem>
          ))}
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CommentItem = styled.div`
  padding: 28px 24px;

  display: flex;
  align-items: center;

  background-color: var(--color-gray-600);
  border-top: 1px solid var(--color-gray-300);
`

const CommentArea = styled.div`
  flex: 1;
`

const CommentTopArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const CommentButtonArea = styled.div`
  display: flex;
  gap: 12px;

  & > button {
    padding: 8px 16px;

    background-color: var(--color-gray-600);
    border: 1px solid var(--color-white);
    border-radius: 8px;

    font-size: 14px;
    font-weight: 500;
    color: var(--color-white);

    cursor: pointer;
  }
`

const Nickname = styled.p`
  font-size: 16px;
  font-weight: 700;
`

const Time = styled.p`
  font-size: 14px;
  color: var(--color-gray-200);
`

const CommentText = styled.p`
  margin-top: 12px;
`

export default CommentList
