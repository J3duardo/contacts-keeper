import React, {useReducer} from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Persona 1",
        email: "persona1@mail.com",
        phone: "111-111-1111",
        type: "professional"
      },
      {
        id: 2,
        name: "Persona 2",
        email: "persona2@mail.com",
        phone: "222-222-2222",
        type: "personal"
      },
      {
        id: 3,
        name: "Persona 3",
        email: "persona3@mail.com",
        phone: "333-333-3333",
        type: "personal"
      }
    ],
    current: null,
    filter: null,
    filteredContacts: []
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Agregar contacto
  const addContact = (contactData) => {
    contactData.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      payload: contactData
    })
  }

  //Borrar contacto
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  }

  //Establecer contacto actual
  const setCurrentContact = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    })
  }

  //Limpiar contacto actual
  const clearCurrentContact = () => {
    dispatch({
      type: CLEAR_CURRENT
    })
  }

  //Actualizar contacto
  const updateContact = (contactData) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contactData
    })
  }

  //Filtrar contactos
  const filterContacts = (filter) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: filter
    })
  }

  //Borrar filtro
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }


  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        filteredContacts: state.filteredContacts,
        addContact: addContact,
        deleteContact: deleteContact,
        setCurrentContact: setCurrentContact,
        clearCurrentContact: clearCurrentContact,
        updateContact: updateContact,
        filterContacts: filterContacts,
        clearFilter:clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;
