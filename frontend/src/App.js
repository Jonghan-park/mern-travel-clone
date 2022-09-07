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
        style={{ width: "80vw", height: "80vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={127.024612} latitude={37.5326} anchor="center">
          <FaMapMarkerAlt />
        </Marker>
      </Map>
    </div>
  );
}

export default App;
