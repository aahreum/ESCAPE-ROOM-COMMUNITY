import { styled } from "styled-components"
import { BiSolidUserCircle } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { IoTimeSharp } from "react-icons/io5"
import { Timestamp } from "firebase/firestore"
import { postTimeCalculation } from "../../../service/postGetDateCounter"

interface InfoAreaProps {
  nickname: string
  people: string
  createdTime: Timestamp
}

const InfoArea = ({ nickname, people, createdTime }: InfoAreaProps) => {
  return (
    <Container>
      <InfoItem>
        <BiSolidUserCircle />
        <p>{nickname}</p>
      </InfoItem>
      <InfoItem>
        <FaUsers />
        <p>{people}</p>
      </InfoItem>
      <InfoItem>
        <IoTimeSharp />
        <p>{postTimeCalculation(createdTime)}</p>
      </InfoItem>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 24px;

  @media ${(props) => props.theme.mobile} {
    gap: 16px;
  }
`

const InfoItem = styled.div`
  display: flex;
  gap: 8px;

  color: var(--color-gray-200);

  &:last-child {
    margin-left: auto;
  }

  @media ${(props) => props.theme.mobile} {
    font-size: 14px;
  }
`

export default InfoArea
