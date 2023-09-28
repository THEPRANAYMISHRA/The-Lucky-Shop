import React, { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://localhost:4500";

export default function Cart() {
  const [cart, setCart] = useState([]);

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
    <div className="w-100 p-3" style={{ height: "100vh" }}>
      {cart.length > 0 ? (
        cart.map((product) => {
          return (
            <main key={product._id} className="border p-2">
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "60px" }}
              />
              <p>{product.title}</p>
              <p>
                <strong>Price: </strong>
                {product.price}$
              </p>
              <div className="d-flex gap-2 align-items-center my-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    product.quantity > 1
                      ? handleQuantityUpdate(product._id, product.quantity - 1)
                      : handleRemoveItem(product._id);
                  }}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    product.quantity < 5
                      ? handleQuantityUpdate(product._id, product.quantity + 1)
                      : alert("Maximum you can add 5 item!");
                  }}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveItem(product._id)}
              >
                Remove
              </button>
            </main>
          );
        })
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <box-icon name="cart-alt" size="100px" className="border"></box-icon>
          <div className="h1">Cart is empty!</div>
        </div>
      )}
    </div>
  );
}
