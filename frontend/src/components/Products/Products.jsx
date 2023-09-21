import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";
import "boxicons";

const baseUrl = "http://localhost:4500";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [buttons, setButtons] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleRange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
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
      })
      .finally(() => {
        setIsLoading(false);
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
    }, 1500);

    return () => clearTimeout(timeout);
  }, [currentPage, searchText]);

  useEffect(() => {
    handlePagination();
  }, [products]);

  return (
    <div className="p-3">
      <div>
        <h1>Products {isLoading ? "hello" : "bye"}</h1>
        <button className="btn btn-primary" onClick={handleSidebar}>
          <box-icon name="exit" color="white"></box-icon>
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
          className="form-control my-3"
        />
      </div>
      <div>
        <div
          className={`sidebar d-flex flex-column gap-2 my-3 bg-primary ${
            isSidebarOpen ? "open" : ""
          }`}
        >
          <label for="customRange2" class="form-label">
            Price range {priceRange}
          </label>
          <input
            type="range"
            class="form-range"
            min="0"
            max="6000"
            id="customRange2"
            onChange={handleRange}
          />

          <button className="btn btn-light my-3">Apply</button>
        </div>
        <div className="cards-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="border d-flex gap-3 align-items-center justify-content-center p-3 mycard"
              >
                <img src={product.image} alt={product.title} />
                <div className="w-100 h-100 d-flex flex-column align-items-start justify-content-between p-3 card-details">
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
      </div>
      <div className="border my-3">{buttons}</div>
    </div>
  );
}

export default Products;
