import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS, SET_LOADER} from "../types";

export default (state, action) => {
  switch(action.type) {
    case SET_LOADER:
      return {
        ...state,
        loading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //Guardar el token en el localStorage
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      }
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      //Remover el token del localStorage
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        loading: false
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}