import React, { useState } from "react";
import axios from "axios";
// import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";
const baseUrl = "https://reqres.in/api/login";

export default function Login() {
  const { setIsLoggedIn, setUserData } = useAuth();

  const sendValueToParent = (loginState, userDetails) => {
    setIsLoggedIn(loginState);
    setUserData(userDetails);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl, { email: email, password: password })
      .then((res) => {
        alert("Login successful!");
        localStorage.setItem("token", res.data.token);
        sendValueToParent(true, { name: "Pranay" });
      })
      .catch((err) => {
        alert("Login failed!");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container my-3">
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
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
