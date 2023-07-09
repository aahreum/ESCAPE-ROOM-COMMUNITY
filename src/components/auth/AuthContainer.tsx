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
`

export default AuthContainer
