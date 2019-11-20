import React, {useContext} from "react";
import ModalContex from "../../context/modal/modalContext";
import ContactContext from "../../context/contact/contactContext";
import "./modal.css"

const Modal = () => {
  const modalContext = useContext(ModalContex);
  const contactContext = useContext(ContactContext);

  const deleteHandler = () => {
    contactContext.deleteContact(modalContext.itemId);
    modalContext.closeModal();
    contactContext.clearCurrentContact()
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-message">
          <h2>Are you sure?</h2>
          <p>This action can't be undone.</p>
        </div>
        <div className="modal-buttons">
          <button 
            className="btn btn-dark"
            onClick={() => deleteHandler()}
          >
            Confirm
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => modalContext.closeModal()}
          >
            Cancel
        </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
