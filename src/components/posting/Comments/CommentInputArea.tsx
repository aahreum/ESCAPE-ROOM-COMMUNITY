import { useState } from "react"
import { Timestamp, addDoc } from "firebase/firestore"
import { auth } from "../../../firebase/firebase"
import useGetCommentsData from "../../../service/useGetCommentsData"
import { CommentsProps } from "./Comments"
import { styled } from "styled-components"
import CommentInput from "./CommentInput"

const CommentInputArea = ({ postId }: CommentsProps) => {
  const { commentsRef } = useGetCommentsData({ postId })

  const [comment, setComment] = useState("")
  const [commentError, setCommentError] = useState(false)

  const handleCommentSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (comment.length === 0) {
      setCommentError(true)
    } else {
      addDoc(commentsRef, {
        comment: comment,
        nickname: auth.currentUser?.displayName,
        createdTime: Timestamp.fromDate(new Date()),
      })
      setCommentError(false)
      setComment("")
    }
  }

  return (
    <>
      <CommentInput comment={comment} setComment={setComment} commentError={commentError} />
      <CommentButton type="submit" onClick={handleCommentSave}>
        댓글쓰기
      </CommentButton>
    </>
  )
}

const CommentButton = styled.button`
  margin-top: -16px;
  margin-left: auto;
  padding: 12px 24px;

  border: 1px solid var(--color-gray-100);
  border-radius: 8px;
  background-color: var(--color-gray-600);

  font-size: 16px;
  font-weight: 600;
  color: var(--color-gray-100);

  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    margin-top: -8px;
    padding: 13px 16px;
    font-size: 14px;
  }
`

export default CommentInputArea
