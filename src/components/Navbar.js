import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.png"; 

function Navbar() {
  return (
    <nav className="navbar">
      
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        Sri Nila Computer Center
      </div>

      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to={"/type"}>Typewriting</Link></li>
        <li><Link to={"/maths"}>Tutorial</Link></li>
       <li><Link to="/about">About</Link></li>
       {/* <li><Link to="/cart">Cart</Link></li>  */}
        <li><Link to="/contact">contact</Link></li>

      </ul>
    </nav>
  );
}

export default Navbar;



