import { styled } from "styled-components"
import useAccountState from "../../service/useAccountState"
import Title from "../common/Title"
import LinkButton from "../common/LinkButton"
import { useLocation } from "react-router-dom"
import { MATE, REVIEW } from "../../constants/postPathname"
import { DataType } from "../../service/useGetPostData"

interface TitleContainerProps {
  content: DataType[] | null
}

const TitleContainer = ({ content }: TitleContainerProps): JSX.Element => {
  const { pathname } = useLocation()
  const { isLogin } = useAccountState()

  const renderTitle = () => {
    if (pathname === MATE) return "같이 탈출할 사람 구해요!😆"
    else if (pathname === REVIEW) return "탈출후기!🥳"
  }

  return (
    <TitleContainerEl>
      <Title>{renderTitle()}</Title>
      {content === null ||
        (isLogin && (
          <LinkButton
            $bgColor={"var(--color-white)"}
            to={pathname === MATE ? "/mate/write" : "/review/write"}
          >
            글쓰기
          </LinkButton>
        ))}
    </TitleContainerEl>
  )
}

const TitleContainerEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default TitleContainer
