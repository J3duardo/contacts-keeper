import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
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
  const loadCurrentUser = async () => {
    //Asignar el token a los headers de los requests de axios
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      })
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  }

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
      });

      loadCurrentUser();
      
    } catch (error) {
      if(error.response.data.errors) {
        error.response.data.errors.forEach(error => {
          dispatch({
            type: REGISTER_FAIL,
            payload: error.msg
          })
        })
      }
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      })
    }
  }

  //Loguear usuario
  const userLogin = async (loginData) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        url: "/api/auth",
        data: {
          email: loginData.email,
          password: loginData.password
        }
      })

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadCurrentUser();
      
    } catch (error) {
      if(error.response.data.errors) {
        error.response.data.errors.forEach(error => {
          dispatch({
            type: LOGIN_FAIL,
            payload: error.msg
          })
        })
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      })
    }
  }

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
        loadCurrentUser: loadCurrentUser,
        userRegister: userRegister,
        userLogin: userLogin,
        clearErrors: clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;
