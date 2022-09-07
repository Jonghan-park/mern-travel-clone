import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import axios from "axios";
import { format } from "timeago.js";
import "./app.css";

function App() {
  const currentUser = "Jane";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  const handleAddClick = (e) => {
    console.log(e);
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;

    setNewPlace({
      lat,
      lng,
    });
  };

  return (
    <div className="App">
      <Map
        initialViewState={{
          longitude: 126.97696994010124,
          latitude: 37.56762617355592,
          zoom: 11,
        }}
        style={{ width: "80vw", height: "80vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v8"
        onDblClick={handleAddClick}
      >
        {pins.map((p) => (
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="top">
              <FaMapMarkerAlt
                className="pin_icon"
                style={{
                  color: p.username === currentUser ? "tomato" : "slateblue",
                }}
                onClick={() => handleMarkerClick(p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                longitude={p.long}
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="bottom"
                onClose={() => setCurrentPlaceId(null)}
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
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setCurrentPlaceId(null)}
          >
            HEllo
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
