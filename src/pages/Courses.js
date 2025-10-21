import React from "react";
import "./Courses.css";
import coursedata from "../mapping/Coursesdata";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Enrollnow } from "../redux/EnrollSlice";

function Courses() {
  const dispatch=useDispatch()
  return (
    <div className="courses">
      <center>
        <h2 className="section-title">Our Courses</h2>
      </center>

      <div className="course-grid">
        {
        
        coursedata.map((course) => (
          <div className="course-card" key={course.id}>
            <img src={course.img} alt={course.title} className="course-img" />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to="/Enroll">
            <button onClick={()=>dispatch(Enrollnow(course))}>Enroll Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
