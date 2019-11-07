import React, {useContext} from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = (props) => {
  const contactContext = useContext(ContactContext);

  const deleteHandler = (id) => {
    contactContext.deleteContact(id);
    contactContext.clearCurrentContact()
  }

  const setCurrentHandler = () => {
    contactContext.setCurrentContact(props.contact)
  }

  const {_id, name, email, phone, type} = props.contact;

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        {" "}
        <span
          style={{float: "right"}}
          className={`badge badge-${type === "professional" ? "success" : "primary"}`}
        >
          {type.split("")[0].toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {" "}
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {" "}
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          onClick={setCurrentHandler}
          className="btn btn-dark btn-sm"
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteHandler(_id)}
        >
          Delete
        </button>
      </p>
    </div>
  );
}

export default ContactItem;
