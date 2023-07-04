import { Route, Routes } from "react-router"
import Index from "../pages"

const PageNavigator = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  )
}

export default PageNavigator
