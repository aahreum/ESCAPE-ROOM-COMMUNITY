import { styled } from "styled-components"
import { ReactComponent as LogoIcon } from "../../assets/logo_124.svg"

const LogoNav = () => {
  return (
    <Logo>
      <LogoLink href="/">
        <LogoIcon />
      </LogoLink>
    </Logo>
  )
}

const Logo = styled.h1`
  width: 124px;
  margin: 80px auto 60px;
`

const LogoLink = styled.a`
  width: 100%;
  height: 46px;
  display: inline-block;
`

export default LogoNav