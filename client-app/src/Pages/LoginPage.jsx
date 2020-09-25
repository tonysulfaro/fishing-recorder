import React from "react";
import "./LoginPage.css";
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, useLocation } from "react-router-dom";

const LoginPage = () => {
  let location = useLocation();
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
    <div className="login-container">
      <div className="bg">
        <div className="login-items">
          <h1>Welcome To Fishing Recorder</h1>
          <LoginButton></LoginButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
