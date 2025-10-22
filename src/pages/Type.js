import React from "react";

import "./Type.css";
import typedata from "../mapping/Typedata";
import { Link } from "react-router-dom";
function Type() {
  return (
    <div className="courses">
      <h2 className="course-heading">Typewriting Courses</h2>
      <div className="course-container">
        {typedata.map((course) => (   
          <div className="course-card" key={course.id}>
            <img src={course.img} alt={course.title} className="course-img" />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p className="fee">{course.fee}</p>
           <Link to="/Enroll">
            <button className="enroll-btn">Enroll Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Type;
