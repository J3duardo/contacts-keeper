import React, {useContext} from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const {contacts, filteredContacts, filter} = contactContext;

  const renderContacts = () => {
    if(filteredContacts.length === 0 && !filter) {
      return (
        <TransitionGroup>
          {contacts.map(contact => {
            return (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      )
    } else if(filteredContacts.length === 0 && filter.length > 0) {
        return <h2>No contacts found...</h2>
    } else {
      return (
        <TransitionGroup>
          {filteredContacts.map(contact => {
            return (
              <CSSTransition key={contact.id} timeout={500} classNames="item">
                <ContactItem key={contact.id} contact={contact} />
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      )
    }
  }

  return (
    <React.Fragment>
      {renderContacts()}
    </React.Fragment>
  );
}

export default Contacts;
