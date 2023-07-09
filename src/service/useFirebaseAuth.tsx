import { useEffect, useState } from "react"
import { auth } from "../firebase/firebase"

const useFirebaseAuth = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })
  }, [])

  const user = auth.currentUser

  return { isLogin, setIsLogin, user }
}

export default useFirebaseAuth
