import React from "react";

export default function ShopByCategory() {
  return (
    <div className="d-flex border my-3 justify-content-center align-items-center gap-3 p-2">
      <button className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3514/3514218.png"
          alt=""
          className="w-25"
        />
        <p>Grocery</p>
      </button>
      <button className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3514/3514218.png"
          alt=""
          className="w-25"
        />
        <p>Mobiles</p>
      </button>
      <button className="d-flex flex-column justify-content-center align-items-center p-1 rounded btn btn-light">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3514/3514218.png"
          alt=""
          className="w-25"
        />
        <p>Home & Furniture</p>
      </button>
    </div>
  );
}
