import { styled } from "styled-components"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import { useState } from "react"

interface DropDownMenuProps {
  placeHolder?: string
  dropDownMenu: string[]
}

const DropDownMenu = ({ ...props }: DropDownMenuProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [selectedItem, setSelectedItem] = useState("")

  const handleOpen = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened)
  }

  const handleItem = (item: string) => {
    setSelectedItem(item)
    setIsSelected(true)
    setIsOpened(false)
  }

  const defaultSelected = () => {
    if (!props.placeHolder) {
      setIsSelected(true)
      setSelectedItem(props.dropDownMenu[0])
      return props.dropDownMenu[0]
    } else {
      return props.placeHolder
    }
  }

  return (
    <DropDownContainer>
      <DropDown type="button" onClick={handleOpen}>
        <SelectedText className={`${!isSelected && "not-selected"}`}>
          {isSelected ? selectedItem : defaultSelected()}
        </SelectedText>
        {isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDown>
      {isOpened && (
        <MenuList>
          {props.dropDownMenu.map((item: string, index: number) => (
            <MenuItem
              className={`${selectedItem === item && "selected"}`}
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
  }

  &.selected {
    font-weight: 600;
    color: var(--color-primary-500);
  }
`

export default DropDownMenu
