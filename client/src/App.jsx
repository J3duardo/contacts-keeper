import React from "react";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import ContactState from "./context/contact/ContactState";

import {BrowserRouter, Route, Switch} from "react-router-dom";

function App() {
  return (
    <ContactState>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </ContactState>
  );
}

export default App;
