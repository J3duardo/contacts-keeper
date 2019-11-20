import React, {useReducer} from "react";
import ModalContext from "./modalContext";
import modalReducer from "./modalReducer";
import { OPEN_MODAL, CLOSE_MODAL } from "../types";

const ModalState = (props) => {
  const initialState = {
    isOpen: false,
    itemId: null
  }

  const [state, dispatch] = useReducer(modalReducer, initialState);
  
  const openModal = (itemId = null) => {
    dispatch({
      type: OPEN_MODAL,
      payload: itemId
    })
  }

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL
    })
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen: state.isOpen,
        itemId: state.itemId,
        openModal,
        closeModal
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}

export default ModalState;
