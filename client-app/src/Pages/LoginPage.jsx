import React from "react";
import LoginButton from "../components/LoginButton";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  return (
    <div>
      <h1>Login Page</h1>
      <p>You must log in to view the page at {from.pathname}</p>
      <LoginButton></LoginButton>
    </div>
  );
};

export default LoginPage;
