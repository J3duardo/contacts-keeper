import React, {useContext} from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {contacts, filteredContacts, filter} = contactContext;

  const renderContacts = () => {
    if(filteredContacts.length === 0 && !filter) {
      return contacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact} />
      })
    } else if(filteredContacts.length === 0 && filter.length > 0) {
        return <h2>No contacts found...</h2>
    } else {
      return filteredContacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact} />
      })
    }
  }

  return (
    <React.Fragment>
      {renderContacts()}
    </React.Fragment>
  );
}

export default Contacts;
