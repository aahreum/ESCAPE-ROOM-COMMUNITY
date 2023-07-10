import GlobalStyles from "./styles/globalStyle"
import { styled } from "styled-components"
import { BrowserRouter } from "react-router-dom"

import Routers from "./router/Routers"
import PageNavWithHide from "./router/PageNavWithHide"
import PageFooter from "./components/common/PageFooter"

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrap>
        <PageNavWithHide />
        <Routers />
      </Wrap>
      <PageFooter />
    </BrowserRouter>
  )
}

const Wrap = styled.div`
  min-height: calc(100vh - 200px);
`

export default App
