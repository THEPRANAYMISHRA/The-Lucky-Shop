import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";
// const baseUrl = "http://localhost:4500";
const baseUrl = "https://the-lucky-shop.onrender.com";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [productsInCart, setProductsInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");

    const payload = { orders: [] };

    for (let item of cart) {
      payload["orders"].push({
        product: item._id,
        quantity: item.quantity,
        name: name,
        address: address,
        pincode: pincode,
        phone: mobile,
      });
    }

    try {
      axios.post(`${baseUrl}/user/orders/place`, payload, {
        headers: {
          Authorization: token,
        },
      });
      axios.delete(`${baseUrl}/cart/clear`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Order Placed Successfully!");
      handleGetCart();
    } catch (error) {
      alert("internal server error");
    }
  };

  const handleGetCart = () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${baseUrl}/cart/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setCart(res.data);
          setProductsInCart(res.data?.length);
          setTotalAmount(0);
          for (let item of res.data) {
            setTotalAmount(
              (prevTotalAmount) =>
                prevTotalAmount + +item["price"] * +item["quantity"]
            );
          }
        })
        .catch((err) => {
          alert("Unauthorized user!");
        });
    } else {
      alert("Please login first!");
    }
  };

  const handleRemoveItem = (itemId) => {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .delete(`${baseUrl}/cart/delete?id=${itemId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          handleGetCart();
          alert("Item removed from cart!");
        })
        .catch((err) => {
          alert("Unauthorized user!");
        });
    } else {
      alert("Please login first!");
    }
  };

  const handleQuantityUpdate = (itemId, quantity) => {
    let token = localStorage.getItem("token");
    if (token) {
      let payload = {
        itemId: itemId,
        quantity: quantity,
      };
      axios
        .patch(`${baseUrl}/cart/update`, payload, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          handleGetCart();
        })
        .catch((err) => {
          alert("Unauthorized user!");
        });
    } else {
      alert("Please login first!");
    }
  };

  useEffect(() => {
    handleGetCart();
  }, []);

  return (
    <div className="mainconatinerforcart p-2">
      <div className={`left p-3 border ${cart?.length > 0 ? "w-75" : "w-100"}`}>
        {cart.length > 0 ? (
          cart.map((product, index) => {
            return (
              <section key={product._id} className="border itemContainer">
                <img
                  src={product.image}
                  alt={product.title}
                  className="imageContainer"
                />
                <div className="detailsContainer p-2">
                  <div className="titleforproducts">{product.title}</div>
                  <p>
                    <b>Price: </b>
                    {product.price}$
                  </p>
                  {/* section for buttons like increase deacrease and remove are here */}
                  <section className="d-flex gap-2 align-items-center justify-content-start">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        product.quantity > 1
                          ? handleQuantityUpdate(
                              product._id,
                              product.quantity - 1
                            )
                          : handleRemoveItem(product._id);
                      }}
                    >
                      <b>-</b>
                    </button>
                    <button className="btn btn-light">
                      {product.quantity}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        product.quantity < 5
                          ? handleQuantityUpdate(
                              product._id,
                              product.quantity + 1
                            )
                          : alert("Maximum you can add 5 item!");
                      }}
                    >
                      <b>+</b>
                    </button>
                    <button
                      className="btn btn-danger rounded-circle"
                      onClick={() => handleRemoveItem(product._id)}
                    >
                      <b>X</b>
                    </button>
                  </section>
                </div>
              </section>
            );
          })
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <box-icon
              name="cart-alt"
              size="100px"
              className="border"
            ></box-icon>
            <div className="h1">Cart is empty!</div>
          </div>
        )}
      </div>
      {
        // display total price and checkout button if there are items in the cart
        cart?.length ? (
          <div className="border p-3 priceDetailsContainer">
            <h2 className="bg-primary text-white text-center">Price Details</h2>
            <div>
              <p>
                <b>Total items : </b>
                {productsInCart}
              </p>
              <p>
                <b>Delivery Charges : </b>
                <del> $40 </del>
                <span className="text-success font-weight-bold"> Free </span>
              </p>
              <p>
                <b>Total Amount : </b>
                {totalAmount.toFixed(2)}
              </p>
            </div>
            <h2 className="bg-primary text-white text-center">Enter Details</h2>
            <form onSubmit={handleSubmit}>
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
              <button className="btn btn-primary">Place Order</button>
            </form>
          </div>
        ) : null
      }
    </div>
  );
}
