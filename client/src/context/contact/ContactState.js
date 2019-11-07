import React, {useReducer} from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";
import {GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, CLEAR_ERRORS} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filter: null,
    filteredContacts: [],
    contactError: null
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Cargar los contactos del usuario
  const getUserContacts = async () => {
    try {
      const contacts = await axios.get("/api/contacts");

      dispatch({
        type: GET_CONTACTS,
        payload: contacts.data.contacts
      })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.msg
      })
    }
  }

  //Agregar contacto
  const addContact = async (contactData) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        url: "/api/contacts",
        data: {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          type: contactData.type
        }
      })
      dispatch({
        type: ADD_CONTACT,
        payload: res.data.contact
      })

    } catch (error) {
      if(error.response.data.errors) {
        return error.response.data.errors.forEach(error => {
          dispatch({
            type: CONTACT_ERROR,
            payload: error.msg
          })
        })
      }
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.msg
      })
    }
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

  //Limpiar errores
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }

  //Lipiar contactos
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    })
  }


  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filter: state.filter,
        filteredContacts: state.filteredContacts,
        contactError: state.contactError,
        getUserContacts:getUserContacts,
        addContact: addContact,
        deleteContact: deleteContact,
        setCurrentContact: setCurrentContact,
        clearCurrentContact: clearCurrentContact,
        updateContact: updateContact,
        filterContacts: filterContacts,
        clearFilter:clearFilter,
        clearErrors: clearErrors,
        clearContacts: clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;
