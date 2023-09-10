import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
const baseUrl = "http://localhost:4500/user/register";

export default function Signup() {
  const { setIsLoggedIn, setUserData } = useAuth();

  const sendValueToParent = (loginState, userDetails) => {
    setIsLoggedIn(loginState);
    setUserData(userDetails);
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl, { name: name, email: email, password: password })
      .then((res) => {
        alert("Sign up successful!");
      })
      .catch((err) => {
        alert("Invalid Credentials");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container w-50 my-3 border p-5">
        <h1>Sign Up Form</h1>
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
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
