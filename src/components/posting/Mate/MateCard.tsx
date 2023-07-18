import { styled } from "styled-components"
import ListBadge from "../ListBadge"
import { Link } from "react-router-dom"
import { BiSolidUserCircle } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { IoTimeSharp } from "react-icons/io5"
import { postTimeCalculation } from "../../../service/postGetDateCounter"
import { listDataType } from "../../../service/useGetData"

const MateCard = ({ state, title, nickname, people, createdTime }: listDataType) => {
  return (
    <Link to={"/mate/:id"}>
      <CardContainer>
        <ListBadge>{state}</ListBadge>
        <ListTitle>{title}</ListTitle>
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
            <p>{postTimeCalculation(createdTime)}</p>
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
  padding-left: 2px;
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
    gap: 6px;

    &:last-child {
      margin-left: auto;
    }
  }
`

export default MateCard
