import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For backend API calls
import "./Admin.css"; // Import CSS

export default function AdminPage() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch enrollments and feedback from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get enrollments
        const enrollRes = await axios.get("http://localhost:7500/getall");
        setEnrollments(enrollRes.data);

        // Get feedback messages
        const feedbackRes = await axios.get("http://localhost:7500/getcontacts");
        setFeedbacks(feedbackRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("currentUser");
    navigate("/Login");
  };

  const removeEnrollment = async (id) => {
    try {
      await axios.delete(`http://localhost:7500/delete/${id}`);
      const filtered = enrollments.filter((x) => x._id !== id);
      setEnrollments(filtered);
    } catch (err) {
      console.error("Error deleting enrollment:", err);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      {/* Enrollments Section */}
      <section style={{ marginBottom: "40px" }}>
        <h3>Enrolled Users</h3>
        {enrollments.length === 0 ? (
          <div>No enrolled users</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Date</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {enrollments.map((u) => (
                <tr key={u._id}>
                  <td>{u._id}</td>
                  <td>{u.name}</td>
                  <td>{u.course}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td>{u.date ? new Date(u.date).toLocaleString() : "-"}</td>
                  {/* <td>
                    <button onClick={() => removeEnrollment(u._id)} className="remove-btn">
                      Remove
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Feedback Section */}
      <section>
        <h3>User Feedback</h3>
        {feedbacks.length === 0 ? (
          <div>No feedback messages</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr key={f._id}>
                  <td>{f._id}</td>
                  <td>{f.name}</td>
                  <td>{f.email}</td>
                  <td>{f.message}</td>
                  <td>{f.date ? new Date(f.date).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <Link to="/home" className="home-link" style={{ marginTop: "20px", display: "inline-block" }}>
        Go to Home
      </Link>
    </div>
  );
}
