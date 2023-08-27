import React from "react";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart } = useCart();
  return (
    <div
      className="container overflow-y-scroll p-3"
      style={{ height: "100vh" }}
    >
      {cart.length > 0
        ? cart.map((product) => {
            return (
              <div key={product.id} className="border p-2">
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
              </div>
            );
          })
        : "Nothing to show!"}
    </div>
  );
}
