import React from "react";
import {Link} from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="navbar bg-primary">
      <h1 className={props.icon}> {props.title}</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

Navbar.defaultProps = {
  title: "Contacts Keeper",
  icon: "fas fa-id-card-alt"
}

export default Navbar;
