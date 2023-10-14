import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
// const baseUrl = "http://localhost:4500";
const baseUrl = "https://the-lucky-shop.onrender.com";

export default function Signup() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  );
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files["0"];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setPreviewImage(result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await axios.post(`${baseUrl}/user/register`, formData);
      alert("Register Successful");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("Register failed");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
        className="container my-3 border p-5"
      >
        <h1>Sign Up Form</h1>
        <div className="previewSuperContainer my-3">
          <div className="previewContainer">
            <img src={previewImage} alt="Uploaded" className="previewImage" />
          </div>
          <input
            type="file"
            name="avatar"
            accept=".png,.jpg,.jpeg"
            className="border w-100 btn btn-primary"
            onChange={handleFileChange}
          />
        </div>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Already have an account?
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
