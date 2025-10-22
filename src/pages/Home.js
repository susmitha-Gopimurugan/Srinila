import React from "react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { FaMicrosoft, FaCalculator, FaLaptopCode } from "react-icons/fa"; 
import "./Home.css";

export default function Home() {  
  return (
    <div>
      <Hero />
      <section className="courses-section">
        <h2>Popular Courses</h2>
        <div className="courses-grid">
          <CourseCard 
            title="MS Office" 
            duration="2 Months" 
            fee="₹3,500" 
            icon={FaMicrosoft} 
          />
          <CourseCard 
            title="Tally + GST" 
            duration="3 Months" 
            fee="₹6,000" 
            icon={FaCalculator} 
          />
          <CourseCard 
            title="DCA" 
            duration="6 Months" 
            fee="₹12,000" 
            icon={FaLaptopCode} 
          />
        </div>
      </section>
    </div>
  );
}
