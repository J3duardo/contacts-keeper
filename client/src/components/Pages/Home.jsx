import React, {useContext, useEffect} from "react";
import Contacts from "../Contacts/Contacts";
import ContactForm from "../Contacts/ContactForm";
import ContactFilter from "../Contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";
import ModalContext from "../../context/modal/modalContext";
import Modal from "../Modal/Modal";

const Home = () => {
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    authContext.loadCurrentUser();
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {modalContext.isOpen && <Modal/>}
      <div className="grid-2">
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
