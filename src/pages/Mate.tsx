import { styled } from "styled-components"
import Title from "../components/common/Title"
import { Link } from "react-router-dom"
import useAccountState from "../service/useAccountState"

const Mate = (): JSX.Element => {
  const { isLogin } = useAccountState()

  return (
    <>
      <Title>같이 탈출할 사람 구해요!😆</Title>
      {isLogin && <WriteButton to={"/mate/write"}>글쓰기</WriteButton>}
    </>
  )
}

const WriteButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary-500);
  color: var(--color-gray-800);
  padding: 14px 24px;
`

export default Mate
