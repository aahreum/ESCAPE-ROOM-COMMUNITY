import { ReactNode } from "react"
import { styled } from "styled-components"

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return <ContainerEl>{children}</ContainerEl>
}

const ContainerEl = styled.div`
  padding: 60px 80px 80px;
  margin: 0 auto;
  max-width: 580px;

  border-radius: 20px;
  background-color: var(--color-gray-900);

  @media ${(props) => props.theme.tablet} {
    padding: 40px 24px 60px;
  }
`

export default AuthContainer
