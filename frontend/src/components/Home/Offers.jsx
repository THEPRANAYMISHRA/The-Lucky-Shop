import React from "react";
import "./offers.css";

export default function Offers() {
  return (
    <div className="my-3">
      <h2 className="text-center">Offers</h2>
      <div className="mycontainerforoffers">
        {/* =========================================== */}
        <div className="card">
          <img
            src="https://img.freepik.com/free-vector/sale-offer-label-banner-discount-offer-promotion_157027-1250.jpg"
            className="card-img-top"
            alt="Card1"
          />
          <div className="card-body">
            <h5 className="card-title">Special Offer</h5>
            <p className="card-text">
              Get 20% off on selected items this week. Don't miss out!
            </p>
            <a href="/" className="btn btn-primary">
              <box-icon name="right-arrow-alt" color="white"></box-icon>
            </a>
          </div>
        </div>

        <div className="card">
          <img
            src="https://img.freepik.com/free-vector/new-arrival-modern-red-banner-design_1017-36760.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1697155200&semt=ais"
            className="card-img-top"
            alt="Card2"
          />
          <div className="card-body">
            <h5 className="card-title">New Arrivals</h5>
            <p className="card-text">
              Explore our latest collection of trendy fashion items.
            </p>
            <a href="/" className="btn btn-primary">
              <box-icon name="right-arrow-alt" color="white"></box-icon>
            </a>
          </div>
        </div>

        <div className="card">
          <img
            src="https://t4.ftcdn.net/jpg/01/83/99/61/360_F_183996163_REI8tOCQiqYOGq4YcuzaHbhnXKJmnTG5.jpg"
            className="card-img-top"
            alt="Card3"
          />
          <div className="card-body">
            <h5 className="card-title">Limited Time Offer</h5>
            <p className="card-text">
              Shop now and get a free gift with every purchase over $50.
            </p>
            <a href="/" className="btn btn-primary">
              <box-icon name="right-arrow-alt" color="white"></box-icon>
            </a>
          </div>
        </div>

        <div className="card">
          <img
            src="https://img.freepik.com/free-vector/special-flash-sale-modern-banner-design-vector-illustration_1017-38337.jpg"
            className="card-img-top"
            alt="Card4"
          />
          <div className="card-body">
            <h5 className="card-title">Flash Sale</h5>
            <p className="card-text">
              Hurry! Grab your favorite items at discounted prices.
            </p>
            <a href="/" className="btn btn-primary">
              <box-icon name="right-arrow-alt" color="white"></box-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
