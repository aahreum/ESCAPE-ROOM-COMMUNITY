import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { styled } from "styled-components"
import useGetCommentsData, { CommentDataType } from "../../../service/useGetCommentsData"
import { auth } from "../../../firebase/firebase"
import useAccountState from "../../../service/useAccountState"
import { useState } from "react"
import CommentInput from "./CommentInput"
import { CommentsProps } from "./Comments"

const CommentList = ({ postId }: CommentsProps) => {
  const { isLogin } = useAccountState()
  const { loading, commentsData, commentsRef } = useGetCommentsData({ postId })
  const [isEditingList, setIsEditingList] = useState<boolean[]>([])
  const [editedComment, setEditedComment] = useState("")
  const [commentError, setCommentError] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

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

  const handleDeleteComment = (commentId: string) => {
    deleteDoc(doc(commentsRef, commentId))
  }

  const handleToggleEdit = (index: number, comment: string) => {
    setIsEditing(true)
    setEditedComment(comment)
    setIsEditingList((prev) => {
      const updatedList = [...prev]
      updatedList[index] = !updatedList[index]

      for (let i = 0; i < updatedList.length; i++) {
        if (i !== index) {
          updatedList[i] = false
        }
      }

      return updatedList
    })
  }

  const handleModifyComment = async (commentId: string, index: number, comment: string) => {
    try {
      if (editedComment.length === 0) {
        setCommentError(true)
      } else {
        await updateDoc(doc(commentsRef, commentId), {
          comment: editedComment,
        })
        setEditedComment(comment)
        handleToggleEdit(index, comment)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {commentsData === null ? null : loading ? (
        <div>로딩중</div>
      ) : (
        <Container>
          {commentsData.map((item: CommentDataType, index) => (
            <CommentItem key={item.id}>
              <CommentArea>
                <CommentTopArea>
                  <Nickname>{item.nickname}</Nickname>
                  <Time>{formattedTime(item.createdTime)}</Time>
                </CommentTopArea>
                {isEditingList[index] ? (
                  <CommentInput
                    isEditing={isEditing}
                    comment={editedComment}
                    setComment={setEditedComment}
                    commentError={commentError}
                  />
                ) : (
                  <CommentText>{item.comment}</CommentText>
                )}
              </CommentArea>
              {isLogin && auth.currentUser?.displayName === item.nickname && (
                <CommentButtonArea>
                  {isEditingList[index] ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleModifyComment(item.id, index, item.comment)}
                      >
                        완료
                      </button>
                      <button type="button" onClick={() => handleToggleEdit(index, item.comment)}>
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => handleToggleEdit(index, item.comment)}>
                        수정
                      </button>
                      <button type="button" onClick={() => handleDeleteComment(item.id)}>
                        삭제
                      </button>
                    </>
                  )}
                </CommentButtonArea>
              )}
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

  @media ${(props) => props.theme.mobile} {
    padding: 24px 16px;
  }
`

const CommentArea = styled.div`
  flex: 1;
`

const CommentTopArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`

const CommentButtonArea = styled.div`
  display: flex;
  gap: 12px;

  & > button {
    padding: 8px 16px;

    background-color: var(--color-gray-600);
    border: 1px solid var(--color-gray-100);
    border-radius: 8px;

    font-size: 14px;
    font-weight: 500;
    color: var(--color-gray-100);

    cursor: pointer;

    @media ${(props) => props.theme.mobile} {
      padding: 6px 8px;
    }
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
