import { styled } from "styled-components"
import GlobalStyles from "./styles/globalStyle"
import PageFooter from "./components/common/PageFooter"

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Wrap></Wrap>
      <PageFooter />
    </>
  )
}

const Wrap = styled.div`
  min-height: calc(100vh - 200px);
`

export default App
