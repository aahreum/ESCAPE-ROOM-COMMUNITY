import { styled } from "styled-components"
import LinkButton from "../common/LinkButton"

const NullContent = ({ name }: { name: string }) => {
  const GoToLink = () => {
    if (name === "mate") return "/mate/write"
    else return "/review/write"
  }

  return (
    <Container>
      <Text>아직 작성한 글이 없어요</Text>
      <LinkButton $bgColor={`var(--color-white)`} to={GoToLink()}>
        글쓰기
      </LinkButton>
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
`

const Text = styled.p`
  font-size: 22px;
`

export default NullContent
