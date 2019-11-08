import React, {useReducer} from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";
import {GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, CLEAR_ERRORS, SET_LOADER} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null,
    filter: null,
    filteredContacts: [],
    contactError: null,
    loading: false
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Cargar los contactos del usuario
  const getUserContacts = async () => {
    dispatch({
      type: SET_LOADER
    });

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
    dispatch({
      type: SET_LOADER
    });
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
  const deleteContact = async (id) => {
    dispatch({
      type: SET_LOADER
    });

    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });

    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.msg
      })
    }
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
  const updateContact = async (contactData) => {
    dispatch({
      type: SET_LOADER
    });

    try {
      const updatedUser = await axios({
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        url: `/api/contacts/${state.current._id}`,
        data: {...contactData}
      });

      dispatch({
        type: UPDATE_CONTACT,
        payload: updatedUser.data.contact
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
        loading: state.loading,
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
