import { styled } from "styled-components"
import Title from "../components/common/Title"
import DropDownMenu from "../components/posting/DropDownMenu"
import { ESCAPE_STATUS, NUMBER_OF_PEOPLE, RECRUITMENT_STATUS } from "../constants/dropDownMenu"
import PostingContainer from "../components/posting/PostingContainer"
import { useLocation } from "react-router-dom"
import TextEditor from "../components/posting/TextEditor"
import { useState } from "react"

const Write = (): JSX.Element => {
  const { pathname } = useLocation()
  const [content, setContent] = useState("")

  const mate = "/mate/write"
  const review = "/review/write"

  const pathTitle = () => {
    if (pathname === mate) {
      return "메이트 구하기"
    } else if (pathname === review) {
      return "탈출후기"
    }
  }

  return (
    <PostingContainer>
      <Title>{pathTitle()}</Title>
      <TextEditContainer>
        <DropDownMenuContainer>
          {pathname === mate && (
            <>
              <DropDownMenu placeHolder="인원수 선택" dropDownMenu={NUMBER_OF_PEOPLE} />
              <DropDownMenu dropDownMenu={RECRUITMENT_STATUS} />
            </>
          )}
          {pathname === review && (
            <>
              <DropDownMenu placeHolder="인원수 선택" dropDownMenu={NUMBER_OF_PEOPLE} />
              <DropDownMenu placeHolder="탈출여부" dropDownMenu={ESCAPE_STATUS} />
            </>
          )}
        </DropDownMenuContainer>
        <TitleInput type="text" placeholder="제목을 입력해주세요" />
        <TextEditor content={setContent} />
        <TextSaveButton type="submit">작성완료</TextSaveButton>
      </TextEditContainer>
    </PostingContainer>
  )
}

const DropDownMenuContainer = styled.form`
  margin-top: 40px;
  display: flex;
  gap: 20px;
`
const TextEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const TitleInput = styled.input`
  width: 100%;
  height: 50px;

  padding-left: 16px;
  background-color: var(--color-gray-600);

  font-size: 16px;
  color: var(--color-white);

  border: none;
  border-radius: 8px;

  &::placeholder {
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 0px;
    color: var(--color-gray-200);
  }
`

const TextSaveButton = styled.button`
  margin-left: auto;
  padding: 14px 24px;

  border: none;
  border-radius: 8px;
  background-color: var(--color-primary-500);

  font-weight: 600;
  font-size: 16px;
  color: var(--color-gray-800);

  cursor: pointer;
`

export default Write
