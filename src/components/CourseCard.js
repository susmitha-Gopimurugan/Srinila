import React from "react";
import "./CourseCard.css";
import { Link } from "react-router-dom";


export default function CourseCard({ title, duration, fee, icon: Icon }) {
  return (
    <div className="course-card">
      {Icon && <Icon className="course-icon" />}  
      <h3>{title}</h3>
      <p><strong>Duration:</strong> {duration}</p>
      <p><strong>Fee:</strong> {fee}</p>
      <Link to="/Enroll">
      <button>Enroll Now</button>
      </Link>
    </div> 
  );
}
 