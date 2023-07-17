import { Route, Routes } from "react-router"
import Index from "../pages/Index"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import MyPage from "../pages/MyPage"
import Mate from "../pages/Mate"
import Review from "../pages/Review"
import Write from "../pages/Write"
import PrivateRoute from "./PrivateRoute"
import useAccountState from "../service/useAccountState"
import ContentDetail from "../pages/ContentDetail"
import NotFound from "../pages/NotFound"

const Routers = () => {
  const { isLogin } = useAccountState()

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mate" element={<Mate />} />
      <Route path="/review" element={<Review />} />
      <Route path="/mate/:id" element={<ContentDetail />} />
      <Route path="/review/:id" element={<ContentDetail />} />
      <Route element={<PrivateRoute isLogin={isLogin} />}>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mate/write" element={<Write />} />
        <Route path="/review/write" element={<Write />} />
      </Route>
    </Routes>
  )
}

export default Routers
