import React, { useState } from "react";
import "./Protected.css";
import MapView from "../components/MapView";
import Navigation from "../components/Navigation";

const Protected = () => {
  const [fish, setfish] = useState([]);

  return (
    <div className="App">
      <div>
        <Navigation fish={fish} setfish={setfish}></Navigation>
        <MapView fish={fish} setfish={setfish}></MapView>
      </div>
    </div>
  );
};

export default Protected;
