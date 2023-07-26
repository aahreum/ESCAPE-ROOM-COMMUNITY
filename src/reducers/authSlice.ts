import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: localStorage.getItem("isLogin") === "true" || false,
    nickname: localStorage.getItem("nickname") || null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true
      state.nickname = action.payload.nickname
      localStorage.setItem("isLogin", "true")
      localStorage.setItem("nickname", action.payload.nickname)
    },
    logout: (state) => {
      state.isLogin = false
      state.nickname = null
      localStorage.removeItem("isLogin")
      localStorage.removeItem("nickname")
    },
    setNickname: (state, action) => {
      state.nickname = action.payload
      localStorage.setItem("nickname", action.payload)
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
