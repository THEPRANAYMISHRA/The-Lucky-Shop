import Dealsoftheday from "./Dealsoftheday";
import Trending from "./Trending";
import Slider from "./Slider";
import React from "react";
import "./homeStyle.css";
import ShopByCategory from "./ShopByCategory";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div className="">
      <Slider />
      <ShopByCategory />
      <Dealsoftheday title="Super Saver" />
      <Dealsoftheday title="Most Selling" />
      <Footer />
    </div>
  );
}
