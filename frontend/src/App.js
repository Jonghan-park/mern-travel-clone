import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <ReactMapGL
        initialViewState={{
          longitude: 136,
          latitude: 35,
          zoom: 10,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={136} latitude={35} anchor="bottom">
          <FaMapMarkerAlt />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
