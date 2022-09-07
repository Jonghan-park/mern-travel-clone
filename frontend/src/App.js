import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 136,
          latitude: 35,
          zoom: 4,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={136} latitude={35} anchor="center">
          {/* <FaMapMarkerAlt /> */}
          <h1>Hello</h1>
        </Marker>
      </Map>
    </div>
  );
}

export default App;
