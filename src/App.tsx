import GlobalStyles from "./styles/globalStyle"
import { styled } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import PageNavigator from "./router/PageNavigator"
import PageNav from "./components/common/PageNav"
import PageFooter from "./components/common/PageFooter"

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrap>
        <PageNav />
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
