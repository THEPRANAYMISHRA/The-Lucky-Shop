import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Products.css";
const baseUrl = "https://fakestoreapi.com/products";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="myContainer">
        {products.map((product) => (
          <div key={product.id} className="border p-2">
            <img src={product.image} alt={product.title} className="" />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
