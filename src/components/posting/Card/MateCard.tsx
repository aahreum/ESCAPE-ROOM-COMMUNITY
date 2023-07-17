import { styled } from "styled-components"
import ListBadge from "./ListBadge"
import { Link } from "react-router-dom"
import { BiSolidUserCircle } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { IoTimeSharp } from "react-icons/io5"
import { Timestamp } from "firebase/firestore"
import { postTimeCalculation } from "../../../service/postGetDateCounter"

interface MateCardProps {
  badgeText: string
  listTitle: string
  nickname: string
  people: string
  timestamp: Timestamp
}

const MateCard = ({ badgeText, listTitle, nickname, people, timestamp }: MateCardProps) => {
  return (
    <Link to={"/mate/:id"}>
      <CardContainer>
        <ListBadge>{badgeText}</ListBadge>
        <ListTitle>{listTitle}</ListTitle>
        <InfoArea>
          <div>
            <BiSolidUserCircle />
            <p>{nickname}</p>
          </div>
          <div>
            <FaUsers />
            <p>{people}</p>
          </div>
          <div>
            <IoTimeSharp />
            <p>{postTimeCalculation(timestamp)}</p>
          </div>
        </InfoArea>
      </CardContainer>
    </Link>
  )
}

const CardContainer = styled.div`
  padding: 36px;
  border-radius: 16px;
  background-color: var(--color-gray-600);

  display: grid;
  align-items: flex-start;
  gap: 12px;

  cursor: pointer;
`

const ListTitle = styled.p`
  padding-left: 4px;
  font-size: 18px;
  font-weight: 700;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`

const InfoArea = styled.div`
  display: flex;
  gap: 16px;
  color: var(--color-gray-200);

  > div {
    display: flex;
    gap: 4px;

    &:last-child {
      margin-left: auto;
    }
  }
`

export default MateCard
