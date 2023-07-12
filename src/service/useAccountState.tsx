import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../reducers/rootReducers"

const useAccountState = () => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin)

  const [isLoginError, setIsLoginError] = useState(false)

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  })

  const [messages, setMessages] = useState({
    emailMsg: "",
    passwordMsg: "",
    passwordConfirmMsg: "",
    nicknameMsg: "",
    loginMsg: "",
  })

  const [validationState, setValidationState] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordConfirm: false,
    isNickname: false,
    isAvailableEmail: false,
    isAvailableNickname: false,
  })
  return {
    isLogin,
    isLoginError,
    setIsLoginError,
    formState,
    setFormState,
    messages,
    setMessages,
    validationState,
    setValidationState,
  }
}

export default useAccountState
