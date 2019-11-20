import {OPEN_MODAL, CLOSE_MODAL} from "../types";

export default (state, action) => {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        openModal: true,
        itemId: action.payload
      }
    case CLOSE_MODAL:
      return {
        ...state,
        openModal: false,
        itemId: null
      }
    default:
      return state
  }
}