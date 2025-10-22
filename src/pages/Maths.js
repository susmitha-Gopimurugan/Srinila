import React from "react";
import { useDispatch } from "react-redux";
// import { Enrollnow } from "../redux/EnrollSlice";
import mathsCourses from "../mapping/Mathsdata";
import { Link } from "react-router-dom";
import "./Maths.css";

export default function Maths() {
  const dispatch = useDispatch();

  return (
    <div className="maths">
      <h2 className="title">Tutorial</h2>
      <div className="course-grid">
        {mathsCourses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.img} alt={course.title} className="course-img" />
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
            
            <Link to="/Enroll">
            <button className="enroll-btn">Enroll Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
