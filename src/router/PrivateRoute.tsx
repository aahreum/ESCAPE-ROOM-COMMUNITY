import { Navigate, Outlet } from "react-router-dom"

interface PrivateRouteType {
  isLogin: boolean
}

const PrivateRoute = ({ isLogin }: PrivateRouteType) => {
  return !isLogin ? <Navigate to="/login" /> : <Outlet />
}

export default PrivateRoute
