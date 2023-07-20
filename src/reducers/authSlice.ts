import { createSlice } from "@reduxjs/toolkit"
import { setPersistence } from "firebase/auth"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: localStorage.getItem("isLogin") === "true",
  },
  reducers: {
    login: (state) => {
      state.isLogin = true
      localStorage.setItem("isLogin", "true")
      setPersistence
    },
    logout: (state) => {
      state.isLogin = false
      localStorage.removeItem("isLogin")
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
