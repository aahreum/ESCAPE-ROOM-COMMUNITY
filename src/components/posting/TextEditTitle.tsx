import { useLocation } from "react-router-dom"
import Title from "../common/Title"

const TextEditTitle = () => {
  const { pathname } = useLocation()

  const renderTitle = () => {
    if (pathname.includes("/mate/")) return "메이트 구하기"
    else return "탈출후기"
  }

  return <Title>{renderTitle()}</Title>
}

export default TextEditTitle
