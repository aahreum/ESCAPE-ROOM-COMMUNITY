import { styled } from "styled-components"
import Title from "../components/common/Title"
import DropDownMenu from "../components/posting/DropDownMenu"
import {
  ESCAPE_STATUS,
  NUMBER_OF_PEOPLE,
  PLACEHOLDER,
  RECRUITMENT_STATUS,
} from "../constants/dropDownMenu"
import PostingContainer from "../components/posting/PostingContainer"
import { useLocation, useNavigate } from "react-router-dom"
import TextEditor from "../components/posting/TextEditor"
import { ChangeEvent, useEffect, useState } from "react"
import Modal from "../components/common/Modal"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { auth, db } from "../firebase/firebase"
import { MATE_WRITE, REVIEW_WRITE } from "../constants/postPathname"

const Write = (): JSX.Element => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [contentTitle, setContentTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedPeople, setSelectedPeople] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contentSave, setContentSave] = useState(false)

  const renderTitle = () => {
    if (pathname === MATE_WRITE) return "메이트 구하기"
    else if (pathname === REVIEW_WRITE) return "탈출후기"
  }

  const renderDropDwonMenu = () => {
    if (pathname === MATE_WRITE) {
      return (
        <DropDownMenu
          name="모집여부"
          seletedState={selectedState}
          setSelectedState={setSelectedState}
          placeHolder={PLACEHOLDER.recruitment}
          dropDownMenu={RECRUITMENT_STATUS}
        />
      )
    } else if (pathname === REVIEW_WRITE) {
      return (
        <DropDownMenu
          name="탈출여부"
          seletedState={selectedState}
          setSelectedState={setSelectedState}
          placeHolder={PLACEHOLDER.escape}
          dropDownMenu={ESCAPE_STATUS}
        />
      )
    }
  }

  useEffect(() => {
    if (contentSave) {
      setContentTitle("")
      setContent("")
      setSelectedPeople(PLACEHOLDER.people)
      setSelectedState(PLACEHOLDER.recruitment)
      setSelectedState(PLACEHOLDER.escape)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentSave])

  const collectionName = () => {
    if (pathname === MATE_WRITE) return "mateContents"
    else return "reviewContents"
  }

  const pathName = () => {
    if (pathname === MATE_WRITE) return "mate"
    else return "review"
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (
        content.length === 0 ||
        contentTitle.length === 0 ||
        selectedPeople.length === 0 ||
        selectedState.length === 0
      ) {
        setContentSave(false)
        openModal()
      } else {
        const docRef = await addDoc(collection(db, collectionName()), {
          title: contentTitle,
          createdTime: Timestamp.fromDate(new Date()),
          content: content,
          nickname: auth.currentUser?.displayName,
          people: selectedPeople,
          state: selectedState,
          views: 0,
        })
        navigate(`/${pathName()}/${docRef.id}`)
        setContentSave(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          modalTitle="모든 내용을 입력해주세요."
          modalButtonText1="확인"
        />
      )}
      <PostingContainer>
        <Title>{renderTitle()}</Title>
        <TextEditContainer>
          <DropDownMenuContainer>
            <DropDownMenu
              name="인원수"
              selectedPeople={selectedPeople}
              setSelectedPeople={setSelectedPeople}
              placeHolder={PLACEHOLDER.people}
              dropDownMenu={NUMBER_OF_PEOPLE}
            />
            {renderDropDwonMenu()}
          </DropDownMenuContainer>
          <TitleInput
            value={contentTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setContentTitle(e.target.value)}
            type="text"
            placeholder="제목을 입력해주세요"
          />
          <TextEditor content={content} setContent={setContent} />
          <TextSaveButton onClick={handleSave} type="submit">
            작성완료
          </TextSaveButton>
        </TextEditContainer>
      </PostingContainer>
    </>
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
