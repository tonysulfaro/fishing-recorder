import React, { useEffect, useState } from "react";
import "./MapView.css";
import GoogleMapReact from "google-map-react";

const MapView = () => {
  const [places, setplaces] = useState([]);

  const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(
          Math.floor(place.rating)
        )}</span><span style="color: lightgrey;">${String.fromCharCode(
    9733
  ).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${"$".repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.opening_hours.open_now ? "Open" : "Closed"}
      </div>
    </div>`;

  const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    places.forEach((place) => {
      markers.push(
        new maps.Marker({
          position: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
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
    fetch("places.json")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((result) => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        setplaces(data.results);
      });
  }, []);

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