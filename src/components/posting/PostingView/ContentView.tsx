import { styled } from "styled-components"
import PostingContainer from "../PostingContainer"
import ListBadge from "../ListBadge"
import { postTimeCalculation } from "../../../service/postGetDateCounter"
import { FaUsers } from "react-icons/fa"
import { IoTimeSharp } from "react-icons/io5"
import React, { useState } from "react"
import LinkButton from "../../common/LinkButton"
import { useLocation, useNavigate } from "react-router-dom"
import { DataType } from "../../../service/useGetData"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../../firebase/firebase"
import Modal from "../../common/Modal"

const ContentView = ({
  title,
  content,
  state,
  nickname,
  people,
  createdTime,
  id,
  views,
}: DataType) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const contentToHtml = React.createElement("div", { dangerouslySetInnerHTML: { __html: content } })

  const deleteContent = () => {
    if (pathname.includes("/mate/")) {
      deleteDoc(doc(db, "mateContents", id))
      navigate("/mate")
    } else if (pathname.includes("/review/")) {
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
      <PostingContainer>
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
            <InfoDesc>조회수: {views}</InfoDesc>
          </InfoArea>
        </TitleArea>
        <Content>{contentToHtml}</Content>
        <ButtonArea>
          <DeleteButton type="button" onClick={openModal}>
            삭제하기
          </DeleteButton>
          <LinkButton to={pathname.includes("/mate/") ? "/mate" : "/review"}>목록보기</LinkButton>
        </ButtonArea>
      </PostingContainer>
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

const Content = styled.div`
  margin-top: 24px;
  padding: 24px;
  border-top: 1px solid var(--color-gray-300);
  border-bottom: 1px solid var(--color-gray-300);

  line-height: 24px;

  & > div > h3 {
    font-size: 24px;
    line-height: 32px;
  }

  & > div > h4 {
    font-size: 20px;
    line-height: 28px;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: end;
  }

  & > div > blockquote {
    margin: 8px 0;
    padding: 15px;
    background-color: var(--color-gray-600);
    border-radius: 5px;
  }

  & > div > ol {
    list-style: auto;
  }

  & > div > ul {
    list-style: disc;
  }

  & > div > p > a {
    color: var(--color-primary-500);
    text-decoration: underline;
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

const DeleteButton = styled.button``

export default ContentView