import React from "react";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

const Protected = () => {
  return (
    <div className="App">
      <div>
        <h1>Protected</h1>
        <LogoutButton></LogoutButton>
        <Profile></Profile>
      </div>
    </div>
  );
};

export default Protected;
