import React, { useState } from "react";
import "./MapView.css";
import GoogleMapReact from "google-map-react";

const MapView = () => {
  const [places, setplaces] = useState([]);

  const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.fishType}
      </div>
      <div style="font-size: 12px;">
        ${place.date}
      </div>
      <div style="font-size: 12px;">
        Length:${place.lengthInches}"
      </div>
    </div>`;

  const handleApiLoaded = async (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    const resp = await fetch(
      "https://fishingrecorderapi.azurewebsites.net/api/fishrecord"
    );
    const data = await resp.json();

    console.log(places);

    data.forEach((place) => {
      markers.push(
        new maps.Marker({
          position: {
            lat: place.lat,
            lng: place.lon,
          },
          map,
        })
      );

      infowindows.push(
        new maps.InfoWindow({
          content: getInfoWindowString(place),
        })
      );
    });

    markers.forEach((marker, i) => {
      marker.addListener("click", () => {
        infowindows[i].open(map, marker);
      });
    });
  };

  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDpgAuVPLlA92VjKFmTudrYlS8dVpj-Yr4" }}
        defaultCenter={{
          lat: 43.763,
          lng: -83.744,
        }}
        defaultZoom={7}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          handleApiLoaded(map, maps, places)
        }
      ></GoogleMapReact>
    </div>
  );
};

export default MapView;
