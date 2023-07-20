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
import NotFound from "../pages/NotFound"
import DetailView from "../pages/DetailView"
import Modify from "../pages/Modify"

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
      <Route path="/mate/:id" element={<DetailView />} />
      <Route path="/review/:id" element={<DetailView />} />
      <Route element={<PrivateRoute isLogin={isLogin} />}>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mate/write" element={<Write />} />
        <Route path="/review/write" element={<Write />} />
        <Route path="/mate/:id/modify" element={<Modify />} />
        <Route path="/review/:id/modify" element={<Modify />} />
      </Route>
    </Routes>
  )
}

export default Routers
