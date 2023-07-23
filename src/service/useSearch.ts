import { useLocation } from "react-router-dom"

const useSearch = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get("keyword") || ""

  return { searchQuery }
}

export default useSearch
