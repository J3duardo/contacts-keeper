import React, {useContext, useRef} from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  const onChangeHandler = (e) => {
    if(text.current.value !== "") {
      contactContext.filterContacts(e.target.value);
    } else {
      contactContext.clearFilter();
    }
  }

  return (
    <form>
      <input 
        type="text"
        ref={text}
        placeholder="Filter contacts by name"
        onChange={onChangeHandler}
      />
    </form>
  );
}

export default ContactFilter;
