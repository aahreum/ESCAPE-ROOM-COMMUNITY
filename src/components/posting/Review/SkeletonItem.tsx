import { styled } from "styled-components"

const SkeletonItem = (): JSX.Element => {
  return (
    <SkeletonItemEl>
      <div />
      <div />
      <div />
      <div />
      <div />
    </SkeletonItemEl>
  )
}

const SkeletonItemEl = styled.div`
  padding: 36px;

  background-color: var(--color-gray-600);
  border-bottom: 1px solid var(--color-gray-300);

  display: flex;
  align-items: center;
  gap: 24px;

  & > div {
    width: 100px;
    height: 26px;
    border-radius: 8px;
    background-color: var(--color-gray-300);
  }

  div: nth-child(2) {
    width: 100%;
  }
`

export default SkeletonItem
