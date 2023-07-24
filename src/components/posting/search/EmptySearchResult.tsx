import { styled } from "styled-components"
import { PiWarningCircleBold } from "react-icons/pi"

const EmptySearchResult = () => {
  return (
    <Empty>
      <PiWarningCircleBold />
      <p>검색결과가 없습니다.</p>
    </Empty>
  )
}

const Empty = styled.div`
  margin-top: 32px;
  padding: 40px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 8px;
  background-color: var(--color-gray-600);

  font-size: 20px;

  > svg {
    font-size: 32px;
  }

  @media ${(props) => props.theme.desktop} {
    margin-top: 24px;
  }
  @media ${(props) => props.theme.tablet} {
    margin-top: 16px;
    font-size: 16px;
  }
`
export default EmptySearchResult
