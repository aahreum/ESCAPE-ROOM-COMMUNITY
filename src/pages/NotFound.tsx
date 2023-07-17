import { Link } from "react-router-dom"
import { styled } from "styled-components"

const NotFound = () => {
  return (
    <Container>
      <Title404>404</Title404>
      <Desc>페이지를 찾을 수 없습니다.</Desc>
      <GotoMainButton to="/">메인페이지로 이동</GotoMainButton>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const Title404 = styled.h2`
  font-size: 160px;
  font-weight: 700;
`

const Desc = styled.p`
  font-size: 20px;
  color: var(--color-gray-200);
`

const GotoMainButton = styled(Link)`
  margin-top: 8px;
  padding: 16px 24px;
  background-color: var(--color-primary-500);
  border-radius: 8px;
  font-weight: 600;
  color: var(--color-gray-800);
`

export default NotFound
