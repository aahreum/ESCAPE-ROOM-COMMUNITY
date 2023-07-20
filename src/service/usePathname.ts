import { useLocation } from "react-router-dom"

const usePathname = () => {
  const { pathname } = useLocation()
  const includesMate = pathname.includes("/mate")
  const includesMateSlash = pathname.includes("/mate/")

  return { includesMate, includesMateSlash }
}

export default usePathname
