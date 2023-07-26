import { styled } from "styled-components"
import { PLACEHOLDER } from "../constants/dropDownMenu"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import Modal from "../components/common/Modal"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import usePathnameChange from "../service/useContentNameChange"

import { auth, db } from "../firebase/firebase"
import usePathname from "../service/usePathname"
import PostingContainer from "../components/posting/PostingCommon/PostingContainer"
import DropDownMenuArea from "../components/posting/PostingCommon/DropDownMenuArea"
import TitleInput from "../components/posting/PostingCommon/TitleInput"
import TextEditor from "../components/posting/PostingCommon/TextEditor"
import WriteTitle from "../components/posting/PostingCommon/WriteTitle"

const Write = (): JSX.Element => {
  const navigate = useNavigate()
  const { includesMateSlash } = usePathname()
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
    if (includesMateSlash) return "mateContents"
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
        <WriteTitle />
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

  @media ${(props) => props.theme.mobile} {
    padding: 13px 16px;
    font-size: 14px;
  }
`

export default Write
