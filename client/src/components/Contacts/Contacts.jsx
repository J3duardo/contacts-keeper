import React, {useContext, useEffect} from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import AlertContext from "../../context/alert/alertContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Loader from "../Loader/Loader";

const Contacts = () => {
  const alertContext = useContext(AlertContext);
  const contactContext = useContext(ContactContext);

  const {contacts, filteredContacts, filter, contactError, clearErrors, loading} = contactContext;

  useEffect(() => {
    contactContext.getUserContacts();
    
    if(contactError) {
      alertContext.setAlert(contactError, "danger");
    }
    clearErrors();
  }, [contactError])

  const renderFilteredContacts = () => {
    if(filteredContacts.length === 0 && !filter) {
      if(contacts.length === 0 && loading) {
        return <Loader />
      }

      if(contacts.length === 0 && !loading) {
        return <h2>Contact list is empty</h2>
      }

      return (
        <TransitionGroup>
          {contacts.map(contact => {
            return (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
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
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      )
    }
  }

  return (
    <React.Fragment>
      {renderFilteredContacts()}
    </React.Fragment>
  );
}

export default Contacts;
