import DropDownMenu from "./DropDownMenu"
import {
  ESCAPE_STATUS,
  NUMBER_OF_PEOPLE,
  PLACEHOLDER,
  RECRUITMENT_STATUS,
} from "../../../constants/dropDownMenu"
import { styled } from "styled-components"
import usePathname from "../../../service/usePathname"

interface DropDownMenuAreaProps {
  selectedPeople?: string
  setSelectedPeople?: React.Dispatch<React.SetStateAction<string>>
  selectedState?: string
  setSelectedState?: React.Dispatch<React.SetStateAction<string>>
}

const DropDownMenuArea = ({
  selectedPeople,
  setSelectedPeople,
  selectedState,
  setSelectedState,
}: DropDownMenuAreaProps) => {
  const { includesMateSlash } = usePathname()

  const renderDropDwonMenu = () => {
    if (includesMateSlash) {
      return (
        <DropDownMenu
          name="모집여부"
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          placeHolder={selectedState || PLACEHOLDER.recruitment}
          dropDownMenu={RECRUITMENT_STATUS}
        />
      )
    } else {
      return (
        <DropDownMenu
          name="탈출여부"
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          placeHolder={selectedState || PLACEHOLDER.escape}
          dropDownMenu={ESCAPE_STATUS}
        />
      )
    }
  }

  return (
    <Container>
      <DropDownMenu
        name="인원수"
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
        placeHolder={selectedPeople || PLACEHOLDER.people}
        dropDownMenu={NUMBER_OF_PEOPLE}
      />
      {renderDropDwonMenu()}
    </Container>
  )
}
const Container = styled.form`
  margin-top: 40px;
  display: flex;
  gap: 20px;

  @media ${(props) => props.theme.tablet} {
    margin-top: 20px;
    flex-direction: column;
  }
`

export default DropDownMenuArea
