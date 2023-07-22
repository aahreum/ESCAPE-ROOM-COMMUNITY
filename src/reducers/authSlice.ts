import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: localStorage.getItem("isLogin") === "true" || false,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true
      localStorage.setItem("isLogin", "true")
    },
    logout: (state) => {
      state.isLogin = false
      localStorage.removeItem("isLogin")
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
