import { styled } from "styled-components"

interface authButtonProps {
  disabled?: boolean
  children: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const AuthButton = (props: authButtonProps) => {
  const { disabled, children, onClick } = props

  return (
    <AuthButtonEl type="submit" disabled={disabled} onClick={onClick}>
      {children}
    </AuthButtonEl>
  )
}

const AuthButtonEl = styled.button`
  height: 52px;
  border: none;
  border-radius: 8px;
  background-color: var(--color-primary-500);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-gray-800);
  cursor: pointer;

  &:disabled {
    background-color: #403813;
    cursor: not-allowed;
  }
`

export default AuthButton
