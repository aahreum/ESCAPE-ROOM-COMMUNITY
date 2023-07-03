import { styled } from "styled-components"
import GlobalStyles from "./styles/globalStyle"

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Wrap>App 아아아아아 아아아ㅏ 아아아아</Wrap>
    </>
  )
}

const Wrap = styled.div`
  font-family: SUIT, sans-serif;
  color: var(--color-primary-500);
`

export default App
