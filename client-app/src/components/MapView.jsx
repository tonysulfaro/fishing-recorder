import React, { useEffect, useState } from "react";
import "./MapView.css";
import GoogleMapReact from "google-map-react";

const MapView = () => {
  const [places, setplaces] = useState([]);

  const getInfoWindowString = (place) => `
    <div>
      <div style="font-size: 16px;">
        ${place.fishType.type}
      </div>
      <div style="font-size: 12px;">
        ${place.name}
      </div>
    </div>`;

  const handleApiLoaded = (map, maps, places) => {
    const markers = [];
    const infowindows = [];

    console.log(places);

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
    async function getData() {
      const resp = await fetch("https://localhost:44368/api/fishrecord");
      const data = await resp.json();

      console.log(data);

      setplaces(data);
    }
    getData();
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
