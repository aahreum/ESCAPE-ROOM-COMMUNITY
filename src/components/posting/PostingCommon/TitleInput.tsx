import { ChangeEventHandler } from "react"
import { styled } from "styled-components"

interface TitleInputProps {
  setTitle: ChangeEventHandler<HTMLInputElement>
  title: string
}

const TitleInput = ({ title, setTitle }: TitleInputProps) => {
  return (
    <TitleInputEl value={title} onChange={setTitle} type="text" placeholder="제목을 입력해주세요" />
  )
}

const TitleInputEl = styled.input`
  width: 100%;
  height: 50px;

  padding-left: 16px;
  background-color: var(--color-gray-600);

  font-size: 16px;
  color: var(--color-gray-100);

  border: none;
  border-radius: 8px;

  &::placeholder {
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 0px;
    color: var(--color-gray-200);
  }
`
export default TitleInput
