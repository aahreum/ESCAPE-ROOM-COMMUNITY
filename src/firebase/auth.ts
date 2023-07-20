import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { app } from "./firebase"

export const auth = getAuth(app)

// Email 회원가입
export const signUpEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

// Email 로그인
export const loginEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

// 구글 로그인
export const googleProvider = new GoogleAuthProvider()

// 로그아웃
export const signOutAll = signOut(auth)
