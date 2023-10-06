import Slider from "./Slider";
import React from "react";
import "./homeStyle.css";
import ShopByCategory from "./ShopByCategory";
import Footer from "../Footer/Footer";
import Carousel from "./corousels";
import Offers from "./Offers";

export default function Home() {
  return (
    <div className="">
      <Slider />
      <ShopByCategory />
      <Carousel />
      <Offers />
      <Footer />
    </div>
  );
}
