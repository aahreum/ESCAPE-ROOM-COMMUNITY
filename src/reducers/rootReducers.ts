import { combineReducers } from "redux"
import authSlice from "./authSlice"
import themeSlice from "./themeSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  themeMode: themeSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
