import { styled } from "styled-components"

const SkeletonCard = (): JSX.Element => {
  return (
    <SkeletonCardEl>
      <div />
      <div />
      <div />
    </SkeletonCardEl>
  )
}

const SkeletonCardEl = styled.div`
  height: 156px;
  padding: 36px;
  border-radius: 16px;
  background-color: var(--color-gray-600);

  display: flex;
  flex-direction: column;
  gap: 14px;

  & > div {
    width: 100%;
    height: 20px;
    border-radius: 8px;
    background-color: var(--color-gray-300);
  }

  div: nth-child(1) {
    width: 20%;
  }
`

export default SkeletonCard
