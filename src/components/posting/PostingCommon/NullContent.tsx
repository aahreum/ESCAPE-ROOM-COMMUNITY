import { styled } from "styled-components"
import useAccountState from "../../../service/useAccountState"
import LinkButton from "../../common/LinkButton"

const NullContent = ({ name }: { name: string }): JSX.Element => {
  const { isLogin } = useAccountState()

  const GoToLink = () => {
    if (name === "mate") return "/mate/write"
    else return "/review/write"
  }

  return (
    <Container>
      <Text>아직 작성한 글이 없어요</Text>
      {isLogin && (
        <LinkButton $bgColor={`var(--color-gray-100)`} to={GoToLink()}>
          글쓰기
        </LinkButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 32px;
  height: 260px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  border-radius: 8px;
  background-color: var(--color-gray-600);

  @media ${(props) => props.theme.desktop} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.tablet} {
    margin-top: 16px;
    gap: 16px;
  }
`

const Text = styled.p`
  font-size: 22px;

  @media ${(props) => props.theme.tablet} {
    font-size: 16px;
  }
`

export default NullContent
