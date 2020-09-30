import React, { useEffect, useState } from "react";
import "./MapView.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Spinner from "react-bootstrap/Spinner";
import Marker from "../components/Marker";
import CurrentLocationMarker from "../components/CurrentLocationMarker";

const MapView = (props) => {
  const {
    isAuthenticated,
    isLoading
  } = useAuth0();
  const history = useHistory();
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLon, setCurrentLon] = useState(null);
  const [map, setmap] = useState(null);
  const [maps, setmaps] = useState(null);

  // Return map bounds based on list of places
  const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(place.lat, place.lon));
    });
    if (currentLat) {
      bounds.extend(new maps.LatLng(currentLat, currentLon));
    }
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

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      setCurrentLat(position.coords.latitude);
      setCurrentLon(position.coords.longitude);
    }
    getLocation();
  }, []);

  useEffect(() => {
    if (map !== null && maps !== null) {
      handleApiLoaded(map, maps, props.fish);
    }
  }, [map, maps, props.fish, handleApiLoaded]);

  if(isLoading){
    return (
      <div className="no-record-container">
          <h1>Loading...</h1>
        </div>
    )
  }

  if(!isAuthenticated){
    history.push("/");
    return null;
  }

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
          options={function (maps) {
            return { mapTypeId: "hybrid" };
          }}
        >
          {props.fish.map((fish) => (
            <Marker
              key={fish.fishRecordId}
              fishRecordId={fish.fishRecordId}
              fishType={fish.fishType}
              lengthInches={fish.lengthInches}
              date={fish.date}
              lat={fish.lat}
              lng={fish.lon}
            />
          ))}
          <CurrentLocationMarker
            lat={currentLat}
            lng={currentLon}
          ></CurrentLocationMarker>
        </GoogleMapReact>
      ) : (
        <div className="no-record-container">
          <h1>No Records Found</h1>
        </div>
      )}
    </div>
  );
};

export default MapView;
