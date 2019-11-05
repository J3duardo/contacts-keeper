import React, {useContext} from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {contacts} = contactContext;

  const renderContacts = () => {
    return contacts.map(contact => {
      return <ContactItem key={contact.id} contact={contact} />
    })
  }

  return (
    <React.Fragment>
      {renderContacts()}
    </React.Fragment>
  );
}

export default Contacts;
