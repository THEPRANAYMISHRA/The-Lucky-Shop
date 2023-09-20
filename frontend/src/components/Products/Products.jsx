import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:4500";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [buttons, setButtons] = useState([]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handlePagination = () => {
    const handleClick = (num) => {
      setCurrentPage(num);
    };

    let buttons = [];

    for (let i = 1; i <= pageCount; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn ${i === currentPage ? "btn-primary" : "btn-light"}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    setButtons(buttons);
  };

  const fetchProducts = (searchItem) => {
    const url =
      `${baseUrl}/products/?page=${currentPage}` +
      (searchItem ? `&item=${searchItem}` : "");

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.Products);
        setPageCount(+res.data["Total Pages"]);
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
    let timeout = setTimeout(() => {
      fetchProducts(searchText);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentPage, searchText]);

  useEffect(() => {
    handlePagination();
  }, [products]);

  return (
    <div className="p-3">
      <h1>Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <div className="cards-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border d-flex align-items-center justify-content-center p-3 mycard"
            >
              <img src={product.image} alt={product.title} />
              <div className="border w-100 h-100 d-flex align-items-center justify-content-between p-3 card-details">
                <p className="h5">{product.title}</p>
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
                <Link to={`/view/${product._id}`} className="btn btn-primary">
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
      <div className="border my-3">{buttons}</div>
    </div>
  );
}

export default Products;
