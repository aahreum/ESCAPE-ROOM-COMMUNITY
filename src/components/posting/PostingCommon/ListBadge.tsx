import { ReactNode } from "react"
import { styled } from "styled-components"

interface ListBadgeProps {
  children: ReactNode
  $positive?: boolean
}

const ListBadge = ({ children }: ListBadgeProps): JSX.Element => {
  const isPositive = children === "모집중" || children === "탈출성공"

  return <Badge $positive={isPositive}>{children}</Badge>
}

const Badge = styled.span<ListBadgeProps>`
  margin-right: auto;
  padding: 6px 8px;

  border-radius: 8px;
  background-color: ${(props) =>
    props.$positive ? "var(--color-positive-100)" : "var(--color-negative-100)"};

  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.$positive ? "var(--color-positive-500)" : "var(--color-negative-500)"};

  @media ${(props) => props.theme.mobile} {
    padding: 4px;
    font-size: 12px;
  }
`

export default ListBadge
