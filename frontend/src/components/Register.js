import React from "react";
import "./register.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const Register = () => {
  return (
    <div className="registerContainer">
      <div className="logo">
        <FaMapMarkerAlt /> JosephPin
      </div>
      <form>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="registerBtn">Register</button>
        <span className="success">Successful. You can login now!</span>
        <span className="failure">Something went wrong!</span>
      </form>
    </div>
  );
};

export default Register;
