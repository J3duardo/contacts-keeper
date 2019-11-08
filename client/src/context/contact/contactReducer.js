import {GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, CLEAR_ERRORS, SET_LOADER} from "../types";

export default (state, action) => {
  switch(action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: true
      }
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      }
    case CONTACT_ERROR:
      return {
        ...state,
        contactError: action.payload,
        loading: false
      }
    case DELETE_CONTACT:
      const nonDeletedContacts = state.contacts.filter(contact => {
        return contact._id !== action.payload
      });
      return {
        ...state,
        contacts: nonDeletedContacts,
        loading: false
      }
    case UPDATE_CONTACT:
      const contactIndex = state.contacts.findIndex(contact => contact._id === action.payload._id);
      const updatedContacts = [...state.contacts];
      updatedContacts.splice(contactIndex, 1, action.payload);
      return {
        ...state,
        contacts: updatedContacts,
        loading: false
      }
    case FILTER_CONTACTS:
      const filteredContacts = state.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(action.payload.toLowerCase())
      })
      return {
        ...state,
        filter: action.payload,
        filteredContacts: filteredContacts
      }
    case CLEAR_FILTER:
        return {
          ...state,
          filter: null,
          filteredContacts: []
        }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: []
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        contactError: null
      }
    default:
      return state
  }
}