import React from "react";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import ModalState from "./context/modal/ModalState";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Alerts from "./components/Layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/Routing/PrivateRoute";

import {BrowserRouter, Route, Switch} from "react-router-dom";

//Asignar el token a los headers de los requests de axios
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <ModalState>
      <AlertState>
        <AuthState>
          <ContactState>
            <BrowserRouter>
              <React.Fragment>
                <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about" component={About} />
                  </Switch>
                </div>
              </React.Fragment>
            </BrowserRouter>
          </ContactState>
        </AuthState>
      </AlertState>
    </ModalState>
  );
}

export default App;
