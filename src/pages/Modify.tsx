import { ChangeEvent, useEffect, useState } from "react"
import useContentNameChange from "../service/useContentNameChange"
import useGetPostData from "../service/useGetPostData"
import { styled } from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import usePathname from "../service/usePathname"
import usePathnameChange from "../service/useContentNameChange"
import PostingContainer from "../components/posting/PostingCommon/PostingContainer"
import DropDownMenuArea from "../components/posting/PostingCommon/DropDownMenuArea"
import TitleInput from "../components/posting/PostingCommon/TitleInput"
import TextEditor from "../components/posting/PostingCommon/TextEditor"
import WriteTitle from "../components/posting/PostingCommon/WriteTitle"

const Modify = () => {
  const { id } = useParams()
  const { includesMateSlash } = usePathname()
  const { getDataNameChange } = useContentNameChange()
  const { contentData, loading } = useGetPostData(getDataNameChange())
  const [editedTitle, setEditedTitle] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [editedSelectedPeople, setEditedSelectedPeople] = useState("")
  const [editedselectedState, setEditedSelectedState] = useState("")
  const [dataId, setDataId] = useState("")
  const navigate = useNavigate()
  const { pathnameChange } = usePathnameChange()

  useEffect(() => {
    const data = contentData?.find((contentData) => {
      return contentData.id === id
    })

    const fetchData = () => {
      if (data) {
        setEditedTitle(data.title)
        setEditedContent(data.content)
        setEditedSelectedPeople(data.people)
        setEditedSelectedState(data.state)
        setDataId(data.id)
      }
    }

    fetchData()
  }, [contentData, id])

  const collectionName = () => {
    if (includesMateSlash) return "mateContents"
    else return "reviewContents"
  }

  const handleUpdatePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const collectionRef = collection(db, collectionName())
      const docRef = doc(collectionRef, dataId)
      await updateDoc(docRef, {
        title: editedTitle,
        content: editedContent,
        people: editedSelectedPeople,
        state: editedselectedState,
      })
      navigate(`${pathnameChange()}/${docRef.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return <div>로딩중</div>
  }

  return (
    <PostingContainer>
      <WriteTitle />
      <TextEditArea>
        <DropDownMenuArea
          selectedPeople={editedSelectedPeople}
          setSelectedPeople={setEditedSelectedPeople}
          setSelectedState={setEditedSelectedState}
          selectedState={editedselectedState}
        />
        <TitleInput
          title={editedTitle}
          setTitle={(e: ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}
        />
        <TextEditor content={editedContent} setContent={setEditedContent} />
        <ModifyButton type="submit" onClick={handleUpdatePost}>
          수정완료
        </ModifyButton>
      </TextEditArea>
    </PostingContainer>
  )
}

const TextEditArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ModifyButton = styled.button`
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

export default Modify
