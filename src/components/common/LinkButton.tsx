import { Link, LinkProps } from "react-router-dom"
import { styled } from "styled-components"

interface LinkButtonProps extends LinkProps {
  children: string
  $bgColor?: string
  $color?: string
  $border?: boolean
}
const LinkButton = ({ children, $bgColor, $color, ...rest }: LinkButtonProps) => {
  return (
    <LinkButtonEl $bgColor={$bgColor} $color={$color} {...rest}>
      {children}
    </LinkButtonEl>
  )
}

const LinkButtonEl = styled(Link)<LinkButtonProps>`
  padding: 15px 24px;

  border-radius: 8px;
  background-color: ${(props) => props.$bgColor || "var(--color-primary-500)"};
  ${(props) => props.$border && `border: 1px solid ${props.$color}`};

  text-align: center;
  font-weight: 600;
  color: ${(props) => props.$color || "var(--color-gray-800)"};

  @media ${(props) => props.theme.mobile} {
    padding: 15px 16px;
    font-size: 14px;
  }
`

export default LinkButton
