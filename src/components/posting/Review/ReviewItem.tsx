import { Link } from "react-router-dom"
import ListBadge from "../ListBadge"
import { styled } from "styled-components"
import { BiSolidUserCircle } from "react-icons/bi"
import { FaUsers } from "react-icons/fa"
import { IoTimeSharp } from "react-icons/io5"
import { listDataType } from "../../../service/useGetPostData"
import { postTimeCalculation } from "../../../service/postGetDateCounter"

const ReviewItem = ({
  state,
  title,
  nickname,
  people,
  createdTime,
  id,
}: listDataType): JSX.Element => {
  return (
    <Link to={`/review/${id}`}>
      <ItemContainer>
        <ListBadge>{state}</ListBadge>
        <ListTitle>{title}</ListTitle>
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
      </ItemContainer>
    </Link>
  )
}

const ItemContainer = styled.div`
  padding: 36px;

  background-color: var(--color-gray-600);
  border-bottom: 1px solid var(--color-gray-300);

  display: flex;
  align-items: center;
  gap: 24px;
`

const ListTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  flex: 1;
`

const InfoItem = styled.div`
  display: flex;
  gap: 8px;

  color: var(--color-gray-200);
`

export default ReviewItem
