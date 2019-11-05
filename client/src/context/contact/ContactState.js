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
    ]
  }

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Agregar contacto

  //Borrar contacto

  //Establecer como contacto actual

  //Limpiar contacto actual

  //Actualizar contacto

  //Filtrar contactos

  //Borrar filtro


  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState;
