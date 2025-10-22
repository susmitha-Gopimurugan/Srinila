import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:7500/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="contact">

      {/* ================= Feedback Form ================= */}
      <div className="feedback-form">
        <h2>Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>

      {/* ================= Contact Us Section ================= */}
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>
          Have any questions or queries? We’re here to help! You can send us a
          message using the feedback form above or reach us directly via email.
        </p>
        <p>
  Email us at:{" "}
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=susmi170205@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#e8306d", textDecoration: "underline", cursor: "pointer" }}
  >
    susmi170205@gmail.com
  </a>
</p>

      </div>
    </div>
  );
}

export default Contact;
