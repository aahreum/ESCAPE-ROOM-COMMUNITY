import { styled } from "styled-components"
import { ReactComponent as GithubIcon } from "../../assets/github.svg"
import { ReactComponent as TistoryIcon } from "../../assets/tistory.svg"

const PageFooter = () => {
  return (
    <Footer>
      <Text>개인프로젝트 - 방탈출 커뮤니티</Text>
      <IconContainer>
        <a href="https://github.com/aahreum" target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
        <a href="https://cocoding420.tistory.com/" target="_blank" rel="noopener noreferrer">
          <TistoryIcon />
        </a>
      </IconContainer>
    </Footer>
  )
}

const Footer = styled.footer`
  width: 100%;
  height: 200px;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const Text = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: var(--color-gray-200);
`

const IconContainer = styled.div`
  display: flex;
  gap: 16px;
`

export default PageFooter
