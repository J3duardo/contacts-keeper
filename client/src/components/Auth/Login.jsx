import React, {useState, useContext, useEffect} from 'react';
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if(authContext.isAuthenticated) {
      alertContext.setAlert("Successfully logged in", "success");
      props.history.push("/");
    }

    if(authContext.error) {
      alertContext.setAlert(authContext.error, "danger");
      authContext.clearErrors();
    }
    // eslint-disable-next-line
  }, [authContext.error, authContext.isAuthenticated])

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmithandler = (e) => {
    e.preventDefault();
    authContext.userLogin(user);
  }

  return (
    <div className="form-container">
      <h1>Account <span className="text-primary">Login</span></h1>
      <form onSubmit={onSubmithandler}>
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
        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
      </form>
    </div>
  );
}

export default Login;
