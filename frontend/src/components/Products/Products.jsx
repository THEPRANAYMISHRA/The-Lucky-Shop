import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "boxicons";
const baseUrl = "http://localhost:4500";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [buttons, setButtons] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [sortby, setSortBy] = useState("");
  const [categoryToSearch, setCategoryToSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchCategoryValue = searchParams.get("search");

  // Event handlers
  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchText(event.target.value);
  };

  const handleRange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleSidebar = () => {
    // Toggle sidebar state
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleCategoryClick = (event) => {
    if (event.target.tagName === "BUTTON") {
      setCategoryToSearch(event.target.innerText);
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
      `${baseUrl}/products/?page=${currentPage}&sort=${sortby}&category=${categoryToSearch}` +
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

  const handleFiltration = () => {
    fetchProducts(searchText);
  };

  useEffect(() => {
    // Fetch products on page load or when pagination/search filters change
    setIsLoading(true);
    if (searchCategoryValue?.length > 0) {
      setCategoryToSearch(searchCategoryValue);
    }
    let timeout = setTimeout(() => {
      fetchProducts(searchText);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [currentPage, searchText, categoryToSearch]);

  useEffect(() => {
    // Update pagination buttons whenever products change
    handlePagination();
  }, [products]);

  return (
    <div className="p-3">
      <div className="d-flex align-items-center justify-content-between px-3">
        <h1>
          Products <span className="h5">: {searchCategoryValue}</span>
        </h1>
        <button className="btn btn-primary" onClick={handleSidebar}>
          <box-icon name="cog" type="solid"></box-icon>
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
      <div
        className="d-none border justify-content-start gap-2 align-items-center p-2 overflow-x-scroll"
        onClick={handleCategoryClick}
      >
        <strong>Select Category :</strong>
        <button className="btn btn-primary">Top Selling</button>
        <button className="btn btn-secondary">Mobile</button>
        <button className="btn btn-secondary">Electronics</button>
        <button className="btn btn-secondary">Grocery</button>
        <button className="btn btn-secondary">Fashion</button>
        <button className="btn btn-secondary">Books</button>
        <button className="btn btn-secondary">Home Decor</button>
        <button className="btn btn-secondary">Beauty</button>
        <button className="btn btn-secondary">Automotive</button>
        <button className="btn btn-secondary">Sports</button>
      </div>

      <div>
        <div
          className={`sidebar d-flex flex-column gap-2 my-3 px-5 bg-secondary ${
            isSidebarOpen ? "open" : ""
          }`}
        >
          {/* <label for="customRange2" className="form-label">
            Price range {priceRange} :
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="6000"
            id="customRange2"
            onChange={handleRange}
          /> */}
          <label for="customRange2" className="form-label">
            Sort By :
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option defaultValue={null}>Selete Options</option>
            <option value="l2h">Low to high</option>
            <option value="h2l">High to low</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <button
            className="btn btn-light my-3"
            onClick={() => {
              handleFiltration();
              handleSidebar();
            }}
          >
            Apply
          </button>
        </div>
        <div className="cards-container">
          {isLoading ? (
            <div className="d-flex loader-container align-items-center justify-content-center border-2">
              <div className="loader">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                <div className="bar4"></div>
                <div className="bar5"></div>
                <div className="bar6"></div>
                <div className="bar7"></div>
                <div className="bar8"></div>
                <div className="bar9"></div>
                <div className="bar10"></div>
                <div className="bar11"></div>
                <div className="bar12"></div>
              </div>
            </div>
          ) : products.length > 0 ? (
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
                  <p>
                    <strong>Category: </strong>
                    {product.category}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    type="submit"
                    className="btn btn-primary my-1"
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
            <div className="d-flex loader-container align-items-center justify-content-center border-2">
              <h1>Could find anything!</h1>
            </div>
          )}
        </div>
        <div className="my-3 gap-3 d-flex align-items-center justify-content-center">
          {buttons}
        </div>
      </div>
    </div>
  );
}

export default Products;
