import GoogleMapReact from "google-map-react";
import React from "react";
import "./MapView.css";

const MapView = () => {
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDpgAuVPLlA92VjKFmTudrYlS8dVpj-Yr4" }}
        defaultCenter={{
          lat: 43.763,
          lng: -83.744,
        }}
        defaultZoom={7}
      />
    </div>
  );
};

export default MapView;
