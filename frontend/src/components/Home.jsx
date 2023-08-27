import Dealsoftheday from "./Dealsoftheday";
import Slider from "./Slider";

import React from "react";

export default function Home() {
  return (
    <div className="container">
      <Slider />
      <Dealsoftheday />
    </div>
  );
}
