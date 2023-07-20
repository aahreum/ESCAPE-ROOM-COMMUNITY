import usePathname from "./usePathname"

const useContentNameChange = () => {
  const { includesMateSlash } = usePathname()

  const pathnameChange = () => {
    if (includesMateSlash) return "/mate"
    else return "/review"
  }

  const getDataNameChange = () => {
    if (includesMateSlash) return "mate"
    else return "review"
  }

  return { pathnameChange, getDataNameChange }
}

export default useContentNameChange
