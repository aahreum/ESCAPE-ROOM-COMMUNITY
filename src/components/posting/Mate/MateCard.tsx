import { styled } from "styled-components"
import ListBadge from "../ListBadge"
import { Link } from "react-router-dom"
import { listDataType } from "../../../service/useGetPostData"
import InfoArea from "../InfoArea"

const MateCard = ({
  state,
  title,
  nickname,
  people,
  createdTime,
  id,
}: listDataType): JSX.Element => {
  return (
    <Link to={`/mate/${id}`}>
      <CardContainer>
        <ListBadge>{state}</ListBadge>
        <ListTitle>{title}</ListTitle>
        <InfoArea nickname={nickname} people={people} createdTime={createdTime} />
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

  @media ${(props) => props.theme.tablet} {
    padding: 28px 24px;
  }
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

export default MateCard
