import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Enroll.css";

function Enroll() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    qualification: "",
    course: "",
    batch: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, photo: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      toast.warn("⚠️ Please agree to the declaration before submitting.");
      return;
    }

    // ✅ Add current date & time before sending
    const registrationTime = new Date().toLocaleString();

    const finalData = { ...formData, registrationTime };

    try {
      const response = await fetch("http://localhost:7500/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        toast.success("✅ Enrollment submitted successfully!");
        setFormData({
          name: "",
          fatherName: "",
          dob: "",
          gender: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          qualification: "",
          course: "",
          batch: "",
          photo: "",
          agree: false,
        });
      } else {
        toast.error("❌ Failed to submit, please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server error, check backend.");
    }
  };

  return (
    <div className="enroll">
      <ToastContainer />
      <h2>Student Enrollment Form</h2>
      <form onSubmit={handleSubmit} className="enroll-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />

        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <div className="gender-field">
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female</label>
          <label><input type="radio" name="gender" value="Other" checked={formData.gender === "Other"} onChange={handleChange} /> Other</label>
        </div>

        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <textarea name="address" placeholder="Permanent Address" value={formData.address} onChange={handleChange} required></textarea>
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
        <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} required />

        <select name="course" value={formData.course} onChange={handleChange} required>
          <option value="">Select a Course</option>
          <option value="Basic Computer">Basic Computer</option>
          <option value="Typing">Typing</option>
          <option value="Coaching">Coaching</option>
          <option value="Tally">Tally</option>
          <option value="MS Office">MS Office</option>
        </select>

        <select name="batch" value={formData.batch} onChange={handleChange} required>
          <option value="">Preferred Batch</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Weekend">Weekend</option>
        </select>

        

        {/* Display registration time after submit */}
        <div className="time-display">
          <p><strong>Note:</strong> Registration time will be recorded automatically when you submit.</p>
        </div>

        <div className="declaration">
          <label>
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
            I hereby declare that all the information provided above is true.
          </label>
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default Enroll;
