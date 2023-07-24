import { styled } from "styled-components"
import useAccountState from "../../service/useAccountState"
import Title from "../common/Title"
import LinkButton from "../common/LinkButton"
import { DataType } from "../../service/useGetPostData"
import usePathname from "../../service/usePathname"

interface TitleContainerProps {
  content: DataType[] | null
}

const TitleContainer = ({ content }: TitleContainerProps): JSX.Element => {
  const { includesMate } = usePathname()
  const { isLogin } = useAccountState()

  const renderTitle = () => {
    if (includesMate) return "같이 탈출할 사람 구해요!😆"
    else return "탈출후기!🥳"
  }

  return (
    <TitleContainerEl>
      <Title>{renderTitle()}</Title>
      {content === null ||
        (isLogin && (
          <LinkButton
            $bgColor={"var(--color-white)"}
            to={includesMate ? "/mate/write" : "/review/write"}
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
