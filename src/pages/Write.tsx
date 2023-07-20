import { styled } from "styled-components"
import { PLACEHOLDER } from "../constants/dropDownMenu"
import PostingContainer from "../components/posting/PostingContainer"
import { useLocation, useNavigate } from "react-router-dom"
import TextEditor from "../components/posting/TextEditor"
import { ChangeEvent, useEffect, useState } from "react"
import Modal from "../components/common/Modal"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { MATE_WRITE } from "../constants/postPathname"
import TextEditTitle from "../components/posting/TextEditTitle"
import usePathnameChange from "../service/useContentNameChange"
import { db } from "../firebase/firestore"
import { auth } from "../firebase/auth"
import DropDownMenuArea from "../components/posting/DropDownMenuArea"
import TitleInput from "../components/posting/TitleInput"

const Write = (): JSX.Element => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [contentTitle, setContentTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedPeople, setSelectedPeople] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contentSave, setContentSave] = useState(false)
  const { pathnameChange } = usePathnameChange()

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

  const handleSavePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        navigate(`${pathnameChange()}/${docRef.id}`)
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
        <TextEditTitle />
        <TextEditArea>
          <DropDownMenuArea
            selectedPeople={selectedPeople}
            setSelectedPeople={setSelectedPeople}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
          <TitleInput
            title={contentTitle}
            setTitle={(e: ChangeEvent<HTMLInputElement>) => setContentTitle(e.target.value)}
          />
          <TextEditor content={content} setContent={setContent} />
          <TextSaveButton onClick={handleSavePost} type="submit">
            작성완료
          </TextSaveButton>
        </TextEditArea>
      </PostingContainer>
    </>
  )
}

const TextEditArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
