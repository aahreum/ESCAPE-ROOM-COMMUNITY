import { styled } from "styled-components"
import { Link, LinkProps } from "react-router-dom"
import { ReactComponent as LogoIcon } from "../../assets/logo.svg"
import { MdClose, MdMenu, MdSunny } from "react-icons/md"
import { IoMoon } from "react-icons/io5"
import { logout } from "../../reducers/authSlice"
import { useDispatch } from "react-redux"
import useAccountState from "../../service/useAccountState"
import { auth } from "../../firebase/firebase"
import { signOut } from "firebase/auth"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"
import useThemeChange from "../../service/useThemeChange"

const PageNav = (): JSX.Element => {
  const dispatch = useDispatch()
  const { isLogin } = useAccountState()
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, handleToggleClick } = useThemeChange()

  const handleToggleNav = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    await signOut(auth)
    dispatch(logout())
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `overflow: hidden`
      return () => {
        document.body.style.cssText = `overflow: auto`
      }
    }
  }, [isOpen])

  return (
    <NavContainer>
      <Nav>
        <Logo>
          <LogoLink to="/">
            <LogoIcon />
          </LogoLink>
        </Logo>
        <MenuList className={isOpen ? "is-open" : ""}>
          <MenuItem>
            <Link to="/mate">메이트구하기</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/review">탈출후기</Link>
          </MenuItem>
        </MenuList>
        <SearchBar />
        <ThemeButton type="button" onClick={handleToggleClick}>
          {isDark ? <IoMoon /> : <MdSunny />}
        </ThemeButton>
        {isLogin ? (
          <>
            <LogoutButton className={isOpen ? "is-open" : ""} type="button" onClick={handleLogout}>
              로그아웃
            </LogoutButton>
            <LoginMyPageButton className={isOpen ? "is-open" : ""} to="/mypage">
              마이페이지
            </LoginMyPageButton>
          </>
        ) : (
          <LoginMyPageButton className={isOpen ? "is-open" : ""} to="/login">
            로그인
          </LoginMyPageButton>
        )}
        <MobileMenuButton type="button" onClick={handleToggleNav}>
          {isOpen ? <MdClose /> : <MdMenu />}
        </MobileMenuButton>
        {isOpen && <MobileMenuConatiner />}
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

  @media ${(props) => props.theme.tablet} {
    display: none;
    &.is-open {
      position: absolute;
      left: 24px;
      top: 80px;
      margin-left: 0px;

      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 1001;
    }
  }
`

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--color-gray-100);
  width: 32px;
  height: 32px;
  margin-right: 16px;
  cursor: pointer;

  & > svg {
    width: 24px;
    height: 24px;
  }
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
  color: var(--color-gray-100);

  cursor: pointer;

  @media ${(props) => props.theme.tablet} {
    display: none;
    &.is-open {
      margin-right: 0;
      position: absolute;
      left: 24px;
      bottom: 110px;
      z-index: 1001;

      display: block;
      width: calc(100% - 48px);
      height: 48px;

      border: 1px solid var(--color-gray-100);
      border-radius: 8px;
    }
  }
`

const MobileMenuButton = styled.button`
  display: none;
  z-index: 1001;

  @media ${(props) => props.theme.tablet} {
    width: 24px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;

    cursor: pointer;
  }
  @media ${(props) => props.theme.tablet} {
    > svg {
      display: block;
      color: var(--color-gray-100);
      font-size: 24px;
    }
  }
`

const MobileMenuConatiner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;

  width: 100%;
  height: 100%;

  background-color: var(--color-gray-900);
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`

const LoginMyPageButton = styled(Link)<LinkProps>`
  padding: 15px 24px;

  border-radius: 8px;
  background-color: var(--color-primary-500);

  text-align: center;
  font-weight: 600;
  color: #1c1d1e;

  @media ${(props) => props.theme.tablet} {
    display: none;
    &.is-open {
      position: absolute;
      left: 24px;
      bottom: 48px;
      z-index: 1001;

      display: block;
      width: calc(100% - 48px);
    }
  }
`

export default PageNav
