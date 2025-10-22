import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <h2>About Us</h2>

      <div className="about-content">
        <p>
          <strong>Sri Nila Computer Center</strong> is dedicated to providing
          high-quality computer education to students of all levels. Our goal is
          to empower learners with practical skills in technology.
        </p>

        <p>
          <strong>Our Mission:</strong> To deliver industry-relevant computer
          training that bridges the gap between learning and career growth.
        </p>

        <p>
          <strong>Our Vision:</strong> To become the leading computer education
          center, nurturing innovation and skill development.
        </p>

        <p>
          <strong>Our Core Values:</strong> Integrity, Innovation, Excellence,
          Commitment, and Collaboration guide everything we do.
        </p>

        <p>
          <strong>Our Story:</strong> Founded in 2010, we started with just a few
          students and have grown into a trusted center for computer education,
          serving hundreds of learners annually.
        </p>

        <p>
          <strong>Achievements:</strong> Awarded “Best Computer Training Center”
          in 2022. Many of our alumni have secured jobs in reputed IT companies.
        </p>

        <p>
          <strong>Contact & Join Us:</strong> Want to enhance your computer skills?
          Reach out or visit us today to start your journey.
        </p>
      </div>

      <div className="map-container">
        <h2>Our Location</h2>
        <iframe
          title="Sri Nila Computer Center"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.7548717377967!2d78.0919089736302!3d10.44101626529376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa062d61ab5c35%3A0x7e2a766ee8a7f44c!2sSri%20Nila%20Computer%20Center%20%2C%20Sri%20Nila%20Typewriting%20Centre%20%26%20Sri%20Nila%20Coaching%20Centre.!5e0!3m2!1sen!2sin!4v1756729001290!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default About;
