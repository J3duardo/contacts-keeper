import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER} from "../types";

export default (state, action) => {
  switch(action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case DELETE_CONTACT:
      const filteredContacts = state.contacts.filter(contact => {
        return contact.id !== action.payload
      });
      return {
        ...state,
        contacts: filteredContacts
      }
    case UPDATE_CONTACT:
      const contactIndex = state.contacts.findIndex(contact => contact.id === action.payload.id);
      const updatedContacts = [...state.contacts];
      updatedContacts.splice(contactIndex, 1, action.payload);
      return {
        ...state,
        contacts: updatedContacts
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
    default:
      return state
  }
}