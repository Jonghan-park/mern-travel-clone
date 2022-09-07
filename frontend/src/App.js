import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import axios from "axios";
import { format } from "timeago.js";
import "./app.css";

function App() {
  const [pins, setPins] = useState([]);
  const [viewport, setViewport] = useState({});
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 136,
          latitude: 35,
          zoom: 8,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v8"
      >
        {pins.map((p) => (
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="top">
              <FaMapMarkerAlt className="pin_icon" />
            </Marker>
            <Popup
              longitude={p.long}
              latitude={p.lat}
              anchor="bottom"
              onClose={() => setShowPopup(false)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className="stars">
                  <FaStar className="star" />
                  <FaStar className="star" />
                  <FaStar className="star" />
                  <FaStar className="star" />
                  <FaStar className="star" />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          </>
        ))}
      </Map>
    </div>
  );
}

export default App;
