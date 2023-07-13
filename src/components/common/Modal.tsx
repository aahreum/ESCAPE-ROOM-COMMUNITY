import { MouseEventHandler, useEffect } from "react"
import { styled } from "styled-components"

interface ModalPropsType {
  closeModal: MouseEventHandler<HTMLButtonElement>
  modalTitle: string
  modalButtonText: string
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
        <ModalButton onClick={props.closeModal}>{props.modalButtonText}</ModalButton>
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
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  border-radius: 8px;
  background-color: var(--color-gray-600);
`

const ModalTitle = styled.p`
  width: 300px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`

const ModalButton = styled.button`
  width: 140px;
  height: 48px;

  border: none;
  border-radius: 8px;
  background-color: var(--color-primary-500);

  font-size: 16px;
  font-weight: 600;
  color: var(--color-gray-800);
`

export default Modal
