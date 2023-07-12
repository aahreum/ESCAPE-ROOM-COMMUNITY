import { useLocation } from "react-router-dom"
import PageNav from "../components/common/PageNav"

const PageNavWithHide = (): JSX.Element | null => {
  const { pathname } = useLocation()
  const hidePageNav = pathname === "/login" || pathname === "/signup"

  if (hidePageNav) {
    return null
  }

  return <PageNav />
}

export default PageNavWithHide
