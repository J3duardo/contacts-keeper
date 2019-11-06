import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Cargar usuario actual

  //Registrar usuario
  const userRegister = async (userData) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        url: "/api/users",
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          passwordConfirm: userData.passwordConfirm
        }
      })

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      })
    }
  }

  //Loguear usuario

  //Cerrar sesión

  //Limpiar errores
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }


  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        userRegister: userRegister,
        clearErrors: clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
