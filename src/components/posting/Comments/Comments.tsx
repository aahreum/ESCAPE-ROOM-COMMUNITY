import { styled } from "styled-components"
import CommentList from "./CommentList"
import useGetCommentsData from "../../../service/useGetCommentsData"

export interface CommentsProps {
  postId: string
}

const Comments = ({ postId }: CommentsProps) => {
  const { commentSize } = useGetCommentsData({ postId })

  const handleCommentSave = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <Container name="comment">
      <CommentTitle htmlFor="comment">
        댓글 <span>{commentSize}</span>
      </CommentTitle>
      <CommentList postId={postId} />
      <CommentInput id="comment" placeholder="댓글을 작성하세요."></CommentInput>
      <CommentButton type="submit" onClick={handleCommentSave}>
        댓글쓰기
      </CommentButton>
    </Container>
  )
}

const Container = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const CommentTitle = styled.label`
  font-size: 22px;
  font-weight: 700;

  > span {
    color: var(--color-primary-500);
  }
`

const CommentInput = styled.textarea`
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
`

const CommentButton = styled.button`
  margin-top: -16px;
  margin-left: auto;
  padding: 12px 24px;

  border: 1px solid var(--color-white);
  border-radius: 8px;
  background-color: var(--color-gray-600);

  font-size: 16px;
  font-weight: 600;
  color: var(--color-white);

  cursor: pointer;
`

export default Comments
