import React,{useContext, useEffect} from "react";
import {Route, Redirect} from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoutes = ({component: Component, ...rest}) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadCurrentUser();
    // eslint-disable-next-line
  }, [])

  return (
    <Route {...rest} render={(props) => {
      return (
        !authContext.isAuthenticated ?
          <Redirect to="/login" />
          :
          <Component {...props} />
      )
    }} />
  );
}

export default PrivateRoutes;
