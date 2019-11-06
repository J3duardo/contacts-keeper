import React, {useState, useContext, useEffect} from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: "",
    email: "", 
    phone: "",
    type: "personal"
  });

  useEffect(() => {
    if(contactContext.current) {
      setContact(contactContext.current)
    } else {
      setContact({
        name: "",
        email: "", 
        phone: "",
        type: "personal"
      })
    }
    // eslint-disable-next-line
  }, [contactContext.current]);

  const onChangeHandler = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    })
  }

  const clearAll = () => {
    contactContext.clearCurrentContact();
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!contactContext.current) {
      contactContext.addContact(contact);
    } else {
      contactContext.updateContact(contact)
    }
    clearAll();
    setContact({
      name: "",
      email: "", 
      phone: "",
      type: "personal"
    })
  }

  const {name, email, phone, type} = contact;

  return (
    <form onSubmit={onSubmitHandler}>
      <h2 className="text-primary">{`${!contactContext.current ? "Add" : "Edit"} Contact`}</h2>
      <input 
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChangeHandler}
      />
      <input 
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChangeHandler}
      />
      <input 
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChangeHandler}
      />
      <h5>Contact Type</h5>
      <label htmlFor="personal">Personal</label>
      <input 
        type="radio"
        id="personal"
        name="type"
        value="personal"
        onChange={onChangeHandler}
        checked={type === "personal"}
      />
      {" "}
      <label htmlFor="professional">Professional</label>
      <input 
        type="radio"
        id="professional"
        name="type"
        value="professional"
        onChange={onChangeHandler}
        checked={type === "professional"}
      />
      <div>
        <input type="submit" value={`${!contactContext.current ? "Add" : "Edit"} Contact`} className="btn btn-primary btn-block" />
      </div>
      {contactContext.current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
