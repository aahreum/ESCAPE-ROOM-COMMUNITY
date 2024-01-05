import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../reducers/rootReducers"
import { toggleDarkMode } from "../reducers/themeSlice"
import { useEffect } from "react"

const useThemeChange = () => {
  const dispatch = useDispatch()
  const isDark = useSelector((state: RootState) => state.themeMode)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
  }, [isDark])

  const handleToggleClick = () => {
    dispatch(toggleDarkMode())
    document.documentElement.setAttribute("data-theme", !isDark ? "dark" : "light")
    localStorage.setItem("darkTheme", JSON.stringify(!isDark))
  }

  return { isDark, handleToggleClick }
}

export default useThemeChange
