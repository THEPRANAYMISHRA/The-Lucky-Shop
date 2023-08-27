import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Products.css";
import { useCart } from "./CartContext";
const baseUrl = "https://fakestoreapi.com/products";

function Products() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useCart();

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => alert("Failed to fetch data!"));
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="myContainer">
        {products.length > 0
          ? products.map((product) => (
              <div key={product.id} className="border p-2">
                <img src={product.image} alt={product.title} />
                <p>{product.title}</p>
                <p>
                  <strong>Price: </strong>
                  {product.price}$
                </p>
                <button
                  onClick={() => {
                    let newCart = [...cart, product];
                    setCart(newCart);
                    alert("Item added to cart!");
                  }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Add to cart
                </button>
              </div>
            ))
          : "Nothing to show"}
      </div>
    </div>
  );
}

export default Products;
