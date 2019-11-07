import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = (props) => {
const authContext = useContext(AuthContext);
const contactContext = useContext(ContactContext);

const logoutHandler = () => {
  authContext.logout();
  contactContext.clearContacts()
}

const authLinks = () => {
  return (
    <React.Fragment>
      <li>Welcome, {authContext.user && authContext.user.name}</li>
      <li>
        <a href="#!" onClick={logoutHandler}>
          <i className="fas fa-sign-out-alt"></i>
          {" "}
          <span className="hode-sm">Logout</span>
        </a>
      </li>
    </React.Fragment>
  )
}

const guestLinks = () => {
  return (
    <React.Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </React.Fragment>
  )
}

  return (
    <div className="navbar bg-primary">
      <h1 className={props.icon}> {props.title}</h1>
      <ul>
        {authContext.isAuthenticated && authLinks()}
        {!authContext.isAuthenticated && guestLinks()}
      </ul>
    </div>
  );
}

Navbar.defaultProps = {
  title: "Contacts Keeper",
  icon: "fas fa-id-card-alt"
}

export default Navbar;
