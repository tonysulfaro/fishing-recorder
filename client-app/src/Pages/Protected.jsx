import React, { useState } from "react";
import "./Protected.css";
import MapView from "../components/MapView";
import Navigation from "../components/Navigation";

const Protected = () => {
  return (
    <div className="App">
      <div>
        <Navigation></Navigation>
        <MapView></MapView>
      </div>
    </div>
  );
};

export default Protected;
