import { styled } from "styled-components"
import { Link } from "react-router-dom"
import { ReactComponent as LogoIcon } from "../../assets/logo.svg"
import { BiSearch } from "react-icons/bi"
import { useState } from "react"
import { logout } from "../../reducers/authSlice"
import { useDispatch } from "react-redux"
import useAccountState from "../../service/useAccountState"
import LinkButton from "./LinkButton"
import { auth } from "../../firebase/firebase"
import { signOut } from "firebase/auth"

const PageNav = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const { isLogin } = useAccountState()

  const handleSearch = () => {
    setIsSearchVisible(true)
  }

  const handleSearchButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSearchVisible(false)
  }

  const handleLogout = async () => {
    await signOut(auth)
    dispatch(logout())
  }

  return (
    <NavContainer>
      <Nav>
        <Logo>
          <LogoLink to="/">
            <LogoIcon />
          </LogoLink>
        </Logo>
        <MenuList>
          <MenuItem>
            <Link to="/mate">메이트구하기</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/review">탈출후기</Link>
          </MenuItem>
        </MenuList>
        <SearchContainer>
          {isSearchVisible ? (
            <SearchBar>
              <SearchInput type="text" placeholder="검색어를 입력해주세요." />
              <SearchInputButton type="submit" onClick={handleSearchButton}>
                <BiSearch />
              </SearchInputButton>
            </SearchBar>
          ) : (
            <Search type="button" onClick={handleSearch}>
              검색
              <BiSearch />
            </Search>
          )}
        </SearchContainer>
        {isLogin ? (
          <>
            <LogoutButton type="button" onClick={handleLogout}>
              로그아웃
            </LogoutButton>
            <LinkButton to="/mypage">마이페이지</LinkButton>
          </>
        ) : (
          <LinkButton to="/login">로그인</LinkButton>
        )}
      </Nav>
    </NavContainer>
  )
}

const Logo = styled.h1`
  width: 73px;
  height: 26px;
`

const LogoLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
`

const NavContainer = styled.div`
  width: 100%;
  height: 68px;
`
const Nav = styled.nav`
  margin: 0 auto;
  padding: 0 24px;

  max-width: 1320px;
  height: 100%;

  display: flex;
  align-items: center;
`

const MenuList = styled.ul`
  margin-left: 36px;
  display: flex;
  gap: 16px;
`

const MenuItem = styled.li`
  font-weight: 500;
  margin: 4px;

  > a {
    padding: 4px;
  }
`
const SearchBar = styled.form`
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

const LogoutButton = styled.button`
  margin-right: 24px;
  padding: 4px;

  border: none;
  background-color: transparent;

  font-size: 16px;
  font-weight: 500;
  color: var(--color-white);

  cursor: pointer;
`

export default PageNav
