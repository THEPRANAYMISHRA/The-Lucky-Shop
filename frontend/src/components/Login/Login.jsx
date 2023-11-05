import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";
// const baseUrl = "http://localhost:4500";
const baseUrl = "https://the-lucky-shop.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/user/login`, { email: email, password: password })
      .then((res) => {
        if (res.status === 200) {
          alert("Login successful!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("avatar", res.data.avatar);
          setIsLoggedIn(true);
          setUserData({ name: res.data.name, avatar: res.data.avatar });
          return navigate("/Home");
        } else {
          alert("Unexpected response from server");
        }
      })
      .catch((err) => {
        alert("Invalid Credentials");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container my-3 border p-5">
        <h1>Login Form</h1>
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
          Don't have account?
          <Link to="/signup" className="text-decoration-none">
            Sign up
          </Link>
        </p>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
