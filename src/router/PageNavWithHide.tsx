import { useLocation } from "react-router-dom"
import PageNav from "../components/common/PageNav"

const PageNavWithHide = (): JSX.Element | null => {
  const location = useLocation()
  const hidePageNav = location.pathname === "/login" || location.pathname === "/signup"

  if (hidePageNav) {
    return null
  }

  return <PageNav />
}

export default PageNavWithHide
