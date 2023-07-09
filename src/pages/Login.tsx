import { signInWithPopup } from "firebase/auth"
import { styled } from "styled-components"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { googleProvider, loginEmail, auth } from "../firebase/firebase"

import { EMAIL_REGEX } from "../constants/regex"
import LogoNav from "../components/auth/LogoNav"
import { ReactComponent as GoogleIcon } from "../assets/google.svg"
import AuthContainer from "../components/auth/AuthContainer"
import Title from "../components/common/Title"
import AuthInput from "../components/auth/AuthInput"
import useAccountState from "../service/useAccountState"
import AuthButton from "../components/auth/AuthButton"

const Login = (): JSX.Element => {
  const navigate = useNavigate()

  const {
    isLoginError,
    setIsLoginError,
    formState,
    setFormState,
    messages,
    setMessages,
    validationState,
    setValidationState,
  } = useAccountState()

  const { email, password } = formState
  const { loginMsg, emailMsg } = messages
  const { isEmail } = validationState

  const validateField = (name: string, value: string) => {
    let isValid = true
    let message = ""

    switch (name) {
      case "email":
        isValid = EMAIL_REGEX.test(value)
        message = isValid ? "" : "이메일 형식을 확인해주세요."
        break

      case "password":
        isValid = value.length === 0 ? false : true
        break
    }

    return { isValid, message }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { isValid, message } = validateField(name, value)

    setIsLoginError(false)
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))

    setValidationState((prev) => ({
      ...prev,
      [`is${name.slice(0, 1).toUpperCase() + name.slice(1)}`]: isValid,
    }))

    setMessages((prev) => ({
      ...prev,
      emailMsg: message,
    }))
  }

  interface userLoginType {
    (email: string, password: string): Promise<void>
  }

  // login
  const handleUserLogin: userLoginType = async (email, password) => {
    try {
      await loginEmail(email, password)
      setFormState((prev) => ({
        ...prev,
        email: "",
        password: "",
      }))

      setValidationState((prev) => ({
        ...prev,
        isEmail: false,
        isPassword: false,
      }))
      setIsLoginError(false)
      navigate("/")
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        password: "",
      }))

      setValidationState((prev) => ({
        ...prev,
        isEmail: true,
        isPassword: false,
      }))

      if (email.length === 0) {
        setIsLoginError(true)
        setMessages((prev) => ({
          ...prev,
          loginMsg: "이메일을 입력해주세요.",
        }))
      } else if (password.length === 0) {
        setIsLoginError(true)
        setMessages((prev) => ({
          ...prev,
          loginMsg: "비밀번호를 입력해주세요.",
        }))
      } else {
        setIsLoginError(true)
        setMessages((prev) => ({
          ...prev,
          loginMsg: "이메일 또는 비밀번호를 다시 확인해주세요.",
        }))
      }
    }
  }

  const handleUserGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate("/")
    } catch (err) {
      console.error(err + ": Error google login")
    }
  }

  return (
    <>
      <LogoNav />
      <AuthContainer>
        <Title $textAlign="center">로그인</Title>
        <Form>
          <AuthInput
            className={`${(isLoginError && "error") || (!isEmail && email.length > 0 && "error")}`}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={onChange}
          />
          {!isEmail && email.length > 0 && <Msg>{emailMsg}</Msg>}
          <AuthInput
            className={`${isLoginError && "error"}`}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={onChange}
          />
          <AuthButton
            onClick={(e) => {
              e.preventDefault()
              handleUserLogin(email, password)
            }}
          >
            로그인
          </AuthButton>
          {isLoginError && <Msg>{loginMsg}</Msg>}
        </Form>
        <ButtonContainer>
          <GoogleBtn onClick={handleUserGoogleLogin} type="button">
            <GoogleIcon />
            구글로 회원가입
          </GoogleBtn>
          <EmailBtn to="/signup">이메일로 회원가입</EmailBtn>
        </ButtonContainer>
      </AuthContainer>
    </>
  )
}

const Form = styled.form`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;

  > * {
    &:nth-child(3) {
      margin-top: 4px;
    }
  }
`
const ButtonContainer = styled.div`
  margin-top: 60px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`

const GoogleBtn = styled.button`
  flex: 1;
  max-height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  border: none;
  border-radius: 7px;

  font-family: "SUIT", sans-serif;
  font-weight: 500;
  font-size: 16px;

  cursor: pointer;
`

const EmailBtn = styled(Link)`
  flex: 1;
  max-height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--color-primary-500);
  border-radius: 7px;
  color: var(--color-primary-500);
`

const Msg = styled.p`
  font-size: 14px;
  color: var(--color-negative-500);

  &.positive {
    color: var(--color-positive-500);
  }
`

export default Login
