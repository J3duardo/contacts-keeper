import React, {useState, useContext, useEffect} from 'react';
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Loader from '../Loader/Loader';
import "./loaderContainer.css";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  useEffect(() => {
    if(authContext.isAuthenticated) {
      alertContext.setAlert("Successfully registered", "success");
      props.history.push("/");
    }

    if(authContext.error) {
      alertContext.setAlert(authContext.error, "danger");
      authContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [authContext.error, authContext.isAuthenticated, authContext.user]);

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmithandler = (e) => {
    e.preventDefault();
    if(user.name === "" || user.email === "" || user.password === "" || user.passwordConfirm === "") {
      alertContext.setAlert("All fields are required", "danger")
    } else if(user.password !== user.passwordConfirm) {
      alertContext.setAlert("Passwords don't match", "danger")
    } else {
      authContext.userRegister(user);
    }
  }

  return (
    <div className="form-container">
      {authContext.loading &&
        <div className="loader-container">
          <Loader />
        </div>      
      }
      <h1>Account <span className="text-primary">Register</span></h1>
      <form onSubmit={onSubmithandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            id="name"
            type="text"
            name="name"
            value={user.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-confirm">Confirm password</label>
          <input 
            id="password-confirm"
            type="password"
            name="passwordConfirm"
            value={user.passwordConfirm}
            onChange={onChangeHandler}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block"/>
      </form>
    </div>
  );
}

export default Register;
