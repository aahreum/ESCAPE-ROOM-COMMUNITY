import { styled } from "styled-components"
import { Link } from "react-router-dom"
import { ReactComponent as LogoIcon } from "../../assets/logo.svg"

import { logout } from "../../reducers/authSlice"
import { useDispatch } from "react-redux"
import useAccountState from "../../service/useAccountState"
import LinkButton from "./LinkButton"
import { auth } from "../../firebase/firebase"
import { signOut } from "firebase/auth"
import SearchBar from "./SearchBar"

const PageNav = (): JSX.Element => {
  const dispatch = useDispatch()
  const { isLogin } = useAccountState()

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
        <SearchBar />
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
