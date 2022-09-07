import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 136,
          latitude: 35,
          zoom: 8,
        }}
        style={{ width: "80vw", height: "80vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={127.024612} latitude={37.5326} anchor="top">
          <FaMapMarkerAlt style={{}} />
        </Marker>
        {showPopup && (
          <Popup
            longitude={127.024612}
            latitude={37.5326}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
          >
            <div className="card">
              <label>Place</label>
              <h4 className="place">Han river</h4>
              <label>Review</label>
              <p>Beautiful place. I liked it. </p>
              <label>Rating</label>
              <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <label>Information</label>
              <span className="username">
                Created by <b>Joseph</b>
              </span>
              <span className="date">1 hour ago</span>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
