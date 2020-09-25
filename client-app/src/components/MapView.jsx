import React, { useState, useEffect } from "react";
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

    places.forEach((place) => {
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

  useEffect(() => {
    function getFish() {
      fetch("https://fishing-recorder-api.herokuapp.com/api/fishrecord")
        .then((response) => response.json())
        .then((data) => {
          setplaces(data);
        });
    }
    getFish();
  }, []);

  return (
    <div className="map-container">
      {places.length > 0 ? (
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
      ) : null}
    </div>
  );
};

export default MapView;
