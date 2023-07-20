import { styled } from "styled-components"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import { useState } from "react"

interface DropDownMenuProps {
  placeHolder: string
  dropDownMenu: string[]
  name: string
  selectedPeople?: string
  setSelectedPeople?: React.Dispatch<React.SetStateAction<string>>
  selectedState?: string
  setSelectedState?: React.Dispatch<React.SetStateAction<string>>
}

const DropDownMenu = ({
  placeHolder,
  dropDownMenu,
  name,
  selectedState,
  setSelectedState,
  selectedPeople,
  setSelectedPeople,
}: DropDownMenuProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened)
  }

  const handleItem = (item: string) => {
    if (name === "인원수") {
      if (setSelectedPeople) {
        setSelectedPeople(item)
      }
    } else if (name === "탈출여부" || name === "모집여부") {
      if (setSelectedState) {
        setSelectedState(item)
      }
    }
    setIsSelected(true)
    setIsOpened(false)
  }

  const defaultSelected = () => {
    if (isSelected) {
      if (name === "모집여부" || name === "탈출여부") return selectedState
      if (name === "인원수") return selectedPeople
    } else {
      return placeHolder
    }
  }

  return (
    <DropDownContainer>
      <DropDown type="button" onClick={handleOpen}>
        <SelectedText className={`${!isSelected && "not-selected"}`}>
          {defaultSelected()}
        </SelectedText>
        {isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDown>
      {isOpened && (
        <MenuList>
          {dropDownMenu.map((item: string, index: number) => (
            <MenuItem
              type="button"
              key={`${index}_${item}`}
              value={item}
              onClick={() => handleItem(item)}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </DropDownContainer>
  )
}

const DropDownContainer = styled.div`
  position: relative;
`

const DropDown = styled.button`
  padding: 0 16px;
  width: 230px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: none;
  border-radius: 8px;

  background-color: var(--color-gray-600);

  > svg {
    padding: 4px;
    width: 28px;
    height: 28px;
    color: var(--color-gray-300);
  }
`

const SelectedText = styled.p`
  font-size: 16px;
  color: var(--color-white);

  &.not-selected {
    font-weight: 300;
    color: var(--color-gray-200);
  }
`

const MenuList = styled.div`
  position: absolute;
  z-index: 1000;

  margin-top: 8px;
  padding: 8px 0;
  width: 230px;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
  background-color: var(--color-gray-600);
`

const MenuItem = styled.button`
  padding-left: 16px;
  height: 48px;

  display: flex;
  align-items: center;

  border: none;
  background-color: var(--color-gray-600);

  font-size: 16px;
  color: var(--color-white);

  &:hover {
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.2);
    color: var(--color-primary-500);
  }
`

export default DropDownMenu
