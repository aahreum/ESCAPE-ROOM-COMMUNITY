import { createSlice } from "@reduxjs/toolkit"

const getPersistedTheme = () => {
  const persistedTheme = localStorage.getItem("darkTheme")
  return persistedTheme === "true" ? true : persistedTheme === "false" ? false : null
}

const getInitTheme = () => {
  const persistedTheme = getPersistedTheme()
  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches

  return persistedTheme !== null ? persistedTheme : systemTheme
}

const themeSlice = createSlice({
  name: "themeMode",
  initialState: getInitTheme(),

  reducers: {
    setDarkMode: (_state, action) => action.payload,
    toggleDarkMode: (state) => !state,
  },
})

export const { setDarkMode, toggleDarkMode } = themeSlice.actions
export default themeSlice.reducer
