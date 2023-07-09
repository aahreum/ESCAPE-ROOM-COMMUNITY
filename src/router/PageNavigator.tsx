import { Route, Routes } from "react-router"
import Index from "../pages/Index"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"

const PageNavigator = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default PageNavigator
