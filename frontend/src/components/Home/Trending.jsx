import React from "react";

export default function Trending() {
  return (
    <div className="d-flex border w-50 my-3">
      <div className="w-100">
        <img
          src="https://cdn.shopclues.com/images/banners/2023/Apr/14/2Platinum_Srushty_14April23.jpg"
          alt=""
          className="w-100"
        />
        <p className="text-center">Ads</p>
      </div>
      <div>
        <img
          src="https://cdn.shopclues.com/images/banners/2023/Apr/14/1Platinum_Srushty_14April23.jpg"
          alt=""
          className="w-100"
        />
        <p className="text-center">Ads</p>
      </div>
      <div>
        <img
          src="https://cdn.shopclues.com/images/banners/2023/Apr/14/3Platinum_Srushty_14April23.jpg"
          alt=""
          className="w-100"
        />
        <p className="text-center">Ads</p>
      </div>
    </div>
  );
}
