import { MouseEventHandler, useEffect } from "react"
import { styled } from "styled-components"

interface ModalPropsType {
  closeModal: MouseEventHandler<HTMLButtonElement>
  handleModal?: MouseEventHandler<HTMLButtonElement>
  modalTitle: string
  modalButtonText1: string
  modalButtonText2?: string
  twoButtons?: boolean
}

const Modal = ({ ...props }: ModalPropsType): JSX.Element => {
  useEffect(() => {
    document.body.style.cssText = `overflow: hidden`
    return () => {
      document.body.style.cssText = `overflow: auto`
    }
  }, [])

  return (
    <ModalContainer>
      <ModalEl>
        <ModalTitle>{props.modalTitle}</ModalTitle>
        {props.twoButtons ? (
          <ButtonArea>
            <ModalButton onClick={props.closeModal}>{props.modalButtonText1}</ModalButton>
            <ModalButton onClick={props.handleModal}>{props.modalButtonText2}</ModalButton>
          </ButtonArea>
        ) : (
          <ModalButton onClick={props.closeModal}>{props.modalButtonText1}</ModalButton>
        )}
      </ModalEl>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;

  width: 100%;
  height: 100%;
  background-color: var(--color-opacity);

  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalEl = styled.div`
  margin: 0 16px;
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  border-radius: 8px;
  background-color: var(--color-gray-600);
`

const ModalTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
`

const ButtonArea = styled.div`
  display: flex;
  gap: 16px;

  & > :first-child {
    background-color: var(--color-gray-100);
  }
`

const ModalButton = styled.button`
  width: 120px;
  height: 48px;

  border: none;
  border-radius: 8px;
  background-color: var(--color-primary-500);

  font-size: 16px;
  font-weight: 600;
  color: #1c1d1e;

  cursor: pointer;
`

export default Modal
