import { styled } from "styled-components"
import React from "react"
import { EMAIL_REGEX, NICKNAME_REGEX, PASSWORD_REGEX } from "../constants/regex"
import LogoNav from "../components/auth/LogoNav"
import { fetchSignInMethodsForEmail, updateProfile } from "firebase/auth"
import { auth, db, signUpEmail } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"
import AuthInput from "../components/auth/AuthInput"
import AuthButton from "../components/auth/AuthButton"
import AuthContainer from "../components/auth/AuthContainer"
import Title from "../components/common/Title"
import useAccountState from "../service/useAccountState"
import { saveNicknameToFirestore } from "../service/saveNicknameToFirestore"
import { collection, getDocs, query, where } from "firebase/firestore"

const SignUp = (): JSX.Element => {
  const navigate = useNavigate()

  const { formState, setFormState, messages, setMessages, validationState, setValidationState } =
    useAccountState()

  const { email, password, passwordConfirm, nickname } = formState
  const { emailMsg, passwordMsg, passwordConfirmMsg, nicknameMsg } = messages
  const {
    isEmail,
    isAvailableEmail,
    isPassword,
    isPasswordConfirm,
    isNickname,
    isAvailableNickname,
  } = validationState

  const validateField = (name: string, value: string) => {
    let isValid = true
    let message = ""

    switch (name) {
      case "email":
        isValid = EMAIL_REGEX.test(value)
        message = isValid ? "" : "이메일 형식을 확인해주세요."
        break

      case "password":
        isValid = PASSWORD_REGEX.test(value)
        if (value.length < 6) {
          message = "최소 6자 이상 입력해주세요."
        } else if (!isValid) {
          message = "영문 + 숫자 + 특수문자 조합을 활용해주세요."
        }
        break
      case "passwordConfirm":
        isValid = password === value
        message = isValid ? "" : "입력한 비밀번호와 똑같이 입력해주세요."
        break

      case "nickname":
        isValid = NICKNAME_REGEX.test(value)
        message = isValid ? "" : "닉네임 형식을 확인해주세요."
        break
    }

    return { isValid, message }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const { isValid, message } = validateField(name, value)

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
      [`${name}Msg`]: message,
    }))
  }

  interface checkDuplicationType {
    (value: string, field: string, successMsg: string, errorMsg: string): Promise<void>
  }

  const checkDuplication: checkDuplicationType = async (value, field, successMsg, errorMsg) => {
    try {
      let isAvailable = false

      if (field === "email") {
        const result = await fetchSignInMethodsForEmail(auth, value)
        isAvailable = result.length === 0
      } else if (field === "nickname") {
        const q = query(collection(db, "users"), where("nickname", "==", value))
        const querySnapshot = await getDocs(q)
        const duplicateCount = querySnapshot.size
        isAvailable = duplicateCount === 0
      }

      if (isAvailable) {
        setValidationState((prev) => ({
          ...prev,
          [`isAvailable${field.slice(0, 1).toUpperCase() + field.slice(1)}`]: true,
        }))
        setMessages((prev) => ({ ...prev, [`${field}Msg`]: successMsg }))
      } else {
        setValidationState((prev) => ({
          ...prev,
          [`isAvailable${field.slice(0, 1).toUpperCase() + field.slice(1)}`]: false,
        }))
        setMessages((prev) => ({ ...prev, [`${field}Msg`]: errorMsg }))
      }
    } catch (err) {
      console.error(`${err}: 중복된 ${field}`)
    }
  }

  const emailCheck = async () => {
    await checkDuplication(
      email,
      "email",
      "사용할 수 있는 이메일이에요.",
      "이미 사용중인 이메일이에요.",
    )
  }

  const nicknameCheck = async () => {
    await checkDuplication(
      nickname,
      "nickname",
      "사용할 수 있는 닉네임이에요.",
      "이미 사용중인 닉네임이에요.",
    )
  }

  interface userCreateType {
    (nickname: string, email: string, password: string): Promise<void>
  }

  const handleUserCreate: userCreateType = async (nickname, email, password) => {
    try {
      await signUpEmail(email, password)
      setFormState({
        email: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
      })
      setValidationState({
        isEmail: false,
        isAvailableEmail: false,
        isPassword: false,
        isPasswordConfirm: false,
        isNickname: false,
        isAvailableNickname: false,
      })

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: nickname })
        saveNicknameToFirestore(nickname)
      } else {
        alert("회원가입에 실패하셨습니다.")
      }

      navigate("/")
    } catch (err) {
      alert(`${err}: 회원가입에 실패하셨습니다.`)
    }
  }

  return (
    <>
      <LogoNav />
      <AuthContainer>
        <Title $textAlign="center">회원가입</Title>
        <Form>
          <InputContainer>
            <InputTitle>이메일</InputTitle>
            <InputArea>
              <AuthInput
                className={`${!isEmail && email.length > 0 && "error"}`}
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={onChange}
              />
              <InputButton type="button" disabled={!isEmail} onClick={emailCheck}>
                중복확인
              </InputButton>
            </InputArea>
            {email.length > 0 && (
              <Msg className={`${isEmail && isAvailableEmail && "positive"}`}>{emailMsg}</Msg>
            )}
          </InputContainer>
          <InputContainer>
            <InputTitleArea>
              <InputTitle>비밀번호</InputTitle>
              <InputDesc>(영문 숫자 특수문자 활용 6자 이상)</InputDesc>
            </InputTitleArea>
            <AuthInput
              className={`${!isPassword && password.length > 0 && "error"}`}
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onChange}
            />
            {password.length > 0 && <Msg>{passwordMsg}</Msg>}
          </InputContainer>
          <InputContainer>
            <InputTitle>비밀번호 확인</InputTitle>
            <AuthInput
              className={`${!isPasswordConfirm && passwordConfirm.length > 0 && "error"}`}
              name="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={onChange}
              placeholder="비밀번호를 한번 더 입력해주세요."
            />
            {passwordConfirm.length > 0 && <Msg>{passwordConfirmMsg}</Msg>}
          </InputContainer>
          <InputContainer>
            <InputTitleArea>
              <InputTitle>닉네임</InputTitle>
              <InputDesc>(한글, 영어, 숫자 사용, 6자 이하 입력)</InputDesc>
            </InputTitleArea>
            <InputArea>
              <AuthInput
                className={`${!isNickname && nickname.length > 0 && "error"}`}
                name="nickname"
                type="text"
                value={nickname}
                onChange={onChange}
                placeholder="닉네임을 입력해주세요."
              />
              <InputButton type="button" disabled={!isNickname} onClick={nicknameCheck}>
                중복확인
              </InputButton>
            </InputArea>
            {nickname.length > 0 && (
              <Msg className={`${isNickname && isAvailableNickname && "positive"}`}>
                {nicknameMsg}
              </Msg>
            )}
          </InputContainer>
          <AuthButton
            disabled={!(isAvailableEmail && isPassword && isPasswordConfirm && isAvailableNickname)}
            onClick={(e) => {
              e.preventDefault()
              handleUserCreate(nickname, email, password)
            }}
          >
            회원가입
          </AuthButton>
        </Form>
      </AuthContainer>
    </>
  )
}
const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`

const InputTitleArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`

const InputTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: var(--color-white);
`

const InputDesc = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: var(--color-gray-200);
`

const InputArea = styled.div`
  width: 420px;
  height: 50px;
  display: flex;
  gap: 12px;
`

const InputButton = styled.button`
  padding: 16px 14px;
  border-radius: 8px;
  border: 1px solid var(--color-white);
  background-color: var(--color-gray-600);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-white);
  cursor: pointer;

  &:disabled {
    border: 1px solid var(--color-gray-600);
    background-color: transparent;
    color: var(--color-gray-600);
    cursor: not-allowed;
  }
`

const Msg = styled.p`
  font-size: 14px;
  color: var(--color-negative-500);

  &.positive {
    color: var(--color-positive-500);
  }
`

export default SignUp
