import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.removeItem("isAdmin");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("currentUser", "admin");
      navigate("/admin");
      return;
    }

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    localStorage.setItem("currentUser", username);
    localStorage.setItem("isAdmin", "false");
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="login-input"
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="login-link">
          Create an account: <Link to="/Signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
