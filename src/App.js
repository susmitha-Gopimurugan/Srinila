import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enroll from "./pages/Enroll";
import Footer from "./components/Footer";
import heroImage from "./images/front.jpg";
import ScrollToTop from "./components/ScrollToTop";
import Type from "./pages/Type";
import Maths from "./pages/Maths";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if user visits root "/"
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/Login");
    }
  }, [location.pathname, navigate]);

  // Routes to hide Navbar and Footer
  const hideNavbarRoutes = ["/Login", "/Signup", "/admin"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="app">
      {shouldShowNavbar && <Navbar />}
      <ScrollToTop />
      <main>
        <Routes>


          <Route
            path="/admin"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <AdminPage />
              </div>
            }
          />
          <Route
            path="/Login"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <LoginPage />
              </div>
            }
          />

          <Route
            path="/Signup"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <SignupPage />
              </div>
            }
          />
          
          {/* Home and other pages */}
          <Route path="/home" element={<Home />} />
          <Route
            path="/courses"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <Courses />
              </div>
            }
          />
          <Route
            path="/type"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <Type />
              </div>
            }
          />
          <Route
            path="/maths"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <Maths />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <About />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <Contact />
              </div>
            }
          />
          <Route
            path="/enroll"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <Enroll />
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <div className="page-banner">
                <img src={heroImage} alt="Banner" className="page-image" />
                <Cart />
              </div>
            }
          />

        
         

          {/* Register page (for testing if you keep it) */}
          <Route path="/register" element={<Register />} />

          {/* Catch-all → redirect to login */}
          <Route path="*" element={<Navigate to="/Login" replace />} />
        </Routes>
      </main>

      {shouldShowNavbar && <Footer />}
    </div>
  );
}

export default App;
