import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";   // ⬅️ Added

import "./Hero.css";

// Import your images
import img1 from "../images/place2.jpg";
import img2 from "../images/place1.jpg";
import img3 from "../images/place2.jpg";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,          // animation speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // enable autoplay
    autoplaySpeed: 2000,  // 2 seconds per slide
    arrows: false,        // hide arrows
    pauseOnHover: false,  // continue sliding even on hover
  };

  return (
    <section className="hero">
      {/* Slider */}
      <Slider {...settings}>
        <div>
          <img
            src={img1}
            alt="Sri Nila Computer Center"
            className="hero-image front-image" // ← special class for front.jpg
          />
        </div>
        <div>
          <img src={img2} alt="Training" className="hero-image" />
        </div>
        <div>
          <img src={img3} alt="Learning" className="hero-image" />
        </div>
      </Slider>

      {/* Text + Button Below Slider */}
      <div className="hero-content">
        <h1>Welcome to Sri Nila Computer Center</h1>
        <Link to="/courses">   {/* ⬅️ Wrapped only the button */}
          <button>Explore Courses</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
