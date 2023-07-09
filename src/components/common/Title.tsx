import styled from "styled-components"

interface titleProps {
  children: string
  $textAlign?: string
}

const Title = (props: titleProps) => {
  return <TitleEl $textAlign={props.$textAlign}>{props.children}</TitleEl>
}

const TitleEl = styled.h2<titleProps>`
  font-size: 32px;
  font-weight: 600;
  text-align: ${(props) => props.$textAlign || "left"};
`

export default Title