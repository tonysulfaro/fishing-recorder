import React, { useEffect, useState } from "react";
import "./MapView.css";
import GoogleMapReact from "google-map-react";
import Marker from "../components/Marker";

const MapView = (props) => {
  const [map, setmap] = useState(null);
  const [maps, setmaps] = useState(null);

  // Return map bounds based on list of places
  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(place.lat, place.lon));
    });
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  const handleApiLoaded = async (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };

  useEffect(() => {
    async function getFish() {
      fetch("https://fishing-recorder-api.herokuapp.com/api/fishrecord")
        .then((response) => response.json())
        .then((data) => {
          props.setfish(data);
        });
    }
    getFish();
  }, []);

  useEffect(() => {
    if (map !== null && maps !== null) {
      handleApiLoaded(map, maps, props.fish);
    }
  }, [map, maps, props.fish, handleApiLoaded]);

  return (
    <div className="map-container">
      {props.fish.length > 0 ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDpgAuVPLlA92VjKFmTudrYlS8dVpj-Yr4" }}
          defaultCenter={{
            lat: 43.763,
            lng: -83.744,
          }}
          defaultZoom={7}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            setmap(map);
            setmaps(maps);
          }}
        >
          {props.fish.map((fish) => (
            <Marker
              key={fish.fishRecordId}
              text={fish.fishType}
              lat={fish.lat}
              lng={fish.lon}
            />
          ))}
        </GoogleMapReact>
      ) : null}
    </div>
  );
};

export default MapView;
