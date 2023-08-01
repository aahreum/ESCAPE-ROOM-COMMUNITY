import { styled } from "styled-components"

interface authInputProps {
  className?: string
  name: string
  type: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthInput = (props: authInputProps) => {
  const { className, name, type, value, onChange, placeholder } = props

  return (
    <InputEl
      className={className}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  )
}

const InputEl = styled.input`
  flex: 1;
  min-height: 50px;
  padding-left: 16px;
  border: none;
  border-radius: 8px;
  background-color: var(--color-gray-600);
  font-size: 16px;
  color: var(--color-white);

  &:focus {
    outline: none;
    border: 1px solid var(--color-primary-500);
  }

  &[type="password"] {
    font-weight: 700;
  }

  &::placeholder {
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 0px;
    color: var(--color-gray-200);
  }

  &.error {
    border: 1px solid var(--color-negative-500);
  }
`
export default AuthInput
