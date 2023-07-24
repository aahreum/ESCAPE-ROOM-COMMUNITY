import { ReactNode } from "react"
import { styled } from "styled-components"

const MainContainer = ({ children }: { children: ReactNode }): JSX.Element => {
  return <MainContainerEl>{children}</MainContainerEl>
}

const MainContainerEl = styled.div`
  margin: 60px auto 40px;
  max-width: 1320px;
  padding: 0 24px;

  @media ${(props) => props.theme.tablet} {
    margin-top: 32px;
  }
`

export default MainContainer
