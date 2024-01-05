import { styled } from "styled-components"
import { DataType } from "../../../service/useGetPostData"
import usePathname from "../../../service/usePathname"
import useAccountState from "../../../service/useAccountState"
import Title from "../../common/Title"
import LinkButton from "../../common/LinkButton"

interface TitleAreaProps {
  content: DataType[] | null
}

const TitleArea = ({ content }: TitleAreaProps): JSX.Element => {
  const { includesMate } = usePathname()
  const { isLogin } = useAccountState()

  const renderTitle = () => {
    if (includesMate) return "같이 탈출할 사람 구해요!😆"
    else return "탈출후기!🥳"
  }

  return (
    <TitleAreaEl>
      <Title>{renderTitle()}</Title>
      {content === null ||
        (isLogin && (
          <LinkButton
            $bgColor={"var(--color-gray-100)"}
            to={includesMate ? "/mate/write" : "/review/write"}
          >
            글쓰기
          </LinkButton>
        ))}
    </TitleAreaEl>
  )
}

const TitleAreaEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default TitleArea
