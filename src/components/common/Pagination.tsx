import { styled } from "styled-components"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { useState } from "react"

interface PaginationProps {
  total: number
  limit: number
  page: number
  setPage: (index: number) => void
}

const Pagination = ({ total, limit, page, setPage }: PaginationProps) => {
  const pagesNumber = Math.ceil(total / limit)

  const [currentPageGroup, setCurrentPageGroup] = useState(1)
  const paginationLimit = 5
  const pageGroupFirstNumber = (currentPageGroup - 1) * paginationLimit + 1
  const pageGroupLastNumber = currentPageGroup * paginationLimit

  const goToPrev = () => {
    if (pageGroupFirstNumber === page) {
      setCurrentPageGroup((prev) => prev - 1)
      setPage(page - 1)
    } else {
      setPage(page - 1)
    }
  }

  const goToNext = () => {
    if (pageGroupLastNumber === page) {
      setCurrentPageGroup((prev) => prev + 1)
      setPage(page + 1)
    } else {
      setPage(page + 1)
    }
  }

  const renderPaginationButtons = () => {
    const buttons = []
    for (let i = pageGroupFirstNumber; i <= pageGroupLastNumber; i++) {
      if (i > pagesNumber) break
      buttons.push(
        <PaginationButton
          key={i}
          onClick={() => setPage(i)}
          className={`${page === i && "active"}`}
          aria-current={page === i && "page"}
        >
          {i}
        </PaginationButton>,
      )
    }
    return buttons
  }

  return (
    <PaginationContainer>
      <PaginationButton type="button" onClick={goToPrev} disabled={page === 1}>
        <IoIosArrowBack />
      </PaginationButton>
      {renderPaginationButtons()}
      <PaginationButton type="button" onClick={goToNext} disabled={page === pagesNumber}>
        <IoIosArrowForward />
      </PaginationButton>
    </PaginationContainer>
  )
}

const PaginationContainer = styled.nav`
  margin-top: 40px;
  display: flex;
  gap: 8px;
  justify-content: center;
`

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border: none;
  background-color: transparent;

  font-size: 16px;
  color: var(--color-white);

  cursor: pointer;

  > svg {
    color: var(--color-primary-500);
  }

  &:disabled > svg {
    color: var(--color-gray-600);
  }

  &.active {
    border-radius: 8px;
    background-color: var(--color-primary-500);

    font-weight: 600;
    color: var(--color-gray-800);
  }
`

export default Pagination
