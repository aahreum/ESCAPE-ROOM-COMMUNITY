import useFirebaseAuth from "../service/useFirebaseAuth"
import Login from "./Login"

const MyPage = (): JSX.Element => {
  const { isLogin, setIsLogin } = useFirebaseAuth()

  return (
    <>
      {!isLogin ? (
        <Login />
      ) : (
        <>
          <h2>마이페이지</h2>
        </>
      )}
    </>
  )
}

export default MyPage
