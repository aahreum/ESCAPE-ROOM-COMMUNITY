import { Link, LinkProps } from "react-router-dom"
import { styled } from "styled-components"

interface LinkButtonProps extends LinkProps {
  children: string
  $bgColor?: string
  $color?: string
}
const LinkButton = ({ children, $bgColor, $color, ...rest }: LinkButtonProps) => {
  return (
    <LinkButtonEl $bgColor={$bgColor} $color={$color} {...rest}>
      {children}
    </LinkButtonEl>
  )
}

const LinkButtonEl = styled(Link)<LinkButtonProps>`
  padding: 14px 24px;

  border-radius: 8px;
  background-color: ${(props) => props.$bgColor || "var(--color-primary-500)"};

  font-weight: 600;
  color: ${(props) => props.$color || "var(--color-gray-800)"};
`

export default LinkButton
