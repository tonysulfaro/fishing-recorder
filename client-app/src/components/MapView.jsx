import React, { useEffect } from "react";
import "./MapView.css";
import GoogleMapReact from "google-map-react";
import Marker from "../components/Marker";

const MapView = (props) => {
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

    // const markers = [];
    // const infowindows = [];

    // places.forEach((place) => {
    //   markers.push(
    //     new maps.Marker({
    //       position: {
    //         lat: place.lat,
    //         lng: place.lon,
    //       },
    //       map,
    //     })
    //   );

    //   infowindows.push(
    //     new maps.InfoWindow({
    //       content: getInfoWindowString(place),
    //     })
    //   );
    // });

    // markers.forEach((marker, i) => {
    //   marker.addListener("click", () => {
    //     infowindows[i].open(map, marker);
    //   });
    // });
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
          onGoogleApiLoaded={({ map, maps }) =>
            handleApiLoaded(map, maps, props.fish)
          }
        >
          {props.fish.map((fish) => (
            <Marker
              key={fish.id}
              text={fish.name}
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
