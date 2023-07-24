import { Link } from "react-router-dom"
import ListBadge from "../ListBadge"
import { styled } from "styled-components"
import { listDataType } from "../../../service/useGetPostData"
import InfoArea from "../InfoArea"

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
        <InfoArea nickname={nickname} people={people} createdTime={createdTime} />
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

  @media ${(props) => props.theme.tablet} {
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`

const ListTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  flex: 1;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`

export default ReviewItem
