import React from "react";
import LogoutButton from "../components/LogoutButton";
import MapView from "../components/MapView";
import Profile from "../components/Profile";

const Protected = () => {
  return (
    <div className="App">
      <div>
        <h1>Protected</h1>
        <LogoutButton></LogoutButton>
        {/* <MapView></MapView> */}
      </div>
    </div>
  );
};

export default Protected;
