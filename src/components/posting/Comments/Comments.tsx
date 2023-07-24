import { styled } from "styled-components"
import CommentList from "./CommentList"
import useGetCommentsData from "../../../service/useGetCommentsData"
import useAccountState from "../../../service/useAccountState"
import CommentInputArea from "./CommentInputArea"

export interface CommentsProps {
  postId: string
}

const Comments = ({ postId }: CommentsProps) => {
  const { isLogin } = useAccountState()
  const { commentSize } = useGetCommentsData({ postId })

  return (
    <Container name="comment">
      <CommentTitle htmlFor="comment">
        댓글 <span>{commentSize}</span>
      </CommentTitle>
      <CommentList postId={postId} />
      {isLogin ? <CommentInputArea postId={postId} /> : null}
    </Container>
  )
}

const Container = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media ${(props) => props.theme.mobile} {
    gap: 24px;
  }
`

const CommentTitle = styled.label`
  font-size: 22px;
  font-weight: 700;

  > span {
    color: var(--color-primary-500);
  }

  @media ${(props) => props.theme.mobile} {
    font-size: 18px;
  }
`

export default Comments
