import { styled } from "styled-components"
import ListBadge from "../ListBadge"
import { postTimeCalculation } from "../../../service/postGetDateCounter"
import { FaUsers } from "react-icons/fa"
import { IoTimeSharp } from "react-icons/io5"
import { useState } from "react"
import LinkButton from "../../common/LinkButton"
import { useNavigate } from "react-router-dom"
import { DataType } from "../../../service/useGetPostData"
import { deleteDoc, doc } from "firebase/firestore"
import Modal from "../../common/Modal"
import QuillDisplay from "./QuillDisplay"
import useContentNameChange from "../../../service/useContentNameChange"
import useAccountState from "../../../service/useAccountState"
import usePathname from "../../../service/usePathname"
import { auth, db } from "../../../firebase/firebase"

const ContentView = ({ title, content, state, nickname, people, createdTime, id }: DataType) => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { pathnameChange } = useContentNameChange()
  const { isLogin } = useAccountState()
  const { includesMateSlash } = usePathname()

  const deleteContent = () => {
    if (includesMateSlash) {
      deleteDoc(doc(db, "mateContents", id))
      navigate("/mate")
    } else {
      deleteDoc(doc(db, "reviewContents", id))
      navigate("/review")
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
          modalButtonText1="취소"
          closeModal={closeModal}
          modalButtonText2="삭제"
          handleModal={deleteContent}
          modalTitle="게시글을 삭제할까요?"
          twoButtons
        />
      )}
      <>
        <TitleArea>
          <ListBadge>{state}</ListBadge>
          <ContentTitle>{title}</ContentTitle>
          <InfoArea>
            <InfoDesc>작성자: {nickname}</InfoDesc>
            <InfoItem>
              <FaUsers />
              <InfoDesc>{people}</InfoDesc>
            </InfoItem>
            <InfoItem>
              <IoTimeSharp />
              <InfoDesc>{postTimeCalculation(createdTime)}</InfoDesc>
            </InfoItem>
          </InfoArea>
        </TitleArea>
        <ContentArea>
          <QuillDisplay content={content} />
        </ContentArea>
        <ButtonArea>
          {isLogin && auth.currentUser?.displayName === nickname && (
            <>
              <LinkButton
                to={`${pathnameChange()}/${id}/modify`}
                $border
                $color="var(--color-white)"
                $bgColor="var(--color-gray-600)"
              >
                수정하기
              </LinkButton>
              <DeleteButton type="button" onClick={openModal}>
                삭제하기
              </DeleteButton>
            </>
          )}
          <LinkButton to={pathnameChange()}>목록보기</LinkButton>
        </ButtonArea>
      </>
    </>
  )
}

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ContentTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
`
const InfoArea = styled.div`
  display: flex;
  gap: 16px;
`

const InfoItem = styled.div`
  display: flex;
  gap: 4px;

  & > svg {
    color: var(--color-gray-200);
  }
`

const InfoDesc = styled.p`
  color: var(--color-gray-200);
`

const ContentArea = styled.div`
  margin-top: 24px;
  padding: 24px;
  border-top: 1px solid var(--color-gray-300);
  border-bottom: 1px solid var(--color-gray-300);

  .ql-container {
    border: none;
  }

  .ql-editor {
    padding: 0;

    & > h3 {
      font-size: 24px;
    }

    & > h4 {
      font-size: 20px;
    }

    & > p {
      font-size: 16px;
    }
  }
`

const ButtonArea = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;

  & > :first-child {
    margin-left: auto;
  }
`

const DeleteButton = styled.button`
  padding: 0 24px;

  background-color: var(--color-gray-600);
  border: 1px solid var(--color-negative-500);
  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;
  color: var(--color-negative-500);

  cursor: pointer;
`

export default ContentView
