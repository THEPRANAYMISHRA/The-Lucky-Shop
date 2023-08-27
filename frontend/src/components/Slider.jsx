import Trending from "./Trending";
import React, { useState, useEffect } from "react";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://cdn.shopclues.com/images/banners/2023/August/22/HB3_FleaMarket_Web_Esha_22ndAug23N.jpg",
    "https://cdn.shopclues.com/images/banners/2023/August/22/HB4_JDD_Web_Esha_22ndAug23.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex < 2
        ? setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        : setCurrentIndex(0);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="d-flex w-100 my-3">
      <div className="imgBox">
        <img
          src={images[currentIndex]}
          alt={`${currentIndex}`}
          className="w-100"
        />
      </div>
      <Trending />
    </div>
  );
}
