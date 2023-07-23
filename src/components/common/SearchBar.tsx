import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import { BiSearch } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const searchContainerRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    setIsSearchVisible(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }

  const handleSearchButton = () => {
    if (search.length === 0) {
      setIsSearchVisible(false)
    } else {
      setSearch("")
      setIsSearchVisible(false)
      navigate(`/search?keyword=${search}`)
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setIsSearchVisible(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      handleOutsideClick(event)
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <SearchContainer>
      {isSearchVisible ? (
        <SearchArea ref={searchContainerRef}>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="검색어를 입력해주세요."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          <SearchInputButton
            type="submit"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              handleSearchButton()
            }}
          >
            <BiSearch />
          </SearchInputButton>
        </SearchArea>
      ) : (
        <Search
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            handleSearch()
          }}
        >
          검색
          <BiSearch />
        </Search>
      )}
    </SearchContainer>
  )
}

const SearchArea = styled.form`
  position: relative;
  width: 300px;
  height: 42px;
`

const SearchInput = styled.input`
  padding-left: 16px;
  border-radius: 8px;
  background-color: var(--color-gray-600);

  font-size: 16px;
  color: var(--color-white);
  border: none;
  width: 300px;
  height: 42px;

  &::placeholder {
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 0px;
    color: var(--color-gray-200);
  }
`

const SearchInputButton = styled.button`
  width: 24px;
  height: 24px;

  position: absolute;
  right: 16px;
  top: 50%;

  transform: translateY(-50%);

  border: none;
  background-color: transparent;
  color: var(--color-white);
  cursor: pointer;

  > svg {
    font-size: 24px;
  }
`

const SearchContainer = styled.div`
  margin-left: auto;
  margin-right: 24px;
`

const Search = styled.button`
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 8px;

  border: none;
  background-color: transparent;

  font-size: 16px;
  font-weight: 500;
  color: var(--color-white);

  cursor: pointer;

  > svg {
    font-size: 24px;
  }
`

export default SearchBar
