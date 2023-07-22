import GlobalStyles from "./styles/globalStyle"
import { styled } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import Routers from "./router/Routers"
import PageNavWithHide from "./router/PageNavWithHide"
import PageFooter from "./components/common/PageFooter"
import { Provider } from "react-redux"
import store from "./reducers/store"

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <Wrap>
          <PageNavWithHide />
          <Routers />
        </Wrap>
        <PageFooter />
      </BrowserRouter>
    </Provider>
  )
}

const Wrap = styled.div`
  min-height: calc(100vh - 200px);
`

export default App
