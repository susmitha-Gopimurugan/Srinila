import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "./Upload.css";

const GetUploded = () => {
  const [productItems, setProductItems] = useState([]);

  // ✅ Fetch all records
  useEffect(() => {
    fetch("http://localhost:7500/getall")
      .then((res) => res.json())
      .then((data) => setProductItems(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // ✅ Delete record
  const deleteItems = (id) => {
    fetch(`http://localhost:7000/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.error("Deleted successfully");
        setProductItems((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="upload-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Submitted Enrollments</h2>

      <div className="card-list">
        {productItems?.map((item) => (
          <div key={item._id} className="enroll-card">
            {/* ✅ Show uploaded photo if exists */}
            {item.photo && (
              <img src={item.photo} alt="student" className="enroll-photo" />
            )}

            <div className="enroll-details">
              <p><strong>Name:</strong> {item.name}</p>
              
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Email:</strong> {item.email}</p>
              
              <p><strong>Course:</strong> {item.course}</p>
              <p><strong>Batch:</strong> {item.batch}</p>
            </div>

            <div className="enroll-actions">
              <button className="delete-btn" onClick={() => deleteItems(item._id)}>
                Delete
              </button>
              <Link to={`/edit/${item._id}`}>
                <button className="edit-btn">
                  <FiEdit /> Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetUploded;
