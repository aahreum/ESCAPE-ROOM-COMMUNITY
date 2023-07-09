import { signOut } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import useFirebaseAuth from "../../service/useFirebaseAuth"

const PageNav = () => {
  const { isLogin, setIsLogin, user } = useFirebaseAuth()

  const handleLogout = async () => {
    await signOut(auth)
    setIsLogin(false)
  }

  return (
    <nav>
      {isLogin ? <button onClick={handleLogout}>로그아웃</button> : <a href="/login">로그인</a>}
      <p>{isLogin && user?.displayName} 님</p>
    </nav>
  )
}

export default PageNav
