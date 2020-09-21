import React from "react";
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

  if (isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/protected",
          state: { from: location },
        }}
      />
    );
  }

  return (
    <div>
      <h1>Login To Fishing Recorder</h1>
      <LoginButton></LoginButton>
    </div>
  );
};

export default LoginPage;
