import React, {useReducer} from "react";
import uuid from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import {SET_ALERT, REMOVE_ALERT} from "../types";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Crear alerta
  const setAlert = (msg, type) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: {
        id,
        msg,
        type
      }
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      })
    }, 3500)
  }


  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert: setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState;
