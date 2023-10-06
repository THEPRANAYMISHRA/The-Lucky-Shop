import React from "react";
import "./homeStyle.css";

export default function Slider() {
  return (
    <div
      id="carouselExampleAutoplaying"
      class="carousel slide my-3"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://cdn.shopclues.com/images/banners/2023/August/22/HB3_FleaMarket_Web_Esha_22ndAug23N.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://cdn.shopclues.com/images/banners/2023/August/22/HB4_JDD_Web_Esha_22ndAug23.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://cdn.shopclues.com/images/banners/2023/Sept/26/HB4_JDD_Web_Esha_26thSept23.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}
