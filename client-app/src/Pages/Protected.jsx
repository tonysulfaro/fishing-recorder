import React from "react";
import "./Protected.css";
import LogoutButton from "../components/LogoutButton";
import MapView from "../components/MapView";
import Profile from "../components/Profile";
import Navigation from "../components/Navigation";

const Protected = () => {
  return (
    <div className="App">
      <div>
        <Navigation></Navigation>
        <h1>Protected</h1>
        <MapView></MapView>
      </div>
    </div>
  );
};

export default Protected;
