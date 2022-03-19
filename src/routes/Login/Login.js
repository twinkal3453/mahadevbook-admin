import * as React from "react";
import "./login.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { signin, authenticate, isAutheticated } from "../../auth/index";

import { Redirect } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
    didRedirect: false,
  });

  const { email, password, loading, error, didRedirect } = values;
  const user = isAutheticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // console.log(email, password);
    signin({ email, password }).then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({ ...values, error: true, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      error && (
        <div className="alert alert-info">
          <h2>Something went wrong</h2>
        </div>
      )
    );
  };

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      <div className="login__sec">
        <div className="contain">
          <form className="contain__form" noValidate autoComplete="off">
            <TextField
              onChange={handleChange("email")}
              value={email}
              className="text__field"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
            />
            <TextField
              onChange={handleChange("password")}
              value={password}
              className="text__field"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            />
            <Button
              onClick={onSubmit}
              className="button__login"
              variant="contained"
            >
              LOGIN
            </Button>
          </form>
        </div>
      </div>
      {performRedirect()}
    </div>
  );
};

export default Login;
