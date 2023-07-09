import { useState } from "react"

const useAccountState = () => {
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
