import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const baseUrl = "http://localhost:4500";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      fetchProducts(searchText.trim());
    }
  };

  const fetchProducts = (searchItem) => {
    axios
      .get(`${baseUrl}/products/?item=${searchItem}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddToCart = (product) => {
    let token = localStorage.getItem("token");

    if (token) {
      axios
        .post(`${baseUrl}/cart/add`, product, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          alert("Product added to cart");
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            alert("Product already in cart");
          } else {
            console.error(err);
            alert("Error adding item");
          }
        });
    } else {
      alert("Please login first!");
    }
  };

  useEffect(() => {
    fetchProducts(""); // Fetch all products initially
  }, []);

  return (
    <div className="container border overflow-y-scroll">
      <h1>Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary my-3" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="myContainer">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border d-flex align-items-center justify-content-between p-3"
            >
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>
                <strong>Price: </strong>
                {product.price}$
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                type="submit"
                className="btn btn-primary"
              >
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
    </div>
  );
}

export default Products;
