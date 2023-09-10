import Dealsoftheday from "./Dealsoftheday";
import Slider from "./Slider";
import React from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
const baseUrl = "http://localhost:4500/user/verify";

export default function Home() {
  const { setIsLoggedIn, setUserData } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          authorization: token,
        },
      };

      axios
        .get(baseUrl, config)
        .then((res) => {
          console.log(res.data);
          setIsLoggedIn(true);
          setUserData({ name: res.data.name });
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          setUserData({ name: "Profile" });
          alert("Session expired or unauthorized access");
        });
    } else {
      setIsLoggedIn(false);
      setUserData({ name: "Profile" });
    }
  }, []);

  return (
    <div className="container">
      <Slider />
      <Dealsoftheday />
    </div>
  );
}
