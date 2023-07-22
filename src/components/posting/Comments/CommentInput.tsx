import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { styled } from "styled-components"

export interface CommentInputProps {
  comment: string
  setComment: Dispatch<SetStateAction<string>>
  commentError: boolean
  isEditing?: boolean
}

const CommentInput = ({ comment, setComment, commentError, isEditing }: CommentInputProps) => {
  return (
    <>
      <CommentInputEl
        className={`${
          (commentError && comment.length === 0 && "error") || (isEditing && "edited")
        }`}
        id="comment"
        placeholder="댓글을 작성하세요."
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setComment(e.target.value)
        }}
        value={comment}
      />
      {commentError && comment.length === 0 && <ErrorMsg>댓글 내용을 입력해주세요.</ErrorMsg>}
    </>
  )
}

const CommentInputEl = styled.textarea`
  height: 120px;
  padding: 24px;
  resize: none;

  border: none;
  border-radius: 8px;
  background-color: var(--color-gray-600);

  font-size: 16px;
  color: var(--color-white);

  &::placeholder {
    color: var(--color-gray-200);
  }

  &.error {
    border: 1px solid var(--color-negative-500);
  }

  &.edited {
    margin-top: 16px;
    width: 96%;
    background-color: var(--color-gray-700);
  }

  &:focus {
    outline: none;
    border: 1px solid var(--color-primary-500);
  }
`
const ErrorMsg = styled.p`
  margin-top: -16px;

  font-size: 14px;
  font-weight: 500;
  color: var(--color-negative-500);
`

export default CommentInput
