import { Route, Routes } from "react-router"
import Index from "../pages/Index"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import MyPage from "../pages/MyPage"

const Routers = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}

export default Routers
