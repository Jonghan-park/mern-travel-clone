import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import axios from "axios";
import { format } from "timeago.js";
import "./app.css";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [rating, setRating] = useState(1);
  const [viewport, setViewport] = useState({});

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

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  const handleAddClick = (e) => {
    console.log(e);
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;

    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setTitle(null);
      setDesc(null);
      setRating(1);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <ReactMapGL
        initialViewState={{
          longitude: 126.97696994010124,
          latitude: 37.56762617355592,
          zoom: 11,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/pjh834/cl7se8bx7004715nporb6lacw"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.map((p) => (
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="top">
              <FaMapMarkerAlt
                className="pin_icon"
                style={{
                  color: p.username === currentUser ? "tomato" : "slateblue",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
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
                    {Array(p.rating).fill(<FaStar className="star" />)}
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
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
