import React from "react";
import "./homeStyle.css";

export default function Slider() {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide my-3"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://cdn.shopclues.com/images/banners/2023/August/22/HB3_FleaMarket_Web_Esha_22ndAug23N.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.shopclues.com/images/banners/2023/August/22/HB4_JDD_Web_Esha_22ndAug23.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.shopclues.com/images/banners/2023/Sept/26/HB4_JDD_Web_Esha_26thSept23.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
