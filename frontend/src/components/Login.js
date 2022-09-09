import React, { useState, useRef } from "react";
import "./login.css";
import { FaMapMarkerAlt, FaWindowClose } from "react-icons/fa";
import axios from "axios";

const Login = (props) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      props.myStorage.setItem("user", res.data.username);
      props.setCurrentUser(res.data.username);
      setError(false);
      props.setShowLogin(false);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <FaMapMarkerAlt /> JosephPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn">Login</button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <FaWindowClose
        className="loginCancel"
        onClick={() => props.setShowLogin(false)}
      />
    </div>
  );
};

export default Login;
