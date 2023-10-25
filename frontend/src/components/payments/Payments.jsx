import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./payments.css";
import axios from "axios";
const baseUrl = "http://localhost:4500";
// const baseUrl = "https://the-lucky-shop.onrender.com";

export default function Payments() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    const payload = {
      orders: [
        {
          product: "64fbf9b2549493d90d05ca80",
          quantity: quantity,
          name: name,
          address: address,
          pincode: pincode,
          phone: mobile,
        },
      ],
    };

    try {
      axios.post(`${baseUrl}/user/orders/place`, payload, {
        headers: {
          Authorization: token,
        },
      });
      alert("Order Placed Successfully!");
    } catch (error) {
      alert("internal server error");
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/?id=${productId}`)
      .then((res) => {
        setProducts(res.data);
        setPrice(res.data.price);
      })
      .catch((err) => {
        alert("Unauthorized user!");
      });
  }, []);

  return (
    <main className="d-flex gap-3 px-5 py-2 container">
      <div className="left w-75 p-4 border">
        <div className="border my-3">
          <h1 className="bg-primary text-white p-2">Products Details</h1>
          <div className="d-flex justify-content-evenly border align-items-center">
            <img src={products?.image} alt="" width={70} />
            <b>{products?.title}</b>
            <div className="d-flex gap-2">
              <span
                className="btn btn-primary"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  } else {
                    alert("Item Quantity cannot be less than 1");
                  }
                }}
              >
                -
              </span>
              <span className="btn btn-light">{quantity}</span>
              <span
                className="btn btn-primary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="bg-primary text-white p-2">Delivery Address</h1>
          <form onSubmit={handleSubmit} className="form-group">
            <input
              type="text"
              placeholder="Name"
              className="form-control my-2"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Address"
              className="form-control my-2"
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="number"
              placeholder="Pincode"
              className="form-control my-2"
              required
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Mobile No."
              className="form-control my-2"
              required
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
            <button className="btn btn-primary my-2">Deliver Here</button>
          </form>
        </div>
      </div>
      <div className="right w-25 border p-4">
        <h2 className="bg-primary text-white p-2">Price Details</h2>
        <div className="w-100 p-2 border">
          <p>
            <b>Price (1 Item):</b>
            {price}
          </p>
          <p>
            <b>Delivery Charges : </b>
            <del> $40 </del>
            <span className="text-success font-weight-bold"> Free </span>
          </p>
          <p>
            <b>Total Amount : </b>
            {(price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </main>
  );
}
