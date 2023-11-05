import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
// const baseUrl = "http://localhost:4500";
const baseUrl = "https://the-lucky-shop.onrender.com";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "Profile" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          authorization: token,
        },
      };

      axios
        .get(`${baseUrl}/user/verify`, config)
        .then((res) => {
          setIsLoggedIn(true);
          setUserData({ name: res.data.name });
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          alert("Token expired or unauthorized access");
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
