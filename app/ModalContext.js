import { createContext, useContext, MouseEvent } from 'react'

const ModalContext = createContext({
  toggleModal: () => {},
  setModalProps: (props) => {},
})

export const useModal = () => {
  return useContext(ModalContext)
}

export default ModalContext
