import { styled } from "styled-components"
import GlobalStyles from "./styles/globalStyle"
import PageFooter from "./components/common/PageFooter"
import { BrowserRouter } from "react-router-dom"
import PageNavigator from "./router/PageNavigator"

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrap>
        <PageNavigator />
      </Wrap>
      <PageFooter />
    </BrowserRouter>
  )
}

const Wrap = styled.div`
  min-height: calc(100vh - 200px);
`

export default App
