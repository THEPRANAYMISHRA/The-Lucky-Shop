import React from "react";

export default function ShopByCategory() {
  return (
    <div className="d-flex border my-3 justify-content-center align-items-center">
      <div className="border d-flex flex-column justify-content-center align-items-center p-1">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3514/3514218.png"
          alt=""
          className="w-25"
        />
        <p>Grocery</p>
      </div>
      <div className="border d-flex flex-column justify-content-center align-items-center p-1">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3514/3514218.png"
          alt=""
          className="w-25"
        />
        <p>Mobiles</p>
      </div>
      <div className="border d-flex flex-column justify-content-center align-items-center p-1">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3514/3514218.png"
          alt=""
          className="w-25"
        />
        <p>Home & Furniture</p>
      </div>
    </div>
  );
}
