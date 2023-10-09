import React from "react";
import { useNavigate } from "react-router-dom";
import "./shopbycategory.css";

export default function ShopByCategory() {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    handleNavigation(e.target.innerText);
  };

  async function handleNavigation(search) {
    await navigate(`/products/?search=${search}`);
  }

  return (
    <div className="p-2">
      <h2 className="text-center">Shop By Category</h2>
      <div className="my-container">
        <button
          className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light"
          onClick={handleClick}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/3514/3514218.png"
            alt=""
            className="w-25 p-2"
          />
          Grocery
        </button>
        <button
          className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light"
          onClick={handleClick}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2586/2586488.png"
            alt=""
            className="w-25 p-2"
          />
          Electronics
        </button>
        <button
          className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light"
          onClick={handleClick}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2251/2251911.png"
            alt=""
            className="w-25 p-2"
          />
          Home and Furniture
        </button>
        <button
          className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light"
          onClick={handleClick}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/896/896493.png"
            alt=""
            className="w-25 p-2"
          />
          Electronics
        </button>
        <button
          className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light"
          onClick={handleClick}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1867/1867682.png"
            alt=""
            className="w-25 p-2"
          />
          Men's Clothing
        </button>
        <button
          className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light"
          onClick={handleClick}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/1785/1785375.png"
            alt=""
            className="w-25 p-2"
          />
          Women's Clothing
        </button>
      </div>
    </div>
  );
}
